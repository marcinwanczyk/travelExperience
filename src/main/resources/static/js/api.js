document.addEventListener("DOMContentLoaded", () => {
  const countries = document.querySelectorAll("#svgContainer");
  const infoContainer = document.getElementById("infoContainer");
  let currCountryId = null;
  let visitedCountries = new Set();

  document.getElementById("markVisit").addEventListener("click", () => {
    if (currCountryId) {
      markAsVisited(currCountryId);
    }
    
  });

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
      visitedPercentage();
    })
    .catch((error) =>
      console.error("Error fetching visited countries:", error)
    );

  svgContainer.addEventListener("click", async (event) => {
    const target = event.target.closest("[id]");
    if (target.id) {
      const countryId = target.id;

      if (currCountryId === countryId) {
        infoContainer.style.display = "none";
        currCountryId = null;
        return;
      }

      currCountryId = countryId;

      try {
        console.log(`Fetching data for country: ${countryId}`);
        const response = await fetch(`/api/country-info/${countryId}`);
        const data = await response.json();
        console.log("Country data fetched:", data);
        getCountryInfo(data, event.pageX, event.pageY, countryId);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      infoContainer.style.display = "none";
      currCountryId = null;
    }
  });

  svgContainer.addEventListener("dblclick", (event) => {
    const target = event.target.closest("[id]");
    if (target && target.id && svgContainer.contains(target)) {
      markAsVisited(target.id);
    }
  });


  svgContainer.addEventListener("mousedown", (event) => {
    if (event.button === 0) {
      infoContainer.style.display = "none";
      currCountryId = null;
    }
  });

  function visitedPercentage() {
    const allCountries =
      svgContainer.querySelectorAll("path[id], g[id]").length;

    const visitedCount = visitedCountries.size;
    const percentage =
      allCountries > 0 ? ((visitedCount / allCountries) * 100).toFixed(1) : 0;
    visitedPercentage.textContent = `${percentage}%`;
    percentageAnimation(parseFloat(percentage));

    console.log(
      `Visited: ${visitedCount}, Total: ${allCountries}, Percentage: ${percentage}%`
    );
  }

  function getCountryInfo(country,x ,y, countryId) {
    infoContainer.classList.add("fading");
    setTimeout(() => {
      document.getElementById("countryName").textContent = country.name.common;
      document.getElementById("countryFlag").src = country.flags.svg;
      document.getElementById("countryCapital").textContent = country.capital;
      document.getElementById("countryPopulation").textContent =
        country.population;
      document.getElementById("countryCurrency").textContent =
        country.currencies ? Object.keys(country.currencies)[0] : "N/A";
      document.getElementById("countryRegion").textContent = country.region;
      document.getElementById("countryTimezone").textContent = country.timezones
        ? country.timezones[0]
        : "N/A";
      document.getElementById("infoContainer").style.display = "block";
      document.getElementById("markVisit").textContent = visitedCountries.has(
        countryId
      )
        ? "Unmark as visited"
        : "Mark as visited";
      infoContainer.style.display = "block";
      infoContainer.classList.remove("fading");
    }, 1);
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
      })
        .catch((error) =>
          console.error("Error saving visited countries:", error)
        )
        .finally(() => {
          document.getElementById("markVisit").textContent =
            visitedCountries.has(countryId)
              ? "Unmark as visited"
              : "Mark as visited";

          visitedPercentage();
        });
    } else {
      console.error(`Country not found: ${countryId}`);
    }
  }
});
