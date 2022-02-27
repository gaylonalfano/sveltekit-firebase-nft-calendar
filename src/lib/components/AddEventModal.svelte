<script lang="ts">
	import { DaysStore } from '$lib/stores/days';

	$: selectedDay = $DaysStore.find((day) => day.isSelected);

	interface Event {
		id: number;
		name: string;
		time: string;
		datetime: string;
		href: string;
	}

	const formValues = {
		name: '',
		hour: '',
		min: '',
		timezone: ''
	};

	function handleSubmit() {
		// Q: The Daisy Modal uses a label for the button
		// Not sure how to add a <button> for form submit w/o
		// losing the toggle modal functionality.
		console.log(formValues);
		const newEvent = {
			...formValues,
			id: Math.floor(Math.random() * 1000),
			name: formValues.name,
			time: `${formValues.hour}${formValues.min}`,
			datetime: `${selectedDay.date}T${formValues.hour}:${formValues.min}`, // 	'2022-01-25T14:00'
			href: '#'
		};

		// Update our DaysStore
		DaysStore.update((day) => {
			// Need to find isSelected and update its events array
			$DaysStore.find((day) => day.isSelected).events.push(newEvent);
			return $DaysStore;
		});
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

			<div class="modal-action">
				<!-- <button type="submit" on:submit={handleSubmit} class="btn btn-accent">Add Event</button> -->
				<label for="add-event-modal" class="btn" on:click={handleSubmit}>Add Event</label>
			</div>
		</form>
	</div>
</div>
