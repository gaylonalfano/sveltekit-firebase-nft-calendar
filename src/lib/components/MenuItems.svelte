<script>
	import { menuItemsStore } from '$lib/stores';
	import MenuItem from '$lib/components/MenuItem.svelte';
	// let menuItems = [];
	// Q: Probably should consider using a Store for menuItems
	// but should I import here or in parent Menu component?
</script>

<!--
            Dropdown menu, show/hide based on menu state.

            Entering: "transition ease-out duration-100"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"
              To: "transform opacity-0 scale-95"
          -->
<div
	class="hidden focus:outline-none absolute right-0 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
	role="menu"
	aria-orientation="vertical"
	aria-labelledby="menu-button"
	tabindex="-1"
>
	<div class="py-1" role="none">
		{#each $menuItemsStore as item (item.id)}
			<MenuItem menuItem={item} />
		{/each}
	</div>
</div>
