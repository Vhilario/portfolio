<script lang="ts">
  import { goto } from '$app/navigation'

  import ArrowLeftIcon from "@tabler/icons-svelte/icons/arrow-left"
  import HomeIcon from "@tabler/icons-svelte/icons/home"
  import Button from '$lib/components/ui/button/button.svelte'
  import * as HoverCard from '$lib/components/ui/hover-card/index.js'
</script>

<div class="flex flex-col items-center justify-center h-screen w-auto mb-16">
  <h2 class="text-4xl font-bold pb-2">Page Not Found 😦</h2>
  <h3 class='text-md pb-6'>The page you are looking for does not exist. Here are some options to get you back on track.</h3>
  <div class="flex flex-row space-x-2">
    <HoverCard.Root openDelay={100} closeDelay={50}>
      <HoverCard.Trigger>
        <Button onclick={() => history.length > 1 ? history.back() : goto('/')} class="cursor-pointer">
          <ArrowLeftIcon />
          Go Back
          <HoverCard.Content>
            <div class='text-sm'>
              Returns to the previous page
            </div>
          </HoverCard.Content>
        </Button>
      </HoverCard.Trigger>
    </HoverCard.Root>

    <HoverCard.Root openDelay={100} closeDelay={50}>
      <HoverCard.Trigger>
        <Button variant="outline" onclick={() => goto('/')} class="cursor-pointer">
          <HomeIcon />
          Home Page
          <HoverCard.Content>
            <div class='text-sm'>
              Navigates to
              <span class="font-bold">vincenthilar.io</span>
            </div>
          </HoverCard.Content>
        </Button>
      </HoverCard.Trigger>
    </HoverCard.Root>
  </div>
</div>
