<svelte:options immutable={true} />

<main>
	<slot />
</main>

<style>
	main {
		display: flex;
		justify-content: center;
	}
</style>
