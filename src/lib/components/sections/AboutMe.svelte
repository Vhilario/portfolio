<script lang="ts">
	import { onMount } from 'svelte'
	import gsap from "gsap"
	import { ScrollTrigger, ScrollSmoother, SplitText, ScrollToPlugin } from "gsap/all"

	
	let aboutMeSection: HTMLElement
	let sectionHeading: HTMLElement
	
	onMount(() => {
		gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, ScrollToPlugin)

        const mainSplit = new SplitText(sectionHeading, {
			type: "words,lines",
            mask: "words"
		})

        gsap.from(mainSplit.words, {
            opacity: 0,
            y: 100,
            duration: 1,
            autoAlpha: 0,
            ease: "power2.inOut",
            scrollTrigger: {
                trigger: aboutMeSection,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        })
	})
</script>

<section bind:this={aboutMeSection} class="text-center max-w-3xl mx-auto relative">
	<h1 class="text-4xl font-bold" bind:this={sectionHeading}>About Me</h1>
</section>