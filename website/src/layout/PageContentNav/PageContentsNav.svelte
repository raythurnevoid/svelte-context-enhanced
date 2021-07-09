<script context="module" lang="ts">
	import { createContext } from "@raythurnevoid/svelte-context-enhanced";
	import { get, writable } from "svelte/store";

	export const [setActiveHashContextStore, getActiveHashContextStore] =
		createContext<ReturnType<typeof createActiveHashStore>>();

	function createActiveHashStore() {
		const store$ = writable<string>(undefined);
		let active: string = null;
		let isLocked: boolean = false;
		let lockTimeout: ReturnType<typeof setTimeout>;

		function set(newValue: string) {
			active = newValue;
			if (!isLocked) {
				store$.set(active);
			}
		}

		return {
			...store$,
			set,
			update(cb: (value: string) => string) {
				set(cb(get(store$)));
			},
			force(newValue: string) {
				isLocked = false;
				clearTimeout(lockTimeout);
				set(newValue);
				isLocked = true;
				lockTimeout = setTimeout(() => {
					isLocked = false;
				}, 500);
			},
		};
	}
</script>

<script lang="ts">
	import { Typography } from "@svelte-material-design/core/typography";
	import { PageContentsNavItem } from "./index";
	import { onMount, tick } from "svelte";

	const activeHash$ = setActiveHashContextStore(createActiveHashStore());

	let items = [
		{
			label: "Usage",
			hash: "usage",
		},
		{
			label: "Result",
			hash: "result",
		},
		{
			label: "API",
			hash: "api",
		},
	] as any[];

	onMount(async () => {
		const intersections = new Set<string>();

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					const changedItemHash = findItemByHash(entry.target.id).hash;
					if (entry.isIntersecting) {
						intersections.add(changedItemHash);
					} else if (entry.boundingClientRect.y > 0) {
						intersections.delete(changedItemHash);
					}

					activeHash$.set([...intersections][intersections.size - 1]);
				});
			},
			{
				root: null,
				rootMargin: "0% 0% -10% 0%",
				threshold: 1,
			}
		);

		items.forEach((item) => {
			observer.observe(window.document.querySelector(`#${item.hash}`));
		});

		setTimeout(async () => {
			if (window.location.hash) {
				activeHash$.set(
					findItemByHash(window.location.hash.replace("#", "")).hash
				);
			}
		});

		() => {
			observer.disconnect();
		};
	});

	function findItemByHash(hash: string) {
		return items.find((item) => item.hash === hash);
	}

	function handleClick(hash: string) {
		activeHash$.force(hash);
	}
</script>

<div class="page-contents-nav" aria-labelledby="page-contents-nav__heading">
	<nav>
		<Typography id="page-contents-nav__heading" variant="overline">
			Contents
		</Typography>
		<ul>
			{#each items as item}
				<PageContentsNavItem
					hash={item.hash}
					on:click={() => handleClick(item.hash)}
					>{item.label}</PageContentsNavItem
				>
			{/each}
		</ul>
	</nav>
</div>

<style lang="scss">
	:global(#page-contents-nav__heading) {
		color: var(--mdc-theme-text-secondary-on-background);
	}

	nav {
		color: var(--mdc-theme-text-primary-on-background);
		position: sticky;
		top: 20%;
		margin-inline: 5em;
	}

	ul {
		list-style: none;
		padding: 0;
		margin-block: 0.5em;
	}
</style>
