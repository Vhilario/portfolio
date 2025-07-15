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
                                                <img src="/pictureofme.jpg" alt="Vincent Hilario" class="h-full object-cover rounded-lg">
                                            </AspectRatio>
                                            <div class="flex flex-col gap-4">
                                                <p>
                                                    I'm <span class="font-bold">Vincent Hilario</span>, a software developer from Tyler, Texas. Well, technically I'm a software tester, but I want to be a software developer someday.
                                                </p>
                                                <p>
                                                    I grew up in Quitman, Texas, before moving to Tyler in 2015, where I've lived ever since. I went to school at <span class='text-[#CB6015] font-bold'>The University of Texas at Tyler</span>, where I graduated in 2023 with a <span class='font-bold'>Bachelor of Science in Computer Science</span>.
                                                </p>
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <div class="flex flex-col gap-4 py-2">
                                            <h1 class="text-2xl font-bold text-center">My Story:</h1>
                                            <p class="px-4 text-md">
                                                I discovered my passion for software development in high school when I took a computer science class. I was immediately hooked and have been coding ever since.
                                                Coding spoke to me because it was the first subject in school that I felt challenged me. At the risk of sounding boastful, other subjects came very easy to me, but coding was the one that I had to work for.
                                            </p>
                                            <p class="px-4 text-md">    
                                                I'm currently working as a <span class="font-bold">Software Test Engineer</span> at <span class="text-[#6400FF] font-bold">Trane Technologies</span>. My current goal is to get my first job as a software developer, and I'm working towards that goal by learning new technologies and building my portfolio.
                                            </p>

                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <div class="flex flex-row gap-4">
                                            <AspectRatio ratio={16 / 9} class="flex items-center justify-center">
                                                <img src="/css_meme.png" alt="Unfortunately Timed Frontend Failure" class="w-full h-full object-cover">
                                            </AspectRatio>
                                            <p class="w-1/2">
                                                I'd say I prefer <span class="font-bold">frontend</span> development, but I'm not afraid to get my hands dirty with the <span class="font-bold">backend</span>. I've developed a few <span class="font-bold">full-stack applications</span>, and I consider myself to be very versatile.
                                            </p>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <div class="flex flex-row gap-4">
                                            <AspectRatio ratio={16 / 9} class="flex items-center justify-center">
                                                <video src="/biking.mp4" autoplay loop muted class="w-full h-full object-cover rounded-lg">
                                                </video>
                                            </AspectRatio>
                                            <div class="flex flex-col gap-4">
                                                <p>
                                                    Other hobbies of mine include playing video games, biking, and well, coding.
                                                </p>
                                                <p>
                                                    I've been on something of a health kick lately, and and I discovered that I really like <span class="font-bold">biking</span>. It's good exercise, and way more satisfying than running, because you get to travel further, and generally see more sights.
                                                </p>
                                                <p>
                                                    I'm also a big fan of <span class="font-bold">video games</span>. I've been playing them since I was a kid, and I still love them to this day.
                                                </p>
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <div class="flex flex-col gap-4">
                                            <h1 class="text-2xl font-bold text-center">Fun Facts About Me:</h1>
                                            <ul class="list-disc list-inside font-bold space-y-3">
                                                <li>Favorite Color: <span class="bg-[#004225] text-white px-2 py-1 rounded-md">British Racing Green</span></li>
                                                <li>Favorite Album: <span class="bg-[#ea3f23] text-white px-2 py-1 rounded-md">Rush: 2112</span></li>
                                                <li>Favorite Video Game: <span class="bg-gray-400 text-white px-2 py-1 rounded-md">Battlefield 4</span></li>
                                                <li>Favorite Movie: <span class="bg-[#82cad6] text-red-500 px-2 py-1 rounded-md">Nacho Libre</span></li>
                                                <li>I went to the same High School as: <span class="bg-red-500 text-yellow-400 px-2 py-1 rounded-md">Patrick Mahomes</span></li>
                                            </ul>
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