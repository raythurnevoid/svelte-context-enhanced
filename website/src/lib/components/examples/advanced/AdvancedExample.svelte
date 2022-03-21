<script lang="ts">
	import AdvancedExampleChild from "./AdvancedExampleChild.svelte";
	import { setContext } from "@raythurnevoid/svelte-context-enhanced";
	import { contextKey } from "./AdvancedExampleContext";

	setContext(contextKey, "value");
	// setContext(contextKey, 123); // This will fail type checking
</script>

<AdvancedExampleChild />
