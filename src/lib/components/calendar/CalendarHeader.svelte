<script>
	import AddProjectForm from '$lib/components/projects/AddProjectForm.svelte';
	import Modal from '$lib/components/ui/Modal.svelte';
	import { showModalStore } from '$lib/stores/modal-store';
	import { selectedMonthStore } from '$lib/stores/calendar-store';

	let showMenu = false;
	// Initialize modal state and content
	// let showModal = false;
	let modalContent;

	// NOTE Following this Svelte Modal example:
	// https://svelte.dev/repl/4624e3f0f3684ddcb2e2da10592f6df1?version=3.38.2
	function toggleModal(component) {
		modalContent = component;
		// Using a local showModal:
		// showModal = !showModal;
		// Using a store showModal:
		$showModalStore = !$showModalStore;
	}

	function updateSelectedMonth() {
		// Update the view
		// selectedMonthStore.update(($selectedMonthStore) => ($selectedMonthStore = selectedMonth)); */
	}

	$: console.log('showModalStore?', $showModalStore);
	$: console.log('selectedMonthStore', $selectedMonthStore.date);
</script>

<header
	class="relative z-20 flex items-center justify-between border-b border-gray-200 py-4 px-6 lg:flex-none"
>
	<h1 class="text-lg font-semibold text-gray-900">
		<time datetime="2022-01"
			>{$selectedMonthStore.format('MMMM')} {$selectedMonthStore.format('D')}</time
		>
	</h1>
	<div class="flex items-center">
		<div class="flex items-center rounded-md shadow-sm md:items-stretch">
			<button
				type="button"
				class="flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-white py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
			>
				<span class="sr-only">Previous month</span>
				<!-- Heroicon name: solid/chevron-left -->
				<svg
					class="h-5 w-5"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						fill-rule="evenodd"
						d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>
			<button
				type="button"
				class="hidden border-t border-b border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative md:block"
				>Today</button
			>
			<span class="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
			<button
				type="button"
				class="flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-white py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
			>
				<span class="sr-only">Next month</span>
				<!-- Heroicon name: solid/chevron-right -->
				<svg
					class="h-5 w-5"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						fill-rule="evenodd"
						d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>
		</div>
		<div class="hidden md:ml-4 md:flex md:items-center">
			<!-- NOTE Could add DropdownMenu later if I want to toggle views -->
			<div class="ml-6 h-6 w-px bg-gray-300" />
			<!-- The button to open modal -->
			<!--<label for="add-event-modal" class="btn modal-button">Add Event</label>-->
			<!-- Put this part before </body> tag -->
			<!--		<input type="checkbox" id="add-event-modal" class="modal-toggle" /> -->
			<!-- NOTE Had to tweak the default DaisyUI to use the dynamic Modal -->
			<!-- NOTE This means I swapped for a button and created a showModalStore -->
			<button on:click={() => toggleModal(AddProjectForm)} class="btn">Add Project</button>
			{#if $showModalStore}
				<Modal on:click={toggleModal} {modalContent} />
			{/if}
		</div>
	</div>
</header>
