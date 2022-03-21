<script lang="ts">
	import { Typography } from "@svelte-material-ui-test/core/typography";

	export let id: string = undefined;
</script>

<div class="page-title">
	<Typography {id} variant="headline1">
		<slot />
	</Typography>
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
