<script lang="ts">
	import { Typography } from "@svelte-material-design/core/typography/index.js";
</script>

<div class="page-title">
	<Typography variant="headline1">
		<slot />
	</Typography>
</div>

<style lang="scss" global>
	:local(.page-title) {
		> * {
			margin-block-start: 0em;
		}
	}
</style>
