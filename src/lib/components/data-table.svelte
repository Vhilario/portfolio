<script lang="ts" module>
	export const columns: ColumnDef<Schema>[] = [
		{
			accessorKey: "title",
			header: "Title",
			cell: ({ row }) => renderComponent(DataTableCellViewer, { item: row.original }),
			enableHiding: false,
			size: 350,
		},
		{
			accessorKey: "category",
			header: "Category",
			cell: ({ row }) => row.original.category,
		},
		{
			accessorKey: "date",
			header: "Date",
			cell: ({ row }) => row.original.date,
			filterFn: (row, columnId, filterValue) => {
				if (!filterValue || filterValue.length === 0) return true
				const rowDate = row.getValue(columnId) as string
				const rowYear = rowDate.slice(0, 4)
				return filterValue.includes(rowYear)
			}
		},
		{
			accessorKey: "tags",
			header: "Tags",
			cell: ({ row }) => renderSnippet(DataTableTags, { row }),
			filterFn: (row, columnId, filterValue) => {
				if (!filterValue || filterValue.length === 0) return true
				const rowTags = (row.getValue(columnId) as string[]).map(tag => tag.toLowerCase())
				const filterTags = filterValue.map((tag: string) => tag.toLowerCase())
				return filterTags.some(tag => rowTags.includes(tag))
			}
		}
	];
</script>

<script lang="ts">
	import {
		getCoreRowModel,
		getFacetedRowModel,
		getFacetedUniqueValues,
		getFilteredRowModel,
		getPaginationRowModel,
		getSortedRowModel,
		type ColumnDef,
		type ColumnFiltersState,
		type PaginationState,
		type SortingState,
		type VisibilityState,
	} from "@tanstack/table-core";
	import type { Schema } from "./schemas.js";
	import { createSvelteTable } from "$lib/components/ui/data-table/data-table.svelte.js";
	import * as Table from "$lib/components/ui/table/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Select from "$lib/components/ui/select/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import { Badge } from "$lib/components/ui/badge/index.js";
	import {
		FlexRender,
		renderComponent,
		renderSnippet,
	} from "$lib/components/ui/data-table/index.js";

	import ChevronsLeftIcon from "@tabler/icons-svelte/icons/chevrons-left";
	import ChevronLeftIcon from "@tabler/icons-svelte/icons/chevron-left";
	import ChevronRightIcon from "@tabler/icons-svelte/icons/chevron-right";
	import ChevronsRightIcon from "@tabler/icons-svelte/icons/chevrons-right";
	import { toast } from "svelte-sonner";
	import DataTableCellViewer from "./data-table-cell-viewer.svelte";
	import { selectedDates, selectedTags } from '$lib/stores/blogFilters'
	import { onMount } from "svelte";

	let { data }: { data: Schema[] } = $props();
	let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 10 });
	let sorting = $state<SortingState>([]);
	let columnFilters = $state<ColumnFiltersState>([]);
	let columnVisibility = $state<VisibilityState>({});
	
	function arraysEqual(a: unknown[] | null, b: unknown[] | null) {
		if (a === b) return true
		if (!a || !b) return false
		if (a.length !== b.length) return false
		for (let i = 0; i < a.length; i++) {
			if (a[i] !== b[i]) return false
		}
		return true
	}

	onMount(() => {
		console.log(data)
	})
	$effect(() => {
		const tagsCol = table.getColumn('tags')
		const dateCol = table.getColumn('date')

		if (tagsCol && !arraysEqual(tagsCol.getFilterValue(), $selectedTags)) {
			tagsCol.setFilterValue($selectedTags)
		}
		if (dateCol && !arraysEqual(dateCol.getFilterValue(), $selectedDates)) {
			dateCol.setFilterValue($selectedDates)
		}
	})

		
	const table = createSvelteTable({
		get data() {
			return data;
		},
		columns,
		state: {
			get pagination() {
				return pagination;
			},
			get sorting() {
				return sorting;
			},
			get columnVisibility() {
				return columnVisibility;
			},
			get columnFilters() {
				return columnFilters;
			},
		},
		getRowId: (_row, index) => index.toString(),
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		getFilteredRowModel: getFilteredRowModel(),
		onPaginationChange: (updater) => {
			if (typeof updater === "function") {
				pagination = updater(pagination);
			} else {
				pagination = updater;
			}
		},
		onSortingChange: (updater) => {
			if (typeof updater === "function") {
				sorting = updater(sorting);
			} else {
				sorting = updater;
			}
		},
		onColumnFiltersChange: (updater) => {
			if (typeof updater === "function") {
				columnFilters = updater(columnFilters);
			} else {
				columnFilters = updater;
			}
		},
		onColumnVisibilityChange: (updater) => {
			if (typeof updater === "function") {
				columnVisibility = updater(columnVisibility);
			} else {
				columnVisibility = updater;
			}
		},
	});
