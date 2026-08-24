const colors = ["#56e7ff", "#75ffd8", "#bda4ff", "#ff8cca", "#fff2c7"];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const donationLink = "https://paypal.me/CherishedAngelArt";
const formspreeEndpoint = "https://formspree.io/f/xnjrngqq";
const satchelStorageKey = "annuscha-reader-satchel";
const satchelCatalog = {
  elysium: {
    id: "elysium",
    title: "Eclipse of Elysium",
    format: "PDF",
    price: "R90.00",
    cover: "assets/Elysium pics/e-book cover Eclipse of Elysium 1 final.webp",
    description: "Book I of Cycles of Shadow & Light. A dark fantasy romance of forbidden shadow magic, prophecy, and dangerous love.",
    sample: "assets/Elysium pics/Eclipse of Elysium Sample.pdf",
    payhip: "https://payhip.com/b/qLoMJ",
    payhipProduct: "qLoMJ"
  },
  xyphara: {
    id: "xyphara",
    title: "Planet of Xyphara",
    format: "PDF",
    price: "Coming soon",
    cover: "assets/Planet of Xyphara/scenery/hometown forest on planet Xyphara.webp",
    description: "A bioluminescent world of butterfly beings, moth kingdoms, dangerous beauty, and secrets beneath the glow.",
    sample: "book-xyphara.html#preview",
    payhip: ""
  },
  remains: {
    id: "remains",
    title: "What Remains of Me",
    format: "PDF",
    price: "R90.00",
    cover: "assets/What remains of me pics/E book cover What remains of me (1).webp",
    description: "A dystopian dark romance where trauma awakens Echo powers and one girl refuses to become a weapon.",
    sample: "assets/What remains of me pics/sample of What remains of me.pdf",
    payhip: "https://payhip.com/b/zXdEY",
    payhipProduct: "zXdEY",
    payhipVariant: "1778471563630"
  }
};
const socialLinks = {
  Facebook: "https://www.facebook.com/profile.php?id=61589214846274",
  TikTok: "https://www.tiktok.com/@cherishedange1?is_from_webapp=1&sender_device=pc",
  Instagram: "#",
  YouTube: "https://www.youtube.com/@CherishedAngel",
  Payhip: "https://payhip.com/CherishedAngelArt",
  Amazon: "https://www.amazon.com/stores/author/B0FMR57MXP/about?ccs_id=55afa422-63f9-445d-8b64-bdae5d80631c"
};
const ageGateStorageKey = "annuscha-age-verified";
const cookieConsentKey = "annuscha-cookie-consent";

function readerAuthGuard() {
  // Auth0 protection is handled in auth.js. Keep visual/site behavior separate from login
  // so this static site never creates a fake localStorage authentication session.
  return false;
}

function ensureSkipLink() {
  const main = document.querySelector("main");
  if (!main) return;
  if (!main.id) main.id = "main-content";
  if (!document.querySelector(".skip-link")) {
    const link = document.createElement("a");
    link.className = "skip-link";
    link.href = `#${main.id}`;
    link.textContent = "Skip to content";
    document.body.prepend(link);
  }
}

function ambientLayer() {
  if (reduceMotion.matches) return;
  const layer = document.createElement("div");
  layer.className = "ambient";
  document.body.prepend(layer);

  const particleCount = window.matchMedia("(max-width: 768px)").matches ? 12 : 54;
  for (let i = 0; i < particleCount; i += 1) {
    const dot = document.createElement("i");
    dot.className = "particle";
    dot.style.setProperty("--x", `${Math.random() * 100}vw`);
    dot.style.setProperty("--sway", `${Math.random() * 100 - 50}px`);
    dot.style.setProperty("--size", `${Math.random() * 4 + 2}px`);
    dot.style.setProperty("--speed", `${Math.random() * 15 + 15}s`);
    dot.style.setProperty("--color", colors[i % colors.length]);
    dot.style.animationDelay = `${Math.random() * -24}s`;
    layer.appendChild(dot);
  }

  const petalCount = window.matchMedia("(max-width: 768px)").matches ? 3 : 18;
  for (let i = 0; i < petalCount; i += 1) {
    const petal = document.createElement("i");
    petal.className = "petal";
    petal.style.setProperty("--x", `${Math.random() * 100}vw`);
    petal.style.setProperty("--size", `${Math.random() * 8 + 8}px`);
    petal.style.setProperty("--speed", `${Math.random() * 14 + 16}s`);
    petal.style.setProperty("--delay", `${Math.random() * -22}s`);
    petal.style.setProperty("--drift", `${Math.random() * 220 - 110}px`);
    layer.appendChild(petal);
  }
}

function cursorTrail() {
  if (reduceMotion.matches) return;
  if (window.matchMedia("(max-width: 768px)").matches) return;
  let last = 0;
  window.addEventListener("pointermove", (event) => {
    const now = Date.now();
    if (now - last < 35) return;
    last = now;
    const spark = document.createElement("i");
    spark.className = "trail";
    spark.style.left = `${event.clientX}px`;
    spark.style.top = `${event.clientY}px`;
    spark.style.setProperty("--size", `${Math.random() * 7 + 6}px`);
    spark.style.setProperty("--color", colors[Math.floor(Math.random() * colors.length)]);
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 640);
  }, { passive: true });
}

function isAgeVerified() {
  try {
    return localStorage.getItem(ageGateStorageKey) === "true";
  } catch (error) {
    return false;
  }
}

function ageGate(onVerified) {
  if (isAgeVerified()) {
    document.documentElement.classList.remove("age-pending");
    return false;
  }
  const gate = document.createElement("div");
  gate.className = "age-gate show";
  gate.setAttribute("role", "dialog");
  gate.setAttribute("aria-modal", "true");
  gate.setAttribute("aria-labelledby", "age-title");
  gate.innerHTML = `
    <form class="age-box" data-age-form>
      <div class="age-warning" aria-hidden="true">18+</div>
      <p class="eyebrow">Mature Fantasy Content</p>
      <h2 id="age-title">Enter Your Date of Birth</h2>
      <div class="dob-grid">
        <label>Day<input inputmode="numeric" autocomplete="bday-day" name="day" placeholder="DD" maxlength="2" required></label>
        <label>Month<input inputmode="numeric" autocomplete="bday-month" name="month" placeholder="MM" maxlength="2" required></label>
        <label>Year<input inputmode="numeric" autocomplete="bday-year" name="year" placeholder="YYYY" maxlength="4" required></label>
      </div>
      <p class="age-error" data-age-error aria-live="polite"></p>
      <button class="btn primary" type="submit">Enter</button>
      <p>This website contains mature fantasy fiction, violence, dark romance, and age-restricted content.</p>
      <p class="age-confirm">By entering, you confirm you are 18+ and agree to the <a href="terms.html">Terms</a> and <a href="privacy.html">Privacy Policy</a>. This is a self-declared age gate.</p>
      <p class="quote age-discretion">Viewer discretion advised.</p>
    </form>`;
  document.body.appendChild(gate);
  const form = gate.querySelector("[data-age-form]");
  const error = gate.querySelector("[data-age-error]");
  const firstInput = gate.querySelector("input");
  firstInput.focus();
  gate.addEventListener("keydown", (event) => {
    if (event.key !== "Tab") return;
    const focusables = Array.from(gate.querySelectorAll("a, button, input, select, textarea")).filter((item) => !item.disabled);
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const day = Number(data.get("day"));
    const month = Number(data.get("month"));
    const year = Number(data.get("year"));
    const birthDate = new Date(year, month - 1, day);
    const validDate = birthDate.getFullYear() === year && birthDate.getMonth() === month - 1 && birthDate.getDate() === day;
    if (!validDate) {
      error.textContent = "Please enter a valid date of birth.";
      return;
    }
    const today = new Date();
    let age = today.getFullYear() - year;
    const hadBirthday = today.getMonth() > month - 1 || (today.getMonth() === month - 1 && today.getDate() >= day);
    if (!hadBirthday) age -= 1;
    if (age < 18) {
      error.textContent = "Access denied.";
      return;
    }
    try {
      localStorage.setItem(ageGateStorageKey, "true");
    } catch (error) {
      console.warn("Age gate confirmation could not be stored.", error);
    }
    document.documentElement.classList.remove("age-pending");
    gate.remove();
    if (typeof onVerified === "function") onVerified();
  });
  return true;
}

function cookieConsent() {
  let stored = null;
  try {
    stored = localStorage.getItem(cookieConsentKey);
  } catch (error) {
    stored = null;
  }
  if (stored || document.querySelector(".cookie-consent")) return;

  const banner = document.createElement("section");
  banner.className = "cookie-consent";
  banner.setAttribute("aria-label", "Cookie and local storage consent");
  banner.innerHTML = `
    <div class="cookie-sigil" aria-hidden="true">
      <span class="cookie-dot dot-one"></span>
      <span class="cookie-dot dot-two"></span>
      <span class="cookie-dot dot-three"></span>
      <span class="cookie-spark spark-one"></span>
      <span class="cookie-spark spark-two"></span>
    </div>
    <div class="cookie-copy">
      <h2>+ Magical Cookie Notice +</h2>
      <p>On this site we use magical cookies to enhance your journey across the realms, remember your choices, and help the archive run smoothly.</p>
      <div class="cookie-choices" hidden>
        <p>Essential cookies keep the age gate, satchel, and reader features working. Optional cookies may support future analytics or marketing if added later.</p>
        <div class="cookie-choice-actions">
          <button class="btn ghost cookie-pill" type="button" data-cookie-reject>Essential Only</button>
          <button class="btn primary cookie-pill" type="button" data-cookie-optional-accept>Allow Optional</button>
        </div>
      </div>
    </div>
    <div class="cookie-actions">
      <button class="btn primary cookie-pill" type="button" data-cookie-accept>Accept All</button>
      <button class="btn ghost cookie-pill" type="button" data-cookie-manage>Manage Preferences</button>
      <button class="btn ghost cookie-pill" type="button" data-cookie-reject>Reject Non-Essential</button>
    </div>
    <p class="cookie-note">You can change your choices at any time.</p>
    <div class="cookie-links">
      <a href="privacy.html">Privacy Policy</a>
      <span aria-hidden="true">+</span>
      <a href="privacy.html#cookies">Cookie Policy</a>
    </div>`;
  document.body.appendChild(banner);

  const choices = banner.querySelector(".cookie-choices");
  const manage = banner.querySelector("[data-cookie-manage]");
  const save = (mode) => {
    const consent = {
      essential: true,
      analytics: mode === "accept",
      marketing: mode === "accept",
      savedAt: new Date().toISOString()
    };
    if (mode === "reject") {
      consent.analytics = false;
      consent.marketing = false;
    }
    try {
      localStorage.setItem(cookieConsentKey, JSON.stringify(consent));
    } catch (error) {
      console.warn("Cookie consent could not be stored in this browser session.", error);
    }
    banner.remove();
  };
  banner.querySelectorAll("[data-cookie-accept], [data-cookie-optional-accept]").forEach((button) => {
    button.addEventListener("click", () => save("accept"));
  });
  banner.querySelectorAll("[data-cookie-reject]").forEach((button) => {
    button.addEventListener("click", () => save("reject"));
  });
  manage?.addEventListener("click", () => {
    const isHidden = choices.hasAttribute("hidden");
    if (isHidden) {
      choices.removeAttribute("hidden");
      manage.textContent = "Hide Choices";
    } else {
      choices.setAttribute("hidden", "");
      manage.textContent = "Configure Cookies";
    }
  });
}

