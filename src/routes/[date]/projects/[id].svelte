<script context="module">
	// Q: Do I have access to Store in context="module"??
	// Not sure since Stores are client-side...
	// A: Yes! Use built-in get() method from 'svelte/store'
	export async function load({ url, params, fetch, session, stuff }) {
		console.log('params:', params); // { id: '3'}
		const projectId = params.id;
		console.log('projectId: ', projectId);
		console.log(typeof projectId);
		return { props: { projectId } };
	}
</script>

<script>
	import { calendarStore, selectedDayStore } from '$lib/stores/calendar-store';
	export let projectId;

	// const day = $calendarStore.filter((d) => d.date === $selectedDayStore.date)[0];
	const day = $calendarStore.filter((d) => d.date === '2022-04-22')[0];
	const project = day.projects.find((p) => p.id === +projectId);
	console.log({ day });
	console.log({ project });
</script>

<h1>~/[date]/projects/[id]</h1>
<h3>{project.name}: {project.id}</h3>
<ol>
	<li>{project.date}</li>
</ol>
<hr />
