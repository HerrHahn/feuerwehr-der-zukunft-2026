import { loadFeedback, createTextExport } from './feedback-export.mjs';

const button = document.querySelector('#feedback-download');
const status = document.querySelector('#feedback-status');
button.addEventListener('click', async () => {
  if (button.disabled) return;
  button.disabled = true;
  status.hidden = false;
  status.textContent = 'Die aktuelle Sammlung wird zusammengestellt …';
  try {
    const records = await loadFeedback();
    const text = createTextExport(records);
    const url = URL.createObjectURL(new Blob(['\ufeff', text], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Verbesserungsvorschlaege-Feuerwehr-der-Zukunft.txt';
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 60000);
    status.textContent = records.length
      ? `Die Textdatei mit ${records.length} ${records.length === 1 ? 'Vorschlag' : 'Vorschlägen'} wurde zum Download bereitgestellt.`
      : 'Bisher sind keine Vorschläge eingegangen. Die Textdatei mit diesem Stand wurde zum Download bereitgestellt.';
  } catch (error) {
    status.textContent = error.message;
  } finally {
    button.disabled = false;
  }
});
