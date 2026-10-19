/* Supabase Tracker, mounted inside What's on Tap (ported from the standalone artifact). */
(function () {
  "use strict";
  window.HubApps = window.HubApps || {};
  var CSS = ":host { --muted: var(--ink-3); --track: var(--surface-2); --crit: var(--now);\n  --good-wash: color-mix(in srgb, var(--good) 14%, var(--surface)); --warn-wash: color-mix(in srgb, var(--warn) 18%, var(--surface));\n  --crit-wash: color-mix(in srgb, var(--now) 16%, var(--surface)); --info-wash: var(--surface-2);\n  --font-body: var(--body); --font-head: var(--display); --font-data: var(--mono); }\n[hidden] { display: none !important; }\n\n/* Layout: an instrument panel. Quota gauges first, then what fills the database, then the table ledger, then advisor findings. */\n\n\n\n\n* { box-sizing: border-box; }\n:host { display: block; color: var(--ink); font-family: var(--font-body); font-size: 15px; line-height: 1.45; }\n.wrap { max-width: 1040px; margin-inline: auto; padding-inline: 20px; padding-block: 28px 56px; display: grid; gap: 36px; }\n.num { font-family: var(--font-data); font-variant-numeric: tabular-nums; }\na { color: var(--accent); }\n:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }\n\n/* Header */\n.top { display: flex; flex-wrap: wrap; gap: 16px 24px; align-items: flex-end; justify-content: space-between; }\n.top > div { min-width: 0; }\nh1 { font-family: var(--font-head); font-weight: 600; font-size: 30px; line-height: 1.1; margin: 0 0 6px; letter-spacing: -0.01em; text-wrap: balance; }\n.meta { display: flex; flex-wrap: wrap; gap: 4px 14px; color: var(--ink-2); font-size: 13px; }\n.meta span { white-space: nowrap; }\n.actions { display: flex; flex-wrap: wrap; align-items: center; gap: 10px 14px; }\n.stamp { color: var(--muted); font-size: 13px; }\nbutton.refresh { font: inherit; font-weight: 500; font-size: 14px; color: var(--accent-ink); background: var(--accent); border: 0; border-radius: 6px; padding: 8px 14px; cursor: pointer; }\nbutton.refresh:hover { filter: brightness(1.08); }\nbutton.refresh:disabled { opacity: 0.6; cursor: default; }\n\n/* Status pills: icon + label, never color alone */\n.pill { display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; font-weight: 500; padding: 3px 9px 3px 5px; border-radius: 999px; color: var(--ink); background: var(--info-wash); white-space: nowrap; }\n.pill i { font-style: normal; font-family: var(--font-data); font-size: 11px; line-height: 16px; width: 16px; height: 16px; border-radius: 50%; text-align: center; color: #fff; background: var(--muted); flex: none; }\n.pill.good { background: var(--good-wash); } .pill.good i { background: var(--good); }\n.pill.warn { background: var(--warn-wash); } .pill.warn i { background: var(--warn); color: #201600; }\n.pill.crit { background: var(--crit-wash); } .pill.crit i { background: var(--crit); }\n.pill.big { font-size: 14px; padding: 5px 12px 5px 6px; }\n.pill.big i { width: 20px; height: 20px; line-height: 20px; font-size: 13px; }\n\n/* Sections */\nsection { display: grid; gap: 14px; min-width: 0; }\nsection > * { min-width: 0; }\n#schemas, #tables { display: grid; gap: 14px; }\nh2 { font-family: var(--font-head); font-weight: 600; font-size: 13px; letter-spacing: 0.09em; text-transform: uppercase; color: var(--ink-2); margin: 0; padding-bottom: 8px; border-bottom: 1px solid var(--line); }\n.lede { margin: 0; color: var(--ink-2); max-width: 65ch; }\n.notice { margin: 0; padding: 10px 12px; border-radius: 6px; background: var(--warn-wash); color: var(--ink); font-size: 14px; max-width: 75ch; }\n.notice.page { background: var(--crit-wash); }\n.empty { color: var(--muted); margin: 0; }\n\n/* Quota gauges */\n.gauges { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px; }\n.gauge { background: var(--surface); border: 1px solid var(--line); border-radius: 8px; padding: 16px 18px 18px; display: grid; gap: 10px; min-width: 0; }\n.gauge header { display: flex; justify-content: space-between; align-items: center; gap: 8px; }\n.gauge h3 { margin: 0; font-size: 14px; font-weight: 500; color: var(--ink-2); }\n.gauge .figure { display: flex; align-items: baseline; flex-wrap: wrap; gap: 4px 8px; }\n.gauge .figure b { font-family: var(--font-data); font-weight: 500; font-size: 30px; line-height: 1; letter-spacing: -0.02em; }\n.gauge .figure span { color: var(--muted); font-size: 13.5px; }\n.bar { height: 8px; border-radius: 4px; background: var(--track); overflow: hidden; }\n.bar > div { height: 100%; min-width: 3px; background: var(--accent); border-radius: 4px; }\n.gauge .left { font-size: 13.5px; color: var(--ink-2); }\n\n/* Schema bars */\n.schemas { display: grid; gap: 12px; }\n.schema { display: grid; grid-template-columns: minmax(90px, 150px) minmax(0, 1fr) 84px; gap: 4px 14px; align-items: center; }\n.schema .name { font-family: var(--font-data); font-weight: 500; overflow-wrap: anywhere; }\n.schema .size { text-align: right; }\n.schema .sub { grid-column: 2 / 4; color: var(--muted); font-size: 13px; }\n.schema .bar { height: 12px; border-radius: 0 4px 4px 0; }\n.schema .bar > div { border-radius: 0 4px 4px 0; }\n.schema:hover .name { color: var(--accent); }\n\n/* Table ledger */\n.scroll { overflow-x: auto; border: 1px solid var(--line); border-radius: 8px; background: var(--surface); }\ntable { border-collapse: collapse; width: 100%; font-size: 13.5px; }\nth, td { padding: 9px 14px; text-align: left; white-space: nowrap; }\nth { font-weight: 500; color: var(--muted); font-size: 12.5px; border-bottom: 1px solid var(--line); }\ntd { border-bottom: 1px solid var(--line); }\ntr:last-child td { border-bottom: 0; }\ntbody tr:hover td { background: var(--track); }\nth.r, td.r { text-align: right; }\ntd.tname { font-family: var(--font-data); }\ntd.tname span { color: var(--muted); }\ntd .mini { display: inline-block; vertical-align: middle; width: 64px; height: 6px; margin-left: 10px; background: var(--track); border-radius: 0 3px 3px 0; overflow: hidden; }\ntd .mini > div { height: 100%; min-width: 2px; background: var(--accent); }\n\n/* Advisor findings */\n.health { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px 32px; }\n.health > div { display: grid; gap: 10px; align-content: start; min-width: 0; }\n.health h3 { margin: 0; font-size: 15px; font-weight: 600; }\n.finding { border: 1px solid var(--line); border-radius: 8px; background: var(--surface); }\n.finding summary { cursor: pointer; padding: 10px 12px; display: flex; flex-wrap: wrap; gap: 6px 10px; align-items: center; }\n.finding summary b { font-weight: 500; }\n.finding summary .count { margin-left: auto; color: var(--muted); font-size: 13px; }\n.finding .body { padding: 0 12px 12px; display: grid; gap: 8px; font-size: 13.5px; color: var(--ink-2); }\n.finding .body p { margin: 0; max-width: 65ch; }\n.finding ul { margin: 0; padding-left: 18px; font-family: var(--font-data); font-size: 12.5px; overflow-wrap: anywhere; }\n\n/* Project inventory */\n.inventory { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px 32px; }\n.inventory > div { min-width: 0; display: grid; gap: 6px; align-content: start; }\n.inventory h3 { margin: 0; font-size: 13px; font-weight: 500; color: var(--muted); }\n.inventory ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 4px; font-size: 13.5px; }\n.inventory li { display: flex; justify-content: space-between; gap: 12px; }\n.inventory li span:first-child { font-family: var(--font-data); overflow-wrap: anywhere; min-width: 0; }\n.inventory li span:last-child { color: var(--muted); white-space: nowrap; }\n.foot { color: var(--muted); font-size: 13px; margin: 0; max-width: 75ch; }\n\n@media (max-width: 520px) {\n  h1 { font-size: 25px; }\n  .schema { grid-template-columns: minmax(0, 1fr) 84px; }\n  .schema .bar { grid-column: 1 / 3; grid-row: 2; }\n  .schema .sub { grid-column: 1 / 3; }\n}\n@media (prefers-reduced-motion: no-preference) { .bar > div { transition: width 0.4s ease; } }\n\n.wrap { max-width: none; padding: 0; gap: 28px; }\nh1 { font-family: var(--display); font-weight: 700; font-size: 30px; }\nh2 { font-family: var(--mono); font-weight: 500; font-size: 11px; letter-spacing: .06em; color: var(--ink-3); }\n.gauge, .scroll, .finding { border-radius: 12px; }\nbutton.refresh { display: none; }\n";
  var HTML = "<div class=\"wrap\">\n  <div class=\"top\">\n    <div>\n      <h1>Supabase</h1>\n      <div class=\"meta\" id=\"meta\"><span>Loading project details\u2026</span></div>\n    </div>\n    <div class=\"actions\">\n      <span class=\"pill big\" id=\"overall\"><i>\u2026</i>Checking</span>\n      <span class=\"stamp\" id=\"stamp\">Not loaded yet</span>\n      <button class=\"refresh\" id=\"refresh\" type=\"button\">Refresh</button>\n    </div>\n  </div>\n\n  <p class=\"notice page\" id=\"pageNotice\" hidden></p>\n\n  <section aria-labelledby=\"h-quota\">\n    <h2 id=\"h-quota\">Quota</h2>\n    <div class=\"gauges\" id=\"gauges\"></div>\n  </section>\n\n  <section aria-labelledby=\"h-schemas\">\n    <h2 id=\"h-schemas\">What fills the database</h2>\n    <div id=\"schemas\"></div>\n  </section>\n\n  <section aria-labelledby=\"h-tables\">\n    <h2 id=\"h-tables\">Tables</h2>\n    <div id=\"tables\"></div>\n  </section>\n\n  <section aria-labelledby=\"h-health\">\n    <h2 id=\"h-health\">Schema health</h2>\n    <div class=\"health\">\n      <div><h3>Security</h3><div id=\"sec\" style=\"display:grid;gap:10px\"></div></div>\n      <div><h3>Performance</h3><div id=\"perf\" style=\"display:grid;gap:10px\"></div></div>\n    </div>\n  </section>\n\n  <section aria-labelledby=\"h-inv\">\n    <h2 id=\"h-inv\">Also in this project</h2>\n    <div class=\"inventory\" id=\"inventory\"></div>\n    <p class=\"foot\" id=\"foot\"></p>\n  </section>\n</div>";
  var api = window.HubApps.tracker = {
    mount: function (host, ctx) {
      if (host.shadowRoot) return;
      var root = host.attachShadow({ mode: "open" });
      root.innerHTML = "<style>" + CSS + "</style>" + HTML;
      var D = {
        getElementById: function (id) { return root.getElementById(id); },
        querySelector: function (s) { return root.querySelector(s); },
        querySelectorAll: function (s) { return root.querySelectorAll(s); },
        createElement: function (t) { return document.createElement(t); },
        createElementNS: function (a, b) { return document.createElementNS(a, b); },
        createTextNode: function (t) { return document.createTextNode(t); },
        addEventListener: function (a, b, c) { root.addEventListener(a, b, c); },
        body: root,
        documentElement: host
      };

      (function (document) {
(function () {
  "use strict";
  var SERVER = "Supabase";
  var PROJECT = "demo";
  var ORG = "demo";
  var MB = 1024 * 1024, GB = 1024 * MB;
  var PLANS = {
    free: { label: "Free plan", db: 500 * MB, storage: 1 * GB, pauses: true },
    pro: { label: "Pro plan", db: 8 * GB, storage: 100 * GB },
    team: { label: "Team plan", db: 8 * GB, storage: 100 * GB }
  };
  var SYSTEM_SCHEMAS = "'information_schema','auth','storage','realtime','_realtime','vault','supabase_migrations','supabase_functions','extensions','graphql','graphql_public','pgbouncer','net','cron','pgsodium','pgsodium_masks','_analytics','pgmq','pgtle'";
  var SQL =
    "with t as (" +
    " select n.nspname as schema, c.relname as name," +
    " pg_total_relation_size(c.oid) as bytes, pg_relation_size(c.oid) as heap_bytes, pg_indexes_size(c.oid) as index_bytes," +
    " c.relrowsecurity as rls," +
    " (select count(*) from pg_policy p where p.polrelid = c.oid) as policies," +
    " coalesce(s.n_dead_tup, 0) as dead," +
    " greatest(s.last_autoanalyze, s.last_analyze) as analyzed," +
    " (xpath('/row/c/text()', query_to_xml(format('select count(*) as c from %I.%I', n.nspname, c.relname), false, true, '')))[1]::text::bigint as rows" +
    " from pg_class c join pg_namespace n on n.oid = c.relnamespace" +
    " left join pg_stat_user_tables s on s.relid = c.oid" +
    " where c.relkind = 'r' and n.nspname !~ '^pg_' and n.nspname not in (" + SYSTEM_SCHEMAS + ")" +
    ") select json_build_object(" +
    " 'pg_version', current_setting('server_version')," +
    " 'db_bytes', pg_database_size(current_database())," +
    " 'connections', (select count(*) from pg_stat_activity where datname = current_database())," +
    " 'max_connections', current_setting('max_connections')::int," +
    " 'storage_bytes', (select coalesce(sum((metadata->>'size')::bigint), 0) from storage.objects)," +
    " 'buckets', (select count(*) from storage.buckets)," +
    " 'auth_users', (select count(*) from auth.users)," +
    " 'tables', (select coalesce(json_agg(t order by t.bytes desc), '[]'::json) from t)," +
    " 'migrations', (select coalesce(json_agg(json_build_object('version', version, 'name', name) order by version desc), '[]'::json) from supabase_migrations.schema_migrations)," +
    " 'extensions', (select coalesce(json_agg(json_build_object('name', extname, 'version', extversion) order by extname), '[]'::json) from pg_extension where extname <> 'plpgsql')" +
    ") as d";

  // Plain-language reading of the advisor lints this project is likely to show.
  var LINT_NOTES = {
    rls_enabled_no_policy: "Row level security is on with no policies, so these tables are closed to the public API and reachable only with the service key or direct SQL. That suits a private database.",
    unused_index: "These indexes have not served a query yet. That is normal for new tables. Revisit once your queries run regularly.",
    unindexed_foreign_keys: "A foreign key has no covering index. Harmless on small tables. Add one if the table grows.",
    rls_disabled_in_public: "Row level security is off, so anyone with the public API key can read or write these tables. Turn it on.",
    function_search_path_mutable: "These functions do not pin their search path. Set it explicitly to close a privilege escalation path."
  };

  var $ = function (id) { return document.getElementById(id); };
  var state = { sql: {}, sec: {}, perf: {}, org: {}, fn: {} };
  var mcp = null, mcpReady = false, loading = false, updatedAt = null;

  function esc(v) {
    return String(v == null ? "" : v).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  // Sizes in the units Postgres itself prints (pg_size_pretty): kB, MB, GB on a 1024 base.
  function size(b) {
    b = Number(b) || 0;
    if (b >= GB) return trim(b / GB) + " GB";
    if (b >= MB) return trim(b / MB) + " MB";
    if (b >= 1024) return Math.round(b / 1024) + " kB";
    return b + " B";
  }
  function trim(n) { return n >= 100 ? String(Math.round(n)) : n >= 10 ? n.toFixed(1).replace(/\.0$/, "") : n.toFixed(2).replace(/\.?0+$/, ""); }
  function int(n) { return (Number(n) || 0).toLocaleString("en-US"); }
  function pct(n) { if (!n) return "0%"; return n < 0.1 && n > 0 ? "<0.1%" : (n >= 10 ? Math.round(n) : n.toFixed(1)) + "%"; }
  function ago(iso) {
    if (!iso) return "never";
    var s = (Date.now() - new Date(iso).getTime()) / 1000;
    if (!isFinite(s)) return "unknown";
    if (s < 90) return "just now";
    if (s < 3600) return Math.round(s / 60) + " min ago";
    if (s < 86400 * 2) return Math.round(s / 3600) + " h ago";
    return Math.round(s / 86400) + " d ago";
  }
  function migrationDate(v) {
    var m = /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/.exec(String(v));
    if (!m) return "";
    var d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], +m[6]));
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  }

  // ---- Reading connector results ----
  function asObject(result) {
    var p = result ? result.payload : null;
    if (typeof p === "string") { try { p = JSON.parse(p); } catch (e) { /* keep text */ } }
    if (p == null && result && Array.isArray(result.content)) {
      var text = result.content.filter(function (b) { return b && b.type === "text"; }).map(function (b) { return b.text; }).join("\n");
      try { p = JSON.parse(text); } catch (e) { p = text; }
    }
    return p;
  }
  // execute_sql wraps its rows in a text envelope: prose, then the JSON rows between untrusted-data tags.
  function sqlRows(result) {
    var p = asObject(result);
    if (Array.isArray(p)) return p;
    var text = p && typeof p === "object" && typeof p.result === "string" ? p.result : (typeof p === "string" ? p : JSON.stringify(p));
    var close = text.indexOf("</untrusted-data-"), body = text;
    if (close > -1) {
      var open = text.lastIndexOf("<untrusted-data-", close - 1);
      body = text.slice(text.indexOf(">", open) + 1, close);
    } else {
      var a = text.indexOf("["), z = text.lastIndexOf("]");
      if (a > -1 && z > a) body = text.slice(a, z + 1);
    }
    return JSON.parse(body.trim());
  }
  function lints(result) {
    var p = asObject(result) || {};
    var list = (p.result && p.result.lints) || p.lints || [];
    if (!Array.isArray(list)) throw new Error("Unexpected advisor result");
    return list;
  }

  // ---- Calling ----
  function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function call(tool, input) {
    return mcp.callTool(SERVER, tool, input).catch(function (e) {
      // One unattended retry, only where the runtime says a repeat may succeed. Every call here is a read.
      if (e && e.retryable === true) {
        var delay = Math.min(e.retryAfterMs || (700 + Math.random() * 900), 15000);
        return wait(delay).then(function () { return mcp.callTool(SERVER, tool, input); });
      }
      throw e;
    });
  }
  var DENIALS = { needs_reauth: 1, server_not_connected: 1, selection_required: 1, server_not_found: 1, not_in_manifest: 1, blocked_by_policy: 1, approval_required: 1, consent_required: 1, not_granted: 1 };
  function settle(key, promise, parse) {
    return promise.then(function (res) {
      state[key] = { data: parse(res), at: (res && res.cache && res.cache.storedAt) || Date.now(), error: null };
    }).catch(function (e) {
      var err = e && e.code ? e : { code: "parse", message: (e && e.message) || "Unreadable result" };
      // Keep last good data through transient failures; drop it when access is denied.
      state[key] = { data: DENIALS[err.code] ? null : (state[key].data || null), at: state[key].at, error: err };
    });
  }
  function explain(err, key) {
    switch (err.code) {
      case "needs_reauth": return "The Supabase connector needs reconnecting. Reconnect it in Claude settings under Connectors, then press Refresh.";
      case "server_not_connected":
      case "server_not_found": return "No Supabase connector is set up for this account. Add it in Claude settings under Connectors, then press Refresh.";
      case "selection_required": return "More than one Supabase connector is connected. Choose one when Claude asks, then press Refresh.";
      case "not_in_manifest":
      case "consent_required": return "Supabase access is turned off for this page. Allow it in this page's Permissions menu, then press Refresh.";
      case "approval_required": return "This read needs your approval. Press Refresh and choose Allow when Claude asks.";
      case "blocked_by_policy": return "Your organization's policy blocks this Supabase tool for you.";
      case "server_unavailable":
      case "rate_limited": return "Supabase did not answer in time. Press Refresh to try again.";
      case "tool_error": return "Supabase reported an error: " + (err.message || "no details given") + (key === "sql" ? " If the project is paused, restore it from the Supabase dashboard first." : "");
      case "not_granted":
      case "capability_disabled":
      case "capability_removed": return "Live data is not available in this view. Open this page inside Claude.";
      case "parse": return "Supabase answered in a format this page could not read. Ask Claude to update the tracker.";
      default: return "This section could not load. Press Refresh to try again.";
    }
  }

  function refresh() {
    if (!mcp || loading) return;
    loading = true; render();
    // The database read goes first by itself, so a first-time permission prompt is answered once before the rest go out.
    settle("sql", call("execute_sql", { project_id: PROJECT, query: SQL }), function (r) {
      var rows = sqlRows(r); var d = rows && rows[0] && rows[0].d;
      if (!d || !Array.isArray(d.tables)) throw new Error("Unexpected SQL result");
      return d;
    }).then(function () {
      return Promise.all([
        settle("sec", call("get_advisors", { project_id: PROJECT, type: "security" }), lints),
        settle("perf", call("get_advisors", { project_id: PROJECT, type: "performance" }), lints),
        settle("org", call("get_organization", { id: ORG }), function (r) {
          var p = asObject(r); if (!p || typeof p !== "object") throw new Error("Unexpected organization result"); return p;
        }),
        settle("fn", call("list_edge_functions", { project_id: PROJECT }), function (r) {
          var p = asObject(r) || {}; var list = p.functions || p;
          if (!Array.isArray(list)) throw new Error("Unexpected functions result"); return list;
        })
      ]);
    }).then(function () {
      loading = false;
      if (Object.keys(state).some(function (k) { return !state[k].error; })) updatedAt = Date.now();
      render();
    });
  }

  // ---- Rendering ----
  function pill(kind, label, big) {
    var icon = { good: "✓", warn: "!", crit: "✕", info: "i" }[kind] || "i";
    return '<span class="pill ' + esc(kind) + (big ? " big" : "") + '"><i aria-hidden="true">' + icon + "</i>" + esc(label) + "</span>";
  }
  function level(share) { return share >= 0.9 ? "crit" : share >= 0.7 ? "warn" : "good"; }
  function sectionNote(key) {
    var s = state[key];
    if (!s.error) return "";
    return '<p class="notice">' + esc(explain(s.error, key)) + (s.data ? " Showing the last values that loaded." : "") + "</p>";
  }
  function waiting(label) { return '<p class="empty">' + esc(mcpReady && !mcp ? "Open this page inside Claude to load " + label + "." : "Loading " + label + "…") + "</p>"; }

  function gauge(title, used, limit, fmt, leftWord) {
    var has = limit > 0, share = has ? used / limit : 0;
    var kind = has ? level(share) : "info";
    var word = { good: "Plenty left", warn: "Getting full", crit: "Nearly full", info: "No limit known" }[kind];
    return '<div class="gauge" title="' + esc(title + ": " + fmt(used) + (has ? " of " + fmt(limit) : "")) + '">' +
      "<header><h3>" + esc(title) + "</h3>" + pill(kind, word) + "</header>" +
      '<div class="figure"><b>' + esc(fmt(used)) + "</b>" + (has ? "<span>of " + esc(fmt(limit)) + " · " + esc(pct(share * 100)) + " used</span>" : "") + "</div>" +
      '<div class="bar" role="img" aria-label="' + esc(pct(share * 100)) + ' used"><div style="width:' + Math.min(100, share * 100).toFixed(2) + '%"></div></div>' +
      '<div class="left">' + (has ? esc(fmt(Math.max(0, limit - used))) + " " + esc(leftWord) : "Limit for this plan is not known to this page") + "</div></div>";
  }

  function renderGauges(d, plan) {
    if (!d) { $("gauges").innerHTML = sectionNote("sql") || waiting("quota figures"); return; }
    $("gauges").innerHTML =
      gauge("Database size", d.db_bytes, plan ? plan.db : 0, size, "left") +
      gauge("File storage", d.storage_bytes, plan ? plan.storage : 0, size, "left") +
      gauge("Connections", d.connections, d.max_connections, int, "free");
  }

  function renderSchemas(d) {
    if (!d) { $("schemas").innerHTML = sectionNote("sql") || waiting("the schema breakdown"); return; }
    var by = {};
    d.tables.forEach(function (t) {
      var s = by[t.schema] || (by[t.schema] = { name: t.schema, bytes: 0, tables: 0, rows: 0 });
      s.bytes += Number(t.bytes) || 0; s.tables += 1; s.rows += Number(t.rows) || 0;
    });
    var list = Object.keys(by).map(function (k) { return by[k]; }).sort(function (a, b) { return b.bytes - a.bytes; });
    var mine = list.reduce(function (n, s) { return n + s.bytes; }, 0);
    var max = list.length ? list[0].bytes : 0;
    var html = sectionNote("sql") + '<p class="lede">Your own data takes <span class="num">' + esc(size(mine)) + '</span> of the <span class="num">' + esc(size(d.db_bytes)) +
      '</span> total. The remaining <span class="num">' + esc(size(Math.max(0, d.db_bytes - mine))) + "</span> is the Postgres catalog and Supabase's built-in schemas, which every project carries.</p>";
    if (!list.length) html += '<p class="empty">No tables of your own yet.</p>';
    html += '<div class="schemas">' + list.map(function (s) {
      return '<div class="schema" title="' + esc(s.name + ": " + size(s.bytes) + ", " + pct(mine ? s.bytes / mine * 100 : 0) + " of your data") + '">' +
        '<span class="name">' + esc(s.name) + "</span>" +
        '<div class="bar"><div style="width:' + (max ? (s.bytes / max * 100).toFixed(2) : 0) + '%"></div></div>' +
        '<span class="size num">' + esc(size(s.bytes)) + "</span>" +
        '<span class="sub">' + int(s.tables) + (s.tables === 1 ? " table" : " tables") + " · " + int(s.rows) + (s.rows === 1 ? " row" : " rows") + "</span></div>";
    }).join("") + "</div>";
    $("schemas").innerHTML = html;
  }

  function renderTables(d) {
    if (!d) { $("tables").innerHTML = sectionNote("sql") || waiting("the table list"); return; }
    if (!d.tables.length) { $("tables").innerHTML = '<p class="empty">No tables of your own yet.</p>'; return; }
    var max = Number(d.tables[0].bytes) || 0;
    $("tables").innerHTML = '<div class="scroll"><table><thead><tr><th>Table</th><th class="r">Rows</th><th class="r">Total size</th><th class="r">Indexes</th><th class="r">Dead rows</th><th>Access</th><th>Last analyzed</th></tr></thead><tbody>' +
      d.tables.map(function (t) {
        var access = !t.rls ? pill("crit", "RLS off") : Number(t.policies) > 0 ? pill("good", "RLS on · " + int(t.policies) + (Number(t.policies) === 1 ? " policy" : " policies")) : pill("good", "RLS on · no policies");
        return '<tr title="' + esc(t.schema + "." + t.name + ": " + size(t.heap_bytes) + " rows, " + size(t.index_bytes) + " indexes") + '">' +
          '<td class="tname"><span>' + esc(t.schema) + ".</span>" + esc(t.name) + "</td>" +
          '<td class="r num">' + int(t.rows) + "</td>" +
          '<td class="r num">' + esc(size(t.bytes)) + '<span class="mini"><div style="width:' + (max ? (t.bytes / max * 100).toFixed(1) : 0) + '%"></div></span></td>' +
          '<td class="r num">' + esc(size(t.index_bytes)) + "</td>" +
          '<td class="r num">' + int(t.dead) + "</td>" +
          "<td>" + access + "</td>" +
          "<td>" + esc(ago(t.analyzed)) + "</td></tr>";
      }).join("") + "</tbody></table></div>";
  }

  function lintKind(l) { var v = String(l.level || "").toUpperCase(); return v === "ERROR" ? "crit" : v === "WARN" ? "warn" : "info"; }
  function renderLints(key, label) {
    var s = state[key], el = $(key);
    if (!s.data) { el.innerHTML = sectionNote(key) || waiting(label + " findings"); return; }
    var order = { crit: 0, warn: 1, info: 2 };
    var list = s.data.slice().sort(function (a, b) { return order[lintKind(a)] - order[lintKind(b)]; });
    if (!list.length) { el.innerHTML = sectionNote(key) + "<div>" + pill("good", "No findings") + "</div>"; return; }
    el.innerHTML = sectionNote(key) + list.map(function (l) {
      var kind = lintKind(l), findings = Array.isArray(l.findings) ? l.findings : [];
      var n = Number(l.count) || findings.length;
      var link = /^https:\/\/supabase\.com\//.test(l.remediation || "") ? ' <a href="' + esc(l.remediation) + '" target="_blank" rel="noopener">Supabase guide</a>' : "";
      return '<details class="finding"><summary>' + pill(kind, { crit: "Error", warn: "Warning", info: "Info" }[kind]) + "<b>" + esc(l.title || l.name) + "</b>" +
        '<span class="count num">' + int(n) + "</span></summary>" +
        '<div class="body"><p>' + esc(LINT_NOTES[l.name] || l.description || "") + link + "</p><ul>" +
        findings.map(function (f) { return "<li>" + esc(String(f.detail || "").replace(/\\?`/g, "")) + "</li>"; }).join("") + "</ul></div></details>";
    }).join("");
  }

  function renderInventory(d) {
    var fn = state.fn, html = "";
    html += "<div><h3>Edge functions</h3>" + (fn.data ? (fn.data.length ? "<ul>" + fn.data.map(function (f) {
      return "<li><span>" + esc(f.slug || f.name) + "</span><span>" + esc(String(f.status || "").toLowerCase()) + " · v" + esc(f.version) + "</span></li>";
    }).join("") + "</ul>" : '<p class="empty">None deployed</p>') : (sectionNote("fn") || waiting("edge functions"))) + "</div>";
    if (d) {
      var mig = d.migrations || [], ext = d.extensions || [];
      html += "<div><h3>Migrations · " + int(mig.length) + " applied</h3>" + (mig.length ? "<ul>" + mig.slice(0, 5).map(function (m) {
        return "<li><span>" + esc(m.name) + "</span><span>" + esc(migrationDate(m.version)) + "</span></li>";
      }).join("") + "</ul>" : '<p class="empty">None recorded</p>') + "</div>";
      html += "<div><h3>Extensions</h3><ul>" + ext.map(function (e) {
        return "<li><span>" + esc(e.name) + "</span><span>" + esc(e.version) + "</span></li>";
      }).join("") + "</ul></div>";
      html += '<div><h3>Auth and storage</h3><ul><li><span>auth users</span><span class="num">' + int(d.auth_users) + '</span></li><li><span>storage buckets</span><span class="num">' + int(d.buckets) + "</span></li></ul></div>";
    }
    $("inventory").innerHTML = html;
  }

  function render() {
    var d = state.sql.data, org = state.org.data;
    var planKey = org && String(org.plan || "").toLowerCase(), plan = planKey ? PLANS[planKey] : null;

    // Header line
    var bits = ["<span>Project <span class=\"num\">" + esc(PROJECT) + "</span></span>"];
    if (d) bits.push("<span>Postgres " + esc(d.pg_version) + "</span>");
    if (org) bits.push("<span>" + esc(plan ? plan.label : (org.plan || "Unknown") + " plan") + "</span>");
    $("meta").innerHTML = bits.join("");

    // One message when everything failed the same way, instead of five copies.
    var keys = Object.keys(state), errs = keys.map(function (k) { return state[k].error; });
    var allSame = errs.every(function (e) { return e && e.code === errs[0].code; });
    var pn = $("pageNotice");
    if (mcpReady && !mcp) { pn.hidden = false; pn.textContent = "Live data is not available in this view. Open this page inside Claude, signed in to the account that has the Supabase connector."; }
    else if (allSame && errs[0]) { pn.hidden = false; pn.textContent = explain(errs[0], "sql"); }
    else pn.hidden = true;

    renderGauges(d, plan);
    renderSchemas(d);
    renderTables(d);
    renderLints("sec", "security");
    renderLints("perf", "performance");
    renderInventory(d);

    // Overall verdict
    var o = $("overall"), worst = null;
    if (d || state.sec.data || state.perf.data) {
      worst = "good";
      var bump = function (k) { if (k === "crit" || (k === "warn" && worst !== "crit")) worst = k; };
      (state.sec.data || []).concat(state.perf.data || []).forEach(function (l) { bump(lintKind(l)); });
      if (d) {
        if (plan) { bump(level(d.db_bytes / plan.db)); bump(level(d.storage_bytes / plan.storage)); }
        if (d.max_connections) bump(level(d.connections / d.max_connections));
        d.tables.forEach(function (t) { if (!t.rls) bump("crit"); });
      }
    }
    var incomplete = keys.some(function (k) { return state[k].error; });
    o.outerHTML = (worst
      ? pill(worst, { good: incomplete ? "Clear so far" : "All clear", warn: "Needs a look", crit: "Action needed" }[worst], true)
      : pill("info", loading ? "Checking" : "No data", true)).replace('class="', 'id="overall" class="');

    $("stamp").textContent = loading ? "Refreshing…" : updatedAt ? "Updated " + new Date(updatedAt).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" }) : "Not loaded yet";
    var b = $("refresh"); b.disabled = loading || !mcp; b.textContent = loading ? "Refreshing…" : "Refresh";

    $("foot").textContent = plan && plan.pauses
      ? "Free projects pause after about a week with no activity. A paused project stops answering until you restore it from the Supabase dashboard."
      : "";
  }

  $("refresh").addEventListener("click", refresh);
  ctx.hub.on("refresh", refresh);
  render();
  var boot = ctx.mcp;
  boot.catch(function () { return null; }).then(function (ns) { mcp = ns || null; mcpReady = true; render(); refresh(); });
})();
      })(D);
    }
  };
})();
