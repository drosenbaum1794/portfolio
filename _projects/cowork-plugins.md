---
title: "Claude Code and Cowork plugins"
summary: "Turning repeatable judgment into tooling non-technical people can run themselves."
role: "Builder"
period: "Ongoing"
order: 5
featured: false
tags: [Internal Tooling, AI Agents, Automation]
skills: [Claude Code, Cowork, Plugin Development, Evaluation Design]
video_platform: none   # set to youtube or loom once recorded
video_id: ""           # paste the YouTube or Loom ID here
---
I build Claude Code and Cowork plugins to turn repeatable judgment into tooling
non-technical people can run themselves.

## Recent examples

- A job-search plugin that scores roles against personal criteria and drafts
  tailored materials with a fact-checking gate.
- An evaluation system that standardizes how a partner network submits deals.

## When something is worth building into a plugin

It comes down to repeatability and complexity. How many steps does the task
take, and am I going to do it again.

A job search is a good example. It looks like one task and it's really several
stacked on top of each other. You need your own skills, accomplishments, and
history captured somewhere usable, plus a clear read on the kind of work you
want to grow into, because having done something before doesn't mean you want
to do it again somewhere else. Then there's the search itself, the alerts
across LinkedIn and Indeed, and the volume landing in your inbox every day.

Postings go up and come back down fast because of how many people are applying,
so speed matters. Once the alerts are flowing, the plugin grades each new role
against a tiered framework of what I actually want and what I could reasonably
get, queues up the good fits, and tells me. It'll also adjust my resume and
cover letter to read more clearly against a specific posting.

The alternative is a long-running conversation where I paste in a job
description and react to it one at a time, which takes about as long as reading
the posting myself. I don't have time to look for work full time. This is
closer to having a recruiter who's actually looking out for me.

## The fact-checking gate

Context is king and more examples are better, which is AI 101. The harder
problem is that a model will still fill gaps with something plausible.

In testing I kept catching the tool fabricating or misreading the context
material I'd given it, then making the same mistakes again after I corrected
them. The gate is a final pass over the output that goes back to the source
documents and checks nothing has been inflated or invented. Small thing, but it
catches the failure mode I care most about in anything I'd put my name on.
