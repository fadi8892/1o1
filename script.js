const mapGrids = document.querySelectorAll(".map-grid");
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

mapGrids.forEach((grid) => {
  grid.addEventListener("click", (event) => {
    const card = event.target.closest(".map-card");
    if (!card || !grid.contains(card)) return;

    grid.querySelectorAll(".map-card").forEach((item) => {
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
});

const tabButtons = document.querySelectorAll(".tab-button");
const tabPanels = document.querySelectorAll(".tab-panel");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.tab;
    tabButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-selected", isActive.toString());
    });
    tabPanels.forEach((panel) => {
      const isActive = panel.id === `tab-${target}`;
      panel.classList.toggle("is-active", isActive);
      panel.hidden = !isActive;
    });
  });
});

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
