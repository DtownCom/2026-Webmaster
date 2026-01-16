// Resource Directory

const searchInput = document.getElementById("directorySearch");
const filterSelect = document.getElementById("directoryFilter");
const cards = document.querySelectorAll(".directory-preview-card");

function updateDirectory() {
  const searchQuery = searchInput.value.toLowerCase().trim();
  const filterValue = filterSelect.value;

  cards.forEach(card => {
    const name = card.dataset.name.toLowerCase();
    const category = card.dataset.category;

    const matchesSearch = name.includes(searchQuery);
    const matchesFilter = filterValue === "all" || filterValue === category;

    if (matchesSearch && matchesFilter) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

searchInput.addEventListener("input", updateDirectory);
filterSelect.addEventListener("change", updateDirectory);

// search bar code 

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