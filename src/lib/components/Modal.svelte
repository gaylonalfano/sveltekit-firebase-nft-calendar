<!-- https://svelte.dev/repl/4624e3f0f3684ddcb2e2da10592f6df1?version=3.38.2 -->
<script>
	// Defining a prop that is itself a Component!
	export let modalContent;

	// Q: What are the properties for 'modal-open' in Daisy?
	// A: Per Github: https://github.com/saadeghi/daisyui/blob/master/src/components/styled/modal.css
	// Looks like it does: @apply translate-y-0 scale-100
</script>

<div on:click|self class="modal modal-open">
	<div class="modal-box">
		<!-- Event forwarding -->
		<svelte:component this={modalContent} on:click />
	</div>
</div>
