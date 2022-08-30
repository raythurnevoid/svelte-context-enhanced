<svelte:options immutable={true} />

<script lang="ts">
	export let id: string | undefined = undefined;
</script>

<div class="PageTitle">
	<h1 class="mdc-typography--headline1" {id}>
		<slot />
	</h1>
</div>

<style lang="scss">
	.PageTitle {
		scroll-margin-top: 64px;

		.mdc-typography--headline1 {
			scroll-margin-top: 64px;
			margin-block-start: 0em;
		}
	}
</style>
