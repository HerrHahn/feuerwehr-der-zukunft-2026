(() => {
  const endpoint = 'https://feuerwehr-zukunft-rueckmeldungen.dregen667.chatgpt.site/api/feedback';
  const dialog = document.querySelector('#feedback-dialog');
  const opener = document.querySelector('#feedback-open');
  const form = document.querySelector('#feedback-form');
  const status = document.querySelector('#feedback-status');
  const submit = document.querySelector('#feedback-submit');
  if (!dialog || !opener || !form || !status || !submit) return;
  const name = form.elements.namedItem('name');
  const message = form.elements.namedItem('message');
  let pending = false;
  let submissionId = null;
  let previousPayload = '';
  const setStatus = (text, success = false) => {
    status.textContent = text;
    status.hidden = false;
    status.classList.toggle('feedback-success', success);
  };
  opener.addEventListener('click', () => {
    if (!pending) status.hidden = true;
    dialog.showModal();
    document.body.classList.add('modal-open');
    name.focus();
  });
  for (const id of ['feedback-close', 'feedback-cancel']) {
    document.getElementById(id).addEventListener('click', () => dialog.close());
  }
  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    opener.focus();
  });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (pending || !form.reportValidity()) return;
    const payload = {name: name.value.trim().replace(/\s+/g, ' '), message: message.value.trim(), website: form.elements.namedItem('website').value};
    if (payload.name.length < 2 || payload.message.length < 10) {
      setStatus('Bitte gib deinen Namen und einen Vorschlag mit mindestens 10 Zeichen ein.');
      status.focus();
      return;
    }
    const serialized = JSON.stringify(payload);
    if (!submissionId || serialized !== previousPayload) submissionId = crypto.randomUUID();
    previousPayload = serialized;
    pending = true;
    submit.disabled = true;
    name.readOnly = true;
    message.readOnly = true;
    setStatus('Dein Vorschlag wird gespeichert …');
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 25000);
    try {
      const response = await fetch(endpoint, {method: 'POST', credentials: 'omit', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({...payload, id: submissionId}), signal: controller.signal});
      const result = await response.json();
      if (!response.ok || result.ok !== true || result.id !== submissionId) {
        throw new Error(result.error || 'Die Speicherung konnte nicht bestätigt werden. Bitte versuche es erneut.');
      }
      form.reset();
      submissionId = null;
      previousPayload = '';
      setStatus('Danke! Dein Vorschlag ist für den Projektverantwortlichen gespeichert.', true);
    } catch (error) {
      setStatus(error.name === 'AbortError' || error instanceof TypeError
        ? 'Die Speicherung konnte nicht bestätigt werden. Deine Eingabe bleibt erhalten. Bitte versuche es erneut; derselbe Vorschlag wird nur einmal gespeichert.'
        : error.message || 'Die Speicherung konnte nicht bestätigt werden. Bitte versuche es erneut.');
    } finally {
      clearTimeout(timer);
      pending = false;
      submit.disabled = false;
      name.readOnly = false;
      message.readOnly = false;
      status.focus();
    }
  });
})();
