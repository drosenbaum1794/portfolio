/* Guided tour for the What's on Tap demo: a spotlight plus a short card per step. Starts on first visit. */
(function () {
  "use strict";
  var SEEN = "tapdemo-tour-seen";
  var STEPS = [
    { title: "Welcome! Want a quick tour?", body: "A personal CRM and life hub built with Claude. In the real version, calendar, email, LinkedIn, workouts, meals and Apple Health all flow into one Supabase database, and Claude keeps it current with scheduled tasks. Everything here is fictional data for a made-up person, Sam, so click around freely." },
    { view: "today", target: "#agenda", up: "article", title: "Today, already sorted", body: "Live events from Google Calendar. During a weekly sync Claude files each event into a category, tags who it's with, and tucks reminders and birthday notes out of the way." },
    { view: "today", target: "#promises", up: "article", title: "Promises you made", body: "Claude reads sent email and meeting agendas for things you said you'd do for someone, then surfaces them before they go stale. Try marking one done, or add your own." },
    { view: "today", target: "#trainBody", up: ".grid", title: "The rest of your day at a glance", body: "Quick reads from the other apps: days since your last workout and how today's eating is going." },
    { view: "calendar", target: "#v-calendar", title: "Two years of calendar, categorized", body: "Week, month and year views. Every event is color-coded by category, so you can see where your time actually goes, like how many dates or trips you had this quarter." },
    { view: "people", target: "#v-people .graph-wrap", title: "Your relationship graph", body: "Built from shared meetings, email threads and LinkedIn. Bigger dots mean more contact, color shows how recently you talked. Click a person or company to open their record and history." },
    { view: "people", target: "#v-people .seg", title: "Claude asks when it isn't sure", body: "Uncertain categories, possible duplicate people, new category ideas and birthdays wait in Review for a one-tap answer instead of a guess." },
    { view: "iron", target: "#v-iron", title: "The Way of Iron", body: "A strength log. Sessions are logged by chatting with Claude, and the hub charts progress per lift, training mix, consistency and how the knee is feeling." },
    { view: "food", target: "#v-food", title: "Food, logged from a photo", body: "Send Claude a photo or a list of what you ate and it estimates each component. Tap any entry to see what went into it and the basis for each estimate." },
    { view: "health", target: "#hlIns", up: "article", title: "Weekly patterns", body: "Every Sunday a scheduled task compares sleep, training, steps and food against your normal and writes what's holding up and what to keep an eye on. Patterns, not causes." },
    { view: "tracker", target: "#v-tracker", title: "Under the hood", body: "It all lives in one Supabase database. This tab watches its size, tables and security advisors so a free project doesn't quietly fill up." },
    { target: ".ctl", title: "That's the tour", body: "Hide sensitive masks private events and records for screen sharing. Reset puts the demo back the way it started. Take the tour again any time." }
  ];
  var CSS = ".tour-hole{position:fixed;z-index:1000;border-radius:12px;box-shadow:0 0 0 9999px rgba(10,12,18,.55);transition:all .25s ease;pointer-events:none}" +
    ".tour-card{position:fixed;z-index:1001;width:min(400px,calc(100vw - 32px));background:var(--surface);color:var(--ink);border:1px solid var(--line);border-radius:14px;padding:16px 18px;box-shadow:0 10px 32px rgba(0,0,0,.25);font-family:var(--body)}" +
    ".tour-card h4{font-family:var(--display);font-size:19px;margin:0 0 6px;line-height:1.2}.tour-card p{margin:0;font-size:14px;line-height:1.5;color:var(--ink-2)}" +
    ".tour-foot{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:14px}.tour-foot .n{font-family:var(--mono);font-size:12px;color:var(--ink-3)}.tour-foot{flex-wrap:wrap}.tour-foot div{display:flex;align-items:center;gap:8px}" +
    ".tour-block{position:fixed;inset:0;z-index:999}" +
    "@media(max-width:700px){.tour-card{left:16px!important;right:16px;width:auto;top:auto!important;bottom:max(16px,env(safe-area-inset-bottom))}}" +
    "@media(prefers-reduced-motion:reduce){.tour-hole{transition:none}}";
  var st = document.createElement("style"); st.textContent = CSS; document.head.appendChild(st);
  var i = 0, hole, card, block, target = null;
  function el(t, c, x) { var n = document.createElement(t); if (c) n.className = c; if (x != null) n.textContent = x; return n; }
  function find(s) { if (!s.target) return null; var n = document.querySelector(s.target); if (n && s.up) n = n.closest(s.up) || n; return n; }
  function place() {
    if (!card) return;
    var r = target ? target.getBoundingClientRect() : null, vw = innerWidth, vh = innerHeight;
    if (!r || r.width === 0) { hole.style.cssText = "left:50%;top:40%;width:0;height:0"; card.style.left = Math.max(16, (vw - card.offsetWidth) / 2) + "px"; card.style.top = Math.max(16, (vh - card.offsetHeight) / 2) + "px"; return; }
    var pad = 6, top = Math.max(r.top - pad, 4), h = Math.min(r.height + pad * 2, vh - top - 4);
    hole.style.cssText = "left:" + (r.left - pad) + "px;top:" + top + "px;width:" + (r.width + pad * 2) + "px;height:" + h + "px";
    var cw = card.offsetWidth, ch = card.offsetHeight, below = top + h + 12, above = top - ch - 12;
    if (below + ch < vh - 8 || above > 8) { card.style.left = Math.min(Math.max(16, r.left), vw - cw - 16) + "px"; card.style.top = (below + ch < vh - 8 ? below : above) + "px"; return; }
    // target fills the screen: sit beside it if there's room, else in the bottom corner
    if (r.right + cw + 28 < vw) { card.style.left = (r.right + 16) + "px"; card.style.top = Math.max(16, top) + "px"; return; }
    card.style.left = (vw - cw - 24) + "px"; card.style.top = (vh - ch - 24) + "px";
  }
  function show() {
    var s = STEPS[i];
    if (s.view && location.hash.slice(1) !== s.view) location.hash = s.view;
    card.textContent = "";
    card.appendChild(el("h4", null, s.title)); card.appendChild(el("p", null, s.body));
    // Step 0 is the question; every step after it can be skipped outright.
    var last = i === STEPS.length - 1, f = el("div", "tour-foot"), left = el("div"), b = el("div");
    if (i) left.appendChild(el("span", "n", i + " of " + (STEPS.length - 1)));
    if (i && !last) left.appendChild(btn("Skip tour", "ghost", stop));
    if (i === 0) b.appendChild(btn("No thanks", "ghost", stop)); else b.appendChild(btn("Back", "ghost", function () { i--; show(); }));
    b.appendChild(btn(last ? "Done" : i === 0 ? "Show me around" : "Next", "primary", function () { if (i === STEPS.length - 1) stop(); else { i++; show(); } }));
    f.appendChild(left); f.appendChild(b); card.appendChild(f);
    target = null; place();
    // let the view mount and lay out, then find and frame the target
    var tries = 0;
    (function look() {
      target = find(s);
      if (s.target && (!target || !target.getBoundingClientRect().height) && tries++ < 20) return setTimeout(look, 100);
      if (target) { var r = target.getBoundingClientRect(); if (r.top < 70 || r.bottom > innerHeight - 20) { window.scrollTo({ top: Math.max(0, scrollY + r.top - 110), behavior: "instant" }); } }
      place(); setTimeout(place, 300);
    })();
    card.querySelector(".primary").focus({ preventScroll: true });
  }
  function btn(t, cls, fn) { var b = el("button", "btn " + cls, t); b.type = "button"; b.addEventListener("click", fn); return b; }
  function start() {
    stop(); i = 0;
    block = el("div", "tour-block"); hole = el("div", "tour-hole"); card = el("div", "tour-card");
    card.setAttribute("role", "dialog"); card.setAttribute("aria-label", "Guided tour");
    document.body.appendChild(block); document.body.appendChild(hole); document.body.appendChild(card);
    show();
  }
  function stop() {
    [block, hole, card].forEach(function (n) { if (n && n.parentNode) n.parentNode.removeChild(n); });
    block = hole = card = target = null;
    try { localStorage.setItem(SEEN, "1"); } catch (e) {}
  }
  addEventListener("resize", place); addEventListener("scroll", place, { passive: true });
  addEventListener("keydown", function (e) { if (!card) return; if (e.key === "Escape") stop(); else if (e.key === "ArrowRight" && i < STEPS.length - 1) { i++; show(); } else if (e.key === "ArrowLeft" && i > 0) { i--; show(); } });
  window.TapTour = { start: start };
  var seen = false; try { seen = !!localStorage.getItem(SEEN); } catch (e) {}
  if (!seen && !/[?&]notour/.test(location.search)) setTimeout(start, 900);
})();
