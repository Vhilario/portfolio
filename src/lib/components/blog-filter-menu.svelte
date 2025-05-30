<script lang="ts">
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import * as Collapsible from "$lib/components/ui/collapsible/index.js";
    import * as Select from "$lib/components/ui/select/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { selectedDates, selectedTags } from '$lib/stores/blogFilters'

    import FilterIcon from "@tabler/icons-svelte/icons/filter";
    import CalendarIcon from "@tabler/icons-svelte/icons/calendar";
    import ChevronDownIcon from "@tabler/icons-svelte/icons/chevron-down";
    import TagIcon from "@tabler/icons-svelte/icons/tag";

    import data from "../../routes/blog/data";

    
    
    // Get unique, sorted years from blog data
    const dates: string[] = Array.from(new Set(data.map((post: any) => post.date.split('-')[0]))).sort().reverse()

    // Use the $ prefix for reactivity
    $: selectedDatesLabel = $selectedDates.length
        ? $selectedDates.sort().reverse().join(", ")
        : "Select years"

    // Log changes (optional)
    $: console.log("Selected dates:", $selectedDates)

    const tags = Array.from(new Set(data.flatMap((post: any) => post.tags)))

    $: selectedTagsLabel = $selectedTags.length
        ? $selectedTags.sort().join(", ")
        : "Select tags"

    
</script>

<Sidebar.Group class="group-data-[collapsible=icon]:hidden">
    <Sidebar.GroupLabel class="flex items-center gap-2">
        <FilterIcon />
        <span>Filter</span>
    </Sidebar.GroupLabel>

    {@render DateFilterGroup({label: "Date", icon: CalendarIcon})}
    {@render TagFilterGroup({label: "Tags", icon: TagIcon})}
    
</Sidebar.Group>


{#snippet DateFilterGroup(filter: any)}
        <Collapsible.Root open class="group/collapsible">
        <Sidebar.Group>
            <Sidebar.GroupLabel>
                {#snippet child({ props })}
                    <Collapsible.Trigger {...props}>
                        {filter.label}
                        <ChevronDownIcon
                            class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"
                        />
                    </Collapsible.Trigger>
                {/snippet}
            </Sidebar.GroupLabel>
            <Collapsible.Content>
                <Sidebar.GroupContent>
                    <div class='ml-4'>
                        
                    <Select.Root type="multiple" bind:value={$selectedDates}>
                        <Select.Trigger
                            aria-label="Select years"
                        >
                            <CalendarIcon class="text-muted-foreground mr-[9px] size-6" />
                            <span class="w-[120px] truncate text-start">
                                {selectedDatesLabel}
                            </span>
                        </Select.Trigger>
                        
                            <Select.Content
                                sideOffset={10}
                            >
                                {#each dates as date}
                                        <Select.Item
                                            value={date}
                                            label={date}
                                        >
                                            
                                        </Select.Item>
                                    {/each}
                            </Select.Content>
                        
                    </Select.Root>
                    </div>
                </Sidebar.GroupContent>
            </Collapsible.Content>
        </Sidebar.Group>
    </Collapsible.Root>
{/snippet}

{#snippet TagFilterGroup(filter: any)}
        <Collapsible.Root open class="group/collapsible">
        <Sidebar.Group>
            <Sidebar.GroupLabel>
                {#snippet child({ props })}
                    <Collapsible.Trigger {...props}>
                        {filter.label}
                        <ChevronDownIcon
                            class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"
                        />
                    </Collapsible.Trigger>
                {/snippet}
            </Sidebar.GroupLabel>
            <Collapsible.Content>
                <Sidebar.GroupContent>
                    <div class='ml-4'>
                        
                    <Select.Root type="multiple" bind:value={$selectedTags}>
                        <Select.Trigger
                            aria-label="Select tags"
                        >
                            <TagIcon class="text-muted-foreground mr-[9px] size-6" />
                            <span class="w-[120px] truncate text-start">
                                {selectedTagsLabel}
                            </span>
                        </Select.Trigger>
                        
                            <Select.Content
                                sideOffset={10}
                            >
                                {#each tags as tag}
                                        <Select.Item
                                            value={tag}
                                            label={tag}
                                        >
                                            
                                        </Select.Item>
                                    {/each}
                            </Select.Content>
                        
                    </Select.Root>
                    </div>
                </Sidebar.GroupContent>
            </Collapsible.Content>
        </Sidebar.Group>
    </Collapsible.Root>
{/snippet}