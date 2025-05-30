<script lang="ts">
	import '../app.css';
	import MainNav from '$lib/components/custom/main-nav.svelte';
	let { children } = $props();
</script>

<div class="flex flex-col h-screen">
	<!-- MainNav always at the top -->
	<!--<MainNav /> -->
	<!-- Content below, scrollable if needed -->
	{@render children()}
</div>
