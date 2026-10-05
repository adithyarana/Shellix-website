'use strict';
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { menu.setAttribute('aria-expanded', 'false'); navigation.classList.remove('is-open'); }
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); navigation.classList.toggle('is-open', open); });
navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
document.addEventListener('click', event => { if (!event.target.closest('.nav-wrap')) closeMenu(); });
matchMedia('(min-width: 781px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
let toastTimer;
const status = document.querySelector('#copy-status');
function feedback(message) { clearTimeout(toastTimer); status.textContent = message; status.classList.add('visible'); toastTimer = setTimeout(() => { status.classList.remove('visible'); status.textContent = ''; }, 5000); }
document.querySelectorAll('[data-copy]').forEach(button => {
 button.addEventListener('click', async () => {
  const code = document.getElementById(button.dataset.copy);
  const text = code.innerText.trim();
  try {
   if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
   await navigator.clipboard.writeText(text);
   button.textContent = 'Copied!'; feedback('Command copied to clipboard.');
   setTimeout(() => { button.textContent = 'Copy'; }, 2200);
  } catch {
   const selection = window.getSelection(); const range = document.createRange(); range.selectNodeContents(code); selection.removeAllRanges(); selection.addRange(range);
   feedback('Clipboard unavailable. Command selected—use your device’s copy action.');
  }
 });
});
const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectTab(tab) {
 tabs.forEach(item => { const active = item === tab; item.setAttribute('aria-selected', String(active)); item.tabIndex = active ? 0 : -1; document.getElementById(item.getAttribute('aria-controls')).hidden = !active; });
}
tabs.forEach((tab, index) => {
 tab.addEventListener('click', () => selectTab(tab));
 tab.addEventListener('keydown', event => {
  let next;
  if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
  if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
  if (event.key === 'Home') next = 0;
  if (event.key === 'End') next = tabs.length - 1;
  if (next !== undefined) { event.preventDefault(); selectTab(tabs[next]); tabs[next].focus(); }
 });
});
const commandNext = document.querySelector('#command-next');
commandNext.addEventListener('click', () => {
 const result = document.querySelector('#command-result'); const show = result.hidden; result.hidden = !show;
 commandNext.textContent = show ? 'Replay command demo ↻' : 'Show simulated result →';
});
const fixContent = document.querySelector('#fix-content');
const fixActions = document.querySelector('#fix-actions');
function action(label, callback, secondary = false) { const button = document.createElement('button'); button.type = 'button'; button.textContent = label; if (secondary) button.className = 'reject'; button.addEventListener('click', callback); fixActions.append(button); }
function updateFix(markup, moveFocus) { fixContent.innerHTML = markup; fixActions.replaceChildren(); if (moveFocus) { fixContent.tabIndex = -1; fixContent.focus({preventScroll:true}); } }
function resetFix(moveFocus = false) {
 updateFix('<p class="muted">Project directory: ~/your-project<br>Describe the problem: Handle empty input<br>error&gt; ZeroDivisionError: division by zero<br>error&gt; .</p><p>Selected context: <span class="purple">stats.py (50 bytes)</span></p><p>Send this context to OpenRouter? [y/N]:</p><p class="muted small">In Shellix, this shares the selected file’s full contents. This demo sends nothing.</p>', moveFocus);
 action('Yes — simulate sharing', reviewFix); action('No — cancel', () => { updateFix('<p class="purple">Permission denied. No AI request or file changes.</p>', true); action('Try again', () => resetFix(true)); }, true);
}
function reviewFix() {
 updateFix('<p><span class="purple">Diagnosis</span><br>Empty input causes division by zero. Return 0 before calculating the average.</p><pre class="diff">--- a/stats.py\n+++ b/stats.py\n@@ -1,2 +1,4 @@\n def average(values):\n<span class="added">+    if not values:\n+        return 0</span>\n     return sum(values) / len(values)</pre><p class="muted small">CLI controls: Ctrl-A Apply · Ctrl-R Reject · Ctrl-V Vim.<br>Vim edits a temporary proposal and requires a fresh Apply.</p>', true);
 action('Apply (simulated)', () => { updateFix('<p class="green">✓ Applied exactly these changes (simulated).</p><pre class="diff"><span class="added">+    if not values:\n+        return 0</span></pre><p>Summary: 1 existing file changed.<br>Empty input returns 0. Other inputs are unchanged.</p><p class="muted">Shellix prints an undo command after applying.<br>Optional test commands require separate approval.</p>', true); action('Replay fix demo ↻', () => resetFix(true)); });
 action('Reject', () => { updateFix('<p class="purple">Rejected. No file changes.</p><p class="muted">You can start a new review when you’re ready.</p>', true); action('Try again', () => resetFix(true)); }, true);
}
resetFix();
document.querySelector('#demo-reset').addEventListener('click', () => {
 if (tabs[0].getAttribute('aria-selected') === 'true') { document.querySelector('#command-result').hidden = true; commandNext.textContent = 'Show simulated result →'; }
 else resetFix();
});
