<script lang="ts">
	import BrandSvelteIcon from '@tabler/icons-svelte/icons/brand-svelte';
	import BrandReactIcon from '@tabler/icons-svelte/icons/brand-react';
	import BrandReactNativeIcon from '@tabler/icons-svelte/icons/brand-react-native';
	import BrandReduxIcon from '@tabler/icons-svelte/icons/brand-redux';
	import BrandTypescriptIcon from '@tabler/icons-svelte/icons/brand-typescript';
	import BrandJavascriptIcon from '@tabler/icons-svelte/icons/brand-javascript';
    import BrandTailwindIcon from '@tabler/icons-svelte/icons/brand-tailwind';
    import BrandNextjsIcon from '@tabler/icons-svelte/icons/brand-nextjs';
    
    
	import BrandMysqlIcon from '@tabler/icons-svelte/icons/brand-mysql';
    import BrandPythonIcon from '@tabler/icons-svelte/icons/brand-python';
    import LeafIcon from '@tabler/icons-svelte/icons/leaf';
    import BrandNodejsIcon from '@tabler/icons-svelte/icons/brand-nodejs';
    import BrandCarbonIcon from '@tabler/icons-svelte/icons/brand-carbon';

	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
    import { Label } from "$lib/components/ui/label/index.js"

    import { mode } from "mode-watcher";

    let nextJsColor = "#000000";
	
	// Subscribe to mode changes
	mode.subscribe((currentMode) => {
		if (currentMode === "light") {
			nextJsColor = "#000000";
		} else {
			nextJsColor = "#ffffff";
		}
	});

	let sectionHeading: HTMLElement;

    type Technology = {
        name: string;
        color: string;
        icon: typeof BrandSvelteIcon;
    }

	const frontendTechnologies : Technology[] = [
		{
			name: 'Svelte',
			color: '#f74303',
			icon: BrandSvelteIcon
		},
		{
			name: 'React',
			color: '#57c4db',
			icon: BrandReactIcon
		},
		{
			name: 'React-Native',
			color: '#57c4db',
			icon: BrandReactNativeIcon
		},
		{
			name: 'Redux',
			color: '#7949b6',
			icon: BrandReduxIcon
		},
		{
			name: 'Next.js',
			color: nextJsColor,
			icon: BrandNextjsIcon
		},
        {
            name: 'JavaScript',
            color: '#efdb54',
            icon: BrandJavascriptIcon
        },
		{
			name: 'TypeScript',
			color: '#3179c3',
			icon: BrandTypescriptIcon
		},
		{
			name: 'Tailwind',
			color: '#38bdf8',
			icon: BrandTailwindIcon
		}
	];

	const backendTechnologies : Technology[] = [
        {
            name: 'Node.js',
            color: '#63a54e',
            icon: BrandNodejsIcon
        },
		{
			name: 'MySQL',
			color: '#33678f',
			icon: BrandMysqlIcon
		},
		{
			name: 'FastAPI / Flask',
			color: '#f6d44c',
			icon: BrandPythonIcon
		},
        {
            name: 'Spring',
            color: '#6db33f',
            icon: LeafIcon
        },
        {
            name: 'Embedded C',
            color: '#5890dd',
            icon: BrandCarbonIcon
        }
	];
</script>

<section bind:this={sectionHeading} class="relative mx-auto max-w-3xl px-4">
	<h1 class="mb-2 text-3xl md:text-4xl font-bold">Technologies I've Worked With:</h1>
	<p class="pb-4">I've used a variety of technologies to build my projects, across the frontend and backend.</p>
	<div class="space-y-6">
		<div class="flex flex-col md:flex-row gap-4 md:gap-2 items-start md:items-center">
			<h2 class="text-xl md:text-2xl font-bold whitespace-nowrap">Frontend:</h2>
			<div class="flex flex-wrap justify-center md:justify-start gap-3 md:gap-2">
				{#each frontendTechnologies as technology}
					{@render technologyIcon(technology)}
				{/each}
			</div>
		</div>
		
		<div class="flex flex-col md:flex-row gap-4 md:gap-2 items-start md:items-center">
			<h2 class="text-xl md:text-2xl font-bold whitespace-nowrap">Backend:</h2>
			<div class="flex flex-wrap justify-center md:justify-start gap-3 md:gap-2">
				{#each backendTechnologies as technology}
					{@render technologyIcon(technology)}
				{/each}
			</div>
		</div>


	</div>
</section>

{#snippet technologyIcon(technology: Technology)}
<Tooltip.Provider>
    <Tooltip.Root delayDuration={0}>
        <Tooltip.Trigger>
            <div class="flex flex-col items-center justify-center transition-transform duration-200 hover:scale-125 active:scale-110">
                <technology.icon class="h-18 w-18 md:h-12 md:w-12" style="color: {technology.color}" />
                <Label class="md:hidden font-bold">{technology.name}</Label>
            </div>
        </Tooltip.Trigger>
        <Tooltip.Content>
            <p class="text-sm">{technology.name}</p>
        </Tooltip.Content>
    </Tooltip.Root>
</Tooltip.Provider>
{/snippet}