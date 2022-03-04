<script lang="ts">
	import { days, selectedDayStore, showModalStore } from '$lib/stores';

	// Can create a local reactive variable or use a store...
	// $: selectedDay = $days.find((day) => day.isSelected);

	interface Event {
		id: number;
		name: string;
		time: string;
		datetime: string;
		href: string;
	}

	let formValues = {
		name: '',
		hour: '',
		min: '',
		timezone: ''
	};

	let formValidation = {
		name: false,
		hour: false,
		min: false,
		timezone: false
	};

	let formErrors = {
		name: '',
		hour: '',
		min: '',
		timezone: ''
	};

	let formIsValid = false;
	$: {
		if (
			formValidation.name &&
			formValidation.hour &&
			formValidation.min &&
			formValidation.timezone
		) {
			formIsValid = true;
		} else {
			formIsValid = false;
		}

		console.log('formIsValid?', formIsValid);
		console.log(formErrors);
	}

	function handleNameInput() {
		console.log('handleNameInput triggered');
		if (formValues.name.trim().length <= 3) {
			formErrors.name = 'Please input NAME details';
			formValidation.name = false;
			formIsValid = false;
		} else {
			formValidation.name = true;
			formErrors.name = '';
		}
	}

	function handleHourInput() {
		console.log('handleHourInput triggered');
		if (formValues.hour.trim().length === 0) {
			formErrors.hour = 'Please input HOUR details';
			formValidation.hour = false;
			formIsValid = false;
		} else {
			formValidation.hour = true;
			formErrors.hour = '';
		}
	}

	function handleMinInput() {
		console.log('handleMinInput triggered');
		if (formValues.min.trim().length === 0) {
			formErrors.min = 'Please input MINUTES details';
			formValidation.min = false;
			formIsValid = false;
		} else {
			formValidation.min = true;
			formErrors.min = '';
		}
	}

	function handleTimezoneInput() {
		console.log('handleTimezoneInput triggered');
		if (formValues.timezone.trim().length === 0) {
			formErrors.timezone = 'Please input TIMEZONE details';
			formValidation.timezone = false;
			formIsValid = false;
		} else {
			formValidation.timezone = true;
			formErrors.timezone = '';
		}
	}

	function handleSubmit() {
		// Q: The Daisy Modal uses a label for the button
		// Not sure how to add a <button> for form submit w/o
		// losing the toggle modal functionality.
		// console.log(formValues);

		// Add some basic validation
		// Q: Do I need to call these validation handlers
		// all right here? Or just bind them on the inputs
		// using event handlers? E.g. on:change={handleNameInput}
		// A: YES! on:change ONLY runs when value changes!
		// If the user leaves it blank, it never triggers!
		handleNameInput();
		handleHourInput();
		handleMinInput();
		handleTimezoneInput();

		if (formIsValid) {
			const newEvent = {
				...formValues,
				id: Math.floor(Math.random() * 1000),
				name: formValues.name,
				time: `${formValues.hour}${formValues.min}`,
				datetime: `${$selectedDayStore.date}T${formValues.hour}:${formValues.min}`, // 	'2022-01-25T14:00'
				href: '#'
			};

			// Update our days
			// Q: Do where exactly do I use '$' on Store?
			// 'days' or '$days' both seem to work...
			days.update(($days) => {
				// Need to find isSelected and update its events array
				$days.find((day) => day.isSelected).events.push(newEvent);
				// Don't forget to return the updated Store!
				return $days;
			});

			// Reset form and formValues
			document.querySelector('form').reset();
			formValues = {
				name: '',
				hour: '',
				min: '',
				timezone: ''
			};
			formIsValid = false;

			// Close the modal
			// Need to change parent showModal value... use Store?
			// Update: Using a Store seems a little overkill perhaps?
			// https://svelte.dev/repl/4624e3f0f3684ddcb2e2da10592f6df1?version=3.38.2
			$showModalStore = !$showModalStore;
		}
	}
</script>

<form on:submit|preventDefault={handleSubmit}>
	<div class="form-control py-2">
		<label class="input-group" for="name">
			<span>Event Name</span>
			<input
				type="text"
				id="name"
				bind:value={formValues.name}
				on:keyup={handleNameInput}
				placeholder="info@site.com"
				class="input input-bordered"
			/>
		</label>
		{#if formErrors.name}
			<div>
				<span class="text-xs">{formErrors.name}</span>
			</div>
		{/if}
	</div>

	<div class="form-control py-2">
		<label class="input-group" for="date">
			<span>Date</span>
			<input
				bind:value={$selectedDayStore.date}
				type="text"
				id="date"
				placeholder="info@site.com"
				class="input input-bordered"
				disabled
			/>
		</label>
	</div>

	<div class="form-control py-2">
		<select
			bind:value={formValues.hour}
			on:change={handleHourInput}
			class="select max-w-xs select-bordered"
		>
			<option disabled selected>Hour</option>
			<option value="00">00</option>
			<option value="01">01</option>
			<option value="02">02</option>
			<option value="03">03</option>
			<option value="04">04</option>
			<option value="05">05</option>
			<option value="06">06</option>
			<option value="07">07</option>
			<option value="08">08</option>
			<option value="09">09</option>
			<option value="10">10</option>
			<option value="11">11</option>
			<option value="12">12</option>
			<option value="13">13</option>
			<option value="14">14</option>
			<option value="15">15</option>
			<option value="16">16</option>
			<option value="17">17</option>
			<option value="18">18</option>
			<option value="19">19</option>
			<option value="20">20</option>
			<option value="21">21</option>
			<option value="22">22</option>
			<option value="23">23</option>
		</select>
		{#if formErrors.hour}
			<div>
				<span class="text-xs">{formErrors.hour}</span>
			</div>
		{/if}
	</div>

	<div class="form-control py-2">
		<select
			bind:value={formValues.min}
			on:change={handleMinInput}
			class="select max-w-xs select-bordered"
		>
			<option disabled selected>Min</option>
			<option value="00">00</option>
			<option value="15">15</option>
			<option value="30">30</option>
			<option value="45">45</option>
		</select>
		{#if formErrors.min}
			<div>
				<span class="text-xs">{formErrors.min}</span>
			</div>
		{/if}
	</div>

	<div class="form-control py-2">
		<select
			bind:value={formValues.timezone}
			on:change={handleTimezoneInput}
			class="select max-w-xs select-bordered"
		>
			<option disabled selected>Timezone</option>
			<option value="UTC">UTC</option>
			<option value="PST">PST</option>
			<option value="EST">EST</option>
		</select>
		{#if formErrors.timezone}
			<div>
				<span class="text-xs">{formErrors.timezone}</span>
			</div>
		{/if}
	</div>

	<div class="modal-action">
		<label for="add-event-modal" class="btn" on:click={handleSubmit}>Add Event</label>
	</div>
</form>
