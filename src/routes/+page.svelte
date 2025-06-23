<script lang="ts">
	import { onMount } from 'svelte'
	import gsap from "gsap"
	import { ScrollTrigger, ScrollSmoother, SplitText, ScrollToPlugin } from "gsap/all"
	import { Button } from '$lib/components/ui/button'
	import ArrowDownIcon from "@tabler/icons-svelte/icons/arrow-down"
	import BrandGithubIcon from "@tabler/icons-svelte/icons/brand-github"
	import BrandLinkedinIcon from "@tabler/icons-svelte/icons/brand-linkedin"
	import MailIcon from "@tabler/icons-svelte/icons/mail"
	
	let smoothWrapper: HTMLElement
	let heroSection: HTMLElement
	let mainHeading: HTMLElement
	let subHeading: HTMLElement
	let description: HTMLElement
	let ctaButton: HTMLElement
	let scrollIndicator: HTMLElement
	
	onMount(() => {
		gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, ScrollToPlugin)
		
		// Initialize smooth scrolling
		const smoother = ScrollSmoother.create({
			wrapper: smoothWrapper,
			content: smoothWrapper,
			smooth: 1,
			effects: true
		})
		
		// Split text animations - much more subtle
		const mainSplit = new SplitText(mainHeading, {
			type: "chars, words",
			charsClass: "char",
			wordsClass: "word"
		})
		
		const subSplit = new SplitText(subHeading, {
			type: "chars, words",
			charsClass: "char",
			wordsClass: "word"
		})
		
		const descSplit = new SplitText(description, {
			type: "chars, words",
			charsClass: "char",
			wordsClass: "word"
		})
		
		// Subtle main heading animation
		gsap.fromTo(mainSplit.chars, 
			{
				y: 20,
				opacity: 0
			},
			{
				y: 0,
				opacity: 1,
				duration: 0.8,
				ease: "power2.out",
				stagger: 0.02,
				delay: 0.1
			}
		)
		
		// Subtle sub heading animation
		gsap.fromTo(subSplit.chars,
			{
				y: 15,
				opacity: 0
			},
			{
				y: 0,
				opacity: 1,
				duration: 0.6,
				ease: "power2.out",
				stagger: 0.01,
				delay: 0.8
			}
		)
		
		// Description animation
		gsap.fromTo(descSplit.words,
			{
				y: 10,
				opacity: 0
			},
			{
				y: 0,
				opacity: 1,
				duration: 0.5,
				ease: "power2.out",
				stagger: 0.05,
				delay: 1.2
			}
		)
		
		// CTA button animation
		gsap.fromTo(ctaButton,
			{
				y: 10,
				opacity: 0
			},
			{
				y: 0,
				opacity: 1,
				duration: 0.6,
				ease: "power2.out",
				delay: 1.6
			}
		)
		
		// Subtle scroll indicator animation
		gsap.to(scrollIndicator, {
			y: 5,
			duration: 2,
			ease: "power2.inOut",
			repeat: -1,
			yoyo: true,
			delay: 2
		})
		
		return () => {
			smoother.kill()
			mainSplit.revert()
			subSplit.revert()
			descSplit.revert()
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
	<!-- Main Content -->
	<main class="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
		<section bind:this={heroSection} class="text-center max-w-3xl mx-auto">
			<!-- Main Heading -->
			<h1 bind:this={mainHeading} class="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight tracking-tight">
				Vincent Hilario
			</h1>
			
			<!-- Sub Heading -->
			<h2 bind:this={subHeading} class="text-xl sm:text-2xl font-medium text-muted-foreground mb-6">
				Full Stack Developer
			</h2>
			
			<!-- Description -->
			<p bind:this={description} class="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
				I build modern web applications with clean code and thoughtful design. Currently focused on creating seamless user experiences.
			</p>
			
			<!-- CTA Button -->
			<div bind:this={ctaButton} class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
				<Button size="lg" class="px-8">
					View Projects
				</Button>
				<Button variant="outline" size="lg" class="px-8">
					Get in Touch
				</Button>
			</div>
			
			<!-- Social Links -->
			<div class="flex justify-center items-center space-x-6 text-muted-foreground">
				<a href="#" class="hover:text-foreground transition-colors">
					<BrandGithubIcon class="w-5 h-5" />
				</a>
				<a href="#" class="hover:text-foreground transition-colors">
					<BrandLinkedinIcon class="w-5 h-5" />
				</a>
				<a href="#" class="hover:text-foreground transition-colors">
					<MailIcon class="w-5 h-5" />
				</a>
			</div>
		</section>
		
		<!-- Scroll Indicator -->
		<div bind:this={scrollIndicator} class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-muted-foreground">
			<div class="flex flex-col items-center space-y-2">
				<span class="text-sm">Scroll to explore</span>
				<ArrowDownIcon class="w-4 h-4" />
			</div>
		</div>
	</main>
</div>

<style>
	:global(body) {
		background: hsl(var(--background));
		margin: 0;
		padding: 0;
		overflow-x: hidden;
	}
	
	.char {
		display: inline-block;
	}
	
	.word {
		display: inline-block;
		margin-right: 0.25em;
	}
</style>