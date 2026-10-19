/* What's on Tap demo backend.
   Stands in for the Supabase and Google Calendar connectors: every query the hub sends is answered
   from fictional data generated here, relative to today, so the demo always looks current.
   Visitor changes (promises, review answers) are kept in this browser only; Reset clears them. */
(function () {
  "use strict";
  var KEY = "tap-demo-v1";
  var ME = "Sam", PARTNER = "Jordan Lee";

  /* ---------- seeded randomness, so every visitor sees the same world ---------- */
  function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function hash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  var R = rng(20261019);
  function pick(a, r) { return a[Math.floor((r || R)() * a.length)]; }
  function between(a, b, r) { return a + (r || R)() * (b - a); }
  function uuid(n) { var h = ("00000000" + (hash("p" + n) >>> 0).toString(16)).slice(-8), g = ("0000" + (hash("q" + n) & 0xffff).toString(16)).slice(-4); return h + "-" + g + "-4" + g.slice(1) + "-8" + g.slice(1) + "-" + ("000000000000" + (hash("r" + n) >>> 0).toString(16) + g).slice(-12); }

  /* ---------- dates (visitor's local time) ---------- */
  function pad(n) { return String(n).padStart(2, "0"); }
  function iso(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function day(off) { var d = new Date(); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() + off); return d; }
  function at(off, h, m) { var d = day(off); d.setHours(h, m || 0, 0, 0); return d; }
  function parse(s) { var p = String(s).slice(0, 10).split("-"); return new Date(+p[0], +p[1] - 1, +p[2], 12); }
  function diffDays(a, b) { return Math.round((parse(a) - parse(b)) / 864e5); }
  var TODAY = iso(day(0));

  /* ---------- categories ---------- */
  var CATS = [
    ["friends_family", "Friends & family", false], ["romantic_dates", "Romantic dates", false], ["fun_excursions", "Fun excursions", false],
    ["vacations", "Vacations", false], ["day_trips", "Day trips", false], ["networking_job_search", "Networking", false], ["work", "Work", false],
    ["health_growth", "Health & growth", true], ["active", "Active", false], ["home", "Home", false], ["self_care", "Self-care", false], ["pets", "Pets", false], ["other", "Other", false]
  ].map(function (c, i) { return { slug: c[0], label: c[1], private: c[2], sort: i }; });
  function catLabel(s) { var c = CATS.filter(function (x) { return x.slug === s; })[0]; return c ? c.label : "Other"; }
  function isPriv(s) { return s === "health_growth"; }

  /* ---------- companies ---------- */
  var COMPANIES = [
    ["Northwind Labs", "Developer tools", "Boston, MA", "Makes testing tools for teams that ship mobile apps.", "professional"],
    ["Brightline Studio", "Design agency", "Portland, ME", "Small brand and product design studio working with climate startups.", "professional"],
    ["Cobalt Analytics", "Data software", "Cambridge, MA", "Builds forecasting dashboards for regional retailers.", "professional"],
    ["Harbor & Pine", "Hospitality", "Portland, ME", "Restaurant group running three neighborhood spots on the coast.", "professional"],
    ["Fieldnote", "Productivity software", "Remote", "Note-taking app for field researchers and journalists.", "professional"],
    ["Tidewater Partners", "Recruiting", "Boston, MA", "Boutique recruiting firm placing go-to-market leaders at Series A to C startups.", "professional"],
    ["Greenline Builders", "Home renovation", "South Portland, ME", "General contractor focused on older New England homes.", "vendor"],
    ["Copper Kettle Coffee", "Coffee roaster", "Biddeford, ME", "Roaster and cafe with a wholesale subscription.", "vendor"],
    ["Seaside Physical Therapy", "Physical therapy", "Portland, ME", "Outpatient sports and orthopedic physical therapy.", "provider"]
  ].map(function (c, i) {
    return { id: uuid("co" + i), name: c[0], industry: c[1], location: c[2], summary: c[3], kind: c[4], website: "https://example.com/" + c[0].toLowerCase().replace(/[^a-z]+/g, "-"), private: c[4] === "provider" };
  });
  function co(name) { return COMPANIES.filter(function (c) { return c.name === name; })[0]; }

  /* ---------- people ---------- */
  var PEOPLE_SRC = [
    // name, rel, circle, company, title, birthday (MM-DD), notes
    [PARTNER, "partner", "inner", null, null, "05-14", "Partner. Loves trail runs and terrible puns."],
    ["Maria Alvarez", "family", "inner", null, null, "03-02", "Mom. Sunday calls."],
    ["Luis Alvarez", "family", "inner", null, null, "08-21", "Dad. Fixing up the boat again."],
    ["Nina Alvarez", "family", "inner", null, null, "11-09", "Sister, lives in Philly."],
    ["Theo Brooks", "friend", "close", null, null, "06-30", "College roommate. Pickup basketball Thursdays."],
    ["Priya Shah", "friend", "close", "Fieldnote", "Product lead", "01-18", null],
    ["Marcus Bell", "friend", "close", null, null, "10-29", "Marathon training buddy."],
    ["Hannah Kim", "friend", "close", "Brightline Studio", "Creative director", "07-07", null],
    ["Owen Gallagher", "friend", "close", null, null, "02-11", "Board game night host."],
    ["Zoe Martin", "friend", "close", null, null, "09-03", null],
    ["Ravi Patel", "friend", "network", "Cobalt Analytics", "Data engineer", null, null],
    ["Claire Dubois", "friend", "network", null, null, "12-12", "Met at the climbing gym."],
    ["Ben Foster", "friend", "network", "Harbor & Pine", "Chef", null, null],
    ["Lily Chen", "friend", "close", null, null, "04-25", null],
    ["Sofia Romano", "friend", "network", null, null, null, "Neighbor with the vegetable garden."],
    ["Elena Novak", "professional", "network", "Northwind Labs", "VP of Partnerships", null, "Former manager. Great sounding board."],
    ["Kofi Okoro", "professional", "network", "Northwind Labs", "Solutions engineer", null, null],
    ["Grace Liu", "professional", "network", "Cobalt Analytics", "Head of Customer Success", null, null],
    ["Jamal Wright", "professional", "network", "Cobalt Analytics", "CEO", null, "Intro from Ravi. Hiring a partner lead."],
    ["Megan Hart", "recruiter", "network", "Tidewater Partners", "Principal", null, null],
    ["Tom Reyes", "recruiter", "network", "Tidewater Partners", "Associate", null, null],
    ["Aisha Bello", "professional", "network", "Fieldnote", "Co-founder", null, null],
    ["Kevin Doyle", "colleague", "network", "Northwind Labs", "Account executive", null, null],
    ["Rachel Stein", "professional", "network", "Brightline Studio", "Founder", null, null],
    ["Victor Hale", "professional", "network", null, "Angel investor", null, null],
    ["Ines Cruz", "professional", "network", "Harbor & Pine", "Operations director", null, null],
    ["Noah Fischer", "colleague", "network", "Northwind Labs", "Product manager", null, null],
    ["Gus Ferreira", "vendor", null, "Greenline Builders", "Project lead", null, "Kitchen remodel. Prefers texts."],
    ["Ana Torres", "vendor", null, "Copper Kettle Coffee", "Owner", null, null],
    ["Dr. Lena Park", "provider", null, "Seaside Physical Therapy", "Physical therapist", null, "Knee rehab."]
  ];
  var PEOPLE = PEOPLE_SRC.map(function (p, i) {
    var c = p[3] ? co(p[3]) : null;
    return { id: uuid("pp" + i), name: p[0], first: p[0].split(" ")[0], rel: p[1], circle: p[2], company: p[3], company_id: c ? c.id : null, title: p[4], birthday: p[5], notes: p[6],
      email: p[1] === "family" || p[1] === "partner" ? null : p[0].toLowerCase().replace(/[^a-z]+/g, ".").replace(/^\.|\.$/g, "") + "@example.com", private: p[1] === "provider" };
  });
  function person(name) { return PEOPLE.filter(function (p) { return p.name === name; })[0]; }
  var partner = PEOPLE[0];

  /* ---------- calendar events: 2 years back, 60 days ahead ---------- */
  var TEMPL = {
    friends_family: [["Dinner with {a}", 19, 2, 1], ["Game night at {a}'s", 19, 3, 3], ["Call with {a}", 18, 0.5, 1], ["Brunch with {a} and {b}", 11, 2, 2], ["{a}'s birthday party", 18, 4, 3]],
    romantic_dates: [["Date night: tapas", 19, 2.5, 0], ["Movie night out", 19, 3, 0], ["Sunset walk on the beach", 18, 1.5, 0]],
    fun_excursions: [["Concert at the Sinclair", 20, 3, 1], ["Farmers market", 10, 2, 0], ["Comedy show", 20, 2, 1], ["Museum afternoon", 13, 3, 1]],
    day_trips: [["Day trip to Portsmouth", 9, 9, 0], ["Hike Mount Monadnock", 8, 8, 1]],
    networking_job_search: [["Coffee with {w}", 10, 1, 1], ["Intro call with {w}", 14, 0.5, 1], ["Panel: partner ecosystems", 18, 2, 0]],
    work: [["Client workshop prep", 13, 2, 0], ["Quarterly planning", 9, 3, 0]],
    health_growth: [["Physical therapy", 8, 1, 0], ["Career coaching", 17, 1, 0], ["Annual physical", 9, 1, 0]],
    active: [["Pickup basketball", 19, 1.5, 1], ["Long run with {r}", 7, 1.5, 1], ["Climbing gym", 18, 2, 0]],
    home: [["Kitchen walkthrough with {v}", 16, 1, 1], ["Tile showroom", 11, 1.5, 0]],
    self_care: [["Haircut", 12, 1, 0], ["Massage", 17, 1, 0]],
    pets: [["Vet: Pepper's checkup", 9, 1, 0], ["Dog park meetup", 8, 1, 0]]
  };
  var FREQ = { friends_family: 0.32, romantic_dates: 0.14, fun_excursions: 0.1, day_trips: 0.03, networking_job_search: 0.14, work: 0.08, health_growth: 0.08, active: 0.2, home: 0.04, self_care: 0.04, pets: 0.03 };
  var friends = PEOPLE.filter(function (p) { return p.rel === "friend" || p.rel === "family"; }), work = PEOPLE.filter(function (p) { return ["professional", "recruiter", "colleague"].indexOf(p.rel) > -1; });
  var EVENTS = [], ev = 0;
  function addEvent(off, slug, t, h, dur, ppl, withP, allDay, excluded, reason) {
    var s = at(off, Math.floor(h), Math.round((h % 1) * 60)), e = new Date(s.getTime() + dur * 36e5);
    EVENTS.push({ id: "evt" + (ev++), off: off, on: iso(day(off)), t: t, c: slug, l: catLabel(slug), s: s, e: e, ad: !!allDay, p: !!withP, priv: isPriv(slug), people: ppl || [], excluded: !!excluded, reason: reason || null });
  }
  for (var off = -730; off <= 60; off++) {
    var r = rng(hash("d" + off)), dow = day(off).getDay();
    Object.keys(FREQ).forEach(function (slug) {
      var f = FREQ[slug] * (dow === 0 || dow === 6 ? (slug === "work" || slug === "networking_job_search" ? 0.1 : 1.6) : 1);
      if (off > 0) f *= 0.55;
      if (r() > f) return;
      var tp = pick(TEMPL[slug], r), a = pick(friends, r), b = pick(friends, r), w = pick(work, r), run = person("Marcus Bell"), v = person("Gus Ferreira");
      var t = tp[0].replace("{a}", a.first).replace("{b}", b.first).replace("{w}", w.name.split(" ")[0] + " (" + (w.company || "independent") + ")").replace("{r}", run.first).replace("{v}", v.first);
      var ppl = /\{a\}/.test(tp[0]) ? [a] : /\{w\}/.test(tp[0]) ? [w] : /\{r\}/.test(tp[0]) ? [run] : /\{v\}/.test(tp[0]) ? [v] : [];
      if (/\{b\}/.test(tp[0]) && b !== a) ppl.push(b);
      if (slug === "active" && /basketball/.test(t)) ppl = [person("Theo Brooks")];
      var withP = slug === "romantic_dates" || (slug === "friends_family" && r() < 0.5) || (slug === "fun_excursions" && r() < 0.6) || slug === "day_trips";
      if (withP) ppl = ppl.concat([partner]);
      addEvent(off, slug, t, tp[1] + (r() < 0.5 ? 0 : 0.5), tp[2], ppl, withP);
    });
  }
  // a vacation each year, and a few things for today
  [[-330, "Acadia camping trip"], [-150, "Lisbon trip"], [24, "Long weekend in Montreal"]].forEach(function (v) { for (var i = 0; i < 4; i++) addEvent(v[0] + i, "vacations", v[1], 0, 24, [partner], true, true); });
  addEvent(0, "networking_job_search", "Coffee with Elena (Northwind Labs)", 9.5, 1, [person("Elena Novak")]);
  addEvent(0, "work", "Workshop deck review", 13, 1.5, []);
  addEvent(0, "active", "Climbing gym", 17.5, 1.5, []);
  addEvent(0, "friends_family", "Dinner with Theo and Lily", 19.5, 2, [person("Theo Brooks"), person("Lily Chen"), partner], true);
  addEvent(0, "other", "Pick up dry cleaning", 0, 24, [], false, true, true, "reminder");
  addEvent(0, "other", "Hannah's birthday", 0, 24, [], false, true, true, "birthday reminder");
  EVENTS.sort(function (a, b) { return a.s - b.s; });

  /* ---------- touches: meetings from events plus email threads ---------- */
  var TOUCH = {}; PEOPLE.forEach(function (p) { TOUCH[p.id] = []; });
  EVENTS.forEach(function (e) { if (e.off <= 0 && !e.excluded) e.people.forEach(function (p) { TOUCH[p.id].push({ at: e.s.toISOString(), ch: "meeting", label: e.t, off: e.off }); }); });
  var SUBJ = ["Quick intro", "Following up on our chat", "Notes from Tuesday", "Weekend plans?", "That article I mentioned", "Re: proposal draft", "Photos from the hike", "Coffee next week?"];
  PEOPLE.forEach(function (p, i) {
    var r = rng(hash("m" + i)), n = p.rel === "provider" ? 2 : p.circle === "inner" ? 18 : p.circle === "close" ? 9 : 5;
    var recentBias = i % 7 === 3 ? 260 : 0; // a few people going quiet
    for (var k = 0; k < n; k++) { var o = -Math.floor(recentBias + Math.pow(r(), 1.6) * (600 - recentBias)); TOUCH[p.id].push({ at: at(o, 9 + Math.floor(r() * 9)).toISOString(), ch: "email", label: pick(SUBJ, r), off: o }); }
    TOUCH[p.id].sort(function (a, b) { return a.at < b.at ? 1 : -1; });
  });
  // the newest people this month
  [person("Jamal Wright"), person("Aisha Bello"), person("Tom Reyes")].forEach(function (p, i) { TOUCH[p.id] = TOUCH[p.id].filter(function (t) { return t.off > -20 + i * 3; }); if (!TOUCH[p.id].length) TOUCH[p.id].push({ at: at(-6 - i * 3, 11).toISOString(), ch: "email", label: "Quick intro", off: -6 - i * 3 }); });
  function stats(p) {
    var t = TOUCH[p.id], ch = {};
    t.forEach(function (x) { ch[x.ch] = 1; });
    return { total: t.length, n90: t.filter(function (x) { return x.off >= -90; }).length, n12: t.filter(function (x) { return x.off >= -365; }).length,
      last: t.length ? t[0].at : null, first: t.length ? t[t.length - 1].at : null, channels: Object.keys(ch) };
  }

  /* ---------- mutable demo state ---------- */
  var BASE = {
    promises: [
      { id: 101, text: "Send Elena the partner program one-pager", who: "Elena Novak", due: iso(day(0)), kind: "email" },
      { id: 102, text: "Book the Montreal hotel", who: PARTNER, due: iso(day(2)), kind: "calendar" },
      { id: 103, text: "Share the climbing gym guest pass", who: "Claire Dubois", due: iso(day(-2)), kind: "calendar" },
      { id: 104, text: "Introduce Ravi to Jamal", who: "Ravi Patel", due: null, kind: "email" },
      { id: 105, text: "Return Owen's copy of Wingspan", who: "Owen Gallagher", due: iso(day(6)), kind: "manual" }
    ],
    review: [
      { id: 201, kind: "uncertain_category", payload: { title: "Sunday sauna session", start: at(-3, 10).toISOString(), suggested: "self_care", why: "Could be self-care or active" } },
      { id: 202, kind: "new_category", payload: { label: "Volunteering", slug: "volunteering", description: "Food bank shifts and beach cleanups", refs: ["a", "b", "c", "d"], examples: ["Food bank shift", "Beach cleanup", "Library book sale"] } },
      { id: 203, kind: "merge_candidate", payload: { keep_name: "Ravi Patel", drop_name: "R. Patel", why: "Same work email domain and phone number" } },
      { id: 204, kind: "birthday", payload: { title: "Sofia bday!", name: "Sofia Romano", md: iso(day(12)).slice(5) } },
      { id: 205, kind: "company", payload: { name: "Fieldnote", change: "Raised a Series A and moved headquarters to Boston." } }
    ],
    extraCats: [], nextId: 300
  };
  function load() { try { var s = JSON.parse(localStorage.getItem(KEY)); if (s && s.v === 1) return s; } catch (e) {} return JSON.parse(JSON.stringify(Object.assign({ v: 1 }, BASE))); }
  var S = load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  window.TapDemo = {
    reset: function () {
      try { Object.keys(localStorage).forEach(function (k) { if (/^(tap-|cal-mode|food-tab|health-range|woi-)/.test(k)) localStorage.removeItem(k); }); } catch (e) {}
      location.hash = "today"; location.reload();
    }
  };

  /* ---------- Iron ---------- */
  var IRON_T = {
    "Upper Body": [["DB Bench Press", 3, "10", 45, 2.5], ["Seated Cable Row", 3, "12", 70, 5], ["Incline DB Press", 3, "8", 30, 2.5], ["Lat Pulldown", 3, "10", 90, 5], ["Triceps Pressdown", 3, "12", 50, 5]],
    "Lower Body": [["Leg Press", 3, "10", 180, 10], ["Romanian Deadlift", 3, "8", 95, 5], ["Split Squat", 3, "10", 25, 2.5], ["Leg Curl", 3, "12", 60, 5], ["Calf Raise", 3, "15", 90, 5]],
    "Full Body": [["Goblet Squat", 3, "10", 40, 2.5], ["DB Row", 3, "10", 40, 2.5], ["Push-ups", 3, "12", "BW", 0], ["Kettlebell Swing", 3, "15", 35, 0], ["Plank", 3, "45s", "BW", 0]]
  };
  var IRON = [], n = 0;
  for (var o = -230; o <= 0; o++) {
    var dw = day(o).getDay(), rr = rng(hash("i" + o));
    if (o > -128 && o < -116) continue; // a real-life gap
    if ([1, 3, 5].indexOf(dw) < 0 || rr() < 0.25) continue;
    var type = ["Upper Body", "Lower Body", "Full Body"][n % 3], wk = (o + 230) / 7;
    IRON.push({ session_no: ++n, session_date: iso(day(o)), session_type: type, off: o,
      knee_status: o > -40 ? (rr() < 0.8 ? "No pain" : "Mild stiffness") : (rr() < 0.55 ? "No pain" : rr() < 0.7 ? "Mild stiffness" : "Some soreness"),
      notes: rr() < 0.2 ? pick(["Felt strong today.", "Short on time, cut the last set.", "Knee warmed up fine.", "New PR on the first lift."], rr) : "",
      exercises: IRON_T[type].map(function (x) { return { name: x[0], sets: String(x[1]), reps: x[2], weight: x[3] === "BW" ? "BW" : String(Math.round((x[3] + Math.floor(wk / 3) * x[4]) / 2.5) * 2.5) }; }) });
  }
  var IRON_DESC = IRON.slice().reverse();

  /* ---------- Food (last 28 days) ---------- */
  var FOODS = {
    "Greek yogurt bowl": [["Greek yogurt, 2%", 1, "cup", 190, 20, 9, 5, 0, 85], ["Blueberries", 0.5, "cup", 42, 0.5, 11, 0, 2, 1], ["Granola", 0.25, "cup", 120, 3, 18, 4, 2, 20]],
    "Eggs and toast": [["Eggs, scrambled", 3, "large", 220, 18, 2, 15, 0, 210], ["Sourdough toast", 1, "slice", 120, 4, 23, 1, 1, 230], ["Avocado", 0.5, "fruit", 120, 1.5, 6, 11, 5, 5]],
    "Protein smoothie": [["Whey protein", 1, "scoop", 120, 24, 3, 1.5, 0, 130], ["Banana", 1, "medium", 105, 1, 27, 0, 3, 1], ["Almond milk", 1, "cup", 40, 1, 2, 3, 0, 170]],
    "Chicken grain bowl": [["Grilled chicken", 5, "oz", 230, 43, 0, 5, 0, 105], ["Brown rice", 0.75, "cup", 165, 4, 34, 1, 2, 5], ["Roasted vegetables", 1, "cup", 90, 2, 12, 4, 4, 160], ["Tahini dressing", 1, "tbsp", 90, 3, 3, 8, 1, 20]],
    "Turkey sandwich": [["Turkey breast", 4, "oz", 120, 24, 2, 1, 0, 680], ["Whole wheat bread", 2, "slice", 220, 10, 40, 3, 6, 340], ["Cheddar", 1, "slice", 110, 7, 0, 9, 0, 180]],
    "Salmon dinner": [["Salmon fillet", 6, "oz", 350, 34, 0, 22, 0, 100], ["Quinoa", 1, "cup", 220, 8, 39, 4, 5, 13], ["Asparagus", 8, "spears", 30, 3, 6, 0, 3, 3]],
    "Pasta night": [["Penne", 2, "cup", 400, 14, 80, 2, 4, 5], ["Meat sauce", 1, "cup", 260, 18, 14, 14, 3, 720], ["Parmesan", 2, "tbsp", 40, 4, 0, 3, 0, 150]],
    "Tacos": [["Corn tortillas", 3, "small", 150, 3, 33, 2, 4, 30], ["Carnitas", 4, "oz", 280, 24, 0, 20, 0, 420], ["Salsa and slaw", 1, "cup", 45, 1, 9, 0, 3, 310]],
    "Apple and peanut butter": [["Apple", 1, "medium", 95, 0.5, 25, 0, 4, 2], ["Peanut butter", 2, "tbsp", 190, 7, 7, 16, 2, 140]],
    "Protein bar": [["Protein bar", 1, "bar", 210, 20, 23, 7, 10, 200]],
    "Latte": [["Oat milk latte", 16, "fl oz", 190, 3, 26, 8, 2, 140]]
  };
  var BASIS = ["USDA", "Label", "USDA", "Restaurant menu", "Estimate"];
  var PLAN = [["Breakfast", 8, ["Greek yogurt bowl", "Eggs and toast", "Protein smoothie"]], ["Lunch", 12.5, ["Chicken grain bowl", "Turkey sandwich"]], ["Snack", 15.5, ["Apple and peanut butter", "Protein bar", "Latte"]], ["Dinner", 19, ["Salmon dinner", "Pasta night", "Tacos", "Chicken grain bowl"]]];
  var MEALS = [], ITEMS = [], mid = 0, iid = 0;
  for (var fo = -27; fo <= 0; fo++) {
    var fr = rng(hash("f" + fo));
    if (fo === -9 || fo === -20) continue;
    PLAN.forEach(function (pl) {
      if (fo === 0 && pl[0] === "Dinner") return;
      if (pl[0] === "Snack" && fr() < 0.35) return;
      var title = pick(pl[2], fr), when = at(fo, Math.floor(pl[1]), (pl[1] % 1) * 60 + Math.floor(fr() * 20)), id = ++mid, tot = [0, 0, 0, 0, 0, 0];
      var parts = FOODS[title];
      parts.forEach(function (it, pos) {
        var k = 0.9 + fr() * 0.2;
        var row = { id: ++iid, day: iso(when), meal_id: id, meal_title: title, meal_type: pl[0], time_local: when.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }), position: pos + 1, name: it[0], quantity: it[1], unit: it[2],
          calories: Math.round(it[3] * k), protein_g: Math.round(it[4] * k), carbs_g: Math.round(it[5] * k), fat_g: Math.round(it[6] * k), fiber_g: Math.round(it[7] * k), sodium_mg: Math.round(it[8] * k), basis: pick(BASIS, fr) + ": " + it[0].toLowerCase() };
        ITEMS.push(row); ["calories", "protein_g", "carbs_g", "fat_g", "fiber_g", "sodium_mg"].forEach(function (f, j) { tot[j] += row[f]; });
      });
      MEALS.push({ id: id, day: iso(when), eaten_at: when.toISOString(), time_local: when.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }), meal_type: pl[0], title: title,
        where_eaten: pick(["Home", "Home", "Work", "Out"], fr), hunger_before: 2 + Math.floor(fr() * 3), fullness_after: 3 + Math.floor(fr() * 2), confidence: pick(["high", "medium", "medium", "low"], fr), item_count: parts.length,
        calories: tot[0], protein_g: tot[1], carbs_g: tot[2], fat_g: tot[3], fiber_g: tot[4], sodium_mg: tot[5], notes: fr() < 0.4 ? pick(["Portions estimated from the photo.", "Assumed a standard restaurant serving.", "Used the label for the bar.", "Dressing amount is a guess."], fr) : null });
    });
  }
  var DAILY = [];
  MEALS.forEach(function (m) {
    var d = DAILY.filter(function (x) { return x.day === m.day; })[0];
    if (!d) { d = { day: m.day, meals: 0, calories: 0, protein_g: 0, carbs_g: 0, fat_g: 0, fiber_g: 0, sodium_mg: 0, first_bite: null, last_bite: null, h: [], f: [] }; DAILY.push(d); }
    d.meals++; ["calories", "protein_g", "carbs_g", "fat_g", "fiber_g", "sodium_mg"].forEach(function (k) { d[k] += m[k]; });
    var t = new Date(m.eaten_at), hm = pad(t.getHours()) + ":" + pad(t.getMinutes()) + ":00";
    if (!d.first_bite || hm < d.first_bite) d.first_bite = hm; if (!d.last_bite || hm > d.last_bite) d.last_bite = hm;
    d.h.push(m.hunger_before); d.f.push(m.fullness_after);
  });
  DAILY.forEach(function (d) { d.avg_hunger = Math.round(d.h.reduce(function (a, b) { return a + b; }, 0) / d.h.length * 10) / 10; d.avg_fullness = Math.round(d.f.reduce(function (a, b) { return a + b; }, 0) / d.f.length * 10) / 10; delete d.h; delete d.f; });

  /* ---------- Health: computed per date so any range is consistent ---------- */
  var IRON_BY_DAY = {}; IRON.forEach(function (s) { IRON_BY_DAY[s.session_date] = s; });
  function healthDay(off) {
    var d = day(off), k = iso(d), r = rng(hash("h" + k)), mo = d.getMonth(), winter = mo === 11 || mo <= 2 ? 1 : 0;
    var steps = Math.round(between(4200, 11800, r) * (d.getDay() === 0 || d.getDay() === 6 ? 1.15 : 1) * (winter ? 0.82 : 1));
    var trained = !!IRON_BY_DAY[k] || r() < 0.12;
    var o = { d: k, steps: steps, kcal: Math.round(steps / 22 + (trained ? 260 : 60) + r() * 80), rhr: r() < 0.08 ? null : Math.round(52 + winter * 2 + r() * 4 + (off > -8 && off < -2 ? 3 : 0)), hr: null, w: null, hrv: null, era: "watch" };
    if (o.rhr != null) o.hr = o.rhr + 17 + Math.round(r() * 6);
    return o;
  }
  function healthSleep(off) {
    var wake = day(off), k = iso(wake), r = rng(hash("s" + k));
    if (r() < 0.18) return null; // watch not worn
    var prev = iso(day(off - 1)), late = IRON_BY_DAY[prev] && IRON_BY_DAY[prev].off % 2 === 0;
    var bedH = 22.6 + r() * 1.6 + (wake.getDay() === 0 || wake.getDay() === 6 ? 0.6 : 0) + (late ? 0.3 : 0);
    var asleep = Math.round(between(390, 510, r) - (late ? 20 : 0)), deep = Math.round(asleep * between(0.11, 0.17, r)), rem = Math.round(asleep * between(0.19, 0.25, r)), awake = Math.round(r() * 25);
    var bs = at(off - 1, Math.floor(bedH) % 24, (bedH % 1) * 60); if (bedH >= 24) bs = at(off, Math.floor(bedH - 24), (bedH % 1) * 60);
    var be = new Date(bs.getTime() + (asleep + awake) * 6e4);
    return { n: k, bs: bs.toISOString(), be: be.toISOString(), bed: asleep + awake, asleep: asleep, core: asleep - deep - rem, deep: deep, rem: rem, awake: awake, score: null, staged: true, src: "apple_health" };
  }
  function healthWorkouts(fromOff, toOff) {
    var out = [];
    for (var o = fromOff; o <= toOff; o++) {
      var k = iso(day(o)), s = IRON_BY_DAY[k], r = rng(hash("w" + k));
      if (s) out.push({ s: at(o, s.off % 2 === 0 ? 19 : 7, 15).toISOString(), a: "Weight Training", min: Math.round(between(45, 70, r)), km: null, kcal: Math.round(between(220, 340, r)), iron: s.session_no });
      if (r() < 0.12) out.push({ s: at(o, 8, 0).toISOString(), a: r() < 0.5 ? "Cycling" : "Running", min: Math.round(between(30, 75, r)), km: Math.round(between(6, 28, r) * 10) / 10, kcal: Math.round(between(250, 600, r)), iron: null });
      if (r() < 0.2) out.push({ s: at(o, 12, 30).toISOString(), a: "Walking", min: Math.round(between(20, 50, r)), km: Math.round(between(1.5, 4, r) * 10) / 10, kcal: Math.round(between(80, 200, r)), iron: null });
    }
    return out.sort(function (a, b) { return a.s < b.s ? 1 : -1; });
  }
  var HEALTH_FIRST = -420;
  function healthHub(from, to) {
    var a = Math.max(HEALTH_FIRST, diffDays(from, TODAY)), b = Math.min(0, diffDays(to, TODAY)), daily = [], sleep = [];
    for (var o = a; o <= b; o++) { daily.push(healthDay(o)); var s = healthSleep(o); if (s) sleep.push(s); }
    return { from: from, to: to, daily: daily, sleep: sleep, workouts: healthWorkouts(a, b), bounds: { first: iso(day(HEALTH_FIRST)), last: TODAY }, sleep_first: iso(day(HEALTH_FIRST)), synced: at(0, 7, 5).toISOString() };
  }

  /* ---------- weekly insights (what the Sunday task writes) ---------- */
  function insights() {
    var w = day(-day(0).getDay());
    return { week_of: iso(w), run_at: at(-day(0).getDay(), 18, 52).toISOString(), items: [
      { domain: "health", section: "watch", key: "h_rhr_week", title: "Resting heart rate up this week", body: "It averaged 57 bpm, about 3 above your 8-week norm. Worth watching alongside sleep and stress.", n: 7 },
      { domain: "health", section: "this_week", key: "h_steps_week", title: "Steps a little above normal", body: "You averaged 8,140 steps a day, about 600 more than the 8 weeks before.", n: 7 },
      { domain: "health", section: "holding", key: "p1", title: "Late sessions line up with shorter sleep", body: "After evening sessions you sleep about 20 minutes less, with bedtime roughly 20 minutes later. Based on 48 late and 51 earlier nights.", n: 99 },
      { domain: "health", section: "holding", key: "p2", title: "Steady bedtimes, slightly better sleep", body: "Weeks where bedtime varied less than 40 minutes averaged 12 more minutes asleep than scattered weeks. Based on 54 weeks.", n: 54 },
      { domain: "health", section: "unlock", key: "p4", title: "Seasonal drift", body: "Unlocks once there is a full year of nights to compare against.", n: null },
      { domain: "iron", section: "this_week", key: "p3_iron_week", title: "Three sessions, right on pace", body: "You logged 3 sessions this week vs an average of 2.3 over the 8 weeks before.", n: 3 },
      { domain: "iron", section: "watch", key: "p3_knee", title: "Knee check", body: "Two of your last six sessions noted mild stiffness. Nothing new, but worth keeping an eye on before heavy leg days.", n: 6 },
      { domain: "food", section: "holding", key: "f1", title: "Earlier last bites, longer sleep", body: "On days your last bite was 3+ hours before bed you slept about 15 minutes longer. Based on 22 logged days.", n: 22 },
      { domain: "food", section: "unlock", key: "f3", title: "Food and strength", body: "Comes later, once there are enough Iron sessions with food logged the day before.", n: null }
    ] };
  }

  /* ---------- the database functions the hub calls ---------- */
  function evOut(e, priv) { return { t: e.priv && !priv ? "Private" : e.t, ad: e.ad, at: e.s.toISOString(), c: e.c, l: e.l, p: e.p, priv: e.priv }; }
  function cats() { return CATS.concat(S.extraCats); }
  function tapToday() {
    var todays = EVENTS.filter(function (e) { return e.on === TODAY; });
    var up = EVENTS.filter(function (e) { return e.off >= 1 && e.off <= 7 && !e.excluded; }).map(function (e) { return { id: e.id, title: e.t, all_day: e.ad, at: e.s.toISOString(), on: e.on, cat: e.l, slug: e.c, p: e.p }; });
    var last = IRON_DESC[0], tf = DAILY.filter(function (d) { return d.day === TODAY; })[0], lm = MEALS.filter(function (m) { return m.day === TODAY; }).slice(-1)[0];
    var bdays = PEOPLE.filter(function (p) { return p.birthday; }).map(function (p) { var y = day(0).getFullYear(), d = parse(y + "-" + p.birthday); if (iso(d) < TODAY) d = parse((y + 1) + "-" + p.birthday); return { id: p.id, name: p.name, rel: p.rel, on: iso(d), in: diffDays(iso(d), TODAY), self: false }; })
      .filter(function (b) { return b.in <= 30; }).sort(function (a, b) { return a.in - b.in; });
    return {
      day: TODAY, synced: at(0, 6, 46).toISOString(), review_open: S.review.length, birthdays: bdays,
      today_events: todays.map(function (e) { return { event_id: e.id, title: e.t, all_day: e.ad, starts_at: e.s.toISOString(), ends_at: e.e.toISOString(), category: e.c, label: e.l, excluded: e.excluded, exclude_reason: e.reason, with_partner: e.p, private: e.priv, location: null }; }),
      upcoming: up, promises: S.promises.slice().sort(function (a, b) { return (a.due || "9") < (b.due || "9") ? -1 : 1; }),
      workout: last ? { date: last.session_date, type: last.session_type, knee: last.knee_status, days_ago: -last.off, this_week: IRON.filter(function (s) { return s.off > -7; }).length } : null,
      food: { today: tf ? Object.assign({}, tf) : null, target: null, last_meal: lm ? { at: lm.eaten_at, type: lm.meal_type, title: lm.title } : null }
    };
  }
  function hubRange(from, to, priv) {
    var days = [], tot = {}, ppl = {}, nE = 0, nP = 0, nW = 0;
    for (var o = diffDays(from, TODAY); o <= diffDays(to, TODAY); o++) {
      var k = iso(day(o)), evs = EVENTS.filter(function (e) { return e.on === k && !e.excluded; });
      evs.forEach(function (e) { nE++; if (e.p) nP++; tot[e.c] = (tot[e.c] || 0) + 1; e.people.forEach(function (p) { if (p !== partner && (priv || !p.private)) ppl[p.id] = (ppl[p.id] || 0) + 1; }); });
      var s = IRON_BY_DAY[k], f = DAILY.filter(function (d) { return d.day === k; })[0]; if (s) nW++;
      days.push({ d: k, events: evs.filter(function (e) { return priv || !e.priv; }).map(function (e) { return evOut(e, priv); }), workout: s ? s.session_type : null, kcal: f ? f.calories : null });
    }
    return { from: from, to: to, days: days, events: nE, with_partner: nP, workouts: nW,
      totals: Object.keys(tot).map(function (c) { return { c: c, l: catLabel(c), n: tot[c] }; }).sort(function (a, b) { return b.n - a.n; }),
      people: Object.keys(ppl).map(function (id) { return { id: id, name: PEOPLE.filter(function (p) { return p.id === id; })[0].name, n: ppl[id] }; }).sort(function (a, b) { return b.n - a.n; }).slice(0, 8),
      categories: cats().map(function (c) { return { slug: c.slug, label: c.label, private: c.private }; }) };
  }
  function graph(priv) {
    var ps = PEOPLE.filter(function (p) { return priv || !p.private; });
    var nodes = ps.map(function (p) { var s = stats(p); return { id: p.id, name: p.name, rel: p.rel, circle: p.circle, company: p.company, company_id: p.company_id, title: p.title, total: s.total, n12: s.n12, last: s.last, first: s.first }; });
    var pair = {};
    EVENTS.forEach(function (e) { if (e.off > 0) return; var ids = e.people.filter(function (p) { return priv || !p.private; }).map(function (p) { return p.id; }); for (var i = 0; i < ids.length; i++) for (var j = i + 1; j < ids.length; j++) { var k2 = [ids[i], ids[j]].sort().join("|"); pair[k2] = (pair[k2] || 0) + 1; } });
    var edges = Object.keys(pair).map(function (k2) { var a = k2.split("|"); return { a: a[0], b: a[1], w: pair[k2] }; });
    var comps = COMPANIES.filter(function (c) { return priv || !c.private; }).map(function (c) { return { id: c.id, name: c.name, kind: c.kind, industry: c.industry, ids: ps.filter(function (p) { return p.company_id === c.id; }).map(function (p) { return p.id; }) }; });
    var cold = nodes.filter(function (x) { return x.circle && x.last && diffDays(x.last.slice(0, 10), TODAY) < -120; }).sort(function (a, b) { return a.last < b.last ? -1 : 1; });
    var fresh = nodes.filter(function (x) { return x.first && diffDays(x.first.slice(0, 10), TODAY) > -30; }).sort(function (a, b) { return a.first < b.first ? 1 : -1; });
    return { nodes: nodes, edges: edges, companies: comps, cold: cold.map(function (x) { return { id: x.id, name: x.name, last: x.last, total: x.total }; }), "new": fresh.map(function (x) { return { id: x.id, name: x.name, first: x.first }; }), counts: { people: nodes.length, companies: comps.length, shown: nodes.length } };
  }
  function personDetail(id) {
    var p = PEOPLE.filter(function (x) { return x.id === id; })[0]; if (!p) return { person: null };
    var s = stats(p);
    return { person: { id: p.id, name: p.name, rel: p.rel, circle: p.circle, company: p.company, company_id: p.company_id, title: p.title, notes: p.notes, birthday: p.birthday },
      summary: { total: s.total, n90: s.n90, last_at: s.last, first_at: s.first, channels: s.channels }, emails: p.email ? [p.email] : [],
      promises: S.promises.filter(function (x) { return x.who === p.name; }), recent: TOUCH[p.id].slice(0, 25).map(function (t) { return { at: t.at, ch: t.ch, label: t.label }; }) };
  }
  function companyDetail(id) {
    var c = COMPANIES.filter(function (x) { return x.id === id; })[0]; if (!c) return { company: null };
    var ps = PEOPLE.filter(function (p) { return p.company_id === id; }), rec = [];
    ps.forEach(function (p) { TOUCH[p.id].slice(0, 6).forEach(function (t) { rec.push({ at: t.at, ch: t.ch, label: t.label, who: p.name }); }); });
    return { company: Object.assign({ sources: ["https://example.com"], researched_at: at(-12, 9).toISOString() }, c),
      people: ps.map(function (p) { return { id: p.id, name: p.name, title: p.title, last: stats(p).last }; }), recent: rec.sort(function (a, b) { return a.at < b.at ? 1 : -1; }).slice(0, 12) };
  }
  function search(q, priv) {
    q = q.toLowerCase();
    var ppl = PEOPLE.filter(function (p) { return (priv || !p.private) && (p.name.toLowerCase().indexOf(q) > -1 || (p.company || "").toLowerCase().indexOf(q) > -1); }).map(function (p) { return { id: p.id, type: "person", name: p.name, rel: p.rel, company: p.company }; });
    var cs = COMPANIES.filter(function (c) { return (priv || !c.private) && c.name.toLowerCase().indexOf(q) > -1; }).map(function (c) { return { id: c.id, type: "company", name: c.name, company: c.industry }; });
    return cs.concat(ppl).slice(0, 14);
  }
  function resolve(id, payload) {
    var it = S.review.filter(function (x) { return x.id === id; })[0];
    if (it && it.kind === "new_category" && payload.action === "approve") S.extraCats.push({ slug: it.payload.slug, label: it.payload.label, private: false });
    S.review = S.review.filter(function (x) { return x.id !== id; }); save(); return { ok: true };
  }
  function tracker() {
    var T = [["crm", "calendar_events", 1460], ["crm", "touches", 980], ["crm", "people", PEOPLE.length], ["crm", "participants", 2100], ["crm", "companies", COMPANIES.length], ["crm", "promises", 42], ["crm", "categories", CATS.length],
      ["health", "daily", 420], ["health", "sleep", 350], ["health", "workouts", 210], ["fitness", "sessions", IRON.length], ["fitness", "exercises", IRON.length * 5], ["food", "meals", MEALS.length], ["food", "items", ITEMS.length], ["insights", "weekly", 120]];
    return { pg_version: "17.4", db_bytes: 19 * 1048576, connections: 7, max_connections: 60, storage_bytes: 0, buckets: 0, auth_users: 0,
      tables: T.map(function (t) { var b = 16384 + t[2] * 420; return { schema: t[0], name: t[1], rows: t[2], bytes: b, heap_bytes: Math.round(b * 0.7), index_bytes: Math.round(b * 0.3), rls: true, policies: 0, dead: 0, analyzed: at(-1, 3).toISOString() }; }).sort(function (a, b) { return b.bytes - a.bytes; }),
      migrations: ["insights_compute", "insights_schema", "food_meal_notes", "health_garmin_daily", "crm_promises", "crm_review_queue", "crm_core"].map(function (nm, i) { return { version: "2026101" + (9 - i) + "120000", name: nm }; }),
      extensions: [{ name: "pg_stat_statements", version: "1.10" }, { name: "vector", version: "0.8.0" }] };
  }

  /* ---------- router: SQL text in, the same JSON shapes Supabase returns ---------- */
  function arg(q, i) { var m = q.match(/'((?:[^']|'')*)'/g) || []; return m[i] ? m[i].slice(1, -1).replace(/''/g, "'") : null; }
  function sql(q) {
    var priv = !/,\s*false\s*\)\s*as d/.test(q);
    if (/crm\.tap_today/.test(q)) return tapToday();
    if (/crm\.hub_range/.test(q)) return hubRange(arg(q, 0), arg(q, 1), /,\s*true\)/.test(q));
    if (/crm\.dashboard_graph/.test(q)) return graph(priv);
    if (/crm\.dashboard_review/.test(q)) return { open: S.review.length, items: S.review, categories: cats().map(function (c) { return { slug: c.slug, label: c.label }; }) };
    if (/crm\.person_detail/.test(q)) return personDetail(arg(q, 0));
    if (/crm\.company_detail/.test(q)) return companyDetail(arg(q, 0));
    if (/crm\.search_people/.test(q)) return search(arg(q, 0), !(window.Hub && Hub.hide));
    if (/crm\.resolve_review/.test(q)) { var m = q.match(/resolve_review\((\d+)/); return resolve(+m[1], JSON.parse(arg(q, 0))); }
    if (/crm\.set_promise/.test(q)) { var id = +q.match(/set_promise\((\d+)/)[1]; S.promises = S.promises.filter(function (p) { return p.id !== id; }); save(); return { ok: true }; }
    if (/crm\.add_promises/.test(q)) { JSON.parse(arg(q, 0)).forEach(function (p) { S.promises.push({ id: ++S.nextId, text: p.text, who: null, due: null, kind: p.kind || "manual" }); }); save(); return { added: 1 }; }
    if (/health\.hub/.test(q)) return healthHub(arg(q, 0), arg(q, 1));
    if (/insights\.latest/.test(q)) return insights();
    if (/'daily'.*'meals'.*'items'/.test(q)) return { daily: DAILY, meals: MEALS, items: ITEMS };
    if (/pg_database_size/.test(q)) return tracker();
    return null;
  }
  function wrap(d) { return { payload: [{ d: d }], cache: { storedAt: Date.now() } }; }
  var mcp = {
    callTool: function (server, tool, input) {
      return new Promise(function (resolveP, rejectP) {
        setTimeout(function () {
          try {
            if (server === "Google Calendar") {
              return resolveP({ payload: { events: EVENTS.filter(function (e) { return e.on === TODAY; }).map(function (e) {
                return { id: e.id, summary: e.t, status: "confirmed", start: e.ad ? { date: e.on } : { dateTime: e.s.toISOString() }, end: e.ad ? { date: e.on } : { dateTime: e.e.toISOString() } }; }) } });
            }
            if (tool === "get_advisors") return resolveP({ payload: { lints: input.type === "security" ? [{ name: "rls_enabled_no_policy", title: "RLS Enabled No Policy", level: "INFO", detail: "Tables are closed to the public API.", metadata: { schema: "crm", name: "people" } }] : [] } });
            if (tool === "get_organization") return resolveP({ payload: { id: "demo", name: "Demo", plan: "free" } });
            if (tool === "list_edge_functions") return resolveP({ payload: [] });
            var q = input.query || "";
            if (/fitness\.session_log/.test(q)) return resolveP({ payload: IRON_DESC.map(function (s) { return { session_no: s.session_no, session_date: s.session_date, session_type: s.session_type, knee_status: s.knee_status, notes: s.notes, exercises: s.exercises }; }), cache: { storedAt: Date.now() } });
            var d = sql(q);
            if (d === null) return rejectP({ code: "tool_error", message: "Not available in the demo" });
            resolveP(wrap(d));
          } catch (e) { console.error(e); rejectP({ code: "tool_error", message: e.message }); }
        }, 60 + Math.random() * 120);
      });
    }
  };
  window.TapDemoMcp = mcp;
})();
