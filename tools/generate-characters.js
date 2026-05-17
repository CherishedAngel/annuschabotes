const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const ageScript = '<script>try{if(localStorage.getItem("annuscha-age-verified")!=="true")document.documentElement.classList.add("age-pending");}catch(error){document.documentElement.classList.add("age-pending");}</script>';

const base = {
  elysium: {
    label: "Book 1",
    title: "Eclipse of Elysium",
    book: "book-elysium.html",
    background: "assets/Background/black_and_white_eclipse_background.webp",
    intro: "Shadowmancers, beastmen, ancient Elarian light, and oaths that bleed beneath Elysium."
  },
  remains: {
    label: "Book 2",
    title: "What Remains of Me",
    book: "book-remains.html",
    background: "assets/What remains of me pics/scenery/Background for the cover of What remains of me.webp",
    intro: "Soul Echoes, Company cruelty, and survivors learning what power costs."
  },
  xyphara: {
    label: "Book 3",
    title: "Planet of Xyphara",
    book: "book-xyphara.html",
    background: "assets/Planet of Xyphara/scenery/hometown forest on planet Xyphara.webp",
    intro: "Bioluminescent forests, moth courts, butterfly beings, mermaids, elders, and beautiful lies."
  }
};

const chars = [
  c("elysium","Elysia Nightshade","character-elysia.html","Protagonist / true Shadowmancer","29","Human","Golden Age Order orphan; origin unknown","Balanced shadow magic and light magic","assets/Elysium pics/characters/Elysia/Elysia.webp","Slender, pale almost translucent skin, azure hair streaked white and black after the Shadow Temple trials, haunted blue eyes, ethereal grace, crescent scar near her left temple.","Reserved, passionate, compassionate, ruthlessly practical when needed, and afraid of abandonment.","Protect the innocent, uncover her origins, and choose her own fate.","Careful in public, fluid and passionate in private; her voice hints at power when angered.","Cain sees her shadows; Garrin offers forbidden light; Mia challenges her; Ravan steadies her.","Shadowmancer,Blue magic,Light and shadow,Protagonist"),
  c("elysium","Garrin of the Enclaves","character-garrin.html","Love interest / Elarian keeper of light","About 1,000","Elarian","The Enclaves","Elemental magic and the Bow of the Celestial Grove","assets/Elysium pics/characters/Garrin/Garrin of the enclaves.webp","Tall, slender, golden-haired, luminous-eyed, ancient and graceful in pale symbolic robes.","Wise, restrained, poetic, and unraveling beneath calm authority.","Preserve balance while fighting his dangerous desire for Elysia.","Measured, metaphor-rich, scholarly, and full of meaningful silences.","Enchanted by Elysia; mirror and rival to Cain; watched by Mia, Ravan, and Lirelith.","Elarian,Elemental magic,Forbidden light,Love interest"),
  c("elysium","Cain Brisha","character-cain.html","Love interest / beastman dark leader","153","Beastman shapeshifter","Beastman Horde / former clan lands","Primal beast strength and shapeshifter blood","assets/Elysium pics/characters/Cain/cain.webp","Towering, muscular, dark-furred, crimson-eyed, scarred, fanged, and predatory.","Dominant, territorial, protective, brutal, loyal, wounded, sarcastic, and terrified of losing control.","Vengeance for Shade, redemption, and protection of Elysia without caging her.","Low, rumbling, clipped, physical, and intimate when emotionally exposed.","Elysia is his mate in all but name; Garrin is a rival and mirror; Ravan understands the beast.","Beastman,Love interest,Primal power,Dark leader"),
  c("elysium","Shade Crimson","character-shade.html","Suspected Shadowmancer / outcast rebel leader","149","Beastman shapeshifter","Crimson Clans / Outcast Rebellion","Shadowmancy, Umbral Step, Wraith Form, Minds Eclipse","assets/Elysium pics/characters/shade/shade.webp","Charcoal-black pelt, silver sigils, molten-gold eyes, lean dancer-like strength, obsidian double axe.","Witty, defiant, iron-willed, compassionate beneath the armor, and guarded by humor.","Avenge her clan, protect outcasts, and reclaim what the purge stole.","Low, cool, teasing, surgical, and smooth until battle calculation cuts it short.","Once Cain's lover, now wary ally; loyal to Elysia but worried for her innocence.","Outcast rebel,Shadowmancy,Wild card,Beastman"),
  c("elysium","Freya Stormborn","character-freya.html","Supporting character / Ice Thundera war-leader","Mid-30s","Human","Ice Thundera northern territories","Stormbinding, battle-trance, Skeldr's Fang war axe","assets/Elysium pics/characters/Freya/Freya.webp","Very tall, broad-shouldered, silver-white braids, storm-gray eyes, scar from temple to jaw, battle-marked skin.","Steadfast, intimidating, loyal when trust is earned, pragmatic, blunt, and quietly burdened by guilt.","Protect her people and secure a legacy of survival and honor.","Short, decisive, rough with battle-command, practical over poetic.","Respects Mia, watches Elysia, distrusts Cain with amusement, calls Lirelith sparrow.","War-leader,Stormbinding,Ice Thundera,Supporting"),
  c("elysium","Korgash Bonecleaver","character-korgash.html","Supporting character / Bloodridge orc chieftain","130","Orc","Bloodridge Clan highlands","Bloodhymn axe, supernatural strength, battle roar","assets/Elysium pics/characters/Korgash/Korgash.webp","Nearly seven feet tall, moss-green skin, ritual scars, carved tusks, bone beads, and battle scars.","Boisterous, flirtatious, wounded, protective, diplomatic, and theatrical until private truth breaks through.","Earn glory and affection, build meaning after loss, and be chosen rather than feared.","Deep, resonant, boastful warrior-poetry, orcish proverbs, humor as shield and spear.","Fascinated by Elysia; rivalry with Cain; unexpectedly listens to Mia.","Orc,Chieftain,Bloodhymn,Supporting"),
  c("elysium","Ravan","character-ravan.html","Supporting character / beast-speaker outcast","Early 40s","Human-animal hybrid","Nomadic Terasa people","Spiritbow, wilderness communion, stealth, primal surge","assets/Elysium pics/characters/Ravan/Ravan.webp","Lithe and athletic, dark copper skin, amber predator eyes, shifting tribal markings, lupin ears, rabbit-like nose and whiskers.","Stoic, reserved, wise, guarded, impatient with civilized foolishness, protective to a fault.","Protect balance within himself, his companions, and the wilds; atone for the past.","Measured, cryptic, natural metaphors, clipped in danger, otherworldly with animals and spirits.","Protective of Elysia, understands Cain, respects Mia, watches Garrin, loves Lirelith before her sacrifice.","Beast-speaker,Spiritbow,Wilds,Supporting"),
  c("elysium","Mia Stormbound","character-mia.html","Supporting character / Ice Thundera warrior","Early 30s","Human","Ice Thundera tribe","Enchanted blade, storm rage, battle instinct, tactical genius","assets/Elysium pics/characters/Mia/Mia Stormbound.webp","Muscular, fiery red Viking braids, green eyes, freckles, battle marks, scar from temple to jaw.","Hardened, direct, suspicious, fiercely loyal, sarcastic, tactically brilliant, and afraid of vulnerability.","Freedom, honor on her own terms, and survival of her chosen family.","Clipped, efficient, northern edge, military terms, dark humor.","Protective tension with Elysia, uneasy alliance with Cain, deep respect for Ravan, wary of Garrin.","Warrior,Storm rage,Tactical genius,Supporting"),
  c("elysium","Lirelith","character-lirelith.html","Supporting character / Silverleaf elf","400","Elf","Silverleaf Clan","Heartwood bow, twin daggers, stealth, nature magic","assets/Elysium pics/characters/lirelith/Lirelith.webp","Lithe, athletic, golden-blond waves, emerald mischievous eyes, sharp expressive features.","Energetic, dramatic, affectionate, curious, lonely beneath jokes, fiercely loyal.","Belong, be loved, and be chosen for who she is.","Fast, teasing, dramatic, curious, sometimes formal wisdom cracking into wit.","Adores Elysia, teases Cain, seeks Mia's approval, falls in love with Ravan before sacrifice.","Elf,Nature magic,Heartwood bow,Supporting"),
  c("elysium","Direhorn Beast","character-direhorn.html","Creature / supporting character","Unknown","Direhorn","Wild lands of Elysium","Immense strength, land-bond, iridescent armored scales","assets/Elysium pics/characters/Direhorn/direhorn.webp","Massive beast with three obsidian rune horns, iridescent armored scales, and impenetrable hide.","Unbreakable will and deep loyalty once bonded.","Protect those it has bonded with, especially Elysia and Ravan.","Nonverbal; communicates through presence, instinct, and bond.","Bonded with Elysia and Ravan.","Creature,Direhorn,Protector,Elysium"),
  c("elysium","Kryzareth","character-kryzareth.html","Creature / Eternal Night dragon","Ancient","Dragon","Ancient dragon sanctuaries","Cosmic star-fire, telepathy, forgotten magic","assets/Elysium pics/characters/Kryzareth/Kryzareth.webp","Colossal dragon, black void-like scales, silver eyes, rune horn, crystalline spine formations.","Ancient, proud, curious, loyal, impatient with lesser concerns, cryptic by nature.","Preserve natural balance and prevent old ruin from repeating.","Telepathic, resonant, measured, metaphor-rich, sometimes sharply direct.","Recognizes ancient patterns in Elysia's quest and leaves isolation.","Dragon,Telepathy,Cosmic fire,Creature"),
  c("elysium","Elguard Evernight","character-elguard.html","Antagonist / General of the Elysium Army","2,000","Elf","Elysium Council and army command","Elven bladework, Aetherial Command, Rune of Binding, Aura of Dominion","assets/Elysium pics/characters/Elguard/Elguard.webp","Ageless noble, midnight braids threaded bronze, auburn molten eyes, lithe elf frame, obsidian armor.","Ruthlessly cerebral, coldly charismatic, pragmatic idealist, and terrifyingly logical.","Create ultimate order, restore elven supremacy, and prevent chaos.","Calm, formal, archaic, deliberate, rhetorical, and steel-edged.","Respected and watched by the Council; sworn enemy of Elysia as the Upbringer of Darkness.","Antagonist,Purity Doctrine,General,Elf"),
  c("elysium","Rafahell Darkin","character-rafahell.html","Potential dark ally / future antagonist","Appears 35","Dragonborn","Unknown shadow-dragon cult legacy","Shadow-draconic sorcery, necromancy, Veil of Null, Essence Siphon","assets/Elysium pics/characters/Rafahell/Rafahell.webp","Obsidian-black scales with purple-blue undertones, amber reptilian eyes, silver talons, too-wide smile.","Cerebral, composed, predatory, obsessively scholarly, emotionally detached, morally unconstrained.","Achieve forbidden arcane evolution and understand or bind Elysia's magic.","Dry and papery, precise, calm, demanding attention without volume.","Fascinated by Elysia as catalyst; distrusted by most; dark mirror to other magic users.","Dragonborn,Necromancy,Dark ally,Future antagonist"),

  c("remains","Angel Reyes","character-angel.html","Protagonist / trainee / hidden power","19","Human","Orphanage / The Company","Echo of Devotion","assets/What remains of me pics/Characters/Angel/Angel.webp","Long dark brown hair, survivor fragility, and radiant shocking blue Echo awakening under pressure.","Martyr turned warrior, love weaponized, devoted, traumatized, reclaiming worth.","Protect her siblings, survive the Company, and become more than what was done to her.","Placeholder - speech style still to be expanded.","Sister to Mikey and Lisa; connected to Mira, Draven, and Steve.","Echo of Devotion,Protagonist,Dystopian,Blue Echo"),
  c("remains","Draven Swanson","character-draven.html","Love interest / enforcer / anti-hero commander","Early to mid-30s","Human Echo user","The Company","Echo of Burdened Identity; shapeshifting","assets/What remains of me pics/Characters/Draven/Draven.webp","Towering, muscular, dark hair, storm-gray eyes, rough stubble, scars worn like armor.","Mysterious, emotionally frozen, tragic, protective, disciplined, haunted by guilt.","Become worthy of Angel's trust and rebel against what made him monstrous.","Short, sharp, blunt, sometimes cruel; with Angel, words become heavy and dangerous.","Angel cracks his armor; Steve is fractured brotherhood, blame, guilt, and shared graves.","Shapeshifter,Anti-hero,The Company,Love interest"),
  c("remains","Steve Sterling","character-steve.html","Love interest / strategist / mind manipulator","Late 20s to early 30s","Human Echo user","The Company","Echo of Control and Desperation; mind control","assets/What remains of me pics/Characters/Steve/steve protrait.webp","Blond tousled hair, haunting green eyes, sculpted build, controlled dangerous beauty.","Manipulative, seductive, terrifyingly smart, fractured, haunted, addicted to control as safety.","Control outcomes to survive and avoid becoming what the Company made him.","Calm, deliberate, veiled, weaponized silence; soft and reverent with Angel.","Angel challenges his control; Draven is broken brotherhood and bitter history.","Mind control,Strategist,The Company,Love interest"),

  c("xyphara","Lunaria Papillion","character-lunaria.html","Protagonist / love interest","Placeholder","Morphic Butterfly Being","Placeholder province","Future sight, prophetic dreams, purple glowing jagged dagger","assets/Planet of Xyphara/Characters/Lunaria/Lunaria.webp","Iridescent pink wings, star-like patterns, pink silken hair, antennae, pink eyes.","Curious, bold, deeply empathetic.","Placeholder - story goal still to be expanded.","Poetic, dreamlike, emotionally open.","Love interest of Lumen; childhood friend of Caelum and Lyra.","Butterfly being,Future sight,Protagonist,Love interest"),
  c("xyphara","Caelum Raywing","character-caelum.html","Supporting character / former love interest","Placeholder","Morphic Butterfly Being","Placeholder province","Support magic enhanced by emotional bond","assets/Planet of Xyphara/Characters/Caelum/Caelum.webp","Broad-shouldered, silver wings, strong arms, silver eyes, messy silver hair.","Loyal, grounded, quiet protector.","Protect those he bonds with.","Short, meaningful bursts.","Initially in love with Lunaria, later bonds with Lyra.","Butterfly being,Support magic,Protector,Former love interest"),
  c("xyphara","Lyra Wingwhisper","character-lyra.html","Supporting character / love interest","Placeholder","Morphic Butterfly Being","Placeholder province","Healing, resurrection artifacts, stunning orange crossbow","assets/Planet of Xyphara/Characters/Lyra/Lyra.webp","Golden sun-patterned wings, golden eyes, long golden hair.","Joyful, bubbly, encouraging.","Preserve life and lift the people she loves.","Heart-filled, enthusiastic, warm.","Best friend to Lunaria; love interest of Caelum; daughter of Elyra.","Butterfly being,Healer,Love interest,Supporting"),
  c("xyphara","Lumen Nox","character-lumen.html","Protagonist / love interest","Placeholder","Morphic Moth Being","Placeholder province","Super speed, brief time reversal and freezing, investigation","assets/Planet of Xyphara/Characters/Lumen/Lumen.webp","Azure translucent wings, sharp blue eyes, azure unkempt hair.","Calm, calculating, observant.","Investigate truth and protect what matters.","Precise and intense.","Love interest of Lunaria; admired by Talos and Mirelle.","Moth being,Time magic,Investigator,Love interest"),
  c("xyphara","Mirelle Twilightsong","character-mirelle.html","Supporting character / love interest","Placeholder","Morphic Moth Being","Placeholder province","Magic identification, infused cooking, paralyzing purple bow","assets/Planet of Xyphara/Characters/Mirelle/Mirelle.webp","Lavender translucent wings, violet eyes, very long purple braided hair.","Funny, gentle, sweet, nurturing, enthusiastic with wisdom.","Nurture, identify magic, and protect with gentleness and skill.","Enthusiastic, warm, wise.","Admirer of Lumen, later falls for Torian.","Moth being,Magic identification,Cooking magic,Supporting"),
  c("xyphara","Torian Nocturne","character-torian.html","Supporting character / love interest","Placeholder","Morphic Moth Being","Placeholder province","Wind gusts, minor nature control, whirlwind whip","assets/Planet of Xyphara/Characters/Torian/Torian.webp","Earthy green translucent wings, emerald eyes, short green hair.","Cunning, charismatic, witty, always bartering.","Trade, survive, and charm his way through danger.","Informal, clever, quick.","Close friend to Lumen; later falls in love with Mirelle.","Moth being,Wind magic,Trader,Love interest"),
  c("xyphara","Talos Duskmantle","character-talos.html","Supporting / tragic character","Placeholder","Morphic Moth Being","Placeholder province","Fire magic, creature expertise, fire-imbued axe","assets/Planet of Xyphara/Characters/Talos/Talos.webp","Red-tinted wings, crimson eyes, messy red hair.","Aggressive, passionate, hot-headed, sarcastic.","Placeholder - story goal still to be expanded.","Intense, sarcastic, fiery.","Unrequited love for Lumen; resurrected with no memory; later finds Velrian.","Moth being,Fire magic,Tragic character,Creature expert"),
  c("xyphara","Velrian Snowfang","character-velrian.html","Special character / love interest","Placeholder","Beastkin","Placeholder province","Ice powers and ancient beast transformations","assets/Planet of Xyphara/Characters/Velrian/velrian.webp","White-gray fur, icy blue eyes, noble beastkin presence.","Mysterious, noble, honorable.","Placeholder - story goal still to be expanded.","Warrior-sage cadence.","Joins mid-novel; future love interest of resurrected Talos.","Beastkin,Ice powers,Love interest,Special character"),
  c("xyphara","Princess Nerisa Tideborn","character-nerisa.html","Supporting character / sea kingdom ally","Placeholder","Mermaid","Sea kingdoms","Mystical water and wind powers","assets/Planet of Xyphara/Characters/Princess Nerisa/nerisa.webp","Shimmering long hair, iridescent scales, regal aquatic beauty.","Regal, serene, a little aloof.","Protect her sea kingdom and maintain alliance.","Diplomatic and composed.","Queen and ally from the sea kingdoms.","Mermaid,Water magic,Queen,Supporting"),
  c("xyphara","Noctyros","character-noctyros.html","Side character / royal army leader","Placeholder","Morphic Moth Being","Moth royal army","Command and elite combat training","assets/Planet of Xyphara/Characters/Noctyros/Noctyros.webp","Towering, muscled, obsidian armor, glowing red eyes.","Stern, disciplined, commanding.","Lead and protect the royal army.","Authoritative and disciplined.","Leader of the royal army.","Moth being,Commander,Side character"),
  c("xyphara","Valzaren","character-valzaren.html","Side character / antagonist / magical advisor","Placeholder","Morphic Moth Being","Royal court","Dark energy manipulation","assets/Planet of Xyphara/Characters/Valzaren/Valzaren.webp","Shadow-cloaked, rune-marked robes, gray hair.","Calculating, philosophical, slightly eerie.","Placeholder - political goal still to be expanded.","Cryptic and philosophical.","Royal advisor.","Moth being,Dark energy,Advisor,Antagonist"),
  c("xyphara","Sovereign Evran","character-sovereign-evran.html","Antagonist / The Creeper King","Placeholder","Former Lutharyn / Gilded Beetle lineage","Unknown creeper domain","Insatiable hunger for living things","assets/Planet of Xyphara/Characters/The creeper king/Creeper king.webp","Chitinous exoskeleton, razor mandibles, skeletal body, unnatural grace, blackened eyes.","Enigmatic, unsettling, seductive.","Consume, rule, and unsettle the living order.","Riddles and seductive menace.","Mysterious ruler figure known as the Creeper King.","Creeper King,Antagonist,Lutharyn,Hunger"),
];

