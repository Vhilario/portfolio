<script lang="ts">
	import '../app.css';
	let { children } = $props();
	import { ModeWatcher } from "mode-watcher";
	import { Toaster } from 'svelte-sonner';
</script>

<ModeWatcher />
<Toaster />
<div class="flex flex-col h-screen">
	{@render children()}
</div>
