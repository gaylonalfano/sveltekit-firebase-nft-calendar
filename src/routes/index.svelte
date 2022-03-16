<script lang="ts">
	import { calendarStore, days, selectedDayStore } from '$lib/stores';
	import Header from '$lib/components/ui/Header.svelte';

	// Q: Do I need this to be reactive or just a variable?
	// A: MUST be reactive! Simple variable won't react/update!
	// UPDATE: Converted selectedDay into a derived Store since it's
	// used across multiple components.
	// $: selectedDay = $days.find((day) => day.isSelected); // Works
	// let selectedDay = $days.find((day) => day.isSelected); // Doesn't update!
	$: today = new Date();

	function updateSelectedDay() {
		// console.log('Clicked!', e); // e.target is either <button> or <time>
		// console.log(this); // <button>
		// console.log(this.children); // HTMLCollection(2)
		// console.log(this.children[0].dateTime); // 2022-01-29
		// console.log(e.target.dateTime);
		const selectedDate = this.children[0].dateTime;

		// === Q: How should I update the Store? Do I use update() or set()?
		// Using update() doesn't seem to update PERMANENTLY, but I don't
		// think that's Store's functionality
		// A: Need to use update() method directly on Store!
		// DON'T use $days.update()! Need to use days.update()!
		// https://stackoverflow.com/a/70008086
		// = Attempt 1: Seems like update() isn't permanentally saving...
		// days.update((currentStore) => {
		// 	// Change previous isSelected to false
		// 	currentStore.find((day) => day.isSelected).isSelected = false;
		// 	// Update the clicked date to be the new isSelected
		// 	currentStore.find((day) => day.date === selectedDate).isSelected = true;
		// 	return currentStore;
		// });
		// = Attempt 2:
		days.update(($days) => {
			// Change previous isSelected to false
			$days.find((day) => day.isSelected).isSelected = false;
			// Update the clicked date to be the new isSelected
			$days.find((day) => day.date === selectedDate).isSelected = true;
			return $days;
		});
	}

	// $: console.log('selectedDay', selectedDay);
	console.log($calendarStore);
</script>

<h1 class="text-3xl underline text-center py-4">
	NFT Mint calendarStore: {$selectedDayStore.date}
</h1>
<h4>Today: {today.toISOString()}</h4>

<!-- This example requires Tailwind CSS v2.0+ -->
<div class="max-w-screen-xl min-w-screen-sm">
	<Header />
	<div class="shadow ring-1 ring-black ring-opacity-5">
		<div
			class="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700"
		>
			<div class="bg-white py-2">M<span class="sr-only sm:not-sr-only">on</span></div>
			<div class="bg-white py-2">T<span class="sr-only sm:not-sr-only">ue</span></div>
			<div class="bg-white py-2">W<span class="sr-only sm:not-sr-only">ed</span></div>
			<div class="bg-white py-2">T<span class="sr-only sm:not-sr-only">hu</span></div>
			<div class="bg-white py-2">F<span class="sr-only sm:not-sr-only">ri</span></div>
			<div class="bg-white py-2">S<span class="sr-only sm:not-sr-only">at</span></div>
			<div class="bg-white py-2">S<span class="sr-only sm:not-sr-only">un</span></div>
		</div>
		<div class="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
			<!-- SMALL/MED SCREEN ONLY wraps each day in a button -->
			<div class="isolate grid w-full grid-cols-7 grid-rows-6 gap-px">
				{#each $days as day (day.date)}
					<!--
					Always include: "flex h-14 flex-col py-2 px-3 hover:bg-gray-100 focus:z-10"
					Is current month, include: "bg-white"
					Is not current month, include: "bg-gray-50"
					Is selected or is today, include: "font-semibold"
					Is selected, include: "text-white"
					Is not selected and is today, include: "text-indigo-600"
					Is not selected and is current month, and is not today, include: "text-gray-900"
					Is not selected, is not current month, and is not today: "text-gray-500"
					-->
					<button
						type="button"
						class="flex h-14 flex-col py-2 px-3 hover:bg-gray-100 focus:z-10"
						class:bg-white={day.isCurrentMonth}
						class:bg-gray-50={!day.isCurrentMonth}
						class:font-semibold={day.isSelected || day.isToday}
						class:text-white={day.isSelected}
						class:text-indigo-600={!day.isSelected && day.isToday}
						class:text-gray-900={!day.isSelected && day.isCurrentMonth && !day.isToday}
						class:text-gray-500={!day.isSelected && !day.isCurrentMonth && !day.isToday}
						on:click={updateSelectedDay}
					>
						<!--
						Always include: "ml-auto"
						Is selected, include: "flex h-6 w-6 items-center justify-center rounded-full"
						Is selected and is today, include: "bg-indigo-600"
						Is selected and is not today, include: "bg-gray-900"
						-->
						<time
							datetime={day.date}
							class={day.isSelected
								? 'flex h-6 w-6 items-center justify-center rounded-full ml-auto'
								: 'ml-auto'}
							class:bg-indigo-600={day.isSelected && day.isToday}
							class:bg-gray-900={day.isSelected && !day.isToday}
						>
							{day.date.split('-').pop().replace(/^0/, '')}
						</time>
						<p class="sr-only">{day.projects.length} projects</p>
						{#if day.projects.length > 0}
							<div class="-mx-0.5 mt-auto flex flex-wrap-reverse">
								{#each day.projects as project (project.id)}
									<div class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400" />
								{/each}
							</div>
						{/if}
					</button>
				{/each}
			</div>
		</div>
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
