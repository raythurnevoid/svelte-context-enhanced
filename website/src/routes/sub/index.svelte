<script lang="ts">
	import { Button } from "@svelte-material-design/core/button";
	import { page } from "$app/stores";
</script>

<Button>Test</Button>

{$page.path}

<style lang="scss">
	div {
		background: red;
	}
</style>
