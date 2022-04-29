<svelte:options immutable={true} />

<script lang="ts">
	import Drawer, { Content } from "@smui/drawer";
	import List, { Item, Text } from "@smui/list";
	import { page } from "$app/stores";
	import { base } from "$app/paths";

	export let open: boolean = false;
	export let dismissible: boolean = false;

	$: links = [
		{ href: `${base}/`, label: "Main Page" },
		{ href: `${base}/basic`, label: "Basic Usage" },
		{ href: `${base}/store`, label: "Context Store" },
		{ href: `${base}/advanced`, label: "Advanced Usage" },
	].map((link) => {
		return {
			...link,
			activated: base + $page.url.pathname === link.href,
		};
	});
</script>

<Drawer
	class="mdc-drawer--open"
	variant={dismissible ? "modal" : undefined}
	bind:open
>
	<Content>
		<List>
			{#each links as link}
				<Item href={link.href} activated={link.activated}>
					<Text>
						{link.label}
					</Text>
				</Item>
			{/each}
		</List>
	</Content>
</Drawer>

<style lang="scss">
	:global {
		.mdc-drawer {
			position: fixed;
		}
	}
</style>
