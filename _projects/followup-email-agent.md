---
title: "Follow-up email agent"
summary: "An AI agent for post-call follow-ups. 190 people tried it with no mandate and no rollout, and 28 still use it every month."
role: "Builder"
period: "Launched December 2025"
order: 3
featured: true
tags: [AI Agents, Adoption, Go-to-Market]
skills: [Glean Agent Builder, Python, pandas, matplotlib]
video_platform: none   # set to youtube or loom once recorded
video_id: ""           # paste the YouTube or Loom ID here
stats:
  - value: "190"
    label: "People who tried it"
  - value: "959"
    label: "Total runs"
  - value: "28"
    label: "Monthly active users"
  - value: "12"
    label: "Weekly active users"
chart:
  title: "From trying it once to using it every week"
  max: 190
  bars:
    - label: "Tried it at least once"
      value: 190
      display: "190"
      muted: true
    - label: "Still active monthly"
      value: 28
      display: "28"
    - label: "Still active weekly"
      value: 12
      display: "12"
  note: >-
    The drop is the interesting part. Nobody was told to use this, so the
    people still running it every week are running it because it beats writing
    the email themselves.
---
## The problem

Sales and account management reps at HubSpot were losing time drafting
follow-up emails after calls. The work meant reviewing the transcript, pulling
context from past touchpoints, and shaping all of it into something sendable.

## What I built

An agent in Glean that ingests call transcripts and meeting notes, researches
internal documentation and customer context, and produces a follow-up draft in
a natural voice with researched links. Good enough to send with light editing.

I built it outside the scope of my actual role.

## Results

28 monthly active users and 12 weekly active users, from 190 people who have
tried it across 959 runs.

No mandate, no formal rollout, no internal marketing, and no executive sponsor.
Every bit of that adoption was word of mouth.

## What I learned

The gap between the 190 who tried it and the 28 who kept it is the number I
care about. Sustained use with no mandate is the only proof that survives
contact with a real team. Anyone can drive a spike with a launch email. Holding
weekly actives months later means the thing is genuinely faster than the
alternative for the people still opening it.

I dogfooded it from launch and tracked output quality as the underlying model
changed over time, iterating to keep it effective across model versions. That
turned out to matter more than I expected. An agent that was tuned well against
one model version does not stay tuned on its own.

Next time I would instrument earlier. Per-run satisfaction, time-to-send, and
edit distance on the drafts would all have been worth capturing from day one
rather than reconstructing them later.
