// scripts/directory.js
// Run after DOM loaded (defer ensures DOM is available)
const membersContainer = document.getElementById('members');
const totalEl = document.getElementById('total');
const gridBtn = document.getElementById('gridView');
const listBtn = document.getElementById('listView');

const allBtn = document.getElementById('allMembers');
const lvl1Btn = document.getElementById('memberLevel1');
const lvl2Btn = document.getElementById('memberLevel2');
const lvl3Btn = document.getElementById('memberLevel3');

let membersData = []; // will hold JSON data
let currentView = 'grid'; // 'grid' or 'list'

// fetch members.json
async function loadMembers() {
  try {
    const res = await fetch('data/members.json');
    if (!res.ok) throw new Error('Could not load members.json');
    membersData = await res.json();
    renderMembers(membersData);
  } catch (err) {
    membersContainer.innerHTML = `<p class="error">Sorry — unable to load members: ${err.message}</p>`;
    console.error(err);
  }
}

// render members (accepts filtered array)
function renderMembers(list) {
  // set container class for view
  if (currentView === 'grid') {
    membersContainer.classList.remove('members-list');
    membersContainer.classList.add('members-grid');
  } else {
    membersContainer.classList.remove('members-grid');
    membersContainer.classList.add('members-list');
  }

  membersContainer.innerHTML = '';
  list.forEach(member => {
    const item = document.createElement('article');
    item.className = 'member-card';
    item.setAttribute('data-membership', String(member.membership || 1));

    // image (use placeholder when missing)
    const imgSrc = member.image || 'images/placeholder.png';

    item.innerHTML = `
    <div class="member-info">
        <img src="${imgSrc}" alt="${escapeHtml(member.name)} logo" onerror="this.src='images/placeholder.png'">
        <h3>${escapeHtml(member.name)}</h3>
        <p>${escapeHtml(member.address)}</p>
        <p><a href="${escapeAttr(member.website)}" target="_blank" rel="noopener">${escapeHtml(member.website)}</a> | ${escapeHtml(member.phone)}</p>
      </div>
    `;
    membersContainer.appendChild(item);
  });

  totalEl.textContent = `Showing ${list.length} ${list.length === 1 ? 'member' : 'members'}`;
}

// basic escaping helpers
function escapeHtml(str='') {
  return String(str).replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}
function escapeAttr(str='') {
  return String(str).replace(/"/g, '%22');
}

// view toggles
gridBtn.addEventListener('click', () => {
  currentView = 'grid';
  gridBtn.setAttribute('aria-pressed','true');
  listBtn.setAttribute('aria-pressed','false');
  renderMembers(filteredMembers());
});
listBtn.addEventListener('click', () => {
  currentView = 'list';
  gridBtn.setAttribute('aria-pressed','false');
  listBtn.setAttribute('aria-pressed','true');
  renderMembers(filteredMembers());
});

// filter buttons
allBtn.addEventListener('click', () => { setActiveFilter(allBtn); renderMembers(membersData); });
lvl1Btn.addEventListener('click', () => { setActiveFilter(lvl1Btn); renderMembers(membersData.filter(m => m.membership === 1)); });
lvl2Btn.addEventListener('click', () => { setActiveFilter(lvl2Btn); renderMembers(membersData.filter(m => m.membership === 2)); });
lvl3Btn.addEventListener('click', () => { setActiveFilter(lvl3Btn); renderMembers(membersData.filter(m => m.membership === 3)); });

function setActiveFilter(activeBtn) {
  [allBtn, lvl1Btn, lvl2Btn, lvl3Btn].forEach(b => b.classList.remove('active'));
  activeBtn.classList.add('active');
}

function filteredMembers() {
  // used when switching grid/list; returns currently shown list based on filter button (simple approach)
  if (lvl1Btn.classList.contains('active')) return membersData.filter(m => m.membership === 1);
  if (lvl2Btn.classList.contains('active')) return membersData.filter(m => m.membership === 2);
  if (lvl3Btn.classList.contains('active')) return membersData.filter(m => m.membership === 3);
  return membersData;
}

// Menu button toggle (basic accessible behaviour)
const menuBtn = document.getElementById('menuBtn');
const menuList = document.getElementById('menuList');
if (menuBtn && menuList) {
  menuBtn.addEventListener('click', () => {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!expanded));
    menuList.style.display = expanded ? '' : 'flex';
  });
}

// footer year + lastModified
document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('currentyear');
  if (y) y.textContent = new Date().getFullYear();
  const lm = document.getElementById('lastModified');
  if (lm) lm.textContent = `Last Modified: ${document.lastModified || 'Unknown'}`;
});

// initial load
loadMembers();