function c(group, name, slug, role, age, species, place, power, image, appearance, personality, motivation, speech, relationships, tags) {
  return { group, name, slug, role, age, species, place, power, image, appearance, personality, motivation, speech, relationships, tags: tags.split(",") };
}
function esc(value = "") {
  return String(value).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
}
function head(title, description, keywords) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${esc(description)}">
  <meta name="keywords" content="${esc(keywords)}">
  ${ageScript}
  <title>${esc(title)} | Annuscha Botes</title>
  <link rel="stylesheet" href="styles.css">
</head>`;
}
function nav() {
  return `<a class="skip-link" href="#main-content">Skip to content</a>
<header class="site-header"><a class="brand" href="index.html"><strong>Annuscha Botes</strong><span>Dark Fantasy Romance</span></a><nav class="nav" aria-label="Main navigation"><a href="index.html">Home</a><a href="books.html">Books</a><a href="author.html">Author</a><a href="characters.html">Characters</a><a href="lore.html">Lore</a><a href="gallery.html">Gallery</a><a href="faq.html">FAQ</a><a href="contact.html">Contact</a></nav><div class="header-actions"><a class="tiny-link" href="login.html">Sign in</a></div></header>`;
}
function footer(quote = "Every soul has a secret. Every secret leaves a scar.") {
  return `<footer class="footer"><div class="footer-inner"><div><a class="brand" href="index.html"><strong>Annuscha Botes</strong><span>Dark Fantasy Romance</span></a><p>${esc(quote)}</p></div><div><p class="footer-title">The Chronicle</p><a href="books.html">Books</a><a href="characters.html">Characters</a><a href="lore.html">Lore</a><a href="gallery.html">Gallery</a></div><div><p class="footer-title">Reader</p><a href="user.html">My Chronicle</a><a href="cart.html">Satchel</a><a href="faq.html">FAQ</a><a href="contact.html">Contact</a></div><div><p class="footer-title">Legal</p><a href="privacy.html">Privacy</a><a href="terms.html">Terms of Use &amp; Sale</a><a href="content-disclaimer.html">Content Disclaimer</a></div></div></footer>`;
}
function tagList(tags) {
  return tags.map(tag => `<span class="tag">${esc(tag)}</span>`).join("");
}
function pageFor(ch) {
  const g = base[ch.group];
  const book = g.book;
  return `${head(ch.name, `${ch.name} character profile from ${ch.world || g.title}.`, `${ch.name}, ${g.title}, Annuscha Botes characters, CherishedAngel, dark fantasy romance, ${ch.tags.join(", ")}`)}
