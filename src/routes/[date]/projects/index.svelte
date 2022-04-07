<script context="module">
	export async function load({ url, params }) {
		try {
			// Dynamic import
			// NOTE Use .default to grab the ProxyComponent. Remove it and you have Module {}
			// that holds both default AND metadata objects (where Frontmatter is stored)
			console.log(`url: ${url}`);
			console.log(`params: ${params}`);
			console.log(`date: ${params.date}`);
			return {
				props: {
					url,
					date: params.date
				}
			};
		} catch (e) {
			console.log(e);
			// NOTE Can redirect to a valid URL using redirect and status 303
			// return {
			// 	status: 303,
			// 	redirect: '/posts'
			// };
			// NOTE Or we can return a 404
			// NOTE Whatever we set here will get passed into our __error.svelte
			// load({error, status}) function!
			return {
				status: 404,
				error: 'Date not found'
			};
		}
	}
</script>

<script>
	import { calendarStore, selectedDayStore } from '$lib/stores/calendar-store';
	export let url;
	export let date;

	const day = $calendarStore.filter((d) => d.date === $selectedDayStore.date)[0];
	// const day = $calendarStore.filter((d) => d.date === '2022-04-22')[0];
	const projects = day.projects;
	console.log('day:', day);
	console.log('projects:', projects);
</script>

<h1>~/[date]/projects/</h1>
<p>{url}</p>
<p>List of projects for: {date} should be displayed</p>
<ol>
	{#each day.projects as project (project.id)}
		<li>{project.name}</li>
		<li>{project.id}</li>
		<li>{project.datetime}</li>
	{/each}
</ol>
