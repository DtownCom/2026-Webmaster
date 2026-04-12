/* SITE-WIDE SEARCH - Shows live dropdown results across all site sections - Each result has a title, category badge, snippet & link - Keyboard navigable (↑ ↓ Enter Escape) - Highlights matched text in-page when a result is clicked */

const SITE_INDEX = [
  // Food
  { title: "Lord's Pantry of Downingtown",              category: "Food",           page: "food.html",               snippet: "Supplemental groceries and essential food items for individuals and families facing food insecurity." },
  { title: "Safe Harbor of Chester County",             category: "Food",           page: "food.html",               snippet: "Hot meals and broader support services for unhoused and low-income adults, plus shelter and case management." },
  { title: "DASD Food Pantry",                          category: "Food",           page: "food.html",               snippet: "The DASD Food Pantry serves students and families with perishable and non-perishable food items by appointment." },
  { title: "Chester County Food Bank",                  category: "Food",           page: "food.html",               snippet: "Food Finder directory connecting residents with local pantries, mobile markets, and nutrition programs." },
  { title: "Ebenezer Food Pantry",                      category: "Food",           page: "food.html",               snippet: "Free groceries and hygiene necessities every 2nd and 4th Saturday, 10 AM–12 PM." },
  // Housing
  { title: "Housing Partnership of Chester County",     category: "Housing",        page: "housing.html",            snippet: "Housing assistance, education, and support services for long-term housing stability." },
  { title: "Atkinson Men's Shelter",                    category: "Housing",        page: "housing.html",            snippet: "Emergency housing and supportive services to help unhoused men in Chester County stabilize." },
  { title: "Family Promise of Southern Chester County", category: "Housing",        page: "housing.html",            snippet: "Temporary housing, case management, and stability services for families experiencing homelessness." },
  { title: "Pennsylvania 2-1-1 Housing Assistance",     category: "Housing",        page: "housing.html",            snippet: "Free helpline connecting individuals with emergency shelter, rental assistance, and eviction prevention." },
  // Health
  { title: "Educational & Behavioral Health Services",  category: "Health",         page: "health.html",             snippet: "Counseling, mental health support, and behavioral interventions for students and families." },
  { title: "Communities That Care (CTC)",               category: "Health",         page: "health.html",             snippet: "Prevention programs reducing youth substance use and promoting healthy development." },
  { title: "Chester County Addiction Support Groups",   category: "Health",         page: "health.html",             snippet: "Treatment referrals and behavioral health resources for individuals affected by substance use." },
  { title: "988 Suicide & Crisis Lifeline",             category: "Health",         page: "health.html",             snippet: "24/7 confidential crisis support for mental health emergencies. Call or text 988." },
  // Education
  { title: "Downingtown Elementary Schools",            category: "Education",      page: "education.html",          snippet: "Foundational academic instruction and social-emotional development for young learners in DASD." },
  { title: "Downingtown Middle Schools",                category: "Education",      page: "education.html",          snippet: "Rigorous academics and developmental guidance preparing students for high school." },
  { title: "Downingtown High Schools",                  category: "Education",      page: "education.html",          snippet: "Advanced coursework, career pathways, and extracurricular opportunities preparing students for college." },
  { title: "Downingtown Community Education Foundation","category": "Education",    page: "education.html",          snippet: "Funds innovative programs and enrichment opportunities across the Downingtown school district." },
  // Transportation
  { title: "SEPTA Regional Rail",                       category: "Transportation", page: "transportation.html",     snippet: "Commuter rail connecting Chester County suburbs to Center City Philadelphia and regional hubs." },
  { title: "Chester County ROVER / Chesco Connect",     category: "Transportation", page: "transportation.html",     snippet: "Door-to-door shared-ride transportation across Chester County for hard-to-reach destinations." },
  { title: "The Struble Trail",                         category: "Transportation", page: "transportation.html",     snippet: "Paved multi-use trail for walking, biking, and short-distance commuting near Downingtown." },
  { title: "Amtrak Keystone Service",                   category: "Transportation", page: "transportation.html",     snippet: "Intercity rail linking Chester County with Philadelphia, Harrisburg, and New York City." },
  // Volunteering
  { title: "Downingtown Library Volunteering",          category: "Volunteering",   page: "volunteering.html",       snippet: "Youth and adult volunteer opportunities supporting library operations and community programs." },
  { title: "Meals on Wheels of Chester County",         category: "Volunteering",   page: "volunteering.html",       snippet: "Volunteer to deliver nutritious meals and provide social connection to homebound seniors." },
  { title: "Chester County Community Foundation",       category: "Volunteering",   page: "volunteering.html",       snippet: "Connect with volunteer opportunities at nonprofits addressing food, education, and community health." },
  { title: "Chesco Volunteer Opportunities",            category: "Volunteering",   page: "volunteering.html",       snippet: "County hub matching residents with service roles across health, transportation, and community support." },
  { title: "YMCA of Greater Brandywine",               category: "Volunteering",   page: "volunteering.html",       snippet: "Youth development, healthy living, and volunteer opportunities at YMCA branches across Chester County including Downingtown." },
  // More pages
  { title: "Resource Finder Quiz",                      category: "Tool",           page: "resource-finder.html",    snippet: "Answer a few questions and get matched to the right local resources for your needs." },
  { title: "Events Calendar",                           category: "Community",      page: "events.html",             snippet: "Upcoming community events, food drives, cleanups, library programs, and more." },
  { title: "FAQ",                                       category: "Info",           page: "faq.html",                snippet: "Answers to common questions about accessing local resources in Downingtown." },
  { title: "Emergency Resources",                       category: "Emergency",      page: "emergency.html",          snippet: "Quick access to crisis lines, emergency services, and urgent help." },
  { title: "Newsletter Sign-Up",                        category: "Info",           page: "newsletter.html",         snippet: "Stay informed about new resources, community events, and hub updates." },
  { title: "Success Stories",                           category: "Community",      page: "stories.html",            snippet: "Real stories from community members who found help through local resources." },
  { title: "Volunteer Sign-Up",                         category: "Volunteering",   page: "volunteer-signup.html",   snippet: "Sign up to volunteer and get connected with local organizations that need your help." },
  { title: "Resource Directory",                        category: "Tool",           page: "resource-directory.html", snippet: "Browse and filter all resources by category, with a live map of locations." },
  { title: "About Us",                                  category: "Info",           page: "about.html",              snippet: "Learn about the Downingtown Community Resource Hub and its mission." },
  { title: "References",                                category: "Info",           page: "refrences.html",          snippet: "Citations, work log, copyright checklist, and all sources used for this site." },
];

