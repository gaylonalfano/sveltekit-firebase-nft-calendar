<script>
	import { menuItemsStore } from '$lib/stores';
	let active = false;

	// Use the current activeItem to be display on label
	$: activeItem = $menuItemsStore.find(($menuItemsStore) => $menuItemsStore.active === true);
</script>

<div class="dropdown">
	<label tabindex="0" class="btn m-1">{activeItem.name}</label>
	<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
		{#each $menuItemsStore as item (item.id)}
			{#if item.active}
				<li><a class="active">{item.name}</a></li>
			{:else}
				<li><a>{item.name}</a></li>
			{/if}
		{/each}
	</ul>
</div>
