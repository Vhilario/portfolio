<script lang="ts">
  import { onMount } from "svelte";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";

  import * as Card from "$lib/components/ui/card/index.js";

  if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  let sectionEl: HTMLElement;

  let splitElement: HTMLElement;
  
  onMount(async () => {
    // Only import SplitText in the browser
    const { SplitText } = await import("gsap/SplitText");
    gsap.registerPlugin(SplitText);

    const split = new SplitText(splitElement, { type: "chars,words" });
    gsap.from(split.chars, {
      y: 100,
      opacity: 0,
      stagger: 0.02,
      duration: 0.5,
      ease: "power2.out"
    });

    const tl = gsap.timeline();
    tl.from(sectionEl, { y: 100, opacity: 0, duration: 1, ease: "power2.out" });

    ScrollTrigger.create({
      animation: tl,
      trigger: sectionEl,
      start: "top 80%",
      end: "bottom 20%",
      scrub: true
    });
  });
</script>

<section bind:this={sectionEl} class="h-screen flex items-center justify-center snap-center">
  <Card.Root class="w-full h-full max-w-2xl max-h-[60%] mx-2">
    <Card.Header>
      <Card.Title>About Me</Card.Title>
    </Card.Header>

    <Card.Content>
      <p bind:this={splitElement}>
        I'm a software engineer with a passion for building web applications that are both functional and aesthetically pleasing.
      </p>
    </Card.Content>
  </Card.Root>
</section>
