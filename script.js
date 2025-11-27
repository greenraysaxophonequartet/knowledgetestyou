const copyButtons = document.querySelectorAll('.copy');
const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
const progressBar = document.querySelector('.progress-bar');
const progressCount = document.getElementById('progress-count');

function copyText(targetSelector, button) {
  const target = document.querySelector(targetSelector);
  if (!target) return;

  const text = target.innerText.trim();
  navigator.clipboard
    .writeText(text)
    .then(() => {
      button.dataset.original = button.dataset.original || button.textContent;
      button.textContent = 'コピーしました！';
      setTimeout(() => {
        button.textContent = button.dataset.original;
      }, 1400);
    })
    .catch(() => {
      alert('コピーに失敗しました。手動で選択してコピーしてください。');
    });
}

copyButtons.forEach((button) => {
  const selector = button.getAttribute('data-target');
  button.addEventListener('click', () => copyText(selector, button));
});

function refreshProgress() {
  const total = checkboxes.length;
  const done = Array.from(checkboxes).filter((c) => c.checked).length;
  const percentage = total === 0 ? 0 : Math.round((done / total) * 100);

  progressBar.style.width = `${percentage}%`;
  progressCount.textContent = `${done}`;
}

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', refreshProgress);
});

refreshProgress();
