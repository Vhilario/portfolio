---
title: My Blog
slug: my-blog
description: In this post, I'll be talking about my journey with my blog, its features, and overall design.
category: Project Overview
date: '2025-07-16'
tags:
    - sveltekit
    - vincent
published: true
---

<script lang="ts">
    import * as Card from '$lib/components/ui/card/index.js';
    import ZoomableImage from '$lib/components/custom/ZoomableImage.svelte';
</script>

## Blog Overview
I hope to use this blog to write about my life, coding, and general rambling. I've always had a lot of thoughts and things I wish I had written down, so I'm going to try and do that here.

<br>

## Tech Stack
This is the thing that has changed the most since I had the idea for this blog.

<br>

#### SvelteKit
In my MANY reworks of this website, I've tried a few different stacks, mostly React based, but in Early 2024, I discovered Svelte, and I've been using it ever since. I find it just to be so much easier to work with. (I just wish there were more jobs for it...)

#### Shadcn-Svelte
Shadcn-ui is just so good. I feel like it speeds up development by a lot, and I really like how simple it is to create a good looking UI. There's a fork of Shadcn-ui that is specifically for Svelte, which is what this page is made with. It also uses Tailwind CSS, which is a big plus for me.

#### MDsveX
I didn't even know this was a thing, but it's a really good way to write Markdown files in SvelteKit. It allows me to do cool things like this:

```my-portfolio.md```:
<Card.Root class="w-[90%] mx-auto">
    <Card.Header>
        <Card.Title>
            <h3>Look! I'm a Shadcn-Svelte Card written inside a Markdown file!</h3>
        </Card.Title>
    </Card.Header>
    <Card.Content>
        <p>Here's a picture of the code. (Click to zoom)</p>
        <ZoomableImage src="/mdsvex-card.png" alt="Shadcn-Svelte Card" />
    </Card.Content>
</Card.Root>

Honestly, interpolating HTML code into a blog post feels magical.
<br>

## Some Features I'd Like to Add in the Future
- A way to add comments to blog posts, or at the very least, a way to add a "Like" button
- A sidebar with a table of contents for each post, for easy navigation
- Suggested follow-up posts based on the current post






