<script context="module">
	// Q: Do I have access to Store in context="module"??
	// Not sure since Stores are client-side...
	// A: Yes! Use built-in get() method from 'svelte/store'
	export async function load({ url, params, fetch, session, stuff }) {
		console.log('params:', params); // { id: '3'}
		const projectId = params.id;
		const date = url.pathname.slice(1, 11);
		return { props: { projectId, url, date } };
	}
</script>

<script lang="ts">
	import { calendarStore, selectedDayStore } from '$lib/stores/calendar-store';
	export let projectId: string;
	export let url: string;
	export let date: string;

	const day = $calendarStore.filter((d) => d.date === date)[0];
	// const day = $calendarStore.filter((d) => d.date === '2022-04-22')[0];
	const project = day.projects.find((p) => p.id === +projectId);
	console.log(url);
	console.log(date);
	console.log({ day });
	console.log({ project });
</script>

<main class="max-w-7xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
	<h1 class="text-3xl font-extrabold tracking-tight text-gray-900">Project Details</h1>

	<div class="text-sm mt-2 pb-5 sm:flex sm:justify-between">
		<dl class="flex">
			<dt class="text-gray-500">Project ID&nbsp;</dt>
			<dd class="font-medium text-gray-900">{project.id}</dd>
			<dt>
				<span class="sr-only">Date</span>
				<span class="text-gray-400 mx-2" aria-hidden="true">&middot;</span>
			</dt>
			<dd class="font-medium text-gray-900"><time datetime="2021-03-22">{date}</time></dd>
		</dl>
		<div class="mt-4 sm:mt-0">
			<a href="/" class="font-medium text-indigo-600 hover:text-indigo-500"
				>Back<span aria-hidden="true"> &rarr;</span></a
			>
		</div>
	</div>
	<div class="stats shadow">
		<div class="stat">
			<div class="stat-figure text-primary">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					class="inline-block w-8 h-8 stroke-current"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
					/></svg
				>
			</div>
			<div class="stat-title">Total Likes</div>
			<div class="stat-value text-primary">25.6K</div>
			<div class="stat-desc">21% more than last month</div>
		</div>

		<div class="stat">
			<div class="stat-figure text-secondary">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					class="inline-block w-8 h-8 stroke-current"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M13 10V3L4 14h7v7l9-11h-7z"
					/></svg
				>
			</div>
			<div class="stat-title">Page Views</div>
			<div class="stat-value text-secondary">2.6M</div>
			<div class="stat-desc">21% more than last month</div>
		</div>

		<div class="stat">
			<div class="stat-figure text-secondary">
				<div class="avatar online">
					<div class="w-16 rounded-full">
						<img src="https://api.lorem.space/image/face?w=128&h=128" />
					</div>
				</div>
			</div>
			<div class="stat-value">86%</div>
			<div class="stat-title">Tasks done</div>
			<div class="stat-desc text-secondary">31 tasks remaining</div>
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
						<a href="#">{project.name}</a>
					</h3>
					<p class="font-medium text-gray-900 mt-1">$36.00</p>
					<p class="text-gray-500 mt-3">
						You awake in a new, mysterious land. Mist hangs low along the distant mountains. What
						does it mean?
					</p>
				</div>
				<div class="sm:col-span-12 md:col-span-7">
					<dl class="grid grid-cols-1 gap-y-8 py-8  sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
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
				</div>

				<!-- More products... -->
			</div>
		</div>
	</section>

	<!-- Billing -->
	<section aria-labelledby="summary-heading" class="mt-24">
		<h2 id="summary-heading" class="sr-only">Billing Summary</h2>

		<div class="bg-gray-50 rounded-lg py-6 px-6 lg:px-0 lg:py-8 lg:grid lg:grid-cols-12 lg:gap-x-8">
			<dl class="grid grid-cols-1 gap-6 text-sm sm:grid-cols-2 md:gap-x-8 lg:pl-8 lg:col-span-5">
				<div>
					<dt class="font-medium text-gray-900">Billing address</dt>
					<dd class="mt-3 text-gray-500">
						<span class="block">Floyd Miles</span>
						<span class="block">7363 Cynthia Pass</span>
						<span class="block">Toronto, ON N3Y 4H8</span>
					</dd>
				</div>
				<div>
					<dt class="font-medium text-gray-900">Payment information</dt>
					<dd class="mt-3 flex">
						<div>
							<svg
								aria-hidden="true"
								width="36"
								height="24"
								viewBox="0 0 36 24"
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-auto"
							>
								<rect width="36" height="24" rx="4" fill="#224DBA" />
								<path
									d="M10.925 15.673H8.874l-1.538-6c-.073-.276-.228-.52-.456-.635A6.575 6.575 0 005 8.403v-.231h3.304c.456 0 .798.347.855.75l.798 4.328 2.05-5.078h1.994l-3.076 7.5zm4.216 0h-1.937L14.8 8.172h1.937l-1.595 7.5zm4.101-5.422c.057-.404.399-.635.798-.635a3.54 3.54 0 011.88.346l.342-1.615A4.808 4.808 0 0020.496 8c-1.88 0-3.248 1.039-3.248 2.481 0 1.097.969 1.673 1.653 2.02.74.346 1.025.577.968.923 0 .519-.57.75-1.139.75a4.795 4.795 0 01-1.994-.462l-.342 1.616a5.48 5.48 0 002.108.404c2.108.057 3.418-.981 3.418-2.539 0-1.962-2.678-2.077-2.678-2.942zm9.457 5.422L27.16 8.172h-1.652a.858.858 0 00-.798.577l-2.848 6.924h1.994l.398-1.096h2.45l.228 1.096h1.766zm-2.905-5.482l.57 2.827h-1.596l1.026-2.827z"
									fill="#fff"
								/>
							</svg>
							<p class="sr-only">Visa</p>
						</div>
						<div class="ml-4">
							<p class="text-gray-900">Ending with 4242</p>
							<p class="text-gray-600">Expires 02 / 24</p>
						</div>
					</dd>
				</div>
			</dl>

			<dl class="mt-8 divide-y divide-gray-200 text-sm lg:mt-0 lg:pr-8 lg:col-span-7">
				<div class="pb-4 flex items-center justify-between">
					<dt class="text-gray-600">Subtotal</dt>
					<dd class="font-medium text-gray-900">$72</dd>
				</div>
				<div class="py-4 flex items-center justify-between">
					<dt class="text-gray-600">Shipping</dt>
					<dd class="font-medium text-gray-900">$5</dd>
				</div>
				<div class="py-4 flex items-center justify-between">
					<dt class="text-gray-600">Tax</dt>
					<dd class="font-medium text-gray-900">$6.16</dd>
				</div>
				<div class="pt-4 flex items-center justify-between">
					<dt class="font-medium text-gray-900">Order total</dt>
					<dd class="font-medium text-indigo-600">$83.16</dd>
				</div>
			</dl>
		</div>
	</section>
</main>
