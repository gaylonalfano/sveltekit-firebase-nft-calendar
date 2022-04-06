<script context="module">
	// Can use Svelte SSR to first fetch the matching pokemon data
	// NOTE This gives us the ability to query and load all the data
	// BEFORE anything is rendered! This is different vs Store!
	// NOTE Using a Store will first load the page, query the data, and
	// then displaying it. Also, a Store gives us a Writable (similar to Ref)
	// where we use the $ symbol to access. When using context="module",
	// we don't need $ anymore since we can access data via props object
	export async function load({ url, params }) {
		// load() runs before rendering the content of the page
		// Want to make a fetch() to the API using pokemon id, which
		// is available from page.params object
		// const id = page.params.id;
		// const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
		// const response = await fetch(url);
		// const pokeman = await response.json();

		// Now return Object with props property and add our pokeman data
		// NOTE Again, this all runs BEFORE Svelte renders anything!
		return { props: { url, id: params.id } };
	}
</script>

<script>
	export let url;
	export let id;
</script>

<h1>~/[date]/projects/[id]</h1>
<h2>{url}</h2>
<h2>{id}</h2>
