<script lang="ts">
	import { selectedStore, showModalStore } from '$lib/stores';

	// Can create a local reactive variable or use a store...
	// $: selectedDay = $days.find((day) => day.isSelected);

	interface Project {
		id: number;
		name: string;
		time: string;
		datetime: string;
		timezone: string;
		discord: string;
		twitter: string;
		website: string;
		supply: string;
		coin: string;
		price: string;
		details: string;
		href: string;
	}

	let formValues = {
		name: '',
		hour: '',
		min: '',
		timezone: '',
		discord: '',
		twitter: '',
		website: '',
		supply: '',
		coin: '',
		price: '',
		details: ''
	};

	let formValidation = {
		name: false,
		hour: false,
		min: false,
		timezone: false,
		discord: false,
		twitter: false,
		website: false,
		supply: false,
		coin: false,
		price: false,
		details: false
	};

	let formErrors = {
		name: '',
		hour: '',
		min: '',
		timezone: '',
		discord: '',
		twitter: '',
		website: '',
		supply: '',
		coin: '',
		price: '',
		details: ''
	};

	let formIsValid = false;
	$: {
		if (
			formValidation.name &&
			formValidation.hour &&
			formValidation.min &&
			formValidation.timezone &&
			formValidation.discord &&
			formValidation.twitter &&
			formValidation.website &&
			formValidation.supply &&
			formValidation.coin &&
			formValidation.price &&
			formValidation.details
		) {
			formIsValid = true;
		} else {
			formIsValid = false;
		}

		console.log('formIsValid?', formIsValid);
		console.log(formErrors);
	}

	// TODO need to create a general handletextinput() method.
	// check out meetups validation.js
	function handleNameInput() {
		console.log('handleNameInput triggered');
		if (formValues.name.trim().length <= 3) {
			formErrors.name = 'please input name details';
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
			formErrors.hour = 'please input hour details';
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
			formErrors.min = 'please input minutes details';
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
			formErrors.timezone = 'please input timezone details';
			formValidation.timezone = false;
			formIsValid = false;
		} else {
			formValidation.timezone = true;
			formErrors.timezone = '';
		}
	}

	function handleDiscordInput() {
		console.log('handleDiscordInput triggered');
		if (formValues.discord.trim().length === 0) {
			formErrors.discord = 'please input discord details';
			formValidation.discord = false;
			formIsValid = false;
		} else {
			formValidation.discord = true;
			formErrors.discord = '';
		}
	}

	function handleTwitterInput() {
		console.log('handleTwitterInput triggered');
		if (formValues.twitter.trim().length === 0) {
			formErrors.twitter = 'please input twitter details';
			formValidation.twitter = false;
			formIsValid = false;
		} else {
			formValidation.twitter = true;
			formErrors.twitter = '';
		}
	}

	function handleWebsiteInput() {
		console.log('handleWebsiteInput triggered');
		if (formValues.website.trim().length === 0) {
			formErrors.website = 'please input website details';
			formValidation.website = false;
			formIsValid = false;
		} else {
			formValidation.website = true;
			formErrors.website = '';
		}
	}

	function handleSupplyInput() {
		console.log('handleSupplyInput triggered');
		if (formValues.supply.trim().length === 0) {
			formErrors.supply = 'please input supply details';
			formValidation.supply = false;
			formIsValid = false;
		} else {
			formValidation.supply = true;
			formErrors.supply = '';
		}
	}

	function handleCoinInput() {
		console.log('handleCoinInput triggered');
		if (formValues.coin.trim().length === 0) {
			formErrors.coin = 'please input coin details';
			formValidation.coin = false;
			formIsValid = false;
		} else {
			formValidation.coin = true;
			formErrors.coin = '';
		}
	}

	function handlePriceInput() {
		console.log('handlePriceInput triggered');
		if (formValues.price.trim().length === 0) {
			formErrors.price = 'please input price details';
			formValidation.price = false;
			formIsValid = false;
		} else {
			formValidation.price = true;
			formErrors.price = '';
		}
	}

	function handleDetailsInput() {
		console.log('handleDetailsInput triggered');
		if (formValues.details.trim().length === 0) {
			formErrors.details = 'please input details';
			formValidation.details = false;
			formIsValid = false;
		} else {
			formValidation.details = true;
			formErrors.details = '';
		}
	}

	function handleSubmit() {
		// Q: the daisy modal uses a label for the button
		// not sure how to add a <button> for form submit w/o
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
		handleDiscordInput();
		handleTwitterInput();
		handleWebsiteInput();
		handleSupplyInput();
		handleCoinInput();
		handlePriceInput();
		handleDetailsInput();

		if (formIsValid) {
			const newProject = {
				...formValues,
				id: Math.floor(Math.random() * 1000),
				time: `${formValues.hour}${formValues.min}`,
				datetime: `${$selectedDayStore.date}T${formValues.hour}:${formValues.min}`, // 	'2022-01-25T14:00'
				href: '#'
			};

			// Update our days
			// Q: Do where exactly do I use '$' on Store?
			// 'days' or '$days' both seem to work...
			days.update(($days) => {
				// Need to find isSelected and update its events array
				$days.find((day) => day.isSelected).projects.push(newProject);
				// Don't forget to return the updated Store!
				return $days;
			});

			// Reset form and formValues
			document.querySelector('form').reset();
			formValues = {
				name: '',
				hour: '',
				min: '',
				timezone: '',
				discord: '',
				twitter: '',
				website: '',
				supply: '',
				coin: '',
				price: '',
				details: ''
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
			<span>Project Name</span>
			<input
				type="text"
				id="name"
				bind:value={formValues.name}
				on:keyup={handleNameInput}
				placeholder="Taiyo Robotics"
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
				placeholder="2022-01-01"
				class="input input-bordered"
				disabled
			/>
		</label>
	</div>

	<div class="container flex space-x-5">
		<div class="form-control py-2">
			<label for="hour" class="label">Hour</label>
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
			<label for="min" class="label">Min</label>
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
			<label for="timezone" class="label">Timezone</label>
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
	</div>

	<div class="form-control py-2">
		<label class="input-group" for="discord">
			<span>Discord</span>
			<input
				type="text"
				id="discord"
				bind:value={formValues.discord}
				on:keyup={handleDiscordInput}
				placeholder="discord.gg/taiyorobotics"
				class="input input-bordered"
			/>
		</label>
		{#if formErrors.discord}
			<div>
				<span class="text-xs">{formErrors.discord}</span>
			</div>
		{/if}
	</div>

	<div class="form-control py-2">
		<label class="input-group" for="twitter">
			<span>Twitter</span>
			<input
				type="text"
				id="twitter"
				bind:value={formValues.twitter}
				on:keyup={handleTwitterInput}
				placeholder="@twitter"
				class="input input-bordered"
			/>
		</label>
		{#if formErrors.twitter}
			<div>
				<span class="text-xs">{formErrors.twitter}</span>
			</div>
		{/if}
	</div>

	<div class="form-control py-2">
		<label class="input-group" for="website">
			<span>Website</span>
			<input
				type="text"
				id="website"
				bind:value={formValues.website}
				on:keyup={handleWebsiteInput}
				placeholder="www.website.com"
				class="input input-bordered"
			/>
		</label>
		{#if formErrors.website}
			<div>
				<span class="text-xs">{formErrors.website}</span>
			</div>
		{/if}
	</div>

	<div class="form-control py-2">
		<label class="input-group" for="supply">
			<span>Supply</span>
			<input
				type="text"
				id="supply"
				bind:value={formValues.supply}
				on:keyup={handleSupplyInput}
				placeholder="5000"
				class="input input-bordered"
			/>
		</label>
		{#if formErrors.supply}
			<div>
				<span class="text-xs">{formErrors.supply}</span>
			</div>
		{/if}
	</div>

	<div class="form-control py-2">
		<label for="coin" class="label">Coin</label>
		<select
			bind:value={formValues.coin}
			on:change={handleCoinInput}
			class="select max-w-xs select-bordered"
		>
			<option disabled selected>Coin</option>
			<option value="SOL">SOL</option>
			<option value="ETH">ETH</option>
			<option value="NEAR">NEAR</option>
			<option value="LUNA">LUNA</option>
			<option value="AVAX">AVAX</option>
			<option value="XTZ">XTZ</option>
		</select>
		{#if formErrors.coin}
			<div>
				<span class="text-xs">{formErrors.coin}</span>
			</div>
		{/if}
	</div>

	<div class="form-control py-2">
		<label class="input-group" for="price">
			<span>Price</span>
			<input
				type="text"
				id="price"
				bind:value={formValues.price}
				on:keyup={handlePriceInput}
				placeholder="1.5"
				class="input input-bordered"
			/>
		</label>
		{#if formErrors.price}
			<div>
				<span class="text-xs">{formErrors.price}</span>
			</div>
		{/if}
	</div>

	<div class="form-control">
		<label class="label" for="details">
			<span class="label-text">Details</span>
		</label>
		<textarea
			id="details"
			class="textarea textarea-bordered h-24"
			placeholder="TL;DR"
			name="details"
			bind:value={formValues.details}
			on:keyup={handleDetailsInput}
		/>
		{#if formErrors.details}
			<div>
				<span class="text-xs">{formErrors.details}</span>
			</div>
		{/if}
	</div>

	<div class="modal-action">
		<label for="add-event-modal" class="btn" on:click={handleSubmit}>Add Project</label>
	</div>
</form>
