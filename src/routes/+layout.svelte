<script lang="ts">
	import '../app.css';
	let { children } = $props();
	import { ModeWatcher } from "mode-watcher";

</script>

<ModeWatcher />
<div class="flex flex-col h-screen">
	{@render children()}
</div>
