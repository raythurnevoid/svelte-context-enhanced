<script lang="ts">
	import BasicExampleChild from "./BasicExampleChild.svelte";
	import { setContext } from "./BasicExampleContext";

	setContext("value");
</script>

<BasicExampleChild />
