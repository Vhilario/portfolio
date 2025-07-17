<script lang="ts">
	import { onMount } from 'svelte';
	import { IsMobile } from '$lib/hooks/is-mobile.svelte.js';
	import gsap from 'gsap';
	import { ScrollTrigger, ScrollSmoother, SplitText, ScrollToPlugin } from 'gsap/all';

	import { AspectRatio } from '$lib/components/ui/aspect-ratio/index.js';
    import * as Button from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';

	import ChevronCompactLeftIcon from '@tabler/icons-svelte/icons/chevron-compact-left';
	import ChevronCompactRightIcon from '@tabler/icons-svelte/icons/chevron-compact-right';
	import type { CarouselAPI } from '$lib/components/ui/carousel/context.js';

	const isMobile = new IsMobile();

	let api = $state<CarouselAPI>();
	const count = $derived(api ? api.scrollSnapList().length : 0);
	let current = $state(0);

	$effect(() => {
		if (api) {
			current = api.selectedScrollSnap() + 1;
			api.on('select', () => {
				current = api!.selectedScrollSnap() + 1;
			});
		}
	});

	let aboutMeSection: HTMLElement;
	let sectionHeading: HTMLElement;
	let aboutCard: HTMLElement;
	let aboutCardContent: HTMLElement;

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, ScrollToPlugin);

		const mainSplit = new SplitText(sectionHeading, {
			type: 'words,lines',
			mask: 'words'
		});

		// Set initial state of the card
		gsap.set(aboutCard, {
			scaleY: 0,
			transformOrigin: 'bottom center',
			opacity: 0
		});

		// Create timeline for the animation sequence
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: aboutMeSection,
				start: 'top 80%',
				end: 'bottom 20%',
				toggleActions: 'play none none none'
			}
		});

		// Step 1: Text springs up
		tl.from(mainSplit.words, {
			opacity: 0,
			y: 100,
			duration: 1,
			autoAlpha: 0,
			ease: 'power2.inOut'
		});

		// Step 2: Card grows upward AND text becomes left-aligned (parallel animations)
		tl.fromTo(
			aboutCard,
			{
				scaleY: 0,
				transformOrigin: 'bottom center',
				opacity: 0
			},
			{
				scaleY: 1,
				opacity: 1,
				duration: 0.8,
				ease: 'power2.out'
			}
		).to(
			sectionHeading,
			{
				textAlign: 'left',
				duration: 0.8,
				ease: 'power2.out'
			},
			'<'
		); // The "<" makes this animation start at the same time as the previous one

		// Step 3: Card content fades in
		tl.from(
			aboutCardContent,
			{
				opacity: 0,
				y: 20,
				duration: 0.6,
				stagger: 0.1,
				ease: 'power2.out'
			},
			'>'
		); // Use ">" to start after previous animations
	});
</script>

