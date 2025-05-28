<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import { page } from "$app/stores";
    import { onMount } from "svelte";

    onMount(() => {
        const path = $page.url.pathname;
        console.log(`Current path: ${path}`);
    });
</script>

<div class="flex flex-row justify-between items-center h-12 border-b border-gray-200 px-2">
    <h1 class="text-xl font-bold">
        <a href="/">Vincent Hilario</a>
    </h1>
    <Button class="w-24" href="/blog">
        My Blog
    </Button>
</div>