const CATEGORY_COLORS = {
  Food: '#22c55e', Housing: '#f59e0b', Health: '#ef4444',
  Education: '#6366f1', Transportation: '#0ea5e9', Volunteering: '#ec4899',
  Tool: '#1d4ed8', Community: '#0d9488', Info: '#64748b', Emergency: '#dc2626'
};

(function initSearch() {
  const searchInput = document.getElementById('siteSearch');
  if (!searchInput) return;

  // Wrap input in a relative container and build dropdown
  const wrapper = document.createElement('div');
  wrapper.id = 'search-wrapper';
  searchInput.parentNode.insertBefore(wrapper, searchInput);
  wrapper.appendChild(searchInput);

  // Update placeholder
  searchInput.placeholder = '🔍 Search resources, events, pages…';
  searchInput.setAttribute('autocomplete', 'off');
  searchInput.setAttribute('aria-label', 'Search the site');
  searchInput.setAttribute('aria-haspopup', 'listbox');
  searchInput.setAttribute('aria-expanded', 'false');

  const dropdown = document.createElement('div');
  dropdown.id = 'search-dropdown';
  dropdown.setAttribute('role', 'listbox');
  dropdown.setAttribute('aria-label', 'Search results');
  wrapper.appendChild(dropdown);

  let activeIdx = -1;
  let lastQuery = '';

  function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function highlight(text, query) {
    if (!query) return text;
    return text.replace(new RegExp(`(${escapeRegex(query)})`, 'gi'),
      '<mark class="search-match">$1</mark>');
  }

  function showDropdown(results, query) {
    dropdown.innerHTML = '';
    activeIdx = -1;

    if (!query || results.length === 0) {
      if (query && results.length === 0) {
        dropdown.innerHTML = `<div class="search-no-results">No results for "<strong>${query}</strong>"</div>`;
        dropdown.classList.add('open');
      } else {
        dropdown.classList.remove('open');
      }
      searchInput.setAttribute('aria-expanded', String(dropdown.classList.contains('open')));
      return;
    }

    results.forEach((r, i) => {
      const color = CATEGORY_COLORS[r.category] || '#64748b';
      const item = document.createElement('a');
      item.className = 'search-result-item';
      item.href = r.page;
      item.setAttribute('role', 'option');
      item.setAttribute('aria-selected', 'false');
      item.setAttribute('data-idx', i);
      item.innerHTML = `
        <span class="search-result-badge" style="background:${color}22;color:${color};">${r.category}</span>
        <span class="search-result-title">${highlight(r.title, query)}</span>
        <span class="search-result-snippet">${highlight(r.snippet, query)}</span>`;
      item.addEventListener('mousedown', (e) => {
        e.preventDefault();
        highlightOnPage(query);
        window.location.href = r.page;
      });
      dropdown.appendChild(item);
    });

    const footer = document.createElement('div');
    footer.className = 'search-footer';
    footer.textContent = `${results.length} result${results.length !== 1 ? 's' : ''}  ·  ↑↓ navigate  ·  Enter to go  ·  Esc to close`;
    dropdown.appendChild(footer);

    dropdown.classList.add('open');
    searchInput.setAttribute('aria-expanded', 'true');
  }

  function setActive(idx) {
    const items = dropdown.querySelectorAll('.search-result-item');
    items.forEach((el, i) => {
      el.classList.toggle('active', i === idx);
      el.setAttribute('aria-selected', String(i === idx));
    });
    if (items[idx]) items[idx].scrollIntoView({ block: 'nearest' });
    activeIdx = idx;
  }

  function highlightOnPage(query) {
    // Clear old highlights
    document.querySelectorAll('.highlight').forEach(el => {
      el.replaceWith(document.createTextNode(el.textContent));
    });
    if (!query || query.length < 2) return;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    const nodes = [];
    let node;
    while ((node = walker.nextNode())) {
      if (node.nodeValue.toLowerCase().includes(query.toLowerCase())) nodes.push(node);
    }
    nodes.forEach(textNode => {
      const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
      const frag = document.createDocumentFragment();
      textNode.nodeValue.split(regex).forEach(part => {
        if (part.toLowerCase() === query.toLowerCase()) {
          const mark = document.createElement('mark');
          mark.className = 'highlight';
          mark.textContent = part;
          frag.appendChild(mark);
        } else {
          frag.appendChild(document.createTextNode(part));
        }
      });
      textNode.parentNode.replaceChild(frag, textNode);
    });
    const first = document.querySelector('.highlight');
    if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    lastQuery = query;
    if (query.length < 2) { showDropdown([], query); return; }
    const results = SITE_INDEX.filter(r =>
      r.title.toLowerCase().includes(query) ||
      r.snippet.toLowerCase().includes(query) ||
      r.category.toLowerCase().includes(query)
    ).slice(0, 8);
    showDropdown(results, query);
  });

  searchInput.addEventListener('keydown', (e) => {
    const items = dropdown.querySelectorAll('.search-result-item');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive(Math.min(activeIdx + 1, items.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(Math.max(activeIdx - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIdx >= 0 && items[activeIdx]) {
        highlightOnPage(lastQuery);
        window.location.href = items[activeIdx].getAttribute('href');
      }
    } else if (e.key === 'Escape') {
      dropdown.classList.remove('open');
      searchInput.setAttribute('aria-expanded', 'false');
      searchInput.blur();
    }
  });

  document.addEventListener('click', (e) => {
    if (!wrapper.contains(e.target)) {
      dropdown.classList.remove('open');
      searchInput.setAttribute('aria-expanded', 'false');
    }
  });

  searchInput.addEventListener('focus', () => {
    if (lastQuery.length >= 2) dropdown.classList.add('open');
  });
})();

// Resource Directory search + filter
const dirSearch = document.getElementById('directorySearch');
const dirFilter = document.getElementById('directoryFilter');

function filterDirectory() {
  const query  = (dirSearch ? dirSearch.value.trim().toLowerCase() : '');
  const cat    = (dirFilter ? dirFilter.value : 'all');
  const cards  = document.querySelectorAll('.directory-preview-card');
  let visible  = 0;

  cards.forEach(card => {
    const matchCat  = cat === 'all' || card.dataset.category === cat;
    const matchText = !query || card.dataset.name.toLowerCase().includes(query) ||
                      card.textContent.toLowerCase().includes(query);
    const show = matchCat && matchText;
    card.style.display = show ? '' : 'none';
    if (show) visible++;
  });

  const noResults = document.getElementById('noResults');
  if (noResults) noResults.style.display = visible === 0 ? 'block' : 'none';
}

if (dirSearch) dirSearch.addEventListener('input', filterDirectory);
if (dirFilter) dirFilter.addEventListener('change', filterDirectory);

// Back to Top Button
(function () {
  var btn = document.createElement('button');
  btn.id = 'back-to-top';
  btn.title = 'Back to top';
  btn.innerHTML = '↑';
  document.body.appendChild(btn);
  window.addEventListener('scroll', function () {
    btn.classList.toggle('visible', window.scrollY > 300);
  }, { passive: true });
  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// Scroll-in animations (Intersection Observer)
(function () {
  var targets = document.querySelectorAll(
    '.resource-card, .directory-preview-card, .feature-box, .welcome-banner, .new-residents'
  );
  if (!targets.length) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  targets.forEach(function (el) { io.observe(el); });
})();

function switchLanguage(lang) {
  if (lang === 'en') {
    var restore = document.querySelector('.goog-te-banner-frame');
    if (restore) {
      try { restore.contentDocument.querySelector('#\\:0\\.restore').click(); } catch(e) {}
    }
    var combo = document.querySelector('.goog-te-combo');
    if (combo) { combo.value = 'en'; combo.dispatchEvent(new Event('change')); }
    return;
  }
  var select = document.querySelector('.goog-te-combo');
  if (select) {
    select.value = lang;
    select.dispatchEvent(new Event('change'));
  }
}