function ravenAssistant() {
  if (document.querySelector(".raven-assistant")) return;
  const assistant = document.createElement("aside");
  assistant.className = "raven-assistant";
  assistant.setAttribute("aria-label", "The Raven website assistant");
  assistant.innerHTML = [
    '<button class="raven-toggle" type="button" aria-expanded="false" aria-controls="raven-panel">',
    '  <span aria-hidden="true">R</span>',
    '  <span class="sr-only">Open The Raven assistant</span>',
    '</button>',
    '<section class="raven-panel" id="raven-panel" hidden>',
    '  <div class="raven-header">',
    '    <div>',
    '      <p class="eyebrow">The Raven</p>',
    '      <h3>Welcome, wanderer. I am the Raven of CherishedAngel&#39;s Chronicles.</h3>',
    '    </div>',
    '    <button class="raven-close" type="button" aria-label="Close The Raven">&#x263D;&#x263E;</button>',
    '  </div>',
    '  <form class="raven-search" role="search">',
    '    <label for="raven-query" class="sr-only">Ask The Raven</label>',
    '    <input id="raven-query" name="raven_query" type="search" placeholder="Search books, characters, lore..." autocomplete="off">',
    '    <button class="btn primary" type="submit">Ask</button>',
    '  </form>',
    '  <div class="raven-response" role="status" aria-live="polite">',
    '    <p>Ask what the shadows remember, or choose a path below.</p>',
    '  </div>',
    '  <div class="raven-quick" aria-label="Quick Raven links">',
    '    <button type="button" data-raven-query="books">Books</button>',
    '    <button type="button" data-raven-query="characters">Characters</button>',
    '    <button type="button" data-raven-query="gallery">Gallery</button>',
    '    <button type="button" data-raven-query="lore">Lore</button>',
    '    <button type="button" data-raven-query="faq">FAQ</button>',
    '    <button type="button" data-raven-query="buy a book">Buy a Book</button>',
    '    <button type="button" data-raven-query="contact">Contact</button>',
    '  </div>',
    '</section>'
  ].join("");
  document.body.appendChild(assistant);

  const toggle = assistant.querySelector(".raven-toggle");
  const panel = assistant.querySelector(".raven-panel");
  const close = assistant.querySelector(".raven-close");
  const form = assistant.querySelector(".raven-search");
  const input = assistant.querySelector("#raven-query");
  const response = assistant.querySelector(".raven-response");
  const siteKnowledge = [
    { title: "Books Archive", type: "Books", keywords: ["book", "books", "archive", "read", "novel", "story", "stories", "series", "cycle"], answer: "The book archive gathers Annuscha Botes' dark fantasy romance worlds, samples, formats, and individual book pages.", link: "books.html", linkText: "Browse Books" },
    { title: "Eclipse of Elysium", type: "Book", keywords: ["elysium", "eclipse", "shadow", "shadowmancer", "blue magic", "prophecy", "cain", "garrin", "elysia"], answer: "Eclipse of Elysium belongs to the Cycles of Shadow & Light. Expect forbidden magic, prophecy, dragons, beastmen, and cerulean shadow power.", link: "book-elysium.html", linkText: "Open Elysium" },
    { title: "Planet of Xyphara", type: "Book", keywords: ["xyphara", "planet", "butterfly", "moth", "bioluminescent", "fae", "lunaria", "lumen", "caelum", "lyra"], answer: "Planet of Xyphara is the bioluminescent butterfly and moth realm, full of glowing forests, wings, secrets, and dangerous beauty.", link: "book-xyphara.html", linkText: "Open Xyphara" },
    { title: "What Remains of Me", type: "Book", keywords: ["what remains", "remains", "echo", "company", "dystopian", "angel", "draven", "steve", "weapon", "trauma"], answer: "What Remains of Me is the dystopian Echo-power story where pain is used to awaken weapons, and Angel Reyes has other plans.", link: "book-remains.html", linkText: "Open What Remains of Me" },
    { title: "Samples and Preview Chapters", type: "Reading Help", keywords: ["sample", "preview", "chapter", "free", "read sample", "first chapter"], answer: "Samples and preview chapters are free glimpses only. They do not expose the full paid PDFs in the frontend.", link: "books.html", linkText: "Find Samples" },
    { title: "Buy a Book", type: "Purchase Help", keywords: ["buy", "buy a book", "order", "purchase", "claim", "copy", "pdf", "pay", "payment", "paypal", "payhip"], answer: "Use Your Satchel to gather chosen books. Real checkout and digital delivery are handled securely through Payhip, never through custom card fields on this website.", link: "cart.html", linkText: "Open Your Satchel" },
    { title: "Audiobooks", type: "Purchase Help", keywords: ["audio", "audiobook", "audiobooks", "narration", "voice", "listen", "mp3"], answer: "Audiobooks are not available yet. If Audio appears on a form, treat it as a future-format placeholder until Annuscha announces otherwise.", link: "faq.html", linkText: "Read FAQ" },
    { title: "Characters Archive", type: "Characters", keywords: ["character", "characters", "profile", "bio", "power", "origin", "spoiler", "spoiler safe"], answer: "The character archive holds spoiler-safe profiles, worlds, powers, origins, and links to each character's page.", link: "characters.html", linkText: "Meet the Characters" },
    { title: "Elysia Nightshade", type: "Character", keywords: ["elysia", "nightshade", "shadowmancer", "blue hair", "blue magic", "light magic", "shadow magic"], answer: "Elysia Nightshade belongs to Eclipse of Elysium. She carries light magic touched by forbidden shadow and a destiny she refuses to let own her.", link: "character-elysia.html", linkText: "Open Elysia" },
    { title: "Cain Brisha", type: "Character", keywords: ["cain", "brisha", "beastman", "crimson eyes", "shade", "love interest"], answer: "Cain Brisha is the beastman love interest of Eclipse of Elysium: brutal, loyal, protective, and haunted by old loss.", link: "character-cain.html", linkText: "Open Cain" },
    { title: "Garrin of the Enclaves", type: "Character", keywords: ["garrin", "enclaves", "elarian", "light magic", "celestial", "love interest"], answer: "Garrin is the ancient Elarian mage of light, prophecy, restraint, and dangerous longing.", link: "character-garrin.html", linkText: "Open Garrin" },
    { title: "Angel Reyes", type: "Character", keywords: ["angel", "reyes", "echo", "devotion", "what remains", "company"], answer: "Angel Reyes is the heart of What Remains of Me, a survivor whose Echo turns devotion into something the Company cannot control.", link: "character-angel.html", linkText: "Open Angel" },
    { title: "Lunaria and Lumen", type: "Characters", keywords: ["lunaria", "lumen", "xyphara", "butterfly", "moth", "future sight", "time reversal"], answer: "Lunaria Papillion and Lumen Nox belong to Planet of Xyphara, where wings, visions, speed, and time magic glow beneath the surface.", link: "characters.html", linkText: "Find Xyphara Characters" },
    { title: "Lore & Chronicles", type: "Lore", keywords: ["lore", "chronicles", "blog", "worldbuilding", "world lore", "record", "archive", "behind the book"], answer: "Lore & Chronicles is the living archive for blog posts, worldbuilding articles, reader updates, behind-the-scenes notes, and forbidden records.", link: "lore.html", linkText: "Read Lore" },
    { title: "Maps, Magic Systems, and Provinces", type: "Lore", keywords: ["map", "maps", "geography", "province", "provinces", "lands", "magic system", "magic systems", "deleted scene", "teaser"], answer: "Lore records can hold maps, geography, magic systems, provinces, lands, deleted scenes, teasers, prophecies, and timeline clues.", link: "lore.html", linkText: "Open Lore Records" },
    { title: "Gallery", type: "Gallery", keywords: ["gallery", "art", "image", "images", "visual", "archive", "scenery", "creatures", "magic", "relics", "symbols", "fan art"], answer: "The gallery is CherishedAngel's visual archive for scenery, creatures, magic, relics, symbols, and future fan art portals.", link: "gallery.html", linkText: "Open Gallery" },
    { title: "FAQ", type: "FAQ", keywords: ["faq", "question", "questions", "warning", "warnings", "mature", "privacy", "account", "downloads", "refund", "ai art"], answer: "The FAQ answers story questions, purchase and download help, content warnings, privacy and accounts, and artwork or AI-process questions.", link: "faq.html", linkText: "Read FAQ" },
    { title: "Contact the Author", type: "Contact", keywords: ["contact", "email", "message", "press", "collaboration", "collab", "reader enquiry", "author", "raven"], answer: "For reader letters, press, collaborations, or questions that are not answered in the archive, send a raven through the contact page.", link: "contact.html", linkText: "Contact Annuscha" },
    { title: "Reader Dashboard and Satchel", type: "Account", keywords: ["login", "sign in", "account", "reader", "satchel", "download", "downloads", "purchased", "purchase history", "missing download"], answer: "Your reader dashboard shows your Auth0 profile. Your Satchel stores selected books on this device and sends real purchases through Payhip.", link: "cart.html", linkText: "Open Your Satchel" },
    { title: "Mature Content and Age Gate", type: "Safety", keywords: ["age", "age gate", "18", "adult", "mature", "content warning", "violence", "dark romance", "terms", "privacy"], answer: "This site is intended for adults and includes mature fantasy themes, violence, dark romance, and age-restricted content. Terms and privacy pages explain the rules.", link: "content-disclaimer.html", linkText: "Read Content Disclaimer" }
  ];

  // Future upgrade point: route the query to a secure OpenAI/Firebase/Supabase
  // backend here. Keep provider secrets and API keys server-side, never in this file.
  const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9\s&-]/g, " ").replace(/\s+/g, " ").trim();
  const tokenize = (value) => normalize(value).split(" ").filter((word) => word.length > 2);
  const scoreEntry = (entry, query) => {
    const normalizedQuery = normalize(query);
    const tokens = tokenize(query);
    const haystack = normalize(entry.title + " " + entry.type + " " + entry.keywords.join(" ") + " " + entry.answer);
    let score = 0;
    entry.keywords.forEach((keyword) => {
      const normalizedKeyword = normalize(keyword);
      if (normalizedKeyword && normalizedQuery.includes(normalizedKeyword)) score += normalizedKeyword.includes(" ") ? 8 : 5;
    });
    tokens.forEach((token) => {
      if (haystack.includes(token)) score += 2;
    });
    if (normalize(entry.title).includes(normalizedQuery)) score += 10;
    if (normalize(entry.type).includes(normalizedQuery)) score += 4;
    return score;
  };
  const renderResults = (matches) => matches.map((match) =>
    '<article class="raven-result">' +
      '<p class="eyebrow">' + match.type + '</p>' +
      '<strong>' + match.title + '</strong>' +
      '<p>' + match.answer + '</p>' +
      '<a href="' + match.link + '">' + match.linkText + '</a>' +
    '</article>'
  ).join("");
  const respond = (query) => {
    const text = query.trim();
    if (!text) {
      response.innerHTML = '<p>Welcome, wanderer. I am the Raven of CherishedAngel\'s Chronicles. Ask what the shadows remember.</p>';
      return;
    }
    const matches = siteKnowledge
      .map((entry) => ({ ...entry, score: scoreEntry(entry, text) }))
      .filter((entry) => entry.score > 0)
      .sort((first, second) => second.score - first.score)
      .slice(0, 4);
    response.innerHTML = matches.length
      ? renderResults(matches)
      : '<p>I could not find that record. Try Books, Characters, Gallery, Lore, FAQ, Buy a Book, or Contact.</p>';
    response.scrollTop = 0;
  };
  const setOpen = (open) => {
    panel.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    if (open) input.focus();
  };
  toggle.addEventListener("click", () => setOpen(panel.hidden));
  close.addEventListener("click", () => setOpen(false));
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    respond(input.value);
  });
  assistant.querySelectorAll("[data-raven-query]").forEach((button) => {
    button.addEventListener("click", () => {
      const query = button.dataset.ravenQuery || "";
      input.value = query;
      respond(query);
    });
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !panel.hidden) setOpen(false);
  });
}

