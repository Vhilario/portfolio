import { writable } from 'svelte/store'

export const selectedDates = writable<string[]>([])
export const selectedTags = writable<string[]>([])