// Load the JSON data
fetch('data/discover.json')
  .then(response => response.json())
  .then(data => {
    const grid = document.getElementById('discover-grid');
    data.forEach((item, index) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.style.gridArea = `card${index + 1}`;
      card.innerHTML = `
        <h2>${item.name}</h2>
        <figure>
          <img src="${item.image}" alt="${item.name}">
        </figure>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <button>Learn More</button>
      `;
      grid.appendChild(card);
    });
  });

// Visitor message using localStorage
const message = document.getElementById('visit-message');
const lastVisit = localStorage.getItem('lastVisit');
const now = Date.now();

if (!lastVisit) {
  message.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const daysDiff = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
  if (daysDiff < 1) {
    message.textContent = "Back so soon! Awesome!";
  } else if (daysDiff === 1) {
    message.textContent = "You last visited 1 day ago.";
  } else {
    message.textContent = `You last visited ${daysDiff} days ago.`;
  }
}

localStorage.setItem('lastVisit', now);

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