function activeNav() {
  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach((link) => {
    if (link.getAttribute("href") === page) link.classList.add("active");
  });
  if (["characters.html", "gallery.html", "lore.html"].includes(page)) {
    document.querySelectorAll(".nav-chronicles .nav-top").forEach((link) => link.classList.add("active"));
  }
}

function enhanceNavMenus() {
  document.querySelectorAll(".brand").forEach((brand) => {
    if (brand.querySelector(".brand-logo")) return;
    const logo = document.createElement("img");
    logo.className = "brand-logo";
    logo.src = "assets/ideas/icon brand.webp";
    logo.alt = "";
    logo.setAttribute("aria-hidden", "true");
    brand.prepend(logo);
  });

  const menus = {
    books: [
      ["Eclipse of Elysium", "book-elysium.html"],
      ["Planet of Xyphara", "book-xyphara.html"],
      ["What Remains of Me", "book-remains.html"],
      ["Your Satchel", "cart.html"]
    ]
  };
  const chroniclesMenu = [
    {
      label: "Characters",
      href: "characters.html",
      items: [
        ["Elysium", "characters.html#elysium"],
        ["What Remains", "characters.html#remains"],
        ["Planet Xyphara", "characters.html#xyphara"]
      ]
    },
    {
      label: "Gallery",
      href: "gallery.html",
      items: [
        ["Elysium", "gallery.html?world=elysium"],
        ["What Remains", "gallery.html?world=remains"],
        ["Planet Xyphara", "gallery.html?world=xyphara"]
      ]
    },
    {
      label: "Lore",
      href: "lore.html",
      items: [
        ["World Lore", "lore.html#worlds-system"],
        ["Map: What Remains", "map-wrm.html"],
        ["Forbidden Records", "lore.html#forbidden-records"],
        ["Archive", "lore.html#archive"]
      ]
    }
  ];

  document.querySelectorAll(".nav").forEach((nav) => {
    if (nav.dataset.enhanced === "true") return;
    Array.from(nav.children).forEach((child) => {
      if (!(child instanceof HTMLAnchorElement)) return;
      const key = child.textContent.trim().toLowerCase();
      if (key === "faq" || key === "lore" || key === "gallery") {
        child.remove();
        return;
      }
      if (key === "characters") {
        const wrapper = document.createElement("div");
        wrapper.className = "nav-item nav-chronicles";
        const topLink = child.cloneNode(false);
        topLink.href = "characters.html";
        topLink.textContent = "The Chronicles";
        topLink.classList.add("nav-top");
        const dropdown = document.createElement("div");
        dropdown.className = "dropdown chronicles-dropdown";
        dropdown.setAttribute("aria-label", "The Chronicles submenu");
        chroniclesMenu.forEach((group) => {
          const subItem = document.createElement("section");
          subItem.className = "dropdown-group";
          const link = document.createElement("a");
          link.href = group.href;
          link.textContent = group.label;
          link.className = "dropdown-group-title";
          const subDropdown = document.createElement("div");
          subDropdown.className = "dropdown-group-links";
          subDropdown.setAttribute("aria-label", `${group.label} worlds`);
          group.items.forEach(([label, href]) => {
            const subLink = document.createElement("a");
            subLink.href = href;
            subLink.textContent = label;
            subDropdown.appendChild(subLink);
          });
          subItem.append(link, subDropdown);
          dropdown.appendChild(subItem);
        });
        wrapper.append(topLink, dropdown);
        child.replaceWith(wrapper);
        return;
      }
      const items = menus[key];
      if (!items) return;
      const wrapper = document.createElement("div");
      wrapper.className = "nav-item";
      const topLink = child.cloneNode(true);
      topLink.classList.add("nav-top");
      const dropdown = document.createElement("div");
      dropdown.className = "dropdown";
      dropdown.setAttribute("aria-label", `${child.textContent.trim()} submenu`);
      items.forEach(([label, href]) => {
        const link = document.createElement("a");
        link.href = href;
        link.textContent = label;
        dropdown.appendChild(link);
      });
      wrapper.append(topLink, dropdown);
      child.replaceWith(wrapper);
    });
    nav.dataset.enhanced = "true";
  });

  document.querySelectorAll('a[href="login.html"]').forEach((link) => {
    if (link.closest(".site-header")) {
      link.classList.add("sign-in-glow");
      link.textContent = "Sign in";
    }
  });
}

function mobileNavigation() {
  const mainLinks = [
    ["Home", "index.html"],
    ["Books", "books.html"],
    ["Author", "author.html"],
    ["Contact", "contact.html"],
    ["Satchel", "cart.html"],
    ["Sign In", "login.html"]
  ];
  const chronicleLinks = [
    ["Characters", "characters.html"],
    ["Gallery", "gallery.html"],
    ["Lore", "lore.html"]
  ];

  document.querySelectorAll(".site-header").forEach((header, index) => {
    if (header.querySelector(".mobile-menu-toggle")) return;
    const menuId = `mobile-menu-${index}`;
    const toggle = document.createElement("button");
    toggle.className = "mobile-menu-toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-label", "Open mobile navigation");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", menuId);
    toggle.innerHTML = "<span></span><span></span><span></span>";

    const menu = document.createElement("nav");
    menu.className = "mobile-menu";
    menu.id = menuId;
    menu.setAttribute("aria-label", "Mobile navigation");
    menu.hidden = true;

    const mainList = document.createElement("div");
    mainList.className = "mobile-menu-links";
    const chronicleButton = document.createElement("button");
    chronicleButton.className = "mobile-more-toggle";
    chronicleButton.type = "button";
    chronicleButton.setAttribute("aria-expanded", "false");
    chronicleButton.setAttribute("aria-controls", `${menuId}-chronicle`);
    chronicleButton.textContent = "The Chronicle";

    const chronicleList = document.createElement("div");
    chronicleList.className = "mobile-more-links";
    chronicleList.id = `${menuId}-chronicle`;
    chronicleList.hidden = true;
    chronicleList.setAttribute("aria-hidden", "true");
    chronicleLinks.forEach(([label, href]) => {
      const link = document.createElement("a");
      link.href = href;
      link.textContent = label;
      chronicleList.appendChild(link);
    });

    mainLinks.forEach(([label, href]) => {
      const link = document.createElement("a");
      link.href = href;
      link.textContent = label;
      if (label === "Sign In") link.classList.add("sign-in-glow");
      if (label === "Satchel") {
        link.classList.add("mobile-satchel-link");
        link.innerHTML = '<span class="satchel-bag-icon" aria-hidden="true"></span>Your Satchel <span class="satchel-count" data-satchel-count>0</span>';
      }
      mainList.appendChild(link);
      if (label === "Author") {
        mainList.append(chronicleButton, chronicleList);
      }
    });

    const setOpen = (open) => {
      menu.hidden = !open;
      header.classList.toggle("mobile-menu-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close mobile navigation" : "Open mobile navigation");
      if (!open) {
        chronicleList.classList.remove("is-open");
        chronicleList.setAttribute("aria-hidden", "true");
        chronicleButton.setAttribute("aria-expanded", "false");
      }
    };

    toggle.addEventListener("click", () => setOpen(menu.hidden));
    chronicleButton.addEventListener("click", () => {
      const open = chronicleButton.getAttribute("aria-expanded") !== "true";
      chronicleList.hidden = false;
      chronicleList.classList.toggle("is-open", open);
      chronicleList.setAttribute("aria-hidden", String(!open));
      chronicleButton.setAttribute("aria-expanded", String(open));
    });
    menu.addEventListener("click", (event) => {
      if (event.target instanceof HTMLAnchorElement) setOpen(false);
    });
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !menu.hidden) setOpen(false);
    });

    menu.append(mainList);
    header.append(toggle, menu);
  });
}

function polishGlobalChrome() {
  document.querySelectorAll('a[href="cart.html"]').forEach((link) => {
    if (link.textContent.trim().toLowerCase() === "cart") link.textContent = "Satchel";
  });
  document.querySelectorAll(".footer").forEach((footer) => {
    const inner = footer.querySelector(".footer-inner");
    const intro = inner?.firstElementChild;
    if (inner && intro && inner.dataset.linksNormalized !== "true") {
      const introBlock = intro.cloneNode(true);
      inner.innerHTML = "";
      inner.append(
        introBlock,
        footerColumn("The Chronicle", [
          ["Books", "books.html"],
          ["Characters", "characters.html"],
          ["Lore & Chronicles", "lore.html"],
          ["CherishedAngel's Chronicles", "gallery.html"]
        ]),
        footerColumn("Reader", [
          ["My Chronicle", "user.html"],
          ["FAQ", "faq.html"],
          ["Contact", "contact.html"]
        ]),
        footerColumn("Legal", [
          ["Privacy", "privacy.html"],
          ["Terms of Use & Sale", "terms.html"],
          ["Content Disclaimer", "content-disclaimer.html"]
        ])
      );
      inner.dataset.linksNormalized = "true";
    }
    if (footer.querySelector(".footer-bottom-bar")) return;
    const socials = document.createElement("div");
    socials.className = "social-icons";
    socials.setAttribute("aria-label", "Social links");
    [
      ["Facebook", "fe--facebook"],
      ["TikTok", "lineicons--tiktok-alt"],
      ["YouTube", "mynaui--youtube-solid"],
      ["Payhip", "simple-icons--payhip"],
      ["Amazon", "streamline-logos--amazon-logo-block"]
    ].forEach(([name, iconClass]) => {
      const link = document.createElement("a");
      link.href = socialLinks[name] || "#";
      link.className = "social-link";
      link.setAttribute("aria-label", name);
      if (link.getAttribute("href") !== "#") {
        link.target = "_blank";
        link.rel = "noopener";
      }
      link.innerHTML = `<span class="${iconClass}" aria-hidden="true"></span>`;
      socials.appendChild(link);
    });
    const bar = document.createElement("div");
    bar.className = "footer-bottom-bar";
    bar.innerHTML = `<p>&copy; 2026 Annuscha Botes Author Cherished Angel Chronicles. All rights reserved.</p>`;
    footer.prepend(socials);
    footer.appendChild(bar);
  });
  document.querySelectorAll('a[href="login.html"]').forEach((link) => {
    if (link.textContent.trim().toLowerCase() === "my chronicle") link.href = "user.html";
  });
}

function footerColumn(title, links) {
  const column = document.createElement("div");
  const heading = document.createElement("p");
  heading.className = "footer-title";
  heading.textContent = title;
  column.appendChild(heading);
  links.forEach(([label, href]) => {
    const link = document.createElement("a");
    link.href = href;
    link.textContent = label;
    column.appendChild(link);
  });
  return column;
}

function readSatchel() {
  try {
    const stored = JSON.parse(localStorage.getItem(satchelStorageKey) || "[]");
    return Array.isArray(stored) ? stored.filter((id) => satchelCatalog[id]) : [];
  } catch (error) {
    return [];
  }
}

function writeSatchel(items) {
  localStorage.setItem(satchelStorageKey, JSON.stringify([...new Set(items)]));
  updateSatchelCount();
}

function updateSatchelCount() {
  const count = readSatchel().length;
  document.querySelectorAll("[data-satchel-count]").forEach((node) => {
    node.textContent = String(count);
    node.hidden = count === 0;
  });
}

