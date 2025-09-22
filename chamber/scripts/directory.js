const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("article");

// Toggle buttons
gridbutton.addEventListener("click", () => {
  display.classList.add("grid");
  display.classList.remove("list");
});

listbutton.addEventListener("click", showList);

function showList() {
  display.classList.add("list");
  display.classList.remove("grid");
}

// Load members.json and display
async function loadMembers() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error("Failed to fetch members.json");
    const members = await response.json();
    renderMembers(members);
  } catch (error) {
    console.error("Error loading members:", error);
    display.innerHTML = "<p>Unable to load member directory.</p>";
  }
}

function renderMembers(members) {
  display.innerHTML = ""; // clear existing content
  members.forEach(member => {
    const section = document.createElement("section");

    const img = document.createElement("img");
    img.src = member.image;
    img.alt = `${member.name} logo`;

    const h3 = document.createElement("h3");
    h3.textContent = member.name;

    const address = document.createElement("p");
    address.textContent = member.address;

    const phone = document.createElement("p");
    phone.textContent = member.phone;

    const website = document.createElement("a");
    website.href = member.website;
    website.target = "_blank";
    website.textContent = "Visit Website";

    // Optional: membership level indicator
    const level = document.createElement("p");
    level.textContent =
      member.membership === 3
        ? "Gold Member"
        : member.membership === 2
        ? "Silver Member"
        : "Member";

    section.appendChild(img);
    section.appendChild(h3);
    section.appendChild(address);
    section.appendChild(phone);
    section.appendChild(website);
    section.appendChild(level);

    display.appendChild(section);
  });
}

// Initialize
loadMembers();

