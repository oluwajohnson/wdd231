


const apiKey = "035f1236aafe4f1f12dcab59f0c56b5c"; 


const city = "San Miguel,SV";

async function loadWeather() {
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`);
  const data = await res.json();

  const temp = data.main.temp.toFixed(1);
  const description = data.weather[0].description;
  const icon = data.weather[0].icon;

  document.getElementById("weather").innerHTML = `
    <p>${temp} °F</p>
    <p>${description}</p>
  `;
  document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${icon}.png`;
}

loadWeather();


async function displaySpotlights() {

const members = await fetch('data/members.json').then(res => res.json());

    // Filter gold/silver members
    const eligible = members.filter(m => m.level === "gold" || m.level === "silver");

    // Randomly select 2-3
    const shuffled = eligible.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    const spotlightContainer = document.querySelector(".business-spotlight");
    spotlightContainer.innerHTML = ""; // Clear existing cards

    selected.forEach(member => {
        const div = document.createElement("div");
        div.classList.add("business");
        div.innerHTML = `
            <h4>${member.name}</h4>
            <p>${member.level.charAt(0).toUpperCase() + member.level.slice(1)} Member</p>
            <div class="divider"></div>
            <div class="business-details">
                <div><img src="${member.image}" alt="Logo of ${member.name}"></div>
                <div>
                    <p>Phone: ${member.phone}</p>
                    <p>Address: ${member.address}</p>
                    <p>Website: <a href="https://${member.website}" target="_blank">${member.website}</a></p>
                    <p>Membership Level: ${member.level}</p>
                </div>
            </div>
        `;
        spotlightContainer.appendChild(div);
    });
}

// Initialize functions
getWeather();
displaySpotlights();