function showSatchelToast(message) {
  let toast = document.querySelector(".satchel-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "satchel-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toast._hideTimer);
  toast._hideTimer = window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function showPendingSatchelToast() {
  try {
    const message = sessionStorage.getItem("annuscha-satchel-toast");
    if (!message) return;
    sessionStorage.removeItem("annuscha-satchel-toast");
    window.setTimeout(() => showSatchelToast(message), 160);
  } catch (error) {
    // Toasts are decorative; the Satchel content still renders if sessionStorage is blocked.
  }
}

function ensureSatchelChrome() {
  document.querySelectorAll(".site-header").forEach((header) => {
    const actions = header.querySelector(".header-actions");
    if (!actions || actions.querySelector("[data-satchel-link]")) return;
    const link = document.createElement("a");
    link.className = "tiny-link satchel-nav-link";
    link.href = "cart.html";
    link.setAttribute("aria-label", "Open Your Satchel");
    link.title = "Your Satchel";
    link.dataset.satchelLink = "true";
    link.innerHTML = '<span class="satchel-bag-icon" aria-hidden="true"></span><span class="satchel-count" data-satchel-count>0</span>';
    actions.prepend(link);
  });
  updateSatchelCount();
}

function satchelActions() {
  document.querySelectorAll("[data-add-satchel]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.addSatchel;
      const book = satchelCatalog[id];
      if (!book) return;
      const items = readSatchel();
      const exists = items.includes(id);
      if (!exists) writeSatchel([...items, id]);
      const message = exists ? `${book.title} is already in your Satchel.` : `${book.title} was added to your Satchel.`;
      showSatchelToast(message);
      if (!/cart\.html$/i.test(window.location.pathname)) {
        try {
          sessionStorage.setItem("annuscha-satchel-toast", message);
        } catch (error) {
          // The redirect still works without this decorative confirmation.
        }
        window.setTimeout(() => {
          window.location.href = "cart.html";
        }, 520);
      }
    });
  });
}

function renderSatchelPage() {
  const root = document.querySelector("[data-satchel-page]");
  if (!root) return;
  const requestedBook = new URLSearchParams(window.location.search).get("book");
  if (requestedBook && satchelCatalog[requestedBook] && !readSatchel().includes(requestedBook)) {
    writeSatchel([...readSatchel(), requestedBook]);
    window.history.replaceState({}, document.title, "cart.html");
  }
  const list = root.querySelector("[data-satchel-list]");
  const empty = root.querySelector("[data-satchel-empty]");
  const summaryCount = root.querySelector("[data-satchel-summary-count]");
  const clearButton = root.querySelector("[data-clear-satchel]");
  if (!list || !empty) return;

  const checkoutButton = (book) => {
    if (!book.payhip) {
      return `<a class="btn disabled" aria-disabled="true" tabindex="-1">Payhip Link Coming Soon</a>`;
    }
    const variant = book.payhipVariant ? ` data-target-variant="${book.payhipVariant}"` : "";
    const product = book.payhipProduct ? ` data-product="${book.payhipProduct}"` : "";
    return `<a class="btn primary payhip-buy-button" href="${book.payhip}" data-theme="grey"${product}${variant}>Proceed to Secure Checkout</a>`;
  };

  const render = () => {
    const items = readSatchel();
    const emptyMessage = empty.querySelector("[data-satchel-empty-message]");
    const emptyTitle = empty.querySelector("h3");
    const emptyAction = empty.querySelector(".btn");
    list.innerHTML = "";
    empty.hidden = false;
    empty.classList.toggle("satchel-continue-panel", items.length > 0);
    if (emptyTitle) emptyTitle.hidden = items.length > 0;
    if (emptyAction) emptyAction.hidden = items.length > 0;
    if (emptyMessage) {
      emptyMessage.hidden = items.length === 0;
      emptyMessage.innerHTML = items.length === 0
        ? ""
        : '<a href="books.html">Explore more in the Veil Beyond</a>';
    }
    if (summaryCount) summaryCount.textContent = `${items.length} ${items.length === 1 ? "story" : "stories"} chosen`;
    if (clearButton) clearButton.hidden = items.length === 0;

    items.forEach((id) => {
      const book = satchelCatalog[id];
      const item = document.createElement("article");
      item.className = "satchel-item";
      item.innerHTML = `
        <img src="${book.cover}" alt="${book.title} cover" loading="lazy" decoding="async">
        <div>
          <p class="eyebrow">${book.format}</p>
          <h3>${book.title}</h3>
          <p>${book.description}</p>
          <div class="format-row"><span class="tag">${book.format}</span><span class="tag">${book.price}</span></div>
        </div>
        <div class="satchel-price">
          <strong>${book.price}</strong>
          ${checkoutButton(book)}
          <button class="btn ghost" type="button" data-remove-satchel="${book.id}">Remove</button>
        </div>
      `;
      list.appendChild(item);
    });

    list.querySelectorAll("[data-remove-satchel]").forEach((button) => {
      button.addEventListener("click", () => {
        writeSatchel(readSatchel().filter((id) => id !== button.dataset.removeSatchel));
        render();
      });
    });
  };

  clearButton?.addEventListener("click", () => {
    writeSatchel([]);
    render();
  });
  render();
}

function contactTabs() {
  const tabs = document.querySelectorAll("[data-contact-tab]");
  const note = document.querySelector("[data-contact-note]");
  const select = document.querySelector("#enquiry-type");
  if (!tabs.length || !note || !select) return;
  const copy = {
    reader: "Book clubs, signed editions, heartfelt letters. If it is about the story, send it here.",
    press: "Interview requests, media kits, publication questions, and professional coverage.",
    collab: "Artists, book boxes, podcasts, newsletters, game-app collaborators, and brand partnerships."
  };
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");
      const key = tab.dataset.contactTab;
      note.textContent = copy[key];
      select.value = key;
    });
  });
}

function bookCarousel() {
  const carousel = document.querySelector("[data-book-carousel]");
  if (!carousel) return;
  const books = Array.from(carousel.querySelectorAll("[data-carousel-book]"));
  const prev = carousel.querySelector("[data-carousel-prev]");
  const next = carousel.querySelector("[data-carousel-next]");
  if (prev) prev.textContent = "<";
  if (next) next.textContent = ">";
  prev?.closest(".carousel-controls")?.classList.add("is-prev-control");
  next?.closest(".carousel-controls")?.classList.add("is-next-control");
  let active = 0;
  const render = () => {
    books.forEach((book, index) => {
      book.classList.remove("is-active", "is-prev", "is-next", "is-far");
      const delta = index - active;
      if (delta === 0) book.classList.add("is-active");
      else if (delta === -1 || delta === books.length - 1) book.classList.add("is-prev");
      else if (delta === 1 || delta === -(books.length - 1)) book.classList.add("is-next");
      else book.classList.add("is-far");
    });
    const progress = carousel.querySelector("[data-carousel-progress]");
    if (progress) progress.textContent = `${active + 1} / ${books.length}`;
  };
  prev?.addEventListener("click", () => {
    active = (active - 1 + books.length) % books.length;
    render();
  });
  next?.addEventListener("click", () => {
    active = (active + 1) % books.length;
    render();
  });
  books.forEach((book, index) => book.addEventListener("click", () => {
    if (index !== active) {
      active = index;
      render();
    }
  }));
  render();
}

function formspreeForms() {
  document.querySelectorAll("[data-formspree-form]").forEach((form) => {
    const status = form.querySelector("[data-form-status]");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (status) status.textContent = "Sending...";
      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" }
        });
        if (!response.ok) throw new Error(`Formspree responded with ${response.status}`);
        if (status) status.textContent = "Sent. Thank you. Your raven has reached the archive.";
        form.reset();
      } catch (error) {
        if (status) status.textContent = "The raven could not fly today. Please try again or email directly.";
      }
    });
  });
}

