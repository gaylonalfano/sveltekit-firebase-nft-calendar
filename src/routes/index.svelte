<script>
	import Header from '$lib/components/Header.svelte';

	const days = [
		{ date: '2021-12-27', events: [] },
		{ date: '2021-12-28', events: [] },
		{ date: '2021-12-29', events: [] },
		{ date: '2021-12-30', events: [] },
		{ date: '2021-12-31', events: [] },
		{ date: '2022-01-01', isCurrentMonth: true, events: [] },
		{ date: '2022-01-02', isCurrentMonth: true, events: [] },
		{
			date: '2022-01-03',
			isCurrentMonth: true,
			events: [
				{ id: 1, name: 'Design review', time: '10AM', datetime: '2022-01-03T10:00', href: '#' },
				{ id: 2, name: 'Sales meeting', time: '2PM', datetime: '2022-01-03T14:00', href: '#' }
			]
		},
		{ date: '2022-01-04', isCurrentMonth: true, events: [] },
		{ date: '2022-01-05', isCurrentMonth: true, events: [] },
		{ date: '2022-01-06', isCurrentMonth: true, events: [] },
		{
			date: '2022-01-07',
			isCurrentMonth: true,
			events: [{ id: 3, name: 'Date night', time: '6PM', datetime: '2022-01-08T18:00', href: '#' }]
		},
		{ date: '2022-01-08', isCurrentMonth: true, events: [] },
		{ date: '2022-01-09', isCurrentMonth: true, events: [] },
		{ date: '2022-01-10', isCurrentMonth: true, events: [] },
		{ date: '2022-01-11', isCurrentMonth: true, events: [] },
		{
			date: '2022-01-12',
			isCurrentMonth: true,
			isToday: true,
			events: [
				{
					id: 6,
					name: "Sam's birthday party",
					time: '2PM',
					datetime: '2022-01-25T14:00',
					href: '#'
				}
			]
		},
		{ date: '2022-01-13', isCurrentMonth: true, events: [] },
		{ date: '2022-01-14', isCurrentMonth: true, events: [] },
		{ date: '2022-01-15', isCurrentMonth: true, events: [] },
		{ date: '2022-01-16', isCurrentMonth: true, events: [] },
		{ date: '2022-01-17', isCurrentMonth: true, events: [] },
		{ date: '2022-01-18', isCurrentMonth: true, events: [] },
		{ date: '2022-01-19', isCurrentMonth: true, events: [] },
		{ date: '2022-01-20', isCurrentMonth: true, events: [] },
		{ date: '2022-01-21', isCurrentMonth: true, events: [] },
		{
			date: '2022-01-22',
			isCurrentMonth: true,
			isSelected: true,
			events: [
				{ id: 4, name: 'Maple syrup museum', time: '3PM', datetime: '2022-01-22T15:00', href: '#' },
				{ id: 5, name: 'Hockey game', time: '7PM', datetime: '2022-01-22T19:00', href: '#' }
			]
		},
		{ date: '2022-01-23', isCurrentMonth: true, events: [] },
		{ date: '2022-01-24', isCurrentMonth: true, events: [] },
		{ date: '2022-01-25', isCurrentMonth: true, events: [] },
		{ date: '2022-01-26', isCurrentMonth: true, events: [] },
		{ date: '2022-01-27', isCurrentMonth: true, events: [] },
		{ date: '2022-01-28', isCurrentMonth: true, events: [] },
		{ date: '2022-01-29', isCurrentMonth: true, events: [] },
		{ date: '2022-01-30', isCurrentMonth: true, events: [] },
		{ date: '2022-01-31', isCurrentMonth: true, events: [] },
		{ date: '2022-02-01', events: [] },
		{ date: '2022-02-02', events: [] },
		{
			date: '2022-02-03',
			events: [
				{ id: 7, name: 'Cinema with friends', time: '9PM', datetime: '2022-02-04T21:00', href: '#' }
			]
		},
		{ date: '2022-02-04', events: [] },
		{ date: '2022-02-05', events: [] },
		{ date: '2022-02-06', events: [] }
	];

	const selectedDay = days.find((day) => day.isSelected);
</script>

<h1 class="text-3xl underline text-center py-4">NFT Mint Calendar: {selectedDay.date}</h1>

<!-- This example requires Tailwind CSS v2.0+ -->
<div class="lg:flex lg:h-full lg:flex-col">
	<Header />
	<div class="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
		<div
			class="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none"
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
			<div class="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
				<!-- LOOP OVER DAYS -->
				{#each days as day (day.date)}
					<!-- Q: How to add conditional class AND fixed (ie relative)? -->
					<div
						class="relative py-2 px-3"
						class:bg-white={day.isCurrentMonth}
						class:bg-gray-50={!day.isCurrentMonth}
						class:text-gray-500={!day.isCurrentMonth}
					>
						<time
							datetime={day.date}
							class={day.isToday
								? 'flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white'
								: undefined}>{day.date.split('-').pop().replace(/^0/, '')}</time
						>
						{#if day.events.length > 0}
							<ol class="mt-2">
								{#each day.events.slice(0, 2) as event (event.id)}
									<li>
										<a href={event.href} class="group flex">
											<p
												class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600"
											>
												{event.name}
											</p>
											<time
												datetime={event.datetime}
												class="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block"
												>{event.time}</time
											>
										</a>
									</li>
									{#if day.events.length > 2}
										<li class="text-gray-500">+ {day.events.length - 2} more</li>
									{/if}
								{/each}
							</ol>
						{/if}
					</div>
				{/each}
			</div>
			<div class="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
				{#each days as day (day.date)}
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
						<p class="sr-only">{day.events.length} events</p>
						{#if day.events.length > 0}
							<div class="-mx-0.5 mt-auto flex flex-wrap-reverse">
								{#each day.events as event (event.id)}
									<div class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400" />
								{/each}
							</div>
						{/if}
					</button>
				{/each}
			</div>
		</div>
	</div>
	<div class="py-10 px-4 sm:px-6 lg:hidden">
		<ol
			class="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5"
		>
			<li class="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50">
				<div class="flex-auto">
					<p class="font-semibold text-gray-900">Maple syrup museum</p>
					<time datetime="2022-01-15T09:00" class="mt-2 flex items-center text-gray-700">
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
						3PM
					</time>
				</div>
				<a
					href="#"
					class="ml-6 flex-none self-center rounded-md border border-gray-300 bg-white py-2 px-3 font-semibold text-gray-700 opacity-0 shadow-sm hover:bg-gray-50 focus:opacity-100 group-hover:opacity-100"
					>Edit<span class="sr-only">, Maple syrup museum</span></a
				>
			</li>

			<li class="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50">
				<div class="flex-auto">
					<p class="font-semibold text-gray-900">Hockey game</p>
					<time datetime="2022-01-22T19:00" class="mt-2 flex items-center text-gray-700">
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
						7PM
					</time>
				</div>
				<a
					href="#"
					class="ml-6 flex-none self-center rounded-md border border-gray-300 bg-white py-2 px-3 font-semibold text-gray-700 opacity-0 shadow-sm hover:bg-gray-50 focus:opacity-100 group-hover:opacity-100"
					>Edit<span class="sr-only">, Hockey game</span></a
				>
			</li>
		</ol>
	</div>
</div>
