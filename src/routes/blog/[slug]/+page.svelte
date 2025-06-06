<script lang="ts">
    import { Badge } from "$lib/components/ui/badge/index.js";
    
    import { formatDate } from "$lib/utils";
    import { onMount } from "svelte";

    let { data } = $props();

    // onMount(() => {
    //     console.log(data)
    // })
</script>

<svelte:head>
    <title>{data.meta.title}</title>
    <meta property="og:type" content="article" />
    <meta property="og:title" content={data.meta.title} />
</svelte:head>

<article class="prose dark:prose-invert max-w-none p-8">
    <h1>{data.meta.title}</h1>
    
    <div class="flex gap-2 items-center mb-4">
        <time datetime={data.meta.date}>{formatDate(data.meta.date)}</time>
        <div class="flex gap-1">
            {#each data.meta.tags as tag}
                <Badge variant="secondary">#{tag}</Badge>
            {/each}
        </div>
    </div>

    <div class="mb-8">
        {data.meta.description}
    </div>

    {#if data.meta.image}
        <img src={data.meta.image} alt={data.meta.title} class="w-full rounded-lg mb-8" />
    {/if}
</article>


