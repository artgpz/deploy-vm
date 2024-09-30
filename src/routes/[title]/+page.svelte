<script lang="ts">
	import { page } from '$app/stores'
	import { content } from '$lib/data/sections'
	import Content from '$lib/ui/content.svelte'
	import Section from '$lib/ui/section.svelte'
	import { sluggy } from '$lib/utils/data'
	$: index = content.findIndex((c) => sluggy(c.title) === $page.params.title)
	$: data = content[index]
</script>

<div id="page">
	<div class="sections">
		<Section hide_title bind:data>
			{#each data.content as text, j}
				<Content index={j} data={text}></Content>
			{/each}
		</Section>
	</div>
</div>

<style>
	#page {
		font-family: sans-serif;
		padding: 0rem 1rem;
	}
</style>
