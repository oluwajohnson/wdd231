// modal.js - accessible modal helpers
export function openModal(modal){
  if(!modal) return;
  if(typeof modal.showModal === 'function'){
    modal.showModal();
  } else {
    modal.setAttribute('open','');
    document.body.style.overflow = 'hidden';
  }
  // focus the first focusable element in modal
  const close = modal.querySelector('[data-modal-close]');
  if(close) close.focus();
}

export function closeModal(modal){
  if(!modal) return;
  if(typeof modal.close === 'function'){
    modal.close();
  } else {
    modal.removeAttribute('open');
    document.body.style.overflow = '';
  }
}
