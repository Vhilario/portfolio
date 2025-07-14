<script lang="ts">
	import { onMount } from 'svelte'
	import gsap from "gsap"
	import { ScrollTrigger, ScrollSmoother, SplitText, ScrollToPlugin } from "gsap/all"
	
    import { AspectRatio } from "$lib/components/ui/aspect-ratio/index.js"
    import * as Card from "$lib/components/ui/card/index.js"
    import * as Carousel from "$lib/components/ui/carousel/index.js"
    import { Separator } from "$lib/components/ui/separator/index.js"

    import ChevronCompactLeftIcon from "@tabler/icons-svelte/icons/chevron-compact-left"
    import ChevronCompactRightIcon from "@tabler/icons-svelte/icons/chevron-compact-right"
    import type { CarouselAPI } from "$lib/components/ui/carousel/context.js"

    let api = $state<CarouselAPI>()
    const count = $derived(api ? api.scrollSnapList().length : 0)
    let current = $state(0)

    $effect(() => {
        if (api) {
            current = api.selectedScrollSnap() + 1
            api.on("select", () => {
                current = api!.selectedScrollSnap() + 1
            })
        }
    })

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
    <div bind:this={aboutCard} class="flex flex-row gap-4">
        <div class="w-10 flex justify-center">
            <button class="flex items-center h-full cursor-pointer" onclick={() => api?.scrollPrev()}>
                <ChevronCompactLeftIcon class="w-16 h-16 text-gray-400" />
            </button>
        </div>
        <Card.Root class="w-full max-w-2xl mx-auto">
            <div bind:this={aboutCardContent}>
                <Card.Header>
                    <Card.Title>Vincent Hilario</Card.Title>
                    <Card.Description>Software Developer</Card.Description>
                </Card.Header>
                <Separator class="my-3" />
                <Card.Content>
                    <div class="flex flex-row gap-4">
                        <div class="relative w-full">
                            <Carousel.Root
                                setApi={(emblaApi) => (api = emblaApi)}
                                opts={{
                                    align: "start",
                                    loop: true,
                                }}
                            >
                                <Carousel.Content class='w-full'>
                                    <Carousel.Item>
                                        <div class="flex flex-row gap-4">
                                            <AspectRatio ratio={16 / 9} class="flex items-center justify-center">
                                                <img src="https://placehold.co/1600x900" alt="Vincent Hilario" class="w-full h-full object-cover">
                                            </AspectRatio>
                                            <p class="w-1/2">
                                                I'm <span class="font-bold">Vincent Hilario</span>, a software developer from Tyler, Texas. Well, technically I'm a software tester, but I want to be a software developer someday.
                                            </p>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <div class="flex flex-row gap-4">
                                            <AspectRatio ratio={16 / 9} class="flex items-center justify-center">
                                                <img src="https://placehold.co/600x400" alt="Vincent Hilario" class="w-full h-full object-cover">
                                            </AspectRatio>
                                            <p class="w-1/2">
                                                I'm looking for that first job to give me my break into the software engineering industry.
                                            </p>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <div class="flex flex-row gap-4">
                                            <AspectRatio ratio={16 / 9} class="flex items-center justify-center">
                                                <img src="https://placehold.co/600x400" alt="Vincent Hilario" class="w-full h-full object-cover">
                                            </AspectRatio>
                                            <p class="w-1/2">
                                                I'd say I prefer frontend development, but I'm not afraid to get my hands dirty with the backend.
                                            </p>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <div class="flex flex-row gap-4">
                                            <AspectRatio ratio={16 / 9} class="flex items-center justify-center">
                                                <img src="https://placehold.co/600x400" alt="Vincent Hilario" class="w-full h-full object-cover">
                                            </AspectRatio>
                                            <p class="w-1/2">
                                                Other hobbies of mine include playing video games, biking, and well, coding.
                                            </p>
                                        </div>
                                    </Carousel.Item>
                                </Carousel.Content>
                            </Carousel.Root>
                            
                        </div>
                    </div>
                </Card.Content>
                <Card.Footer>
                    <div class="text-muted-foreground py-2 text-center text-sm">
                        Slide {current} of {count}
                    </div>
                </Card.Footer>
            </div>
        </Card.Root>
        <div class="w-10 flex justify-center">
            <button class="flex items-center h-full cursor-pointer" onclick={() => api?.scrollNext()}>
                <ChevronCompactRightIcon class="w-16 h-16 text-gray-400" />
            </button>
        </div>
    </div>
</section>