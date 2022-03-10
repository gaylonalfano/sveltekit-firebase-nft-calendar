<script>
	import { menuItemsStore } from '$lib/stores';
	let active = false;

	// NOTE Best practice is to separate PRESENTATIONAL components
	// vs. STATEFUL components (Menu). Ideally you don't access Stores from
	// simple presentational components (MenuItem).

	// NOTE Ideally you move most of the standard functions/functionality
	// into the Store.js file, so that your components are leaner and are
	// generally only responsible for dispatching Store actions. We want
	// the Store to take care of the logic!

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
