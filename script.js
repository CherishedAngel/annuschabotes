const colors = ["#56e7ff", "#75ffd8", "#bda4ff", "#ff8cca", "#fff2c7"];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const donationLink = "https://paypal.me/CherishedAngelArt";
const formspreeEndpoint = "https://formspree.io/f/mlgzagbw";
const payhipProducts = {
  "Eclipse of Elysium": "PAYHIP_ELYSIUM_PRODUCT_KEY",
  "Planet of Xyphara": "PAYHIP_XYPHARA_PRODUCT_KEY",
  "What Remains of Me": "zXdEY",
  audio: "PAYHIP_AUDIO_PRODUCT_KEY"
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

function readerSessionControls() {
  const avatarBtn = document.getElementById("changeAvatarBtn");
  const avatarInput = document.getElementById("avatarUpload");
  const avatarImg = document.getElementById("readerAvatar");
  if (avatarBtn && avatarInput && avatarImg) {
    avatarBtn.addEventListener("click", () => avatarInput.click());
    avatarInput.addEventListener("change", () => {
      const file = avatarInput.files?.[0];
      if (!file) return;
      avatarImg.src = URL.createObjectURL(file);
    });
  }
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

  const particleCount = window.matchMedia("(max-width: 700px)").matches ? 26 : 54;
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

  const petalCount = window.matchMedia("(max-width: 700px)").matches ? 8 : 18;
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
      <p>This website contains fantasy fiction, mature themes, violence, dark romance, and age-restricted content.</p>
      <p style="margin-top:14px">By entering this site, you confirm you are 18 years or older, understand the nature of the content, and agree to the site's <a href="terms.html">Terms</a> and <a href="privacy.html">Privacy Policy</a>.</p>
      <p style="margin-top:10px">This is a self-declared age gate, not government ID or real-world identity verification.</p>
      <p class="quote" style="margin-top:14px">Viewer discretion advised.</p>
      <div class="dob-grid">
        <label>Day<input inputmode="numeric" autocomplete="bday-day" name="day" placeholder="DD" maxlength="2" required></label>
        <label>Month<input inputmode="numeric" autocomplete="bday-month" name="month" placeholder="MM" maxlength="2" required></label>
        <label>Year<input inputmode="numeric" autocomplete="bday-year" name="year" placeholder="YYYY" maxlength="4" required></label>
      </div>
      <p class="age-error" data-age-error aria-live="polite"></p>
      <button class="btn primary" type="submit">Enter</button>
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
    '      <h3>Welcome, wanderer. I am the Raven of CherishedAngel&#39;s Chronicles. Ask what the shadows remember, or choose a path below.</h3>',
    '    </div>',
    '    <button class="raven-close" type="button" aria-label="Close The Raven">&#x263D;&#x263E;</button>',
    '  </div>',
    '  <form class="raven-search" role="search">',
    '    <label for="raven-query" class="sr-only">Ask The Raven</label>',
    '    <input id="raven-query" type="search" placeholder="Search books, characters, lore..." autocomplete="off">',
    '    <button class="btn primary" type="submit">Ask</button>',
    '  </form>',
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
    { title: "Buy a Book", type: "Purchase Help", keywords: ["buy", "buy a book", "order", "purchase", "claim", "copy", "pdf", "pay", "payment", "paypal", "payhip"], answer: "Use the order form to claim a copy. Payment is handled through PayPal or Payhip, never through custom card fields on this website.", link: "order.html", linkText: "Claim Your Copy" },
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
    { title: "Reader Dashboard and Satchel", type: "Account", keywords: ["login", "sign in", "account", "reader", "satchel", "download", "downloads", "purchased", "purchase history", "missing download"], answer: "The reader dashboard and satchel are prepared for future secure purchase history and downloads. Missing download help should go through contact for now.", link: "user.html", linkText: "Open My Chronicle" },
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
      ["Claim Your Copy", "order.html"]
    ],
    characters: [
      ["Elysium Characters", "characters.html#elysium"],
      ["Xyphara Characters", "characters.html#xyphara"],
      ["What Remains Characters", "characters.html#remains"]
    ],
    gallery: [
      ["Eclipse of Elysium", "gallery.html?world=elysium"],
      ["Planet of Xyphara", "gallery.html?world=xyphara"],
      ["What Remains of Me", "gallery.html?world=remains"]
    ]
  };

  document.querySelectorAll(".nav").forEach((nav) => {
    if (nav.dataset.enhanced === "true") return;
    Array.from(nav.children).forEach((child) => {
      if (!(child instanceof HTMLAnchorElement)) return;
      const key = child.textContent.trim().toLowerCase();
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

function polishGlobalChrome() {
  document.querySelectorAll(".site-header a").forEach((link) => {
    const label = link.textContent.trim().toLowerCase();
    if (label === "cart" || label === "satchel") link.remove();
  });
  document.querySelectorAll('a[href="cart.html"]').forEach((link) => {
    if (link.closest(".site-header")) link.remove();
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

function orderForm() {
  const form = document.querySelector("[data-order-form]");
  if (!form) return;
  const status = document.querySelector("[data-order-status]");
  const paymentLink = document.querySelector("[data-payment-link]");
  const productButtons = document.querySelector("[data-product-payment-links]");
  const params = new URLSearchParams(location.search);
  const bookMap = {
    elysium: "Eclipse of Elysium",
    xyphara: "Planet of Xyphara",
    remains: "What Remains of Me"
  };
  const requestedBook = bookMap[params.get("book")] || params.get("book");
  const requestedFormat = params.get("format");
  if (requestedBook) {
    const select = form.querySelector('[name="book"]');
    if (select && Array.from(select.options).some((option) => option.value === requestedBook || option.textContent === requestedBook)) {
      select.value = requestedBook;
    }
  }
  if (requestedFormat) {
    const checkbox = form.querySelector(`[name="product"][value="${requestedFormat}"]`);
    if (checkbox) checkbox.checked = true;
  }
  const updatePayment = () => {
    const book = form.querySelector('[name="book"]')?.value || "Eclipse of Elysium";
    const wantsAudio = form.querySelector('[name="product"][value="audio"]')?.checked;
      const productKey = wantsAudio ? payhipProducts.audio : payhipProducts[book] || payhipProducts["What Remains of Me"];
    const isPlaceholder = productKey.startsWith("PAYHIP_");
    if (paymentLink) {
      paymentLink.href = isPlaceholder ? "contact.html" : `https://payhip.com/b/${productKey}`;
      paymentLink.textContent = isPlaceholder ? "Ask for Payhip Link" : "Complete Payhip Checkout";
      paymentLink.classList.toggle("payhip-buy-button", !isPlaceholder);
      if (isPlaceholder) {
        delete paymentLink.dataset.product;
        delete paymentLink.dataset.targetVariant;
      } else {
        paymentLink.dataset.product = productKey;
        if (productKey === "zXdEY") paymentLink.dataset.targetVariant = "1778471563630";
      }
    }
    if (productButtons) {
      const buttons = Object.entries(payhipProducts)
        .filter(([name]) => name !== "audio")
        .map(([name, key]) => {
          const placeholder = key.startsWith("PAYHIP_");
          if (placeholder) return `<a class="btn ghost" href="contact.html">${name}</a>`;
          const variant = key === "zXdEY" ? ' data-target-variant="1778471563630"' : "";
          return `<a class="btn ghost payhip-buy-button" href="https://payhip.com/b/${key}" data-theme="grey" data-product="${key}"${variant}>${name}</a>`;
        }).join("");
      productButtons.innerHTML = `
        ${buttons}
        <a class="btn ghost" href="${donationLink}" target="_blank" rel="noopener">Donate</a>
      `;
    }
  };
  form.addEventListener("change", updatePayment);
  updatePayment();
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    let sent = true;
    if (form.action && form.action.includes("formspree.io")) {
      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" }
        });
        if (!response.ok) throw new Error(`Formspree responded with ${response.status}`);
      } catch (error) {
        sent = false;
        console.warn("Formspree submission could not be completed.", error);
      }
    }
    updatePayment();
    if (status) {
      status.querySelector("[data-order-status-title]").textContent = sent ? "Order request sent" : "The raven lost its way";
      status.querySelector("[data-order-status-copy]").textContent = sent
        ? "Thank you. Your order request has been sent. Please complete payment through the secure Payhip checkout button below."
        : "The order form could not send right now. Please try again, or contact Annuscha directly through the Correspondence page.";
    }
    status?.classList.add("show");
    status?.focus();
  });
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

function accountForm() {
  const terms = document.querySelector("[data-accept-terms]");
  const submit = document.querySelector("[data-create-account]");
  if (!terms || !submit) return;
  const sync = () => {
    submit.disabled = !terms.checked;
  };
  terms.addEventListener("change", sync);
  sync();
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
        "title": "Magic of Xyphara",
        "type": "Magic",
        "image": "assets/Planet of Xyphara/relics and symbols/FLyw9EbLgZc9eP3lHwd1--1--gzlh6.webp",
        "text": "Time, visions, wings of light, glowing power, and magic rooted deep within the planet.",
        "images": [
          "assets/Planet of Xyphara/relics and symbols/boat for travel.webp",
          "assets/Planet of Xyphara/relics and symbols/cactus flower planet Xyphara.webp",
          "assets/Planet of Xyphara/relics and symbols/caelum and lunaria.webp",
          "assets/Planet of Xyphara/relics and symbols/flower on planet Xyphara.webp"
        ]
      },
      {
        "title": "Relics of Xyphara",
        "type": "Relics / Symbols",
        "image": "assets/Planet of Xyphara/relics and symbols/icon of world tree.webp",
        "text": "World-tree marks, wing sigils, travel vessels, cactus blooms, and symbols that glow before the truth does.",
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
  const apply = () => {
    document.body.classList.toggle("spoiler-safe", toggle.checked);
    if (label) label.textContent = toggle.checked ? "ON" : "OFF";
    toggle.setAttribute("aria-checked", String(toggle.checked));
  };
  toggle.addEventListener("change", apply);
  apply();
}

function loreArchive() {
  const cards = Array.from(document.querySelectorAll("[data-lore-card]"));
  if (!cards.length) return;
  const modal = document.createElement("div");
  modal.className = "modal lore-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  document.body.appendChild(modal);
  let activeIndex = 0;

  const close = () => {
    modal.classList.remove("show");
    modal.innerHTML = "";
  };

  const render = () => {
    const card = cards[activeIndex];
    modal.innerHTML = `
      <div class="lore-modal-card">
        <button class="btn ghost close-modal" type="button" data-lore-close>Close</button>
        <div class="lore-modal-grid">
          <img src="${card.dataset.image || card.querySelector("img")?.src || ""}" alt="${card.dataset.title || "Lore record"}">
          <div class="lore-modal-body">
            <p class="eyebrow">${card.dataset.category || "Lore Record"}</p>
            <h2>${card.dataset.title || "Lore Record"}</h2>
            <p class="lead">${card.dataset.body || "This lore entry will open into a deeper article when the archive is connected."}</p>
            <p>This preview behaves like the image archive: readers can move through records with previous and next while deeper blog pages are prepared.</p>
            <div class="lore-modal-controls">
              <button class="btn ghost" type="button" data-lore-prev>Previous</button>
              <button class="btn ghost" type="button" data-lore-next>Next</button>
            </div>
          </div>
        </div>
      </div>
    `;
    modal.querySelector("[data-lore-close]").addEventListener("click", close);
    modal.querySelector("[data-lore-prev]").addEventListener("click", () => {
      activeIndex = (activeIndex - 1 + cards.length) % cards.length;
      render();
    });
    modal.querySelector("[data-lore-next]").addEventListener("click", () => {
      activeIndex = (activeIndex + 1) % cards.length;
      render();
    });
  };

  cards.forEach((card, index) => {
    card.addEventListener("click", () => {
      activeIndex = index;
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
  polishGlobalChrome();
  readerSessionControls();
  ambientLayer();
  cursorTrail();
  activeNav();
  contactTabs();
  bookCarousel();
  orderForm();
  formspreeForms();
  accountForm();
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
