/* People view for What's on Tap: relationship graph with companies, person and company records, review queue. */
(function () {
  "use strict";
  window.HubApps = window.HubApps || {};
  var CSS = [
    ".pp-bar{display:flex;align-items:center;justify-content:space-between;gap:10px 16px;flex-wrap:wrap;margin-bottom:16px}",
    ".pp-bar h2{font-family:var(--display);font-size:28px;font-weight:700;margin:0;letter-spacing:-.01em}",
    ".seg{display:inline-flex;border:1px solid var(--line);border-radius:8px;overflow:hidden;background:var(--surface)}",
    ".seg button{border:0;background:none;padding:6px 12px;min-height:34px;font-size:13px;font-weight:600;color:var(--ink-3);cursor:pointer}",
    ".seg button[aria-pressed=true]{background:var(--accent);color:var(--accent-ink)}",
    ".seg .cnt{font-family:var(--mono);font-size:11px;margin-left:5px}",
    ".pp-grid{display:grid;gap:16px;grid-template-columns:minmax(0,1fr)}",
    "@media(min-width:900px){.pp-grid{grid-template-columns:minmax(0,1fr) 340px}}",
    ".gtools{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:10px}",
    ".search{position:relative;flex:1 1 220px;min-width:0}",
    ".search input{width:100%;border:1px solid var(--line);background:var(--surface);border-radius:8px;padding:8px 12px;min-height:38px;font-size:16px}",
    ".results{position:absolute;left:0;right:0;top:calc(100% + 4px);background:var(--surface);border:1px solid var(--line);border-radius:8px;z-index:6;max-height:280px;overflow:auto;box-shadow:0 8px 24px rgba(0,0,0,.12)}",
    ".results button{display:flex;justify-content:space-between;gap:10px;width:100%;text-align:left;border:0;background:none;padding:8px 12px;cursor:pointer;font-size:14px}",
    ".results button:hover{background:var(--surface-2)}",
    ".results small{color:var(--ink-3)}",
    ".graph-wrap{position:relative;height:560px;border-radius:10px;background:var(--surface-2);overflow:hidden}",
    "@media(max-width:700px){.graph-wrap{height:440px}}",
    ".graph-wrap svg{width:100%;height:100%;display:block;touch-action:none;cursor:grab}",
    ".rec-key{display:flex;gap:12px;flex-wrap:wrap;font-size:12px;color:var(--ink-2);margin-top:10px}",
    ".rec-key span{display:inline-flex;align-items:center;gap:6px}",
    ".rec-key i{width:10px;height:10px;border-radius:50%;display:inline-block}",
    ".rec-key i.sq{border-radius:3px;background:var(--surface);border:2px solid var(--accent)}",
    ".node-label{font-family:var(--body);font-size:11px;fill:var(--ink-2);pointer-events:none;paint-order:stroke;stroke:var(--surface-2);stroke-width:3px}",
    ".node-label.co{font-weight:600;fill:var(--ink)}",
    ".rec h3{font-family:var(--display);font-size:22px;margin:0;line-height:1.15;overflow-wrap:anywhere}",
    ".rec .meta{font-size:13px;color:var(--ink-2);margin-top:4px;overflow-wrap:anywhere}",
    ".rec .summary{font-size:14px;margin:10px 0 0}",
    ".rec .pills{display:flex;gap:6px;flex-wrap:wrap;margin-top:10px}",
    ".rec .pill2{font-size:12px;border-radius:999px;padding:2px 9px;background:var(--surface-2);color:var(--ink-2);border:0}",
    ".rec button.pill2{cursor:pointer;background:var(--accent-soft);color:var(--accent);font-weight:600}",
    ".rec .stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-top:14px}",
    ".rec .stats div{background:var(--surface-2);border-radius:8px;padding:8px 10px}",
    ".rec .stats b{display:block;font-family:var(--display);font-size:20px}",
    ".rec .stats span{font-size:11px;color:var(--ink-3)}",
    ".rec h4{margin:16px 0 6px;font-family:var(--mono);font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-3);font-weight:500}",
    ".hist{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:6px;max-height:280px;overflow:auto}",
    ".hist li{display:grid;grid-template-columns:78px minmax(0,1fr);gap:8px;font-size:13px}",
    ".hist time{font-family:var(--mono);font-size:12px;color:var(--ink-3)}",
    ".hist span{overflow-wrap:anywhere}",
    ".rec a{color:var(--accent)}",
    ".queue{display:flex;flex-direction:column;gap:12px;max-width:760px}",
    ".item{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:14px 16px;display:flex;flex-direction:column;gap:10px}",
    ".item .k{font-family:var(--mono);font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--accent)}",
    ".item .q{font-size:15px;font-weight:500;overflow-wrap:anywhere}",
    ".item .d{font-size:13px;color:var(--ink-3);overflow-wrap:anywhere}",
    ".item .acts{display:flex;gap:8px;flex-wrap:wrap}",
    ".done{border:1px dashed var(--line);border-radius:12px;padding:24px 16px;color:var(--ink-3)}"
  ].join("\n");
  var REL = [["all", "Everyone"], ["close", "Friends & family"], ["professional", "Work & network"], ["vendor", "Vendors"], ["provider", "Providers"]];
  var H, root, sim = null, st = { tab: "graph", rel: "all", graph: null, review: null, sel: null };
  function el(t, c, x) { return H.el(t, c, x); }
  function $(id) { return root.querySelector("#" + id); }
  function priv() { return !H.hide; }
  function recency(last) { if (!last) return "--r4"; var d = (Date.now() - new Date(last)) / 86400000; return d <= 30 ? "--r1" : d <= 90 ? "--r2" : d <= 365 ? "--r3" : "--r4"; }
  function relMatch(n) {
    if (st.rel === "all") return true;
    if (st.rel === "close") return ["partner", "family", "friend", "pet"].indexOf(n.rel) > -1;
    if (st.rel === "professional") return ["professional", "colleague", "recruiter"].indexOf(n.rel) > -1;
    return n.rel === st.rel;
  }

  /* ---------- data ---------- */
  function loadGraph(fresh) {
    return H.sql("select crm.dashboard_graph(730,260," + priv() + ") as d", false, fresh).then(function (d) { st.graph = d; renderGraph(); renderLists(); })
      .catch(function (e) { $("graph").textContent = ""; $("graph").appendChild(el("div", "err", H.errText(e))); });
  }
  function loadReview(fresh) {
    return H.sql("select crm.dashboard_review(12) as d", false, fresh).then(function (d) { st.review = d; renderReview(); })
      .catch(function (e) { $("queue").textContent = ""; $("queue").appendChild(el("div", "err", H.errText(e))); });
  }

  /* ---------- graph ---------- */
  function renderRels() {
    var box = $("rels"); box.textContent = "";
    REL.forEach(function (r) {
      if (r[0] === "provider" && !priv()) return;
      var b = el("button", "chip", r[1]); b.type = "button"; b.setAttribute("aria-pressed", String(st.rel === r[0]));
      b.addEventListener("click", function () { st.rel = r[0]; renderRels(); renderGraph(); });
      box.appendChild(b);
    });
  }
  function renderGraph() {
    var g = st.graph, box = $("graph"); if (!g) return;
    box.textContent = ""; if (sim) sim.stop();
    var nodes = (g.nodes || []).filter(relMatch).map(function (n) { return Object.assign({ kind: "p" }, n); });
    var ids = {}; nodes.forEach(function (n) { ids[n.id] = n; });
    var links = (g.edges || []).filter(function (e) { return ids[e.a] && ids[e.b]; }).map(function (e) { return { source: e.a, target: e.b, w: e.w, kind: "co" }; });
    (g.companies || []).forEach(function (c) {
      var mem = (c.ids || []).filter(function (id) { return ids[id]; }); if (!mem.length) return;
      var cid = "c:" + c.id; nodes.push({ id: cid, kind: "c", cid: c.id, name: c.name, size: mem.length, industry: c.industry });
      mem.forEach(function (id) { links.push({ source: cid, target: id, w: 1, kind: "works" }); });
    });
    var W = box.clientWidth || 700, Hh = box.clientHeight || 520;
    nodes.forEach(function (n, i) { var a = i * 2.4, rr = 12 * Math.sqrt(i + 1); n.x = W / 2 + rr * Math.cos(a); n.y = Hh / 2 + rr * Math.sin(a); });
    var svg = d3.select(box).append("svg").attr("viewBox", [0, 0, W, Hh]).attr("role", "img").attr("aria-label", "Relationship graph");
    var layer = svg.append("g");
    svg.call(d3.zoom().scaleExtent([0.4, 4]).on("zoom", function (ev) { layer.attr("transform", ev.transform); }));
    function r(n) { return n.kind === "c" ? Math.min(14, 6 + n.size * 1.5) : Math.min(22, 4 + Math.sqrt(n.total || 1) * 2.4); }
    var link = layer.append("g").selectAll("line").data(links).join("line")
      .attr("stroke", function (l) { return l.kind === "works" ? "var(--hub)" : "var(--axis)"; })
      .attr("stroke-width", function (l) { return l.kind === "works" ? 1.2 : Math.min(4, 1 + Math.log2(l.w)); })
      .attr("stroke-dasharray", function (l) { return l.kind === "works" ? "3 3" : null; });
    var node = layer.append("g").selectAll("g").data(nodes).join("g").style("cursor", "pointer")
      .on("click", function (ev, n) { if (n.kind === "c") openCompany(n.cid); else openPerson(n.id); })
      .call(d3.drag().on("start", function (ev, n) { if (!ev.active) sim.alphaTarget(0.2).restart(); n.fx = n.x; n.fy = n.y; })
        .on("drag", function (ev, n) { n.fx = ev.x; n.fy = ev.y; }).on("end", function (ev, n) { if (!ev.active) sim.alphaTarget(0); n.fx = null; n.fy = null; }));
    node.filter(function (n) { return n.kind === "c"; }).append("rect")
      .attr("x", function (n) { return -r(n); }).attr("y", function (n) { return -r(n); }).attr("width", function (n) { return 2 * r(n); }).attr("height", function (n) { return 2 * r(n); })
      .attr("rx", 4).attr("fill", "var(--surface)").attr("stroke", "var(--accent)").attr("stroke-width", 2);
    node.filter(function (n) { return n.kind === "p"; }).append("circle").attr("r", r)
      .attr("fill", function (n) { return "var(" + recency(n.last) + ")"; }).attr("stroke", "var(--surface-2)").attr("stroke-width", 2);
    node.append("title").text(function (n) { return n.kind === "c" ? n.name + (n.industry ? " · " + n.industry : "") + " · " + n.size + (n.size === 1 ? " person" : " people") : n.name + (n.company ? " · " + n.company : "") + " · " + n.total + " touches · last " + H.ago(n.last); });
    node.filter(function (n) { return n.kind === "c" ? n.size >= 2 : n.total >= 3; }).append("text").attr("class", function (n) { return "node-label" + (n.kind === "c" ? " co" : ""); })
      .attr("x", function (n) { return r(n) + 4; }).attr("y", 4).text(function (n) { return n.name; });
    sim = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(function (n) { return n.id; }).distance(function (l) { return l.kind === "works" ? 36 : 60; }).strength(function (l) { return l.kind === "works" ? 0.6 : Math.min(1, 0.2 + l.w * 0.15); }))
      .force("charge", d3.forceManyBody().strength(function (n) { return n.kind === "c" ? -90 : -60 - r(n) * 4; }))
      .force("x", d3.forceX(W / 2).strength(0.06)).force("y", d3.forceY(Hh / 2).strength(0.08))
      .force("collide", d3.forceCollide().radius(function (n) { return r(n) + 3; }))
      .on("tick", function () {
        link.attr("x1", function (l) { return l.source.x; }).attr("y1", function (l) { return l.source.y; }).attr("x2", function (l) { return l.target.x; }).attr("y2", function (l) { return l.target.y; });
        node.attr("transform", function (n) { return "translate(" + n.x + "," + n.y + ")"; });
      });
    if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) { sim.stop(); for (var i = 0; i < 250; i++) sim.tick(); sim.on("tick")(); }
    var k = $("recKey"); k.textContent = "";
    [["--r1", "Last 30 days"], ["--r2", "Last 90 days"], ["--r3", "Last year"], ["--r4", "Older"]].forEach(function (x) { var s = el("span"), i = el("i"); i.style.background = "var(" + x[0] + ")"; s.appendChild(i); s.appendChild(document.createTextNode(x[1])); k.appendChild(s); });
    var s2 = el("span"), sq = el("i", "sq"); s2.appendChild(sq); s2.appendChild(document.createTextNode("Company")); k.appendChild(s2);
  }
  function listInto(box, items, meta, empty) {
    box.textContent = "";
    (items || []).slice(0, 8).forEach(function (x) {
      var li = el("li"), b = el("button", "linkish", x.name); b.type = "button";
      b.addEventListener("click", function () { openPerson(x.id); }); li.appendChild(b); li.appendChild(el("span", "muted", meta(x))); box.appendChild(li);
    });
    if (!(items || []).length) box.appendChild(el("li", "muted", empty));
  }
  function renderLists() {
    var g = st.graph; if (!g) return;
    listInto($("cold"), g.cold, function (x) { return H.ago(x.last); }, "Nobody is going cold.");
    listInto($("newp"), g["new"], function (x) { return H.fmtDate(x.first); }, "No new people this month.");
    $("ppCount").textContent = (g.counts.people || 0) + " people · " + (g.counts.companies || 0) + " companies";
  }

  /* ---------- records ---------- */
  function hist(list) {
    var h = el("ul", "hist");
    (list || []).forEach(function (r) { var li = el("li"); li.appendChild(el("time", null, H.fmtDate(r.at, true).replace(/, (\d\d)(\d\d)$/, " '$2"))); li.appendChild(el("span", null, (r.label || "(no title)") + (r.ch === "email" ? " · email" : "") + (r.who ? " · " + r.who : ""))); h.appendChild(li); });
    if (!(list || []).length) h.appendChild(el("li", "muted", "No history yet."));
    return h;
  }
  function openPerson(id) {
    if (!/^[0-9a-f-]{36}$/i.test(String(id))) return;
    st.sel = { person: id }; showTab("graph");
    var box = $("record"); box.textContent = ""; box.appendChild(el("div", "empty", "Loading…"));
    H.sql("select crm.person_detail('" + id + "'," + priv() + ") as d").then(function (d) {
      box.textContent = "";
      var p = d.person || {}, s = d.summary || {};
      box.appendChild(el("h3", null, p.name || "Unknown"));
      if (p.title) box.appendChild(el("div", "meta", p.title));
      var pills = el("div", "pills");
      if (p.company_id) { var cb = el("button", "pill2", p.company); cb.type = "button"; cb.addEventListener("click", function () { openCompany(p.company_id); }); pills.appendChild(cb); }
      else if (p.company) pills.appendChild(el("span", "pill2", p.company));
      [p.rel, p.circle].concat(s.channels || []).filter(Boolean).forEach(function (x) { pills.appendChild(el("span", "pill2", String(x).replace(/_/g, " "))); });
      if (p.birthday) { var bd = p.birthday.split("-"); pills.appendChild(el("span", "pill2", "Birthday " + H.MON[+bd[0] - 1] + " " + (+bd[1]))); }
      if ((d.emails || []).length) pills.appendChild(el("span", "pill2", d.emails[0]));
      box.appendChild(pills);
      if (p.notes) box.appendChild(el("p", "summary", p.notes));
      var stt = el("div", "stats");
      [[s.total || 0, "touches"], [s.n90 || 0, "last 90 days"], [H.ago(s.last_at), "last touch"]].forEach(function (x) { var c = el("div"); c.appendChild(el("b", null, String(x[0]))); c.appendChild(el("span", null, x[1])); stt.appendChild(c); });
      box.appendChild(stt);
      if ((d.promises || []).length) {
        box.appendChild(el("h4", null, "You promised"));
        var ul = el("ul", "rows");
        d.promises.forEach(function (pr) { var li = el("li"), m = el("div", "main"); m.appendChild(el("b", null, pr.text)); var dl = H.dueLabel(pr.due); if (dl.t) m.appendChild(el("span", dl.c, dl.t)); li.appendChild(m); ul.appendChild(li); });
        box.appendChild(ul);
      }
      box.appendChild(el("h4", null, "History"));
      box.appendChild(hist(d.recent));
    }).catch(function (e) { box.textContent = ""; box.appendChild(el("div", "err", H.errText(e))); });
  }
  function openCompany(id) {
    if (!/^[0-9a-f-]{36}$/i.test(String(id))) return;
    st.sel = { company: id }; showTab("graph");
    var box = $("record"); box.textContent = ""; box.appendChild(el("div", "empty", "Loading…"));
    H.sql("select crm.company_detail('" + id + "'," + priv() + ") as d").then(function (d) {
      box.textContent = "";
      var c = d.company || {};
      box.appendChild(el("h3", null, c.name || "Company"));
      var meta = [c.industry, c.location].filter(Boolean).join(" · "); if (meta) box.appendChild(el("div", "meta", meta));
      if (c.summary) box.appendChild(el("p", "summary", c.summary));
      var pills = el("div", "pills");
      if (c.kind) pills.appendChild(el("span", "pill2", c.kind));
      if (c.website) { var a = el("a", "pill2", c.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")); a.href = c.website; a.target = "_blank"; a.rel = "noopener"; pills.appendChild(a); }
      box.appendChild(pills);
      box.appendChild(el("h4", null, "People"));
      var ul = el("ul", "rows");
      (d.people || []).forEach(function (p) {
        var li = el("li"), b = el("button", "linkish", p.name); b.type = "button"; b.addEventListener("click", function () { openPerson(p.id); });
        var m = el("div", "main"); m.appendChild(b); if (p.title) { var tt = el("span", null, p.title); tt.style.display = "block"; m.appendChild(tt); } li.appendChild(m);
        li.appendChild(el("span", "muted", H.ago(p.last))); ul.appendChild(li);
      });
      if (!(d.people || []).length) ul.appendChild(el("li", "muted", "Nobody linked yet."));
      box.appendChild(ul);
      box.appendChild(el("h4", null, "Recent"));
      box.appendChild(hist(d.recent));
      var src = (c.sources || []).length, r = el("p", "fine", c.researched_at ? "Researched " + H.fmtDate(c.researched_at, true) + (src ? " from " + src + (src === 1 ? " source" : " sources") : "") + ". Details are left blank when they couldn't be verified." : "Not researched yet.");
      box.appendChild(r);
    }).catch(function (e) { box.textContent = ""; box.appendChild(el("div", "err", H.errText(e))); });
  }

  /* ---------- search ---------- */
  function wireSearch() {
    var qt = null, input = $("q"), res = $("results");
    input.addEventListener("input", function () {
      clearTimeout(qt); var v = input.value.trim();
      if (v.length < 2) { res.hidden = true; return; }
      qt = setTimeout(function () {
        H.sql("select crm.search_people('" + H.q(v) + "', 14) as d").then(function (list) {
          res.textContent = "";
          (list || []).forEach(function (p) {
            var b = el("button"); b.type = "button"; b.appendChild(el("span", null, p.name)); b.appendChild(el("small", null, p.type === "company" ? "Company" + (p.company ? " · " + p.company : "") : (p.company || p.rel || "")));
            b.addEventListener("click", function () { res.hidden = true; input.value = ""; if (p.type === "company") openCompany(p.id); else openPerson(p.id); });
            res.appendChild(b);
          });
          if (!(list || []).length) res.appendChild(el("div", "empty", "No match."));
          res.hidden = false;
        }).catch(function () { res.hidden = true; });
      }, 250);
    });
    document.addEventListener("click", function (ev) { if (!root.contains(ev.target) || !ev.target.closest(".search")) res.hidden = true; });
  }

  /* ---------- review ---------- */
  function renderReview() {
    var r = st.review; if (!r) return;
    $("rcnt").textContent = r.open ? String(r.open) : "";
    var box = $("queue"); box.textContent = "";
    if (!(r.items || []).length) { box.appendChild(el("div", "done", "All caught up. New questions show up here after each weekly sync.")); return; }
    r.items.forEach(function (it) { box.appendChild(item(it, r.categories || [])); });
  }
  function act(label, cls, id, payload, card) {
    var b = el("button", "btn " + (cls || ""), label); b.type = "button";
    b.addEventListener("click", function () {
      card.querySelectorAll("button").forEach(function (x) { x.disabled = true; });
      H.sql("select crm.resolve_review(" + Number(id) + ", '" + H.q(JSON.stringify(payload)) + "'::jsonb) as d", true).then(function () {
        card.remove(); st.review.open = Math.max(0, st.review.open - 1); st.review.items = st.review.items.filter(function (x) { return x.id !== id; });
        $("rcnt").textContent = st.review.open ? String(st.review.open) : "";
        if (!st.review.items.length) loadReview(true);
        st.graphStale = true;
      }).catch(function (e) { card.querySelectorAll("button").forEach(function (x) { x.disabled = false; }); H.notice(e); });
    });
    return b;
  }
  function item(it, cats) {
    var p = it.payload || {}, card = el("div", "item"), acts = el("div", "acts");
    var when = p.start ? H.fmtDate(p.start, true) : "";
    if (it.kind === "uncertain_category") {
      card.appendChild(el("span", "k", "Pick a category")); card.appendChild(el("span", "q", p.title || "Event")); card.appendChild(el("span", "d", when + (p.why ? ". " + p.why : "")));
      cats.forEach(function (c) { acts.appendChild(act(c.label, c.slug === p.suggested ? "primary" : "", it.id, { action: "resolve", category: c.slug }, card)); });
      acts.appendChild(act("Not my time", "ghost", it.id, { action: "resolve", exclude: true }, card));
    } else if (it.kind === "new_category") {
      card.appendChild(el("span", "k", "New category?")); card.appendChild(el("span", "q", "Add “" + p.label + "”"));
      card.appendChild(el("span", "d", (p.description || "") + ". It would hold " + (p.refs || []).length + " events now filed under Other, like " + (p.examples || []).slice(0, 3).join(", ") + "."));
      acts.appendChild(act("Add category", "primary", it.id, { action: "approve" }, card)); acts.appendChild(act("Not now", "ghost", it.id, { action: "dismiss" }, card));
    } else if (it.kind === "merge_candidate") {
      card.appendChild(el("span", "k", "Same person?")); card.appendChild(el("span", "q", p.keep_name + " and " + p.drop_name)); if (p.why) card.appendChild(el("span", "d", p.why));
      acts.appendChild(act("Merge them", "primary", it.id, { action: "merge" }, card)); acts.appendChild(act("Different people", "ghost", it.id, { action: "dismiss" }, card));
    } else if (it.kind === "birthday") {
      var md = (p.md || "").split("-");
      card.appendChild(el("span", "k", "Whose birthday?")); card.appendChild(el("span", "q", p.title || "Birthday"));
      card.appendChild(el("span", "d", md.length === 2 ? "Repeats every " + H.MON[+md[0] - 1] + " " + (+md[1]) + "." : ""));
      if (p.name) acts.appendChild(act("Add " + p.name, "primary", it.id, { action: "create", relationship: "friend" }, card));
      acts.appendChild(act("Not a person", "ghost", it.id, { action: "dismiss" }, card));
    } else if (it.kind === "company") {
      card.appendChild(el("span", "k", "Company update")); card.appendChild(el("span", "q", p.name || "Company")); card.appendChild(el("span", "d", p.change || ""));
      acts.appendChild(act("Apply", "primary", it.id, { action: "apply" }, card)); acts.appendChild(act("Ignore", "ghost", it.id, { action: "dismiss" }, card));
    } else {
      card.appendChild(el("span", "k", String(it.kind).replace(/_/g, " "))); card.appendChild(el("span", "q", p.title || p.name || "Needs a look"));
      acts.appendChild(act("Dismiss", "ghost", it.id, { action: "dismiss" }, card));
    }
    card.appendChild(acts); return card;
  }

  /* ---------- shell ---------- */
  function showTab(t) {
    st.tab = t;
    $("pg-graph").hidden = t !== "graph"; $("pg-review").hidden = t !== "review";
    root.querySelectorAll(".seg button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.t === t)); });
    if (t === "graph" && !st.graph) loadGraph(false); else if (t === "graph" && st.graphStale) { st.graphStale = false; loadGraph(true); }
  }
  function open(arg) { if (!arg) return; if (arg.person) openPerson(arg.person); else if (arg.company) openCompany(arg.company); }

  window.HubApps.people = {
    mount: function (host, ctx) {
      H = ctx.hub; root = host;
      var style = document.createElement("style"); style.textContent = CSS; document.head.appendChild(style);
      host.innerHTML = '<div class="pp-bar"><h2>People</h2><div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap"><span class="label" id="ppCount"></span>' +
        '<div class="seg" role="group" aria-label="People view"><button type="button" data-t="graph" aria-pressed="true">Graph</button><button type="button" data-t="review">Review<span class="cnt" id="rcnt"></span></button></div></div></div>' +
        '<div id="pg-graph"><div class="pp-grid"><article class="panel"><div class="gtools"><div class="search"><label for="q" hidden>Search people and companies</label>' +
        '<input id="q" type="search" placeholder="Search people and companies" autocomplete="off"><div class="results" id="results" hidden></div></div><div class="chips" id="rels" role="group" aria-label="Relationship"></div></div>' +
        '<div class="graph-wrap" id="graph"><div class="empty" style="padding:16px">Loading your network</div></div><div class="rec-key" id="recKey"></div>' +
        '<p class="fine">Circle size is how often you interact and color is how recently. Squares are companies, with dashed lines to the people there. Solid lines join people who shared meetings or threads. Drag to rearrange; tap anything for its record.</p></article>' +
        '<aside class="grid" style="align-content:start"><article class="panel rec" id="record"><div class="empty">Tap a person or company in the graph, or search.</div></article>' +
        '<article class="panel"><div class="panel-head"><h3>Going cold</h3><span class="label">No touch in 90+ days</span></div><ul class="rows" id="cold"></ul></article>' +
        '<article class="panel"><div class="panel-head"><h3>New this month</h3></div><ul class="rows" id="newp"></ul></article></aside></div></div>' +
        '<div id="pg-review" hidden><p class="fine" style="margin:0 0 14px">A few calls Claude couldn’t make alone. Each answer teaches the next sync.</p><div class="queue" id="queue"></div></div>';
      host.querySelectorAll(".seg button").forEach(function (b) { b.addEventListener("click", function () { showTab(b.dataset.t); }); });
      renderRels(); wireSearch();
      H.on("hide", function () { st.graph = null; renderRels(); if (!host.hidden && st.tab === "graph") loadGraph(false); var r = $("record"); r.textContent = ""; r.appendChild(el("div", "empty", "Tap a person or company in the graph, or search.")); });
      H.on("refresh", function () { st.graph = null; if (!host.hidden && st.tab === "graph") loadGraph(true); loadReview(true); });
      var rz = null; window.addEventListener("resize", function () { clearTimeout(rz); rz = setTimeout(function () { if (!host.hidden && st.tab === "graph") renderGraph(); }, 250); });
      loadGraph(false); loadReview(false);
    },
    shown: function () { if (st.tab === "graph" && (!st.graph || st.graphStale)) { st.graphStale = false; loadGraph(!!st.graph); } },
    open: open
  };
})();
