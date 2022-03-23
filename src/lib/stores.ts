import { addMonths, subMonths, getDaysInMonth } from 'date-fns';
import { writable, derived } from 'svelte/store';
// NOTE Dates are in YYYY-MM-DD format
// NOTE Months are 0-indexed (Dec = 11, Jan = 0)
// TODO Continue to swap out for date-fns functions to build calendarStore
// After that, need to build the currentMonthStore, previousMonthStore, nextMonthStore, etc.

const TODAY = new Date();
const INITIAL_YEAR: number = TODAY.getFullYear();
const INITIAL_MONTH: number = TODAY.getMonth() + 1;

function getDatesInRange(min: Date, max: Date): Date[] {
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
		date.getDate() == TODAY.getDate() &&
		date.getMonth() == TODAY.getMonth() &&
		date.getFullYear() == TODAY.getFullYear()
	);
}

function getNextMonth(date: Date): number {
	// https://stackoverflow.com/a/27024351
	// NOTE If I want 1..12, then need to + 1 at end (otherwise 0..11)
	return ((date.getMonth() + 1) % 12) + 1;
}

function getPreviousMonth(date: Date): number {
	// https://stackoverflow.com/a/27024351
	// NOTE If I want 1..12, then need to + 1 at end (otherwise 0..11)
	return ((date.getMonth() + 11) % 12) + 1;
}

// function getDaysInMonth(year: number, month: number): number {
// 	// https://bobbyhadz.com/blog/javascript-get-number-of-days-in-month
// 	return new Date(year, month, 0).getDate();
// }

function addDummyProjectsData(calendar: Record<string, any>[]) {
	const dummyDates = ['2022-03-03', '2022-03-07', '2022-03-12', '2022-03-22', '2022-04-03'];
	const dummyProjects = [
		{ id: 1, name: 'Design review', time: '10AM', datetime: '2022-03-03T10:00', href: '#' },
		{ id: 2, name: 'Sales meeting', time: '2PM', datetime: '2022-03-03T14:00', href: '#' },
		{ id: 3, name: 'Date night', time: '6PM', datetime: '2022-03-08T18:00', href: '#' },
		{
			id: 6,
			name: "Sam's birthday party",
			time: '2PM',
			datetime: '2022-03-25T14:00',
			href: '#'
		},
		{
			id: 4,
			name: 'Maple syrup museum',
			time: '3PM',
			datetime: '2022-03-22T15:00',
			href: '#'
		},
		{ id: 5, name: 'Hockey game', time: '7PM', datetime: '2022-03-22T19:00', href: '#' },
		{ id: 8, name: 'Go looting', time: '8PM', datetime: '2022-03-22T20:00', href: '#' },
		{ id: 9, name: 'Read Expanse', time: '9PM', datetime: '2022-03-22T21:00', href: '#' },
		{
			id: 7,
			name: 'Cinema with friends',
			time: '9PM',
			datetime: '2022-04-03T21:00',
			href: '#'
		}
	];

	dummyDates.forEach((d) => {
		dummyProjects.forEach((p) => {
			if (p.datetime.slice(0, 10) === d) {
				// Update Array of Objects (or Store?)
				// NOTE calendar dates are 'YYYY-MM-DD' with 0 padding 01, 02, etc.
				calendar.find((day) => day.date === d).projects.push(p);
			}
		});
	});

	// Add a single isSelected: true date
	calendar.find((day) => day.date === '2022-03-15').isSelected = true;
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

	// Generate Array of Date objects
	// FIXME Date objs in dates[] off by 1 vs. calendar
	const dates = getDatesInRange(new Date('1-1-2021'), new Date('12-31-2024'));

	// TODO Need to compute dayOfMonth and weekday
	const calendar = dates.map((d) => {
		// NOTE getMonth() is 0-indexed, so Dec = 11
		const dateString: string = d.toString(); // Wed Oct 05 2011 ...
		// const dateISOString: string = d.toISOString(); // 2011-10-05T14:48:00.000Z
		// NOTE Don't use ISO! It doesn't account for local timezone differences!
		const date =
			d.getFullYear() + // YYYY
			'-' +
			(d.getMonth() + 1).toString().padStart(2, '0') + // MM
			'-' +
			d.getDate().toString().padStart(2, '0'); // DD
		const weekday: string = dateString.slice(0, 3);
		const dayOfMonth: number = d.getDate();
		// const currentMonthNumberOfDays: number = getDaysInMonth(d.getFullYear(), d.getMonth() + 1);
		const currentMonthNumberOfDays = getDaysInMonth(d);
		const monthString: string = dateString.slice(4, 7);
		const fullMonthString: string = months[d.getMonth()];
		const monthNumber: number = d.getMonth() + 1;
		const previousMonthNumber: number = getPreviousMonth(d);
		const previousMonthDate: Date = subMonths(d, 1);
		const previousMonthNumberOfDays: number = getDaysInMonth(
			new Date(d.getFullYear(), d.getMonth() - 1)
		);
		const nextMonthNumber: number = getNextMonth(d);
		const nextMonthNumberOfDays: number = getDaysInMonth(d.getFullYear(), nextMonthNumber);
		const fullYearString: string = d.getFullYear().toString();
		const yearNumber: number = d.getFullYear();
		const nextYearNumber: number = d.getFullYear() + 1;
		const nextMonthDate: Date = addMonths(d, 1);
		const previousYearNumber: number = d.getFullYear() - 1;
		const isToday: boolean = dateIsToday(d);
		const isSelected = false;
		const isTodayCurrentMonth: boolean = TODAY.getMonth() + 1 === d.getMonth() + 1;

		return {
			dateObject: d,
			date,
			dateString,
			weekday,
			dayOfMonth,
			currentMonthNumberOfDays,
			monthString,
			fullMonthString,
			monthNumber,
			previousMonthNumber,
			previousMonthDate,
			previousMonthNumberOfDays,
			nextMonthNumber,
			nextMonthDate,
			nextMonthNumberOfDays,
			fullYearString,
			yearNumber,
			isToday,
			isSelected,
			isTodayCurrentMonth,
			projects: []
		};
	});

	// Add some dummy data for testing
	addDummyProjectsData(calendar);

	// Need to return an Array of objects
	console.log(calendar);
	return calendar;
}
export const calendarStore = writable(createCalendarStore());

export const showModalStore = writable(false);

export const selectedDayStore = derived(calendarStore, ($calendarStore) =>
	$calendarStore.find((day) => day.isSelected)
);

// TODO Need to consider creating a selectedMonthStore and/or
// a currentViewableMonthStore. The goal is to dynamically update
// the view/UI based on selectedMonth, which is derived from
// selectedDayStore.
export const currentMonthStore = derived(
	[calendarStore, selectedDayStore],
	([$calendarStore, $selectedDayStore]) =>
		$calendarStore.filter((day) => day.monthNumber === $selectedDayStore.monthNumber)
);

// Get selectedDayStore monthNum value and subtract to get previousMonth
// Filter through calendarStore for previousMonth days objects
export const previousMonthStore = derived(
	[calendarStore, selectedDayStore],
	([$calendarStore, $selectedDayStore]) => {
		return $calendarStore.filter(
			(day) => day.monthNumber === $selectedDayStore.previousMonthNumber
		);
	}
);

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
