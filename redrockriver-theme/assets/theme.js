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

/* ===== Erweiterungen v0.2: Schublade, Suche, Wunschliste, Adressen ===== */
(function () {
  'use strict';
  var rrr = window.rrr || { routes: { cart: '/cart', cartAdd: '/cart/add', cartChange: '/cart/change', predictiveSearch: '/search/suggest', root: '/' }, strings: {}, currency: 'EUR' };
  var jsonHeaders = { 'Content-Type': 'application/json', 'Accept': 'application/json' };
  var lastFocus = null;

  function money(cents) {
    return (cents / 100).toLocaleString(document.documentElement.lang || 'de', { style: 'currency', currency: rrr.currency || 'EUR' });
  }
  function lockScroll(on) { document.body.classList.toggle('has-overlay', on); }

  // ---- Warenkorb-Schublade
  var drawer = document.querySelector('[data-cart-drawer]');
  function openDrawer() {
    if (!drawer) return;
    lastFocus = document.activeElement;
    drawer.hidden = false;
    drawer.classList.add('is-open');
    lockScroll(true);
    var closeBtn = drawer.querySelector('[data-drawer-close].icon-btn');
    if (closeBtn) closeBtn.focus();
  }
  function closeDrawer() {
    if (!drawer || drawer.hidden) return;
    drawer.hidden = true;
    drawer.classList.remove('is-open');
    lockScroll(false);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function setCount(n) {
    document.querySelectorAll('[data-cart-count]').forEach(function (el) { el.textContent = n; el.hidden = n === 0; });
  }
  function refreshDrawer() {
    return fetch(rrr.routes.cart + '?sections=cart-drawer', { headers: { 'Accept': 'application/json' } })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var html = data['cart-drawer'];
        if (!html || !drawer) return;
        var doc = new DOMParser().parseFromString(html, 'text/html');
        var fresh = doc.querySelector('.drawer__panel');
        var current = drawer.querySelector('.drawer__panel');
        if (fresh && current) current.replaceWith(fresh);
        return fetch(rrr.routes.cart + '.js', { headers: { 'Accept': 'application/json' } }).then(function (r) { return r.json(); }).then(function (cart) { setCount(cart.item_count); });
      });
  }
  if (drawer) {
    drawer.addEventListener('click', function (e) {
      var close = e.target.closest('[data-drawer-close]');
      if (close) { closeDrawer(); return; }
      var btn = e.target.closest('[data-qty-change]');
      if (!btn) return;
      var key = btn.dataset.key;
      var qty = btn.dataset.qtyChange === 'remove' ? 0 : Math.max(0, Number(btn.dataset.quantity) + Number(btn.dataset.qtyChange));
      btn.disabled = true;
      fetch(rrr.routes.cartChange + '.js', { method: 'POST', headers: jsonHeaders, body: JSON.stringify({ id: key, quantity: qty }) })
        .then(function (r) { return r.json(); })
        .then(function () { return refreshDrawer(); })
        .catch(function () { window.location.href = rrr.routes.cart; });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !drawer.hidden) closeDrawer();
      if (e.key === 'Tab' && !drawer.hidden) {
        var f = drawer.querySelectorAll('a[href], button:not([disabled]), input');
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    document.querySelectorAll('[data-cart-open]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        if (document.body.classList.contains('template-cart')) return;
        e.preventDefault();
        openDrawer();
      });
    });
  }

  // Produktformular: per Ajax in den Warenkorb, Fallback ist der normale Formular-Submit
  var form = document.getElementById('ProductForm');
  if (form && drawer && window.FormData && window.fetch) {
    form.addEventListener('submit', function (e) {
      var btn = form.querySelector('[data-add-to-cart]');
      if (btn && btn.disabled) return;
      e.preventDefault();
      if (btn) btn.disabled = true;
      var body = new FormData(form);
      body.delete('option-0'); body.delete('option-1'); body.delete('option-2');
      fetch(rrr.routes.cartAdd + '.js', { method: 'POST', headers: { 'Accept': 'application/json' }, body: body })
        .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, json: j }; }); })
        .then(function (res) {
          if (!res.ok) throw new Error(res.json.description || res.json.message || 'error');
          return refreshDrawer().then(openDrawer);
        })
        .catch(function (err) {
          var msg = form.querySelector('.form-status');
          if (!msg) { msg = document.createElement('p'); msg.className = 'form-status form-status--error'; msg.setAttribute('role', 'alert'); form.appendChild(msg); }
          msg.textContent = err && err.message && err.message !== 'error' ? err.message : (rrr.strings.addError || '');
        })
        .then(function () { if (btn) btn.disabled = false; });
    });
  }

  // ---- Suche mit Vorschlägen
  var overlay = document.getElementById('SearchOverlay');
  var input = document.querySelector('[data-predictive-input]');
  var results = document.querySelector('[data-predictive-results]');
  if (overlay && input && results) {
    var timer;
    var openSearch = function () { lastFocus = document.activeElement; overlay.hidden = false; input.focus(); };
    var closeSearch = function () { overlay.hidden = true; results.innerHTML = ''; if (lastFocus && lastFocus.focus) lastFocus.focus(); };
    document.querySelectorAll('[data-search-open]').forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); openSearch(); }); });
    overlay.querySelector('[data-search-close]').addEventListener('click', closeSearch);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !overlay.hidden) closeSearch(); });
    input.addEventListener('input', function () {
      clearTimeout(timer);
      var q = input.value.trim();
      if (!q) { results.innerHTML = ''; return; }
      timer = setTimeout(function () {
        var url = rrr.routes.predictiveSearch + '?q=' + encodeURIComponent(q) + '&resources[type]=product,collection,query&resources[limit]=6&section_id=predictive-search';
        fetch(url).then(function (r) { if (!r.ok) throw new Error(); return r.text(); }).then(function (html) {
          var doc = new DOMParser().parseFromString(html, 'text/html');
          var node = doc.querySelector('.predictive');
          results.innerHTML = '';
          if (node) results.appendChild(node);
        }).catch(function () { results.innerHTML = ''; });
      }, 250);
    });
  }

  // ---- Wunschliste (nur in diesem Browser, localStorage)
  var WKEY = 'rrr_wishlist';
  function readWishlist() { try { var v = JSON.parse(window.localStorage.getItem(WKEY) || '[]'); return Array.isArray(v) ? v : []; } catch (e) { return []; } }
  function writeWishlist(list) { try { window.localStorage.setItem(WKEY, JSON.stringify(list)); } catch (e) { /* Speicher nicht verfügbar */ } }
  function paintWishlist() {
    var list = readWishlist();
    document.querySelectorAll('[data-wishlist-toggle]').forEach(function (b) {
      var on = list.indexOf(b.dataset.handle) !== -1;
      b.setAttribute('aria-pressed', String(on));
      b.setAttribute('aria-label', on ? b.dataset.labelRemove : b.dataset.labelAdd);
    });
    document.querySelectorAll('[data-wishlist-count]').forEach(function (el) { el.textContent = list.length; el.hidden = list.length === 0; });
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-wishlist-toggle]');
    if (!b) return;
    e.preventDefault();
    var list = readWishlist(), i = list.indexOf(b.dataset.handle);
    if (i === -1) list.push(b.dataset.handle); else list.splice(i, 1);
    writeWishlist(list);
    paintWishlist();
    if (document.querySelector('[data-wishlist-page]')) renderWishlistPage();
  });
  function renderWishlistPage() {
    var page = document.querySelector('[data-wishlist-page]');
    if (!page) return;
    var ul = page.querySelector('[data-wishlist-list]'), empty = page.querySelector('[data-wishlist-empty]');
    var list = readWishlist();
    ul.innerHTML = '';
    empty.hidden = list.length > 0;
    list.forEach(function (handle) {
      fetch(rrr.routes.root + 'products/' + encodeURIComponent(handle) + '.js').then(function (r) { if (!r.ok) throw new Error(); return r.json(); }).then(function (p) {
        var li = document.createElement('li'), art = document.createElement('article'), a = document.createElement('a'), body = document.createElement('div'), t = document.createElement('h3'), pr = document.createElement('p');
        art.className = 'product-card'; a.className = 'product-card__media'; a.href = p.url;
        if (p.featured_image) { var img = document.createElement('img'); img.className = 'product-card__img'; img.src = p.featured_image; img.alt = p.title; img.loading = 'lazy'; a.appendChild(img); }
        body.className = 'product-card__body'; t.className = 'product-card__title'; t.textContent = p.title; pr.className = 'price'; pr.textContent = money(p.price);
        var rm = document.createElement('button'); rm.type = 'button'; rm.className = 'link label'; rm.dataset.wishlistToggle = ''; rm.dataset.handle = handle; rm.dataset.labelAdd = rrr.strings.wishlistAdd || ''; rm.dataset.labelRemove = rrr.strings.wishlistRemove || ''; rm.textContent = rrr.strings.wishlistRemove || '×';
        body.appendChild(t); body.appendChild(pr); body.appendChild(rm); art.appendChild(a); art.appendChild(body); li.appendChild(art); ul.appendChild(li);
      }).catch(function () { /* Produkt existiert nicht mehr */ });
    });
  }
  paintWishlist();
  renderWishlistPage();

  // ---- Kundenkonto: Adresse löschen (Shopify erwartet POST mit _method=delete), Länder vorwählen
  document.querySelectorAll('[data-address-delete]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!window.confirm(btn.dataset.confirm || '')) return;
      var f = document.createElement('form'), m = document.createElement('input');
      f.method = 'post'; f.action = btn.dataset.addressDelete;
      m.type = 'hidden'; m.name = '_method'; m.value = 'delete';
      f.appendChild(m); document.body.appendChild(f); f.submit();
    });
  });
  document.querySelectorAll('select[data-selected-country]').forEach(function (sel) {
    var want = sel.dataset.selectedCountry;
    if (!want) return;
    Array.prototype.some.call(sel.options, function (o) { if (o.value === want || o.text === want) { sel.value = o.value; return true; } return false; });
  });
})();
