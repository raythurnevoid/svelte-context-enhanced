<script lang="ts">
	import {
		Button,
		Label,
		TrailingIcon,
		LeadingIcon,
	} from "@svelte-material-design/core/button";

	export let prev: Link = undefined;
	export let next: Link = undefined;

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
					<LeadingIcon>arrow_back</LeadingIcon>
					<Label>{prev.label}</Label>
				</Button>
			{/if}
		</div>
		<div>
			{#if next}
				<Button variant="raised" href={next.href}>
					<Label>{next.label}</Label>
					<TrailingIcon>arrow_forward</TrailingIcon>
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
