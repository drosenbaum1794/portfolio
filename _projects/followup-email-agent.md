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
    Nobody was told to use this, so the people still running
    it every week are running it because it beats writing
    the email themselves.
---
## The problem

Sales and account management reps at HubSpot were losing time drafting
follow-up emails after calls. The work meant reviewing the transcript, pulling
context from past touchpoints, and shaping all of it into something sendable.

## What I built

An agent in Glean that ingests call transcripts and meeting notes, researches
internal documentation and customer context, and produces a follow-up draft in
the users voice with researched links. Good enough to send with light editing.

I built it outside the scope of my actual role, in my free time.

## Results

28 monthly active users and 12 weekly active users, from 190 people who have
tried it across 959 runs.

No mandate, no formal rollout, no internal marketing, and no executive sponsor.
Every bit of that adoption was word of mouth.

## What I learned

Sustained use with no mandate is solid proof that we are solving real problems 
for real teams. Anyone can drive a spike with a launch email, but
holding weekly actives months later means the thing is faster and at least as 
effective when compared to the alternative.

I dogfooded it from launch and tracked output quality as the underlying model
changed underneath it, iterating to keep it effective across versions. 
Afterall, an agent tuned well against one model version doesn't always stay tuned on the next.

Next time I would try to engage in a more formal rollout and hold accountability for
per-run satisfaction, time savings, and editing needs on the drafts.
