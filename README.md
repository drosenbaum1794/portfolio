# Portfolio site

A Jekyll site built for GitHub Pages: a homepage, a projects grid, and a
detail page per project with an embedded video walkthrough. Built to be easy
to extend without touching HTML/CSS for routine updates.

## Repo map

```
_config.yml           site title, tagline, author/contact info, resume path
index.md              homepage (hero + featured projects)
projects.md           full projects grid (auto-generated from _projects/)
about.md              bio / background page
contact.md            contact links
_projects/            one markdown file per project — THIS IS WHAT YOU EDIT MOST
_layouts/             page templates (rarely need to touch these)
_includes/            reusable snippets: nav, footer, video embed, project card
assets/css/main.scss  all site styling, in one file, organized by section
assets/images/        favicon + project thumbnails
assets/files/          resume.pdf goes here
```

## Quick start: editing your info

1. Open `_config.yml` and fill in `title`, `tagline`, `url`, `baseurl`, and
   everything under `author:` (name, email, linkedin, github).
2. Drop your résumé PDF at `assets/files/resume.pdf`.
3. Rewrite `about.md` and `contact.md` with your real bio and background.

## Adding a new project

Copy any file in `_projects/` (e.g. `_projects/workshop-series.md`) to a new
file in the same folder, named after the project
(`_projects/my-new-project.md`), and edit the front matter at the top:

```yaml
---
title: "Project Name"
summary: "One sentence a hiring manager can read in 5 seconds."
role: "Your role on this project"
date: 2026-06-01
featured: true              # show on homepage? (only first 3 featured show there)
tags: [Enablement, AI Adoption]      # short labels shown on the card
skills: [Notion, Figma, Facilitation] # shown on the project detail page
thumbnail: /assets/images/projects/my-thumb.jpg  # optional — see fallback note below
video_platform: youtube     # youtube | loom | none
video_id: "XXXXXXXXXXX"     # see "Adding a video" below
links:
  - label: "View repo"
    url: "https://github.com/..."
---
Write the full case study here in normal markdown: the problem, what you
built, the result. Use `##` headings, bullet lists, images — whatever reads
best.
```

That's the whole workflow — no other file needs to change. The project
automatically appears on `/projects/` and, if `featured: true`, on the
homepage.

If you skip `thumbnail`, the card shows a simple colored initial tile instead
of a broken image — so it's safe to leave out until you have a real image.

## Adding a video walkthrough

Videos are **not** stored in this repo — GitHub has file size limits and
large video files bloat every future clone. Instead, host the video
externally and embed it:

**YouTube (recommended for public portfolios)**
1. Upload the video to YouTube as **Unlisted** (visible only via direct link,
   not searchable, not on your channel page).
2. Copy the video ID from the URL: `youtube.com/watch?v=XXXXXXXXXXX` → the
   `XXXXXXXXXXX` part.
3. In the project's front matter: `video_platform: youtube` and
   `video_id: "XXXXXXXXXXX"`.

**Loom (fast for quick screen recordings)**
1. Record and share the Loom, copy the share URL:
   `loom.com/share/XXXXXXXXXXXX`.
2. Use the ID after `/share/`: `video_platform: loom`,
   `video_id: "XXXXXXXXXXXX"`.

**No video yet?** Set `video_platform: none` (or omit both fields) — the
project page just won't show a video block.

## Previewing locally

Requires [Ruby](https://www.ruby-lang.org/en/documentation/installation/) installed once.

```
bundle install
bundle exec jekyll serve
```

Then open http://localhost:4000. The site rebuilds automatically as you save
files.

## Publishing to GitHub Pages

1. Create a new **public** repo on GitHub (this was scaffolded as a project
   site, e.g. `portfolio` — not `yourusername.github.io`).
2. Push this folder to it:
   ```
   git remote add origin https://github.com/yourusername/portfolio.git
   git push -u origin main
   ```
3. In the repo on GitHub: **Settings → Pages → Source** → set to deploy from
   the `main` branch, `/ (root)` folder.
4. Your site will be live at `https://yourusername.github.io/portfolio/`
   within a minute or two.
5. Make sure `url` and `baseurl` in `_config.yml` match that exact address
   (baseurl is the `/portfolio` part).

### If you'd rather use a `username.github.io` root site instead

Rename the GitHub repo to exactly `yourusername.github.io`, set `baseurl: ""`
in `_config.yml`, and your site becomes `https://yourusername.github.io`
directly (no `/portfolio` path).

## Changing the look

Everything visual lives in one file: `assets/css/main.scss`. Colors, fonts,
spacing are all set as variables at the top of that file — change those
first before touching anything further down.
