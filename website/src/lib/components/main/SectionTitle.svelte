<script lang="ts">
	import { Typography } from "@svelte-material-ui-test/core/typography";

	export let id: string = undefined;
</script>

<div class="section-title">
	<Typography {id} variant="headline2">
		<slot />
	</Typography>
</div>

<style lang="scss" global>
	:local(.section-title) {
		> h2 {
			scroll-margin-block: calc(64px + 2em);
		}
	}
</style>
