<script>
	export let menuItem;
	let active = false;
</script>

<!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
<div class="container menu-item">
	<a
		href="#"
		class="block px-4 py-2 text-sm"
		class:bg-gray-100={active}
		class:text-gray-900={active}
		class:text-gray-700={!active}
		role="menuitem"
		tabindex="-1"
		id={`menu-item-${menuItem.id}`}>{menuItem.name}</a
	>
</div>
