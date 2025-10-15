// main-index.js
import { fetchJSON } from './fetchData.js';
import { renderProducts } from './renderProducts.js';
import { closeModal } from './modal.js';

const grid = document.querySelector('.products-grid');
const modal = document.getElementById('itemModal');
async function initIndex(){
  try {
    const items = await fetchJSON('data/farms.json');
    // show first 6 as featured
    renderProducts(grid, items.slice(0,6));
  } catch(err){
    grid.innerHTML = `<p class="error">Unable to load featured items</p>`;
  }

  
hookModal();

}

function hookModal(){
  const close = modal.querySelector('[data-modal-close]');
  close.addEventListener('click', ()=> closeModal(modal));
  window.addEventListener('keydown', e => {
    if(e.key === 'Escape' && modal.open) closeModal(modal);
  });
}


document.addEventListener('DOMContentLoaded', initIndex);


