<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import { IsMobile } from "$lib/hooks/is-mobile.svelte";
</script>


<svelte:head>
	<title>Vincent Hilario</title>
	<meta property="og:type" />
	<meta property="og:title" content="Vincent Hilario" />
</svelte:head>
<div class="flex flex-col items-center justify-center h-screen mb-16">
	<h1 class="text-4xl font-bold">Vincent Hilario</h1>
	<p class="text-lg">Visit <a class="text-blue-500" href="/blog">my blog</a>, because I'm too lazy to make this page look nice.</p>
	
	<span> OR, </span>

	why don't you just check out my
	<a href={`Vincent Hilario.pdf`} class='text-blue-500'>Resume</a>
</div>