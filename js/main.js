// Set your Shopify storefront URL here (e.g. https://your-store.myshopify.com or https://shop.midnight-relay.org)
window.SHOPIFY_STORE_URL = window.SHOPIFY_STORE_URL || "https://your-store.myshopify.com";

(function(){
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const shopLink = document.getElementById('shopLink');
  const help = document.getElementById('shopHelp');
  if (shopLink){
    if (window.SHOPIFY_STORE_URL && /^https?:\/\//.test(window.SHOPIFY_STORE_URL)){
      shopLink.href = window.SHOPIFY_STORE_URL;
    } else {
      shopLink.href = "#";
      shopLink.addEventListener('click', e => e.preventDefault());
      if (help) help.textContent = "Set window.SHOPIFY_STORE_URL in js/main.js to your actual Shopify URL.";
    }
  }
})();