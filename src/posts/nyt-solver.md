---
title: NYT Solver App
slug: nyt-solver
description: Here's a breakdown of a little side project I've been working on, because I'm addicted to puzzle games.
category: Project Overview
date: '2025-07-20'
tags:
    - nextjs
    - games
published: true
image: nyt-solver.png
---

<script lang="ts">
    import ZoomableImage from '$lib/components/custom/ZoomableImage.svelte';
</script>

## First of All, Why?

#### I like daily puzzle games.
Like, a lot. There's something just so captivating about a little daily challenge early in the morning. I imagine there's some study or whatever that says doing that warms up your brain, which is what I tell people when they catch me doing it compulsively.
<br>

### But one puzzle in particular really intrigued me:
Letter Boxed.

<ZoomableImage src="/letter-boxed.png" alt="Letter Boxed" />



<br>

If you haven't played it, Letter Boxed is a puzzle game from the New York Times, where you have to connect dots from different sides of a square to make words. The goal is to use every single letter.

Now, solving the puzzle in the allotted number of moves is usually trivial. But the REAL challenge is solving it in two words. Every puzzle has a valid two-word solution, and sometimes they're more obtuse than others.

The worst thing is, some days, there's exactly ONE two-word solution, which has led to me pulling my hair out looking for it, and then having to go to a solver website to find out what it is.
<br>

### The Problem:
#### Most Letter Boxed Solvers Online are Totally Incompetent.
Ok, that's a bit harsh, but, what often happens is that, in order to solve the puzzle, it grabs the starting letters, and then compares it against a MASSIVE list of known valid words. This is a good approach, since the dictionary for the games is still not public, however, sometimes even these sites with the sole purpose of giving me my silly word game answer fails miserably.
<br>

### If You Want Something Done Right...
I can't remember which puzzle it was that made me upset enough to do this, but, one day, I busted out the React Developer Tools, and starting sifting through the code for Letter Boxed, wondering if there was a way to find the answer hidden in the source. After years of questionally ethical searching, I found:


- An ID for the puzzle,
- A pair of words titled "ourSolution",
- AND, a complete dictionary for all valid words for that day's puzzle.

#### SUCCESS.
<br>

### Now for the Easy Part.
With relative ease, I whipped up a Python app using FastAPI and BeautifulSoup to get this data, and host it on an API to run once per day. For now, this will stay private.

And now, since web development is just "making JSON look pretty", I thought it would be easy to host this on a website, and have it act as a programming exercise.
<br>

### The Tech Stack
#### Backend:
- FastAPI, for unbelieveably easy API hosting

- BeautifulSoup4, for web scraping

- Render, for hosting the API and other server-like tasks like scheduling and caching.

#### Frontend:
- Next.js

Why Next.js? Well, I thought that the puzzles being daily would be a perfect time to learn Server Side Rendering and Static Site Generation. Also, I have been using Svelte for my Portfolio, and I wanted to stay fresh on React, because that's where all the jobs are at...
<br>

## The Website
<ZoomableImage src="/letter-boxed-card.png" alt="Letter Boxed Card" />
<br>
It didn't take me long to come up with something I liked, but I thought a website that was JUST the Letter Boxed solver wasn't very impressive...

#### SO I DID MORE!
<ZoomableImage src="/nyt-solver.png" alt="NYT Solver Screenshot" />
I gotta say, this was a lot of fun. You can view the live project at:

<a href="https://simple-nyt-solutions.vercel.app" title="Simple NYT Solutions">simple-nyt-solutions.vercel.app</a>
<br>

### Things I learned along the way:
- Server Side Rendering
- Static Site Generation
- The basics of web scraping with BeautifulSoup
- The joys of working on a project that you actually LIKE
