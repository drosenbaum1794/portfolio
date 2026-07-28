# Portfolio site

Jekyll site for GitHub Pages. Homepage, projects grid, and a detail page per
project with room for an embedded video walkthrough. Built so routine updates
never require touching HTML or CSS.

**Live at:** https://drosenbaum1794.github.io/portfolio/

## Repo map

```
_config.yml           site title, tagline, name, email, LinkedIn
index.md              homepage (hero + featured projects)
projects.md           full projects grid (auto-generated from _projects/)
about.md              bio, timeline, background
contact.md            contact links
_projects/            one markdown file per project. THIS IS WHAT YOU EDIT MOST
_drafts-private/      NOT committed. Tier 2 work pending your approval
_layouts/             page templates (rarely need to touch these)
_includes/            reusable snippets: nav, footer, video embed, project card
assets/css/main.scss  all site styling, one file, organized by section
assets/images/        favicon + optional project thumbnails
```

## The repo is public

Anything committed here is readable by anyone, including your current employer,
whether or not it appears on the rendered site. Marking a page `published:
false` hides it from the site but **not** from the repo.

That is why `_drafts-private/` exists and is gitignored. Internal work, internal
metrics, program names, and partner or client names stay there until you decide
otherwise. See `_drafts-private/README.md`.

## Adding a new project

Copy any file in `_projects/` to a new file in the same folder and edit the
front matter:

```yaml
---
title: "Project Name"
summary: "One sentence a hiring manager can read in five seconds."
role: "Your role on this project"
period: "April 2023 to January 2026"   # free text, shown as "Timeline"
order: 5                # controls sort position. Lower shows first
featured: true          # homepage shows the first three featured, by order
tags: [AI Agents, Adoption]           # short labels on the card
skills: [Python, Slack API]           # shown on the detail page
thumbnail: /assets/images/projects/my-thumb.jpg   # optional
video_platform: none    # youtube | loom | none
video_id: "XXXXXXXXXXX" # only needed if platform is youtube or loom
links:
  - label: "View site"
    url: "https://example.com"
---
Write the case study here in normal markdown. The problem, what you built, the
result, what you learned.
```

That is the whole workflow. No other file changes. The project appears on
`/projects/` automatically, and on the homepage if `featured: true`.

Notes:

- `order` drives sorting, not dates. That keeps you from having to invent a
  date for work that does not have a clean one.
- Skip `thumbnail` and the card falls back to a colored initial tile, so it is
  safe to leave out until you have a real image.

## Adding a video walkthrough

Videos are **not** stored in this repo. GitHub has file size limits and video
files bloat every future clone. Host externally and embed:

**YouTube**
1. Upload as **Unlisted** (reachable by direct link, not searchable, not on
   your channel page).
2. Copy the ID from `youtube.com/watch?v=XXXXXXXXXXX`, the `XXXXXXXXXXX` part.
3. Set `video_platform: youtube` and `video_id: "XXXXXXXXXXX"`.

**Loom**
1. Copy the share URL, `loom.com/share/XXXXXXXXXXXX`.
2. Set `video_platform: loom` and `video_id: "XXXXXXXXXXXX"`.

**No video yet?** Leave `video_platform: none`. The page renders with no video
block and no empty space. Nothing signals that a video is missing.

Fill in `video_platform` and `video_id` whenever you record one and the embed
appears automatically.

If you ever want the opposite, a visible "coming soon" slot holding the space,
set `show_video_placeholders: true` in `_config.yml`. It is off by default.

## Adding numbers, stat tiles, and charts

Both are optional front matter blocks on any project. Neither needs code.

**A row of headline numbers:**

```yaml
stats:
  - value: "~1,900"          # any string, so "180+" and "60 to 70%" work
    label: "Queries handled"
```

Four tiles or fewer reads best.

**A bar chart:**

```yaml
chart:
  title: "Resolution rate, auto-tagged versus estimated effective"
  max: 100                   # the value that equals a full-width bar
  bars:
    - label: "Auto-tagged in production"
      value: 31              # number, sets the bar width
      display: "31%"         # what the reader sees
      muted: true            # optional, grays the bar as context
    - label: "Estimated effective"
      value: 60
      value_to: 70           # optional, draws a lighter range extension
      display: "60 to 70%"
  note: "Optional line of context under the chart."
```

Rules worth keeping:

- One accent color plus gray. `muted: true` marks the context bar, color marks
  the point. Do not add more colors, since a reader with color blindness would
  lose the distinction.
- Every bar shows its own value, so the chart never depends on color alone.
- Use `value_to` for estimates and ranges rather than picking a midpoint and
  presenting it as exact.
- Only chart numbers you can source. A chart implies a precision that prose
  does not.

## Voice rules for site copy

From the content package, worth keeping in front of you when editing:

- No em dashes. Use periods, commas, or parentheses.
- Numbers over adjectives. Never "widely adopted," always the figure.
- Do not fuse two accomplishments into one sentence unless they came from the
  same program.
- State work at the altitude it actually happened.

## Previewing locally

Requires [Ruby](https://www.ruby-lang.org/en/documentation/installation/) once.

```
bundle install
bundle exec jekyll serve
```

Then open http://localhost:4000/portfolio/.

You do not strictly need this. Pushing to `master` rebuilds the live site in a
minute or two either way.

## Publishing changes

```
git add -A
git commit -m "what changed"
git push
```

GitHub Pages rebuilds automatically. If a change does not show up, wait a
minute and hard refresh (Ctrl+Shift+R). Pages caches HTML for ten minutes.

### Moving to a custom domain later

Buy the domain, add a `CNAME` file at the repo root containing just the domain,
point DNS at GitHub Pages, then set `url` to the domain and `baseurl: ""` in
`_config.yml`.

## Changing the look

Everything visual is in `assets/css/main.scss`. Colors, fonts, and spacing are
variables at the top of that file. Change those before touching anything below.
