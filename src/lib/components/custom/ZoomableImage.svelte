<script lang="ts">
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    
    interface Props {
        src: string;
        alt?: string;
    }
    
    let { src, alt = "" } = $props<Props>();
</script>

<Dialog.Root>
    <Dialog.Trigger asChild>
      <img
        src={src}
        alt={alt}
        class="w-full h-auto cursor-pointer"
      />
    </Dialog.Trigger>
  
    <!-- force-disable any max‑width and stretch to viewport width -->
    <Dialog.Content
      class="!max-w-none !w-screen !h-auto max-h-[80vh] border-0 bg-transparent p-0"
    >
      <img
        src={src}
        alt={alt}
        class="w-screen h-auto object-contain"
      />
    </Dialog.Content>
  </Dialog.Root>
  