<script lang="ts">
	import { onMount } from 'svelte'
	import gsap from "gsap"
	import { ScrollTrigger, ScrollSmoother, SplitText, ScrollToPlugin } from "gsap/all"
	import HeroSection from "$lib/components/sections/HeroSection.svelte"
	import AboutMe from "$lib/components/sections/AboutMe.svelte"
	import Projects from "$lib/components/sections/Projects.svelte"
	import Technologies from "$lib/components/sections/Technologies.svelte"
	
	let smoothWrapper: HTMLElement
	let smoothContent: HTMLElement
	
	onMount(() => {
		gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, ScrollToPlugin)
		
		// Initialize smooth scrolling
		const smoother = ScrollSmoother.create({
			wrapper: smoothWrapper,
			content: smoothContent,
			smooth: 1,
			effects: true
		})
		
		return () => {
			smoother.kill()
		}
	})
</script>

<svelte:head>
	<title>Vincent Hilario</title>
	<meta property="og:type" />
	<meta property="og:title" content="Vincent Hilario" />
	<meta name="description" content="Vincent Hilario's portfolio" />
</svelte:head>

<div bind:this={smoothWrapper} id="smooth-wrapper" class="fixed inset-0 overflow-hidden bg-background">
	<div bind:this={smoothContent} class="relative">
		<!-- Main Content -->
		<main class="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
			<HeroSection />
		</main>
		<main class="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
			<AboutMe />
		</main>
		<main class="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
			<Projects />
		</main>
		<main class="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
			<Technologies />
		</main>
	</div>
</div>

<style>
	:global(body) {
		background: hsl(var(--background));
		margin: 0;
		padding: 0;
		overflow-x: hidden;
	}
</style>