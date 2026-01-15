/* --------------------------------------------------
   MOBILE MENU
-------------------------------------------------- */
const sidebar = document.getElementById("sidebar");
const mobileToggle = document.getElementById("mobileToggle");

const mobileUnToggle = document.getElementById("mobileUnToggle");

if (mobileUnToggle) {
    mobileUnToggle.addEventListener("click", () => {
        sidebar.classList.remove("open");
    });
}

if (mobileToggle) {
    mobileToggle.addEventListener("click", () => {
        sidebar.classList.add("open");
    });
}

/* --------------------------------------------------
   RESOURCE DIRECTORY DATA
-------------------------------------------------- */
const resources = [
    {
        name: "Community Food Bank",
        category: "food",
        description: "Weekly food distribution for families."
    },
    {
        name: "Shelter Assistance Program",
        category: "housing",
        description: "Emergency housing and rental support."
    },
    {
        name: "Free Health Clinic",
        category: "health",
        description: "Walk-in clinic offering basic medical care."
    }
];

/* --------------------------------------------------
   RENDER RESOURCE DIRECTORY
-------------------------------------------------- */
function renderResources(list) {
    const container = document.getElementById("resourceList");
    if (!container) return;

    container.innerHTML = "";

    list.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("resource-card");

        card.innerHTML = `
            <h3>${item.name}</h3>
            <p><strong>Category:</strong> ${item.category}</p>
            <p>${item.description}</p>
        `;

        container.appendChild(card);
    });
}

renderResources(resources);

// search bar code //

document.getElementById("siteSearch").addEventListener("input", function () {
  const query = this.value.toLowerCase().trim();
  const searchable = document.querySelectorAll("h2, h3, p, li, .quick-btn, [data-search]");

  // Clear previous highlights
  searchable.forEach(el => {
    el.classList.remove("highlight");
  });

  // Stop if input is empty
  if (!query) return;

  let firstMatch = null;

  searchable.forEach(el => {
    const text = el.textContent.toLowerCase();
    if (text.includes(query)) {
      el.classList.add("highlight");
      if (!firstMatch) firstMatch = el;
    }
  });

  if (firstMatch) {
    firstMatch.scrollIntoView({ behavior: "smooth", block: "center" });
  }
});

// pdf opener

function openPDF(path) {
  window.open(path, "_blank");
}

//form receiver
document.querySelectorAll(".feedback-form").forEach(form => {
  form.addEventListener("submit", e => {
    e.preventDefault();
    alert("Thank you! Your submission has been received.");
    form.reset();
  });
});