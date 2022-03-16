import { writable, derived, readable } from 'svelte/store';

const today = new Date();
console.log(today);

function getDatesInRange(min, max): Date[] {
	// = Option 1: https://stackoverflow.com/a/4413721
	const dates = [];
	while (min < max) {
		// this line modifies the original firstDate reference which you want to make the while loop work
		// NOTE setDate() vs. setUTCDate() cause variations!
		min.setDate(min.getDate() + 1);
		// this pushes a new date , if you were to push firstDate then you will keep updating every item in the array
		dates.push(new Date(min));
	}
	return dates;
}

function dateIsToday(date: Date) {
	return (
		date.getDate() == today.getDate() &&
		date.getMonth() == today.getMonth() &&
		date.getFullYear() == today.getFullYear()
	);
}

function getNextMonth(date: Date) {
	// https://stackoverflow.com/a/27024351
	// NOTE If I want 1..12, then need to + 1 at end (otherwise 0..11)
	return (date.getMonth() + 1) % 12;
}

function getPreviousMonth(date: Date) {
	// = Option 1: Don't use setMonth()
	// https://stackoverflow.com/a/27024351
	// NOTE If I want 1..12, then need to + 1 at end (otherwise 0..11)
	return (date.getMonth() + 11) % 12;

	// = Option 2: Use setMonth()
	// NOTE This setMonth() can alter original Date object!
	// const newDate = date;
	// newDate.setMonth(newDate.getMonth() - 1);
	// // console.log('date:', date);
	// // console.log('newDate:', newDate);
	// return newDate.getMonth();
}

function addDummyProjectsData(calendar: Record<string, any>[]) {
	const dummyDates = ['2022-01-03', '2022-01-07', '2022-01-12', '2022-01-22', '2022-02-03'];
	const dummyProjects = [
		{ id: 1, name: 'Design review', time: '10AM', datetime: '2022-01-03T10:00', href: '#' },
		{ id: 2, name: 'Sales meeting', time: '2PM', datetime: '2022-01-03T14:00', href: '#' },
		{ id: 3, name: 'Date night', time: '6PM', datetime: '2022-01-08T18:00', href: '#' },
		{
			id: 6,
			name: "Sam's birthday party",
			time: '2PM',
			datetime: '2022-01-25T14:00',
			href: '#'
		},
		{
			id: 4,
			name: 'Maple syrup museum',
			time: '3PM',
			datetime: '2022-01-22T15:00',
			href: '#'
		},
		{ id: 5, name: 'Hockey game', time: '7PM', datetime: '2022-01-22T19:00', href: '#' },
		{ id: 8, name: 'Go looting', time: '8PM', datetime: '2022-01-22T20:00', href: '#' },
		{ id: 9, name: 'Read Expanse', time: '9PM', datetime: '2022-01-22T21:00', href: '#' },
		{
			id: 7,
			name: 'Cinema with friends',
			time: '9PM',
			datetime: '2022-02-04T21:00',
			href: '#'
		}
	];

	// FIXME Think I should only loop over dummyDates and update Store inside
	dummyDates.forEach((d) => {
		dummyProjects.forEach((p) => {
			if (p.datetime.slice(0, 10) === d) {
				// = Option 1: Update Array of Objects
				// NOTE calendar dates are 'YYYY-MM-DD' with 0 padding 01, 02, etc.
				const calendarDate = calendar.find((i) => i.date === d);
				// FIXME calendarDate is undefined...
				console.log('calendarDate', calendarDate);
				// calendar.find((i) => i.date === d).projects.push(p);

				// = Option 2: Update Store directly
				// calendarStore.update((items) => {
				// 	items.find((i) => i.date === d).projects.push(p);
				// });
			}
		});
	});
}

function createCalendarStore() {
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
	const currentMonthString = months[today.getMonth()]; // E.g. 'March'
	const currentMonth = today.getMonth();

	// Generate Array of Date objects
	// FIXME Date objs in dates[] off by 1 vs. calendar
	const dates = getDatesInRange(new Date('1-1-2022'), new Date('12-31-2022'));
	console.log(dates);

	const calendar = dates.map((d) => {
		// NOTE getMonth() is 0-indexed, so Dec = 11
		const dateString: string = d.toString(); // Wed Oct 05 2011 ...
		// const dateISOString: string = d.toISOString(); // 2011-10-05T14:48:00.000Z
		const date =
			d.getFullYear() + // YYYY
			'-' +
			(d.getMonth() + 1).toString().padStart(2, '0') + // MM
			'-' +
			d.getDate().toString().padStart(2, '0'); // DD
		const day = dateString.slice(0, 3);
		const month = dateString.slice(4, 7);
		const monthNum = d.getMonth();
		// const previousMonth = getPreviousMonth(d);
		// const nextMonth = getNextMonth(d);
		const isToday = dateIsToday(d);
		const isSelected = false;
		const isCurrentMonth = currentMonth === d.getMonth();

		return {
			dateObject: d,
			date,
			dateString,
			// dateISOString,
			day,
			month,
			monthNum,
			// nextMonth,
			// previousMonth,
			isToday,
			isSelected,
			isCurrentMonth,
			projects: []
		};
	});

	// Add some dummy data for testing
	addDummyProjectsData(calendar);

	// Need to return an Array of objects
	return calendar;
}
export const calendarStore = writable(createCalendarStore());

