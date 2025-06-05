<script lang="ts">
	import ArticleIcon from "@tabler/icons-svelte/icons/article";
	import * as Drawer from "$lib/components/ui/drawer/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { IsMobile } from "$lib/hooks/is-mobile.svelte.js";
	import { AspectRatio } from "$lib/components/ui/aspect-ratio/index.js";
	import type { Schema } from "./schemas.js";

	const isMobile = new IsMobile();
	let { item }: { item: Schema } = $props();

</script>

<Drawer.Root direction={isMobile.current ? "bottom" : "right"}>
	<Drawer.Trigger>
		{#snippet child({ props })}
			<Button variant="link" class="text-foreground w-fit px-0 text-left" {...props}>
				
				<span class={"truncate overflow-hidden whitespace-nowrap block " + (isMobile.current ? "max-w-[250px]" : "lg:max-w-[350px] max-w-[300px]")}>
					{item.title}
				</span>
			</Button>
		{/snippet}
	</Drawer.Trigger>
	<Drawer.Content>
		<Drawer.Header class="gap-1">
			<Drawer.Title>{item.title}</Drawer.Title>
			<Drawer.Description>{item.description}</Drawer.Description>
		</Drawer.Header>
		<div class="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
			{#if !isMobile.current}
				<div class="flex flex-col gap-4">
					{#if item.image}
						<AspectRatio ratio={16 / 9} class="flex items-center justify-center">
							<img src={item.image} alt={item.title} class="w-full h-full object-cover" />
						</AspectRatio>
					{/if}
				</div>
			{:else}
				<div class="flex flex-col gap-4">
					{#if item.image}
						<AspectRatio ratio={16 / 9} class="flex items-center justify-center">
							<img src={item.image} alt={item.title} class="w-full h-full object-cover" />
						</AspectRatio>
					{/if}
				</div>
			{/if}



		</div>
		<Drawer.Footer>
			<Button><ArticleIcon />Read More</Button>
			<Drawer.Close>
				{#snippet child({ props })}
					<Button variant="outline" {...props}>Done</Button>
					
				{/snippet}
			</Drawer.Close>
		</Drawer.Footer>
	</Drawer.Content>
</Drawer.Root>
