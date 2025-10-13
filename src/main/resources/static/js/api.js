document.addEventListener("DOMContentLoaded", () => {
  const countries = document.querySelectorAll("#svgContainer");
  const infoContainer = document.getElementById("infoContainer");
  let currCountryId = null;
  let visitedCountries = new Set();
  let currentCountryImages = [];
  let currentImageIndex = 0;
  const addImageBtn = document.getElementById("addImageBtn");
  const imageUpload = document.getElementById("imageUpload");
  const deleteBtn = document.getElementById("deleteImageBtn");

  if (deleteBtn) {
    deleteBtn.addEventListener("click", () => {
      deleteCountryImage(currCountryId);
    });
  }

  if (addImageBtn && imageUpload) {
    addImageBtn.addEventListener("click", () => {
      imageUpload.click();
    });
    imageUpload.addEventListener("change", (event) => {
      if (event.target.files && event.target.files[0] && currCountryId) {
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = (e) => {
          document.getElementById("countryUserImage").src = e.target.result;
          document.getElementById("countryUserImage").style.display = "block";
        };
        reader.readAsDataURL(file);
        uploadCountryImage(currCountryId, file);
      }
    });
  }

  document.getElementById("markVisit").addEventListener("click", () => {
    if (currCountryId) {
      markAsVisited(currCountryId);
    }
  });

  fetch("/api/visited-countries")
    .then((response) => {
      return response.json();
    })
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

    if (!target || !target.id) {
      infoContainer.style.display = "none";
      currCountryId = null;
      return;
    }

    const countryId = target.id;

    if (currCountryId === countryId || countryId === "svgContainer") {
      infoContainer.style.display = "none";
      currCountryId = null;
      return;
    }

    currCountryId = target.id;

    try {
      console.log(`Fetching data for country: ${countryId}`);
      const response = await fetch(`/api/country-info/${countryId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Country data fetched:", data);
      getCountryInfo(data, event.pageX, event.pageY, countryId);
    } catch (error) {
      console.error("Error fetching data:", error);
      infoContainer.style.display = "none";
      currCountryId = null;
    }
  });
  // mark as visited after double-click
  svgContainer.addEventListener("dblclick", (event) => {
    const target = event.target.closest("[id]");
    // check if country on this position
    if (
      target &&
      target.id &&
      target.id != "svgContainer" &&
      svgContainer.contains(target)
    ) {
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

  function getCountryInfo(country, x, y, countryId) {
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

      const isVisited = visitedCountries.has(countryId);
      document.getElementById("markVisit").textContent = isVisited
        ? "Unmark as visited"
        : "Mark as visited";

      const imageSection = document.getElementById("countryImageSection");
      if (imageSection) {
        imageSection.style.display = isVisited ? "block" : "none";

        if (isVisited) fetchCountryImage(countryId);
      }

      infoContainer.style.display = "block";
      infoContainer.classList.remove("fading");
    }, 1);
  }

  function uploadCountryImage(countryId, file) {
    const formData = new FormData();
    formData.append("image", file);

    fetch(`/api/images/${countryId}`, {
      method: "POST",
      credentials: "include",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(`HTTP error! status: ${response.status}`);
          });
        }
        return response.json();
        document.getElementById("addImageBtn").textContent = "Change image";
      })
      .then((data) => {
        console.log("img uploaded successfully:", data);
        fetchCountryImage(countryId);
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        alert("Failed to upload image");
      });
  }

  function deleteCountryImage(countryId) {
    fetch(`/api/images/${countryId}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        // Refresh images after deletion
        fetchCountryImage(countryId);
      })
      .catch((error) => {
        console.error("Error deleting image:", error);
        alert("Failed to delete image");
      });
  }

  function fetchCountryImage(countryId) {
    const imgElement = document.getElementById("countryUserImage");
    const addImageBtn = document.getElementById("addImageBtn");
    const imageSection = document.getElementById("countryImageSection");
    const deleteBtn = document.getElementById("deleteImageBtn");

    if (!imgElement || !addImageBtn) return;

    fetch(`/api/images/${countryId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 404) {
          imgElement.style.display = "none";
          addImageBtn.textContent = "Add image";
          if (deleteBtn) deleteBtn.style.display = "none";

          return null;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      })
      .then((data) => {
        if (data && data.imageData) {
          imgElement.src = data.imageData;
          imgElement.style.display = "block";
          addImageBtn.textContent = "Change image";
          if (deleteBtn) deleteBtn.style.display = "inline-block";
        } else {
          imgElement.style.display = "none";
          addImageBtn.textContent = "Add image";
          if (deleteBtn) deleteBtn.style.display = "none";
        }
      })
      .catch((error) => console.error("Error fetching country image:", error));
    // imgElement.style.display = "none";}
  }

  function markAsVisited(countryId) {
    const countryElement = document.getElementById(countryId);
    if (countryElement) {
      if (visitedCountries.has(countryId)) {
        //unmark
        countryElement.style.fill = ""; // Reset to default color
        visitedCountries.delete(countryId);
        console.log(`Country unmarked: ${countryId}`);

        const imageSection = document.getElementById("countryImageSection");
        if (imageSection) {
          imageSection.style.display = "none";
        }
      } else {
        //mark
        countryElement.style.fill = "green";
        visitedCountries.add(countryId);
        console.log(`Country marked: ${countryId}`);

        const imageSection = document.getElementById("countryImageSection");
        if (imageSection) {
          imageSection.style.display = "block";
          fetchCountryImage(countryId);
        }
      }
      // Save visited countries to the backend
      fetch("/api/visited-countries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
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
