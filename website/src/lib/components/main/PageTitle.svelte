<svelte:options immutable={true} />

<script lang="ts">
	export let id: string | undefined = undefined;
</script>

<div class="page-title">
	<h1 class="mdc-typography--headline1" {id}>
		<slot />
	</h1>
</div>

<style lang="scss" global>
	:local(.page-title) {
		scroll-margin-top: 64px;

		> h1 {
			scroll-margin-top: 64px;
			margin-block-start: 0em;
		}
	}
</style>