const galleryWorlds = {
  "elysium": {
    "label": "Eclipse of Elysium",
    "title": "Elysium Archives",
    "cards": [
      {
        "title": "Scenery of Elysium",
        "type": "Scenery",
        "image": "assets/Elysium pics/scenery/waterfall in Elysium.webp",
        "text": "Luminous lands, ancient waterfalls, forests, lakes, caves, ships, mountains, and places where light is never as pure as it seems.",
        "images": [
          "assets/Elysium pics/scenery/2 forest in Elysium.webp",
          "assets/Elysium pics/scenery/a building in Elysium.webp",
          "assets/Elysium pics/scenery/a lake in Elysium.webp",
          "assets/Elysium pics/scenery/cave in Elysium landscape.webp",
          "assets/Elysium pics/scenery/cave in Elysium.webp",
          "assets/Elysium pics/scenery/ChatGPT Image May 10, 2026, 03_10_56 PM.webp",
          "assets/Elysium pics/scenery/Default_a_forest_a_twisted_labyrinth_of_thorns_and_shadows_whe_0.webp",
          "assets/Elysium pics/scenery/Elysium forest landscape.webp",
          "assets/Elysium pics/scenery/Elysium landscape.webp",
          "assets/Elysium pics/scenery/Elysium.webp",
          "assets/Elysium pics/scenery/forest area in Elysium.webp",
          "assets/Elysium pics/scenery/forest in Elysium.webp",
          "assets/Elysium pics/scenery/house in Elysium lake.webp",
          "assets/Elysium pics/scenery/house in Elysium.webp",
          "assets/Elysium pics/scenery/Lake in Elysium.webp",
          "assets/Elysium pics/scenery/Leonardo_Diffusion_XL_action_photograph_of_a_full_body_shot_re_1 (1).webp",
          "assets/Elysium pics/scenery/magical place in Elysium.webp",
          "assets/Elysium pics/scenery/mountain peak in Elysium.webp",
          "assets/Elysium pics/scenery/place in Elysium.webp",
          "assets/Elysium pics/scenery/place on Elysium.webp",
          "assets/Elysium pics/scenery/Ship in Elysium.webp",
          "assets/Elysium pics/scenery/some mountains in Elysium.webp",
          "assets/Elysium pics/scenery/Sunset on Elysium.webp",
          "assets/Elysium pics/scenery/water in Elysium.webp",
          "assets/Elysium pics/scenery/waterfall in Elysium.webp"
        ]
      },
      {
        "title": "Creatures of Elysium",
        "type": "Creatures",
        "image": "assets/Elysium pics/creatures/Dragon.webp",
        "text": "Dragons, beastmen, old birds of omen, forest critters, and magic moving beneath the clouds.",
        "images": [
          "assets/Elysium pics/creatures/2 background.webp",
          "assets/Elysium pics/creatures/a deer in Elysium.webp",
          "assets/Elysium pics/creatures/Beast in the south.webp",
          "assets/Elysium pics/creatures/Bird in the Elysium north.webp",
          "assets/Elysium pics/creatures/critter in the woods.webp",
          "assets/Elysium pics/creatures/Dragon.webp",
          "assets/Elysium pics/creatures/eagles in the mountains.webp",
          "assets/Elysium pics/creatures/eExMOEJWLtxmzy9A27zE--1--9hxnw.webp",
          "assets/Elysium pics/creatures/faq background.webp",
          "assets/Elysium pics/creatures/FXKNGOastM3G3kajO9K6--1--4006h.webp",
          "assets/Elysium pics/creatures/IJlBuCCQf6uUGLUhXZa4--1--2kuyb.webp",
          "assets/Elysium pics/creatures/Leonardo_Diffusion_XL_action_photograph_of_a_full_body_shot_of_0 (1).webp",
          "assets/Elysium pics/creatures/Leonardo_Diffusion_XL_action_photograph_of_a_full_body_shot_re_1 (3).webp",
          "assets/Elysium pics/creatures/Leonardo_Diffusion_XL_action_photograph_of_a_full_body_shot_re_1.webp",
          "assets/Elysium pics/creatures/Leonardo_Diffusion_XL_photograph_of_a_full_body_shot_realistic_1.webp",
          "assets/Elysium pics/creatures/NOoefnzHbUV56VcVkCgq--n50ld.webp",
          "assets/Elysium pics/creatures/trDmXdL0njD3dSZezm80--1--biuis.webp"
        ]
      },
      {
        "title": "Magic of Elysium",
        "type": "Magic",
        "image": "assets/Elysium pics/magic/smokey yin yang background.webp",
        "text": "Blue power, corrupted light, prophecy visions, and shadows awakening beneath the skin.",
        "images": [
          "assets/Elysium pics/magic/ejEP3NgNOFQOgXe9iuVK--1--vir3k_4x-real-esrgan-x4-plus.webp",
          "assets/Elysium pics/magic/ejEP3NgNOFQOgXe9iuVK--2--nhtsw_1.5x-clty-upscale-79bjj.webp",
          "assets/Elysium pics/magic/smokey yin yang background.webp",
          "assets/Elysium pics/magic/yin yang background.webp",
          "assets/Elysium pics/magic/yin yang for a background.webp"
        ]
      },
      {
        "title": "Relics of Elysium",
        "type": "Relics / Symbols",
        "image": "assets/Elysium pics/relics and symbols/magical flower in Elysium.webp",
        "text": "Eclipse marks, twin-sun signs, strange flowers, and symbols bound to prophecy.",
        "images": [
          "assets/Elysium pics/relics and symbols/a flower from Elysium.webp",
          "assets/Elysium pics/relics and symbols/a flower on Elysium.webp",
          "assets/Elysium pics/relics and symbols/Elysium through Garrin's eyes.webp",
          "assets/Elysium pics/relics and symbols/magical flower in Elysium.webp",
          "assets/Elysium pics/relics and symbols/magical plant from Elysium.webp",
          "assets/Elysium pics/relics and symbols/utjU1lDMsxiNQj3bQDnL--3--3l5ab.webp"
        ]
      }
    ]
  },
  "xyphara": {
    "label": "Planet of Xyphara",
    "title": "Xyphara Archives",
    "cards": [
      {
        "title": "Scenery of Xyphara",
        "type": "Scenery",
        "image": "assets/Planet of Xyphara/scenery/magical landscape in planet Xyphara.webp",
        "text": "Bioluminescent forests, glowing petals, cloud towns, oceans, caves, castles, and skies alive with impossible color.",
        "images": [
          "assets/Planet of Xyphara/scenery/a little town in planet Xyphara.webp",
          "assets/Planet of Xyphara/scenery/a place in planet Xyphara forgoten.webp",
          "assets/Planet of Xyphara/scenery/a place in planet Xyphara.webp",
          "assets/Planet of Xyphara/scenery/area in planet Xyphara.webp",
          "assets/Planet of Xyphara/scenery/building in planet Xyphara.webp",
          "assets/Planet of Xyphara/scenery/building on planet Xyphara.webp",
          "assets/Planet of Xyphara/scenery/Castle in planet Xyphara.webp",
          "assets/Planet of Xyphara/scenery/cave in planet Xyphara.webp",
          "assets/Planet of Xyphara/scenery/city near the forest in planet Xyphara.webp",
          "assets/Planet of Xyphara/scenery/cloud town on planet Xyphara.webp",
          "assets/Planet of Xyphara/scenery/fantasy landscape in planet Xyphara.webp",
          "assets/Planet of Xyphara/scenery/floating area in planet Xyphara.webp",
          "assets/Planet of Xyphara/scenery/home in planet Xyphara.webp",
          "assets/Planet of Xyphara/scenery/hometown forest on planet Xyphara.webp",
          "assets/Planet of Xyphara/scenery/house in planet Xyphara.webp",
          "assets/Planet of Xyphara/scenery/iq6KXn1DxCqt7wZXo548--1--0wrer.webp",
          "assets/Planet of Xyphara/scenery/Leonardo_Kino_XL_A_mystical_furrie_glittering_silverhaired_fur_0.webp",
          "assets/Planet of Xyphara/scenery/magical landscape in planet Xyphara.webp",
          "assets/Planet of Xyphara/scenery/place in planet Xyphara landscape.webp",
          "assets/Planet of Xyphara/scenery/planet Xyphara landscape.webp",
          "assets/Planet of Xyphara/scenery/planet Xyphara.webp",
          "assets/Planet of Xyphara/scenery/scary forest in planet Xyphara.webp",
          "assets/Planet of Xyphara/scenery/some mushrooms on planet Xyphara.webp",
          "assets/Planet of Xyphara/scenery/the ocean on planet Xyphara.webp",
          "assets/Planet of Xyphara/scenery/the order's castle in planet Xyphara.webp",
          "assets/Planet of Xyphara/scenery/the time in the desert region.webp",
          "assets/Planet of Xyphara/scenery/town landscape in planet Xyphara.webp",
          "assets/Planet of Xyphara/scenery/town on planet Xyphara.webp",
          "assets/Planet of Xyphara/scenery/Volcano in planet Xyphara.webp"
        ]
      },
      {
        "title": "Creatures of Xyphara",
        "type": "Creatures",
        "image": "assets/Planet of Xyphara/creatures/butterfly being.webp",
        "text": "Morphic beings, Creepers, forest critters, desert creatures, birds, dragonflies, and beautiful hungry things.",
        "images": [
          "assets/Planet of Xyphara/creatures/bird in forest.webp",
          "assets/Planet of Xyphara/creatures/birdy in forest.webp",
          "assets/Planet of Xyphara/creatures/butterfly being.webp",
          "assets/Planet of Xyphara/creatures/Cat critter in desert.webp",
          "assets/Planet of Xyphara/creatures/critter in the desert.webp",
          "assets/Planet of Xyphara/creatures/critters in forest.webp",
          "assets/Planet of Xyphara/creatures/dragonfly.webp",
          "assets/Planet of Xyphara/creatures/DreamShaper_v7_A_breathtaking_fantasy_scene_set_in_a_glitterin_1.webp",
          "assets/Planet of Xyphara/creatures/Leonardo_Lightning_XL_A_vivid_fantasy_concept_art_scene_set_in_1.webp",
          "assets/Planet of Xyphara/creatures/onion creature.webp",
          "assets/Planet of Xyphara/creatures/owl creature.webp",
          "assets/Planet of Xyphara/creatures/small butterfly being.webp"
        ]
      },
      {
        "title": "Extras of Xyphara",
        "type": "Extras",
        "image": "assets/Planet of Xyphara/relics and symbols/icon of world tree.webp",
        "text": "World-tree marks, wing sigils, travel vessels, cactus blooms, and strange glowing details from the planet.",
        "images": [
          "assets/Planet of Xyphara/relics and symbols/boat for travel.webp",
          "assets/Planet of Xyphara/relics and symbols/cactus flower planet Xyphara.webp",
          "assets/Planet of Xyphara/relics and symbols/caelum and lunaria.webp",
          "assets/Planet of Xyphara/relics and symbols/flower on planet Xyphara.webp",
          "assets/Planet of Xyphara/relics and symbols/FLyw9EbLgZc9eP3lHwd1--1--gzlh6.webp",
          "assets/Planet of Xyphara/relics and symbols/icon of world tree.webp",
          "assets/Planet of Xyphara/relics and symbols/image of world tree 2.webp",
          "assets/Planet of Xyphara/relics and symbols/image of world tree.webp",
          "assets/Planet of Xyphara/relics and symbols/lumen and lunaria.webp",
          "assets/Planet of Xyphara/relics and symbols/Madam Lefur.webp"
        ]
      }
    ]
  },
  "remains": {
    "label": "What Remains of Me",
    "title": "Echo Archives",
    "cards": [
      {
        "title": "The Company",
        "type": "Scenery",
        "image": "assets/What remains of me pics/scenery/city destroyed.webp",
        "text": "Cold corridors, broken cities, old experiments, and rooms where humanity is measured in pain.",
        "images": [
          "assets/What remains of me pics/scenery/Angel in the shower.webp",
          "assets/What remains of me pics/scenery/Background for the cover of What remains of me.webp",
          "assets/What remains of me pics/scenery/city Angel grew up in.webp",
          "assets/What remains of me pics/scenery/city destroyed.webp",
          "assets/What remains of me pics/scenery/old experiments.webp",
          "assets/What remains of me pics/scenery/the remains of what cities look like.webp",
          "assets/What remains of me pics/scenery/the soldiers of the company.webp"
        ]
      },
      {
        "title": "The Echo",
        "type": "Magic",
        "image": "assets/What remains of me pics/magic/Echo awaken inside Angel.webp",
        "text": "A weapon buried inside a girl who was never meant to survive awakening.",
        "images": [
          "assets/What remains of me pics/magic/Draven beast mode.webp",
          "assets/What remains of me pics/magic/Draven busy transforming.webp",
          "assets/What remains of me pics/magic/Echo awaken inside Angel.webp",
          "assets/What remains of me pics/magic/Steve manipuliation.webp"
        ]
      }
    ]
  },
  "future": {
    "label": "Future Realms",
    "title": "Future Realms",
    "cards": [
      {
        "title": "Future Realms",
        "type": "Coming Soon",
        "image": "assets/Background/portal.webp",
        "text": "New worlds are forming in the dark. Their doors have not opened yet.",
        "images": [
          "assets/Background/portal.webp",
          "assets/Background/color background.webp"
        ]
      }
    ]
  },
  "fanart": {
    "label": "Fan Art Portal",
    "title": "Fan Art Portal",
    "cards": [
      {
        "title": "Fan Art Portal",
        "type": "Coming Soon",
        "image": "assets/Background/fan art.webp",
        "text": "A future space for reader artwork, credited submissions, and community creations.",
        "images": [
          "assets/Background/fan art.webp"
        ]
      }
    ]
  }
};
function galleryChronicles() {
  const triggers = document.querySelectorAll(".world-gallery-card, .world-pulse:not(.is-disabled)");
  if (!triggers.length) return;

  let activeWorldKey = "elysium";
  let activeCategoryIndex = 0;
  let activeImageIndex = 0;

  const modal = document.createElement("div");
  modal.className = "gallery-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  document.body.appendChild(modal);

  const closeModal = () => {
    modal.classList.remove("show");
    modal.innerHTML = "";
  };

  const renderModal = (preserveScroll = false) => {
    const previousScroll = preserveScroll ? modal.querySelector(".gallery-modal-card")?.scrollTop || 0 : 0;
    const world = galleryWorlds[activeWorldKey] || galleryWorlds.elysium;
    const category = world.cards[activeCategoryIndex] || world.cards[0];
    const images = category.images?.length ? category.images : [category.image];
    const image = images[activeImageIndex % images.length];

    modal.innerHTML = `
      <div class="gallery-modal-card">
        <button class="btn ghost close-gallery-modal" type="button" data-gallery-close>Close</button>
        <p class="eyebrow">${world.label}</p>
        <h2>${world.title}</h2>
        <p class="lead">Choose Scenery, Creatures, Magic, or Relics, then page through the images in that archive.</p>
        <div class="gallery-modal-grid">
          <div class="gallery-category-list">
            ${world.cards.map((item, index) => `
              <button class="gallery-category-card ${index === activeCategoryIndex ? "active" : ""}" type="button" data-category="${index}">
                <span class="fan-stack">
                  ${(item.images || [item.image]).slice(0, 3).map((src) => `<img src="${src}" alt="">`).join("")}
                </span>
                <span>
                  <span class="eyebrow">${item.type}</span>
                  <strong>${item.title}</strong>
                  <small>${item.text}</small>
                </span>
              </button>
            `).join("")}
          </div>
          <figure class="gallery-viewer">
            <img src="${image}" alt="${category.title}">
            <figcaption>
              <span><strong>${category.title}</strong><br>${category.text}</span>
              <span class="gallery-viewer-controls">
                <button class="btn ghost" type="button" data-gallery-prev>Previous</button>
                <button class="btn ghost" type="button" data-gallery-next>Next</button>
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    `;

    modal.querySelector("[data-gallery-close]").addEventListener("click", closeModal);
    modal.querySelectorAll("[data-category]").forEach((button) => {
      button.addEventListener("click", () => {
        activeCategoryIndex = Number(button.dataset.category) || 0;
        activeImageIndex = 0;
        renderModal();
      });
    });
    modal.querySelector("[data-gallery-prev]").addEventListener("click", () => {
      activeImageIndex = (activeImageIndex - 1 + images.length) % images.length;
      renderModal(true);
    });
    modal.querySelector("[data-gallery-next]").addEventListener("click", () => {
      activeImageIndex = (activeImageIndex + 1) % images.length;
      renderModal(true);
    });
    if (preserveScroll) {
      requestAnimationFrame(() => {
        const card = modal.querySelector(".gallery-modal-card");
        if (card) card.scrollTop = previousScroll;
      });
    }
  };

  const openWorld = (worldKey) => {
    if (!galleryWorlds[worldKey] || worldKey === "future" || worldKey === "fanart") return;
    activeWorldKey = worldKey;
    activeCategoryIndex = 0;
    activeImageIndex = 0;
    document.querySelectorAll("[data-world]").forEach((node) => {
      node.classList.toggle("active", node.dataset.world === worldKey);
    });
    renderModal();
    modal.classList.add("show");
    modal.querySelector("[data-gallery-close]")?.focus();
    const url = new URL(window.location.href);
    url.searchParams.set("world", worldKey);
    window.history.replaceState({}, "", url);
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => openWorld(trigger.dataset.world || "elysium"));
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("show")) closeModal();
  });

  const requestedWorld = new URLSearchParams(window.location.search).get("world");
  if (["elysium", "xyphara", "remains"].includes(requestedWorld)) openWorld(requestedWorld);
}

