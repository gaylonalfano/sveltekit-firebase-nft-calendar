<script context="module">
	// Q: Do I have access to Store in context="module"??
	// Not sure since Stores are client-side...
	// A: Yes! Use built-in get() method from 'svelte/store'
	export async function load({ url, params, fetch, session, stuff }) {
		console.log('params:', params); // { id: '3'}
		const projectId = params.id;
		return { props: { projectId } };
	}
</script>

<script lang="ts">
	import { calendarStore, selectedDayStore } from '$lib/stores/calendar-store';
	export let projectId: string;

	const day = $calendarStore.filter((d) => d.date === $selectedDayStore.date)[0];
	// const day = $calendarStore.filter((d) => d.date === '2022-04-22')[0];
	const project = day.projects.find((p) => p.id === +projectId);
	console.log({ day });
	console.log({ project });
</script>

<h1>~/[date]/projects/[id]</h1>
<h3>{project.name}: {project.id}</h3>
<ol>
	<li>{project.datetime}</li>
</ol>
<hr />

<main class="max-w-7xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
	<h1 class="text-3xl font-extrabold tracking-tight text-gray-900">Order Details</h1>

	<div class="text-sm border-b border-gray-200 mt-2 pb-5 sm:flex sm:justify-between">
		<dl class="flex">
			<dt class="text-gray-500">Order number&nbsp;</dt>
			<dd class="font-medium text-gray-900">W086438695</dd>
			<dt>
				<span class="sr-only">Date</span>
				<span class="text-gray-400 mx-2" aria-hidden="true">&middot;</span>
			</dt>
			<dd class="font-medium text-gray-900"><time datetime="2021-03-22">March 22, 2021</time></dd>
		</dl>
		<div class="mt-4 sm:mt-0">
			<a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"
				>View invoice<span aria-hidden="true"> &rarr;</span></a
			>
		</div>
	</div>

	<section aria-labelledby="products-heading" class="mt-8">
		<h2 id="products-heading" class="sr-only">Products purchased</h2>

		<div class="space-y-24">
			<div
				class="grid grid-cols-1 text-sm sm:grid-rows-1 sm:grid-cols-12 sm:gap-x-6 md:gap-x-8 lg:gap-x-8"
			>
				<div class="sm:col-span-4 md:col-span-5 md:row-end-2 md:row-span-2">
					<div class="aspect-w-1 aspect-h-1 bg-gray-50 rounded-lg overflow-hidden">
						<img
							src="https://tailwindui.com/img/ecommerce-images/confirmation-page-04-product-01.jpg"
							alt="Off-white t-shirt with circular dot illustration on the front of mountain ridges that fade."
							class="object-center object-cover"
						/>
					</div>
				</div>
				<div class="mt-6 sm:col-span-7 sm:mt-0 md:row-end-1">
					<h3 class="text-lg font-medium text-gray-900">
						<a href="#">Distant Mountains Artwork Tee</a>
					</h3>
					<p class="font-medium text-gray-900 mt-1">$36.00</p>
					<p class="text-gray-500 mt-3">
						You awake in a new, mysterious land. Mist hangs low along the distant mountains. What
						does it mean?
					</p>
				</div>
				<div class="sm:col-span-12 md:col-span-7">
					<dl
						class="grid grid-cols-1 gap-y-8 border-b py-8 border-gray-200 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10"
					>
						<div>
							<dt class="font-medium text-gray-900">Delivery address</dt>
							<dd class="mt-3 text-gray-500">
								<span class="block">Floyd Miles</span>
								<span class="block">7363 Cynthia Pass</span>
								<span class="block">Toronto, ON N3Y 4H8</span>
							</dd>
						</div>
						<div>
							<dt class="font-medium text-gray-900">Shipping updates</dt>
							<dd class="mt-3 text-gray-500 space-y-3">
								<p>f•••@example.com</p>
								<p>1•••••••••40</p>
								<button type="button" class="font-medium text-indigo-600 hover:text-indigo-500"
									>Edit</button
								>
							</dd>
						</div>
					</dl>
					<p class="font-medium text-gray-900 mt-6 md:mt-10">
						Processing on <time datetime="2021-03-24">March 24, 2021</time>
					</p>
					<div class="mt-6">
						<div class="bg-gray-200 rounded-full overflow-hidden">
							<div
								class="h-2 bg-indigo-600 rounded-full"
								style="width: calc((1 * 2 + 1) / 8 * 100%)"
							/>
						</div>
						<div class="hidden sm:grid grid-cols-4 font-medium text-gray-600 mt-6">
							<div class="text-indigo-600">Order placed</div>
							<div class="text-center text-indigo-600">Processing</div>
							<div class="text-center">Shipped</div>
							<div class="text-right">Delivered</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</main>
