<script>
	import { menuItemsStore } from '$lib/stores/menu-store';
	import MenuItem from '$lib/components/MenuItem.svelte';
	// let menuItems = [];
	// Q: Probably should consider using a Store for menuItems
	// but should I import here or in parent Menu component?
</script>

<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
	{#each $menuItemsStore as item (item.id)}
		<li><a>{item.name}</a></li>
	{/each}
</ul>
