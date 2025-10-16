# 🕯️ Contributing to Midnight Relay
**Neon Dreams. Human Glitch.**  
Welcome to the Signal. If you’re reading this, you’re helping shape the future of Midnight Relay — an art-driven, AI-powered cyberpunk brand built on code, chaos, and aesthetics.

---

## ⚙️ Development Philosophy
Midnight Relay lives at the intersection of *cinema, technology, and horror*.  
Every commit, design, or script should feel intentional — beautiful, eerie, or both.

> “Perfection isn’t clean. It’s human, with better lighting.”

---

## 🧩 Repository Structure
```
/
├── index.html          # Homepage (Synthwave theme)
├── halloween.html      # Lovecraftian variant
├── css/                # Stylesheets
├── js/                 # Core + seasonal scripts
├── assets/             # Icons, banners, sigils
├── themes/lovecraft/   # Halloween theme resources
├── _headers            # Security + Cache directives
├── _redirects          # Routing and subdomains
└── README.md           # Documentation
```

---

## 🧠 Guidelines

### 💬 1. Communication
- Discuss major design or direction changes in GitHub Issues first.  
- Keep messages brief, witty, and professional — this is a cyberpunk studio, not a law firm.

### 🔧 2. Commits
Use clear, cinematic commit messages:
```
feat: add glowing sigil to header
fix: corrected flicker animation on hero banner
chore: cleaned JS comments for readability
```
Prefix with:
- `feat` → new feature  
- `fix` → bug or layout fix  
- `chore` → cleanup or structure changes  
- `style` → purely visual / CSS tweak  
- `content` → text, metadata, copy updates  

### 🎨 3. Design Consistency
- Use **cyan (#00ffff)** and **magenta (#ff00ff)** as brand primaries.  
- Avoid gradients that clash or dilute the neon.  
- Fonts: *Inter* for body, *Cinzel* for headers.  
- Use noise/grain overlays for depth — perfection is sterile.  
- Keep animations subtle; the site breathes, not blinks.

### 🧰 4. Code Style
- Indentation: 2 spaces.  
- Use double quotes for HTML attributes.  
- Keep inline JS minimal — scripts belong in `/js/main.js`.  
- Compress assets before pushing.  
- Test dark mode visibility — everything should pop against black.

### 🔒 5. Security
- Respect the `_headers` and `_redirects` rules.  
- Never include external scripts that can track or inject data.  
- Keep Netlify forms spam-protected (honeypot or CAPTCHA when scaling).

### 🧤 6. Deployment
- Push to `main` only after local testing.  
- Run “Clear cache and deploy site” on Netlify for major updates.  
- Verify all routes: `/`, `/halloween`, `/shop`, `/about`, `/contact`.

---

## 🖤 Code of Conduct
Be chill. Be weird. Be creative.  
Midnight Relay is a collaborative art project — not a corporate death cult.  
Respect contributors, reject toxicity, and keep things playful.

---

## 💬 Questions or Transmissions
Open an issue or contact:  
📧 **transmissions@midnight-relay.org**

---

> “We build signals in the dark. The relay is always listening.”
