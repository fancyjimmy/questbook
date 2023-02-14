<script lang="ts">
	import '../app.css';
	import { Theme } from '../lib/Theme';
	import { onMount } from 'svelte';

	let theme = new Theme('Forresty', 'black-pearl', 'malibu', 'shuttle-gray');
	onMount(() => {
		theme.apply();
	});

	type Link = {
		url: string;
		name: string;
	};

	const links: Link[] = [
		{
			url: '/',
			name: 'Home'
		},
		{
			url: '/account',
			name: 'Login'
		},
		{
			url: '/quests',
			name: 'Quest'
		},
		{
			url: '/questboard',
			name: 'Questboard'
		},
		{
			url: '/log',
			name: 'Log'
		}
	];
</script>

<div class="overflow-x-hidden relative h-screen h-screen flex flex-col">
	<nav class="w-full bg-secondary-300 border-b-4 border-b-black h-16 fixed top-0 z-[10]">
		<ul class="flex h-full items-center">
			{#each links as link, i}
				<li>
					<a href={link.url} class="p-3 font-thickest title-animation truncate" class:reverse={i % 2 === 0}>
						<span style="--i: 1;" class="duration-100 font-thick text-4xl">&gt;</span>
						{#each link.name.split('') as character, index}<span
								class="duration-100"
								style="--i:{index}; --t:{link.name.split('').length - index};">{character}</span>{/each}
					</a>
				</li>
			{/each}
		</ul>
	</nav>

	<main class="w-full mt-16 overflow-x-hidden flex-1">
		<div class="w-full h-full">
			<slot class="duration-200" />
		</div>
	</main>
</div>

<style>
	.title-animation > * {
		display: inline-block;
		--title-animation-delay: calc(var(--i) * 0.04s);
		--title-reverse-animation-delay: calc(var(--t) * 0.04s);
		transition-delay: var(--title-animation-delay);
		transform: translateY(0px);
	}

	.title-animation:hover > * {
		transform: translateY(-5px);
		transition-delay: var(--title-animation-delay);
		color: white;
	}
	/*
    .title-animation.reverse:hover > * {
        transform: translateY(calc(-1px * (var(--t) - var(--i))));
    }
     */
</style>
