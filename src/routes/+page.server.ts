import { content } from '$lib/data/sections'
import { sluggy } from '$lib/utils/data'
import type { EntryGenerator } from './[title]/$types'

export const entries: EntryGenerator = () => content.map((s) => ({ title: sluggy(s.title) }))
