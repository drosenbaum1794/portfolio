---
title: "HubBot, an LLM support agent in a live bootcamp"
summary: "An AI support agent embedded in the Slack channel learners already used. It handled about 1,900 questions over nine months and deflected an estimated 180 hours of human support time."
role: "Builder, Synaptic Labs"
period: "March to December 2025"
order: 1
featured: true
tags: [AI Agents, Education, Adoption]
skills: [GPT Trainer, Slack API, Python, pandas, matplotlib, Evaluation Design]
video_platform: none   # set to youtube or loom once recorded
video_id: ""           # paste the YouTube or Loom ID here
---
## The problem

A live HubSpot Academy bootcamp ran out of a shared Slack channel, and that
channel was drowning in repeated questions. Instructors spent their time
answering the same things instead of teaching, and learners sat waiting on a
mentor to free up.

## What I built

HubBot lives inside the Education Partnerships Slack space the cohorts already
worked in. Learners @mention it with any HubSpot or bootcamp question and get a
threaded, context-aware answer. No new tab, no login, no context switch.

I built it on GPT Trainer with a persistent-memory Slack integration. That was
a deliberate choice. At the time, Slack's APIs and bot capabilities were not
especially advanced, and it was faster to build a genuinely solid support bot
in a purpose-built tool and port it into Slack than to assemble the whole thing
from scratch. We did a lot of latency testing and got the handoff between the
two platforms close to instant. Training edits shipped straight through to
Slack, so the loop between noticing a bad answer and fixing it stayed short.

## Results

About 1,900 queries across 969 conversations over the nine-month cohort.

Against a human baseline of 5 to 15 minutes per support interaction, that
worked out to an estimated 180 hours of human support time deflected, roughly
4.5 work weeks of program staff bandwidth redirected toward higher-touch
coaching and deliverable review.

## How I evaluated it

I read every question learners asked it. I checked whether the answer was
right, looked for patterns where it was getting confused or was consistently
unhelpful, then went into GPT Trainer and retrained against what I found.

Early on this was whack-a-mole. I was noticing problems as they scrolled past
in Slack. It got more systematic as I went: identify the source material
confusing it, remove that material, add better material, then test hard against
those specific questions until it answered them right consistently.

One example. HubSpot draws a distinction between a buyer persona and an ideal
customer profile. They sound like the same thing but they are two separate
areas of the software, and HubBot kept pointing learners at the wrong one. The
fix was to pull the training content covering the irrelevant one, write
preferred answers for the responses it had gotten wrong, and upload targeted
training to push it in the right direction.

I also ran production auto-tagging on every interaction, scoring for coherence,
whether a problem was raised, whether it was solved, and satisfaction. That
schema is what made the quality problem visible rather than anecdotal.

## The number that looked bad and wasn't

The auto-tagged resolution rate came in at 31%, which looks weak until you dig
into how the tagging worked. "Problem Solved" had to be applied manually, and
most learners who got what they needed simply moved on without confirming.
Corrected for that under-tagging, the effective resolution rate lands closer to
60 to 70%, which is in line with well-tuned product support bots.

Build the evaluation schema before you need it. A metric you do not understand
the mechanics of will lie to you in both directions.

## What the usage data was actually worth

I analyzed query demand across more than 15 HubSpot product areas. Content and
CMS questions dominated, with meaningful volume across 8 or more product
surfaces. How-to and feasibility questions were the dominant intent, which
confirmed the premise behind building HubBot at all: learners mostly needed
procedural guidance, the exact repetitive support that burns mentor bandwidth.

The distribution turned into a curriculum map. It showed where bootcamp content
needed the most investment, not just where the bot needed tuning. That was the
part I did not expect going in.

## What I learned

Meeting users where they already work was the single biggest adoption driver.
Learners used HubBot casually because asking it felt the same as asking a
mentor.

Shipping into a live cohort means every failure is visible immediately. That is
uncomfortable and it is also the fastest feedback loop I have ever had. Early
versions were rough. Monitoring real responses and correcting the knowledge
base over successive cohorts is what turned it into something learners trusted.
