# 🌌 Midnight Relay  
**Neon Dreams. Human Glitch.**  
A cyberpunk art lab & AI signal by Ash Vale.

---

## ⚙️ Overview
Midnight Relay is the central hub for the brand’s art, media, and merch — built for speed, simplicity, and aesthetic precision.

**Core Stack:**
- ⚡ Netlify — static hosting  
- 💻 GitHub — version control  
- 🛒 Shopify + Printify — merch backend  
- 🎨 HTML / CSS / JS — fully static (no framework build step)

---

## 🧩 Site Structure
```
/
├── index.html          → Home (Synthwave aesthetic)
├── about.html          → Brand & Manifesto
├── projects.html       → Portfolio / Art Showcase
├── shop.html           → Store page (links to Shopify)
├── contact.html        → Email form (Netlify Form)
├── halloween.html      → Lovecraftian variant (Halloween event)
│
├── css/                → Stylesheets
├── js/                 → Scripts
├── assets/             → Icons, logos, images, OG banners
├── themes/lovecraft/   → Halloween theme assets
│
├── _headers            → Security, cache, and theme headers
└── _redirects          → Clean URLs + subdomain routing
```

---

## 🚀 Deployment

### 1. Deploy on Netlify
- Connect the repo to [Netlify](https://app.netlify.com).
- Settings:
  ```
  Branch to deploy: main
  Base directory:   (leave blank)
  Build command:    (leave blank)
  Publish directory: /
  ```
- Trigger Deploy → *Clear cache and redeploy site*.

### 2. Custom Domain
- Root: **midnight-relay.org**
- Subdomains:
  - **shop.midnight-relay.org** → Shopify storefront  
  - **halloween.midnight-relay.org** → Lovecraftian variant

### 3. Redirects & Headers
- `_redirects` handles clean URLs and subdomain routing.
- `_headers` enforces HTTPS, HSTS, CSP, and dark-theme compatibility.

---

## 🧠 Shopify Integration
Open `/js/main.js` and set your live store URL:
```js
window.SHOPIFY_STORE_URL = "https://shop.midnight-relay.org";
```

---

## 🔮 Metadata
Add these meta tags to your `<head>` for social previews:

```html
<meta property="og:image" content="https://midnight-relay.org/assets/og-banner.png">
<meta name="twitter:image" content="https://midnight-relay.org/assets/og-banner.png">
<link rel="icon" href="/assets/favicon.png">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
```

---

## 🧛‍♂️ Halloween Mode
The Lovecraftian variant is accessible at:
```
https://midnight-relay.org/halloween
```
To make it appear automatically during October, include the optional banner script from `js/main.js`.

---

## 🛡️ Security Highlights
- Strict Content Security Policy  
- HSTS & Referrer Policy enabled  
- Permissions Policy disables camera, mic, and geolocation  
- Cache-Control for lightning-fast loads  

---

## 💬 Contact
**Transmissions:**  
📧 `transmissions@midnight-relay.org`  
🕹️ [midnight-relay.org](https://midnight-relay.org)

---
© Midnight Relay | Ash Vale System | *Neon Dreams. Human Glitch.*
