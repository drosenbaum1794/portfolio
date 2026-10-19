/* Health view for What's on Tap: Apple Health (and later Garmin history) from health.hub(from, to).
   Layout: range control, four headline tiles, sleep stages across the width, then steps and
   resting heart rate side by side, then workouts beside patterns. Gaps stay gaps: a day the
   watch was off is drawn as missing, never as zero. */
(function () {
  "use strict";
  window.HubApps = window.HubApps || {};
  var CSS = [
    ".hl-bar{display:flex;align-items:center;justify-content:space-between;gap:10px 16px;flex-wrap:wrap;margin-bottom:6px}",
    ".hl-bar h2{font-family:var(--display);font-size:28px;font-weight:700;margin:0;letter-spacing:-.01em}",
    ".hl-sub{color:var(--ink-3);font-size:13px;margin:0 0 16px}",
    ".hl-tiles{display:grid;gap:12px;grid-template-columns:repeat(2,minmax(0,1fr));margin-bottom:16px}",
    "@media(min-width:900px){.hl-tiles{grid-template-columns:repeat(4,minmax(0,1fr))}}",
    ".hl-tile{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:14px 16px;min-width:0}",
    ".hl-tile .lab{font-family:var(--mono);font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-3)}",
    ".hl-tile .v{font-family:var(--display);font-size:34px;font-weight:700;line-height:1.05;margin-top:6px;font-variant-numeric:tabular-nums}",
    ".hl-tile .v small{font-family:var(--body);font-size:14px;font-weight:500;color:var(--ink-3);margin-left:4px}",
    ".hl-tile .d{font-size:13px;color:var(--ink-2);margin-top:4px}",
    ".hl-tile .d .up{color:var(--good)}.hl-tile .d .dn{color:var(--warn)}",
    ".hl-grid{display:grid;gap:16px;grid-template-columns:minmax(0,1fr)}",
    "@media(min-width:900px){.hl-grid.two{grid-template-columns:repeat(2,minmax(0,1fr))}}",
    "@media(max-width:520px){.hl-wo li{grid-template-columns:52px minmax(0,1fr) auto}}",
    ".hl-grid+.hl-grid{margin-top:16px}",
    ".hl-plot{position:relative;min-height:180px}",
    ".hl-plot svg{display:block;width:100%;height:auto;overflow:visible}",
    ".hl-plot text{font-family:var(--mono);font-size:11px;fill:var(--ink-3)}",
    ".hl-key{display:flex;flex-wrap:wrap;gap:6px 14px;font-size:12px;color:var(--ink-2);margin-bottom:8px}",
    ".hl-key span{display:inline-flex;align-items:center;gap:6px}",
    ".hl-key i{width:10px;height:10px;border-radius:3px;display:inline-block}",
    ".hl-key i.ln{height:2px;border-radius:1px;width:14px}",
    ".hl-tip{position:absolute;pointer-events:none;background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:6px 9px;font-size:12px;line-height:1.4;box-shadow:0 6px 18px rgba(0,0,0,.12);white-space:nowrap;z-index:3}",
    ".hl-tip b{font-family:var(--body);font-weight:600}",
    ".hl-empty{border:1px dashed var(--line);border-radius:10px;padding:16px;color:var(--ink-2);font-size:14px}",
    ".hl-empty b{display:block;color:var(--ink);margin-bottom:2px}",
    ".hl-wo{list-style:none;margin:0;padding:0}",
    ".hl-wo li{display:grid;grid-template-columns:72px minmax(0,1fr) auto;gap:10px;padding:9px 0;border-bottom:1px solid var(--line);align-items:baseline}",
    ".hl-wo li:last-child{border-bottom:0}",
    ".hl-wo time{font-family:var(--mono);font-size:12px;color:var(--ink-3)}",
    ".hl-wo .n{font-weight:600}.hl-wo .n small{display:block;font-weight:400;color:var(--ink-3);font-size:12.5px}",
    ".hl-wo .k{font-family:var(--mono);font-size:12px;color:var(--ink-2);text-align:right;white-space:nowrap}",
    ".hl-pat{display:grid;gap:10px}",
    ".hl-pat .row{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:2px 10px;font-size:13.5px}",
    ".hl-pat .row b{font-family:var(--display);font-size:20px}",
    ".hl-pat .tr{grid-column:1/-1;height:6px;border-radius:3px;background:var(--surface-2);overflow:hidden}",
    ".hl-pat .tr i{display:block;height:100%;border-radius:0 3px 3px 0}",
    ".hl-cov{display:flex;gap:2px;flex-wrap:nowrap;margin-top:6px}",
    ".hl-cov i{flex:1;height:8px;border-radius:2px;background:var(--surface-2)}",
    ".hl-cov i.on{background:var(--c2)}"
  ].join("\n");

  var H, root, st = { range: "30", data: null, seq: 0, stale: false };
  var RANGES = [["30", "30 days"], ["90", "90 days"], ["365", "1 year"], ["all", "All"]];
  function el(t, c, x) { return H.el(t, c, x); }
  function $(s) { return root.querySelector(s); }
  function css(v) { return getComputedStyle(document.documentElement).getPropertyValue(v).trim(); }
  function pad(n) { return String(n).padStart(2, "0"); }
  function isoD(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function parseD(s) { var p = String(s).slice(0, 10).split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function addDays(d, n) { var x = new Date(d); x.setDate(x.getDate() + n); return x; }
  function md(s) { var d = parseD(s); return H.MON[d.getMonth()] + " " + d.getDate(); }
  function hm(min) { if (min == null) return "–"; var t = Math.round(min), h = Math.floor(t / 60), m = t % 60; return h ? h + "h" + (m ? " " + pad(m) + "m" : "") : m + "m"; }
  function fmt(n) { return n == null ? "–" : Math.round(n).toLocaleString("en-US"); }
  function avg(a) { a = a.filter(function (x) { return x != null; }); return a.length ? a.reduce(function (s, x) { return s + Number(x); }, 0) / a.length : null; }

  function bounds() {
    var to = new Date(); var from;
    if (st.range === "all") from = new Date(2022, 0, 1); else from = addDays(to, -Number(st.range) + 1);
    return [isoD(from), isoD(to)];
  }

  function load(fresh) {
    var b = bounds(), seq = ++st.seq;
    H.sql("select health.hub('" + b[0] + "','" + b[1] + "') as d", false, fresh).then(function (d) {
      if (seq !== st.seq) return;
      st.data = d; render();
    }, function (e) {
      if (seq !== st.seq) return;
      $("#hlBody").textContent = ""; $("#hlBody").appendChild(el("div", "err", H.errText(e, "Supabase")));
    });
  }

  /* ---------- tiles ---------- */
  function tile(label, value, unit, detail) {
    var t = el("div", "hl-tile"); t.appendChild(el("div", "lab", label));
    var v = el("div", "v", value); if (unit) v.appendChild(el("small", null, unit)); t.appendChild(v);
    if (detail) t.appendChild(detail); return t;
  }
  function delta(cur, prev, unit, goodUp, digits) {
    var d = el("div", "d");
    if (cur == null || prev == null) { d.textContent = "Not enough data to compare"; return d; }
    var diff = cur - prev, sign = diff > 0 ? "+" : diff < 0 ? "−" : "", good = goodUp ? diff >= 0 : diff <= 0;
    var s = el("span", Math.abs(diff) < (digits ? 0.5 : 1) ? "" : good ? "up" : "dn", sign + Math.abs(diff).toFixed(digits || 0) + (unit || ""));
    d.appendChild(s); d.appendChild(document.createTextNode(" vs the 7 days before")); return d;
  }
  function renderTiles(D) {
    var box = $("#hlTiles"); box.textContent = "";
    var daily = D.daily || [], today = isoD(new Date());
    var full = daily.filter(function (r) { return r.d < today; });
    var last7 = full.slice(-7), prev7 = full.slice(-14, -7);
    var s7 = avg(last7.map(function (r) { return r.steps; })), p7 = avg(prev7.map(function (r) { return r.steps; }));
    box.appendChild(tile("Steps, 7-day avg", fmt(s7), "a day", delta(s7, p7, "", true)));

    var rhrRows = daily.filter(function (r) { return r.rhr != null; }), lastR = rhrRows[rhrRows.length - 1];
    var base = avg(rhrRows.slice(-30).map(function (r) { return r.rhr; }));
    var dr = el("div", "d");
    if (lastR) { dr.textContent = md(lastR.d) + (base != null ? " · your 30-reading average is " + Math.round(base) : ""); }
    else dr.textContent = "No watch readings in this range";
    box.appendChild(tile("Resting heart rate", lastR ? String(Math.round(lastR.rhr)) : "–", lastR ? "bpm" : "", dr));

    var sl = (D.sleep || [])[(D.sleep || []).length - 1], ds = el("div", "d");
    if (sl) ds.textContent = (sl.n === today ? "Last night" : md(sl.n)) + (sl.staged ? " · deep " + hm(sl.deep) + ", REM " + hm(sl.rem) : "");
    else ds.textContent = "No sleep recorded in this range";
    box.appendChild(tile("Sleep", sl ? hm(sl.asleep).trim() : "–", "", ds));

    var w = D.workouts || [], mins = w.reduce(function (s, x) { return s + Number(x.min || 0); }, 0);
    var worn = daily.filter(function (r) { return r.hr != null; }).length, days = daily.length;
    var dw = el("div", "d", Math.round(mins) + " min total · watch on " + worn + " of " + days + " days");
    box.appendChild(tile("Workouts", String(w.length), w.length === 1 ? "session" : "sessions", dw));
  }

  /* ---------- shared chart bits ---------- */
  function tipFor(host) { var t = host.querySelector(".hl-tip"); if (!t) { t = el("div", "hl-tip"); t.hidden = true; host.appendChild(t); } return t; }
  function showTip(host, ev, lines) {
    var t = tipFor(host); t.textContent = "";
    lines.forEach(function (l, i) { var row = el("div"); if (i === 0) row.appendChild(el("b", null, l)); else row.textContent = l; t.appendChild(row); });
    t.hidden = false;
    var r = host.getBoundingClientRect(), x = ev.clientX - r.left + 12, y = ev.clientY - r.top - 12;
    if (x + t.offsetWidth > r.width) x = ev.clientX - r.left - t.offsetWidth - 12;
    t.style.left = Math.max(0, x) + "px"; t.style.top = Math.max(0, y - t.offsetHeight) + "px";
  }
  function hideTip(host) { var t = host.querySelector(".hl-tip"); if (t) t.hidden = true; }
  // Weekly buckets once a range is too long for daily bars to read.
  function bucket(rows, key, how) {
    if (rows.length <= 120) return rows.map(function (r) { return { d: r.d, v: r[key] == null ? null : Number(r[key]), n: 1 }; });
    var out = [], cur = null;
    rows.forEach(function (r) {
      var dt = parseD(r.d), wk = isoD(addDays(dt, -dt.getDay()));
      if (!cur || cur.d !== wk) { cur = { d: wk, vals: [], n: 0 }; out.push(cur); }
      if (r[key] != null) cur.vals.push(Number(r[key]));
    });
    return out.map(function (b) { return { d: b.d, v: b.vals.length ? (how === "sum" ? b.vals.reduce(function (s, x) { return s + x; }, 0) / b.vals.length : b.vals.reduce(function (s, x) { return s + x; }, 0) / b.vals.length) : null, n: 7, weekly: true }; });
  }
  function frame(host, H0) {
    var W = Math.max(300, host.clientWidth || 600);
    var svg = d3.select(host).append("svg").attr("viewBox", "0 0 " + W + " " + H0).attr("role", "img");
    return { svg: svg, W: W, H: H0 };
  }
  function yAxis(svg, y, x0, x1, ticks, f) {
    var g = svg.append("g");
    (Array.isArray(ticks) ? ticks : y.ticks(ticks)).forEach(function (t) {
      g.append("line").attr("x1", x0).attr("x2", x1).attr("y1", y(t)).attr("y2", y(t)).attr("stroke", css("--grid")).attr("stroke-width", 1);
      g.append("text").attr("x", x0 - 6).attr("y", y(t) + 4).attr("text-anchor", "end").text(f ? f(t) : t);
    });
  }
  function xLabels(svg, days, x, y0, every) {
    days.forEach(function (d, i) { if (i % every) return; svg.append("text").attr("x", x(d) + x.bandwidth() / 2).attr("y", y0 + 16).attr("text-anchor", "middle").text(md(d)); });
  }

  /* ---------- sleep ---------- */
  function renderSleep(D) {
    var host = $("#hlSleep"); host.textContent = "";
    var rows = (D.sleep || []).filter(function (r) { return r.asleep != null; });
    $("#hlSleepKey").hidden = !rows.length;
    if (rows.length < 3) {
      var e = el("div", "hl-empty");
      e.appendChild(el("b", null, rows.length ? rows.length + (rows.length === 1 ? " night" : " nights") + " so far" : "No sleep data in this range"));
      e.appendChild(document.createTextNode("Nights only count when the watch is worn to bed. Sleep history arrives with the Garmin export, and new nights come in each time you sync."));
      host.appendChild(e);
      if (!rows.length) return;
    }
    var f = frame(host, 210), L = 40, R = f.W - 8, T = 8, B = 180;
    var days = rows.map(function (r) { return r.n; });
    var x = d3.scaleBand().domain(days).range([L, R]).paddingInner(0.25).paddingOuter(0.1);
    var max = d3.max(rows, function (r) { return (r.deep || 0) + (r.core || 0) + (r.rem || 0) + (r.awake || 0) || r.asleep; }) || 480;
    var top = Math.ceil(Math.max(540, max) / 120) * 120, y = d3.scaleLinear().domain([0, top]).range([B, T]);
    yAxis(f.svg, y, L, R, d3.range(0, top + 1, 120), function (t) { return t / 60 + "h"; });
    var stages = [["deep", css("--r1")], ["core", css("--r2")], ["rem", css("--r3")], ["awake", css("--c8")]];
    var bw = Math.min(28, x.bandwidth());
    rows.forEach(function (r) {
      var cx = x(r.n) + (x.bandwidth() - bw) / 2, acc = 0, parts = r.staged ? stages : [["asleep", css("--r2")]];
      parts.forEach(function (p, i) {
        var v = Number(r[p[0]] || 0); if (!v) return;
        var y1 = y(acc + v), h = y(acc) - y1 - (i ? 2 : 0);
        f.svg.append("rect").attr("x", cx).attr("y", y1).attr("width", bw).attr("height", Math.max(1, h)).attr("rx", acc + v >= (r.staged ? (r.deep + r.core + r.rem + (r.awake || 0)) : r.asleep) ? 3 : 0).attr("fill", p[1]);
        acc += v;
      });
      var hit = f.svg.append("rect").attr("x", x(r.n)).attr("y", T).attr("width", x.bandwidth()).attr("height", B - T).attr("fill", "transparent").style("cursor", "default");
      hit.on("mousemove", function (ev) { showTip(host, ev, [md(r.n) + " · " + hm(r.asleep).trim() + " asleep", r.staged ? "Deep " + hm(r.deep) + " · Core " + hm(r.core) : "No stage data", r.staged ? "REM " + hm(r.rem) + (r.awake ? " · Awake " + hm(r.awake) : "") : ""]); })
        .on("mouseleave", function () { hideTip(host); });
    });
    xLabels(f.svg, days, x, B, Math.ceil(days.length / Math.max(2, Math.floor((R - L) / 56))));
    f.svg.attr("aria-label", "Sleep per night by stage");
  }

  /* ---------- steps ---------- */
  function renderSteps(D) {
    var host = $("#hlSteps"); host.textContent = "";
    var rows = bucket(D.daily || [], "steps", "sum").filter(function (r) { return true; });
    var withVal = rows.filter(function (r) { return r.v != null; });
    $("#hlStepsNote").textContent = rows.length && rows[0].weekly ? "Daily average per week" : "Per day";
    if (!withVal.length) { host.appendChild(el("div", "hl-empty", "No steps recorded in this range.")); return; }
    var f = frame(host, 200), L = 44, R = f.W - 8, T = 8, B = 170;
    var days = rows.map(function (r) { return r.d; });
    var x = d3.scaleBand().domain(days).range([L, R]).paddingInner(0.2);
    var y = d3.scaleLinear().domain([0, Math.max(10000, d3.max(withVal, function (r) { return r.v; }))]).nice().range([B, T]);
    yAxis(f.svg, y, L, R, 4, function (t) { return t >= 1000 ? t / 1000 + "k" : t; });
    var bw = Math.max(1, Math.min(18, x.bandwidth())), col = css("--c1");
    rows.forEach(function (r) {
      if (r.v == null) return;
      f.svg.append("rect").attr("x", x(r.d) + (x.bandwidth() - bw) / 2).attr("y", y(r.v)).attr("width", bw).attr("height", Math.max(1, B - y(r.v))).attr("rx", Math.min(3, bw / 2)).attr("fill", col);
      f.svg.append("rect").attr("x", x(r.d)).attr("y", T).attr("width", x.bandwidth()).attr("height", B - T).attr("fill", "transparent")
        .on("mousemove", function (ev) { showTip(host, ev, [(r.weekly ? "Week of " : "") + md(r.d), fmt(r.v) + (r.weekly ? " a day on average" : " steps")]); })
        .on("mouseleave", function () { hideTip(host); });
    });
    var mean = avg(withVal.map(function (r) { return r.v; }));
    f.svg.append("line").attr("x1", L).attr("x2", R).attr("y1", y(mean)).attr("y2", y(mean)).attr("stroke", css("--ink-3")).attr("stroke-dasharray", "4 4").attr("stroke-width", 1.25).attr("pointer-events", "none");
    f.svg.append("text").attr("x", L + 4).attr("y", y(mean) - 6).attr("text-anchor", "start").attr("stroke", css("--surface")).attr("stroke-width", 4).attr("paint-order", "stroke").attr("fill", css("--ink-2")).text("avg " + fmt(mean));
    xLabels(f.svg, days, x, B, Math.ceil(days.length / Math.max(2, Math.floor((R - L) / 56))));
    f.svg.attr("aria-label", "Steps over time");
  }

  /* ---------- resting heart rate ---------- */
  function renderRhr(D) {
    var host = $("#hlRhr"); host.textContent = "";
    var daily = D.daily || [], rows = bucket(daily, "rhr", "avg");
    var withVal = rows.filter(function (r) { return r.v != null; });
    var cov = $("#hlCov"); cov.textContent = "";
    var covRows = daily.length > 120 ? [] : daily;
    covRows.forEach(function (r) { var i = el("i", r.hr != null ? "on" : ""); i.title = md(r.d) + (r.hr != null ? ": watch data" : ": no watch data"); cov.appendChild(i); });
    $("#hlCovWrap").hidden = !covRows.length;
    if (!withVal.length) { host.appendChild(el("div", "hl-empty", "No resting heart rate in this range. It comes from the watch, so days it wasn't worn stay blank.")); return; }
    var f = frame(host, 200), L = 36, R = f.W - 8, T = 10, B = 170;
    var days = rows.map(function (r) { return r.d; });
    var x = d3.scaleBand().domain(days).range([L, R]);
    var lo = d3.min(withVal, function (r) { return r.v; }), hi = d3.max(withVal, function (r) { return r.v; });
    var y = d3.scaleLinear().domain([Math.floor((lo - 4) / 5) * 5, Math.ceil((hi + 4) / 5) * 5]).range([B, T]);
    yAxis(f.svg, y, L, R, 4);
    var col = css("--c2"), cx = function (d) { return x(d) + x.bandwidth() / 2; };
    // Break the line wherever a day is missing, so a gap never reads as a trend.
    var line = d3.line().defined(function (r) { return r.v != null; }).x(function (r) { return cx(r.d); }).y(function (r) { return y(r.v); });
    f.svg.append("path").datum(rows).attr("d", line).attr("fill", "none").attr("stroke", col).attr("stroke-width", 2).attr("stroke-linejoin", "round");
    withVal.forEach(function (r, i) {
      var isLast = i === withVal.length - 1;
      f.svg.append("circle").attr("cx", cx(r.d)).attr("cy", y(r.v)).attr("r", isLast ? 4.5 : 3).attr("fill", col).attr("stroke", css("--surface")).attr("stroke-width", 2);
      f.svg.append("circle").attr("cx", cx(r.d)).attr("cy", y(r.v)).attr("r", 12).attr("fill", "transparent")
        .on("mousemove", function (ev) { showTip(host, ev, [(r.weekly ? "Week of " : "") + md(r.d), Math.round(r.v) + " bpm resting"]); })
        .on("mouseleave", function () { hideTip(host); });
    });
    xLabels(f.svg, days, x, B, Math.ceil(days.length / Math.max(2, Math.floor((R - L) / 56))));
    f.svg.attr("aria-label", "Resting heart rate over time");
  }

  /* ---------- workouts ---------- */
  function renderWorkouts(D) {
    var box = $("#hlWo"); box.textContent = "";
    var w = (D.workouts || []).slice(0, 10);
    if (!w.length) { box.appendChild(el("li", "empty", "No workouts recorded in this range.")); return; }
    w.forEach(function (x) {
      var li = el("li"), d = new Date(x.s);
      li.appendChild(el("time", null, H.MON[d.getMonth()] + " " + d.getDate()));
      var n = el("div", "n", x.a);
      var bits = [H.hm(d)]; if (x.km) bits.push(Number(x.km).toFixed(1) + " km"); if (x.iron) bits.push("Iron session " + x.iron);
      n.appendChild(el("small", null, bits.join(" · "))); li.appendChild(n);
      li.appendChild(el("div", "k", Math.round(x.min) + " min" + (x.kcal ? " · " + Math.round(x.kcal) + " kcal" : "")));
      if (x.iron) { li.style.cursor = "pointer"; li.title = "Open in Iron"; li.addEventListener("click", function () { H.go("iron"); }); }
      box.appendChild(li);
    });
  }

  /* ---------- patterns ---------- */
  function renderPatterns(D) {
    var box = $("#hlPat"); box.textContent = "";
    var sleep = D.sleep || [], wdays = {};
    (D.workouts || []).forEach(function (x) { wdays[isoD(new Date(x.s))] = true; });
    // A night "follows a workout" when you trained the day before you woke up.
    var after = [], rest = [];
    sleep.forEach(function (r) { if (r.asleep == null) return; var prev = isoD(addDays(parseD(r.n), -1)); (wdays[prev] ? after : rest).push(r); });
    var need = 5;
    if (after.length < need || rest.length < need) {
      var e = el("div", "hl-empty");
      e.appendChild(el("b", null, "Sleep after training days"));
      e.appendChild(document.createTextNode("This fills in once there are at least " + need + " watch-worn nights after a workout and " + need + " without. So far: " + after.length + " and " + rest.length + ". The Garmin history should get you there."));
      box.appendChild(e); return;
    }
    var rowsDef = [["Asleep", "asleep"], ["Deep", "deep"], ["REM", "rem"]];
    var max = 0, vals = rowsDef.map(function (rd) { var a = avg(after.map(function (r) { return r[rd[1]]; })), b = avg(rest.map(function (r) { return r[rd[1]]; })); max = Math.max(max, a || 0, b || 0); return [rd[0], a, b]; });
    box.appendChild(el("p", "fine", "Average night after a training day (" + after.length + " nights) next to every other night (" + rest.length + "). A pattern, not a cause."));
    vals.forEach(function (v) {
      [["After training", v[1], css("--c1")], ["Other nights", v[2], css("--c8")]].forEach(function (s, i) {
        var row = el("div", "row"); row.appendChild(el("span", null, (i ? "" : v[0] + " · ") + s[0]));
        row.appendChild(el("b", null, hm(s[1]).trim()));
        var tr = el("div", "tr"), bar = el("i"); bar.style.width = (s[1] / max * 100) + "%"; bar.style.background = s[2]; tr.appendChild(bar); row.appendChild(tr);
        box.appendChild(row);
      });
    });
  }

  function render() {
    var D = st.data; if (!D) return;
    var first = D.bounds && D.bounds.first, syncTxt = D.synced ? "Last synced " + H.ago(D.synced) : "Not synced yet";
    $("#hlSub").textContent = (first ? "Apple Health since " + md(first) + ", " + parseD(first).getFullYear() + ". " : "") + syncTxt + ". Say “sync health” to Claude on your phone to update.";
    renderTiles(D); renderSleep(D); renderSteps(D); renderRhr(D); renderWorkouts(D); renderPatterns(D);
  }
  function syncSeg() { root.querySelectorAll(".hl-bar .seg button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.r === st.range)); }); H.store("health-range", st.range); }

  window.HubApps.health = {
    mount: function (host, ctx) {
      H = ctx.hub; root = host;
      var style = document.createElement("style"); style.textContent = CSS; document.head.appendChild(style);
      host.innerHTML =
        '<div class="hl-bar"><h2>Health</h2><div class="seg" role="group" aria-label="Range">' +
        RANGES.map(function (r) { return '<button type="button" data-r="' + r[0] + '">' + r[1] + '</button>'; }).join("") + '</div></div>' +
        '<p class="hl-sub" id="hlSub">Loading your health data</p>' +
        '<article class="panel" style="margin-bottom:16px"><div class="panel-head"><h3>Weekly patterns</h3><span class="label">Updated Sundays</span></div><div id="hlIns"></div></article>' +
        '<div id="hlBody">' +
        '<div class="hl-tiles" id="hlTiles"></div>' +
        '<div class="hl-grid"><article class="panel"><div class="panel-head"><h3>Sleep</h3><span class="label">Hours asleep per night</span></div>' +
        '<div class="hl-key" id="hlSleepKey"><span><i style="background:var(--r1)"></i>Deep</span><span><i style="background:var(--r2)"></i>Core</span><span><i style="background:var(--r3)"></i>REM</span><span><i style="background:var(--c8)"></i>Awake</span></div>' +
        '<div class="hl-plot" id="hlSleep"></div></article></div>' +
        '<div class="hl-grid two"><article class="panel"><div class="panel-head"><h3>Steps</h3><span class="label" id="hlStepsNote">Per day</span></div><div class="hl-plot" id="hlSteps"></div></article>' +
        '<article class="panel"><div class="panel-head"><h3>Resting heart rate</h3><span class="label">bpm, watch days only</span></div><div class="hl-plot" id="hlRhr"></div>' +
        '<div id="hlCovWrap"><div class="label" style="margin-top:10px">Days with watch data</div><div class="hl-cov" id="hlCov"></div></div></article></div>' +
        '<div class="hl-grid two"><article class="panel"><div class="panel-head"><h3>Workouts</h3><a class="label" href="#iron">Open Iron</a></div><ul class="hl-wo" id="hlWo"></ul></article>' +
        '<article class="panel"><div class="panel-head"><h3>Patterns</h3><span class="label">Sleep vs training</span></div><div class="hl-pat" id="hlPat"></div></article></div>' +
        '</div>';
      st.range = H.store("health-range") || "30";
      host.querySelectorAll(".hl-bar .seg button").forEach(function (b) { b.addEventListener("click", function () { st.range = b.dataset.r; syncSeg(); load(false); }); });
      H.on("refresh", function () { if (!host.hidden) load(true); else st.stale = true; });
      var rz, lastW = 0;
      window.addEventListener("resize", function () { clearTimeout(rz); rz = setTimeout(function () { if (!host.hidden && host.clientWidth !== lastW) { lastW = host.clientWidth; render(); } }, 150); });
      syncSeg(); load(false);
      H.insights(host.querySelector("#hlIns"), "health");
    },
    shown: function () { if (st.stale) { st.stale = false; load(false); } else render(); }
  };
})();
