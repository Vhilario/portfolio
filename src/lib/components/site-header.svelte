<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import { Separator } from "$lib/components/ui/separator/index.js";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import ArrowLeftIcon from "@tabler/icons-svelte/icons/arrow-left";
</script>

<header
	class="h-(--header-height) group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) flex shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear"
>
	<div class="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
		<Sidebar.Trigger class="-ml-1" />
		<Separator orientation="vertical" class="mx-2 data-[orientation=vertical]:h-4" />
		<h1 class="text-base font-medium">Blog</h1>
		<div class="ml-auto flex items-center gap-2">
			<a href="/">
				<Button
					variant="ghost"
					size="sm"
					class="dark:text-foreground hidden sm:flex"
					target="_blank"
					rel="noopener noreferrer"
				>
					<ArrowLeftIcon />
					Back to Home
				</Button>
			</a>
		</div>
	</div>
</header>