<section bind:this={aboutMeSection} class="relative mx-auto max-w-3xl">
	{#if !isMobile.current}
		<h1 class="mb-4 text-4xl font-bold" bind:this={sectionHeading}>About Me</h1>
		<div bind:this={aboutCard} class="flex flex-row gap-4">
			<div class="flex w-10 justify-center">
				<button class="flex h-full cursor-pointer items-center" onclick={() => api?.scrollPrev()}>
					<ChevronCompactLeftIcon class="h-16 w-16 text-gray-400" />
				</button>
			</div>
			<Card.Root class="mx-auto w-full max-w-2xl">
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
										align: 'start',
										loop: true
									}}
								>
									<Carousel.Content class="w-full">
										<Carousel.Item>
											<div class="flex flex-row gap-4">
												<AspectRatio ratio={16 / 9} class="flex items-center justify-center">
													<img
														src="/pictureofme.jpg"
														alt="Vincent Hilario"
														class="h-full rounded-lg object-cover"
													/>
												</AspectRatio>
												<div class="flex flex-col gap-4">
													<p>
														I'm <span class="font-bold">Vincent Hilario</span>, a software developer
														from Tyler, Texas. Well, technically I'm a software tester, but I want
														to be a software developer someday.
													</p>
													<p>
														I grew up in Quitman, Texas, before moving to Tyler in 2015, where I've
														lived ever since. I went to school at <span
															class="font-bold text-[#CB6015]"
															>The University of Texas at Tyler</span
														>, where I graduated in 2023 with a
														<span class="font-bold">Bachelor of Science in Computer Science</span>.
													</p>
												</div>
											</div>
										</Carousel.Item>
										<Carousel.Item>
											<div class="flex flex-col gap-4 py-2">
												<h1 class="text-center text-2xl font-bold">My Story:</h1>
												<p class="text-md px-4">
													I discovered my passion for software development in high school when I
													took a computer science class. I was immediately hooked and have been
													coding ever since. Coding spoke to me because it was the first subject in
													school that I felt challenged me. At the risk of sounding boastful, other
													subjects came very easy to me, but coding was the one that I had to work
													for.
												</p>
												<p class="text-md px-4">
													I'm currently working as a <span class="font-bold"
														>Software Test Engineer</span
													>
													at <span class="font-bold text-[#6400FF]">Trane Technologies</span>. My
													current goal is to get my first job as a software developer, and I'm
													working towards that goal by learning new technologies and building my
													portfolio.
												</p>
											</div>
										</Carousel.Item>
										<Carousel.Item>
											<div class="flex flex-row gap-4">
												<AspectRatio ratio={16 / 9} class="flex items-center justify-center">
													<img
														src="/css_meme.png"
														alt="Unfortunately Timed Frontend Failure"
														class="h-full w-full object-cover"
													/>
												</AspectRatio>
												<p class="w-1/2">
													I'd say I prefer <span class="font-bold">frontend</span> development, but
													I'm not afraid to get my hands dirty with the
													<span class="font-bold">backend</span>. I've developed a few
													<span class="font-bold">full-stack applications</span>, and I consider
													myself to be very versatile.
												</p>
											</div>
										</Carousel.Item>
										<Carousel.Item>
											<div class="flex flex-row gap-4">
												<AspectRatio ratio={16 / 9} class="flex items-center justify-center">
													<video
														src="/biking.mp4"
														autoplay
														loop
														muted
														class="h-full w-full rounded-lg object-cover"
													>
													</video>
												</AspectRatio>
												<div class="flex flex-col gap-4">
													<p>
														Other hobbies of mine include playing video games, biking, and well,
														coding.
													</p>
													<p>
														I've been on something of a health kick lately, and and I discovered
														that I really like <span class="font-bold">biking</span>. It's good
														exercise, and way more satisfying than running, because you get to
														travel further, and generally see more sights.
													</p>
													<p>
														I'm also a big fan of <span class="font-bold">video games</span>. I've
														been playing them since I was a kid, and I still love them to this day.
													</p>
												</div>
											</div>
										</Carousel.Item>
										<Carousel.Item>
											<div class="flex flex-col gap-4">
												<h1 class="text-center text-2xl font-bold">Fun Facts About Me:</h1>
												<ul class="list-inside list-disc space-y-3 font-bold">
													<li>
														Favorite Color: <span
															class="rounded-md bg-[#004225] px-2 py-1 text-white"
															>British Racing Green</span
														>
													</li>
													<li>
														Favorite Album: <span
															class="rounded-md bg-[#ea3f23] px-2 py-1 text-white">Rush: 2112</span
														>
													</li>
													<li>
														Favorite Video Game: <span
															class="rounded-md bg-gray-400 px-2 py-1 text-white"
															>Battlefield 4</span
														>
													</li>
													<li>
														Favorite Movie: <span
															class="rounded-md bg-[#82cad6] px-2 py-1 text-red-500"
															>Nacho Libre</span
														>
													</li>
													<li>
														I went to the same High School as: <span
															class="rounded-md bg-red-500 px-2 py-1 text-yellow-400"
															>Patrick Mahomes</span
														>
													</li>
													<li>
														I love to play daily games, especially:
														<ul class="space-y-1 pl-6">
															<li class="flex items-center gap-2">
																<span
																	class="mr-2 inline-block h-2 w-2 rounded-full border-2 border-gray-500"
																></span>
																<span class="rounded-md bg-[#b4a8fe] px-2 py-1 text-white"
																	>NYT Connections</span
																>
															</li>
															<li class="flex items-center gap-2">
																<span
																	class="mr-2 inline-block h-2 w-2 rounded-full border-2 border-gray-500"
																></span>
																<a
																	href="https://www.minutecryptic.com"
																	target="_blank"
																	class="rounded-md bg-[#f1b1ff] px-2 py-1 underline"
																	>Minute Cryptic</a
																>
															</li>
														</ul>
													</li>
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
			<div class="flex w-10 justify-center">
				<button class="flex h-full cursor-pointer items-center" onclick={() => api?.scrollNext()}>
					<ChevronCompactRightIcon class="h-16 w-16 text-gray-400" />
				</button>
			</div>
		</div>
	{:else}
    <div bind:this={aboutCard} class="flex flex-col gap-3 px-4">
        <h1 class="mb-3 text-4xl font-bold" bind:this={sectionHeading}>About Me</h1>
        <Card.Root class="grid grid-cols-1">
            <div bind:this={aboutCardContent}>
                <Card.Header>
                    <Card.Title class="text-lg">Vincent Hilario</Card.Title>
                    <Card.Description class="text-sm">Software Developer</Card.Description>
                </Card.Header>
                <Separator class="my-2" />
                <Card.Content class="px-2">
                    <div class="flex flex-col gap-3">
                        <div class="relative w-full min-w-0">
                            <Carousel.Root
                                setApi={(emblaApi) => (api = emblaApi)}
                                opts={{
                                    align: 'start',
                                    loop: true
                                }}
                            >
                                <Carousel.Content class="w-full min-w-0">
                                    <Carousel.Item>
                                        <div class="flex flex-col gap-3">
                                            <AspectRatio ratio={4 / 3} class="flex items-center justify-center">
                                            <img
                                                    src="/pictureofme.jpg"
                                                    alt="Vincent Hilario"
                                                    class="h-full w-full rounded-md object-cover"
                                                />
                                            </AspectRatio>
                                            <div class="flex flex-col gap-2 text-sm">
                                                <p>
                                                    I'm <span class="font-bold">Vincent Hilario</span>, a software developer
                                                    from Tyler, Texas. Well, technically I'm a software tester, but I want
                                                    to be a software developer someday.
                                                </p>
                                                <p>
                                                    I grew up in Quitman, Texas, before moving to Tyler in 2015, where I've
                                                    lived ever since. I went to school at <span
                                                        class="font-bold text-[#CB6015]"
                                                        >The University of Texas at Tyler</span
                                                    >, where I graduated in 2023 with a
                                                    <span class="font-bold">Bachelor of Science in Computer Science</span>.
                                                </p>
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <div class="flex flex-col gap-2 py-1">
                                            <h1 class="text-center text-lg font-bold">My Story:</h1>
                                            <p class="text-sm px-2">
                                                I discovered my passion for software development in high school when I
                                                took a computer science class. I was immediately hooked and have been
                                                coding ever since. Coding spoke to me because it was the first subject in
                                                school that I felt challenged me. At the risk of sounding boastful, other
                                                subjects came very easy to me, but coding was the one that I had to work
                                                for.
                                            </p>
                                            <p class="text-sm px-2">
                                                I'm currently working as a <span class="font-bold"
                                                    >Software Test Engineer</span
                                                >
                                                at <span class="font-bold text-[#6400FF]">Trane Technologies</span>. My
                                                current goal is to get my first job as a software developer, and I'm
                                                working towards that goal by learning new technologies and building my
                                                portfolio.
                                            </p>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <div class="flex flex-col gap-3">
                                                <img
                                                    src="/css_meme.png"
                                                    alt="Unfortunately Timed Frontend Failure"
                                                    class="h-48 w-full object-cover rounded-md"
                                                />
                                            <p class="w-full text-sm">
                                                I'd say I prefer <span class="font-bold">frontend</span> development, but
                                                I'm not afraid to get my hands dirty with the
                                                <span class="font-bold">backend</span>. I've developed a few
                                                <span class="font-bold">full-stack applications</span>, and I consider
                                                myself to be very versatile.
                                            </p>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <div class="flex flex-col gap-3">
                                                <video
                                                    src="/biking.mp4"
                                                    autoplay
                                                    loop
                                                    muted
                                                    class="h-48 w-full rounded-md object-cover"
                                                >
                                                </video>
                                            <div class="flex flex-col gap-2 text-sm">
                                                <p>
                                                    Other hobbies of mine include playing video games, biking, and well,
                                                    coding.
                                                </p>
                                                <p>
                                                    I've been on something of a health kick lately, and I discovered
                                                    that I really like <span class="font-bold">biking</span>. It's good
                                                    exercise, and way more satisfying than running, because you get to
                                                    travel further, and generally see more sights.
                                                </p>
                                                <p>
                                                    I'm also a big fan of <span class="font-bold">video games</span>. I've
                                                    been playing them since I was a kid, and I still love them to this day.
                                                </p>
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <div class="flex flex-col gap-2">
                                            <h1 class="text-center text-lg font-bold">Fun Facts About Me:</h1>
                                            <ul class="list-inside list-disc space-y-2 font-bold text-sm">
                                                <li>
                                                    Favorite Color: <span
                                                        class="rounded bg-[#004225] px-1.5 py-0.5 text-white"
                                                        >British Racing Green</span
                                                    >
                                                </li>
                                                <li>
                                                    Favorite Album: <span
                                                        class="rounded bg-[#ea3f23] px-1.5 py-0.5 text-white">Rush: 2112</span
                                                    >
                                                </li>
                                                <li>
                                                    Favorite Video Game: <span
                                                        class="rounded bg-gray-400 px-1.5 py-0.5 text-white"
                                                        >Battlefield 4</span
                                                    >
                                                </li>
                                                <li>
                                                    Favorite Movie: <span
                                                        class="rounded bg-[#82cad6] px-1.5 py-0.5 text-red-500"
                                                        >Nacho Libre</span
                                                    >
                                                </li>
                                                <li>
                                                    I went to the same High School as: <span
                                                        class="rounded bg-red-500 px-1.5 py-0.5 text-yellow-400"
                                                        >Patrick Mahomes</span
                                                    >
                                                </li>
                                                <li>
                                                    I love to play daily games, especially:
                                                    <ul class="space-y-1 pl-4">
                                                        <li class="flex items-center gap-1">
                                                            <span
                                                                class="mr-1 inline-block h-1.5 w-1.5 rounded-full border border-gray-500"
                                                            ></span>
                                                            <span class="rounded bg-[#b4a8fe] px-1.5 py-0.5 text-white"
                                                                >NYT Connections</span
                                                            >
                                                        </li>
                                                        <li class="flex items-center gap-1">
                                                            <span
                                                                class="mr-1 inline-block h-1.5 w-1.5 rounded-full border border-gray-500"
                                                            ></span>
                                                            <a
                                                                href="https://www.minutecryptic.com"
                                                                target="_blank"
                                                                class="rounded bg-[#f1b1ff] px-1.5 py-0.5 underline"
                                                                >Minute Cryptic</a
                                                            >
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                    </Carousel.Item>
                                </Carousel.Content>
                            </Carousel.Root>
                        </div>
                    </div>
                </Card.Content>
                <Card.Footer>
                    <div class="flex flex-row items-center justify-between gap-2 w-full">
                        <span class="text-muted-foreground text-sm">Slide {current} of {count}</span>
                        <div class="flex flex-row gap-1 sm:gap-2">
                            <Button.Root variant="outline" size="sm" class="text-xs px-2 sm:px-3" onclick={() => api?.scrollPrev()}>
                                <ChevronCompactLeftIcon class="h-3 w-3 sm:h-4 sm:w-4" />
                                <span class="hidden sm:inline">Previous</span>
                            </Button.Root>
                            <Button.Root variant="outline" size="sm" class="text-xs px-2 sm:px-3" onclick={() => api?.scrollNext()}>
                                <span class="hidden sm:inline">Next</span>
                                <ChevronCompactRightIcon class="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button.Root>
                        </div>
                    </div>
                    
                </Card.Footer>
            </div>
        </Card.Root>
    </div>
	{/if}
</section>
