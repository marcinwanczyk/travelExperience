document.addEventListener("DOMContentLoaded", () => {
  const countries = document.querySelectorAll("#svgContainer");
  const infoContainer = document.getElementById("infoContainer");
  let currCountryId = null;
  let visitedCountries = new Set();

  fetch("/api/visited-countries")
    .then((response) => response.json())
    .then((data) => {
      visitedCountries = new Set(data);
      visitedCountries.forEach((countryId) => {
        const countryElement = document.getElementById(countryId);
        if (countryElement) {
          countryElement.style.fill = "green";
        }
      });
    })
    .catch((error) =>
      console.error("Error fetching visited countries:", error)
    );

  // countries.forEach((country) => {

  svgContainer.addEventListener("click", async (event) => {
    const target = event.target;
    if (target.id) {
      const countryId = target.id;

      if (currCountryId == countryId) {
        infoContainer.style.display = "none";
        currCountryId = null;
        return;
      }

      try {
        const response = await fetch(`/api/country-info/${countryId}`);
        const data = await response.json();
        getCountryInfo(data, event.pageX, event.pageY, countryId);
        currCountryId = countryId;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      infoContainer.style.display = "none";
      currCountryId = null;
    }
  });

  svgContainer.addEventListener("mousedown", (event) => {
    if (event.button === 0) {
      infoContainer.style.display = "none";
      currCountryId = null;
    }
  });

  function getCountryInfo(country, x, y, countryId) {
    infoContainer.innerHTML = `
        <p>Name: ${country.name.common}</p>
        <p>Capital: ${country.capital}</p>
        <p>Population: ${country.population}</p>
        <p>Currency: ${
          country.currencies ? Object.keys(country.currencies)[0] : "N/A"
        }</p>
        <p>Region: ${country.region}</p>
        <p>Timezone: ${country.timezones ? country.timezones[0] : "N/A"}</p>
        <p style="text-align: center;"><img src="${
          country.flags.svg
        }" alt="Flag of ${country.name.common}" width="70" ></p>
        <button id="markVisit">Mark as visited</button>
    `;
    document.getElementById("markVisit").addEventListener("click", () => {
      markAsVisited(countryId);
    });

    // TODO: repair edge case where infoContainer exceeds page bounds
    function positionInfoContainer(x, y, container) {
      const margin = 10;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      container.style.display = "block";
      container.offsetHeight;

      const rect = container.getBoundingClientRect();
      const containerWidth = rect.width;
      const containerHeight = rect.height;

      if (x + containerWidth + margin > viewportWidth) {
        x = viewportWidth - containerWidth - margin; // Move left to fit
      } else if (x < margin) {
        x = margin; // Move right to fit
      }

      // Adjust y to ensure the container stays within the viewport vertically
      if (y + containerHeight + margin > viewportHeight) {
        y = viewportHeight - containerHeight - margin; // Move up to fit
      } else if (y < margin) {
        y = margin; // Move down to fit
      }

      container.style.left = `${x}px`;
      container.style.top = `${y}px`;

      container.style.visibility = "visible";
      container.style.animation = "none";
      container.offsetHeight;
      container.style.animation = "popUp 0.2s ease-out";
    }

    requestAnimationFrame(() => {
      positionInfoContainer(x, y, infoContainer);
    });
  }

  function markAsVisited(countryId) {
    const countryElement = document.getElementById(countryId);
    if (countryElement) {
      if (visitedCountries.has(countryId)) {
        countryElement.style.fill = ""; // Reset to default color
        visitedCountries.delete(countryId);
        console.log(`Country unmarked: ${countryId}`);
      } else {
        countryElement.style.fill = "green";
        visitedCountries.add(countryId);
        console.log(`Country marked: ${countryId}`);
      }
      // Save visited countries to the backend
      fetch("/api/visited-countries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([...visitedCountries]),
      }).catch((error) =>
        console.error("Error saving visited countries:", error)
      );
    } else {
      console.error(`Country not found: ${countryId}`);
    }
  }
});
// TODO: send to backend to save visited countries per user
// fetch("/api/visited-countries", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify([...visitedCountries]),
//   }).catch((error) =>
//     console.error("Error saving visited countries:", error)
//   );
// } else {
//   console.error(`Country not found: ${countryId}`);
// }
