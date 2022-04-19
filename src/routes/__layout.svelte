<script>
	import { selectedDayStore } from '$lib/stores/calendar-store';
	import Navbar from '$lib/components/ui/Navbar.svelte';
</script>

<main class="container mx-auto">
	<Navbar />
	<div class="max-w-7xl mx-auto px-4 py-2 sm:px-6 sm:py-4 lg:px-8">
		<slot />
	</div>
</main>
