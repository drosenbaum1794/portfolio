---
title: "Claude Code and Cowork plugins"
summary: "Turning repeatable judgment into tooling non-technical people can run themselves."
role: "Builder"
period: "Ongoing"
order: 4
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

A job search is a good example of something worth building. It looks like one
task and it is really several stacked on top of each other. You need your own
skills, accomplishments, and history captured somewhere usable. You need a
clear read on the kind of work you want to grow into, because having done
something before does not mean you want to do it again somewhere else. Then
there is the search itself, the alerts across LinkedIn and Indeed, and the
volume that lands in your inbox every day.

Postings go up and come back down fast because of how many people are applying,
so speed matters. Once the alerts are flowing, the plugin grades each new role
against a tiered framework of what I actually want and what I could reasonably
get, queues up the good fits, and tells me. It will also adjust my own written
resume and cover letter to read more clearly against a specific posting.

The alternative is a long-running conversation where I paste in a job
description and react to it one at a time. That takes about as long as reading
the posting myself, which defeats the point. I do not have time to look for
work full time. This is closer to having a recruiter who is actually looking
out for me.

## The fact-checking gate

Context is king, and more examples are better. That is AI 101. The harder
problem is that a model will still fill gaps with something plausible.

In testing I kept seeing the tool fabricate or misread the context material I
had given it, and make the same mistakes repeatedly even after I corrected
them. The gate is a final pass on the output that goes back to the source
documents and checks that nothing has been inflated or invented. It is a small
thing that catches the failure mode I care most about in anything I would put
my name on.
