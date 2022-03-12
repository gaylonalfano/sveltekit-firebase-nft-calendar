<script context="module">
	// Q: Do I have access to Store in context="module"??
	// Not sure since Stores are client-side...
	// A: Yes! Use built-in get() method from 'svelte/store'
	export async function load({ params, fetch, session, stuff }) {
		console.log(params); // { id: '3'}
		const projectId = params.id;
		console.log('projectId: ', projectId);
		return { props: { projectId } };
	}
</script>

<script>
	import { days, selectedDayStore } from '$lib/stores';
	export let projectId;

	const day = $days.filter((d) => d.date === $selectedDayStore.date)[0];
	const project = day.projects.find((p) => p.id === +projectId);
	// console.log({ day });
	// console.log({ project });
</script>

<h1>{project.name}</h1>
<ul>
	<li>{project.id}</li>
	<li>{project.datetime}</li>
</ul>
