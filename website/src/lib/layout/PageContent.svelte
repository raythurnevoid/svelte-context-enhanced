<div class="PageContent">
	<slot />
</div>

<style lang="scss">
	@use "src/styles/breakpoints.scss";

	.PageContent {
		padding: calc(16px * 2);
		width: 100%;
		min-width: 0px;
		box-sizing: border-box;

		@media screen and (min-width: breakpoints.$tablet) {
			padding: calc(16px * 5);
		}
	}
</style>
