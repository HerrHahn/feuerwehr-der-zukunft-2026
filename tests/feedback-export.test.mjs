import test from 'node:test';
import assert from 'node:assert/strict';
import { parseFeedback, loadFeedback, createTextExport } from '../feedback-export.mjs';

function issue(number, extra = {}) {
  return { number, state: 'open', created_at: '2026-10-26T10:00:00Z', updated_at: '2026-10-26T10:00:00Z',
    body: '### Dein Name\n\nTestperson Ä\n\n### Dein Verbesserungsvorschlag\n\nErfundener Testtext.\n\nZweite Zeile mit <script> und &.', ...extra };
}
const response = items => ({ ok: true, json: async () => items });

test('GitHub-Formular: Namen, Unicode und mehrzeilige Vorschläge bleiben erhalten', () => {
  const record = parseFeedback(issue(7));
  assert.equal(record.name, 'Testperson Ä');
  assert.equal(record.proposal, 'Erfundener Testtext.\n\nZweite Zeile mit <script> und &.');
  assert.equal(record.url, 'https://github.com/HerrHahn/feuerwehr-der-zukunft-2026/issues/7');
  assert.equal(record.state, 'Offen');
});

test('Pull Requests, andere Issues und unvollständige Formulare werden nicht exportiert', () => {
  assert.equal(parseFeedback(issue(1, { pull_request: {} })), null);
  assert.equal(parseFeedback(issue(2, { body: 'Ein anderes Issue' })), null);
  assert.equal(parseFeedback(issue(3, { body: '### Dein Name\n\n_No response_\n\n### Dein Verbesserungsvorschlag\n\nTest' })), null);
  assert.equal(parseFeedback(issue(-1)), null);
});

test('Mehrere API-Seiten werden vollständig geladen und Duplikate nur einmal exportiert', async () => {
  const calls = [];
  const records = await loadFeedback(async (url, options) => {
    calls.push(url);
    assert.equal(options.credentials, 'omit');
    assert.equal(options.cache, 'no-store');
    assert.ok(options.signal);
    return response(calls.length === 1 ? Array.from({ length: 100 }, (_, i) => issue(i + 1)) : [issue(100), issue(101)]);
  });
  assert.equal(calls.length, 2);
  assert.match(calls[1], /page=2$/);
  assert.equal(records.length, 101);
  assert.equal(records.at(-1).number, 101);
});

test('Ein Fehler auf einer späteren API-Seite liefert keine unvollständige Sammlung', async () => {
  let calls = 0;
  await assert.rejects(loadFeedback(async () => {
    calls++;
    return calls === 1 ? response(Array.from({ length: 100 }, (_, i) => issue(i + 1))) : { ok: false, status: 429 };
  }), /keine weiteren Downloads/);
});

test('Netzwerkfehler werden verständlich gemeldet', async () => {
  await assert.rejects(loadFeedback(async () => { throw new TypeError('network'); }), /Internetverbindung/);
  await assert.rejects(loadFeedback(async () => response({ message: 'unexpected' })), /nicht vollständig/);
});

test('Leere Sammlung und geschlossene Vorschläge erscheinen korrekt in der Textdatei', () => {
  const date = new Date('2026-10-26T10:00:00Z');
  assert.match(createTextExport([], date), /Bisher sind keine Verbesserungsvorschläge eingegangen/);
  const text = createTextExport([parseFeedback(issue(4, { state: 'closed' }))], date);
  assert.match(text, /Anzahl: 1/);
  assert.match(text, /Status: Geschlossen/);
  assert.match(text, /Name: Testperson Ä/);
  assert.match(text, /<script> und &\./);
  assert.match(text, /Europe\/Berlin/);
});