function characterModals() {
  const cards = document.querySelectorAll("[data-character-modal]");
  if (!cards.length) return;
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.innerHTML = `
    <div class="modal-card">
      <button class="close-modal" type="button" data-modal-close>Close</button>
      <div class="modal-grid">
        <img data-modal-img alt="">
        <div class="modal-body">
          <p class="eyebrow" data-modal-world></p>
          <h2 data-modal-name></h2>
          <p class="lead" data-modal-power></p>
          <p data-modal-origin style="margin-top:14px"></p>
          <p data-modal-appearance style="margin-top:14px"></p>
          <p data-modal-synopsis style="margin-top:18px"></p>
        </div>
      </div>
    </div>`;
  document.body.appendChild(modal);
  const close = modal.querySelector("[data-modal-close]");
  const hide = () => modal.classList.remove("show");
  close.addEventListener("click", hide);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) hide();
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") hide();
  });
  cards.forEach((card) => {
    if (card instanceof HTMLAnchorElement && card.href) return;
    const openCard = () => {
      const spoilerSafe = document.body.classList.contains("spoiler-safe");
      modal.querySelector("[data-modal-img]").src = card.dataset.image || card.querySelector("img")?.src || "";
      modal.querySelector("[data-modal-img]").alt = card.dataset.name || "Character illustration";
      modal.querySelector("[data-modal-world]").textContent = `${card.dataset.world || "World unknown"} / ${card.dataset.place || "Province unknown"}`;
      modal.querySelector("[data-modal-name]").textContent = card.dataset.name || "Character";
      modal.querySelector("[data-modal-power]").textContent = card.dataset.power || "Magic power to be confirmed.";
      modal.querySelector("[data-modal-origin]").textContent = `Origin: ${card.dataset.place || "Placeholder until character sheet is confirmed."}`;
      modal.querySelector("[data-modal-appearance]").textContent = spoilerSafe ? "Appearance: hidden while spoiler-safe mode is on." : `Appearance: ${card.dataset.appearance || "Placeholder description."}`;
      modal.querySelector("[data-modal-synopsis]").textContent = spoilerSafe ? "Spoiler-safe mode is on. Turn it off on the Characters page to reveal expanded story notes." : card.dataset.synopsis || "Expanded synopsis placeholder.";
      modal.classList.add("show");
      close.focus();
    };
    card.addEventListener("click", openCard);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openCard();
      }
    });
  });
}

function spoilerSafeCharacters() {
  const toggle = document.getElementById("spoilerSafeToggle");
  if (!toggle) return;
  const label = document.querySelector("[data-spoiler-state]");
  const lock = document.querySelector("[data-spoiler-lock]");
  const apply = () => {
    document.body.classList.toggle("spoiler-safe", toggle.checked);
    if (label) label.textContent = toggle.checked ? "Basic details only" : "Unlocked profile view";
    if (lock) lock.textContent = toggle.checked ? "Locked" : "Unlocked";
    toggle.setAttribute("aria-checked", String(toggle.checked));
    toggle.setAttribute("aria-label", toggle.checked ? "Unlock character profile details" : "Lock character profile details");
  };
  toggle.addEventListener("change", apply);
  apply();
}

