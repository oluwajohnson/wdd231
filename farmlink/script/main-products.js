// main-products.js - runs on products.html
import { fetchJSON } from './fetchData.js';
import { renderProducts } from './renderProducts.js';
import { closeModal } from './modal.js';

const grid = document.querySelector('.products-grid');
const visitMessage = document.getElementById('visit-message');
const modal = document.getElementById('itemModal');

async function init(){
  try {
    const items = await fetchJSON('data/farms.json'); // must have 15 items
    // Ensure we display at least 15 items per project spec
    renderProducts(grid, items.slice(0, 15));
  } catch(err){
    grid.innerHTML = `<p class="error">Unable to load items: ${err.message}</p>`;
  }
  handleVisit();
  hookModal();
  document.getElementById('year').textContent = new Date().getFullYear();
}
function handleVisit(){
  const last = localStorage.getItem('lastVisit');
  const now = Date.now();
  if(!last){ visitMessage.textContent = "Welcome! Let us know if you have any questions."; }
  else {
    const days = Math.floor((now - parseInt(last,10)) / (1000*60*60*24));
    if(days < 1) visitMessage.textContent = "Back so soon! Awesome!";
    else if(days === 1) visitMessage.textContent = "You last visited 1 day ago.";
    else visitMessage.textContent = `You last visited ${days} days ago.`;
  }
  localStorage.setItem('lastVisit', String(now));
}
function hookModal(){
  const close = modal.querySelector('[data-modal-close]');
  close.addEventListener('click', ()=> closeModal(modal));
  window.addEventListener('keydown', e => {
    if(e.key === 'Escape' && modal.open) closeModal(modal);
  });
}
document.addEventListener('DOMContentLoaded', init);


// View toggle logic
const gridBtn = document.getElementById('gridView');
const listBtn = document.getElementById('listView');
const productsGrid = document.querySelector('.products-grid');

gridBtn.addEventListener('click', () => {
  productsGrid.classList.remove('list-view');
  gridBtn.setAttribute('aria-pressed', 'true');
  listBtn.setAttribute('aria-pressed', 'false');
  gridBtn.classList.add('active');
  listBtn.classList.remove('active');
});

listBtn.addEventListener('click', () => {
  productsGrid.classList.add('list-view');
  gridBtn.setAttribute('aria-pressed', 'false');
  listBtn.setAttribute('aria-pressed', 'true');
  listBtn.classList.add('active');
  gridBtn.classList.remove('active');
});