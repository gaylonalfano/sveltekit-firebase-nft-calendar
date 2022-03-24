<script>
	const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
</script>

<div
	class="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700"
>
	{#each WEEKDAYS as weekday}
		<div class="bg-white py-2">
			{weekday.slice(0, 1)}<span class="sr-only sm:not-sr-only">{weekday.slice(1, 3)}</span>
		</div>
	{/each}
</div>
