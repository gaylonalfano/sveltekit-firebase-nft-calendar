<script lang="ts">
	// NOTE Great calendar example:
	// https://codesandbox.io/s/monthly-calendar-ur29q?file=/src/index.js */
	import { calendarStore, selectedDayStore } from '$lib/stores/calendar-store';
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
	$: {
		console.log('index::calendarStore', $calendarStore);
		console.log('index::selectedDayStore', $selectedDayStore);
	}
</script>

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
		{#if $selectedDayStore?.projects.length > 0}
			<div class="py-10 px-4 sm:px-6">
				<ol
					class="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5"
				>
					{#each $selectedDayStore.projects as project (project.id)}
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
								href={`${project.datetime.slice(0, 10)}/projects/${project.id}`}
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
