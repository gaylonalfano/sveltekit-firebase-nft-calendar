<script context="module">
	export async function load({ error, status }) {
		return {
			props: {
				message: `${status}: ${error.message}`
			}
		};
	}
</script>

<script>
	export let message;
</script>

<h1>Something happened...</h1>
<h2>{message}</h2>
<p>
	<strong>NOTE:</strong>The status and error that this __error.svelte renders comes directly from
	our [slug].svelte file inside the catch(e) code block. Specifically, our [slug].svelte component
	also uses the load() function to either return the Post page, or if no match is found (ie error),
	then our catch(e) block returns an object (of type loadOutput) with a status and error properties.
	It's those properties that get passed to this component's load(_curly(error, status)_curly})
	function and therefore renders this page's content.
</p>
