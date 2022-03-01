<script lang="ts">
	import { days } from '$lib/stores';

	$: selectedDay = $days.find((day) => day.isSelected);

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

	let message = '';
	let formIsValid = false;

	function handleFormValidation() {
		if (
			formValues.name.trim().length === 0 ||
			formValues.hour.trim().length === 0 ||
			formValues.min.trim().length === 0 ||
			formValues.timezone.trim().length === 0
		) {
			message = 'Please input event details';
			console.log(message);
			formIsValid = false;
		} else {
			message = null;
			formIsValid = true;
		}
	}

	function handleSubmit() {
		// Q: The Daisy Modal uses a label for the button
		// Not sure how to add a <button> for form submit w/o
		// losing the toggle modal functionality.
		console.log(formValues);

		// Add some basic validation
		handleFormValidation();

		if (formIsValid) {
			const newEvent = {
				...formValues,
				id: Math.floor(Math.random() * 1000),
				name: formValues.name,
				time: `${formValues.hour}${formValues.min}`,
				datetime: `${selectedDay.date}T${formValues.hour}:${formValues.min}`, // 	'2022-01-25T14:00'
				href: '#'
			};

			// Update our days
			// Q: Do where exactly do I use '$' on Store?
			days.update((day) => {
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
		}
	}
</script>

<!-- The button to open modal -->
<label for="add-event-modal" class="btn modal-button">Add Event</label>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="add-event-modal" class="modal-toggle" />
<div class="modal">
	<div class="modal-box">
		<div>
			<pre>
				{JSON.stringify(formValues, null, 2)}
			</pre>
		</div>
		<form on:submit|preventDefault={handleSubmit}>
			<div class="form-control">
				<label class="input-group" for="name">
					<span>Event Name</span>
					<input
						type="text"
						id="name"
						bind:value={formValues.name}
						placeholder="info@site.com"
						class="input input-bordered"
					/>
				</label>
			</div>

			<div class="form-control py-2">
				<label class="input-group" for="date">
					<span>Date</span>
					<input
						bind:value={selectedDay.date}
						type="text"
						id="date"
						placeholder="info@site.com"
						class="input input-bordered"
						disabled
					/>
				</label>
			</div>

			<select bind:value={formValues.hour} class="select max-w-xs select-bordered">
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

			<select bind:value={formValues.min} class="select max-w-xs select-bordered">
				<option disabled selected>Min</option>
				<option value="00">00</option>
				<option value="15">15</option>
				<option value="30">30</option>
				<option value="45">45</option>
			</select>

			<select bind:value={formValues.timezone} class="select max-w-xs select-bordered">
				<option disabled selected>Timezone</option>
				<option value="UTC">UTC</option>
				<option value="PST">PST</option>
				<option value="EST">EST</option>
			</select>

			{#if message}
				<div class="alert shadow-lg alert-warning modal-action">
					<div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="stroke-current flex-shrink-0 h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
							/></svg
						>
						<span>Warning: Invalid email address!</span>
					</div>
				</div>
			{/if}

			<div class="modal-action">
				<!-- <button type="submit" on:submit={handleSubmit} class="btn btn-accent">Add Event</button> -->
				<label for="add-event-modal" class="btn" on:click={handleSubmit}>Add Event</label>
			</div>
		</form>
	</div>
</div>
