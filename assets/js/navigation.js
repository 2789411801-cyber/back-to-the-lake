/* Navigation — Mobile menu, sticky header, scroll-to-top */
document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu toggle
  var menuToggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.primary-navigation');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      nav.classList.toggle('menu-open');
      var expanded = nav.classList.contains('menu-open');
      menuToggle.setAttribute('aria-expanded', expanded);
      menuToggle.querySelector('.menu-toggle__icon').innerHTML = expanded ? '&#10005;' : '&#9776;';
    });
  }

  // Sticky header
  var header = document.querySelector('.site-header');
  if (header) {
    var headerTop = header.offsetTop;
    window.addEventListener('scroll', function () {
      if (window.scrollY > headerTop + 100) {
        header.classList.add('sticky');
        document.body.style.paddingTop = header.offsetHeight + 'px';
      } else {
        header.classList.remove('sticky');
        document.body.style.paddingTop = '0';
      }
    });
  }

  // Scroll to top button
  var scrollUp = document.querySelector('#scroll-up');
  if (scrollUp) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 500) {
        scrollUp.style.display = 'block';
      } else {
        scrollUp.style.display = 'none';
      }
    });
    scrollUp.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Search overlay
  var searchToggle = document.querySelector('.search-toggle');
  var searchOverlay = document.querySelector('#search-overlay');
  var searchClose = document.querySelector('#search-close');
  var searchInput = document.querySelector('#search-overlay-input');

  if (searchToggle && searchOverlay) {
    searchToggle.addEventListener('click', function () {
      searchOverlay.classList.add('active');
      if (searchInput) {
        setTimeout(function () { searchInput.focus(); }, 100);
      }
    });
  }

  if (searchClose && searchOverlay) {
    searchClose.addEventListener('click', function () {
      searchOverlay.classList.remove('active');
    });
  }

  if (searchOverlay) {
    searchOverlay.addEventListener('click', function (e) {
      if (e.target === searchOverlay) {
        searchOverlay.classList.remove('active');
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        var query = searchInput.value.trim();
        if (query) {
          window.location.href = '/search/?q=' + encodeURIComponent(query);
        }
      }
    });
  }

  // Close overlay with Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && searchOverlay && searchOverlay.classList.contains('active')) {
      searchOverlay.classList.remove('active');
    }
  });
});
