/* Calendar view for What's on Tap: week, month and year, from crm.hub_range. */
(function () {
  "use strict";
  window.HubApps = window.HubApps || {};
  var CSS = [
    ".cal-bar{display:flex;align-items:center;justify-content:space-between;gap:10px 16px;flex-wrap:wrap;margin-bottom:16px}",
    ".cal-bar h2{font-family:var(--display);font-size:28px;font-weight:700;margin:0;letter-spacing:-.01em}",
    ".cal-nav{display:flex;gap:6px;align-items:center;flex-wrap:wrap}",
    ".seg{display:inline-flex;border:1px solid var(--line);border-radius:8px;overflow:hidden;background:var(--surface)}",
    ".seg button{border:0;background:none;padding:6px 12px;min-height:34px;font-size:13px;font-weight:600;color:var(--ink-3);cursor:pointer}",
    ".seg button[aria-pressed=true]{background:var(--accent);color:var(--accent-ink)}",
    ".cal-grid{display:grid;gap:16px;grid-template-columns:minmax(0,1fr)}",
    "@media(min-width:1000px){.cal-grid{grid-template-columns:minmax(0,1fr) 300px}}",
    ".wk{display:grid;gap:10px;grid-template-columns:minmax(0,1fr)}",
    "@media(min-width:760px){.wk{grid-template-columns:repeat(7,minmax(0,1fr))}}",
    ".wd{background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:10px;min-width:0;display:flex;flex-direction:column;gap:6px;min-height:120px}",
    ".wd.today{border-color:var(--accent);box-shadow:inset 0 3px 0 var(--accent)}",
    ".wd h4{margin:0;font-family:var(--mono);font-size:12px;letter-spacing:.04em;text-transform:uppercase;color:var(--ink-3);font-weight:500}",
    ".wd h4 b{font-family:var(--display);font-size:20px;color:var(--ink);letter-spacing:0;margin-left:4px;text-transform:none}",
    ".wd ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:6px}",
    ".wd li{display:grid;grid-template-columns:4px minmax(0,1fr);gap:7px;font-size:13px;line-height:1.35}",
    ".wd li i{border-radius:2px;display:block}",
    ".wd li span{overflow-wrap:anywhere}",
    ".wd li small{display:block;color:var(--ink-3);font-family:var(--mono);font-size:11px}",
    ".wd .foot{margin-top:auto;display:flex;flex-wrap:wrap;gap:4px;padding-top:4px}",
    ".mini{font-size:11px;border-radius:999px;padding:1px 7px;background:var(--surface-2);color:var(--ink-2)}",
    ".mini.w{background:var(--accent-soft);color:var(--accent)}",
    ".mo{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:4px}",
    ".mo .dh{font-family:var(--mono);font-size:11px;text-transform:uppercase;letter-spacing:.04em;color:var(--ink-3);padding:2px 4px}",
    ".mc{background:var(--surface);border:1px solid var(--line);border-radius:8px;min-height:92px;padding:5px;min-width:0;display:flex;flex-direction:column;gap:3px;cursor:pointer;text-align:left}",
    ".mc:hover{border-color:var(--ink-3)}",
    ".mc.out{opacity:.45}",
    ".mc.today{border-color:var(--accent)}",
    ".mc .n{font-family:var(--mono);font-size:12px;color:var(--ink-2);display:flex;justify-content:space-between;align-items:center}",
    ".mc .n em{font-style:normal;width:7px;height:7px;border-radius:50%;background:var(--accent)}",
    ".mc .e{font-size:11.5px;line-height:1.25;border-left:3px solid var(--ec);padding-left:4px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}",
    ".mc .more{font-size:11px;color:var(--ink-3)}",
    "@media(max-width:620px){.mc{min-height:64px}.mc .e{font-size:0;border-left-width:0;height:5px;border-radius:2px;padding:0;background:var(--ec)}.mc .more{display:none}}",
    ".sum h3{margin-bottom:8px}",
    ".kv{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-bottom:14px}",
    ".kv div{background:var(--surface-2);border-radius:8px;padding:8px 10px}",
    ".kv b{display:block;font-family:var(--display);font-size:22px}",
    ".kv span{font-size:11px;color:var(--ink-3)}",
    ".bars{list-style:none;margin:0 0 14px;padding:0;display:flex;flex-direction:column;gap:8px}",
    ".bars li{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:2px 10px;font-size:13px}",
    ".bars li .tr{grid-column:1/-1;height:4px;border-radius:2px;background:var(--surface-2);overflow:hidden}",
    ".bars li .tr b{display:block;height:100%;border-radius:0 2px 2px 0}",
    ".bars .v{font-family:var(--mono);font-variant-numeric:tabular-nums}",
    ".yr svg{display:block;width:100%;height:auto}",
    ".yr .legend{display:flex;flex-wrap:wrap;gap:6px 14px;margin-bottom:8px;font-size:12px;color:var(--ink-2)}",
    ".yr .legend span{display:inline-flex;align-items:center;gap:6px}",
    ".yr .legend i{width:10px;height:10px;border-radius:3px;display:inline-block}"
  ].join("\n");

  var H, root, st = { mode: "week", anchor: new Date(), data: null, seq: 0 };
  function el(t, c, x) { return H.el(t, c, x); }
  function startOfWeek(d) { var x = new Date(d.getFullYear(), d.getMonth(), d.getDate()); x.setDate(x.getDate() - x.getDay()); return x; }
  function addDays(d, n) { var x = new Date(d); x.setDate(x.getDate() + n); return x; }
  function range() {
    var a = st.anchor;
    if (st.mode === "week") { var s = startOfWeek(a); return [s, addDays(s, 6)]; }
    if (st.mode === "month") { var f = new Date(a.getFullYear(), a.getMonth(), 1), l = new Date(a.getFullYear(), a.getMonth() + 1, 0); return [startOfWeek(f), addDays(startOfWeek(l), 6)]; }
    var e = new Date(a.getFullYear(), a.getMonth() + 1, 0), b = new Date(a.getFullYear(), a.getMonth() - 11, 1); return [b, e];
  }
  function title() {
    var a = st.anchor, M = H.MON;
    if (st.mode === "week") { var r = range(); return M[r[0].getMonth()] + " " + r[0].getDate() + " to " + (r[1].getMonth() !== r[0].getMonth() ? M[r[1].getMonth()] + " " : "") + r[1].getDate(); }
    if (st.mode === "month") return ["January","February","March","April","May","June","July","August","September","October","November","December"][a.getMonth()] + " " + a.getFullYear();
    var r2 = range(); return M[r2[0].getMonth()] + " " + r2[0].getFullYear() + " to " + M[r2[1].getMonth()] + " " + r2[1].getFullYear();
  }
  function load(fresh) {
    var r = range(), my = ++st.seq;
    root.querySelector("#calTitle").textContent = title();
    root.querySelector("#calBody").textContent = ""; root.querySelector("#calBody").appendChild(el("div", "empty", "Loading"));
    return H.sql("select crm.hub_range('" + H.iso(r[0]) + "','" + H.iso(r[1]) + "'," + !H.hide + ") as d", false, fresh).then(function (d) {
      if (my !== st.seq) return; st.data = d; render();
    }).catch(function (e) { if (my !== st.seq) return; var b = root.querySelector("#calBody"); b.textContent = ""; b.appendChild(el("div", "err", H.errText(e))); });
  }
  function evTitle(e) { return H.hide && e.priv ? "Private" : e.t; }
  function render() {
    var body = root.querySelector("#calBody"); body.textContent = "";
    if (st.mode === "week") renderWeek(body); else if (st.mode === "month") renderMonth(body); else renderYear(body);
    renderSummary();
  }
  function renderWeek(body) {
    var wk = el("div", "wk"), today = H.iso(new Date());
    (st.data.days || []).forEach(function (d) {
      var dt = H.dateOf(d.d), card = el("section", "wd" + (d.d === today ? " today" : ""));
      var h = el("h4", null, H.DOW[dt.getDay()]); h.appendChild(el("b", null, String(dt.getDate()))); card.appendChild(h);
      var ul = el("ul");
      (d.events || []).forEach(function (e) {
        var li = el("li"), i = el("i"); i.style.background = H.catColor(e.c); li.appendChild(i);
        var s = el("span", null, evTitle(e)); s.appendChild(el("small", null, (e.ad ? "All day" : H.hm(new Date(e.at))) + (e.p ? " · with Jordan" : ""))); li.appendChild(s); ul.appendChild(li);
      });
      if (!(d.events || []).length) ul.appendChild(el("li", "muted", "Open"));
      card.appendChild(ul);
      var foot = el("div", "foot");
      if (d.workout) foot.appendChild(el("span", "mini w", d.workout));
      if (d.kcal) foot.appendChild(el("span", "mini", d.kcal + " kcal"));
      if (foot.childNodes.length) card.appendChild(foot);
      wk.appendChild(card);
    });
    body.appendChild(wk);
  }
  function renderMonth(body) {
    var mo = el("div", "mo"), today = H.iso(new Date()), m = st.anchor.getMonth();
    H.DOW.forEach(function (x) { mo.appendChild(el("div", "dh", x)); });
    (st.data.days || []).forEach(function (d) {
      var dt = H.dateOf(d.d), c = el("button", "mc" + (dt.getMonth() !== m ? " out" : "") + (d.d === today ? " today" : "")); c.type = "button";
      var n = el("div", "n", String(dt.getDate())); if (d.workout) { var w = el("em"); w.title = "Trained: " + d.workout; n.appendChild(w); } c.appendChild(n);
      var evs = d.events || [];
      evs.slice(0, 3).forEach(function (e) { var x = el("div", "e", evTitle(e)); x.style.setProperty("--ec", H.catColor(e.c)); c.appendChild(x); });
      if (evs.length > 3) c.appendChild(el("div", "more", "+" + (evs.length - 3) + " more"));
      c.setAttribute("aria-label", H.DOW[dt.getDay()] + " " + H.MON[dt.getMonth()] + " " + dt.getDate() + ": " + evs.length + " events" + (d.workout ? ", trained" : ""));
      c.addEventListener("click", function () { st.mode = "week"; st.anchor = dt; syncSeg(); load(false); });
      mo.appendChild(c);
    });
    body.appendChild(mo);
    body.appendChild(el("p", "fine", "Tap a day to open its week. A purple dot means you trained that day."));
  }
  function renderYear(body) {
    var wrap = el("div", "yr"), byM = {}, months = [], present = {};
    var r = range(), cur = new Date(r[0]);
    while (cur <= r[1]) { var k = cur.getFullYear() + "-" + String(cur.getMonth() + 1).padStart(2, "0"); months.push(k); byM[k] = {}; cur.setMonth(cur.getMonth() + 1); }
    var seen = {};
    (st.data.days || []).forEach(function (d) {
      var k = d.d.slice(0, 7); if (!byM[k]) return;
      (d.events || []).forEach(function (e) { var id = e.t + "|" + e.at; if (seen[id]) return; seen[id] = 1; var s = H.SLOT[e.c] ? e.c : "_o"; byM[k][s] = (byM[k][s] || 0) + 1; present[s] = 1; });
    });
    var labels = {}; (st.data.categories || []).forEach(function (c) { labels[c.slug] = c.label; });
    var order = Object.keys(H.SLOT).filter(function (s) { return present[s]; }); if (present._o) order.push("_o");
    var lg = el("div", "legend");
    order.forEach(function (s) { var sp = el("span"), i = el("i"); i.style.background = s === "_o" ? "var(--c8)" : H.catColor(s); sp.appendChild(i); sp.appendChild(document.createTextNode(s === "_o" ? "Everything else" : labels[s])); lg.appendChild(sp); });
    wrap.appendChild(lg);
    var box = el("div"); wrap.appendChild(box); body.appendChild(wrap);
    var W = Math.max(320, body.clientWidth || 700), Hh = 240, ml = 30, mr = 6, mt = 8, mb = 24;
    var tot = months.map(function (m) { return order.reduce(function (a, s) { return a + (byM[m][s] || 0); }, 0); });
    var y = d3.scaleLinear().domain([0, Math.max(4, d3.max(tot) || 0)]).nice(4).range([Hh - mb, mt]);
    var x = d3.scaleBand().domain(months).range([ml, W - mr]).paddingInner(0.3);
    var svg = d3.select(box).append("svg").attr("viewBox", "0 0 " + W + " " + Hh).attr("role", "img").attr("aria-label", "Events per month by category");
    y.ticks(4).forEach(function (v) {
      svg.append("line").attr("x1", ml).attr("x2", W - mr).attr("y1", y(v)).attr("y2", y(v)).attr("stroke", v === 0 ? "var(--axis)" : "var(--grid)");
      svg.append("text").attr("x", ml - 6).attr("y", y(v) + 4).attr("text-anchor", "end").attr("font-size", 11).attr("font-family", "var(--mono)").attr("fill", "var(--ink-3)").text(v);
    });
    months.forEach(function (m, i) {
      var y0 = y(0), g = svg.append("g");
      order.forEach(function (s) {
        var v = byM[m][s] || 0; if (!v) return; var hgt = y(0) - y(v);
        g.append("rect").attr("x", x(m)).attr("width", x.bandwidth()).attr("y", y0 - hgt).attr("height", Math.max(0, hgt - (hgt > 3 ? 1.5 : 0))).attr("rx", 2).attr("fill", s === "_o" ? "var(--c8)" : H.catColor(s))
          .append("title").text((s === "_o" ? "Everything else" : labels[s]) + ": " + v);
        y0 -= hgt;
      });
      var p = m.split("-");
      if (W > 520 || i % 2 === 0) svg.append("text").attr("x", x(m) + x.bandwidth() / 2).attr("y", Hh - 7).attr("text-anchor", "middle").attr("font-size", 11).attr("font-family", "var(--mono)").attr("fill", "var(--ink-3)").text(H.MON[+p[1] - 1]);
      g.append("rect").attr("x", x(m)).attr("width", x.bandwidth()).attr("y", mt).attr("height", Hh - mb - mt).attr("fill", "transparent").style("cursor", "pointer")
        .on("click", function () { st.mode = "month"; st.anchor = new Date(+p[0], +p[1] - 1, 1); syncSeg(); load(false); })
        .append("title").text(H.MON[+p[1] - 1] + " " + p[0] + ": " + tot[i] + " events. Tap to open the month.");
    });
    body.appendChild(el("p", "fine", "Tap a month to open it."));
  }
  function renderSummary() {
    var d = st.data, box = root.querySelector("#calSum"); box.textContent = "";
    box.appendChild(el("h3", null, st.mode === "week" ? "This week" : st.mode === "month" ? "This month" : "Last 12 months"));
    var kv = el("div", "kv");
    [[d.events, "events"], [d.with_partner, "with Jordan"], [d.workouts, "workouts"]].forEach(function (x) { var c = el("div"); c.appendChild(el("b", null, String(x[0] || 0))); c.appendChild(el("span", null, x[1])); kv.appendChild(c); });
    box.appendChild(kv);
    var bars = el("ul", "bars"), max = Math.max.apply(null, (d.totals || []).map(function (t) { return t.n; }).concat(1));
    (d.totals || []).forEach(function (t) {
      var li = el("li"); li.appendChild(el("span", null, t.l)); li.appendChild(el("span", "v", String(t.n)));
      var tr = el("span", "tr"), b = el("b"); b.style.width = Math.max(3, t.n / max * 100) + "%"; b.style.background = H.catColor(t.c); tr.appendChild(b); li.appendChild(tr); bars.appendChild(li);
    });
    if (!(d.totals || []).length) bars.appendChild(el("li", "muted", "No categorized events."));
    box.appendChild(bars);
    if ((d.people || []).length) {
      box.appendChild(el("h3", null, "Who you saw"));
      var ul = el("ul", "rows");
      d.people.forEach(function (p) {
        var li = el("li"), b = el("button", "linkish", p.name); b.type = "button";
        b.addEventListener("click", function () { H.go("people", { person: p.id }); });
        li.appendChild(b); li.appendChild(el("span", "muted", p.n + (p.n === 1 ? " event" : " events"))); ul.appendChild(li);
      });
      box.appendChild(ul);
    }
  }
  function syncSeg() { root.querySelectorAll(".seg button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.m === st.mode)); }); H.store("cal-mode", st.mode); }
  function step(n) {
    var a = st.anchor;
    if (st.mode === "week") st.anchor = addDays(a, 7 * n);
    else if (st.mode === "month") st.anchor = new Date(a.getFullYear(), a.getMonth() + n, 1);
    else st.anchor = new Date(a.getFullYear() + n, a.getMonth(), 1);
    load(false);
  }

  window.HubApps.calendar = {
    mount: function (host, ctx) {
      H = ctx.hub; root = host;
      var style = document.createElement("style"); style.textContent = CSS; document.head.appendChild(style);
      host.innerHTML = '<div class="cal-bar"><h2 id="calTitle">Calendar</h2><div class="cal-nav">' +
        '<div class="seg" role="group" aria-label="View"><button type="button" data-m="week">Week</button><button type="button" data-m="month">Month</button><button type="button" data-m="year">Year</button></div>' +
        '<button class="btn" type="button" id="calPrev" aria-label="Previous">&larr;</button><button class="btn" type="button" id="calToday">Today</button><button class="btn" type="button" id="calNext" aria-label="Next">&rarr;</button></div></div>' +
        '<div class="cal-grid"><div id="calBody"></div><aside class="panel sum" id="calSum"></aside></div>';
      st.mode = H.store("cal-mode") || "week";
      host.querySelectorAll(".seg button").forEach(function (b) { b.addEventListener("click", function () { st.mode = b.dataset.m; st.anchor = new Date(); syncSeg(); load(false); }); });
      host.querySelector("#calPrev").addEventListener("click", function () { step(-1); });
      host.querySelector("#calNext").addEventListener("click", function () { step(1); });
      host.querySelector("#calToday").addEventListener("click", function () { st.anchor = new Date(); load(false); });
      H.on("hide", function () { if (!host.hidden) load(false); else st.stale = true; });
      H.on("refresh", function () { if (!host.hidden) load(true); else st.stale = true; });
      syncSeg(); load(false);
    },
    shown: function () { if (st.stale) { st.stale = false; load(false); } }
  };
})();
