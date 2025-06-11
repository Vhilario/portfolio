<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import { IsMobile } from "$lib/hooks/is-mobile.svelte";
	import * as Card from "$lib/components/ui/card/index.js";

	import AboutMe from "$lib/components/custom/about-me.svelte";

	import gsap from "gsap";
	import { ScrollTrigger } from "gsap/ScrollTrigger";
	
	if (typeof window !== "undefined") {
		gsap.registerPlugin(ScrollTrigger);
	}	
</script>


<svelte:head>
	<title>Vincent Hilario</title>
	<meta property="og:type" />
	<meta property="og:title" content="Vincent Hilario" />
	<meta name="description" content="Vincent Hilario's portfolio" />
</svelte:head>
<div class="space-y-24">
	<AboutMe />
</div>