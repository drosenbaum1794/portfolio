/* Food Log, mounted inside What's on Tap (ported from the standalone dashboard). */
(function () {
  "use strict";
  window.HubApps = window.HubApps || {};
  var CSS = ":host{display:block;color:var(--ink);font-family:var(--body);font-size:15px;line-height:1.5;\n  --font-anthropic-sans:var(--body);--font-anthropic-serif:var(--display);\n  --cds-gap-xs:4px;--cds-gap-sm:8px;--cds-gap-md:12px;--cds-gap-lg:16px;\n  --cds-pad-xs:4px;--cds-pad-sm:8px;--cds-pad-md:12px;--cds-pad-lg:16px;--cds-radius:12px;\n  --cds-font-size-title:28px;--cds-font-size-heading:19px;--cds-font-size-body:14px;--cds-font-size-caption:12px;--cds-font-weight-medium:600;\n  --color-fg:var(--ink);--color-fg-muted:var(--ink-3);--color-bg:var(--surface-2);--color-panel:var(--surface);--color-border-line:var(--line);--color-bad:var(--now);\n  --cds-surface-popover:var(--surface);--cds-border:var(--line);--cds-shadow-popover:0 4px 16px rgba(0,0,0,.14);--cds-text-secondary:var(--ink-3);\n  --cds-chart-grid:var(--grid);--cds-chart-reference:var(--ink-3);--cds-dur-slow:.3s}\n*,*::before,*::after{box-sizing:border-box}\nbutton,input{font:inherit;color:inherit}\n:focus-visible{outline:2px solid var(--accent);outline-offset:2px}\n[hidden]{display:none!important}\n.fl-head{display:flex;align-items:baseline;justify-content:space-between;gap:8px 16px;flex-wrap:wrap}\n.fl-head h2{font-family:var(--display);font-size:30px;font-weight:700;margin:0;letter-spacing:-.01em}\n.fl-sync{display:flex;align-items:center;gap:10px;font-family:var(--mono);font-size:12px;color:var(--ink-3)}\n.fl-btn{border:1px solid var(--line);background:var(--surface);color:var(--ink-2);border-radius:8px;padding:4px 10px;min-height:30px;cursor:pointer;font-size:12px;font-weight:500;font-family:var(--body)}\n.fl-btn:hover{color:var(--ink);border-color:var(--ink-3)}\n.fl-btn[disabled]{opacity:.5;cursor:default}\n.fl-notice{border:1px solid var(--line);border-left:3px solid var(--warn);background:var(--surface);padding:10px 14px;border-radius:8px;color:var(--ink-2);font-size:14px}\n.fl-hint{margin:-8px 0 0;font-size:13px;color:var(--ink-3)}\n\n.fl{font-family:var(--font-anthropic-sans);display:flex;flex-direction:column;gap:var(--cds-gap-lg)}\n.fl h1{display:none;font-family:var(--font-anthropic-serif);font-weight:400;font-size:var(--cds-font-size-title);margin:0}\n.fl-sub{color:var(--color-fg-muted);font-size:var(--cds-font-size-body);margin:var(--cds-gap-xs) 0 0}\n.fl-card{background:var(--color-panel);border:1px solid var(--color-border-line);border-radius:var(--cds-radius);padding:var(--cds-pad-lg)}\n.fl-card h2{font-family:var(--display);font-size:19px;font-weight:600;margin:0}\n.fl-card .note{font-size:var(--cds-font-size-caption);color:var(--color-fg-muted);margin:var(--cds-gap-xs) 0 var(--cds-gap-md)}\n.fl-today-head{display:flex;justify-content:space-between;align-items:baseline;gap:var(--cds-gap-sm);flex-wrap:wrap}\n.fl-today-head .day{font-family:var(--display);font-size:24px;font-weight:700}\n.fl-link{background:none;border:0;padding:0;color:var(--color-fg-muted);font:inherit;font-size:var(--cds-font-size-caption);cursor:pointer;text-decoration:underline}\n.fl-tiles{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,7.5rem),1fr));gap:var(--cds-gap-sm);margin:var(--cds-gap-md) 0}\n.fl-tile{border:0;border-radius:var(--cds-radius);padding:var(--cds-pad-sm) var(--cds-pad-md);background:var(--color-bg)}\n.fl-tile .lab{font-family:var(--mono);font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-3)}\n.fl-tile .val{font-family:var(--display);font-weight:700;font-size:26px;font-variant-numeric:tabular-nums;line-height:1.2;margin-top:2px}\n.fl-tile .unit{font-size:var(--cds-font-size-caption);color:var(--color-fg-muted)}\n.fl-macro{margin:var(--cds-gap-sm) 0 var(--cds-gap-md)}\n.fl-macro .bar{display:flex;height:10px;border-radius:5px;overflow:hidden;background:var(--color-border-line)}\n.fl-macro .bar span{display:block;height:100%}\n.fl-macro .keys{display:flex;flex-wrap:wrap;gap:var(--cds-gap-md);font-size:var(--cds-font-size-caption);color:var(--color-fg-muted);margin-top:6px}\n.fl-macro .keys i{display:inline-block;width:8px;height:8px;border-radius:2px;margin-right:4px}\n.fl-empty-note{color:var(--color-fg-muted);font-size:var(--cds-font-size-body);padding:var(--cds-pad-md) 0}\n.fl-tabs{display:flex;gap:var(--cds-gap-xs);border-bottom:1px solid var(--color-border-line)}\n.fl-tabs button{background:none;border:0;border-bottom:2px solid transparent;padding:var(--cds-pad-sm) var(--cds-pad-md);font:inherit;font-size:var(--cds-font-size-body);color:var(--color-fg-muted);cursor:pointer;margin-bottom:-1px}\n.fl-tabs button{font-weight:600}.fl-tabs button[aria-selected=true]{color:var(--color-fg);border-bottom-color:var(--accent)}\n.fl-page{display:flex;flex-direction:column;gap:var(--cds-gap-md)}\n.fl-page[hidden]{display:none}\n.fl-nav{display:flex;align-items:center;gap:var(--cds-gap-sm);flex-wrap:wrap}\n.fl-nav button{min-height:34px;min-width:34px;background:var(--color-panel);border:1px solid var(--color-border-line);border-radius:var(--cds-radius);padding:4px 12px;font:inherit;color:var(--color-fg);cursor:pointer}\n.fl-nav button:disabled{opacity:.4;cursor:default}\n.fl-nav .lbl{font-family:var(--display);font-size:19px;font-weight:600;min-width:10rem;text-align:center}\n.fl-nav input{min-height:34px;font-size:16px;background:var(--color-panel);border:1px solid var(--color-border-line);border-radius:var(--cds-radius);padding:3px 8px;font:inherit;color:var(--color-fg)}\n.fl-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,22rem),1fr));gap:var(--cds-gap-md)}\n.fl-chart{position:relative;min-height:240px}\n.fl-chart.short{min-height:200px}\n.fl-legend{display:flex;flex-wrap:wrap;gap:var(--cds-gap-sm);font-size:var(--cds-font-size-caption);color:var(--color-fg-muted);margin-bottom:var(--cds-gap-sm)}\n.fl-legend span{display:inline-flex;align-items:center;gap:4px}\n.fl-legend i{width:10px;height:10px;border-radius:2px;display:inline-block}\n.fl-tip{position:absolute;pointer-events:none;background:var(--cds-surface-popover);border:1px solid var(--cds-border);border-radius:var(--cds-radius);box-shadow:var(--cds-shadow-popover);padding:var(--cds-pad-xs) var(--cds-pad-sm);font-size:var(--cds-font-size-caption);display:none;white-space:nowrap;z-index:2}\n.fl-tip .d{color:var(--cds-text-secondary)}\n.fl-tablebox{max-height:420px;overflow:auto}\n.fl-table{width:100%;border-collapse:collapse;font-size:13px;font-variant-numeric:tabular-nums}\n.fl-table th{position:sticky;top:0;background:var(--color-panel);text-align:left;font-family:var(--mono);font-size:11px;letter-spacing:.05em;text-transform:uppercase;font-weight:500;color:var(--color-fg-muted);padding:6px 8px;border-bottom:1px solid var(--color-border-line);white-space:nowrap}\n.fl-table td{padding:6px 8px;border-bottom:1px solid var(--color-border-line);vertical-align:top}\n.fl-table .n{text-align:right;white-space:nowrap}\n.fl-table tr.first td{border-top:1px solid var(--color-fg-muted)}\n.fl-table td.rep{color:transparent}\n.fl-table tr.click{cursor:pointer}\n.fl-table tr.click:hover td{background:var(--color-bg)}\n.fl-table tfoot td{font-weight:var(--cds-font-weight-medium);border-bottom:0}\n.fl-fail{display:flex;align-items:center;justify-content:center;gap:6px;min-height:200px;color:var(--color-fg-muted);font-size:var(--cds-font-size-caption);text-align:center}\n.fl-fail i{width:.375rem;height:.375rem;border-radius:50%;background:var(--color-bad)}\n.fl-modal{font-family:var(--font-anthropic-sans);color:var(--color-fg);background:var(--color-panel);border:1px solid var(--color-border-line);border-radius:var(--cds-radius);padding:var(--cds-pad-lg);width:min(760px,calc(100vw - 32px));max-height:85vh;overflow:auto;box-shadow:var(--cds-shadow-popover)}\n.fl-modal::backdrop{background:rgba(0,0,0,.45)}\n.fl-modal-head{display:flex;justify-content:space-between;align-items:flex-start;gap:var(--cds-gap-md)}\n.fl-modal h2{font-family:var(--display);font-weight:700;font-size:24px;margin:2px 0 0}\n.fl-x{background:none;border:1px solid var(--color-border-line);border-radius:var(--cds-radius);color:var(--color-fg);font:inherit;font-size:1.25rem;line-height:1;width:2rem;height:2rem;cursor:pointer;flex:none}\n.fl-mnote{font-size:var(--cds-font-size-caption);color:var(--color-fg-muted);margin:var(--cds-gap-md) 0 0}\n.fl-modal .fl-table td.basis{color:var(--color-fg-muted)}\n.fl-table tr.click td:nth-child(2)::after{content:\"  \u203a\";color:var(--color-fg-muted);white-space:pre}\n@media (max-width:640px){.fl-table .hide{display:none}}\n";
  var HTML = "<div class=\"fl\">\n  <div class=\"fl-head\">\n    <h2>Food</h2>\n  </div>\n  <div class=\"fl-notice\" id=\"fl-notice\" hidden></div>\n  <p class=\"fl-hint\">Log a meal by sending Claude a photo or a list of what you ate. It shows up here after the next refresh.</p>\n  <dialog class=\"fl-modal\" id=\"fl-modal\" aria-labelledby=\"m-title\">\n    <div class=\"fl-modal-head\">\n      <div>\n        <div class=\"fl-sub\" id=\"m-meta\" data-source=\"meals\">\u2014</div>\n        <h2 id=\"m-title\">\u2014</h2>\n      </div>\n      <button type=\"button\" class=\"fl-x\" id=\"m-close\" aria-label=\"Close\">\u00d7</button>\n    </div>\n    <div class=\"fl-tiles\" id=\"m-tiles\" data-source=\"meals\"></div>\n    <div class=\"fl-sub\" style=\"margin:0 0 var(--cds-gap-sm)\">What went into it</div>\n    <div class=\"fl-tablebox\">\n      <table class=\"fl-table\" id=\"m-items\" data-source=\"items\" data-row-key=\"id\">\n        <thead><tr>\n          <th data-field=\"name\">Component</th>\n          <th data-field=\"quantity\" class=\"n\">Qty</th>\n          <th data-field=\"unit\">Unit</th>\n          <th data-field=\"calories\" class=\"n\">kcal</th>\n          <th data-field=\"protein_g\" class=\"n\">P</th>\n          <th data-field=\"carbs_g\" class=\"n\">C</th>\n          <th data-field=\"fat_g\" class=\"n\">F</th>\n          <th data-field=\"fiber_g\" class=\"n hide\">Fiber</th>\n          <th data-field=\"sodium_mg\" class=\"n hide\">Na mg</th>\n          <th data-field=\"basis\" class=\"hide\">Basis</th>\n        </tr></thead>\n        <tbody></tbody>\n      </table>\n    </div>\n    <p class=\"fl-mnote\" id=\"m-notes\">\u2014</p>\n  </dialog>\n  <section class=\"fl-card\" id=\"today\">\n    <div class=\"fl-today-head\">\n      <div><div class=\"fl-sub\" style=\"margin:0\">Today</div><div class=\"day\" id=\"today-date\">\u2014</div></div>\n      <button class=\"fl-link\" id=\"today-more\" type=\"button\">Full breakdown</button>\n    </div>\n    <p class=\"note\" id=\"today-note\" data-source=\"daily\">\u2014</p>\n    <div class=\"fl-tiles\" id=\"today-tiles\" data-source=\"daily\"></div>\n    <div class=\"fl-macro\" id=\"today-macro\" data-source=\"macro_split\"></div>\n    <div class=\"fl-tablebox\">\n      <table class=\"fl-table\" id=\"today-table\" data-source=\"meals\" data-row-key=\"id\">\n        <thead><tr>\n          <th data-field=\"time_local\">Time</th>\n          <th data-field=\"title\">Entry</th>\n          <th data-field=\"item_count\" class=\"n hide\">Parts</th>\n          <th data-field=\"calories\" class=\"n\">kcal</th>\n          <th data-field=\"protein_g\" class=\"n\">P</th>\n          <th data-field=\"carbs_g\" class=\"n hide\">C</th>\n          <th data-field=\"fat_g\" class=\"n hide\">F</th>\n          <th data-field=\"confidence\" class=\"hide\">Confidence</th>\n        </tr></thead>\n        <tbody></tbody>\n      </table>\n    </div>\n  </section>\n\n  <div class=\"fl-tabs\" role=\"tablist\">\n    <button role=\"tab\" id=\"tab-day\" aria-selected=\"true\" data-tab=\"day\" type=\"button\">Day</button>\n    <button role=\"tab\" id=\"tab-week\" aria-selected=\"false\" data-tab=\"week\" type=\"button\">Week</button>\n    <button role=\"tab\" id=\"tab-all\" aria-selected=\"false\" data-tab=\"all\" type=\"button\">All time</button>\n  </div>\n\n  <!-- DAY -->\n  <section class=\"fl-page\" id=\"day\" data-page=\"day\">\n    <div class=\"fl-nav\">\n      <button type=\"button\" id=\"day-prev\" aria-label=\"Previous day\">\u2039</button>\n      <div class=\"lbl\" id=\"day-label\">\u2014</div>\n      <button type=\"button\" id=\"day-next\" aria-label=\"Next day\">\u203a</button>\n      <input type=\"date\" id=\"day-pick\" min=\"2026-01-01\" max=\"2099-12-31\" aria-label=\"Pick a day\">\n    </div>\n    <div class=\"fl-card\" id=\"day-card\">\n      <h2 id=\"day-title\">Day totals</h2>\n      <p class=\"note\" id=\"day-note\" data-source=\"daily\">\u2014</p>\n      <div class=\"fl-tiles\" id=\"day-tiles\" data-source=\"daily\"></div>\n      <div class=\"fl-macro\" id=\"day-macro\" data-source=\"macro_split\"></div>\n    </div>\n    <div class=\"fl-card\" id=\"day-items-card\">\n      <h2>Everything eaten</h2>\n      <p class=\"note\">Each entry in the order eaten. Tap one to see what went into it.</p>\n      <div class=\"fl-tablebox\">\n        <table class=\"fl-table\" id=\"day-items\" data-source=\"meals\" data-row-key=\"id\">\n          <thead><tr>\n          <th data-field=\"time_local\">Time</th>\n          <th data-field=\"title\">Entry</th>\n          <th data-field=\"item_count\" class=\"n hide\">Parts</th>\n          <th data-field=\"calories\" class=\"n\">kcal</th>\n          <th data-field=\"protein_g\" class=\"n\">P</th>\n          <th data-field=\"carbs_g\" class=\"n hide\">C</th>\n          <th data-field=\"fat_g\" class=\"n hide\">F</th>\n          <th data-field=\"confidence\" class=\"hide\">Confidence</th>\n          </tr></thead>\n          <tbody></tbody>\n        </table>\n      </div>\n    </div>\n  </section>\n\n  <!-- WEEK -->\n  <section class=\"fl-page\" id=\"week\" data-page=\"week\" hidden>\n    <div class=\"fl-nav\">\n      <button type=\"button\" id=\"week-prev\" aria-label=\"Previous 7 days\">\u2039</button>\n      <div class=\"lbl\" id=\"week-label\">\u2014</div>\n      <button type=\"button\" id=\"week-next\" aria-label=\"Next 7 days\">\u203a</button>\n    </div>\n    <div class=\"fl-card\" id=\"week-card\">\n      <h2>7-day summary</h2>\n      <p class=\"note\" id=\"week-note\" data-source=\"daily\">\u2014</p>\n      <div class=\"fl-tiles\" id=\"week-tiles\" data-source=\"daily\"></div>\n    </div>\n    <div class=\"fl-card\" id=\"week-chart-card\">\n      <h2>Calories each day</h2>\n      <p class=\"note\">Tap a day to drill into it. Dashed line is the daily average across these 7 days.</p>\n      <div class=\"fl-chart short\" id=\"week-chart\" data-source=\"daily\"></div>\n    </div>\n    <div class=\"fl-card\" id=\"week-table-card\">\n      <h2>Day by day</h2>\n      <p class=\"note\">Logged days in these 7 days. Tap a row to open that day.</p>\n      <div class=\"fl-tablebox\">\n        <table class=\"fl-table\" id=\"week-table\" data-source=\"daily\" data-row-key=\"day\">\n          <thead><tr>\n            <th data-field=\"day\">Day</th>\n            <th data-field=\"meals\" class=\"n hide\">Meals</th>\n            <th data-field=\"calories\" class=\"n\">kcal</th>\n            <th data-field=\"protein_g\" class=\"n\">P</th>\n            <th data-field=\"carbs_g\" class=\"n\">C</th>\n            <th data-field=\"fat_g\" class=\"n\">F</th>\n            <th data-field=\"fiber_g\" class=\"n hide\">Fiber</th>\n            <th data-field=\"sodium_mg\" class=\"n hide\">Na mg</th>\n          </tr></thead>\n          <tbody></tbody>\n        </table>\n      </div>\n    </div>\n  </section>\n\n  <!-- ALL TIME -->\n  <section class=\"fl-page\" id=\"all\" data-page=\"all\" hidden>\n    <div class=\"fl-card\" id=\"all-card\">\n      <h2>All-time averages</h2>\n      <p class=\"note\" id=\"take\" data-source=\"summary\">\u2014</p>\n      <div class=\"fl-tiles\" id=\"all-tiles\" data-source=\"summary\"></div>\n    </div>\n    <div class=\"fl-grid\">\n      <div class=\"fl-card\" id=\"calories-card\">\n        <h2>Calories by day</h2>\n        <p class=\"note\">Stacked by meal type. Dashed line is your overall average.</p>\n        <div class=\"fl-legend\" id=\"leg-meal\"></div>\n        <div class=\"fl-chart\" id=\"chart-cal\" data-source=\"by_meal_type\"></div>\n      </div>\n      <div class=\"fl-card\" id=\"macro-card\">\n        <h2>Macro split</h2>\n        <p class=\"note\">Share of each day's calories from protein, carbs and fat.</p>\n        <div class=\"fl-legend\" id=\"leg-macro\"></div>\n        <div class=\"fl-chart\" id=\"chart-macro\" data-source=\"macro_split\"></div>\n      </div>\n    </div>\n    <div class=\"fl-grid\">\n      <div class=\"fl-card\" id=\"window-card\">\n        <h2>Eating window</h2>\n        <p class=\"note\">When the first and last thing was eaten each day.</p>\n        <div class=\"fl-chart\" id=\"chart-window\" data-source=\"daily\"></div>\n      </div>\n      <div class=\"fl-card\" id=\"hunger-card\">\n        <h2>Hunger and fullness by meal type</h2>\n        <p class=\"note\">Average 1 to 5 rating. Hunger before eating, fullness after.</p>\n        <div class=\"fl-legend\" id=\"leg-hunger\"></div>\n        <div class=\"fl-chart\" id=\"chart-hunger\" data-source=\"hunger_by_type\"></div>\n      </div>\n    </div>\n  </section>\n</div>";
  var api = {
    mount: function (host, ctx) {

  var Hub = ctx.hub, store = Hub.store;
  var root = host.attachShadow({ mode: "open" });
  root.innerHTML = "<style>" + CSS + "</style>" + HTML;
  (function () { var c = document.createElement("div"); c.className = "fl-card"; c.innerHTML = '<h2>Patterns</h2><p class="note">How eating lines up with your sleep and movement. Updated Sundays.</p><div id="foodIns"></div>'; root.getElementById("all-card").after(c); Hub.insights(c.querySelector("#foodIns"), "food"); })();
  var D = {
    getElementById: function (id) { return root.getElementById(id); },
    querySelectorAll: function (s) { return root.querySelectorAll(s); },
    createElement: function (t) { return document.createElement(t); },
    createTextNode: function (t) { return document.createTextNode(t); },
    get activeElement() { return root.activeElement; }
  };
  var Q = {
    daily: "select coalesce(json_agg(r order by r.day), '[]') from (select day::text as day, meals, round(calories) as calories, round(protein_g) as protein_g, round(carbs_g) as carbs_g, round(fat_g) as fat_g, round(fiber_g) as fiber_g, round(sodium_mg) as sodium_mg, first_bite::text as first_bite, last_bite::text as last_bite, avg_hunger, avg_fullness from food.daily_totals) r",
    meals: "select coalesce(json_agg(r order by r.eaten_at, r.id), '[]') from (select t.id, t.day::text as day, t.eaten_at::text as eaten_at, to_char(t.eaten_at at time zone 'America/New_York', 'FMHH12:MI AM') as time_local, t.meal_type, t.title, t.where_eaten, t.hunger_before, t.fullness_after, t.confidence, t.item_count, round(t.calories) as calories, round(t.protein_g) as protein_g, round(t.carbs_g) as carbs_g, round(t.fat_g) as fat_g, round(t.fiber_g) as fiber_g, round(t.sodium_mg) as sodium_mg, m.notes from food.meal_totals t join food.meals m on m.id = t.id) r",
    items: "select coalesce(json_agg(r order by r.k, r.meal_id, r.position), '[]') from (select i.id, m.eaten_at as k, (m.eaten_at at time zone 'America/New_York')::date::text as day, i.meal_id, m.title as meal_title, m.meal_type, to_char(m.eaten_at at time zone 'America/New_York', 'FMHH12:MI AM') as time_local, i.position, i.name, i.quantity, i.unit, round(i.calories) as calories, round(i.protein_g) as protein_g, round(i.carbs_g) as carbs_g, round(i.fat_g) as fat_g, round(i.fiber_g) as fiber_g, round(i.sodium_mg) as sodium_mg, i.basis from food.items i join food.meals m on m.id = i.meal_id) r"
  };
  var NUM = ["id", "meal_id", "item_count", "position", "quantity", "meals", "calories", "protein_g", "carbs_g", "fat_g", "fiber_g", "sodium_mg", "avg_hunger", "avg_fullness", "hunger_before", "fullness_after"];
  var DS = { daily: { status: "loading", data: [] }, meals: { status: "loading", data: [] }, items: { status: "loading", data: [] } };
  var calcs = {}, memo = {}, fns = [], busy = false, synced = null;
  var dash = {
    loader: function () {},
    calc: function (id, spec) { calcs[id] = spec; },
    data: function (id) {
      if (DS[id]) return DS[id];
      var c = calcs[id]; if (!c) return { status: "missing", data: [] };
      var ins = c.inputs.map(dash.data), bad = ins.filter(function (x) { return x.status !== "ok"; })[0];
      if (bad) return { status: bad.status, data: [], message: bad.message };
      if (!memo[id]) memo[id] = { status: "ok", data: c.fn.apply(null, ins.map(function (x) { return x.data; })) };
      return memo[id];
    },
    onData: function (fn) { fns.push(fn); fn(); },
    refresh: function () { load(true); },
    setLink: function () {}
  };
  Object.defineProperty(dash, "colors", { get: function () {
    var cs = getComputedStyle(document.documentElement);
    return [1, 2, 3, 4, 5, 6, 7, 8].map(function (i) { return cs.getPropertyValue("--c" + i).trim() || "#888"; });
  } });
  function redraw() { fns.forEach(function (fn) { try { fn(); } catch (e) { console.error(e); } }); }
  function syncLine() {}
  function num(rows) { return rows.map(function (r) { var o = {}; for (var k in r) o[k] = r[k]; NUM.forEach(function (k) { if (o[k] != null && o[k] !== "") o[k] = Number(o[k]); }); return o; }); }
  function load(fresh) {
    busy = true;
    var q = "select json_build_object('daily', (" + Q.daily + "), 'meals', (" + Q.meals + "), 'items', (" + Q.items + ")) as d";
    return Hub.sql(q, false, fresh).then(function (d) {
      ["daily", "meals", "items"].forEach(function (k) { DS[k] = { status: "ok", data: num((d && d[k]) || []) }; });
      memo = {}; synced = Date.now(); root.getElementById("fl-notice").hidden = true;
    }, function (e) {
      ["daily", "meals", "items"].forEach(function (k) { if (DS[k].status !== "ok") DS[k] = { status: "error", data: [], message: e && e.message }; });
      var n = root.getElementById("fl-notice"); n.textContent = Hub.errText(e, "Supabase"); n.hidden = false;
    }).then(function () { busy = false; redraw(); });
  }
  Hub.on("refresh", function () { load(true); });
  var rz, lastW = host.clientWidth;
  window.addEventListener("resize", function () { clearTimeout(rz); rz = setTimeout(function () { if (host.clientWidth && host.clientWidth !== lastW) { lastW = host.clientWidth; redraw(); } }, 150); });
  api.redraw = function () { lastW = host.clientWidth; redraw(); };
  api.open = function (arg) { if (arg && arg.day && api.openDay) api.openDay(arg.day); };

      (function (document, location) {

dash.loader('daily', {
  description: 'Supabase wraps the SQL result as text around a JSON array; this pulls out the rows and turns numeric columns into numbers.',
  fn: ({ answer }) => {
    const text = typeof answer === 'string' ? answer : (answer && typeof answer.result === 'string' ? answer.result : JSON.stringify(answer));
    const m = text.match(/<untrusted-data-([\w-]+)>\s*(\[[\s\S]*?\])\s*<\/untrusted-data-\1>/);
    if (!m) throw new Error(text.slice(0, 300));
    const numeric = ['meals','calories','protein_g','carbs_g','fat_g','fiber_g','sodium_mg','avg_hunger','avg_fullness'];
    return JSON.parse(m[2]).map(r => { const o = {...r}; numeric.forEach(k => { if (o[k] != null && o[k] !== '') o[k] = Number(o[k]); }); return o; });
  }
});
dash.loader('meals', {
  description: 'Supabase wraps the SQL result as text around a JSON array; this pulls out the rows and turns numeric columns into numbers.',
  fn: ({ answer }) => {
    const text = typeof answer === 'string' ? answer : (answer && typeof answer.result === 'string' ? answer.result : JSON.stringify(answer));
    const m = text.match(/<untrusted-data-([\w-]+)>\s*(\[[\s\S]*?\])\s*<\/untrusted-data-\1>/);
    if (!m) throw new Error(text.slice(0, 300));
    const numeric = ['id','item_count','hunger_before','fullness_after','calories','protein_g','carbs_g','fat_g','fiber_g','sodium_mg'];
    return JSON.parse(m[2]).map(r => { const o = {...r}; numeric.forEach(k => { if (o[k] != null && o[k] !== '') o[k] = Number(o[k]); }); return o; });
  }
});
dash.loader('items', {
  description: 'Supabase wraps the SQL result as text around a JSON array; this pulls out the rows and turns numeric columns into numbers.',
  fn: ({ answer }) => {
    const text = typeof answer === 'string' ? answer : (answer && typeof answer.result === 'string' ? answer.result : JSON.stringify(answer));
    const m = text.match(/<untrusted-data-([\w-]+)>\s*(\[[\s\S]*?\])\s*<\/untrusted-data-\1>/);
    if (!m) throw new Error(text.slice(0, 300));
    const numeric = ['id','meal_id','position','quantity','calories','protein_g','carbs_g','fat_g','fiber_g','sodium_mg'];
    return JSON.parse(m[2]).map(r => { const o = {...r}; numeric.forEach(k => { if (o[k] != null && o[k] !== '') o[k] = Number(o[k]); }); return o; });
  }
});

const toMin = t => { const [h, m] = String(t).split(':').map(Number); return h * 60 + m; };

dash.calc('summary', {
  title: 'All-time averages',
  description: 'Averages across all logged days.',
  inputs: ['daily'],
  fn: (daily) => {
    const d = daily.map(r => ({cal: Number(r.calories), p: Number(r.protein_g), fib: Number(r.fiber_g), meals: Number(r.meals), win: (toMin(r.last_bite) - toMin(r.first_bite)) / 60}));
    const avg = k => d.reduce((s, r) => s + r[k], 0) / d.length;
    return [{days: d.length, avg_calories: Math.round(avg('cal')), avg_protein: Math.round(avg('p')), avg_fiber: Math.round(avg('fib')),
      meals_per_day: Math.round(avg('meals') * 10) / 10, avg_window_h: Math.round(avg('win') * 10) / 10}];
  }
});

dash.calc('by_meal_type', {
  title: 'Calories by day and meal type',
  description: 'Sum of meal calories per day, split by meal type.',
  inputs: ['meals'],
  fn: (meals) => {
    const m = new Map();
    meals.forEach(r => { const k = r.day + '|' + r.meal_type; m.set(k, (m.get(k) || 0) + Number(r.calories)); });
    return [...m].map(([k, v]) => { const [day, meal_type] = k.split('|'); return {day, meal_type, calories: v}; });
  }
});

dash.calc('macro_split', {
  title: 'Macro share of calories',
  description: 'Protein and carbs at 4 kcal/g, fat at 9 kcal/g, as a share of their sum, per day.',
  inputs: ['daily'],
  fn: (daily) => daily.map(r => {
    const p = Number(r.protein_g) * 4, c = Number(r.carbs_g) * 4, f = Number(r.fat_g) * 9, t = p + c + f;
    const r3 = x => Math.round(x * 1000) / 1000;
    return {day: r.day, protein: t ? r3(p / t) : 0, carbs: t ? r3(c / t) : 0, fat: t ? r3(f / t) : 0};
  })
});

dash.calc('hunger_by_type', {
  title: 'Hunger and fullness by meal type',
  description: 'Average hunger-before and fullness-after rating for each meal type, skipping meals with no rating.',
  inputs: ['meals'],
  fn: (meals) => {
    const g = new Map();
    meals.forEach(r => {
      const a = g.get(r.meal_type) || {hn: 0, h: 0, fn: 0, f: 0};
      if (r.hunger_before != null) { a.hn++; a.h += Number(r.hunger_before); }
      if (r.fullness_after != null) { a.fn++; a.f += Number(r.fullness_after); }
      g.set(r.meal_type, a);
    });
    return [...g].filter(([, a]) => a.hn || a.fn).map(([meal_type, a]) => ({meal_type, hunger: a.hn ? Math.round(a.h / a.hn * 10) / 10 : null, fullness: a.fn ? Math.round(a.f / a.fn * 10) / 10 : null}));
  }
});

/* ---------- helpers ---------- */
const ORDER = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Drink'];
const fmt = d3.format(',');
const pct = d3.format('.0%');
const parseDay = s => new Date(String(s).slice(0, 10) + 'T00:00:00Z');
const isoDay = d => d.toISOString().slice(0, 10);
const dayFmt = d3.utcFormat('%b %-d');
const longDay = d3.utcFormat('%A, %b %-d');
const shortDow = d3.utcFormat('%a %-d');
const todayET = () => new Intl.DateTimeFormat('en-CA', {timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit'}).format(new Date());
const addDays = (s, n) => { const d = parseDay(s); d.setUTCDate(d.getUTCDate() + n); return isoDay(d); };
const enc = v => encodeURIComponent(String(v));
const MACRO = [['protein', 'Protein'], ['carbs', 'Carbs'], ['fat', 'Fat']];
const mcol = () => [dash.colors[0], dash.colors[2], dash.colors[4]];

const state = {tab: 'day', day: todayET(), weekEnd: todayET()};

function el(tag, cls, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }

// tile grid: specs = [[label, field, unit, formatter]]
function tiles(box, source, whereKey, whereVal, row, specs) {
  box.replaceChildren();
  specs.forEach(([label, field, unit]) => {
    const t = el('div', 'fl-tile');
    t.append(el('div', 'lab', label));
    const v = el('div', 'val');
    v.setAttribute('data-source', source);
    if (row && row[field] != null) {
      v.setAttribute('data-field', field);
      v.setAttribute('data-where', `${whereKey}=${enc(whereVal)}`);
      v.textContent = fmt(row[field]);
      if (unit) { v.append(' '); v.append(el('span', 'unit', unit)); }
    } else v.textContent = '—';
    t.append(v);
    box.append(t);
  });
}
function macroBar(box, row) {
  box.replaceChildren();
  if (!row) return;
  const bar = el('div', 'bar'), keys = el('div', 'keys'), c = mcol();
  MACRO.forEach(([k, name], i) => {
    const s = el('span'); s.style.width = (row[k] * 100) + '%'; s.style.background = c[i]; bar.append(s);
    const kk = el('span'); const sw = el('i'); sw.style.background = c[i]; kk.append(sw);
    const v = el('span', null, `${name} ${pct(row[k])}`);
    v.setAttribute('data-source', 'macro_split'); v.setAttribute('data-field', k); v.setAttribute('data-where', `day=${enc(row.day)}`);
    kk.append(v); keys.append(kk);
  });
  box.append(bar, keys);
}
function fillTable(tbl, rows, cols, opts = {}) {
  const tb = tbl.querySelector('tbody'); tb.replaceChildren();
  const ths = [...tbl.querySelectorAll('thead th')];
  let prevGroup = null;
  rows.forEach(r => {
    const tr = el('tr');
    tr.dataset.key = r[opts.key];
    const group = opts.group ? r[opts.group] : null;
    if (opts.group && group !== prevGroup && prevGroup !== null) tr.classList.add('first');
    cols.forEach((c, i) => {
      const td = el('td');
      const v = r[c];
      td.textContent = opts.show && opts.show[c] ? opts.show[c](v, r) : (typeof v === 'number' ? fmt(v) : (v ?? ''));
      ths[i].classList.forEach(k => { if (k === 'n' || k === 'hide') td.classList.add(k); });
      if (opts.repeat && opts.repeat.includes(c) && group === prevGroup) td.classList.add('rep');
      tr.append(td);
    });
    if (opts.onClick) { tr.classList.add('click'); tr.addEventListener('click', () => opts.onClick(r)); }
    tb.append(tr);
    prevGroup = group;
  });
}
function fail(box) {
  box.replaceChildren();
  const d = el('div', 'fl-fail'); d.append(el('i')); d.append(document.createTextNode('Failed to load')); box.append(d);
}
function legend(box, items) {
  box.replaceChildren();
  items.forEach(([name, color]) => { const s = el('span'); const i = el('i'); i.style.background = color; s.append(i, document.createTextNode(name)); box.append(s); });
}
function tip(box) { let t = box.querySelector('.fl-tip'); if (!t) { t = el('div', 'fl-tip'); box.append(t); } return t; }
function showTip(t, box, evt, head, lines) {
  t.replaceChildren(); t.append(el('div', 'd', head));
  lines.forEach(([color, name, val]) => {
    const r = el('div');
    if (color) { const i = el('i'); i.style.cssText = `display:inline-block;width:8px;height:8px;border-radius:2px;margin-right:4px;background:${color}`; r.append(i); }
    r.append(document.createTextNode(`${name}: ${val}`)); t.append(r);
  });
  t.style.display = 'block';
  const b = box.getBoundingClientRect();
  let x = evt.clientX - b.left + 12; const y = evt.clientY - b.top - 10;
  if (x + t.offsetWidth > b.width) x = evt.clientX - b.left - t.offsetWidth - 12;
  t.style.left = Math.max(0, x) + 'px'; t.style.top = Math.max(0, y) + 'px';
}
function axisStyle(g) {
  g.attr('font-size', null).attr('font-family', null);
  g.selectAll('text').attr('fill', 'var(--color-fg-muted)').style('font-size', 'var(--cds-font-size-caption)');
  g.selectAll('line').attr('stroke', 'var(--cds-chart-grid)');
  g.select('.domain').remove();
}
function leftMargin(svg, y, ticks, f) {
  const g = svg.append('g').call(d3.axisLeft(y).ticks(ticks).tickFormat(f).tickSize(0)); axisStyle(g);
  const w = d3.max(g.selectAll('text').nodes(), n => n.getComputedTextLength()) || 20; g.remove(); return w + 10;
}
function drawStacked(box, days, keys, colors, getVal, opts) {
  box.querySelectorAll('svg').forEach(s => s.remove());
  const W = Math.max(280, box.clientWidth), H = 240;
  const series = d3.stack().keys(keys).value((d, k) => getVal(d, k) || 0)(days);
  const ymax = opts.ymax || d3.max(series.at(-1), d => d[1]) || 1;
  const y = d3.scaleLinear([0, ymax], [H - 22, 6]).nice();
  const svg = d3.select(box).append('svg').attr('width', '100%').attr('viewBox', `0 0 ${W} ${H}`);
  const left = leftMargin(svg, y, 4, opts.yfmt);
  const x = d3.scaleBand(days, [left, W - 4]).padding(0.25);
  svg.append('g').attr('transform', `translate(${left},0)`).call(d3.axisLeft(y).ticks(4).tickFormat(opts.yfmt).tickSize(-(W - left - 4)).tickPadding(6)).call(axisStyle);
  const every = Math.ceil(days.length / Math.max(2, Math.floor((W - left) / 52)));
  svg.append('g').attr('transform', `translate(0,${H - 22})`).call(d3.axisBottom(x).tickValues(days.filter((d, i) => i % every === 0)).tickFormat(d => dayFmt(parseDay(d))).tickSize(0).tickPadding(8)).call(axisStyle);
  const bw = Math.min(32, x.bandwidth()), off = (x.bandwidth() - bw) / 2;
  series.forEach((s, i) => {
    svg.append('g').selectAll('rect').data(s).join('rect')
      .attr('x', d => x(d.data) + off).attr('width', bw)
      .attr('y', d => y(d[1])).attr('height', d => Math.max(0, y(d[0]) - y(d[1]))).attr('fill', colors[i]);
  });
  const t = tip(box);
  svg.append('g').selectAll('rect').data(days).join('rect').attr('x', d => x(d)).attr('width', x.bandwidth()).attr('y', 0).attr('height', H - 22).attr('fill', 'transparent')
    .on('mousemove', (e, d) => showTip(t, box, e, dayFmt(parseDay(d)), opts.lines(d)))
    .on('mouseleave', () => { t.style.display = 'none'; });
  return {svg, y, left, W};
}

/* ---------- navigation ---------- */
function setTab(tab) {
  state.tab = tab; store('food-tab', tab);
  document.querySelectorAll('.fl-tabs button').forEach(b => b.setAttribute('aria-selected', String(b.dataset.tab === tab)));
  document.querySelectorAll('.fl-page').forEach(p => { p.hidden = p.dataset.page !== tab; });
  
  render();
}
function openDay(day) { state.day = day; setTab('day'); }
document.querySelectorAll('.fl-tabs button').forEach(b => b.addEventListener('click', () => setTab(b.dataset.tab)));
document.getElementById('today-more').addEventListener('click', () => openDay(todayET()));
document.getElementById('day-prev').addEventListener('click', () => { state.day = addDays(state.day, -1); render(); });
document.getElementById('day-next').addEventListener('click', () => { state.day = addDays(state.day, 1); render(); });
const pick = document.getElementById('day-pick');
pick.addEventListener('change', () => { if (pick.value && pick.validity.valid) { state.day = pick.value; render(); } });
document.getElementById('week-prev').addEventListener('click', () => { state.weekEnd = addDays(state.weekEnd, -7); render(); });
document.getElementById('week-next').addEventListener('click', () => { state.weekEnd = addDays(state.weekEnd, 7) > todayET() ? todayET() : addDays(state.weekEnd, 7); render(); });

const DAY_TILES = [['Calories', 'calories', ''], ['Protein', 'protein_g', 'g'], ['Carbs', 'carbs_g', 'g'], ['Fat', 'fat_g', 'g'], ['Fiber', 'fiber_g', 'g'], ['Sodium', 'sodium_mg', 'mg']];

/* ---------- entry drill-down ---------- */
const dlg = document.getElementById('fl-modal');
document.getElementById('m-close').addEventListener('click', () => dlg.close());
dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
dlg.addEventListener('close', () => { state.openMeal = null; });
function openEntry(r) {
  state.openMeal = Number(r.id);
  renderModal();
  if (!dlg.open) { if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', ''); }
}
function renderModal() {
  if (state.openMeal == null) return;
  const M = dash.data('meals'), I = dash.data('items');
  const m = M.status === 'ok' ? M.data.find(x => Number(x.id) === state.openMeal) : null;
  const title = document.getElementById('m-title');
  const meta = document.getElementById('m-meta');
  const notes = document.getElementById('m-notes');
  if (!m) { title.textContent = M.status === 'error' ? 'Failed to load' : '—'; meta.textContent = '—'; notes.textContent = ''; return; }
  const w = `id=${enc(m.id)}`;
  title.textContent = m.title;
  title.setAttribute('data-source', 'meals'); title.setAttribute('data-field', 'title'); title.setAttribute('data-where', w);
  meta.textContent = `${longDay(parseDay(m.day))} · ${m.time_local} · ${m.meal_type}${m.where_eaten ? ' · ' + m.where_eaten : ''} · ${m.confidence} confidence`;
  tiles(document.getElementById('m-tiles'), 'meals', 'id', m.id, m,
    [['Calories', 'calories', ''], ['Protein', 'protein_g', 'g'], ['Carbs', 'carbs_g', 'g'], ['Fat', 'fat_g', 'g'], ['Fiber', 'fiber_g', 'g'], ['Sodium', 'sodium_mg', 'mg']]);
  const parts = I.status === 'ok' ? I.data.filter(x => Number(x.meal_id) === state.openMeal) : [];
  fillTable(document.getElementById('m-items'), parts, ['name', 'quantity', 'unit', 'calories', 'protein_g', 'carbs_g', 'fat_g', 'fiber_g', 'sodium_mg', 'basis'], {key: 'id'});
  document.querySelectorAll('#m-items tbody td:last-child').forEach(td => td.classList.add('basis'));
  notes.textContent = m.notes || '';
  if (m.notes) { notes.setAttribute('data-source', 'meals'); notes.setAttribute('data-field', 'notes'); notes.setAttribute('data-where', w); }
  else ['data-source', 'data-field', 'data-where'].forEach(a => notes.removeAttribute(a));
}

/* ---------- render ---------- */
function render() {
  const D = dash.data('daily'), M = dash.data('meals'), I = dash.data('items');
  const MS = dash.data('macro_split'), S = dash.data('summary');
  const BM = dash.data('by_meal_type'), HB = dash.data('hunger_by_type');
  const today = todayET();
  const dayRow = d => D.status === 'ok' ? D.data.find(r => String(r.day).slice(0, 10) === d) : null;
  const macroRow = d => MS.status === 'ok' ? MS.data.find(r => String(r.day).slice(0, 10) === d) : null;

  /* Today */
  document.getElementById('today-date').textContent = longDay(parseDay(today));
  const tRow = dayRow(today);
  const tNote = document.getElementById('today-note');
  const tMeals = M.status === 'ok' ? M.data.filter(r => r.day === today) : [];
  if (D.status === 'error') tNote.textContent = 'Failed to load';
  else if (D.status !== 'ok') tNote.textContent = '—';
  else tNote.textContent = tRow ? `${tRow.meals} meal${tRow.meals === 1 ? '' : 's'} logged · last at ${tMeals.length ? tMeals.at(-1).time_local : '—'}` : 'Nothing logged yet today.';
  tiles(document.getElementById('today-tiles'), 'daily', 'day', today, tRow, DAY_TILES);
  macroBar(document.getElementById('today-macro'), macroRow(today));
  const ENTRY_COLS = ['time_local', 'title', 'item_count', 'calories', 'protein_g', 'carbs_g', 'fat_g', 'confidence'];
  fillTable(document.getElementById('today-table'), tMeals, ENTRY_COLS, {key: 'id', onClick: openEntry});

  /* Day */
  if (state.tab === 'day') {
    const d = state.day;
    document.getElementById('day-label').textContent = d === today ? 'Today' : longDay(parseDay(d));
    document.getElementById('day-next').disabled = d >= today;
    if (pick !== document.activeElement) { pick.value = d; pick.max = today; }
    const r = dayRow(d);
    document.getElementById('day-title').textContent = longDay(parseDay(d));
    const dNote = document.getElementById('day-note');
    if (D.status === 'error') dNote.textContent = 'Failed to load';
    else if (D.status !== 'ok') dNote.textContent = '—';
    else dNote.textContent = r ? `${r.meals} meal${r.meals === 1 ? '' : 's'} · first bite ${r.first_bite.slice(0, 5)}, last ${r.last_bite.slice(0, 5)}` : 'Nothing logged this day.';
    tiles(document.getElementById('day-tiles'), 'daily', 'day', d, r, DAY_TILES);
    macroBar(document.getElementById('day-macro'), macroRow(d));
    const dMeals = M.status === 'ok' ? M.data.filter(x => x.day === d) : [];
    fillTable(document.getElementById('day-items'), dMeals, ENTRY_COLS, {key: 'id', onClick: openEntry});
  }

  /* Week */
  if (state.tab === 'week') {
    // Trailing 7 days ending on state.weekEnd (today by default), not a Monday-to-Sunday week.
    const end = state.weekEnd, wk = addDays(end, -6);
    document.getElementById('week-label').textContent = (end === today ? 'Last 7 days · ' : '') + `${dayFmt(parseDay(wk))} to ${dayFmt(parseDay(end))}`;
    document.getElementById('week-next').disabled = end >= today;
    const days = d3.range(7).map(i => addDays(wk, i));
    const rows = D.status === 'ok' ? D.data.filter(x => days.includes(String(x.day).slice(0, 10))) : [];
    const wr = rows.length ? (() => {
      const avg = k => Math.round(rows.reduce((s, r) => s + Number(r[k] || 0), 0) / rows.length);
      return {days_logged: rows.length, total_calories: Math.round(rows.reduce((s, r) => s + Number(r.calories), 0)),
        avg_calories: avg('calories'), avg_protein: avg('protein_g'), avg_carbs: avg('carbs_g'), avg_fat: avg('fat_g')};
    })() : null;
    const wNote = document.getElementById('week-note');
    if (D.status === 'error') wNote.textContent = 'Failed to load';
    else if (D.status !== 'ok') wNote.textContent = '—';
    else wNote.textContent = wr ? `${wr.days_logged} of 7 days logged. Averages are across logged days only.` : 'Nothing logged in these 7 days.';
    tiles(document.getElementById('week-tiles'), 'daily', 'day', end, wr,
      [['Avg calories / day', 'avg_calories', ''], ['Avg protein / day', 'avg_protein', 'g'], ['Avg carbs / day', 'avg_carbs', 'g'], ['Avg fat / day', 'avg_fat', 'g'], ['Days logged', 'days_logged', 'of 7'], ['Total calories', 'total_calories', '']]);

    fillTable(document.getElementById('week-table'), rows, ['day', 'meals', 'calories', 'protein_g', 'carbs_g', 'fat_g', 'fiber_g', 'sodium_mg'],
      {key: 'day', show: {day: v => shortDow(parseDay(v))}, onClick: rr => openDay(String(rr.day).slice(0, 10))});

    const box = document.getElementById('week-chart');
    box.querySelectorAll('svg,.fl-fail').forEach(s => s.remove());
    if (D.status === 'error') fail(box);
    else if (D.status === 'ok') {
      const Wd = Math.max(280, box.clientWidth), H = 200;
      const byDay = new Map(rows.map(x => [String(x.day).slice(0, 10), x]));
      const ymax = Math.max(d3.max(rows, x => x.calories) || 0, 500);
      const y = d3.scaleLinear([0, ymax], [H - 22, 6]).nice();
      const svg = d3.select(box).append('svg').attr('width', '100%').attr('viewBox', `0 0 ${Wd} ${H}`);
      const left = leftMargin(svg, y, 4, fmt);
      const x = d3.scaleBand(days, [left, Wd - 4]).padding(0.3);
      svg.append('g').attr('transform', `translate(${left},0)`).call(d3.axisLeft(y).ticks(4).tickFormat(fmt).tickSize(-(Wd - left - 4)).tickPadding(6)).call(axisStyle);
      svg.append('g').attr('transform', `translate(0,${H - 22})`).call(d3.axisBottom(x).tickFormat(d => d3.utcFormat('%a')(parseDay(d))).tickSize(0).tickPadding(8)).call(axisStyle);
      const t = tip(box);
      const bw = Math.min(32, x.bandwidth()), off = (x.bandwidth() - bw) / 2;
      svg.append('g').selectAll('rect').data(days.filter(d => byDay.has(d))).join('rect')
        .attr('x', d => x(d) + off).attr('width', bw).attr('y', d => y(byDay.get(d).calories)).attr('height', d => Math.max(0, H - 22 - y(byDay.get(d).calories))).attr('rx', 4)
        .attr('fill', d => d === today ? dash.colors[0] : dash.colors[1]).style('cursor', 'pointer')
        .on('mousemove', (e, d) => { const r = byDay.get(d); showTip(t, box, e, shortDow(parseDay(d)), [[null, 'Calories', fmt(r.calories)], [null, 'Protein', r.protein_g + ' g']]); })
        .on('mouseleave', () => { t.style.display = 'none'; })
        .on('click', (e, d) => openDay(d));
      if (wr) svg.append('line').attr('x1', left).attr('x2', Wd - 4).attr('y1', y(wr.avg_calories)).attr('y2', y(wr.avg_calories))
        .attr('stroke', 'var(--cds-chart-reference)').attr('stroke-width', 1.5).attr('stroke-dasharray', '4 4').attr('pointer-events', 'none');
    }
  }

  /* All time */
  if (state.tab === 'all') {
    const take = document.getElementById('take');
    if (S.status === 'ok' && S.data.length) {
      const s = S.data[0];
      take.textContent = `Across ${s.days} logged day${s.days === 1 ? '' : 's'}.`;
      const box = document.getElementById('all-tiles'); box.replaceChildren();
      [['Avg calories / day', 'avg_calories', ''], ['Avg protein / day', 'avg_protein', 'g'], ['Avg fiber / day', 'avg_fiber', 'g'], ['Meals / day', 'meals_per_day', ''], ['Eating window', 'avg_window_h', 'h']].forEach(([label, field, unit]) => {
        const t = el('div', 'fl-tile'); t.append(el('div', 'lab', label));
        const v = el('div', 'val', fmt(s[field])); v.setAttribute('data-source', 'summary'); v.setAttribute('data-field', field); v.setAttribute('data-row', '0');
        if (unit) { v.append(' '); v.append(el('span', 'unit', unit)); }
        t.append(v); box.append(t);
      });
    } else { take.textContent = S.status === 'error' ? 'Failed to load' : '—'; }

    const cal = document.getElementById('chart-cal');
    legend(document.getElementById('leg-meal'), ORDER.map((k, i) => [k, dash.colors[i]]));
    cal.querySelectorAll('.fl-fail').forEach(e => e.remove());
    if (BM.status === 'ok' && S.status === 'ok') {
      const days = [...new Set(BM.data.map(r => r.day))].sort();
      const v = (day, k) => { const r = BM.data.find(x => x.day === day && x.meal_type === k); return r ? r.calories : 0; };
      const {svg, y, left, W: Wd} = drawStacked(cal, days, ORDER, dash.colors, v, {
        yfmt: fmt,
        lines: day => ORDER.filter(k => v(day, k)).map(k => [dash.colors[ORDER.indexOf(k)], k, fmt(v(day, k))]).concat([[null, 'Total', fmt(d3.sum(ORDER, k => v(day, k)))]])
      });
      svg.append('line').attr('x1', left).attr('x2', Wd - 4).attr('y1', y(S.data[0].avg_calories)).attr('y2', y(S.data[0].avg_calories))
        .attr('stroke', 'var(--cds-chart-reference)').attr('stroke-width', 1.5).attr('stroke-dasharray', '4 4').attr('pointer-events', 'none');
    } else if (BM.status === 'error') fail(cal);

    const mac = document.getElementById('chart-macro'), c = mcol();
    legend(document.getElementById('leg-macro'), MACRO.map(([, n], i) => [n, c[i]]));
    mac.querySelectorAll('.fl-fail').forEach(e => e.remove());
    if (MS.status === 'ok') {
      const days = MS.data.map(r => r.day).sort();
      const v = (day, k) => (MS.data.find(x => x.day === day) || {})[k];
      drawStacked(mac, days, MACRO.map(m => m[0]), c, v, {ymax: 1, yfmt: pct, lines: day => MACRO.map(([k, n], i) => [c[i], n, pct(v(day, k))])});
    } else if (MS.status === 'error') fail(mac);

    const win = document.getElementById('chart-window');
    win.querySelectorAll('svg,.fl-fail').forEach(s => s.remove());
    if (D.status === 'ok' && D.data.length) {
      const rows = D.data.map(r => ({day: r.day, a: toMin(r.first_bite), b: toMin(r.last_bite), fa: r.first_bite.slice(0, 5), fb: r.last_bite.slice(0, 5)})).sort((p, q) => p.day < q.day ? -1 : 1);
      const Wd = Math.max(280, win.clientWidth), H = 240, left = 34;
      const lo = Math.floor(d3.min(rows, r => r.a) / 120) * 120, hi = Math.ceil(d3.max(rows, r => r.b) / 120) * 120 || lo + 120;
      const y = d3.scaleLinear([lo, hi], [6, H - 22]);
      const hfmt = m => { const h = Math.floor(m / 60) % 24; return `${(h % 12) || 12}${h < 12 ? 'a' : 'p'}`; };
      const svg = d3.select(win).append('svg').attr('width', '100%').attr('viewBox', `0 0 ${Wd} ${H}`);
      const x = d3.scaleBand(rows.map(r => r.day), [left, Wd - 4]).padding(0.35);
      svg.append('g').attr('transform', `translate(${left},0)`).call(d3.axisLeft(y).tickValues(d3.range(lo, hi + 1, 120)).tickFormat(hfmt).tickSize(-(Wd - left - 4)).tickPadding(6)).call(axisStyle);
      const every = Math.ceil(rows.length / Math.max(2, Math.floor((Wd - left) / 52)));
      svg.append('g').attr('transform', `translate(0,${H - 22})`).call(d3.axisBottom(x).tickValues(rows.filter((d, i) => i % every === 0).map(r => r.day)).tickFormat(d => dayFmt(parseDay(d))).tickSize(0).tickPadding(8)).call(axisStyle);
      const t = tip(win);
      const bw = Math.min(16, x.bandwidth()), off = (x.bandwidth() - bw) / 2;
      svg.append('g').selectAll('rect').data(rows).join('rect')
        .attr('x', r => x(r.day) + off).attr('width', bw).attr('y', r => y(r.a)).attr('height', r => Math.max(4, y(r.b) - y(r.a))).attr('rx', 4).attr('fill', dash.colors[1])
        .on('mousemove', (e, r) => showTip(t, win, e, dayFmt(parseDay(r.day)), [[null, 'First', r.fa], [null, 'Last', r.fb], [null, 'Window', ((r.b - r.a) / 60).toFixed(1) + ' h']]))
        .on('mouseleave', () => { t.style.display = 'none'; });
    } else if (D.status === 'error') fail(win);

    const hun = document.getElementById('chart-hunger'), hcol = [dash.colors[3], dash.colors[1]];
    hun.querySelectorAll('svg,.fl-fail').forEach(s => s.remove());
    legend(document.getElementById('leg-hunger'), [['Hunger before', hcol[0]], ['Fullness after', hcol[1]]]);
    if (HB.status === 'ok') {
      const rows = ORDER.map(k => HB.data.find(r => r.meal_type === k)).filter(Boolean);
      if (!rows.length) { hun.append(el('div', 'fl-fail', 'Rate hunger and fullness when you log a meal to see this.')); }
      else {
        const Wd = Math.max(280, hun.clientWidth), H = 240, left = 74;
        const svg = d3.select(hun).append('svg').attr('width', '100%').attr('viewBox', `0 0 ${Wd} ${H}`);
        const y = d3.scaleBand(rows.map(r => r.meal_type), [4, H - 22]).padding(0.25);
        const x = d3.scaleLinear([0, 5], [left, Wd - 28]);
        svg.append('g').attr('transform', `translate(0,${H - 22})`).call(d3.axisBottom(x).ticks(5).tickSize(-(H - 26)).tickPadding(6)).call(axisStyle);
        svg.append('g').attr('transform', `translate(${left},0)`).call(d3.axisLeft(y).tickSize(0).tickPadding(8)).call(axisStyle);
        const bh = Math.min(14, y.bandwidth() / 2 - 1), t = tip(hun);
        [['hunger', 0], ['fullness', 1]].forEach(([k, i]) => {
          svg.append('g').selectAll('rect').data(rows).join('rect')
            .attr('x', left).attr('y', r => y(r.meal_type) + y.bandwidth() / 2 - (i ? -1 : bh + 1)).attr('height', bh)
            .attr('width', r => r[k] == null ? 0 : Math.max(0, x(r[k]) - left)).attr('rx', 3).attr('fill', hcol[i])
            .on('mousemove', (e, r) => showTip(t, hun, e, r.meal_type, [[hcol[0], 'Hunger before', r.hunger ?? 'not rated'], [hcol[1], 'Fullness after', r.fullness ?? 'not rated']]))
            .on('mouseleave', () => { t.style.display = 'none'; });
        });
      }
    } else if (HB.status === 'error') fail(hun);
  }
}

dash.onData(() => { render(); renderModal(); });
var startTab = store('food-tab'); if (['day', 'week', 'all'].includes(startTab)) setTab(startTab);

        api.openDay = openDay;
        Promise.resolve(ctx.mcp).catch(function () { return null; }).then(function (mcp) {
          if (!mcp) { ["daily", "meals", "items"].forEach(function (k) { DS[k] = { status: "error", data: [] }; }); var n = root.getElementById("fl-notice"); n.textContent = Hub.errText({ code: "capability_disabled" }); n.hidden = false; syncLine(); redraw(); return; }
          if (!Hub.mcp) Hub.mcp = mcp;
          load(false);
        });
      })(D, { hash: "" });
    },
    shown: function () { if (api.redraw) api.redraw(); }
  };
  window.HubApps.food = api;
})();
