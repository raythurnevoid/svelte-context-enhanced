<svelte:options immutable={true} />

<script lang="ts">
	import Button, { Label, Icon } from "@smui/button";

	export let prev: Link | undefined = undefined;
	export let next: Link | undefined = undefined;

	interface Link {
		href: string;
		label: string;
	}
</script>

<footer>
	<div class="content">
		<div>
			{#if prev}
				<Button variant="outlined" href={prev.href}>
					<Icon class="material-icons">arrow_back</Icon>
					<Label>{prev.label}</Label>
				</Button>
			{/if}
		</div>
		<div>
			{#if next}
				<Button variant="raised" href={next.href}>
					<Label>{next.label}</Label>
					<Icon class="material-icons">arrow_forward</Icon>
				</Button>
			{/if}
		</div>
	</div>
</footer>

<style>
	footer {
		padding-inline: 1em;
	}

	.content {
		border-top: solid 1px rgb(0 0 0 / 12%);
		padding-block: 1em;
		display: flex;
		justify-content: space-between;
	}
</style>
