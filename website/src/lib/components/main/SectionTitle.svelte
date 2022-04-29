<svelte:options immutable={true} />

<script lang="ts">
	export let id: string | undefined = undefined;
</script>

<div class="section-title">
	<h2 class="mdc-typography--headline2" {id}>
		<slot />
	</h2>
</div>

<style lang="scss">
	.section-title {
		> h2 {
			scroll-margin-block: calc(64px + 2em);
		}
	}
</style>