export const days = writable([
	{ date: '2021-12-27', projects: [] },
	{ date: '2021-12-28', projects: [] },
	{ date: '2021-12-29', projects: [] },
	{ date: '2021-12-30', projects: [] },
	{ date: '2021-12-31', projects: [] },
	{ date: '2022-01-01', isCurrentMonth: true, projects: [] },
	{ date: '2022-01-02', isCurrentMonth: true, projects: [] },
	{
		date: '2022-01-03',
		isCurrentMonth: true,
		projects: [
			{ id: 1, name: 'Design review', time: '10AM', datetime: '2022-01-03T10:00', href: '#' },
			{ id: 2, name: 'Sales meeting', time: '2PM', datetime: '2022-01-03T14:00', href: '#' }
		]
	},
	{ date: '2022-01-04', isCurrentMonth: true, projects: [] },
	{ date: '2022-01-05', isCurrentMonth: true, projects: [] },
	{ date: '2022-01-06', isCurrentMonth: true, projects: [] },
	{
		date: '2022-01-07',
		isCurrentMonth: true,
		projects: [{ id: 3, name: 'Date night', time: '6PM', datetime: '2022-01-08T18:00', href: '#' }]
	},
	{ date: '2022-01-08', isCurrentMonth: true, projects: [] },
	{ date: '2022-01-09', isCurrentMonth: true, projects: [] },
	{ date: '2022-01-10', isCurrentMonth: true, projects: [] },
	{ date: '2022-01-11', isCurrentMonth: true, projects: [] },
	{
		date: '2022-01-12',
		isCurrentMonth: true,
		isToday: true,
		projects: [
			{
				id: 6,
				name: "Sam's birthday party",
				time: '2PM',
				datetime: '2022-01-25T14:00',
				href: '#'
			}
		]
	},
	{ date: '2022-01-13', isCurrentMonth: true, projects: [] },
	{ date: '2022-01-14', isCurrentMonth: true, projects: [] },
	{ date: '2022-01-15', isCurrentMonth: true, projects: [] },
	{ date: '2022-01-16', isCurrentMonth: true, projects: [] },
	{ date: '2022-01-17', isCurrentMonth: true, projects: [] },
	{ date: '2022-01-18', isCurrentMonth: true, projects: [] },
	{ date: '2022-01-19', isCurrentMonth: true, projects: [] },
	{ date: '2022-01-20', isCurrentMonth: true, projects: [] },
	{ date: '2022-01-21', isCurrentMonth: true, projects: [] },
	{
		date: '2022-01-22',
		isCurrentMonth: true,
		isSelected: true,
		projects: [
			{
				id: 4,
				name: 'Maple syrup museum',
				time: '3PM',
				datetime: '2022-01-22T15:00',
				href: '#'
			},
			{ id: 5, name: 'Hockey game', time: '7PM', datetime: '2022-01-22T19:00', href: '#' },
			{ id: 8, name: 'Go looting', time: '8PM', datetime: '2022-01-22T20:00', href: '#' },
			{ id: 9, name: 'Read Expanse', time: '9PM', datetime: '2022-01-22T21:00', href: '#' }
		]
	},
	{ date: '2022-01-23', isCurrentMonth: true, projects: [] },
	{ date: '2022-01-24', isCurrentMonth: true, projects: [] },
	{ date: '2022-01-25', isCurrentMonth: true, projects: [] },
	{ date: '2022-01-26', isCurrentMonth: true, projects: [] },
	{ date: '2022-01-27', isCurrentMonth: true, projects: [] },
	{ date: '2022-01-28', isCurrentMonth: true, projects: [] },
	{ date: '2022-01-29', isCurrentMonth: true, projects: [] },
	{ date: '2022-01-30', isCurrentMonth: true, projects: [] },
	{ date: '2022-01-31', isCurrentMonth: true, projects: [] },
	{ date: '2022-02-01', projects: [] },
	{ date: '2022-02-02', projects: [] },
	{
		date: '2022-02-03',
		projects: [
			{
				id: 7,
				name: 'Cinema with friends',
				time: '9PM',
				datetime: '2022-02-04T21:00',
				href: '#'
			}
		]
	},
	{ date: '2022-02-04', projects: [] },
	{ date: '2022-02-05', projects: [] },
	{ date: '2022-02-06', projects: [] }
]);

export const showModalStore = writable(false);

export const selectedDayStore = derived(days, ($days) => $days.find((day) => day.isSelected));

export const menuItemsStore = writable([
	{ id: '0', name: 'Day view', href: '#', active: false },
	{ id: '1', name: 'Week view', href: '#', active: true },
	{ id: '2', name: 'Month view', href: '#', active: false },
	{ id: '3', name: 'Year view', href: '#', active: false }
]);
// NOTE Max introduced the concept of exporting an object that
// has a Store.subscribe property, along with other helper functions:
// NOTE You must FIRST create a default Store (const cart = writable([]))
// const customCart = {
//	subscribe: cart.subscribe,
//	addItem: (item) => {
//		cart.update(items => {
//			return [...items, item];
//		});
//	},
//	removeItem: (id) => {
//		cart.update(items => {
//			return items.filter(item => item.id !== id);
//		});
//	}
// }
