// Daten bleiben zwischen GitHub und dem Browser der Person, die herunterlädt.
// Keine KI, keine Hintergrundübertragung und keine Zugangsdaten im Browser.
const repository = 'HerrHahn/feuerwehr-der-zukunft-2026';
const api = `https://api.github.com/repos/${repository}/issues`;

function plainText(value) {
  return String(value ?? '').replace(/\r\n?/g, '\n').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '').trim();
}

export function parseFeedback(issue) {
  if (issue.pull_request || !Number.isSafeInteger(issue.number) || issue.number < 1) return null;
  // Diese Überschriften erzeugt das GitHub-Formular; andere Issues werden ausgelassen.
  const match = plainText(issue.body).match(/^### Dein Name\n+([\s\S]*?)\n+### Dein Verbesserungsvorschlag\n+([\s\S]*)$/);
  if (!match) return null;
  const name = plainText(match[1]).replace(/\s+/g, ' ');
  const proposal = plainText(match[2]);
  if (!name || !proposal || name === '_No response_' || proposal === '_No response_') return null;
  return {
    number: issue.number,
    name,
    proposal,
    state: issue.state === 'closed' ? 'Geschlossen' : 'Offen',
    created: plainText(issue.created_at),
    updated: plainText(issue.updated_at),
    url: `https://github.com/${repository}/issues/${issue.number}`
  };
}

export async function loadFeedback(fetcher = fetch) {
  const records = new Map();
  for (let page = 1; page <= 100; page++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    let items;
    try {
      const response = await fetcher(`${api}?state=all&per_page=100&sort=created&direction=asc&page=${page}`, {
        headers: { Accept: 'application/vnd.github+json' },
        credentials: 'omit',
        cache: 'no-store',
        signal: controller.signal
      });
      if (!response.ok) {
        if (response.status === 403 || response.status === 429) {
          throw new Error('GitHub lässt gerade keine weiteren Downloads zu. Bitte versuche es später erneut. Die Vorschläge bleiben gespeichert.');
        }
        throw new Error('Die Sammlung konnte gerade nicht geladen werden. Bitte versuche es später erneut.');
      }
      items = await response.json();
      if (!Array.isArray(items)) throw new Error('Die Sammlung konnte nicht vollständig gelesen werden. Bitte versuche es später erneut.');
    } catch (error) {
      if (error.name === 'AbortError' || error instanceof TypeError) {
        throw new Error('Die Verbindung zu GitHub ist gerade nicht erreichbar. Bitte prüfe deine Internetverbindung und versuche es erneut.');
      }
      throw error;
    } finally {
      clearTimeout(timeout);
    }
    for (const item of items) {
      const record = parseFeedback(item);
      if (record) records.set(record.number, record);
    }
    if (items.length < 100) return [...records.values()].sort((a, b) => a.number - b.number);
  }
  throw new Error('Die Sammlung ist für einen einzelnen Download zu groß. Bitte öffne die Vorschläge direkt auf GitHub.');
}

export function createTextExport(records, date = new Date()) {
  const lines = [
    'FEUERWEHR DER ZUKUNFT 2026',
    'Verbesserungsvorschläge zum Wettbewerbsbeitrag des Löschzugs Grünberg-Mitte',
    `Exportiert am: ${date.toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })} (Europe/Berlin)`,
    `Anzahl: ${records.length}`,
    '',
    'Die Vorschläge sind unverändert aus dem öffentlichen GitHub-Formular übernommen.',
    'Die Sammlung enthält offene und geschlossene Vorschläge, aber keine späteren Kommentare.',
    'Es findet keine KI-Auswertung statt.',
    ''
  ];
  if (!records.length) lines.push('Bisher sind keine Verbesserungsvorschläge eingegangen.');
  for (const record of records) {
    lines.push('='.repeat(72), `VORSCHLAG #${record.number}`, `Name: ${record.name}`, `Status: ${record.state}`,
      `Eingegangen: ${record.created}`, `Zuletzt geändert: ${record.updated}`, `Quelle: ${record.url}`,
      '', 'Vorschlag:', record.proposal, '');
  }
  return lines.join('\r\n') + '\r\n';
}
