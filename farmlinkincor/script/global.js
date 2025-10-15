const menuBtn = document.getElementById('menuBtn');
const menuList = document.getElementById('menuList');

menuBtn.addEventListener('click', () => {
  const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
  menuBtn.setAttribute('aria-expanded', !expanded);
  menuList.classList.toggle('open');
});


document.getElementById('timestamp').value = new Date().toISOString();// Footer last modified
document.getElementById("lastModified").textContent = document.lastModified;

// Current year
document.getElementById("currentyear").textContent = new Date().getFullYear();