<body class="character-detail-page" style="--page-image:url('${esc(g.background)}')">
${nav()}
<main id="main-content" class="main">
  <section class="section wrap character-profile-hero">
    <div class="character-portrait-frame"><img src="${esc(ch.image)}" alt="${esc(ch.name)} character artwork" loading="lazy" decoding="async"></div>
    <article class="character-profile-copy">
      <p class="eyebrow">${esc(g.label)} - ${esc(g.title)}</p>
      <h1>${esc(ch.name)}</h1>
      <p class="lead">${esc(ch.role)}</p>
      <div class="format-row">${tagList(ch.tags)}</div>
      <div class="button-row"><a class="btn primary" href="characters.html#${esc(ch.group)}">Back to Characters</a><a class="btn ghost" href="${book}">Open Book</a></div>
    </article>
  </section>
  <section class="section wrap character-detail-grid">
    <article class="panel panel-pad character-record"><p class="eyebrow">Character Record</p><dl><div><dt>Age</dt><dd>${esc(ch.age)}</dd></div><div><dt>Species</dt><dd>${esc(ch.species)}</dd></div><div><dt>World</dt><dd>${esc(g.title)}</dd></div><div><dt>Origin / Place</dt><dd>${esc(ch.place)}</dd></div><div><dt>Magic / Power</dt><dd>${esc(ch.power)}</dd></div></dl></article>
    <article class="panel panel-pad"><p class="eyebrow">Appearance</p><p>${esc(ch.appearance)}</p></article>
    <article class="panel panel-pad"><p class="eyebrow">Inner Life</p><p><strong>Personality:</strong> ${esc(ch.personality)}</p><p><strong>Core motivation:</strong> ${esc(ch.motivation)}</p></article>
    <article class="panel panel-pad"><p class="eyebrow">Voice & Bonds</p><p><strong>Speech style:</strong> ${esc(ch.speech)}</p><p><strong>Relationships:</strong> ${esc(ch.relationships)}</p></article>
  </section>
