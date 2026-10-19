---
title: "What's on Tap"
summary: "A personal CRM and life hub. Claude keeps my calendar, relationships, workouts, meals and health data in one database, then tells me what's worth noticing."
role: "Designer and builder"
period: "October 2026 to present"
order: 7
featured: true
tags: [Personal CRM, AI Agents, Data]
skills: [Claude, MCP connectors, Supabase, PostgreSQL, JavaScript, D3.js]
thumbnail: /assets/images/projects/whats-on-tap/thumbnail.png
video_platform: none
video_id: ""
links:
  - label: "Try the demo"
    url: "/demos/whats-on-tap/"
---

What's on Tap is my personal CRM and life hub. It pulls my calendar, inbox, contacts, workouts, meals and Apple Health into one place, sorts it, and points out the things worth acting on: a promise I made last week, a friend I haven't talked to in a while, a resting heart rate that's been creeping up.

I built it with Claude, and Claude also runs it. Scheduled tasks do the syncing, sorting and pattern-finding every week, and the hub reads everything live from a Supabase database.

**[Try the demo]({{ '/demos/whats-on-tap/' | relative_url }})**. It runs the real app on made-up data for a made-up person named Sam, with a short guided tour. Click around, mark things done, answer its questions. Nothing you do leaves your browser.

![The Today screen: the day's calendar, open promises, training and food]({{ '/assets/images/projects/whats-on-tap/today.png' | relative_url }})

## Why I built it

I like tracking things in my life with a database and a dashboard, and I'd built a few small apps for it: one for strength training, one for meals, one for health logs, one to keep an eye on the database itself. They all lived on separate pages.

The nudge came from Dharmesh Shah's YouSpot, a CRM built around your own network. I wanted that idea pointed at my whole life, friends and family included, not just professional contacts. My personal calendar was already the record of who I see and what I do, so that became the backbone.

So the goal became one home for all of it, with real insights instead of raw data.

![A month on the calendar, every event color-coded by category]({{ '/assets/images/projects/whats-on-tap/calendar.png' | relative_url }})

## What it does

- **Today.** Live calendar events, each one filed into a category (friends and family, dates, trips, networking, health and so on). Reminders and birthday notes get tucked out of the way. Next to it sits a list of promises.
- **Promises.** Claude reads my sent email and meeting agendas for things I said I'd do for someone ("I'll send you that deck by Friday") and keeps them in front of me until they're done.
- **Calendar.** Two years of events by week, month or year, color-coded by category, so I can see where my time actually goes.
- **People.** A relationship graph built from shared meetings and email threads, with companies researched and filled in. It flags who's going quiet and who's new this month.
- **Review.** When Claude isn't sure about something, like which category an event belongs in or whether two contacts are the same person, it asks me instead of guessing. One tap to answer.
- **Iron, Food and Health.** Strength sessions logged by chatting with Claude. Meals logged from a photo, with every component estimated separately so I can check the work. Sleep, steps, heart rate and workouts from Apple Health, plus years of history from a one-time Garmin export.
- **Weekly patterns.** Every Sunday a scheduled task compares the week against my normal and writes up what's holding up and what to keep an eye on.

![The relationship graph with one person's record open]({{ '/assets/images/projects/whats-on-tap/people.png' | relative_url }})

## How it works

Everything lives in one Supabase (Postgres) database, split into schemas for the CRM, health, fitness, food and insights. Row level security is on with no public policies, so nothing is reachable through the public API.

Claude does the plumbing through MCP connectors: Google Calendar, read-only Gmail, Google Drive for a monthly LinkedIn export, Granola for meeting notes, and Supabase itself. Three scheduled tasks keep it current:

- **Monday sync.** Pulls new calendar events and sent email, categorizes events, links people and companies, finds new promises, and queues anything it's unsure about for review.
- **Sunday patterns.** Computes the weekly comparisons in SQL, then has Claude write them up in plain language.
- **Meeting notes.** Every few days, new recorded calls get stored and indexed so they're searchable later.

The hub itself is a single page published as a Claude artifact. It reads the database live through the Supabase connector, so there's no server of my own to run.

![Weekly patterns on the Health tab]({{ '/assets/images/projects/whats-on-tap/patterns.png' | relative_url }})

## What changed along the way

**I cut time tracking.** The first plan logged hours per category. Then I looked at how I actually use my calendar: I block extra time around things, or make an event bigger so I won't miss it. The hours wouldn't have meant much. Categories and who I spent time with turned out to be the useful part, so that's what stayed.

**Asking beats guessing.** Anything Claude isn't reasonably sure about goes into Review as a one-tap question, capped at a handful a week, instead of getting filed on a guess. The categories grow the same way: when several events don't fit anywhere, it proposes a new category instead of filing them under Other forever.

**The numbers come from SQL, not the model.** For the weekly patterns, every figure is computed by a database function with minimum sample sizes built in. Claude only writes the sentences. If there isn't enough data yet, the page says what it's waiting on instead of drawing a conclusion from four nights of sleep.

**Small apps became one app.** Each tracker started life as its own page. Bringing them under one roof is what made the cross-cutting stuff possible, like seeing whether late workouts line up with shorter sleep.

![Tapping a meal shows each component and the basis for its estimate]({{ '/assets/images/projects/whats-on-tap/food-entry.png' | relative_url }})

## By the numbers

As of October 2026: 157 people and 62 companies in the graph, 337 categorized calendar events going back to October 2024, 1,239 days of health data including 1,025 nights of sleep, 330 logged workouts, and 3 scheduled tasks keeping it all current.

## What's next

- **A chat box inside the hub,** so I can ask questions of my own data without leaving the page.
- **An open-source starter.** A baseline Supabase schema and setup guide aimed at individuals managing their own lives, something people can sign up for on a free Supabase account and build from.

## About the demo

The demo runs the same code as the real app. A small fake backend answers every query with invented data that's generated relative to today, so it always looks current. Every person, company, event and number in it is made up, and one private tab from the real app is left out. Your changes stay in your browser, and Reset puts everything back.
