---
title: "Editable product bundles in HubSpot"
summary: "HubSpot's native bundles lock you in the moment you add them. I built coded workflows that swap a deal's line items when a custom property changes, and gated which bundles each franchisee can even see."
role: "Builder"
order: 0
featured: true
tags: [HubSpot, Automation, Solution Design]
skills: [HubSpot, Custom Properties, Coded Workflows, API Batching, Solution Design]
thumbnail: https://img.youtube.com/vi/GtHhZlDy7z4/maxresdefault.jpg
video_platform: youtube
video_id: "GtHhZlDy7z4"
---
## The problem

A home builder running on HubSpot needed two things the CRM wouldn't give them.

First, bundling. One home plan is thousands of line items: faucets, floorboards, shower heads, countertops, every interchangeable component of a cookie-cutter house. Builders needed to drop a whole plan onto a deal in one move.

Second, access. The franchisee network shouldn't all see the same plans. Some are proprietary, some are regionally locked, and the company didn't want pricing visible across the whole network.

HubSpot does have product bundles, but as of this recording they aren't editable. Pull a bundle onto a deal and you're stuck with it. You can't drop a line item or swap one out. For a builder who needs to mark up the lumber on a three-car garage, that limitation is the entire job.

## Why I didn't wait

The honest read was that the product isn't there yet and a fix was six to twelve months out. I didn't want to wait six to twelve months, so I built it out of what the platform already had: custom properties, coded workflows, and the batch API.

## Version one, and why it didn't survive

First pass triggered a workflow whenever the home plan property changed. Custom code deleted the existing line items and zeroed the deal amount, then a manual branch added line items back based on the new plan value.

It worked, and it fell apart fast. Nine branches across three products was already messy to look at, and every new plan meant another branch and another hand-maintained list. The company also wanted their ERP to be the source of truth for home plans, which a branch-per-plan workflow was never going to survive.

## Version two

Same trigger, one code action instead of a branch tree. When the home plan changes, the workflow checks for existing line items, clears them, resets the amount to zero, then calculates the new total and builds the new line items in a batch so the write is quick.

In the test portal the plan-to-product mapping sits in the code itself. In production that query goes to the ERP, so adding a plan means adding it to the ERP rather than opening a workflow.

The deal amount zeroes out and repopulates while you're looking at the record. Refresh and the line items match the new plan.

## The permission layer

Access control is a custom property with conditional options. One property holds every home plan, and which options a given user sees is driven by the deal owner. Change the deal owner on a deal and the list of available plans changes with it.

Deal owner isn't something individuals edit. It gets auto-assigned or managed separately, and that's what makes it usable as a permission boundary rather than a suggestion.

## What it gets you

A builder picks a plan, gets the full bundle, and can then edit it like any other deal. Lumber went up on the three-car garage, so that line takes a markup. Or it's a good week and that line takes 15% off. The bundle becomes a starting point instead of a cage, which is the part the native version doesn't do yet.
