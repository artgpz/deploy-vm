<script lang="ts">
	import { content } from '$lib/data/sections';
	import Content from '$lib/ui/content.svelte';
	import Section from '$lib/ui/section.svelte';
	let data = content;
	$: percent_1 = data.reduce((acc, el) => {
		if (el.open) {
			acc++;
		}
		return acc;
	}, 0);
	$: percent_2 = data.reduce((acc, el) => {
		if (el.open) {
			acc++;
		}
		return acc;
	}, 0);
</script>

<div
	class="bg"
	style:--theme-colour-background="#ffefcc"
	style:--percent-1={`${(percent_1 * 100) / data.length}%`}
	style:--percent-2={`${100 - (percent_2 * 100) / 2 / data.length}%`}
></div>
<div id="page">
	<div class="header">
		<h1>Hello!</h1>
		<div class="buttons">
			<button
				on:click={() => {
					data = data.map((s) => ({ ...s, open: true }));
				}}>open all</button
			>
			<button
				on:click={() => {
					data = data.map((s) => ({ ...s, open: false }));
				}}>close all</button
			>
		</div>
	</div>
	<!-- <p>It is: {time}</p> -->
	<div class="sections">
		{#each data as section, i (section.id)}
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
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}
	.sections {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		gap: 1rem;
	}
	.buttons {
		margin: 0 0 0.5rem 0;
	}
	button {
		font-size: 0.75rem;
		border-radius: 0.5rem;
		padding: 0.5rem 1.5rem;
		background-color: white;
		border: 1px solid #dfdfdf;
		cursor: pointer;
	}
	button:hover {
		border: 1px solid black;
	}
</style>
