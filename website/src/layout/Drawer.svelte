<svelte:options immutable={true} />

<script lang="ts">
	import {
		Drawer,
		Content,
		NavList,
		NavItem,
		NavItemContent,
		PrimaryText,
	} from "@svelte-material-design/core/drawer";
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
			activated: base + $page.path === link.href,
		};
	});
</script>

<Drawer
	class="svmd-site-drawer"
	variant={dismissible ? "modal" : "permanent"}
	bind:open
>
	<Content>
		<NavList>
			{#each links as link}
				<NavItem href={link.href} activated={link.activated}>
					<NavItemContent>
						<PrimaryText>{link.label}</PrimaryText>
					</NavItemContent>
				</NavItem>
			{/each}
		</NavList>
	</Content>
</Drawer>

<style lang="scss" global>
	.svmd-site-drawer.svmd-site-drawer {
		position: fixed;
	}
</style>
