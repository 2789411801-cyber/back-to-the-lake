/* Client-side search */
(function () {
  var searchInput = document.getElementById('search-input');
  var resultsContainer = document.getElementById('results-container');
  if (!searchInput || !resultsContainer) return;

  var posts = [];
  var indexUrl = '/assets/js/search_index.json';

  // Load search index
  fetch(indexUrl)
    .then(function (response) { return response.json(); })
    .then(function (data) {
      posts = data;
      // Check for URL query param
      var params = new URLSearchParams(window.location.search);
      var query = params.get('q');
      if (query) {
        searchInput.value = query;
        performSearch(query);
      }
    })
    .catch(function () {
      resultsContainer.innerHTML = '<li class="no-results">Search index could not be loaded.</li>';
    });

  function performSearch(query) {
    var q = query.toLowerCase().trim();
    if (!q) {
      resultsContainer.innerHTML = '';
      return;
    }
    var results = posts.filter(function (p) {
      return p.title.toLowerCase().indexOf(q) !== -1 ||
             p.content.toLowerCase().indexOf(q) !== -1 ||
             (p.categories && p.categories.toLowerCase().indexOf(q) !== -1);
    });
    renderResults(results, q);
  }

  function renderResults(results, query) {
    if (results.length === 0) {
      resultsContainer.innerHTML = '<li class="no-results">No posts found for "' + escapeHtml(query) + '".</li>';
      return;
    }
    resultsContainer.innerHTML = results.map(function (p) {
      return '<li class="search-result-item">' +
        '<a href="' + p.url + '">' +
        '<h3 class="search-result-title">' + highlight(p.title, query) + '</h3>' +
        '<div class="search-result-excerpt">' + highlight(truncate(p.content, 180), query) + '</div>' +
        '<span class="search-result-date">' + p.date + '</span>' +
        '</a></li>';
    }).join('');
  }

  function highlight(text, query) {
    if (!query) return text;
    var escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    var regex = new RegExp('(' + escaped + ')', 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  function truncate(text, max) {
    if (text.length <= max) return text;
    return text.substring(0, max).replace(/\s+\S*$/, '') + '...';
  }

  function escapeHtml(text) {
    var map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return text.replace(/[&<>"']/g, function (m) { return map[m]; });
  }

  // Debounced search on input
  var debounceTimer;
  searchInput.addEventListener('input', function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function () {
      performSearch(searchInput.value);
    }, 200);
  });
})();
