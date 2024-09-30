import { content, type Section } from '$lib/data/sections'
import { writable } from 'svelte/store'

export const contentStore = writable<Section[]>(content)
