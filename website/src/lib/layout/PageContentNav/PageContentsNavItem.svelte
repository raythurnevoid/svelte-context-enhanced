<script lang="ts">
	import { getActiveHashContextStore } from "./index";

	let exportedHash: string | undefined = undefined;
	export { exportedHash as hash };

	const hash = exportedHash ? `#${exportedHash}` : undefined;
	const activeHash$ = getActiveHashContextStore();

	$: isActive = exportedHash === $activeHash$;
</script>

<li class:isActive>
	<a href={hash} on:click>
		<slot />
	</a>
</li>

<style lang="scss">
	li {
		padding-block: 0.7em;
		padding-inline-start: 1em;
		border-inline-start: 2px solid rgba(0, 0, 0, 0.24);

		&.isActive {
			font-weight: bold;
			border-inline-start-color: var(--mdc-theme-text-secondary-on-background);
		}
	}

	a {
		color: inherit;
		text-decoration: none;
	}
</style>