</script>

<div class="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
	<div class="overflow-hidden rounded-lg border">
		<Table.Root>
			<Table.Header class="bg-muted sticky top-0 z-10">
				{#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
					<Table.Row>
						{#each headerGroup.headers as header (header.id)}
							<Table.Head
								colspan={header.colSpan}
								style={header.column.columnDef.size ? `width: ${header.column.columnDef.size}px; max-width: 400px;` : undefined}
							>
								{#if !header.isPlaceholder}
									<FlexRender
										content={header.column.columnDef.header}
										context={header.getContext()}
									/>
								{/if}
							</Table.Head>
						{/each}
					</Table.Row>
				{/each}
			</Table.Header>
			<Table.Body class="**:data-[slot=table-cell]:first:w-8">
				{#if table.getRowModel().rows?.length}
					{#each table.getRowModel().rows as row, i (i)}
						<Table.Row class="relative">
							{#each row.getVisibleCells() as cell (cell.id)}
								<Table.Cell
									style={cell.column.columnDef.size ? `width: ${cell.column.columnDef.size}px; max-width: 400px;` : undefined}
								>
									<FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
								</Table.Cell>
							{/each}
						</Table.Row>
					{/each}
				{:else}
					<Table.Row>
						<Table.Cell colspan={columns.length} class="h-24 text-center">
							No results.
						</Table.Cell>
					</Table.Row>
				{/if}
			</Table.Body>
		</Table.Root>
	</div>
	<div class="flex items-center justify-between px-4">
		<div class="flex w-full items-center gap-8 lg:w-fit">
			<div class="hidden items-center gap-2 lg:flex">
				<Label for="rows-per-page" class="text-sm font-medium">Rows per page</Label>
				<Select.Root
					type="single"
					bind:value={
						() => `${table.getState().pagination.pageSize}`,
						(v) => table.setPageSize(Number(v))
					}
				>
					<Select.Trigger size="sm" class="w-20" id="rows-per-page">
						{table.getState().pagination.pageSize}
					</Select.Trigger>
					<Select.Content side="top">
						{#each [10, 20, 30, 40, 50] as pageSize (pageSize)}
							<Select.Item value={pageSize.toString()}>
								{pageSize}
							</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</div>
			<div class="flex w-fit items-center justify-center text-sm font-medium">
				Page {table.getPageCount() ? table.getState().pagination.pageIndex + 1 : 0} of {table.getPageCount()}
			</div>
			<div class="ml-auto flex items-center gap-2 lg:ml-0">
				<Button
					variant="outline"
					class="hidden h-8 w-8 p-0 lg:flex"
					onclick={() => table.setPageIndex(0)}
					disabled={!table.getCanPreviousPage()}
				>
					<span class="sr-only">Go to first page</span>
					<ChevronsLeftIcon />
				</Button>
				<Button
					variant="outline"
					class="size-8"
					size="icon"
					onclick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					<span class="sr-only">Go to previous page</span>
					<ChevronLeftIcon />
				</Button>
				<Button
					variant="outline"
					class="size-8"
					size="icon"
					onclick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					<span class="sr-only">Go to next page</span>
					<ChevronRightIcon />
				</Button>
				<Button
					variant="outline"
					class="hidden size-8 lg:flex"
					size="icon"
					onclick={() => table.setPageIndex(table.getPageCount() - 1)}
					disabled={!table.getCanNextPage()}
				>
					<span class="sr-only">Go to last page</span>
					<ChevronsRightIcon />
				</Button>
			</div>
		</div>
	</div>
</div>


{#snippet DataTableTags({ row }: { row: Row<Schema> })}
	<div class="flex flex-wrap gap-1">
		{#each row.original.tags as tag}
			<Badge variant="secondary" class="px-2 py-0.5 text-xs">#{tag}</Badge>
		{/each}
	</div>
{/snippet}
