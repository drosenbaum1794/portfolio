/* Way of Iron, mounted inside What's on Tap (ported from the standalone artifact). */
(function () {
  "use strict";
  window.HubApps = window.HubApps || {};
  var CSS = "\n/* Layout: sticky masthead, thumb-reach tab bar. Overview is a dashboard grid\n   (headline gain first, then pulse tiles, then mix and consistency); Log and\n   Progress stay a narrow training-log column. Single dark look by choice. */\n\n*, *::before, *::after { box-sizing: border-box; }\n\n:host { background: var(--bg); color: var(--ink); font-family: var(--body); font-size: 15px; line-height: 1.5; -webkit-font-smoothing: antialiased; }\nbutton, select { font: inherit; color: inherit; }\n:focus-visible { outline: 2px solid var(--iron); outline-offset: 2px; }\n\n.wrap { max-width: 1080px; margin-inline: auto; padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); }\n.narrow { max-width: 760px; }\n\n/* masthead */\n.mast { position: sticky; top: env(safe-area-inset-top, 0px); z-index: 5; background: var(--bg); border-bottom: 1px solid var(--line); }\n.mast-in { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding-block: 12px 8px; flex-wrap: wrap; }\n.brand { font-family: var(--display); font-size: 30px; letter-spacing: 3px; line-height: 1; color: var(--iron); margin: 0; font-weight: 400; }\n.knee { display: flex; align-items: center; gap: 8px; font-family: var(--mono); font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--ink-2); }\n.dot { width: 8px; height: 8px; border-radius: 50%; background: var(--ink-3); flex: none; display: inline-block; }\n.sync { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding-block: 0 10px; font-family: var(--mono); font-size: 11px; letter-spacing: 0.5px; color: var(--ink-3); }\n.sync span { min-width: 0; }\n.btn { background: none; border: 1px solid var(--line); color: var(--ink-2); font-family: var(--mono); font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; padding: 8px 12px; min-height: 36px; cursor: pointer; flex: none; }\n.btn:hover { border-color: var(--iron); color: var(--iron); }\n.btn[disabled] { opacity: .5; cursor: default; }\n.btn.solid { background: var(--iron); border-color: var(--iron); color: var(--iron-ink); }\n\nmain { padding-block: 16px 104px; }\n.notice { border: 1px solid var(--line); background: var(--surface); padding: 14px 16px; margin-bottom: 16px; display: flex; flex-direction: column; gap: 10px; align-items: flex-start; }\n.notice p { margin: 0; color: var(--ink-2); }\n\n/* shared panel */\n.panel { border: 1px solid var(--line); background: var(--surface); padding: 16px; min-width: 0; }\n.panel-head { display: flex; align-items: baseline; justify-content: space-between; gap: 8px 12px; flex-wrap: wrap; margin-bottom: 12px; }\n.h2 { font-family: var(--display); font-weight: 400; font-size: 24px; letter-spacing: 1.5px; line-height: 1.05; margin: 0; text-wrap: balance; }\n.eyebrow { font-family: var(--mono); font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--ink-3); }\n.fine { font-family: var(--mono); font-size: 11px; line-height: 1.6; color: var(--ink-3); margin: 12px 0 0; max-width: 72ch; }\n\n/* overview grid */\n.ov { display: grid; gap: 16px; grid-template-columns: minmax(0, 1fr); }\n@media (min-width: 900px) {\n  .ov { grid-template-columns: repeat(12, minmax(0, 1fr)); }\n  .span-12 { grid-column: span 12; } .span-6 { grid-column: span 6; }\n}\n\n/* hero: strength gained */\n.hero { display: grid; gap: 20px; grid-template-columns: minmax(0, 1fr); }\n@media (min-width: 900px) { .hero { grid-template-columns: minmax(0, 4fr) minmax(0, 7fr); align-items: start; } }\n.big { font-family: var(--display); font-size: clamp(72px, 14vw, 128px); line-height: .85; letter-spacing: 2px; color: var(--iron); margin: 8px 0 6px; font-variant-numeric: lining-nums; }\n.big small { font-size: .38em; letter-spacing: 3px; color: var(--ink-2); margin-left: 6px; }\n.hero-sub { color: var(--ink-2); margin: 0; max-width: 40ch; }\n.lifts { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }\n.lift { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 4px 12px; padding: 9px 0; border-bottom: 1px solid var(--line-soft); align-items: baseline; }\n.lift:last-child { border-bottom: 0; }\n.lift-name { font-weight: 500; min-width: 0; overflow-wrap: anywhere; cursor: pointer; background: none; border: 0; padding: 0; text-align: left; color: var(--ink); }\n.lift-name:hover { color: var(--iron); }\n.lift-gain { font-family: var(--mono); font-size: 14px; color: var(--iron); font-variant-numeric: tabular-nums; }\n.lift-meta { font-family: var(--mono); font-size: 12px; color: var(--ink-3); font-variant-numeric: tabular-nums; }\n.lift-bar { grid-column: 1 / -1; height: 4px; background: var(--line-soft); border-radius: 2px; overflow: hidden; }\n.lift-bar i { display: block; height: 100%; background: var(--iron); border-radius: 0 2px 2px 0; }\ndetails.excl { margin-top: 14px; border-top: 1px solid var(--line); padding-top: 12px; }\ndetails.excl summary { cursor: pointer; font-family: var(--mono); font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--ink-2); list-style: none; display: flex; align-items: center; gap: 8px; min-height: 32px; }\ndetails.excl summary::-webkit-details-marker { display: none; }\ndetails.excl summary::before { content: \"+\"; color: var(--iron); width: 12px; }\ndetails.excl[open] summary::before { content: \"\\2013\"; }\n.why { margin: 10px 0 0; display: flex; flex-direction: column; gap: 12px; }\n.why h4 { margin: 0 0 4px; font-family: var(--mono); font-weight: 500; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: var(--ink-3); }\n.why p { margin: 0; font-size: 14px; color: var(--ink-2); }\n\n/* pulse tiles */\n.kpis { display: grid; gap: 12px; grid-template-columns: repeat(2, minmax(0, 1fr)); }\n@media (min-width: 720px) { .kpis { grid-template-columns: repeat(4, minmax(0, 1fr)); } }\n.kpi { border: 1px solid var(--line); background: var(--surface); padding: 12px 14px; display: flex; flex-direction: column; gap: 4px; min-width: 0; }\n.kpi .v { font-family: var(--display); font-size: 40px; line-height: 1; letter-spacing: 1px; color: var(--ink); }\n.kpi .v em { font-style: normal; font-size: .5em; color: var(--ink-3); margin-left: 4px; letter-spacing: 1.5px; }\n.kpi .s { font-family: var(--mono); font-size: 11px; color: var(--ink-3); }\n.spark { display: block; width: 100%; height: 22px; margin-top: 4px; }\n.kstrip { display: flex; gap: 4px; margin-top: 6px; flex-wrap: wrap; }\n.kstrip .dot { width: 9px; height: 9px; }\n\n/* controls */\n.chips { display: flex; gap: 6px; flex-wrap: wrap; }\n.chip { background: none; border: 1px solid var(--line); color: var(--ink-3); font-family: var(--mono); font-size: 11px; letter-spacing: 1px; text-transform: uppercase; padding: 7px 10px; min-height: 34px; cursor: pointer; }\n.chip[aria-pressed=\"true\"] { border-color: var(--iron); color: var(--iron); }\n.chip:hover { color: var(--ink); }\n.controls { display: flex; gap: 8px 12px; flex-wrap: wrap; justify-content: space-between; align-items: center; margin-bottom: 14px; }\n\n/* donut + legend */\n.mix { display: grid; gap: 16px; grid-template-columns: minmax(0, 1fr); align-items: center; }\n@media (min-width: 520px) { .mix { grid-template-columns: minmax(150px, 190px) minmax(0, 1fr); } }\n.donut { position: relative; width: 100%; max-width: 230px; margin-inline: auto; aspect-ratio: 1; }\n.donut svg { display: block; width: 100%; height: 100%; overflow: visible; }\n.donut path { cursor: pointer; transition: opacity .15s; }\n.donut-c { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; pointer-events: none; text-align: center; }\n.donut-c b { font-family: var(--display); font-weight: 400; font-size: 38px; line-height: 1; letter-spacing: 1px; }\n.donut-c span { font-family: var(--mono); font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: var(--ink-3); max-width: 12ch; }\n.legend { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }\n.legend li { display: grid; grid-template-columns: 10px minmax(0, 1fr) auto auto; gap: 10px; align-items: center; padding: 6px 6px; border-bottom: 1px solid var(--line-soft); cursor: pointer; min-height: 36px; }\n.legend li.on { background: var(--surface-2); box-shadow: inset 2px 0 0 var(--iron); }\n.legend li.on .nm { color: var(--iron); }\n.legend li:last-child { border-bottom: 0; }\n.legend li.dim { opacity: .35; }\n.legend .sw { width: 10px; height: 10px; border-radius: 2px; }\n.legend .nm { font-weight: 500; min-width: 0; }\n.legend .pc { font-family: var(--mono); font-size: 14px; color: var(--ink); font-variant-numeric: tabular-nums; text-align: right; min-width: 44px; }\n.legend .ct { font-family: var(--mono); font-size: 12px; color: var(--ink-3); font-variant-numeric: tabular-nums; text-align: right; min-width: 58px; }\n.keyrow { display: flex; flex-wrap: wrap; gap: 6px 14px; margin-bottom: 8px; }\n.keyrow span { display: inline-flex; align-items: center; gap: 6px; font-family: var(--mono); font-size: 11px; color: var(--ink-2); }\n.keyrow i { width: 9px; height: 9px; border-radius: 2px; display: inline-block; }\n\n/* plots */\n.plot { position: relative; width: 100%; }\n.plot svg { display: block; width: 100%; touch-action: pan-y; }\n.tip { position: absolute; top: 0; left: 0; z-index: 3; pointer-events: none; background: var(--surface-2); border: 1px solid var(--line); padding: 8px 10px; font-family: var(--mono); font-size: 12px; line-height: 1.5; color: var(--ink-2); white-space: nowrap; }\n.tip b { color: var(--ink); font-weight: 500; display: block; }\n.tip .r { display: flex; align-items: center; gap: 8px; }\n.tip .r i { width: 8px; height: 8px; border-radius: 2px; display: inline-block; }\n.tip .r em { font-style: normal; margin-left: auto; padding-left: 12px; color: var(--ink); }\n.tip.pinned { border-color: var(--iron); }\n.tip.pop { position: fixed; z-index: 30; white-space: normal; max-width: 240px; }\n[data-tip] { cursor: pointer; }\n.rows .gd, .kstrip .dot { position: relative; }\n.rows .gd::after, .kstrip .dot::after { content: \"\"; position: absolute; inset: -7px; }\n.hint { font-family: var(--mono); font-size: 11px; color: var(--ink-3); margin: 10px 0 0; }\n.scrollx { overflow-x: auto; }\n.heat-key { display: flex; align-items: center; gap: 4px; font-family: var(--mono); font-size: 11px; color: var(--ink-3); }\n.heat-key i { width: 10px; height: 10px; border-radius: 2px; display: inline-block; }\n\n/* log */\n.log { display: flex; flex-direction: column; gap: 14px; }\n.card { border: 1px solid var(--line); background: var(--surface); }\n.card-head { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; padding: 14px 16px 12px; border-bottom: 1px solid var(--line-soft); flex-wrap: wrap; }\n.card-title { display: flex; align-items: baseline; gap: 10px; min-width: 0; }\n.no { font-family: var(--display); font-size: 26px; letter-spacing: 1.5px; line-height: 1; color: var(--ink); }\n.type { font-family: var(--mono); font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--iron); }\n.meta { display: flex; align-items: center; gap: 12px; font-family: var(--mono); font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: var(--ink-3); flex-wrap: wrap; }\n.pill { display: inline-flex; align-items: center; gap: 6px; color: var(--ink-2); }\n.rows { list-style: none; margin: 0; padding: 4px 16px; }\n.rows li { display: grid; grid-template-columns: 8px minmax(0, 1fr) auto auto; gap: 12px; align-items: baseline; padding: 8px 0; border-bottom: 1px solid var(--line-soft); }\n.rows li:last-child { border-bottom: 0; }\n.rows .gd { width: 8px; height: 8px; border-radius: 2px; align-self: center; }\n.ex { min-width: 0; overflow-wrap: anywhere; font-weight: 500; }\n.sr { font-family: var(--mono); font-size: 13px; color: var(--ink-2); font-variant-numeric: tabular-nums; white-space: nowrap; }\n.wt { font-family: var(--mono); font-size: 13px; color: var(--iron); font-variant-numeric: tabular-nums; text-align: right; min-width: 64px; max-width: 150px; overflow-wrap: anywhere; }\n.wt.none { color: var(--ink-3); }\n.notes { margin: 0; padding: 12px 16px 14px; border-top: 1px solid var(--line-soft); color: var(--ink-2); font-size: 14px; max-width: 68ch; }\n.empty { border: 1px dashed var(--line); padding: 28px 16px; color: var(--ink-3); text-align: left; }\n.empty b { display: block; font-family: var(--display); font-weight: 400; font-size: 22px; letter-spacing: 1.5px; color: var(--ink-2); margin-bottom: 4px; }\n\n/* progress */\n.field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }\n.lab { font-family: var(--mono); font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--ink-3); }\nselect { background: var(--surface); border: 1px solid var(--line); color: var(--ink); font-family: var(--mono); font-size: 16px; padding: 10px 12px; width: 100%; min-height: 44px; }\n.verdict { display: flex; gap: 10px; align-items: baseline; flex-wrap: wrap; border: 1px solid var(--line); background: var(--surface); padding: 12px 14px; margin-bottom: 16px; }\n.verdict .tag { font-family: var(--mono); font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; padding: 3px 8px; border: 1px solid var(--line); color: var(--ink-2); }\n.verdict .tag.on { border-color: var(--iron); color: var(--iron); }\n.verdict p { margin: 0; color: var(--ink-2); font-size: 14px; flex: 1 1 260px; min-width: 0; }\n.fig { border: 1px solid var(--line); background: var(--surface); padding: 14px 12px 8px; margin: 0 0 16px; }\n.fig-head { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; padding-inline: 4px; margin-bottom: 6px; flex-wrap: wrap; }\n.fig-title { font-family: var(--display); font-size: 22px; letter-spacing: 1.5px; line-height: 1.1; margin: 0; font-weight: 400; text-wrap: balance; }\n.fig-sub { font-family: var(--mono); font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: var(--ink-3); }\n.fig-note { font-family: var(--mono); font-size: 11px; color: var(--ink-3); padding: 6px 4px 4px; margin: 0; }\n.tiles { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 10px; }\n.tile { border: 1px solid var(--line); background: var(--surface); padding: 10px 12px; display: flex; flex-direction: column; gap: 2px; min-width: 0; }\n.tile .d { font-family: var(--mono); font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: var(--ink-3); }\n.tile .w { font-family: var(--mono); font-size: 15px; color: var(--iron); font-variant-numeric: tabular-nums; overflow-wrap: anywhere; }\n.tile .w.none { color: var(--ink-3); }\n.tile .s { font-family: var(--mono); font-size: 12px; color: var(--ink-2); font-variant-numeric: tabular-nums; }\n\n/* tab bar */\n.tabs { position: fixed; left: 0; right: 0; bottom: 0; z-index: 6; background: var(--bg); border-top: 1px solid var(--line); padding-bottom: env(safe-area-inset-bottom, 0px); }\n.tabs-in { display: grid; grid-template-columns: repeat(3, 1fr); max-width: 760px; }\n.tab { background: none; border: 0; border-top: 2px solid transparent; margin-top: -1px; color: var(--ink-3); font-family: var(--display); font-size: 20px; letter-spacing: 3px; padding: 14px 8px 12px; min-height: 56px; cursor: pointer; }\n.tab[aria-selected=\"true\"] { color: var(--iron); border-top-color: var(--iron); }\n@media (prefers-reduced-motion: no-preference) { .tab, .btn, .chip, .lift-name { transition: color .15s, border-color .15s; } }\n@media (prefers-reduced-motion: reduce) { .donut path { transition: none; } }\n:host { display: block; --line-soft: var(--line); --iron: var(--accent); --iron-ink: var(--accent-ink);\n  --st-good: var(--good); --st-warn: #e0a000; --st-sore: #ec835a; --st-pain: var(--now); background: transparent; color: var(--ink); }\n[hidden]:not([hidden=until-found i]) { display: none !important; }\nimg { max-width: 100%; }\n.wrap { max-width: none; padding-left: 0; padding-right: 0; }\n.mast { position: static; background: transparent; border-bottom: 0; }\n.mast-in { padding-block: 0 4px; }\n.brand { font-weight: 700; font-size: 26px; letter-spacing: -0.01em; color: var(--ink); }\n.tabs { position: static; background: transparent; border-top: 0; border-bottom: 1px solid var(--line); padding-bottom: 0; margin-bottom: 4px; }\n.tabs-in { max-width: none; display: flex; gap: 4px; }\n.tab { font-family: var(--body); font-size: 14px; font-weight: 600; letter-spacing: 0; min-height: 40px; padding: 8px 14px 10px; border-top: 0; border-bottom: 2px solid transparent; margin: 0; }\n.tab[aria-selected=\"true\"] { border-bottom-color: var(--iron); color: var(--ink); }\nmain { padding-block: 16px 24px; }\n.panel, .kpi, .card, .fig, .tile, .verdict, .notice { border-radius: 12px; }\n.chip, .btn { border-radius: 8px; }\n.h2, .fig-title { font-weight: 600; font-size: 19px; letter-spacing: -0.005em; }\n.big { font-weight: 700; letter-spacing: -0.02em; font-size: clamp(56px, 10vw, 96px); }\n.kpi .v, .donut-c b, .no, .empty b { font-weight: 700; letter-spacing: -0.01em; }\n.tip { border-radius: 8px; }\n";
  var HTML = "<header class=\"mast\">\n  <div class=\"wrap\">\n    <div class=\"mast-in\">\n      <h1 class=\"brand\">The Way of Iron</h1>\n      <div class=\"knee\" id=\"knee\"><span class=\"dot\" id=\"kneeDot\"></span><span id=\"kneeText\">Knee</span></div>\n    </div>\n    <div class=\"sync\">\n      <span id=\"syncText\">Connecting to your workout log</span>\n      <button class=\"btn\" id=\"refresh\" type=\"button\" disabled>Refresh</button>\n    </div>\n  </div>\n</header>\n<nav class=\"tabs\" aria-label=\"Views\">\n  <div class=\"wrap tabs-in\" role=\"tablist\">\n    <button class=\"tab\" id=\"tab-overview\" role=\"tab\" type=\"button\" aria-selected=\"true\" aria-controls=\"view-overview\">Overview</button>\n    <button class=\"tab\" id=\"tab-log\" role=\"tab\" type=\"button\" aria-selected=\"false\" aria-controls=\"view-log\">Log</button>\n    <button class=\"tab\" id=\"tab-progress\" role=\"tab\" type=\"button\" aria-selected=\"false\" aria-controls=\"view-progress\">Progress</button>\n  </div>\n</nav>\n<main class=\"wrap\">\n  <div class=\"notice\" id=\"notice\" hidden>\n    <p id=\"noticeText\"></p>\n    <button class=\"btn solid\" id=\"noticeBtn\" type=\"button\" hidden>Load workouts</button>\n  </div>\n\n  <!-- OVERVIEW -->\n  <section id=\"view-overview\" role=\"tabpanel\" aria-labelledby=\"tab-overview\">\n    <div class=\"ov\">\n      <article class=\"panel span-12\" aria-labelledby=\"gainTitle\">\n        <div class=\"hero\">\n          <div>\n            <span class=\"eyebrow\" id=\"gainTitle\">Strength gained</span>\n            <p class=\"big\" id=\"gainBig\">+0<small>LB</small></p>\n            <p class=\"hero-sub\" id=\"gainSub\">Waiting for your workout log.</p>\n          </div>\n          <div>\n            <ul class=\"lifts\" id=\"lifts\"></ul>\n            <details class=\"excl\" id=\"excl\">\n              <summary id=\"exclSum\">Not counted</summary>\n              <div class=\"why\" id=\"exclBody\"></div>\n            </details>\n          </div>\n        </div>\n        <p class=\"fine\">Baseline is the median of your first 3 sessions on a lift and current is the median of your last 3. A lift needs 4 or more sessions over at least a month. Lifts that started small and climbed more than 60%, gained mostly in one jump, or switched machines partway are left out. A single entry far off its neighbours is treated as a typo.</p>\n      </article>\n\n      <div class=\"kpis span-12\" id=\"kpis\"></div>\n\n      <article class=\"panel span-6\" aria-labelledby=\"mixTitle\" data-pin>\n        <div class=\"panel-head\">\n          <h2 class=\"h2\" id=\"mixTitle\">Where your sets go</h2>\n          <span class=\"eyebrow\" id=\"mixSub\"></span>\n        </div>\n        <div class=\"controls\">\n          <div class=\"chips\" id=\"rangeChips\" role=\"group\" aria-label=\"Time range\"></div>\n          <button class=\"chip\" id=\"mobToggle\" type=\"button\" aria-pressed=\"true\">Mobility</button>\n        </div>\n        <div class=\"mix\">\n          <div class=\"donut\" id=\"donut\"></div>\n          <ul class=\"legend\" id=\"legend\"></ul>\n        </div>\n        <p class=\"hint\">Tap a slice or row to focus it. Tap it again to clear.</p>\n      </article>\n\n      <article class=\"panel span-6\" aria-labelledby=\"stackTitle\">\n        <div class=\"panel-head\">\n          <h2 class=\"h2\" id=\"stackTitle\">Mix by month</h2>\n          <span class=\"eyebrow\">Share of sets \u00b7 tap a month</span>\n        </div>\n        <div class=\"keyrow\" id=\"stackKey\"></div>\n        <div class=\"plot\" id=\"stack\" data-pin></div>\n      </article>\n\n      <article class=\"panel span-12\" aria-labelledby=\"heatTitle\">\n        <div class=\"panel-head\">\n          <h2 class=\"h2\" id=\"heatTitle\">Consistency</h2>\n          <span class=\"heat-key\" id=\"heatKey\"></span>\n        </div>\n        <div class=\"scrollx\"><div class=\"plot\" id=\"heat\" data-pin></div></div>\n        <p class=\"hint\">Tap a day for details. Tap it again to clear.</p>\n      </article>\n    </div>\n  </section>\n\n  <!-- LOG -->\n  <section id=\"view-log\" class=\"narrow\" role=\"tabpanel\" aria-labelledby=\"tab-log\" hidden>\n    <div class=\"chips\" id=\"chips\" hidden style=\"margin-bottom:16px\"></div>\n    <div class=\"log\" id=\"log\">\n      <div class=\"empty\"><b>Loading your sessions</b>Every workout logged after a session shows up here, newest first.</div>\n    </div>\n  </section>\n\n  <!-- PROGRESS -->\n  <section id=\"view-progress\" class=\"narrow\" role=\"tabpanel\" aria-labelledby=\"tab-progress\" hidden>\n    <div class=\"field\">\n      <label class=\"lab\" for=\"exSel\">Exercise</label>\n      <select id=\"exSel\"></select>\n    </div>\n    <div class=\"verdict\" id=\"verdict\" hidden></div>\n    <figure class=\"fig\">\n      <div class=\"fig-head\">\n        <h2 class=\"fig-title\" id=\"figTitle\">Top weight per session</h2>\n        <span class=\"fig-sub\" id=\"figSub\"></span>\n      </div>\n      <div class=\"plot\" id=\"plot\" data-pin></div>\n      <p class=\"fig-note\">Tap a point to pin its details. Tap it again to clear.</p>\n      <p class=\"fig-note\" id=\"figNote\"></p>\n    </figure>\n    <div class=\"tiles\" id=\"tiles\"></div>\n  </section>\n</main>";
  window.HubApps.iron = {
    mount: function (host, ctx) {
      if (host.shadowRoot) return;
      var root = host.attachShadow({ mode: "open" });
      root.innerHTML = "<style>" + CSS + "</style>" + HTML;
      (function () { var a = document.createElement("article"); a.className = "panel span-12"; a.innerHTML = '<div class="panel-head"><h2 class="h2">Patterns</h2></div><div id="ironIns"></div>'; root.getElementById("heat").closest("article").after(a); ctx.hub.insights(a.querySelector("#ironIns"), "iron"); })();
      var D = {
        getElementById: function (id) { return root.getElementById(id); },
        createElement: function (t) { return document.createElement(t); },
        createElementNS: function (a, b) { return document.createElementNS(a, b); },
        createTextNode: function (t) { return document.createTextNode(t); },
        addEventListener: function (a, b, c) { root.addEventListener(a, b, c); },
        body: root,
        documentElement: host
      };
      (function (document, location, history) {
(function () {
  "use strict";
/* ---------- analytics (pure; embedded verbatim in the page) ---------- */
  var GROUPS = ["Legs", "Back", "Chest", "Arms", "Shoulders", "Core", "Cardio", "Mobility"];
  // First match wins, so the specific patterns sit above the broad ones.
  var GROUP_RULES = [
    ["Mobility", /chin tuck|wall angel|prone y|thoracic|pull-apart|pull apart|stretch|balance|hamstring lower|hinge to counter|foam roll|mobility/i],
    ["Cardio", /bike|treadmill|stair|pool|swim|basketball|battle rope|sled|tire flip|farmer|kettlebell swing|rowing machine|\berg\b|\brun|\bjog|\bwalk|elliptical|jump rope|hike|cycling/i],
    ["Core", /pallof|dead bug|plank|chop|crunch|\bab\b|abs|sit-up|leg raise|bird dog|woodchop|russian twist|carry/i],
    ["Arms", /curl|tricep|pressdown|kickback|skull|dip/i],
    ["Shoulders", /overhead press|shoulder press|face pull|lateral raise|rear delt|front raise|upright row|arnold|military/i],
    ["Back", /row|pulldown|pull-up|pull up|chin-up|pullover|\blat\b|shrug|back extension/i],
    ["Chest", /bench|chest|fly|pec|push-up|push up|incline db press|incline press/i],
    ["Legs", /squat|leg press|hack|abduction|adduction|glute|hip thrust|lunge|step-up|step up|deadlift|rdl|side step|knee|tke|calf|leg ext|leg curl|split squat|hamstring/i]
  ];
  function groupOf(name) {
    for (var i = 0; i < GROUP_RULES.length; i++) if (GROUP_RULES[i][1].test(name)) return GROUP_RULES[i][0];
    return "Other";
  }
  // Sets that count toward the mix. A timed cardio block counts one set per 5 minutes.
  function effSets(x, group) {
    var s = parseFloat(x.sets) || 1;
    if (group === "Cardio") {
      var m = String(x.reps).match(/^(\d+(\.\d+)?)\s*min/i);
      if (m) return Math.max(s, Math.round(parseFloat(m[1]) / 5));
    }
    return s;
  }
  // Top numeric load in a free-text weight, or null when it is not a load (bands, bodyweight, pace).
  function topLoad(w) {
    if (!w || /band|^\s*bw|mph|incline|length|stopped/i.test(w)) return null;
    var m = w.match(/\d+(\.\d+)?/g);
    if (!m) return null;
    return { v: Math.max.apply(null, m.map(Number)), unit: /kg/i.test(w) ? "kg" : "lb" };
  }
  function toLb(load) { return load.unit === "kg" ? Math.round(load.v * 2.20462 * 2) / 2 : load.v; }
  function median(a) { var b = a.slice().sort(function (x, y) { return x - y; }); var n = b.length; return n % 2 ? b[(n - 1) / 2] : (b[n / 2 - 1] + b[n / 2]) / 2; }
  function daysBetween(a, b) { return Math.round((Date.parse(b) - Date.parse(a)) / 86400000); }

  // sessions: oldest first. Returns per-exercise points in lb.
  function loadSeries(sessions) {
    var by = {};
    sessions.forEach(function (s) {
      s.exercises.forEach(function (x) {
        var g = groupOf(x.name);
        if (g === "Cardio" || g === "Mobility") return;
        var l = topLoad(x.weight);
        if (!l) return;
        (by[x.name] = by[x.name] || { name: x.name, group: g, pts: [] }).pts.push({ date: s.date, no: s.no, lb: toLb(l) });
      });
    });
    return Object.keys(by).map(function (k) { return by[k]; });
  }

  var RULES = { minSessions: 4, minDays: 28, window: 3, maxRatio: 1.6, maxStep: 0.5, maxDrop: 0.4 };
  // Strength gain per lift, judged against a solid baseline. Only "counted" lifts feed the total.
  function strengthReport(sessions) {
    var rows = loadSeries(sessions).map(function (e) {
      // A lone entry far off both neighbours is treated as a typo and left out of the math.
      var raw = e.pts, p = [], odd = [];
      raw.forEach(function (x, i) {
        var a = raw[i - 1], b = raw[i + 1];
        if (a && b && (x.lb < 0.6 * Math.min(a.lb, b.lb) || x.lb * 0.6 > Math.max(a.lb, b.lb))) odd.push(x); else p.push(x);
      });
      var v = p.map(function (x) { return x.lb; });
      var r = { name: e.name, group: e.group, pts: raw, used: p, odd: odd, n: raw.length, status: "counted", reason: "" };
      if (p.length < RULES.minSessions || daysBetween(p[0].date, p[p.length - 1].date) < RULES.minDays) {
        r.status = "short"; r.reason = p.length + (p.length === 1 ? " session" : " sessions") + " logged. Needs " + RULES.minSessions + " across a month.";
        return r;
      }
      var w = Math.min(RULES.window, Math.floor(p.length / 2));
      r.base = median(v.slice(0, w));
      r.cur = median(v.slice(-w));
      r.gain = Math.round((r.cur - r.base) * 10) / 10;
      r.since = p[0].date;
      var maxDrop = 0, maxStep = 0;
      for (var i = 1; i < v.length; i++) {
        maxDrop = Math.max(maxDrop, (v[i - 1] - v[i]) / v[i - 1]);
        maxStep = Math.max(maxStep, (v[i] - v[i - 1]) / r.base);
      }
      if (maxDrop > RULES.maxDrop) { r.status = "broken"; r.reason = "Logged weights drop sharply partway through, likely a different machine or stack."; }
      else if (r.cur / r.base > RULES.maxRatio) { r.status = "fast"; r.reason = "Started small and climbed more than " + Math.round((RULES.maxRatio - 1) * 100) + "% above baseline."; }
      else if (maxStep > RULES.maxStep) { r.status = "fast"; r.reason = "Most of the gain came in one jump instead of steady progress."; }
      else if (r.gain <= 0) { r.status = "flat"; r.reason = r.gain === 0 ? "Holding at baseline." : "Currently below baseline."; }
      return r;
    });
    var counted = rows.filter(function (r) { return r.status === "counted"; }).sort(function (a, b) { return b.gain - a.gain; });
    return {
      total: Math.round(counted.reduce(function (t, r) { return t + r.gain; }, 0)),
      counted: counted,
      other: rows.filter(function (r) { return r.status !== "counted"; }).sort(function (a, b) { return b.n - a.n; })
    };
  }

  // Muscle-group mix over a set of sessions.
  function mix(sessions) {
    var sets = {}, total = 0;
    GROUPS.concat("Other").forEach(function (g) { sets[g] = 0; });
    sessions.forEach(function (s) { s.exercises.forEach(function (x) { var g = groupOf(x.name); var n = effSets(x, g); sets[g] += n; total += n; }); });
    return { sets: sets, total: total };
  }

  /* ---------- page ---------- */
  var SERVER = "Supabase";
  var TOOL = "execute_sql";
  var PROJECT = "demo";
  var QUERY = "select session_no, session_date, session_type, knee_status, notes, exercises from fitness.session_log order by session_date desc, session_no desc";
  var CACHE_KEY = "woi-sessions-v1";
  var VIEW_KEY = "woi-view-v2";
  var KNEE = { "No pain": "--st-good", "Mild stiffness": "--st-warn", "Some soreness": "--st-sore", "Pain present": "--st-pain" };
  var GCOL = { Legs: "--g-legs", Back: "--g-back", Chest: "--g-chest", Arms: "--g-arms", Shoulders: "--g-shoulders", Core: "--g-core", Cardio: "--g-cardio", Mobility: "--g-mobility", Other: "--g-other" };
  var MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  var MONTHS_LONG = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  var DOW = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  var RANGES = [["all", "All time"], ["90", "90 days"], ["30", "30 days"]];

  var state = { sessions: [], syncedAt: null, filter: "All", exercise: null, mcp: null, busy: false, report: null, range: "all", mob: true, tab: "overview" };
  try { var pv = JSON.parse(localStorage.getItem(VIEW_KEY) || "null"); if (pv) { state.range = pv.range || "all"; state.mob = pv.mob !== false; } } catch (e) {}
  function saveView() { try { localStorage.setItem(VIEW_KEY, JSON.stringify({ range: state.range, mob: state.mob })); } catch (e) {} }

  var $ = function (id) { return document.getElementById(id); };
  function el(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }
  function svg(tag, attrs) { var n = document.createElementNS("http://www.w3.org/2000/svg", tag); for (var k in attrs) n.setAttribute(k, attrs[k]); return n; }
  function cssv(n) { return getComputedStyle(document.documentElement).getPropertyValue(n).trim(); }
  function parseDate(s) { var p = String(s).slice(0, 10).split("-"); return { y: +p[0], m: +p[1], d: +p[2] }; }
  function fmtDate(s, withYear) { var p = parseDate(s); return MONTHS[p.m - 1] + " " + p.d + (withYear ? " '" + String(p.y).slice(2) : ""); }
  function fmtDateLong(s) { var p = parseDate(s); return MONTHS[p.m - 1] + " " + p.d + ", " + p.y; }
  function iso(d) { return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  function dateOf(s) { var p = parseDate(s); return new Date(p.y, p.m - 1, p.d); }
  function addDays(s, n) { var d = dateOf(s); d.setDate(d.getDate() + n); return iso(d); }
  function today() { return iso(new Date()); }
  function num(n) { return n % 1 ? n.toFixed(1) : String(n); }
  function fmtWeight(w) { if (!w) return ""; return /^[\d.]+([\/-][\d.]+)*$/.test(w) ? w + " lb" : w; }
  function fmtSetsReps(e) { if (e.sets && e.reps) return e.sets + " × " + e.reps; return e.sets ? e.sets + " sets" : (e.reps || ""); }
  function asc() { return state.sessions.slice().reverse(); }
  function placeTip(tip, box, x, y) {
    var r = box.getBoundingClientRect(), tw = tip.offsetWidth, th = tip.offsetHeight;
    var left = x + 14 + tw > r.width ? x - 14 - tw : x + 14;
    var top = Math.min(Math.max(0, y - th - 10), Math.max(0, r.height - th));
    tip.style.transform = "translate(" + Math.max(0, left) + "px," + top + "px)";
  }
  function tipRow(tip, g, label, val) {
    var r = el("div", "r"); var i = el("i"); i.style.background = "var(" + GCOL[g] + ")";
    r.appendChild(i); r.appendChild(document.createTextNode(label)); r.appendChild(el("em", null, val)); tip.appendChild(r);
  }

  /* ---------- click to pin ----------
     One click pins a detail, a second click on the same part releases it, and a click on
     another part moves the pin there. A mouse still previews on hover while nothing is
     pinned; nothing ever needs a press-and-hold. Escape or a click elsewhere releases. */
  var PINS = {};
  function pinner(name, show, hide) {
    var p = { key: null, quiet: null };
    p.hover = function (ev, key) {
      if (ev.pointerType !== "mouse" || p.key != null || (p.quiet != null && p.quiet === key)) return;
      p.quiet = null; show(key, false);
    };
    p.leave = function (ev) { if (ev.pointerType !== "mouse") return; p.quiet = null; if (p.key == null) hide(); };
    p.click = function (key) {
      if (p.key === key) { p.key = null; p.quiet = key; hide(); }
      else { p.key = key; p.quiet = null; show(key, true); }
    };
    p.release = function () { if (p.key == null) return; p.key = null; hide(); };
    PINS[name] = p;
    return p;
  }
  function releaseAll() { Object.keys(PINS).forEach(function (k) { PINS[k].release(); }); }

  // Small popover for dots and bars that carry a label ([data-tip]).
  var pop = el("div", "tip pop"); pop.hidden = true; document.body.appendChild(pop);
  function hidePop() { pop.hidden = true; }
  var POP = pinner("pop", function (t, pinned) {
    pop.textContent = t.getAttribute("data-tip"); pop.classList.toggle("pinned", pinned); pop.hidden = false;
    var r = t.getBoundingClientRect(), pw = pop.offsetWidth, ph = pop.offsetHeight;
    var left = Math.max(8, Math.min(window.innerWidth - pw - 8, r.left + r.width / 2 - pw / 2));
    var top = r.top - ph - 8 < 8 ? r.bottom + 8 : r.top - ph - 8;
    pop.style.transform = "translate(" + left + "px," + top + "px)";
  }, hidePop);
  function tipTarget(n) { return n && n.closest ? n.closest("[data-tip]") : null; }
  document.addEventListener("click", function (ev) {
    var t = tipTarget(ev.target);
    if (t) { POP.click(t); return; }
    POP.release();
    if (!ev.target.isConnected) return; // a control that re-rendered itself; its own handler already ran
    if (!ev.target.closest || !ev.target.closest("[data-pin]")) releaseAll();
  });
  document.addEventListener("pointerover", function (ev) { var t = tipTarget(ev.target); if (t) POP.hover(ev, t); });
  document.addEventListener("pointerout", function (ev) { var t = tipTarget(ev.target); if (t && !t.contains(ev.relatedTarget)) POP.leave(ev); });
  document.addEventListener("keydown", function (ev) { if (ev.key === "Escape") releaseAll(); });
  window.addEventListener("scroll", function () { if (!pop.hidden) { POP.key = null; hidePop(); } }, { passive: true });

  /* ---------- data ---------- */
  function extractRows(result) {
    var p = result && result.payload !== undefined ? result.payload : result;
    if (Array.isArray(p)) return p;
    if (p && Array.isArray(p.result)) return p.result;
    var t = typeof p === "string" ? p : (p && typeof p.result === "string" ? p.result : null);
    if (t == null && result && Array.isArray(result.content)) {
      var blk = result.content.filter(function (b) { return b.type === "text"; })[0];
      t = blk ? blk.text : null;
    }
    if (t == null) throw new Error("Unexpected response shape");
    var close = t.indexOf("</untrusted-data-");
    if (close > -1) { var open = t.lastIndexOf("<untrusted-data-", close); t = t.slice(t.indexOf(">", open) + 1, close); }
    else { t = t.slice(t.indexOf("["), t.lastIndexOf("]") + 1); }
    var rows = JSON.parse(t.trim());
    if (!Array.isArray(rows)) throw new Error("Unexpected response shape");
    return rows;
  }
  function normalize(rows) {
    return rows.map(function (r) {
      var ex = r.exercises;
      if (typeof ex === "string") { try { ex = JSON.parse(ex); } catch (e) { ex = []; } }
      return {
        no: Number(r.session_no), date: String(r.session_date).slice(0, 10), type: String(r.session_type || ""),
        knee: String(r.knee_status || ""), notes: String(r.notes || ""),
        exercises: (Array.isArray(ex) ? ex : []).map(function (e) { return { name: String(e.name || ""), sets: String(e.sets || ""), reps: String(e.reps || ""), weight: String(e.weight || "") }; })
      };
    }).sort(function (a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : b.no - a.no; });
  }
  function readCache() { try { var c = JSON.parse(localStorage.getItem(CACHE_KEY) || "null"); if (c && Array.isArray(c.sessions)) return c; } catch (e) {} return null; }
  function writeCache() { try { localStorage.setItem(CACHE_KEY, JSON.stringify({ sessions: state.sessions, syncedAt: state.syncedAt })); } catch (e) {} }

  function setNotice(text, action) {
    var n = $("notice");
    if (!text) { n.hidden = true; return; }
    $("noticeText").textContent = text; $("noticeBtn").hidden = !action; n.hidden = false;
  }
  function syncLine() {
    var t = $("syncText");
    if (state.busy) { t.textContent = "Syncing with Supabase"; return; }
    if (!state.syncedAt) { t.textContent = state.sessions.length ? state.sessions.length + " sessions" : "Not synced yet"; return; }
    var d = new Date(state.syncedAt);
    t.textContent = state.sessions.length + " sessions · synced " + MONTHS[d.getMonth()] + " " + d.getDate() + ", " + d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  }
  var FIX = {
    needs_reauth: "Supabase needs reconnecting. Reconnect it in claude.ai Settings, Connectors, then press Refresh.",
    server_not_connected: "This page reads your workouts through the Supabase connector. Add Supabase in claude.ai Settings, Connectors, then press Refresh.",
    selection_required: "You have more than one Supabase connector. Choose one when Claude asks, then press Refresh.",
    server_not_found: "The Supabase connector this page used no longer exists. Add it again in claude.ai Settings, Connectors.",
    not_in_manifest: "Supabase access is turned off for this page. Turn it back on in the page's Permissions menu, then press Refresh.",
    blocked_by_policy: "Your organization's policy blocks this page from reading Supabase.",
    not_granted: "Live sync isn't available in this view. Open the tracker in Claude to pull the latest sessions.",
    capability_disabled: "Live sync isn't available in this view. Open the tracker in Claude to pull the latest sessions.",
    capability_removed: "Live sync isn't available in this view. Open the tracker in Claude to pull the latest sessions."
  };
  function showError(err) {
    var code = err && err.code;
    var stale = state.sessions.length ? " Showing the last synced copy." : "";
    if (code === "approval_required" || code === "consent_required") setNotice("Reading your workout log needs your approval." + stale, true);
    else if (FIX[code]) setNotice(FIX[code] + stale, false);
    else if (code === "tool_error") setNotice("Supabase answered with an error: " + (err.message || "unknown error") + "." + stale, false);
    else if (code === "server_unavailable") setNotice("Supabase didn't answer in time. Press Refresh to try again." + stale, false);
    else setNotice("Couldn't load the latest sessions" + (err && err.message ? " (" + err.message + ")" : "") + ". Press Refresh to try again." + stale, false);
  }
  function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function load(fresh, retried) {
    if (!state.mcp || state.busy) return Promise.resolve();
    state.busy = true; $("refresh").disabled = true; syncLine();
    var opts = { cache: fresh ? { refresh: true, staleTime: 60000 } : { staleTime: 60000 } };
    return state.mcp.callTool(SERVER, TOOL, { project_id: PROJECT, query: QUERY }, opts).then(function (res) {
      state.sessions = normalize(extractRows(res));
      state.syncedAt = (res && res.cache && res.cache.storedAt) || Date.now();
      writeCache(); setNotice(null); state.busy = false; render();
    }).catch(function (err) {
      state.busy = false;
      if (err && err.retryable && !retried) return wait(Math.min(err.retryAfterMs || 1500, 8000) + Math.random() * 500).then(function () { return load(fresh, true); });
      showError(err);
    }).then(function () { state.busy = false; $("refresh").disabled = !state.mcp; syncLine(); });
  }

  /* ---------- header + log ---------- */
  function kneePill(status) {
    var p = el("span", "pill"), d = el("span", "dot");
    d.style.background = "var(" + (KNEE[status] || "--ink-3") + ")";
    p.appendChild(d); p.appendChild(document.createTextNode(status || "Not logged"));
    return p;
  }
  function renderHeader() {
    var latest = state.sessions[0];
    $("kneeDot").style.background = "var(" + ((latest && KNEE[latest.knee]) || "--ink-3") + ")";
    $("kneeText").textContent = latest ? "Knee · " + latest.knee : "Knee";
  }
  function renderChips() {
    var box = $("chips");
    var types = ["All"].concat(state.sessions.map(function (s) { return s.type; }).filter(function (t, i, a) { return t && a.indexOf(t) === i; }).sort());
    box.textContent = ""; box.hidden = types.length < 3;
    types.forEach(function (t) {
      var b = el("button", "chip", t); b.type = "button";
      b.setAttribute("aria-pressed", String(state.filter === t));
      b.addEventListener("click", function () { state.filter = t; renderChips(); renderLog(); });
      box.appendChild(b);
    });
  }
  function renderLog() {
    var box = $("log"); box.textContent = "";
    var list = state.sessions.filter(function (s) { return state.filter === "All" || s.type === state.filter; });
    if (!list.length) {
      var e = el("div", "empty");
      e.appendChild(el("b", null, state.sessions.length ? "No sessions of this type" : "No sessions yet"));
      e.appendChild(document.createTextNode(state.sessions.length ? "Pick another filter to see the rest of your log." : "Report a workout to Claude and it lands here."));
      box.appendChild(e); return;
    }
    list.forEach(function (s) {
      var card = el("article", "card"), head = el("div", "card-head"), title = el("div", "card-title");
      title.appendChild(el("span", "no", "Session " + s.no)); title.appendChild(el("span", "type", s.type));
      var meta = el("div", "meta"); meta.appendChild(el("span", null, fmtDateLong(s.date))); meta.appendChild(kneePill(s.knee));
      head.appendChild(title); head.appendChild(meta); card.appendChild(head);
      if (s.exercises.length) {
        var ul = el("ul", "rows");
        s.exercises.forEach(function (x) {
          var li = el("li"), g = groupOf(x.name), gd = el("span", "gd");
          gd.style.background = "var(" + GCOL[g] + ")"; gd.setAttribute("data-tip", g); gd.setAttribute("role", "img"); gd.setAttribute("aria-label", g);
          li.appendChild(gd); li.appendChild(el("span", "ex", x.name)); li.appendChild(el("span", "sr", fmtSetsReps(x)));
          var w = fmtWeight(x.weight); li.appendChild(el("span", "wt" + (w ? "" : " none"), w || "·"));
          ul.appendChild(li);
        });
        card.appendChild(ul);
      }
      if (s.notes) card.appendChild(el("p", "notes", s.notes));
      box.appendChild(card);
    });
  }

  /* ---------- overview: strength gained ---------- */
  var EXCL = [
    ["fast", "Jumped too fast"],
    ["broken", "Machine or stack changed"],
    ["flat", "Holding or below baseline"],
    ["short", "Not enough history yet"]
  ];
  function renderHero() {
    var rep = state.report, big = $("gainBig");
    big.textContent = (rep.total >= 0 ? "+" : "") + rep.total; big.appendChild(el("small", null, "LB"));
    var lifts = $("lifts"); lifts.textContent = "";
    if (!rep.counted.length) {
      $("gainSub").textContent = state.sessions.length ? "No lift has a steady baseline and a gain yet. Keep logging and lifts show up here as they qualify." : "Waiting for your workout log.";
    } else {
      var since = rep.counted.map(function (r) { return r.since; }).sort()[0];
      $("gainSub").textContent = "Added across " + rep.counted.length + " lift" + (rep.counted.length > 1 ? "s" : "") + " that improved steadily from a solid baseline, tracked since " + fmtDateLong(since) + ".";
      var max = rep.counted[0].gain;
      rep.counted.forEach(function (r) {
        var li = el("li", "lift");
        var nm = el("button", "lift-name", r.name); nm.type = "button"; nm.title = "Open in Progress";
        nm.addEventListener("click", function () { state.exercise = r.name; showTab("progress", true); });
        li.appendChild(nm);
        li.appendChild(el("span", "lift-gain", "+" + num(r.gain) + " lb"));
        var meta = el("span", "lift-meta", num(r.base) + " → " + num(r.cur) + " lb · " + r.group + " · " + r.n + " sessions");
        meta.style.gridColumn = "1 / -1"; li.appendChild(meta);
        var bar = el("span", "lift-bar"), fill = el("i"); fill.style.width = Math.max(4, (r.gain / max) * 100) + "%";
        bar.appendChild(fill); li.appendChild(bar);
        lifts.appendChild(li);
      });
    }
    var body = $("exclBody"); body.textContent = "";
    $("excl").hidden = !rep.other.length;
    $("exclSum").textContent = "Not counted · " + rep.other.length + " lift" + (rep.other.length === 1 ? "" : "s");
    EXCL.forEach(function (k) {
      var rows = rep.other.filter(function (r) { return r.status === k[0]; });
      if (!rows.length) return;
      var d = el("div"); d.appendChild(el("h4", null, k[1] + " (" + rows.length + ")"));
      d.appendChild(el("p", null, rows.map(function (r) { return r.base != null ? r.name + " (" + num(r.base) + " → " + num(r.cur) + ")" : r.name; }).join(", ")));
      body.appendChild(d);
    });
  }

  /* ---------- overview: pulse tiles ---------- */
  function kpi(label, value, unit, sub) {
    var k = el("div", "kpi"); k.appendChild(el("span", "eyebrow", label));
    var v = el("span", "v", value); if (unit) v.appendChild(el("em", null, unit)); k.appendChild(v);
    if (sub) k.appendChild(el("span", "s", sub));
    return k;
  }
  function renderKpis() {
    var box = $("kpis"); box.textContent = "";
    var s = state.sessions, t = today();
    if (!s.length) { box.appendChild(kpi("Sessions", "0", "", "None logged yet")); return; }
    var last30 = s.filter(function (x) { return x.date > addDays(t, -30); }).length;
    box.appendChild(kpi("Sessions", String(s.length), "", "+" + last30 + " in the last 30 days"));

    // weekly rhythm: last 12 weeks, newest on the right
    var weeks = [], wkEnd = [];
    for (var w = 11; w >= 0; w--) {
      var hi = addDays(t, -7 * w), lo = addDays(hi, -7);
      weeks.push(s.filter(function (x) { return x.date > lo && x.date <= hi; }).length); wkEnd.push(hi);
    }
    var avg8 = weeks.slice(-8).reduce(function (a, b) { return a + b; }, 0) / 8;
    var k2 = kpi("Per week", avg8.toFixed(1), "AVG", "Last 8 weeks");
    var mx = Math.max.apply(null, weeks.concat(1));
    var sp = svg("svg", { class: "spark", viewBox: "0 0 120 22", preserveAspectRatio: "none", role: "img", "aria-label": "Sessions per week, last 12 weeks: " + weeks.join(", ") });
    weeks.forEach(function (c, i) {
      var h = c ? Math.max(3, (c / mx) * 20) : 1.5;
      var r = svg("rect", { x: i * 10 + 1, y: 22 - h, width: 7, height: h, rx: 1 });
      r.style.fill = c ? "var(--iron)" : "var(--line)"; if (c && i < 11) r.style.fillOpacity = ".55";
      sp.appendChild(r);
      var hb = svg("rect", { x: i * 10, y: 0, width: 10, height: 22, fill: "transparent" });
      hb.setAttribute("data-tip", "Week to " + fmtDate(addDays(wkEnd[i], -1)) + ": " + c + " session" + (c === 1 ? "" : "s"));
      sp.appendChild(hb);
    });
    k2.appendChild(sp); box.appendChild(k2);

    var gap = Math.round((dateOf(t) - dateOf(s[0].date)) / 86400000);
    box.appendChild(kpi("Last session", gap === 0 ? "TODAY" : String(gap), gap === 0 ? "" : (gap === 1 ? "DAY AGO" : "DAYS AGO"), fmtDate(s[0].date) + " · " + s[0].type));

    var recent = s.slice(0, 10), free = recent.filter(function (x) { return x.knee === "No pain"; }).length;
    var k4 = kpi("Knee", String(free), "/" + recent.length, "Pain-free, last " + recent.length + " sessions");
    var strip = el("div", "kstrip");
    recent.slice().reverse().forEach(function (x) { var d = el("span", "dot"); d.style.background = "var(" + (KNEE[x.knee] || "--ink-3") + ")"; d.setAttribute("data-tip", fmtDate(x.date) + " · " + (x.knee || "Not logged")); strip.appendChild(d); });
    k4.appendChild(strip); box.appendChild(k4);
  }

  /* ---------- overview: muscle-group mix ---------- */
  function shownGroups(m) {
    return GROUPS.concat("Other").filter(function (g) { return m.sets[g] > 0 && (state.mob || g !== "Mobility"); });
  }
  function renderRangeChips() {
    var box = $("rangeChips"); box.textContent = "";
    RANGES.forEach(function (r) {
      var b = el("button", "chip", r[1]); b.type = "button"; b.setAttribute("aria-pressed", String(state.range === r[0]));
      b.addEventListener("click", function () { state.range = r[0]; saveView(); renderRangeChips(); renderMix(); });
      box.appendChild(b);
    });
    $("mobToggle").setAttribute("aria-pressed", String(state.mob));
    $("mobToggle").textContent = state.mob ? "Mobility on" : "Mobility off";
  }
  function arcPath(a0, a1, r0, r1) {
    var c = 100, large = a1 - a0 > Math.PI ? 1 : 0;
    function pt(a, r) { return (c + r * Math.cos(a)).toFixed(2) + " " + (c + r * Math.sin(a)).toFixed(2); }
    return "M" + pt(a0, r1) + " A" + r1 + " " + r1 + " 0 " + large + " 1 " + pt(a1, r1) + " L" + pt(a1, r0) + " A" + r0 + " " + r0 + " 0 " + large + " 0 " + pt(a0, r0) + " Z";
  }
  function renderMix() {
    var t = today(), days = state.range === "all" ? 0 : +state.range;
    var list = asc().filter(function (s) { return !days || s.date > addDays(t, -days); });
    var m = mix(list), gs = shownGroups(m);
    var total = gs.reduce(function (a, g) { return a + m.sets[g]; }, 0);
    $("mixSub").textContent = list.length + " session" + (list.length === 1 ? "" : "s");
    var dn = $("donut"), lg = $("legend"); dn.textContent = ""; lg.textContent = "";
    if (!total) {
      var e = el("div", "empty"); e.appendChild(el("b", null, "No sets in this range")); e.appendChild(document.createTextNode("Pick a longer range to see your mix."));
      lg.appendChild(e); return;
    }
    var root = svg("svg", { viewBox: "0 0 200 200", role: "img", "aria-label": "Share of sets by muscle group: " + gs.map(function (g) { return g + " " + Math.round(100 * m.sets[g] / total) + "%"; }).join(", ") });
    var center = el("div", "donut-c"), cb = el("b", null, String(Math.round(total))), cs = el("span", null, "sets");
    center.appendChild(cb); center.appendChild(cs);
    var paths = {}, rows = {};
    function paint(g, pinned) {
      gs.forEach(function (k) {
        var on = !!pinned && k === g;
        paths[k].style.opacity = !g || k === g ? "1" : ".25";
        rows[k].classList.toggle("dim", !!g && k !== g);
        rows[k].classList.toggle("on", on); rows[k].setAttribute("aria-pressed", String(on));
      });
      if (g) { cb.textContent = Math.round(100 * m.sets[g] / total) + "%"; cs.textContent = g; }
      else { cb.textContent = String(Math.round(total)); cs.textContent = "sets"; }
    }
    var pin = pinner("mix", function (g, pinned) { if (pinned) state.mixPin = g; paint(g, pinned); }, function () { state.mixPin = null; paint(null); });
    root.addEventListener("click", function (ev) { if (ev.target.tagName !== "path") pin.release(); });
    var a = -Math.PI / 2;
    gs.forEach(function (g) {
      var share = m.sets[g] / total, a1 = a + share * Math.PI * 2;
      var d = share >= 0.9999 ? arcPath(-Math.PI / 2, Math.PI / 2, 62, 96) + " " + arcPath(Math.PI / 2, Math.PI * 1.5, 62, 96) : arcPath(a, a1, 62, 96);
      var p = svg("path", { d: d, "stroke-width": 2, "stroke-linejoin": "round" });
      p.style.fill = "var(" + GCOL[g] + ")"; p.style.stroke = "var(--surface)";
      p.addEventListener("pointerenter", function (ev) { pin.hover(ev, g); });
      p.addEventListener("pointerleave", function (ev) { pin.leave(ev); });
      p.addEventListener("click", function () { pin.click(g); });
      root.appendChild(p); paths[g] = p; a = a1;
    });
    dn.appendChild(root); dn.appendChild(center);
    gs.slice().sort(function (x, y) { return m.sets[y] - m.sets[x]; }).forEach(function (g) {
      var li = el("li"), sw = el("span", "sw"); sw.style.background = "var(" + GCOL[g] + ")";
      li.appendChild(sw); li.appendChild(el("span", "nm", g));
      li.appendChild(el("span", "pc", Math.round(100 * m.sets[g] / total) + "%"));
      li.appendChild(el("span", "ct", Math.round(m.sets[g]) + " sets"));
      li.tabIndex = 0; li.setAttribute("role", "button"); li.setAttribute("aria-pressed", "false");
      li.addEventListener("pointerenter", function (ev) { pin.hover(ev, g); });
      li.addEventListener("pointerleave", function (ev) { pin.leave(ev); });
      li.addEventListener("click", function () { pin.click(g); });
      li.addEventListener("keydown", function (ev) { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); pin.click(g); } });
      lg.appendChild(li); rows[g] = li;
    });
    if (state.mixPin && gs.indexOf(state.mixPin) > -1) { pin.key = state.mixPin; paint(state.mixPin, true); }
    else state.mixPin = null;
  }

  /* ---------- overview: mix by month ---------- */
  function renderStack() {
    var plot = $("stack"); plot.textContent = "";
    var key = $("stackKey"); key.textContent = "";
    var all = asc(); if (!all.length) return;
    var first = parseDate(all[0].date), now = parseDate(today()), months = [];
    for (var y = first.y, mo = first.m; y < now.y || (y === now.y && mo <= now.m); mo === 12 ? (mo = 1, y++) : mo++) months.push({ y: y, m: mo });
    var cols = months.map(function (k) {
      var pre = k.y + "-" + String(k.m).padStart(2, "0");
      var ss = all.filter(function (s) { return s.date.slice(0, 7) === pre; });
      var mm = mix(ss), gs = shownGroups(mm), tot = gs.reduce(function (a, g) { return a + mm.sets[g]; }, 0);
      return { k: k, n: ss.length, m: mm, gs: gs, tot: tot };
    });
    var used = GROUPS.concat("Other").filter(function (g) { return cols.some(function (c) { return c.gs.indexOf(g) > -1; }); });
    used.forEach(function (g) { var s = el("span"), i = el("i"); i.style.background = "var(" + GCOL[g] + ")"; s.appendChild(i); s.appendChild(document.createTextNode(g)); key.appendChild(s); });

    var W = Math.max(300, Math.floor(plot.clientWidth || 600)), H = 230, m = { t: 8, r: 4, b: 26, l: 38 };
    var iw = W - m.l - m.r, ih = H - m.t - m.b, band = iw / cols.length, bw = Math.min(40, band * 0.64);
    var Y = function (f) { return m.t + ih - f * ih; };
    var root = svg("svg", { viewBox: "0 0 " + W + " " + H, height: H, role: "img", "aria-label": "Share of sets by muscle group for each month" });
    [0, 0.5, 1].forEach(function (f) {
      var ln = svg("line", { x1: m.l, x2: W - m.r, y1: Y(f), y2: Y(f), "stroke-width": 1 }); ln.style.stroke = f ? "var(--line-soft)" : "var(--line)"; root.appendChild(ln);
      var tx = svg("text", { x: m.l - 8, y: Y(f) + 4, "text-anchor": "end", "font-size": 11 }); tx.style.fill = "var(--ink-3)"; tx.style.fontFamily = "var(--mono)"; tx.textContent = Math.round(f * 100) + "%"; root.appendChild(tx);
    });
    var labEvery = band < 30 ? 2 : 1;
    cols.forEach(function (c, i) {
      var x = m.l + band * i + (band - bw) / 2, acc = 0;
      if (c.tot) {
        c.gs.forEach(function (g) {
          var f = c.m.sets[g] / c.tot, y1 = Y(acc + f), h = Y(acc) - y1;
          var r = svg("rect", { x: x, y: y1, width: bw, height: Math.max(0, h), "stroke-width": 1 });
          r.style.fill = "var(" + GCOL[g] + ")"; r.style.stroke = "var(--surface)"; root.appendChild(r); acc += f;
        });
      } else {
        var e = svg("rect", { x: x, y: Y(0) - 2, width: bw, height: 2 }); e.style.fill = "var(--line)"; root.appendChild(e);
      }
      if (i % labEvery === 0 || i === cols.length - 1) {
        var lt = svg("text", { x: x + bw / 2, y: H - 8, "text-anchor": "middle", "font-size": 11 }); lt.style.fill = "var(--ink-3)"; lt.style.fontFamily = "var(--mono)";
        lt.textContent = MONTHS[c.k.m - 1].toUpperCase() + (band >= 48 && (i === 0 || c.k.m === 1) ? " '" + String(c.k.y).slice(2) : ""); root.appendChild(lt);
      }
    });
    var hl = svg("rect", { y: m.t, height: ih, visibility: "hidden" }); hl.style.fill = "var(--ink)"; hl.style.fillOpacity = ".05";
    root.insertBefore(hl, root.firstChild);
    var hit = svg("rect", { x: m.l, y: 0, width: iw, height: H, fill: "transparent" }); root.appendChild(hit);
    plot.appendChild(root);
    var tip = el("div", "tip"); tip.hidden = true; plot.appendChild(tip);
    function idx(ev) {
      var r = root.getBoundingClientRect(), px = (ev.clientX - r.left) * (W / r.width);
      return Math.max(0, Math.min(cols.length - 1, Math.floor((px - m.l) / band)));
    }
    function show(i, pinned) {
      var r = root.getBoundingClientRect(), c = cols[i];
      hl.setAttribute("x", m.l + band * i); hl.setAttribute("width", band); hl.setAttribute("visibility", "visible");
      hl.style.fillOpacity = pinned ? ".1" : ".05";
      tip.textContent = ""; tip.appendChild(el("b", null, MONTHS_LONG[c.k.m - 1] + " " + c.k.y + " · " + c.n + " session" + (c.n === 1 ? "" : "s")));
      if (!c.tot) tip.appendChild(document.createTextNode("No sets logged"));
      c.gs.slice().sort(function (a, b) { return c.m.sets[b] - c.m.sets[a]; }).forEach(function (g) { tipRow(tip, g, g, Math.round(100 * c.m.sets[g] / c.tot) + "%"); });
      tip.classList.toggle("pinned", !!pinned); tip.hidden = false;
      placeTip(tip, plot, (m.l + band * (i + 0.5)) * (r.width / W), 90);
    }
    function hide() { hl.setAttribute("visibility", "hidden"); tip.hidden = true; }
    var pin = pinner("stack", show, hide);
    hit.addEventListener("pointermove", function (ev) { pin.hover(ev, idx(ev)); });
    hit.addEventListener("pointerleave", function (ev) { pin.leave(ev); });
    hit.addEventListener("click", function (ev) { pin.click(idx(ev)); });
  }

  /* ---------- overview: consistency heatmap ---------- */
  function renderHeat() {
    var plot = $("heat"); plot.textContent = ""; var keyBox = $("heatKey"); keyBox.textContent = "";
    var all = asc(); if (!all.length) return;
    var byDay = {};
    all.forEach(function (s) {
      var v = s.exercises.reduce(function (a, x) { return a + effSets(x, groupOf(x.name)); }, 0);
      var d = byDay[s.date] || (byDay[s.date] = { sets: 0, ss: [] }); d.sets += v; d.ss.push(s);
    });
    var vals = Object.keys(byDay).map(function (k) { return byDay[k].sets; }).sort(function (a, b) { return a - b; });
    var q = function (p) { return vals[Math.min(vals.length - 1, Math.floor(p * vals.length))]; }, t1 = q(.25), t2 = q(.5), t3 = q(.75);
    var OP = [0, .3, .5, .75, 1];
    function level(v) { return !v ? 0 : v <= t1 ? 1 : v <= t2 ? 2 : v <= t3 ? 3 : 4; }
    var t = today(), start = dateOf(all[0].date); start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
    var weeks = Math.ceil(((dateOf(t) - start) / 86400000 + 1) / 7);
    var cell = 12, gap = 3, step = cell + gap, L = 30, T = 18;
    var W = L + weeks * step, H = T + 7 * step;
    var root = svg("svg", { viewBox: "0 0 " + W + " " + H, width: W, height: H, role: "img", "aria-label": "Training days since " + fmtDateLong(all[0].date) });
    root.style.width = W + "px";
    ["Mon", "", "Wed", "", "Fri", "", "Sun"].forEach(function (d, i) {
      if (!d) return; var tx = svg("text", { x: 0, y: T + i * step + cell - 2, "font-size": 10 }); tx.style.fill = "var(--ink-3)"; tx.style.fontFamily = "var(--mono)"; tx.textContent = d.toUpperCase(); root.appendChild(tx);
    });
    var tip = el("div", "tip"); tip.hidden = true;
    var cells = {}, marked = null;
    function mark(ds, pinned) {
      if (marked) { var o = cells[marked]; o.r.style.stroke = marked === t ? "var(--ink-2)" : "none"; o.r.setAttribute("stroke-width", marked === t ? 1 : 0); }
      marked = pinned ? ds : null;
      if (marked) { cells[ds].r.style.stroke = "var(--ink)"; cells[ds].r.setAttribute("stroke-width", 1.5); }
    }
    var hpin = pinner("heat", function (ds, pinned) {
      var c = cells[ds];
      tip.textContent = "";
      tip.appendChild(el("b", null, DOW[dateOf(ds).getDay()] + ", " + fmtDateLong(ds)));
      if (c.info) c.info.ss.forEach(function (s) { tip.appendChild(el("div", null, "Session " + s.no + " · " + s.type)); });
      tip.appendChild(document.createTextNode(c.info ? Math.round(c.info.sets) + " sets" : "Rest day"));
      tip.classList.toggle("pinned", !!pinned); tip.hidden = false; placeTip(tip, plot, c.x, c.y);
      mark(ds, pinned);
    }, function () { tip.hidden = true; mark(null); });
    var continue_label = false, lastMonth = -1, lastLabelW = -9, trainedWeeks = 0;
    for (var w = 0; w < weeks; w++) {
      var any = false;
      for (var d = 0; d < 7; d++) {
        var day = new Date(start); day.setDate(start.getDate() + w * 7 + d); var ds = iso(day);
        if (ds > t) continue;
        if (d === 0 && day.getMonth() !== lastMonth) {
          lastMonth = day.getMonth();
          if (w - lastLabelW < 3) continue_label = true; else continue_label = false;
          lastLabelW = continue_label ? lastLabelW : w;
          var mt = svg("text", { x: L + w * step, y: 11, "font-size": 10 }); mt.style.fill = "var(--ink-3)"; mt.style.fontFamily = "var(--mono)"; mt.textContent = MONTHS[lastMonth].toUpperCase(); if (!continue_label) root.appendChild(mt);
        }
        var info = byDay[ds], lv = level(info ? info.sets : 0); if (info) any = true;
        var r = svg("rect", { x: L + w * step, y: T + d * step, width: cell, height: cell, rx: 2 });
        r.style.fill = lv ? "var(--iron)" : "var(--line-soft)"; if (lv) r.style.fillOpacity = String(OP[lv]);
        if (ds === t) { r.style.stroke = "var(--ink-2)"; r.setAttribute("stroke-width", 1); }
        cells[ds] = { r: r, info: info, x: L + w * step + cell, y: T + d * step + 4 };
        r.style.cursor = "pointer";
        (function (ds) {
          r.addEventListener("pointerenter", function (ev) { hpin.hover(ev, ds); });
          r.addEventListener("pointerleave", function (ev) { hpin.leave(ev); });
          r.addEventListener("click", function () { hpin.click(ds); });
        })(ds);
        root.appendChild(r);
      }
      if (any) trainedWeeks++;
    }
    plot.style.width = W + "px"; plot.appendChild(root); plot.appendChild(tip);
    var sc = plot.parentNode; sc.scrollLeft = sc.scrollWidth;
    keyBox.appendChild(document.createTextNode("Trained in " + trainedWeeks + " of " + weeks + " weeks · Less "));
    OP.forEach(function (o) { var i = el("i"); i.style.background = o ? "var(--iron)" : "var(--line-soft)"; if (o) i.style.opacity = String(o); keyBox.appendChild(i); });
    keyBox.appendChild(document.createTextNode(" More"));
  }

  function renderOverview() {
    state.report = strengthReport(asc());
    renderHero(); renderKpis(); renderRangeChips(); renderMix(); renderStack(); renderHeat();
  }

  /* ---------- progress ---------- */
  function historyFor(name) {
    var out = [];
    asc().forEach(function (s) { s.exercises.forEach(function (x) { if (x.name === name) { var l = topLoad(x.weight); out.push({ date: s.date, no: s.no, x: x, lb: l ? toLb(l) : null }); } }); });
    return out;
  }
  function renderSelect() {
    var counts = {};
    state.sessions.forEach(function (s) { s.exercises.forEach(function (x) { if (topLoad(x.weight)) counts[x.name] = (counts[x.name] || 0) + 1; }); });
    var names = Object.keys(counts).sort(function (a, b) { return counts[b] - counts[a] || (a < b ? -1 : 1); });
    var sel = $("exSel"); sel.textContent = "";
    names.forEach(function (n) { var o = el("option", null, n + "  (" + counts[n] + ")"); o.value = n; sel.appendChild(o); });
    if (names.indexOf(state.exercise) < 0) state.exercise = names[0] || null;
    if (state.exercise) sel.value = state.exercise;
  }
  function reportRow(name) {
    var rep = state.report || strengthReport(asc());
    state.report = rep;
    return rep.counted.concat(rep.other).filter(function (r) { return r.name === name; })[0] || null;
  }
  function renderVerdict(r) {
    var v = $("verdict"); v.textContent = "";
    if (!r) { v.hidden = true; return; }
    var labels = { counted: "Counts +" + num(r.gain || 0) + " lb", fast: "Not counted", broken: "Not counted", flat: "Holding", short: "Too early" };
    var tag = el("span", "tag" + (r.status === "counted" ? " on" : ""), labels[r.status]); v.appendChild(tag);
    var text = r.status === "counted"
      ? "Baseline " + num(r.base) + " lb, now " + num(r.cur) + " lb, built over " + r.n + " sessions."
      : r.reason;
    if (r.odd && r.odd.length) text += " " + r.odd.length + " odd entr" + (r.odd.length > 1 ? "ies" : "y") + " (" + r.odd.map(function (p) { return fmtDate(p.date); }).join(", ") + ") left out of the math.";
    v.appendChild(el("p", null, text)); v.hidden = false;
  }
  function niceStep(span, target) { var raw = span / target, mag = Math.pow(10, Math.floor(Math.log10(raw))), n = raw / mag; return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10) * mag; }
  function renderChart() {
    var plot = $("plot"); plot.textContent = "";
    var name = state.exercise, hist = name ? historyFor(name) : [], pts = hist.filter(function (h) { return h.lb != null; });
    var r = name ? reportRow(name) : null; renderVerdict(r);
    var odd = {}; (r && r.odd || []).forEach(function (p) { odd[p.date + "#" + p.no] = 1; });
    $("figTitle").textContent = name || "Top weight per session";
    $("figSub").textContent = pts.length ? "Top weight per session, lb" : "";
    var hasKg = hist.some(function (h) { return /kg/i.test(h.x.weight); });
    $("figNote").textContent = hasKg ? "Weights logged in kg are converted to lb." : "";
    $("figNote").hidden = !hasKg;
    if (pts.length < 2) {
      var e = el("div", "empty"); e.appendChild(el("b", null, pts.length ? "One session so far" : "Nothing to chart yet"));
      e.appendChild(document.createTextNode("The line appears once this exercise has two logged weights.")); plot.appendChild(e); return;
    }
    var W = Math.max(280, Math.floor(plot.clientWidth || 600)), H = 230, m = { t: 18, r: 44, b: 30, l: 40 };
    var vals = pts.map(function (p) { return p.lb; });
    if (r && r.base != null) vals = vals.concat(r.base);
    var lo = Math.min.apply(null, vals), hi = Math.max.apply(null, vals); if (lo === hi) { lo -= 5; hi += 5; }
    var step = niceStep(hi - lo, 4), y0 = Math.floor(lo / step) * step, y1 = Math.ceil(hi / step) * step;
    var iw = W - m.l - m.r, ih = H - m.t - m.b;
    var X = function (i) { return m.l + (i / (pts.length - 1)) * iw; };
    var Y = function (v) { return m.t + ih - ((v - y0) / (y1 - y0)) * ih; };
    var root = svg("svg", { viewBox: "0 0 " + W + " " + H, height: H, role: "img", "aria-label": name + ", top weight per session in lb, from " + pts[0].lb + " to " + pts[pts.length - 1].lb });
    function txt(x, y, s, anchor, col, size) { var t = svg("text", { x: x, y: y, "text-anchor": anchor || "start", "font-size": size || 11 }); t.style.fill = "var(" + (col || "--ink-3") + ")"; t.style.fontFamily = "var(--mono)"; t.textContent = s; root.appendChild(t); return t; }
    for (var v = y0; v <= y1 + 1e-9; v += step) {
      var ln = svg("line", { x1: m.l, x2: W - m.r, y1: Y(v), y2: Y(v), "stroke-width": 1 }); ln.style.stroke = "var(--line-soft)"; root.appendChild(ln);
      txt(m.l - 8, Y(v) + 4, String(Math.round(v * 100) / 100), "end");
    }
    var want = Math.min(pts.length, W < 420 ? 3 : 5), ticks = [];
    for (var k = 0; k < want; k++) ticks.push(Math.round(k * (pts.length - 1) / Math.max(1, want - 1)));
    ticks.filter(function (t, i, a) { return a.indexOf(t) === i; }).forEach(function (i, idx, arr) {
      txt(X(i), H - 9, fmtDate(pts[i].date, idx === 0), idx === 0 ? "start" : idx === arr.length - 1 ? "end" : "middle");
    });
    if (r && r.base != null) {
      var bl = svg("line", { x1: m.l, x2: W - m.r, y1: Y(r.base), y2: Y(r.base), "stroke-width": 1, "stroke-dasharray": "4 4" }); bl.style.stroke = "var(--ink-3)"; root.appendChild(bl);
      txt(W - m.r + 6, Y(r.base) + 4, "BASE", "start", "--ink-3", 10);
    }
    var d = pts.map(function (p, i) { return (i ? "L" : "M") + X(i).toFixed(1) + " " + Y(p.lb).toFixed(1); }).join(" ");
    var area = svg("path", { d: d + " L" + X(pts.length - 1).toFixed(1) + " " + (m.t + ih) + " L" + X(0).toFixed(1) + " " + (m.t + ih) + " Z" }); area.style.fill = "var(--iron)"; area.style.fillOpacity = ".07"; root.appendChild(area);
    var line = svg("path", { d: d, fill: "none", "stroke-width": 2, "stroke-linejoin": "round", "stroke-linecap": "round" }); line.style.stroke = "var(--iron)"; root.appendChild(line);
    pts.forEach(function (p, i) {
      var isOdd = odd[p.date + "#" + p.no], last = i === pts.length - 1;
      var c = svg("circle", { cx: X(i), cy: Y(p.lb), r: last ? 5 : 4, "stroke-width": 2 });
      c.style.fill = isOdd ? "var(--surface)" : "var(--iron)"; c.style.stroke = isOdd ? "var(--iron)" : "var(--surface)"; root.appendChild(c);
    });
    if (!(r && r.base != null && Math.abs(Y(r.base) - Y(pts[pts.length - 1].lb)) < 12)) txt(X(pts.length - 1) + 9, Y(pts[pts.length - 1].lb) + 4, num(pts[pts.length - 1].lb), "start", "--ink", 12);
    var cross = svg("line", { y1: m.t, y2: m.t + ih, "stroke-width": 1, "stroke-dasharray": "2 3", visibility: "hidden" }); cross.style.stroke = "var(--ink-3)"; root.appendChild(cross);
    var hit = svg("rect", { x: m.l - 10, y: 0, width: iw + 20, height: H, fill: "transparent" }); root.appendChild(hit);
    plot.appendChild(root);
    var tip = el("div", "tip"); tip.hidden = true; plot.appendChild(tip);
    function idx(ev) {
      var rc = root.getBoundingClientRect(), px = (ev.clientX - rc.left) * (W / rc.width);
      return Math.max(0, Math.min(pts.length - 1, Math.round(((px - m.l) / iw) * (pts.length - 1))));
    }
    function show(i, pinned) {
      var rc = root.getBoundingClientRect(), p = pts[i];
      cross.setAttribute("x1", X(i)); cross.setAttribute("x2", X(i)); cross.setAttribute("visibility", "visible");
      cross.style.stroke = pinned ? "var(--iron)" : "var(--ink-3)"; cross.setAttribute("stroke-dasharray", pinned ? "none" : "2 3");
      tip.textContent = ""; tip.appendChild(el("b", null, fmtWeight(p.x.weight)));
      tip.appendChild(document.createTextNode(fmtSetsReps(p.x) + " · " + fmtDateLong(p.date) + (odd[p.date + "#" + p.no] ? " · ignored" : "")));
      tip.classList.toggle("pinned", !!pinned); tip.hidden = false; placeTip(tip, plot, X(i) * (rc.width / W), Y(p.lb) * (rc.height / H));
    }
    function hide() { cross.setAttribute("visibility", "hidden"); tip.hidden = true; }
    var pin = pinner("line", show, hide);
    hit.addEventListener("pointermove", function (ev) { pin.hover(ev, idx(ev)); });
    hit.addEventListener("pointerleave", function (ev) { pin.leave(ev); });
    hit.addEventListener("click", function (ev) { pin.click(idx(ev)); });
  }
  function renderTiles() {
    var box = $("tiles"); box.textContent = ""; if (!state.exercise) return;
    historyFor(state.exercise).reverse().forEach(function (h) {
      var t = el("div", "tile"); t.appendChild(el("span", "d", fmtDate(h.date, true) + " · #" + h.no));
      var w = fmtWeight(h.x.weight); t.appendChild(el("span", "w" + (w ? "" : " none"), w || "No weight"));
      t.appendChild(el("span", "s", fmtSetsReps(h.x))); box.appendChild(t);
    });
  }
  function renderProgress() { renderSelect(); renderChart(); renderTiles(); }

  /* ---------- render + tabs ---------- */
  function render() {
    renderHeader(); renderChips(); renderLog(); state.report = strengthReport(asc());
    if (state.tab === "overview") renderOverview();
    if (state.tab === "progress") renderProgress();
    syncLine();
  }
  var TABS = ["overview", "log", "progress"];
  function showTab(name, push) {
    if (TABS.indexOf(name) < 0) name = "overview";
    state.tab = name;
    TABS.forEach(function (t) { $("view-" + t).hidden = t !== name; $("tab-" + t).setAttribute("aria-selected", String(t === name)); });
    if (name === "overview") renderOverview();
    if (name === "progress") renderProgress();
    if (push) { try { history.replaceState(null, "", "#" + name); } catch (e) {} }
    window.scrollTo(0, 0);
  }
  TABS.forEach(function (t) { $("tab-" + t).addEventListener("click", function () { showTab(t, true); }); });
  $("mobToggle").addEventListener("click", function () { state.mob = !state.mob; saveView(); renderRangeChips(); renderMix(); renderStack(); });
  $("exSel").addEventListener("change", function (e) { state.exercise = e.target.value; renderChart(); renderTiles(); });
  $("refresh").addEventListener("click", function () { load(true); });
  $("noticeBtn").addEventListener("click", function () { load(true); });
  var rz, lastW = window.innerWidth;
  window.addEventListener("resize", function () {
    clearTimeout(rz);
    rz = setTimeout(function () {
      if (window.innerWidth === lastW) return; lastW = window.innerWidth;
      if (state.tab === "overview") renderStack();
      if (state.tab === "progress") renderChart();
    }, 150);
  });

  /* ---------- boot ---------- */
  var cached = readCache();
  if (cached) { state.sessions = cached.sessions; state.syncedAt = cached.syncedAt || null; }
  state.tab = TABS.indexOf(location.hash.slice(1)) > -1 ? location.hash.slice(1) : "overview";
  showTab(state.tab, false); render();

  var use = ctx.mcp;
  Promise.resolve(use).catch(function () { return null; }).then(function (mcp) {
    state.mcp = mcp || null;
    if (!mcp) { showError({ code: "capability_disabled" }); if (!state.sessions.length) renderLog(); syncLine(); return; }
    $("refresh").disabled = false;
    load(false);
  });
})();
      })(D, { hash: "" }, { replaceState: function () {} });
    }
  };
})();
