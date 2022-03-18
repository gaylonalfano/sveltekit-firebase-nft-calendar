<script lang="ts">
	// NOTE Great calendar example:
	// https://codesandbox.io/s/monthly-calendar-ur29q?file=/src/index.js */
	import { calendarStore, selectedStore } from '$lib/stores';
	import CalendarHeader from '$lib/components/calendar/CalendarHeader.svelte';
	import CalendarWeekdayHeader from '$lib/components/calendar/CalendarWeekdayHeader.svelte';
	import CalendarGrid from '$lib/components/calendar/CalendarGrid.svelte';

	// Q: Do I need this to be reactive or just a variable?
	// A: MUST be reactive! Simple variable won't react/update!
	// UPDATE: Converted selectedDay into a derived Store since it's
	// used across multiple components.
	// $: selectedDay = $days.find((day) => day.isSelected); // Works
	// let selectedDay = $days.find((day) => day.isSelected); // Doesn't update!
	$: today = new Date();

	/* function updateSelectedDay() { */
	/* 	// console.log('Clicked!', e); // e.target is either <button> or <time> */
	/* 	// console.log(this); // <button> */
	/* 	// console.log(this.children); // HTMLCollection(2) */
	/* 	// console.log(this.children[0].dateTime); // 2022-01-29 */
	/* 	// console.log(e.target.dateTime); */
	/* 	const selectedDate = this.children[0].dateTime; */

	/* 	// === Q: How should I update the Store? Do I use update() or set()? */
	/* 	// Using update() doesn't seem to update PERMANENTLY, but I don't */
	/* 	// think that's Store's functionality */
	/* 	// A: Need to use update() method directly on Store! */
	/* 	// DON'T use $days.update()! Need to use days.update()! */
	/* 	// https://stackoverflow.com/a/70008086 */
	/* 	// = Attempt 1: Seems like update() isn't permanentally saving... */
	/* 	// days.update((currentStore) => { */
	/* 	// 	// Change previous isSelected to false */
	/* 	// 	currentStore.find((day) => day.isSelected).isSelected = false; */
	/* 	// 	// Update the clicked date to be the new isSelected */
	/* 	// 	currentStore.find((day) => day.date === selectedDate).isSelected = true; */
	/* 	// 	return currentStore; */
	/* 	// }); */
	/* 	// = Attempt 2: */
	/* 	// days.update(($days) => { */
	/* 	// 	// Change previous isSelected to false */
	/* 	// 	$days.find((day) => day.isSelected).isSelected = false; */
	/* 	// 	// Update the clicked date to be the new isSelected */
	/* 	// 	$days.find((day) => day.date === selectedDate).isSelected = true; */
	/* 	// 	return $days; */
	/* 	// }); */
	/* 	// === Using new calendarStore instead of days */
	/* 	calendarStore.update(($calendarStore) => { */
	/* 		// Change previous isSelected to false */
	/* 		$calendarStore.find((day) => day.isSelected).isSelected = false; */
	/* 		// Update the clicked date to be the new isSelected */
	/* 		$calendarStore.find((day) => day.date === selectedDate).isSelected = true; */
	/* 		return $calendarStore; */
	/* 	}); */
	/* } */

	// $: console.log('selectedDay', selectedDay);
	/* console.log($calendarStore); */
</script>

<h1 class="text-3xl underline text-center py-4">
	NFT Mint calendarStore: {$selectedStore.date}
</h1>
<h4>Today: {today.toISOString()}</h4>

<!-- This example requires Tailwind CSS v2.0+ -->
<div class="max-w-screen-xl min-w-screen-sm">
	<CalendarHeader />
	<div class="shadow ring-1 ring-black ring-opacity-5">
		<CalendarWeekdayHeader />
		<div class="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
			<!-- SMALL/MED SCREEN ONLY wraps each day in a button -->
			<!-- CalendarGrid -->
			<CalendarGrid />
		</div>
		{#if $selectedStore?.projects.length > 0}
			<div class="py-10 px-4 sm:px-6">
				<ol
					class="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5"
				>
					{#each $selectedStore.projects as project (project.id)}
						<li class="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50">
							<div class="flex-auto">
								<p class="font-semibold text-gray-900">{project.name}</p>
								<time datetime={project.datetime} class="mt-2 flex items-center text-gray-700">
									<!-- Heroicon name: solid/clock -->
									<svg
										class="mr-2 h-5 w-5 text-gray-400"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										aria-hidden="true"
									>
										<path
											fill-rule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
											clip-rule="evenodd"
										/>
									</svg>
									{project.time}
								</time>
							</div>
							<a
								href={project.href}
								class="ml-6 flex-none self-center rounded-md border border-gray-300 bg-white py-2 px-3 font-semibold text-gray-700 opacity-0 shadow-sm hover:bg-gray-50 focus:opacity-100 group-hover:opacity-100"
								>Edit<span class="sr-only">, {project.name}</span></a
							>
						</li>
					{/each}
				</ol>
			</div>
		{/if}
	</div>
</div>
