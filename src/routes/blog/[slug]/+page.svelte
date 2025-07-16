<script lang="ts">
    import { Badge } from "$lib/components/ui/badge/index.js";
    import * as Button from "$lib/components/ui/button/index.js";
    import { Separator } from "$lib/components/ui/separator/index.js";
    import ChevronLeftIcon from "@tabler/icons-svelte/icons/chevron-left";
    import ChevronRightIcon from "@tabler/icons-svelte/icons/chevron-right";
    import { formatDate } from "$lib/utils";
    import { onMount } from "svelte";


    let { data } = $props();
</script>

<svelte:head>
    <title>{data.meta.title}</title>
    <meta property="og:type" content="article" />
    <meta property="og:title" content={data.meta.title} />
</svelte:head>

<div class="flex flex-col gap-4 max-w-3xl mx-auto">
    <article class="prose max-w-none p-8">
        <h1>{data.meta.title}</h1>
        <div class="flex gap-2 items-center mb-4">
            <time datetime={data.meta.date}>{formatDate(data.meta.date)}</time>
            <div class="flex gap-1">
                {#each data.meta.tags as tag}
                <Badge variant="secondary">#{tag}</Badge>
                {/each}
            </div>
        </div>
        
        <div>
            {data.meta.description}
        </div>
        
        <Separator class="mt-4 mb-8 border-1" />
        <div class="flex flex-col gap-2">
            <data.content />
        </div>
    </article>
    <footer class="flex flex-col gap-2">
        <Separator class="my-2 border-1" />
        <div class="flex flex-col justify-end mb-5">
            <Button.Root variant="ghost" size="sm" class="w-fit" href="/blog">
                <ChevronLeftIcon />
                <span>Back to Blog</span>
            </Button.Root>
        </div>
    </footer>
</div>

