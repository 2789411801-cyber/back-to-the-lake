---
title: "Modern CSS Layout Techniques You Should Know"
date: 2026-07-05
categories: [Technology, Tutorial]
tags: [css, web-development, frontend]
---

CSS has come a long way from the days of float-based layouts and clearfix hacks. Let's look at the modern layout techniques that make building complex designs a breeze.

## Flexbox: One-Dimensional Layouts

Flexbox excels at distributing space along a single axis. Think navigation bars, card rows, and centering content:

```css
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

## Grid: Two-Dimensional Layouts

CSS Grid is the powerhouse for page-level layouts. Define rows and columns, then place items precisely:

```css
.page-layout {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 40px;
}
```

## Container Queries

The newest addition to the toolbox. Instead of relying on viewport-based breakpoints, container queries let components respond to their own container's size:

```css
@container (min-width: 400px) {
  .card { display: flex; }
}
```

## Logical Properties

For internationalization-friendly layouts, use logical properties instead of physical ones:

```css
.element {
  margin-inline: auto;  /* instead of margin-left/right */
  padding-block: 1rem;   /* instead of padding-top/bottom */
}
```

These tools have fundamentally changed how we approach CSS. Master them, and you'll write less code that does more.
