<script lang="ts">
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import * as Collapsible from "$lib/components/ui/collapsible/index.js";
    import { Checkbox } from "$lib/components/ui/checkbox/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import FilterIcon from "@tabler/icons-svelte/icons/filter";
    import CalendarIcon from "@tabler/icons-svelte/icons/calendar";
    import ChevronDownIcon from "@tabler/icons-svelte/icons/chevron-down";

    import data from "../../routes/blog/data";

    const filters = [
        {
            label: "Date",
            icon: CalendarIcon,
        },
    ];

    // Get unique, sorted dates from blog data
    const dates = Array.from(new Set(data.map((post: any) => post.date.split('-')[0]))).sort().reverse();
</script>

<Sidebar.Group class="group-data-[collapsible=icon]:hidden">
    <Sidebar.GroupLabel class="flex items-center gap-2">
        <FilterIcon />
        <span>Filter</span>
    </Sidebar.GroupLabel>
    {#each filters as filter}
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
                        {#each dates as date, i}
                            <div class='flex items-center gap-2 py-2 ml-4'>
                                <Checkbox id={`date-${date}`} checked={true} />
                                <Label
                                    for={`date-${date}`}
                                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    {date}
                                </Label>
                            </div>
                        {/each}
                    </Sidebar.GroupContent>
                </Collapsible.Content>
            </Sidebar.Group>
        </Collapsible.Root>
    {/each}
</Sidebar.Group>
