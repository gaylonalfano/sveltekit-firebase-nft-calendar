<script>
	import { calendarStore, selectedDayStore } from '$lib/stores/calendar-store';

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
		// === Using new WRITABLE calendarStore instead of days
		calendarStore.update(($calendarStore) => {
			// Change previous isSelected to false
			// FIXME Need to check that we have a selectedDayStore value
			// since after changing months, we should clear/reset selectedDayStore
			if ($selectedDayStore) {
				$calendarStore.find((day) => day.isSelected).isSelected = false;
			}
			// Update the clicked date to be the new isSelected
			$calendarStore.find((day) => day.date === selectedDate).isSelected = true;
			return $calendarStore;
		});
	}

	// $: {
	// 	console.log('CalendarGrid::calendarStore', $calendarStore);
	// 	console.log('CalendarGrid::selectedDayStore', $selectedDayStore);
	// }
</script>

<div class="isolate grid w-full grid-cols-7 gap-px">
	{#each $calendarStore as day (day.date)}
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
