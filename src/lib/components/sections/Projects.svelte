<script lang="ts">
    import { onMount } from 'svelte'
    import gsap from "gsap"
    import { ScrollTrigger, ScrollSmoother, SplitText, ScrollToPlugin } from "gsap/all"

    import { AspectRatio } from "$lib/components/ui/aspect-ratio/index.js";

    import * as Card from "$lib/components/ui/card"
    import Badge from '$lib/components/ui/badge/badge.svelte'
    import * as Button from "$lib/components/ui/button"
    import * as HoverCard from '$lib/components/ui/hover-card/index.js'
    import { Separator } from "$lib/components/ui/separator/index.js";

    import type { Project } from "$lib/data/projects"
    import { projects } from "$lib/data/projects"
    import LinkIcon from '@tabler/icons-svelte/icons/link'
    import GithubIcon from '@tabler/icons-svelte/icons/brand-github'

    let projectsSection: HTMLElement
    let sectionHeading: HTMLElement

    onMount(() => {
        gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, ScrollToPlugin)
    })
</script>

<section bind:this={projectsSection} class="max-w-3xl mx-auto relative">
    <h1 class="text-4xl font-bold mb-4" bind:this={sectionHeading}>Projects</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        {#each projects as project}
            <Card.Root class="w-full max-w-2xl mx-auto relative gap-2 py-4">
                <Card.Header>
                    <div class="flex flex-row gap-1 items-center justify-between w-full">
                        <Card.Title class="text-xl font-bold">{project.title}</Card.Title>
                        <div class="flex flex-row gap-2">
                            {#if project.link}
                                <HoverCard.Root openDelay={200} closeDelay={300}>
                                    <HoverCard.Trigger>
                                        <Button.Root variant="outline" size="icon" href={project.link} target="_blank" class="transition-all duration-200 hover:scale-105 hover:shadow-md">
                                            <LinkIcon class="w-4 h-4" />
                                        </Button.Root>
                                    </HoverCard.Trigger>
                                    <HoverCard.Content class="w-48 p-3 backdrop-blur-sm border border-gray-200/50 shadow-lg">
                                        <div class="flex items-center gap-2">
                                            <LinkIcon class="w-4 h-4" />
                                            <p class="text-sm font-medium">View Live Project</p>
                                        </div>
                                        <p class="text-xs mt-1">Opens in new tab</p>
                                    </HoverCard.Content>
                                </HoverCard.Root>
                            {/if}
                            {#if project.github}
                                <HoverCard.Root openDelay={200} closeDelay={300}>
                                    <HoverCard.Trigger>
                                        <Button.Root variant="outline" size="icon" href={project.github} target="_blank" class="transition-all duration-200 hover:scale-105 hover:shadow-md">
                                            <GithubIcon class="w-4 h-4" />
                                        </Button.Root>
                                    </HoverCard.Trigger>
                                    <HoverCard.Content class="w-48 p-3 backdrop-blur-sm border border-gray-200/50 shadow-lg">
                                        <div class="flex items-center gap-2">
                                            <GithubIcon class="w-4 h-4" />
                                            <p class="text-sm font-medium">View Source Code</p>
                                        </div>
                                        <p class="text-xs mt-1">Opens in new tab</p>
                                    </HoverCard.Content>
                                </HoverCard.Root>
                            {/if}
                        </div>
                    </div>
                </Card.Header>
                <Separator />
                <Card.Content>
                    <AspectRatio ratio={16 / 9} class="flex items-center justify-center">
                        <img src={project.image} alt={project.title} class="w-full h-full object-cover" />
                    </AspectRatio>
                    <p class="text-sm">{project.description}</p>
                </Card.Content>
                <Separator class="my-2" />
                <Card.Footer>
                    <div class="w-full flex flex-row gap-2 justify-end">
                        {#each project.tags as tag, index}
                            {#if index < 3}
                                <Badge>{tag}</Badge>
                            {/if}
                        {/each}
                    </div>
                </Card.Footer>
            </Card.Root>
        {/each}
    </div>
</section>