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
	export let date;
	export let url;
</script>

<h1>~/[date]</h1>
<h2>{url}</h2>
<h2>{date}</h2>
