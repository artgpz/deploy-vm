<script lang="ts">
	import { content } from '$lib/data/sections'
	import { contentStore } from '$lib/stores/store'
	import Content from '$lib/ui/content.svelte'
	import Section from '$lib/ui/section.svelte'
	let data = content
	$: percent_1 = $contentStore.reduce((acc, el) => {
		if (el.open) {
			acc++
		}
		return acc
	}, 0)
	$: percent_2 = $contentStore.reduce((acc, el) => {
		if (el.open) {
			acc++
		}
		return acc
	}, 0)
</script>

<div
	class="bg"
	style:--theme-colour-background="#ffefcc"
	style:--percent-1={`${(percent_1 * 100) / data.length}%`}
	style:--percent-2={`${100 - (percent_2 * 100) / 2 / data.length}%`}
></div>
<div id="page">
	<div class="sections">
		{#each $contentStore as section, i (section.id)}
			<Section index={i} bind:data={section}>
				{#each section.content as text, j}
					<Content index={j} data={text}></Content>
				{/each}
			</Section>
		{/each}
	</div>
</div>

<style>
	.bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: color-mix(
			in oklab,
			var(--theme-colour-background) var(--percent-1),
			white var(--percent-2)
		);
		z-index: -1;
		transition: all 0.6s ease-in-out;
	}
	#page {
		font-family: sans-serif;
		padding: 0rem 1rem;
	}

	.sections {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		gap: 1rem;
	}
</style>
