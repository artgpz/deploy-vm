<script lang="ts">
	import type { Content } from '$lib/data/sections';
	export let data: Content;
	export let index: number | undefined = undefined;
</script>

<div class="content" style:--delay={`${index ? index * 50 - index * index : 0}ms`}>
	{#if data.title}
		<h3>{data.title}</h3>
	{/if}
	{#if data.subtitle}
		<h3>{data.subtitle}</h3>
	{/if}
	<div class="text">
		{#if data.url}
			<p class="no-select">-</p>
			<a href={data.url} target="_blank">
				{data.text}
			</a>
		{:else if data.code}
			<pre>
      <code>
        {data.text}
      </code>
    </pre>
		{:else}
			<p class="no-select">-</p>
			<p>{data.text}</p>
		{/if}
	</div>
</div>

<style>
	h3 {
		font-weight: 500;
		margin-bottom: 0.25rem;
	}
	.content {
		animation: enter 0.3s forwards var(--delay) ease-in-out;
		opacity: 0;
	}
	.text {
		margin: 0 0 0 1rem;
		font-weight: 300;
		display: flex;
		align-items: center;
		padding: 0.25rem;
		border: none;
	}
	@keyframes enter {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	p {
		margin: 0;
	}
	.no-select {
		user-select: none;
		pointer-events: none;
		margin: 0 1rem 0 0;
	}
	pre {
		background-color: var(--theme-colour-text);
		color: white;
		font-size: 0.8rem;
		padding: 0 2rem;
		border-radius: 1rem;
	}
</style>