</main>
${footer()}
<script src="script.js"></script>
</body>
</html>
`;
}
function archivePage() {
  const section = group => {
    const g = base[group];
    const cards = chars.filter(ch => ch.group === group).map(ch => `<a class="character-card" href="${esc(ch.slug)}" data-character-modal data-name="${esc(ch.name)}" data-world="${esc(g.title)}" data-place="${esc(ch.place)}" data-power="${esc(ch.power)}" data-appearance="${esc(ch.appearance)}" data-synopsis="${esc(ch.role)} ${esc(ch.motivation)}" data-image="${esc(ch.image)}"><img src="${esc(ch.image)}" alt="${esc(ch.name)} character artwork" loading="lazy" decoding="async"><div class="content"><h3>${esc(ch.name)}</h3><p><strong>Power:</strong> ${esc(ch.power)}</p><p><strong>World:</strong> ${esc(g.title)}</p><p><strong>Origin:</strong> ${esc(ch.place)}</p><p>${esc(ch.role)}</p><span class="gallery-link">Open Profile</span></div></a>`).join("\n      ");
    return `<section id="${group}" class="wrap character-book-section"><div class="character-book-heading"><div><p class="eyebrow">${esc(g.label)}</p><h2>${esc(g.title)}</h2><p>${esc(g.intro)}</p></div></div><div class="character-grid">${cards}</div></section>`;
  };
  return `${head("Characters", "Character archive for Annuscha Botes dark fantasy worlds.", "Annuscha Botes characters, Elysia Nightshade, Cain Brisha, Garrin, Shade Crimson, Angel Reyes, Lumen Nox, Planet of Xyphara characters, What Remains of Me characters")}
