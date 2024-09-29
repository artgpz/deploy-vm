<script lang="ts">
	import type { Section } from '$lib/data/sections'
	import { slide } from 'svelte/transition'
	export let data: Section
	export let index: number | undefined = undefined
</script>

<div class="section" id={`section-${index}`}>
	<button
		on:click={() => {
			data.open = !data.open
		}}
		data-open={data.open}
	>
		<h2>{data.title}</h2>
		{#if data.subtitle}
			<h3>{data.subtitle}</h3>
		{/if}
	</button>

	{#if data.open}
		<div class="content" transition:slide>
			<slot />
		</div>
	{/if}
</div>

<style>
	.section {
		color: var(--theme-colour-text);
	}
	button {
		border: 1px solid var(--theme-colour-text);
		border-radius: 1rem;
		background-color: white;
		cursor: pointer;
		padding: 0 1rem;
		text-align: left;
		transition: all 0.3s ease-in-out;
		color: var(--theme-colour-text);
	}
	button:hover {
		background-color: var(--theme-colour-text);
		color: white;
	}
	button[data-open='true'] {
		background-color: var(--theme-colour-text);
		color: white;
	}
	h2 {
		font-weight: 600;
	}
	.content {
		margin: 0 0 0 2rem;
		padding-top: 1rem;
	}
</style>