const lorePostBodies = {
  shadowWar: `
    <p>Archived within the forbidden records of the Living Chronicle.</p>
    <p>There was a time when Elysium did not fear the dark. Before the Golden Order rose from ash and holy fire, before shadow magic became a crime punishable by death, the realm existed in balance. Light and darkness were opposing halves of the same living force: creation and destruction, truth and illusion, life and death.</p>
    <p>That balance was protected by thirteen mages known as the Circle of Twilight. Seven wielded radiant arts of healing, protection, growth, and celestial flame. Six mastered shadowcraft, spirit binding, dream-walking, necromancy, and sacred communion between death and rebirth.</p>
    <p>Among them stood Lyralei Nightfall, the last true Shadowmancer. To some she was a guardian of balance. To others, a living omen.</p>
    <h4>The Ebonlight</h4>
    <p>The Ebonlight was a First Age relic created to bridge light, shadow, spirit, flame, life, and death. When the Circle fractured, Lyralei shattered the Ebonlight and hid its fragments across the realm before any single ruler could claim its power.</p>
    <h4>Elguard Evernight and the Golden Order</h4>
    <p>Elguard Evernight believed darkness corrupted everything it touched. He viewed balance as weakness, and he found someone grieving enough to manipulate: Rafahell Darkin, Lyralei's young dragon-blood apprentice.</p>
    <h4>The Great Sundering</h4>
    <p>Rafahell revealed the Circle's vulnerability: the Solstice Ritual. The attack came at midnight. Light-touched zealots descended while the thirteen mages were linked and defenseless. Holy fire consumed sanctuaries, spirits were severed, and the Whispering Wood was reduced to blackened ash.</p>
    <h4>The Shadowmancer Prophecy</h4>
    <blockquote>When the Radiant Heart finds its shadow twin, when opposites embrace in flesh and spirit, the Upbringer will awaken. Neither light nor dark but both, born of the ancient lines thought purged, carrier of balance to a world grown rigid in false purity.</blockquote>
    <p>For centuries, the Golden Order hunted every bloodline touched by shadow affinity. The Order called it purification. The survivors called it genocide.</p>
    <h4>The Dragon Wars and the False Golden Age</h4>
    <p>When the purges spread, the dragons rose beneath Kryzareth the Eternal Night. For three years, skies burned. The dragons lost and vanished into myth. Elguard declared the Golden Age, but without shadow, truth distorted; without darkness, light grew blinding. Balance cannot be destroyed forever. Only buried.</p>
  `,
  echoStages: `
    <p>Restricted Company Archive. Unauthorized distribution punishable by execution.</p>
    <p>For decades, humanity believed Echo manifestations were random miracles. They were wrong. An Echo is not a gift. It is pressure given consciousness: a fracture inside the human soul forced open through suffering, obsession, desperation, or purpose.</p>
    <h4>What Is an Echo?</h4>
    <p>An Echo is triggered when an individual reaches collapse while harboring an overwhelming internal drive. The Company calls this the Core Resonance Drive. The desperate, broken, obsessed, devoted, and surviving often manifest the strongest Echoes.</p>
    <h4>The Awakening Process</h4>
    <p>Echo candidates undergo weapons drills, combat training, survival conditioning, psychological stress testing, sleep deprivation, controlled starvation, isolation exposure, fear inducement, simulated executions, and pain resistance trials. The purpose is simple: break the candidate apart until something inside refuses to die.</p>
    <h4>Stage I - Fracture</h4>
    <p>Candidates experience heightened emotions, hallucinations, aggression, sensory distortion, and involuntary energy surges. The Company calls them Cracking Subjects.</p>
    <h4>Stage II - Manifestation</h4>
    <p>The Echo partially materializes. Abilities burst through during stress or emotional overload. Memory, emotional regulation, and physical restraint often fail. Subjects are either weaponized or terminated.</p>
    <h4>Stage III - Resonance</h4>
    <p>The user synchronizes with their Echo. Abilities become stable enough for tactical deployment, conscious activation, and combat operations.</p>
    <h4>Stage IV - Ascension</h4>
    <p>Rare and dangerous. Ascended users no longer merely control their Echo; they become extensions of it. The Company officially denies Stage IV exists. Internal records suggest otherwise.</p>
  `,
  dangerousEchoes: `
    <p>The Company ranks Echo types by containment risk, tactical usefulness, and probability of human identity collapse.</p>
    <h4>1. Shapeshifting Echo</h4><p><strong>Threat Level: Catastrophic.</strong> Users alter muscle density, bone structure, facial features, and entire biological forms. Side effects include identity deterioration, violent instincts, and emotional instability.</p>
    <h4>2. Mind Manipulation Echo</h4><p><strong>Threat Level: Omega.</strong> Users alter perception, emotion, memory, loyalty, and sensory experience. Victims often never realize they were manipulated.</p>
    <h4>3. Shadowform Transformation Echo</h4><p><strong>Threat Level: Omega.</strong> The body partially converts into smoke-like shadow matter, allowing operatives to phase, disappear into darkness, evade physical attacks, and infiltrate secured locations.</p>
    <h4>4. Flame Echo</h4><p><strong>Threat Level: Severe.</strong> Echo flames respond directly to emotional state. Anger increases heat, fear destabilizes control, and hatred creates the deadliest burns.</p>
    <h4>5. Devotion Echo</h4><p><strong>Threat Level: Unknown.</strong> This rare Echo responds through conviction, not domination. Subjects perceive the user's beliefs as undeniable truth and believe they act willingly. Advanced manifestations create cerulean lightning-like energy surges.</p>
    <h4>6. Kinetic Rupture Echo</h4><p><strong>Threat Level: Severe.</strong> The user stores force within the body and releases it explosively. Simple movements become lethal, but overuse can destroy the user's skeletal structure.</p>
    <h4>7. Fear Echo</h4><p><strong>Threat Level: Extreme.</strong> This Echo weaponizes terror through paralysis, hallucinations, panic attacks, sensory collapse, and induced trauma responses.</p>
    <p>The Company's greatest secret is not that Echoes exist. It is that suffering strengthens them.</p>
  `,
  emptyCoffin: `
    <div class="warning-seal">WARNING: This record contains restricted psychological fragments recovered from Company archives.</div>
    <p><strong>Forbidden Record 07 - The Empty Coffin</strong></p>
    <p><strong>Classification:</strong> Restricted. <strong>Source:</strong> Unstable memory fragment recovered from unauthorized Echo resonance. <strong>Status:</strong> Deleted timeline / psychological archive fragment.</p>
    <p>There was a version of the story where Draven was the monster from the very beginning. Before the records were rewritten, before The Company buried the truth beneath manipulated reports, there existed another sequence of events. One Angel still remembers in fragments.</p>
    <h4>The Original Awakening Attempt</h4>
    <p>In the earliest archived timeline, there was no Steve. Only Draven, and the thing living beneath his skin. The Company tried weapons drills, isolation, sleep deprivation, controlled starvation, punishment, and simulated executions. Nothing worked.</p>
    <h4>The Shapeshifter</h4>
    <p>Draven's predator-class Shapeshifting Echo was ideal for stealth, infiltration, psychological terror, and close-range elimination. The transformation was not clean: bones snapped, muscles stretched, and flesh folded into shadow-like distortion.</p>
    <h4>Shock Her Awake</h4>
    <p>Recovered audio transcripts contained only four words: Shock her awake permanently. Draven was ordered to hunt Angel through the abandoned training sector after curfew, with no restraints and no safety override.</p>
    <h4>The Moment Everything Broke</h4>
    <p>Draven caught her in his original form: human, terrified, desperate, and bleeding from Echo overexertion. He tried to explain that The Company had forced him into the operation because Angel was marked for disposal. The explanation came too late.</p>
    <h4>The Empty Coffin</h4>
    <p>The Company buried her within forty-eight hours. Internal notes recorded Echo activity long after biological shutdown. The coffin was later discovered empty: no broken locks, no disturbed soil, only scorch marks and cerulean residue burned into the lining. One note remained: The girl in the coffin opened her eyes.</p>
  `,
  cainMonster: `
    <p>There are stories the Golden Order burned from history. Stories whispered only in outcast camps and dying fires beneath the wilderness of Elysium. This is one of them: the story of how Cain Brisha stopped being a boy and became something far more dangerous.</p>
    <h4>The Blood Hunt</h4>
    <p>Among the Beastmen clans, coming of age was earned through survival. Every young warrior was sent alone into the wilds to complete the Blood Hunt: no forged weapons, no companions, no protection. Cain tracked an ancient Direhorn predator through the black forests near the western cliffs for nearly two days without sleep.</p>
    <p>The beast nearly killed him. Cain returned the favor. Torn open by claws and carrying a Direhorn trophy across his shoulders, he remembered thinking how proud his village would be. How proud Shade Crimson would be.</p>
    <h4>The Village in Ash</h4>
    <p>He never reached home. Smoke came first, then blood, burned fur, and the silence of slaughter. Homes were skeletal frames. Bodies lay in mud gone red. Golden Order banners stood among the flames like holy monuments.</p>
    <p>Near the river, one burned survivor gripped Cain's wrist and whispered the words that ended the boy he had been: The Order. They took Shade.</p>
    <h4>The Last Fang</h4>
    <p>Something inside Cain broke open primitively. His heartbeat slowed. His vision sharpened. Every scent became painfully clear. Less than a mile from the village, five Order riders learned that something monstrous was hunting them back.</p>
    <p>For three days, patrols vanished through the western forests. Scouts disappeared without sound. Some soldiers were found hanging from trees. Others were never found at all. Cain no longer fought like a warrior. He fought like grief given claws.</p>
    <p>The Golden Order named him a feral shadow-corrupted Beastman responsible for holy soldiers' deaths. The surviving outcasts called him the Last Fang, because monsters are not born. They are created.</p>
  `,
  beastmenExiled: `
    <p>The Golden Order teaches that Beastmen are savage creatures corrupted by shadow. That is the official history. It is also a lie.</p>
    <p>Long before Elguard Evernight and the Light Dominion, Beastmen lived across the western forests, southern canyon territories, and mountain wilds. They were hunters, guardians, spirit-walkers, and keepers of wilderness magic older than the Golden Order itself.</p>
    <h4>The Nature of Beastmen</h4>
    <p>Their magic came from instinct, moonlight, blood, shadow, and the wilderness. Some bloodlines carried heightened senses, spirit tracking, transformation magic, night vision, shadow camouflage, and rare shapeshifting gifts. To the ancient world, those gifts were part of balance. To Elguard, they were unacceptable.</p>
    <h4>The Shadow-Blood Decree</h4>
    <p>Less than twenty years after the Golden Order seized power, the Shadow-Blood Decree classified races with shadow affinity as spiritually impure. Beastmen, shadow practitioners, spirit callers, dream-walkers, dragon-blood lines, and lunar wilderness tribes became legal targets.</p>
    <h4>The Purges</h4>
    <p>The first campaigns were not wars. They were exterminations. Villages were burned during the night, sacred groves destroyed, and captured Beastmen faced execution, forced labor, or experimentation beneath Order prisons. Children with strong shadow affinity disappeared before adulthood.</p>
    <h4>Why Beastmen Became Feared</h4>
    <p>The Order taught citizens that Beastmen consumed human flesh, shapeshifters could not love, and shadow magic corrupted the soul. Fear became propaganda. Propaganda became law. Law became history.</p>
    <h4>The Truth Buried</h4>
    <p>Shadow was never the enemy. Balance was. Balance could not be controlled, and races like the Beastmen proved that darkness was not inherently evil. Only free.</p>
  `,
  xypharaInspired: `
    <p>Before Elysium, before shadow wars and forbidden magic, there was Xyphara. Planet of Xyphara was the first fantasy world I created as a teenager, full of glowing forests, butterfly kingdoms, moth clans, magical creatures, ancient prophecies, and impossible color.</p>
    <h4>Why Xyphara Returned</h4>
    <p>I returned to Xyphara because of my children. My eldest daughters love creating stories, but they sometimes stop because they fear the story is not good enough. Hearing that reminded me of the exact fear I carried as a teenager, and suddenly my unfinished world was waiting again.</p>
    <h4>Growing Up Homeschooled</h4>
    <p>A lot of Xyphara was inspired by loneliness. I was homeschooled, and although my parents gave me opportunities through youth groups, gymnastics, aikido, art classes, and gatherings, I often felt socially awkward and disconnected. Fantasy worlds became companions long before I understood how to create friendships in real life.</p>
    <h4>The Heart of Xyphara</h4>
    <p>At its core, Xyphara is about friendship, identity, feeling different, learning self-worth, and finding people who truly see you. Lunaria, Lumen, Talos, and the divided world itself all carry that longing to belong somewhere.</p>
    <h4>Returning to an Old Dream</h4>
    <p>Coming back to Xyphara as an adult felt like reopening a forgotten door and finding a younger version of myself waiting with unfinished dreams. I no longer write because I need perfection. I write because stories matter.</p>
  `,
  elysiumFirstLines: `
    <p>Before Elysia understood prophecy, before the Shadow War awakened again, before she became the name whispered in forbidden records, there was only fear.</p>
    <p>This was one of the earliest opening versions ever written for Shadows of Elysium: a darker, rawer introduction to Elysia's awakening before the story evolved into its current form.</p>
    <h4>Chapter 1 - The Awakening</h4>
    <p>Elysia shakes as her visions take control, turning dreams into nightmares. She tosses on the orphanage's straw mattress, sweat gleaming beneath the twin moons' crimson light. Faces of loved ones she has never seen but somehow knows flash behind her eyes. The metallic taste of blood fills her mouth.</p>
    <p>Reality fractures like broken glass. She sees an eclipse that should not exist, three celestial bodies aligned in impossible geometry. Something ancient emerges from the fabric of time itself, and her bones ache with recognition she cannot explain.</p>
    <p>Then Fennora's voice cuts through the dark like a rusted blade. The old elf drags Elysia from the mattress, spitting about witchcraft, forbidden dark magic, and the Order's failed soldier. Cold stone scrapes her bare feet raw.</p>
    <p>Light gathers in Fennora's palms, meant to end Elysia's life. Fear and confusion crash through her. Maybe she was born cursed. Maybe she does not deserve to live.</p>
    <p>But another vision clouds her sight: destiny tasting of copper and starlight, a place where her darkness would be understood instead of feared. Just as Fennora prepares the final spell, shadow tendrils emanate from Elysia's body.</p>
  `,
  worldsOfAnnuscha: `
    <p>Every fantasy world begins somewhere: with a forgotten dream, loneliness, a nightmare, or a single question that refuses to leave. For me, every world still carries a piece of me inside it.</p>
    <h4>What Remains of Me - Born From a Nightmare</h4>
    <p>The idea came from a vivid dream that stayed with me like a scar. The fear was personal, suffocating, tragic, and beautiful. That dream became The Company, Echo awakenings, psychological manipulation, survival, identity, Draven, and Angel.</p>
    <h4>Eclipse of Elysium - From AI Roleplay to Story</h4>
    <p>Eclipse of Elysium began unexpectedly as an AI bot I created on FlowGPT. The world grew through roleplay, the lore deepened, and eventually I realized it was not only a roleplay world anymore. It was a real story large enough to become a series.</p>
    <h4>Planet of Xyphara - The Story I Could Never Let Go</h4>
    <p>Xyphara is the oldest world I created. I abandoned it because I believed it was not good enough, then returned to it years later to show my children that creative dreams still matter, even when they take years to finish.</p>
    <h4>The Color Blue</h4>
    <p>Blue connects every world I create: forbidden magic in Elysium, cerulean Echo energy in What Remains of Me, and bioluminescent life in Xyphara. It became a thread woven quietly through every universe.</p>
  `,
  buildingXyphara: `
    <p>Every fantasy world starts with fragments: a color, a fear, a creature, a place that keeps staring back from the dark. For Xyphara, it began with butterflies. And oddly enough, grasshoppers.</p>
    <h4>Where Xyphara Truly Began</h4>
    <p>As a teenager, I loved fantasy creatures, fairies, butterflies, glowing magic, and ethereal worlds. Butterflies became the foundation for Morphic butterflies, moth clans, the glowing forests of Entymora, and Xyphara's dreamlike atmosphere.</p>
    <h4>The Creepers</h4>
    <p>I have always been strangely terrified of grasshoppers. Fear is useful in worldbuilding. Exaggerated enough, it becomes visually interesting. That fear inspired the Creepers: invasive, twitching, swarming creatures born from discomfort.</p>
    <h4>Why Xyphara Glows</h4>
    <p>Xyphara had to feel alive. Bioluminescent plants, luminous rivers, radiant wings, shimmering forests, magical skies, and iridescent magic became its identity because iridescence is all colors at once.</p>
    <h4>Beauty and Horror Together</h4>
    <p>Xyphara is beautiful, but beneath the glowing forests and fairy-like races live war, corruption, manipulation, grief, monsters, and ancient hunger. The prettier the world becomes, the more terrifying its darkness feels.</p>
  `,
  elysiaDesign: `
    <p>Character creation is strange. Some characters arrive fully formed. Others evolve slowly until they finally become who they were always supposed to be. Elysia Nightshade was the second kind.</p>
    <h4>The Original Elysia</h4>
    <p>The earliest Elysia concepts were softer: butterflies in her hair, gentle expressions, lighter fantasy clothing, glowing blue magic, and innocent ethereal energy. She represented wonder more than conflict.</p>
    <h4>When the Story Became Darker</h4>
    <p>As Eclipse of Elysium evolved into a story about trauma, destiny, forbidden power, corruption, identity, and morally gray choices, Elysia had to change. She needed to feel powerful but exhausted, beautiful but haunted, not perfect but surviving.</p>
    <h4>The Hair Stripes</h4>
    <p>The white and black streaks in Elysia's azure hair became symbolic. Not corruption. Not purity. Balance. Light changed her. Shadow changed her. Now both live within her simultaneously.</p>
    <h4>Using AI During the Design Process</h4>
    <p>I use AI tools for inspiration, moodboards, atmosphere, concept exploration, composition ideas, and character experimentation. The emotional core, story, personality, symbolism, and evolution come from me; AI helps visualize ideas already alive in my imagination.</p>
    <h4>Why Character Design Matters</h4>
    <p>Fantasy characters become memorable when they feel emotionally real beneath the magic. Readers may remember glowing eyes or beautiful armor, but what they connect to is pain, longing, fear, hope, and history.</p>
  `,
  howEchoAwakenings: `
    <p>Echo awakenings are not gentle transformations. They happen when the mind is pushed beyond ordinary survival and something inside refuses to remain human, silent, or powerless.</p>
    <h4>How Echo Awakenings Work</h4>
    <p>The Company calls the trigger a soul rupture: a moment of extreme emotional pressure where trauma, obsession, devotion, or desperation becomes strong enough to manifest as power. The stronger the need, the more dangerous the awakening.</p>
    <p>Forced awakenings remain the only repeatable method The Company has documented, which is why their training abandoned ethics long ago. The process is not meant to teach candidates. It is meant to break them until the Echo answers.</p>
    <h4>The Cost</h4>
    <p>Overuse erodes emotional stability. Candidates may experience hallucinations, blackened veins, memory distortion, sensory collapse, or Soulburn. The Echo can save a person, but it can also hollow them out.</p>
  `,
  blueLightShadowEcho: `
    <p>Blue light appears across Annuscha Botes' worlds as power, sorrow, memory, awakening, and transformation. In Elysium it touches forbidden magic. In What Remains of Me it becomes cerulean Echo energy. In Xyphara it glows through the world itself.</p>
    <h4>Blue Light</h4>
    <p>Blue is not purity. It is threshold energy: the color of something waking up, changing form, or becoming too powerful to remain hidden.</p>
    <h4>Shadow and Echo</h4>
    <p>Shadow magic and Echo power are different systems, but both ask the same question: what happens when pain becomes force? The answer is rarely clean, and never free.</p>
  `,
  fallenTerritories: `
    <p>The Fallen Territories are regions where old borders no longer matter. Cities are broken, supply routes shift without warning, and survivors trade maps like contraband.</p>
    <h4>Restricted Geography</h4>
    <p>Some regions belong to no government, only to hunger, ruin, Company patrols, and stories no one can verify twice. Travel records are incomplete because many scouts never return.</p>
  `,
  interactiveMap: `
    <p>The What Remains of Me interactive map opens the dystopian city as a navigable archive. Readers can pan, zoom, and click restricted locations for future lore records.</p>
    <p><a class="btn primary" href="map-wrm.html">Open the Interactive Map</a></p>
  `,
  dystopianCityMap: `
    <p>The dystopian city map records old residential districts, broken transit routes, sealed Company corridors, and zones where Echo activity still lingers after failed experiments.</p>
    <h4>City Notes</h4>
    <p>Some streets are physically safe but psychologically dangerous. Others are quiet only because everything living already learned not to make sound there.</p>
  `,
  travelWarnings: `
    <p>Travel warnings are issued for readers entering unstable archive zones: abandoned districts, corrupted forests, sealed facilities, and lands where the map may be older than the danger.</p>
    <h4>Archive Notice</h4>
    <p>Never trust a safe road twice. In Annuscha Botes' worlds, geography remembers what happened there.</p>
  `,
  creatureZones: `
    <p>Creature zones mark regions where beasts, altered wildlife, dragon remnants, Creepers, or Echo-mutated threats have been reported.</p>
    <h4>Survival Note</h4>
    <p>Creature sightings are not always literal. Some are folklore, some are propaganda, and some are warnings from people who barely escaped.</p>
  `
};