<body class="spoiler-safe" style="--page-image:url('assets/Background/Tavern in forest Elysium.webp')">
${nav()}
<main id="main-content" class="main">
  <section class="section wrap character-synopsis">
    <div><p class="eyebrow">Meet the Court</p><h1>Souls Bound to the Chronicle</h1><p class="lead">Step into the character archive of Annuscha Botes dark fantasy worlds, where heroines burn with impossible power, monsters carry secrets, and love is rarely safe.</p><p>Choose a world below and open each character profile for expanded details.</p><label class="spoiler-toggle" for="spoilerSafeToggle"><input id="spoilerSafeToggle" type="checkbox" checked> Spoiler-safe mode: <span data-spoiler-state>ON</span></label></div>
    <aside class="panel panel-pad"><h3>Character Archive Note</h3><p>Each soul belongs to a different realm, yet something ancient echoes through them all: blue magic, broken oaths, dangerous devotion, and the kind of darkness that changes everything it touches.</p></aside>
  </section>
  ${section("elysium")}
  ${section("remains")}
  ${section("xyphara")}
</main>
${footer()}
<script src="script.js"></script>
</body>
</html>
`;
}
function characterButtons(group) {
  return `<article class="panel panel-pad"><p class="eyebrow">Characters in this book</p><div class="button-row">${chars.filter(ch => ch.group === group).map(ch => `<a class="btn ghost" href="${ch.slug}">${esc(ch.name)}</a>`).join("")}</div></article>`;
}

fs.writeFileSync(path.join(root, "characters.html"), archivePage());
for (const ch of chars) fs.writeFileSync(path.join(root, ch.slug), pageFor(ch));
fs.writeFileSync(path.join(root, "character-nyx.html"), `${head("Character Redirect", "Redirect from removed Nyx placeholder page.", "Lumen Nox, Planet of Xyphara, Annuscha Botes characters")}
<body style="--page-image:url('assets/Planet of Xyphara/scenery/planet Xyphara.webp')">${nav()}<main id="main-content" class="main"><section class="section wrap not-found-hero"><article class="not-found-panel"><p class="not-found-code">Moved</p><h1>Nyx is not part of the Chronicle.</h1><p class="lead">This old placeholder now points to Lumen Nox, the correct blue moth character.</p><div class="button-row"><a class="btn primary" href="character-lumen.html">Open Lumen Nox</a><a class="btn ghost" href="characters.html#xyphara">Back to Characters</a></div></article></section></main>${footer("Soft light, dangerous wings.")}<script src="script.js"></script></body></html>
`);

for (const [file, group] of [["book-elysium.html", "elysium"], ["book-remains.html", "remains"], ["book-xyphara.html", "xyphara"]]) {
  const full = path.join(root, file);
  let html = fs.readFileSync(full, "utf8");
  html = html.replace(/<article class="panel panel-pad"><p class="eyebrow">Characters in this book<\/p>[\s\S]*?<\/article>/, characterButtons(group));
  fs.writeFileSync(full, html);
}

const scriptPath = path.join(root, "script.js");
let script = fs.readFileSync(scriptPath, "utf8");
script = script.replace('"character", "cain", "elysia", "garrin", "shade", "mia", "nyx", "angel"', '"character", "cain", "elysia", "garrin", "shade", "mia", "angel", "lumen", "lunaria", "draven", "steve"');
fs.writeFileSync(scriptPath, script);
console.log(`Generated ${chars.length} character pages, archive, and book links.`);


