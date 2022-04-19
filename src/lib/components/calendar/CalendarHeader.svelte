<script lang="ts">
	import dayjs from 'dayjs';
	import AddProjectForm from '$lib/components/projects/AddProjectForm.svelte';
	import Modal from '$lib/components/ui/Modal.svelte';
	import { showModalStore } from '$lib/stores/modal-store';
	import {
		calendarStore,
		createDaysForCurrentMonthCalendar,
		selectedDayStore
	} from '$lib/stores/calendar-store';

	let showMenu = false;
	// Initialize modal state and content
	// let showModal = false;
	let modalContent;
	// Q: What/how to initialize selectedMonth? It needs to be a dayjs.Dayjs obj
	const now: dayjs.Dayjs = dayjs();
	const TODAY: string = dayjs().format('YYYY-MM-DD');
	const INITIAL_YEAR: string = dayjs().format('YYYY');
	const INITIAL_MONTH: string = dayjs().format('MM');
	let selectedMonth: dayjs.Dayjs = dayjs(new Date(now.year(), now.month(), 1));
	// let selectedMonth: dayjs.Dayjs = dayjs(new Date(INITIAL_YEAR, INITIAL_MONTH - 1, 1));

	// NOTE Following this Svelte Modal example:
	// https://svelte.dev/repl/4624e3f0f3684ddcb2e2da10592f6df1?version=3.38.2
	function toggleModal(component) {
		modalContent = component;
		// Using a local showModal:
		// showModal = !showModal;
		// Using a store showModal:
		$showModalStore = !$showModalStore;
	}

	// Q: Can/should I build the initializeMonthSelectors() function here
	// or inside the calendar-store.ts file?
	function initializeMonthSelectors() {
		// Select the previous/next month buttons
		// On click need to update the selectedMonthStore...???
		// I'm leaning toward keeping it all inside the store file...
	}

	function updateCalendar() {
		// FIXME Need to figure out why I cannot get calendarStore to update
		// when changing selectedMonth
		// UPDATE: Two things I've noticed:
		// - CalendarHeader::calendarStore will log in console, but the actual
		// values are the same initial values
		// - However, no new log is triggered in CalendarGrid::calendarStore at all
		// which means it's not recognizing a change (which, it isn't really changing
		// based on CalendarHeader logging the same initial values).
		// - All this means what?? My Store isn't updating obviously........
		// Update the calendarStore
		// Q: Use update()?
		// A: Both work!
		// calendarStore.update(($calendarStore: Record<string, any>[]) => {
		// 	$calendarStore = createDaysForCurrentMonthCalendar(
		// 		selectedMonth.format('YYYY'),
		// 		selectedMonth.format('MM')
		// 	);
		// 	return $calendarStore;
		// });
		// SOLVED: Turns out INITIAL_MONTH was 'M' instead of "MM" format!
		// Q: Use set()?
		// A: Both work!
		calendarStore.set(
			createDaysForCurrentMonthCalendar(selectedMonth.format('YYYY'), selectedMonth.format('MM'))
		);
	}

	function handleNextMonthSelected() {
		selectedMonth = dayjs(selectedMonth).add(1, 'month');
		// console.log('handleNextMonthSelected::selectedMonth', selectedMonth);
		updateCalendar();
	}

	function handlePreviousMonthSelected() {
		selectedMonth = dayjs(selectedMonth).subtract(1, 'month');
		// Update calendarStore based on new selectedMonth
		updateCalendar();
	}

	function handleCurrentMonthSelected() {
		selectedMonth = dayjs(new Date(now.year(), now.month(), 1));
		// console.log('handleCurrentMonthSelected::selectedMonth', selectedMonth);
		updateCalendar();
	}

	function handleTodaySelected() {
		handleCurrentMonthSelected();
		calendarStore.update(($calendarStore) => {
			if ($selectedDayStore) {
				$calendarStore.find((day) => day.isSelected).isSelected = false;
			}
			$calendarStore.find((day) => day.date === now.format('YYYY-MM-DD')).isSelected = true;
			return $calendarStore;
		});
	}

	// $: {
	// 	console.log('now', now);
	// 	console.log('showModalStore?', $showModalStore);
	// 	console.log('selectedMonth', selectedMonth);
	// 	console.log('CalendarHeader::calendarStore', $calendarStore);
	// }
</script>

<header
	class="relative z-20 flex items-center justify-between border-b border-gray-200 py-4 px-6 lg:flex-none"
>
	<h1 class="text-xl font-bold">
		<time datetime="2022-01">{selectedMonth.format('MMMM')} {selectedMonth.format('YYYY')}</time>
	</h1>
	<div class="flex items-center">
		<div class="flex items-center rounded-md shadow-sm md:items-stretch">
			<button
				type="button"
				class="flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-white py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
				on:click={handlePreviousMonthSelected}
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
				on:click={handleTodaySelected}>Today</button
			>
			<span class="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
			<button
				type="button"
				class="flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-white py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
				on:click={handleNextMonthSelected}
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
