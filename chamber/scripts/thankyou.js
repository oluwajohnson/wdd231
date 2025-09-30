
    // Parse URL parameters and display required fields
    const params = new URLSearchParams(window.location.search);
    const requiredFields = ["firstName","lastName","email","mobile","organization","timestamp"];
    const output = document.getElementById("output");

    requiredFields.forEach(field => {
      const li = document.createElement("li");
      li.textContent = `${field}: ${params.get(field)}`;
      output.appendChild(li);
    });
  