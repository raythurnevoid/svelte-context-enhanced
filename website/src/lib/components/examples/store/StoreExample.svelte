<script lang="ts">
	import StoreExampleChild from "./StoreExampleChild.svelte";
	import { setCounterContext, setTimeContext } from "./StoreExampleContext";

	const getCurrentTime = () =>
		typeof window !== "undefined" &&
		new Date().toLocaleTimeString(navigator.language, {
			timeStyle: "medium",
		});

	const time$ = setTimeContext(getCurrentTime(), (set) => {
		const interval = setInterval(() => set(getCurrentTime()), 1000);
		return () => clearInterval(interval);
	});

	const counter$ = setCounterContext(0);
</script>

{$time$}
<br />
{$counter$}

<br />
<br />
Child:
<br />
<StoreExampleChild />
