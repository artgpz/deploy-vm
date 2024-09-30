<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { content } from '$lib/data/sections'
	import { contentStore } from '$lib/stores/store'
	import { sluggy } from '$lib/utils/data'
	$: index = $contentStore.findIndex(
		(c) => $page.params.title && sluggy(c.title) === $page.params.title
	)
	let mode: 'list' | 'pages' = 'list'
	$: title = $page.params.title
		? $contentStore.filter((c) => $page.params.title && sluggy(c.title) === $page.params.title)[0]
				.title
		: 'Hello!'
</script>

<main class="main" style:--theme-colour-text="#003232">
	<div class="header">
		<h1>{title}</h1>
		<div class="buttons">
			<select
				name=""
				id=""
				bind:value={mode}
				on:change={(e) => {
					if (e.currentTarget.value === 'list') {
						goto('/')
					}
					if (e.currentTarget.value === 'pages') {
						goto(sluggy(content[0].title))
					}
				}}
			>
				<option value="list">list</option>
				<option value="pages">pages</option>
			</select>
			{#if mode === 'list'}
				<button
					on:click={() => {
						$contentStore = $contentStore.map((s) => ({ ...s, open: true }))
					}}>open all</button
				>
				<button
					on:click={() => {
						$contentStore = $contentStore.map((s) => ({ ...s, open: false }))
					}}>close all</button
				>
			{/if}
			{#if mode === 'pages'}
				{#if index > 0}
					<button
						on:click={() => {
							goto(sluggy(content[index - 1].title))
						}}>previous</button
					>
				{/if}
				{#if index < content.length - 1}
					<button
						on:click={() => {
							goto(sluggy(content[index + 1].title))
						}}>next</button
					>
				{/if}
			{/if}
		</div>
	</div>

	<slot />
</main>

<style>
	main {
		font-family: sans-serif;
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
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
		padding: 0 1rem;
	}
	select {
		font-size: 0.75rem;
		border-radius: 0.5rem;
		padding: 0.5rem 1.5rem;
		background-color: white;
		border: 1px solid #dfdfdf;
		cursor: pointer;
	}
	select:hover {
		border: 1px solid black;
	}
</style>
