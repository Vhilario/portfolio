<script lang="ts">
	import { onMount } from 'svelte'
	import gsap from "gsap"
	import { ScrollTrigger, ScrollSmoother, SplitText, ScrollToPlugin } from "gsap/all"
	import * as Card from "$lib/components/ui/card/index.js"

	
	let aboutMeSection: HTMLElement
	let sectionHeading: HTMLElement
	let aboutCard: HTMLElement
	let aboutCardContent: HTMLElement
	
	onMount(() => {
		gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, ScrollToPlugin)
        
        const mainSplit = new SplitText(sectionHeading, {
			type: "words,lines",
            mask: "words"
		})

        // Set initial state of the card
        gsap.set(aboutCard, {
            scaleY: 0,
            transformOrigin: "bottom center",
            opacity: 0
        })

        // Create timeline for the animation sequence
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: aboutMeSection,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none none"
            }
        })

        // Step 1: Text springs up
        tl.from(mainSplit.words, {
            opacity: 0,
            y: 100,
            duration: 1,
            autoAlpha: 0,
            ease: "power2.inOut"
        })

        // Step 2: Card grows upward AND text becomes left-aligned (parallel animations)
        tl.fromTo(aboutCard, {
            scaleY: 0,
            transformOrigin: "bottom center",
            opacity: 0
        }, {
            scaleY: 1,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out"
        })
        .to(sectionHeading, {
            textAlign: "left",
            duration: 0.8,
            ease: "power2.out"
        }, "<") // The "<" makes this animation start at the same time as the previous one

        // Step 3: Card content fades in
        tl.from(aboutCardContent, {
            opacity: 0,
            y: 20,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
        }, ">") // Use ">" to start after previous animations
	})
</script>

<section bind:this={aboutMeSection} class="max-w-3xl mx-auto relative">
	<h1 class="text-4xl font-bold mb-4" bind:this={sectionHeading}>About Me</h1>
    <div bind:this={aboutCard}>
        <Card.Root class="w-full max-w-2xl mx-auto">
            <div bind:this={aboutCardContent}>
                <Card.Header>
                    <Card.Title>Vincent Hilario</Card.Title>
                    <Card.Description>Full Stack Developer & UI/UX Enthusiast</Card.Description>
                </Card.Header>
                <Card.Content>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                    </p>
                </Card.Content>
            </div>
        </Card.Root>
    </div>
</section>