const lorePostMeta = {
  dangerousEchoes: { key: "dangerousEchoes", category: "Magic Systems", title: "Top 7 Most Dangerous Echo Powers", image: "assets/Background/lore back.webp" },
  echoStages: { key: "echoStages", category: "Magic Systems", title: "Echo Stages Explained: How Echo Awakenings Really Work", image: "assets/Elysium pics/magic/yin yang background.webp" },
  howEchoAwakenings: { key: "howEchoAwakenings", category: "Magic Systems", title: "How Echo Awakenings Work", image: "assets/What remains of me pics/magic/Echo awaken inside Angel.webp" },
  blueLightShadowEcho: { key: "blueLightShadowEcho", category: "Magic Systems", title: "Blue Light, Shadow, and Echo", image: "assets/Elysium pics/Elysia with her magic.jpg" },
  fallenTerritories: { key: "fallenTerritories", category: "Maps & Geography", title: "The Fallen Territories", image: "assets/What remains of me pics/scenery/the remains of what cities look like.webp" },
  interactiveMap: { key: "interactiveMap", category: "Maps & Geography", title: "What Remains of Me Interactive Map", image: "assets/blog lore/what remains of me/dystopian city of remains of me.png" },
  dystopianCityMap: { key: "dystopianCityMap", category: "Maps & Geography", title: "Dystopian City Map Posts", image: "assets/blog lore/what remains of me/dystopian city of remains of me.png" },
  travelWarnings: { key: "travelWarnings", category: "Maps & Geography", title: "Travel Warnings", image: "assets/Elysium pics/scenery/Elysium landscape.webp" },
  creatureZones: { key: "creatureZones", category: "Maps & Geography", title: "Creature Zones", image: "assets/Elysium pics/creatures/Dragon.webp" },
  beastmenExiled: { key: "beastmenExiled", category: "Lands & Bloodlines", title: "Why Beastmen Were Exiled", image: "assets/Elysium pics/characters/Cain/Beastman Cain.webp" },
  emptyCoffin: { key: "emptyCoffin", category: "Forbidden Records", title: "Forbidden Record 07: The Empty Coffin", image: "assets/Background/black_and_white_eclipse_background.webp" },
  elysiumFirstLines: { key: "elysiumFirstLines", category: "Deleted Scenes", title: "First Lines of Shadows of Elysium", image: "assets/ideas/Chapter 1 Eclipse.webp" },
  shadowWar: { key: "shadowWar", category: "World Lore", title: "The Shadow War: How Elysium Lost Its Balance", image: "assets/Elysium pics/scenery/Elysium.webp" },
  cainMonster: { key: "cainMonster", category: "Character Secrets", title: "The Night Cain Became a Monster", image: "assets/Elysium pics/characters/Cain/Beastman Cain.webp" },
  xypharaInspired: { key: "xypharaInspired", category: "From the Author's Desk", title: "What Inspired Planet of Xyphara", image: "assets/Planet of Xyphara/scenery/planet Xyphara landscape.webp" },
  worldsOfAnnuscha: { key: "worldsOfAnnuscha", category: "Behind the Book", title: "The Worlds of Annuscha Botes", image: "assets/Background/lore back.webp" },
  buildingXyphara: { key: "buildingXyphara", category: "Worldbuilding", title: "Building Xyphara From Scratch", image: "assets/Planet of Xyphara/scenery/hometown forest on planet Xyphara.webp" },
  elysiaDesign: { key: "elysiaDesign", category: "Cover Art & AI Art Process", title: "How I Designed Elysia Nightshade", image: "assets/Elysium pics/Elysia with her magic.jpg" }
};

const lorePostGroups = {
  magic: ["echoStages", "howEchoAwakenings", "dangerousEchoes", "blueLightShadowEcho"],
  maps: ["fallenTerritories", "interactiveMap", "dystopianCityMap", "travelWarnings", "creatureZones"],
  lands: ["beastmenExiled"],
  forbidden: ["emptyCoffin", "elysiumFirstLines"],
  characterSecrets: ["cainMonster"],
  authorDesk: ["xypharaInspired", "worldsOfAnnuscha", "buildingXyphara", "elysiaDesign"],
  worldLore: ["shadowWar"]
};

function loreArchive() {
  const cards = Array.from(document.querySelectorAll("[data-lore-card]"));
  if (!cards.length) return;
  const modal = document.createElement("div");
  modal.className = "modal lore-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  document.body.appendChild(modal);
  let activeEntries = [];
  let activeIndex = 0;

  const close = () => {
    modal.classList.remove("show");
    modal.innerHTML = "";
  };

  const entryFromCard = (card) => ({
    key: card.dataset.loreKey || "",
    category: card.dataset.category || "Lore Record",
    title: card.dataset.title || "Lore Record",
    image: card.dataset.image || card.querySelector("img")?.src || "",
    body: card.dataset.body || ""
  });

  const groupForKey = (key) => Object.values(lorePostGroups).find((group) => group.includes(key));
  const entriesFromGroup = (groupKey) => (lorePostGroups[groupKey] || [])
    .map((key) => lorePostMeta[key])
    .filter(Boolean);

  const render = () => {
    const entry = activeEntries[activeIndex] || activeEntries[0];
    const body = lorePostBodies[entry.key] || `<p class="lead">${entry.body || "This lore entry will open into a deeper article when the archive is connected."}</p>`;
    const hasRelatedPosts = activeEntries.length > 1;
    modal.innerHTML = `
      <div class="lore-modal-card">
        <button class="btn ghost close-modal" type="button" data-lore-close>Close</button>
        <div class="lore-modal-grid">
          <img src="${entry.image || ""}" alt="${entry.title || "Lore record"}">
          <div class="lore-modal-body">
            <p class="eyebrow">${entry.category || "Lore Record"}</p>
            <h2>${entry.title || "Lore Record"}</h2>
            <div class="lore-article-body">${body}</div>
            ${hasRelatedPosts ? `
              <div class="lore-modal-controls">
                <button class="btn ghost" type="button" data-lore-prev>Previous Post</button>
                <button class="btn ghost" type="button" data-lore-next>Next Post</button>
              </div>
            ` : ""}
          </div>
        </div>
      </div>
    `;
    modal.querySelector("[data-lore-close]").addEventListener("click", close);
    modal.querySelector("[data-lore-prev]")?.addEventListener("click", () => {
      activeIndex = (activeIndex - 1 + activeEntries.length) % activeEntries.length;
      render();
    });
    modal.querySelector("[data-lore-next]")?.addEventListener("click", () => {
      activeIndex = (activeIndex + 1) % activeEntries.length;
      render();
    });
  };

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      if (card.dataset.loreGroup) {
        activeEntries = entriesFromGroup(card.dataset.loreGroup);
      } else if (card.dataset.loreKey) {
        const relatedGroup = groupForKey(card.dataset.loreKey);
        activeEntries = relatedGroup
          ? relatedGroup.map((key) => lorePostMeta[key]).filter(Boolean)
          : [lorePostMeta[card.dataset.loreKey] || entryFromCard(card)];
        activeIndex = Math.max(0, activeEntries.findIndex((entry) => entry.key === card.dataset.loreKey));
      } else {
        activeEntries = [entryFromCard(card)];
      }
      if (!activeEntries.length) activeEntries = [entryFromCard(card)];
      if (!card.dataset.loreKey) activeIndex = 0;
      render();
      modal.classList.add("show");
      modal.querySelector("[data-lore-close]")?.focus();
    });
  });
  modal.addEventListener("click", (event) => {
    if (event.target === modal) close();
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("show")) close();
  });
}

function animateCounters() {
  if (reduceMotion.matches) return;
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;
  const format = (value, suffix) => {
    if (suffix === "K+") return `${Math.round(value)}K+`;
    if (suffix === "star") return `${value.toFixed(1)}`;
    return Math.round(value).toLocaleString();
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      const start = performance.now();
      const duration = 1600;
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = format(target * eased, suffix);
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: .3 });
  counters.forEach((counter) => observer.observe(counter));
}

function runSiteFeatures() {
  if (window.__annuschaSiteFeaturesStarted) return;
  window.__annuschaSiteFeaturesStarted = true;
  enhanceNavMenus();
  mobileNavigation();
  polishGlobalChrome();
  ensureSatchelChrome();
  showPendingSatchelToast();
  ambientLayer();
  cursorTrail();
  activeNav();
  contactTabs();
  bookCarousel();
  formspreeForms();
  satchelActions();
  renderSatchelPage();
  galleryChronicles();
  loreArchive();
  spoilerSafeCharacters();
  characterModals();
  animateCounters();
  cookieConsent();
  ravenAssistant();
}

document.addEventListener("DOMContentLoaded", () => {
  ensureSkipLink();
  const gateShown = ageGate(() => {
    if (!readerAuthGuard()) runSiteFeatures();
  });
  if (gateShown) return;
  if (readerAuthGuard()) return;
  runSiteFeatures();
});
