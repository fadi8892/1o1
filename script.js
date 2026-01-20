const mapGrid = document.querySelector("#map-grid");
const selectedMap = document.querySelector("#selected-map");
const mapRoot = document.querySelector("#map-root");
const form = document.querySelector("#start-form");
const successMessage = document.querySelector("#start-success");
const toast = document.querySelector("#toast");

const mapDescriptions = {
  "Radial Sunburst": "Concentric rings highlight generations.",
  "Treemap Mosaic": "Branch sizes scaled by family size.",
  "Dendrogram Flow": "Flowing branches for lineage depth.",
  "Force Atlas": "Relationship constellation view.",
  "Timeline Grid": "Events aligned across decades.",
  "Geo Heritage": "Migrations across the globe."
};

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 3000);
}

if (mapGrid) {
  mapGrid.addEventListener("click", (event) => {
    const card = event.target.closest(".map-card");
    if (!card) return;

    mapGrid.querySelectorAll(".map-card").forEach((item) => {
      item.classList.remove("is-active");
    });
    card.classList.add("is-active");

    const mapName = card.dataset.map;
    if (selectedMap) {
      selectedMap.textContent = mapName;
    }
    if (mapRoot) {
      mapRoot.textContent = mapName === "Geo Heritage" ? "Origin" : "You";
    }
    showToast(mapDescriptions[mapName] || "Mapping system selected.");
  });
}

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get("name");

    if (successMessage) {
      successMessage.textContent = `Welcome ${name}! Your family tree workspace is ready.`;
    }
    showToast("Your family tree has been created.");
    form.reset();
  });
}
