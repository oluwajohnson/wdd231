// renderProducts.js
import { openModal } from './modal.js';

export function renderProducts(container, items){
  container.innerHTML = '';
  items.forEach(item => {
    const article = document.createElement('article');
    article.className = 'product';
    article.setAttribute('data-id', item.id);
    article.innerHTML = `
      <h2>${escapeHtml(item.name)}</h2>
      <figure>
        <img loading="lazy" src="${escapeAttr(item.image)}" alt="${escapeHtml(item.name)} image">
      </figure>
      <address>${escapeHtml(item.address)}</address>
      <div class="meta">${escapeHtml(item.category)} • ${escapeHtml(item.price)}</div>
      <p>${escapeHtml(item.amount)}</p>
      <p>${escapeHtml(item.description)}</p>
      <div style="display:flex;gap:.5rem;align-items:center;margin-top:.5rem">
        <button class="learn" aria-label="Learn more about ${escapeHtml(item.name)}">Learn More</button>
        <button class="fav" aria-pressed="false" aria-label="Add to favorites">☆ Favorite</button>
      </div>
    `;

    // Learn button -> open modal with details
    const learnBtn = article.querySelector('.learn');
    learnBtn.addEventListener('click', () => {
      const modal = document.getElementById('itemModal');
      modal.querySelector('.modal-title').textContent = item.name;
      modal.querySelector('.modal-body').innerHTML = `
        <figure style="margin:0 0 .5rem 0"><img src="${escapeAttr(item.image)}" alt="${escapeHtml(item.name)}"></figure>
        <p><strong>Address:</strong> ${escapeHtml(item.address)}</p>
        <p><strong>Category:</strong> ${escapeHtml(item.category)}</p>
        <p><strong>Amount:</strong> ${escapeHtml(item.amount)}</p>
        <p>${escapeHtml(item.description)}</p>
      
        `;
      openModal(modal);
    });

    // favorite handling (localStorage)
    const favBtn = article.querySelector('.fav');
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    if(favs.includes(item.id)) { favBtn.textContent = '★ Favorite'; favBtn.setAttribute('aria-pressed','true'); }
    favBtn.addEventListener('click', () => toggleFav(item.id, favBtn));

    container.appendChild(article);
  });
}

// toggle favorites
function toggleFav(id, btn){
  const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
  const idx = favs.indexOf(id);
  if(idx === -1){ favs.push(id); btn.textContent='★ Favorite'; btn.setAttribute('aria-pressed','true'); }
  else { favs.splice(idx,1); btn.textContent='☆ Favorite'; btn.setAttribute('aria-pressed','false'); }
  localStorage.setItem('favorites', JSON.stringify(favs));
}

// small helpers
function escapeHtml(s=''){ return String(s).replace(/[&<>"']/g, m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }
function escapeAttr(s=''){ return String(s).replace(/"/g,'%22'); }
