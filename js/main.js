const globalObject = typeof window !== 'undefined' ? window : globalThis;

// Set your Shopify storefront URL here (e.g. https://your-store.myshopify.com or https://shop.midnight-relay.org)
globalObject.SHOPIFY_STORE_URL = globalObject.SHOPIFY_STORE_URL || "https://your-store.myshopify.com";

(function(global){
  function normalizePath(pathname){
    if (!pathname) return '/';
    return pathname.replace(/index\.html$/, '/');
  }

  function highlightCurrentNavLinks(document, location, baseOrigin){
    if (!document || typeof document.querySelectorAll !== 'function') return [];
    const navLinks = Array.from(document.querySelectorAll('.nav nav a'));
    if (!navLinks.length) return [];

    const currentPath = normalizePath(location && location.pathname);
    const origin = baseOrigin || (location && location.origin) || 'http://localhost';
    const matches = [];

    navLinks.forEach(link => {
      const getAttr = typeof link.getAttribute === 'function'
        ? name => link.getAttribute(name)
        : name => (name === 'href' ? link.href : undefined);

      const setAttr = typeof link.setAttribute === 'function'
        ? (name, value) => link.setAttribute(name, value)
        : (name, value) => { if (name === 'href') link.href = value; };

      const hasAttr = typeof link.hasAttribute === 'function'
        ? name => link.hasAttribute(name)
        : name => (name === 'href' ? typeof link.href === 'string' : false);

      const href = getAttr('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

      let linkPath;
      try {
        linkPath = normalizePath(new URL(href, origin).pathname);
      } catch {
        return;
      }

      if (linkPath === currentPath){
        if (link.classList && typeof link.classList.add === 'function'){
          link.classList.add('active');
        }
        if (!hasAttr('aria-current')){
          setAttr('aria-current', 'page');
        }
        matches.push(link);
      }
    });

    return matches;
  }

  function configureShopLink(document, storeUrl){
    if (!document || typeof document.getElementById !== 'function') return { status: 'missing-document' };

    const shopLink = document.getElementById('shopLink');
    if (!shopLink) return { status: 'missing-link' };

    const help = document.getElementById('shopHelp');
    const isValid = typeof storeUrl === 'string' && /^https?:\/\//.test(storeUrl);

    if (isValid){
      if (typeof shopLink.setAttribute === 'function'){
        shopLink.setAttribute('href', storeUrl);
      } else {
        shopLink.href = storeUrl;
      }
      return { status: 'valid', href: storeUrl };
    }

    const preventClick = event => {
      if (event && typeof event.preventDefault === 'function'){
        event.preventDefault();
      }
    };

    if (typeof shopLink.setAttribute === 'function'){
      shopLink.setAttribute('href', '#');
    } else {
      shopLink.href = '#';
    }

    if (typeof shopLink.addEventListener === 'function'){
      shopLink.addEventListener('click', preventClick);
    }

    if (help){
      help.textContent = 'Set window.SHOPIFY_STORE_URL in js/main.js to your actual Shopify URL.';
    }

    return { status: 'invalid', href: '#', message: help ? help.textContent : undefined };
  }

  function updateFooterYear(document, currentDate){
    if (!document || typeof document.getElementById !== 'function') return false;
    const yearEl = document.getElementById('year');
    if (!yearEl) return false;

    const date = currentDate instanceof Date ? currentDate : new Date();
    yearEl.textContent = String(date.getFullYear());
    return true;
  }

  function init(){
    const document = global.document;
    if (!document) return { updatedYear: false, highlighted: [], shop: { status: 'no-document' } };

    const updatedYear = updateFooterYear(document);
    const highlighted = highlightCurrentNavLinks(document, global.location);
    const shop = configureShopLink(document, global.SHOPIFY_STORE_URL);

    return { updatedYear, highlighted, shop };
  }

  const api = {
    normalizePath,
    highlightCurrentNavLinks,
    configureShopLink,
    updateFooterYear,
    init
  };

  if (typeof module !== 'undefined' && module.exports){
    module.exports = api;
  } else {
    global.MidnightRelay = Object.assign(global.MidnightRelay || {}, api);
  }

  if (global.document){
    init();
  }
})(globalObject);
