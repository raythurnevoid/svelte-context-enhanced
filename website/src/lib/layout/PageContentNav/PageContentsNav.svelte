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
	import { Typography } from "@svelte-material-ui-test/core/typography";
	import { PageContentsNavItem } from "./index";
	import { onMount, tick } from "svelte";

	const activeHash$ = setActiveHashContextStore(createActiveHashStore());
	let exportedItems: (string | [string, string])[];
	export { exportedItems as items };

	let items: Map<string, string>;

	onMount(async () => {
		const intersections = new Set<string>();

		items = new Map(
			exportedItems.map((item) => {
				const id = getId(item);
				let label = getLabel(item);
				if (!label) {
					label = document.getElementById(id).textContent;
				}
				return [id, label];
			})
		);

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					const changedItemHash = findId(entry.target.id);
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

		[...items.keys()].forEach((id) => {
			observer.observe(window.document.querySelector(`#${id}`));
		});

		setTimeout(async () => {
			if (window.location.hash) {
				activeHash$.set(findId(window.location.hash.replace("#", "")));
			}
		});

		() => {
			observer.disconnect();
		};
	});

	function findId(id: string) {
		const item = [...items.keys()].find((item) => item === id);
		return getId(item);
	}

	function getId(item: string | [string, string]) {
		if (Array.isArray(item)) {
			return item[0];
		} else {
			return item;
		}
	}

	function getLabel(item: string | [string, string]) {
		if (Array.isArray(item)) {
			return item[1];
		} else {
			return null;
		}
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
			{#if items}
				{#each [...items] as [id, label]}
					<PageContentsNavItem hash={id} on:click={() => handleClick(id)}>
						{label}
					</PageContentsNavItem>
				{/each}
			{/if}
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
