const assert = require('node:assert/strict');
const test = require('node:test');

const {
  highlightCurrentNavLinks,
  configureShopLink,
  updateFooterYear
} = require('../js/main.js');

class ClassList {
  constructor(){
    this._set = new Set();
  }

  add(token){
    this._set.add(token);
  }

  contains(token){
    return this._set.has(token);
  }
}

class StubLink {
  constructor(href){
    this.href = href;
    this.attributes = {};
    this.classList = new ClassList();
    this.listeners = {};
    this.textContent = '';
  }

  getAttribute(name){
    if (name === 'href') return this.href;
    return this.attributes[name];
  }

  setAttribute(name, value){
    if (name === 'href'){
      this.href = value;
    } else {
      this.attributes[name] = String(value);
    }
  }

  hasAttribute(name){
    if (name === 'href') return typeof this.href === 'string';
    return Object.prototype.hasOwnProperty.call(this.attributes, name);
  }

  addEventListener(type, handler){
    this.listeners[type] = handler;
  }

  dispatchEvent(type, event){
    if (this.listeners[type]){
      this.listeners[type](event);
    }
  }
}

class StubDocument {
  constructor({ links = [], elements = {} } = {}){
    this.links = links;
    this.elements = elements;
  }

  querySelectorAll(selector){
    if (selector === '.nav nav a'){
      return this.links;
    }
    return [];
  }

  getElementById(id){
    return this.elements[id] || null;
  }
}

test('highlightCurrentNavLinks marks the matching navigation link as active', () => {
  const homeLink = new StubLink('/');
  const projectsLink = new StubLink('/projects.html');
  const contactLink = new StubLink('/contact.html');
  const document = new StubDocument({ links: [homeLink, projectsLink, contactLink] });
  const location = { pathname: '/projects.html', origin: 'https://midnight-relay.org' };

  const matches = highlightCurrentNavLinks(document, location);

  assert.equal(matches.length, 1);
  assert.strictEqual(matches[0], projectsLink);
  assert.ok(projectsLink.classList.contains('active'));
  assert.equal(projectsLink.getAttribute('aria-current'), 'page');
  assert.equal(contactLink.getAttribute('aria-current'), undefined);
});

test('highlightCurrentNavLinks respects existing aria-current attribute', () => {
  const currentLink = new StubLink('/step.html');
  currentLink.setAttribute('aria-current', 'step');
  const document = new StubDocument({ links: [currentLink] });
  const location = { pathname: '/step.html', origin: 'https://midnight-relay.org' };

  highlightCurrentNavLinks(document, location);

  assert.equal(currentLink.getAttribute('aria-current'), 'step');
});

test('configureShopLink assigns the storefront URL when valid', () => {
  const shopLink = new StubLink('#');
  const document = new StubDocument({ elements: { shopLink } });

  const result = configureShopLink(document, 'https://shop.example.com');

  assert.equal(result.status, 'valid');
  assert.equal(shopLink.href, 'https://shop.example.com');
});

test('configureShopLink disables the link and shows help for invalid URLs', () => {
  const shopLink = new StubLink('#');
  const help = { textContent: '' };
  const document = new StubDocument({ elements: { shopLink, shopHelp: help } });

  const result = configureShopLink(document, 'not-a-url');

  assert.equal(result.status, 'invalid');
  assert.equal(shopLink.href, '#');
  assert.equal(help.textContent, 'Set window.SHOPIFY_STORE_URL in js/main.js to your actual Shopify URL.');

  let prevented = false;
  shopLink.dispatchEvent('click', { preventDefault(){ prevented = true; } });
  assert.ok(prevented);
});

test('updateFooterYear writes the provided year', () => {
  const yearEl = { textContent: '' };
  const document = new StubDocument({ elements: { year: yearEl } });

  const updated = updateFooterYear(document, new Date('2023-04-15T00:00:00Z'));

  assert.ok(updated);
  assert.equal(yearEl.textContent, '2023');
});
