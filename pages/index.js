const searchInput = document.getElementById('siteSearch');
if (searchInput) {
searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();

  // Remove previous highlights
  document.querySelectorAll('.highlight').forEach(el => {
    const parent = el.parentNode;
    parent.replaceChild(document.createTextNode(el.textContent), el);
    parent.normalize();
  });

  if (query.length < 2) return;

  const walker = document.createTreeWalker(
    document.querySelector('main'),
    NodeFilter.SHOW_TEXT,
    null
  );

  const matches = [];
  let node;
  while ((node = walker.nextNode())) {
    if (node.nodeValue.toLowerCase().includes(query)) {
      matches.push(node);
    }
  }

  matches.forEach(textNode => {
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const fragment = document.createDocumentFragment();
    const parts = textNode.nodeValue.split(regex);
    parts.forEach(part => {
      if (part.toLowerCase() === query) {
        const mark = document.createElement('mark');
        mark.className = 'highlight';
        mark.textContent = part;
        fragment.appendChild(mark);
      } else {
        fragment.appendChild(document.createTextNode(part));
      }
    });
    textNode.parentNode.replaceChild(fragment, textNode);
  });

  const firstMatch = document.querySelector('.highlight');
  if (firstMatch) {
    firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
});
}

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
