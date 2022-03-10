<script>
	import MenuItems from './MenuItems.svelte';
</script>

<div class="dropdown">
	<label tabindex="0" class="btn m-1">Click</label>
	<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
		<li><a>Item 1</a></li>
		<li><a>Item 2</a></li>
	</ul>
</div>

<div class="relative menu">
	<!-- Menu Component -->
	<button
		type="button"
		class="flex items-center rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
		id="menu-button"
		aria-expanded="false"
		aria-haspopup="true"
	>
		<!-- MenuButton Component -->
		Month view
		<!-- Heroicon name: solid/chevron-down -->
		<svg
			class="ml-2 h-5 w-5 text-gray-400"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 20 20"
			fill="currentColor"
			aria-hidden="true"
		>
			<path
				fill-rule="evenodd"
				d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
				clip-rule="evenodd"
			/>
		</svg>
	</button>
	<!-- MenuItems Component -->
	<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
		{#each $menuItemsStore as item (item.id)}
			<li><a>{item.name}</a></li>
		{/each}
	</ul>
</div>
