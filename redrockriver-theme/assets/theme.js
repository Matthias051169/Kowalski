/* Red Rock River – Theme-Grundgerüst. Kein Framework, keine externen Aufrufe. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mobile-Menü
  var toggle = document.querySelector('[data-menu-toggle]');
  var mobileNav = document.getElementById('MobileNav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      mobileNav.hidden = open;
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !mobileNav.hidden) {
        toggle.setAttribute('aria-expanded', 'false');
        mobileNav.hidden = true;
        toggle.focus();
      }
    });
  }

  // Karussells
  document.querySelectorAll('[data-carousel]').forEach(function (root) {
    var track = root.querySelector('[data-carousel-track]');
    var prev = root.querySelector('[data-carousel-prev]');
    var next = root.querySelector('[data-carousel-next]');
    if (!track) return;
    function step(dir) {
      var item = track.querySelector('.carousel__item');
      var width = item ? item.getBoundingClientRect().width + 16 : track.clientWidth;
      track.scrollBy({ left: dir * width * 2, behavior: reduceMotion ? 'auto' : 'smooth' });
    }
    if (prev) prev.addEventListener('click', function () { step(-1); });
    if (next) next.addEventListener('click', function () { step(1); });
  });

  // Kollektion: Sortierung sofort anwenden
  var sort = document.querySelector('[data-sort-select]');
  if (sort && sort.form) sort.addEventListener('change', function () { sort.form.submit(); });

  // Produktseite: Variantenauswahl
  var productRoot = document.querySelector('[data-product]');
  if (productRoot) {
    var jsonEl = productRoot.querySelector('[data-product-json]');
    var idInput = productRoot.querySelector('[data-variant-id]');
    var addBtn = productRoot.querySelector('[data-add-to-cart]');
    var addLabel = productRoot.querySelector('[data-add-label]');
    var priceEl = productRoot.querySelector('[data-product-price]');
    if (jsonEl && idInput) {
      var product = JSON.parse(jsonEl.textContent);
      var labels = { add: addLabel ? addLabel.textContent : '', soldOut: 'Ausverkauft' };
      var readSelection = function () {
        var picks = [];
        productRoot.querySelectorAll('.option').forEach(function (fs) {
          var checked = fs.querySelector('input:checked');
          picks[Number(fs.dataset.optionIndex)] = checked ? checked.value : null;
        });
        return picks;
      };
      var formatMoney = function (cents) {
        return (cents / 100).toLocaleString(document.documentElement.lang || 'de', { style: 'currency', currency: (window.Shopify && window.Shopify.currency && window.Shopify.currency.active) || 'EUR' });
      };
      var update = function () {
        var picks = readSelection();
        var variant = product.variants.find(function (v) {
          return v.options.every(function (o, i) { return picks[i] === o; });
        });
        if (!variant) {
          if (addBtn) { addBtn.disabled = true; }
          return;
        }
        idInput.value = variant.id;
        if (addBtn) addBtn.disabled = !variant.available;
        if (addLabel) addLabel.textContent = variant.available ? labels.add || 'In den Warenkorb' : labels.soldOut;
        if (priceEl) {
          var html = '';
          if (variant.compare_at_price && variant.compare_at_price > variant.price) {
            html += '<s class="price__compare">' + formatMoney(variant.compare_at_price) + '</s> ';
          }
          html += '<span class="price__current">' + formatMoney(variant.price) + '</span>';
          priceEl.innerHTML = '<div class="price' + (variant.compare_at_price > variant.price ? ' price--sale' : '') + '">' + html + '</div>';
        }
        var url = new URL(window.location.href);
        url.searchParams.set('variant', variant.id);
        window.history.replaceState({}, '', url.toString());
      };
      productRoot.querySelectorAll('.option__input').forEach(function (input) {
        input.addEventListener('change', update);
      });
    }
  }
})();
