/*
 * - IMPORTANT Anything with 'Calendar' represents the view (what's visible)
 * - NOTE Date Objs are in YYYY-MM-DD format
 * - NOTE Months are 0-indexed (Dec = 11, Jan = 0)
 *
 *
 *
 *
 */

// FIXME Error using dayjs + sveltekit + vite:
// https://github.com/sveltejs/kit/issues/699

// = Attempt 1: ERROR: vite_ssr .weekday is not a function
// import dayjs from 'dayjs';
// import weekday from 'dayjs/plugin/weekday';
// import weekOfYear from 'dayjs/plugin/weekOfYear';

// = Attempt 2: ERROR: vite_ssr .weekday is not a function
// import dayjs from 'dayjs';
// import weekday from 'dayjs/plugin/weekday.js';
// import weekOfYear from 'dayjs/plugin/weekOfYear.js';

// = Attempt 3: ERROR: Cannot import outside of module
// import dayjsCJS from 'dayjs';
// import dayjsESM from 'dayjs/esm';
// const dayjs = !dayjsCJS ? dayjsESM : dayjsCJS;

// = Attempt 4: SOLVED! Apparently a TS issue
// https://lifesaver.codes/answer/typeerror-dayjs-1-default-is-not-a-function-475
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import isToday from 'dayjs/plugin/isToday';
dayjs.extend(weekday);
dayjs.extend(isToday);

import { writable, derived } from 'svelte/store';

const TODAY: string = dayjs().format('YYYY-MM-DD');
const INITIAL_YEAR: string = dayjs().format('YYYY');
const INITIAL_MONTH: string = dayjs().format('MM');

const initialSelectedMonth: dayjs.Dayjs = dayjs(new Date(INITIAL_YEAR, INITIAL_MONTH - 1, 1));
// console.log('calendar-store.ts::initialSelectedMonth', initialSelectedMonth);
let currentMonthDays: Record<string, any>[];
let previousMonthFillerDays: Record<string, any>[];
let nextMonthFillerDays: Record<string, any>[];

function getNumberOfDaysInMonth(year: string, month: string): number {
	return dayjs(`${year}-${month}-01`).daysInMonth();
}

function addDummyProjectsData(calendar: Record<string, any>[]): void {
	const dummyDates = ['2022-04-03', '2022-04-07', '2022-04-12', '2022-04-22', '2022-05-01'];
	const dummyProjects = [
		{ id: 1, name: 'Design review', time: '10AM', datetime: '2022-04-03T10:00', href: '#' },
		{ id: 2, name: 'Sales meeting', time: '2PM', datetime: '2022-04-03T14:00', href: '#' },
		{ id: 3, name: 'Date night', time: '6PM', datetime: '2022-04-08T18:00', href: '#' },
		{
			id: 6,
			name: "Sam's birthday party",
			time: '2PM',
			datetime: '2022-04-25T14:00',
			href: '#'
		},
		{
			id: 4,
			name: 'Maple syrup museum',
			time: '3PM',
			datetime: '2022-04-22T15:00',
			href: '#'
		},
		{ id: 5, name: 'Hockey game', time: '7PM', datetime: '2022-04-22T19:00', href: '#' },
		{ id: 8, name: 'Go looting', time: '8PM', datetime: '2022-04-22T20:00', href: '#' },
		{ id: 9, name: 'Read Expanse', time: '9PM', datetime: '2022-04-22T21:00', href: '#' },
		{
			id: 7,
			name: 'Cinema with friends',
			time: '9PM',
			datetime: '2022-05-01T21:00',
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
	calendar.find((day) => day.date === '2022-04-15').isSelected = true;
}

function getWeekday(date: string): number {
	return dayjs(date).weekday();
}

function createDaysForCurrentMonth(year: string, month: string): Record<string, any>[] {
	// Return an Array of single Day objects
	// console.log(`EXECUTING createDaysForCurrentMonth::${year}::${month}`);
	return [...Array(getNumberOfDaysInMonth(year, month))].map((day, index) => {
		// Return the Day objects we want to work with
		return {
			date: dayjs(`${year}-${month}-${index + 1}`).format('YYYY-MM-DD'),
			dayOfMonth: index + 1,
			isCurrentMonth: true,
			// isToday: dayjs().isToday(), // ALL are true...
			isToday: dayjs(`${year}-${month}-${index + 1}`).format('YYYY-MM-DD') === TODAY ? true : false,
			isSelected: false,
			projects: []
		};
	});
}

function createFillerDaysForPreviousMonth(year: string, month: string): Record<string, any>[] {
	// console.log(`EXECUTING createFillerDaysForPreviousMonth::${year}::${month}`);
	const firstDayOfTheCurrentMonthWeekday: number = getWeekday(currentMonthDays[0].date);
	const previousMonth: dayjs.Dayjs = dayjs(`${year}-${month}-01`).subtract(1, 'month'); // Cloned Dayjs object

	// Account for first day of the month on a Sunday (firstDayOfTheCurrentMonthWeekday === 0)
	// E.g. If firstDayOfTheCurrentMonthWeekday is Wed, then 3 - 1 = 2, so 2 days visible (Mon, Tue),
	// since the UI starts with Monday
	const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheCurrentMonthWeekday
		? firstDayOfTheCurrentMonthWeekday - 1
		: 6;

	const previousMonthLastMondayDayOfMonth: number = dayjs(currentMonthDays[0].date)
		.subtract(visibleNumberOfDaysFromPreviousMonth, 'day')
		.date();

	// Return an Array of single Day objects
	return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((day, index) => {
		return {
			date: dayjs(
				// Q: Why use previousMonth.month() + 1? Is it 0-indexed?
				// A: Yes, month() is 0-indexed so Jan is 0, but dayjs() takes string YYYY-MM-DD format
				`${previousMonth.year()}-${previousMonth.month() + 1}-${
					previousMonthLastMondayDayOfMonth + index
				}`
			).format('YYYY-MM-DD'),
			dayOfMonth: previousMonthLastMondayDayOfMonth + index,
			isCurrentMonth: false,
			isToday: false,
			isSelected: false,
			projects: []
		};
	});
}

function createFillerDaysForNextMonth(year: string, month: string): Record<string, any>[] {
	// console.log(`EXECUTING createFillerDaysForNextMonth::${year}::${month}`);
	const lastDayOfTheCurrentMonthWeekday: number = getWeekday(
		`${year}-${month}-${currentMonthDays.length}`
	); // 0 = Sunday, 6 = Saturday
	// FIXME We're basically passing the INITIAL_YEAR, INITIAL_MONTH as args to this function.
	// From there, we're build an Array of visible days from the next month.
	const nextMonth: dayjs.Dayjs = dayjs(`${year}-${month}-01`).add(1, 'month'); // Cloned Dayjs object

	// Account for last day of the month on a Sunday (lastDayOfTheCurrentMonthWeekday === 0)
	const visibleNumberOfDaysFromNextMonth = lastDayOfTheCurrentMonthWeekday
		? 7 - lastDayOfTheCurrentMonthWeekday
		: lastDayOfTheCurrentMonthWeekday;

	return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
		return {
			// 'index' is 0-based, so we're + 1 to get dayOfMonth
			date: dayjs(`${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`).format('YYYY-MM-DD'),
			dayOfMonth: index + 1,
			isCurrentMonth: false,
			isToday: false,
			isSelected: false,
			projects: []
		};
	});
}

export function createDaysForCurrentMonthCalendar(
	year: string = INITIAL_YEAR,
	month: string = INITIAL_MONTH
): Record<string, any>[] {
	// TODO Need to create a flexible function that recreates the 'currentMonthCalendarDays' Array
	// so that I can convert into a Store. May still be a use case for using derived Stores
	// to track previousMonth/nextMonth, but we'll see.
	// console.log(`EXECUTING createDaysForCurrentMonthCalendar::${year}::${month}`);
	// console.log(`INITIAL_YEAR: ${INITIAL_YEAR}`);
	// console.log(`INITIAL_MONTH: ${INITIAL_MONTH}`);
	currentMonthDays = createDaysForCurrentMonth(year, month);
	previousMonthFillerDays = createFillerDaysForPreviousMonth(year, month);
	nextMonthFillerDays = createFillerDaysForNextMonth(year, month);

	const currentMonthCalendarDays = [
		...previousMonthFillerDays,
		...currentMonthDays,
		...nextMonthFillerDays
	];

	// Add some dummy data for now on initialization
	// TODO When we add Firebase, need to make sure it continues to add
	// projects correctly, rather than wiping out.
	// E.g. April shows May 1 project. Change to May calendar, May 1 project
	// still displays rather than getting wiped.
	if (year === INITIAL_YEAR && month === INITIAL_MONTH) {
		addDummyProjectsData(currentMonthCalendarDays);
	}

	return currentMonthCalendarDays;
}

export const selectedMonthStore = writable(initialSelectedMonth);
// NOTE If it's simply currentMonthDays, then it does NOT include filler days
export const calendarStore = writable(
	// === Using a store selectedMonthStore
	// createDaysForCurrentMonthCalendar(
	// 	$selectedMonthStore.format('YYYY'), // Error: Cannot find $selectedMonthStore
	// 	$selectedMonthStore.format('MM') // Error: Cannot find $selectedMonthStore
	// )
	// === No Store, just a initialSelectedMonth variable
	createDaysForCurrentMonthCalendar(
		initialSelectedMonth.format('YYYY'),
		initialSelectedMonth.format('MM')
	)
);

// FIXME
// Q: If we use derived, then this becomes READABLE, which means
// when we updated selectedDayStore (in Grid), then we cannot use
// calendarStore.UPDATE() on readable! But, do I need to update
// calendarStore whenever we selected a new day??? The month is already
// rendered. But how would I update day.isSelected?
// export const calendarStore = derived(selectedMonthStore, ($selectedMonthStore) => {
// 	return createDaysForCurrentMonthCalendar(
// 		$selectedMonthStore.format('YYYY'),
// 		$selectedMonthStore.format('M')
// 	);
// });

// Q: What if I try to create a CUSTOM store function?
// https://svelte.dev/tutorial/custom-stores
function createCustomCalendarStore() {
	const { subscribe, update } = writable([]);

	return {
		subscribe,
		updateCalendar: (selectedMonth: dayjs.Dayjs) =>
			update(() =>
				createDaysForCurrentMonthCalendar(selectedMonth.format('YYYY'), selectedMonth.format('MM'))
			)
	};
}

export const customCalendarStore = createCustomCalendarStore();

export const selectedDayStore = derived(calendarStore, ($calendarStore) =>
	$calendarStore.find((day) => day.isSelected)
);

// ======= OLD helpers and some derived Stores, etc. =======

// TODO Need to consider creating a selectedMonthStore and/or
// a currentViewableMonthStore. The goal is to dynamically update
// the view/UI based on selectedMonth, which is derived from
// selectedDayStore.
// export const currentMonthStore = derived(
// 	[calendarStore, selectedDayStore],
// 	([$calendarStore, $selectedDayStore]) =>
// 		$calendarStore.filter((day) => day.monthNumber === $selectedDayStore.monthNumber)
// );

// Get selectedDayStore monthNum value and subtract to get previousMonth
// Filter through calendarStore for previousMonth days objects
// export const previousMonthStore = derived(
// 	[calendarStore, selectedDayStore],
// 	([$calendarStore, $selectedDayStore]) => {
// 		return $calendarStore.filter(
// 			(day) => day.monthNumber === $selectedDayStore.previousMonthNumber
// 		);
// 	}
// );

// function dateIsToday(date: Date) {
// 	// NOTE Using dayjs would be: if (day.date === TODAY)
// 	return (
// 		date.getDate() == TODAY.getDate() &&
// 		date.getMonth() == TODAY.getMonth() &&
// 		date.getFullYear() == TODAY.getFullYear()
// 	);
// }

// function createCalendarStore() {
// 	const months = [
// 		'January',
// 		'February',
// 		'March',
// 		'April',
// 		'May',
// 		'June',
// 		'July',
// 		'August',
// 		'September',
// 		'October',
// 		'November',
// 		'December'
// 	];

// 	// Generate Array of Date objects
// 	// FIXME Date objs in dates[] off by 1 vs. calendar
// 	const dates = getDatesInRange(new Date('1-1-2022'), new Date('12-31-2022'));

// function getNextMonth(date: Date): number {
// 	// https://stackoverflow.com/a/27024351
// 	// NOTE If I want 1..12, then need to + 1 at end (otherwise 0..11)
// 	return ((date.getMonth() + 1) % 12) + 1;
// }

// function getPreviousMonth(date: Date): number {
// 	// https://stackoverflow.com/a/27024351
// 	// NOTE If I want 1..12, then need to + 1 at end (otherwise 0..11)
// 	return ((date.getMonth() + 11) % 12) + 1;
// }

// function getDaysInMonth(year: number, month: number): number {
// 	// https://bobbyhadz.com/blog/javascript-get-number-of-days-in-month
// 	return new Date(year, month, 0).getDate();
// }

// function getDatesInRange(min: Date, max: Date): Date[] {
// 	// = Option 1: https://stackoverflow.com/a/4413721
// 	const dates = [];
// 	while (min < max) {
// 		// this line modifies the original firstDate reference which you want to make the while loop work
// 		// NOTE setDate() vs. setUTCDate() cause variations!
// 		min.setDate(min.getDate() + 1);
// 		// this pushes a new date , if you were to push firstDate then you will keep updating every item in the array
// 		dates.push(new Date(min));
// 	}
// 	return dates;
// }

// 	// TODO Need to compute dayOfMonth and weekday
// 	const calendar = dates.map((d) => {
// 		// NOTE getMonth() is 0-indexed, so Dec = 11
// 		const dateString: string = d.toString(); // Wed Oct 05 2011 ...
// 		// const dateISOString: string = d.toISOString(); // 2011-10-05T14:48:00.000Z
// 		// NOTE Don't use ISO! It doesn't account for local timezone differences!
// 		const date =
// 			d.getFullYear() + // YYYY
// 			'-' +
// 			(d.getMonth() + 1).toString().padStart(2, '0') + // MM
// 			'-' +
// 			d.getDate().toString().padStart(2, '0'); // DD
// 		const weekdayString: string = dateString.slice(0, 3);
// 		const dayOfMonth: number = d.getDate();
// 		const currentMonthNumberOfDays: number = getDaysInMonth(d.getFullYear(), d.getMonth() + 1);
// 		const monthString: string = dateString.slice(4, 7);
// 		const fullMonthString: string = months[d.getMonth()];
// 		const monthNumber: number = d.getMonth() + 1;
// 		const previousMonthNumber: number = getPreviousMonth(d);
// 		// const previousMonthNumberOfDays: number = getDaysInMonth(
// 		// 	new Date(d.getFullYear(), d.getMonth() - 1)
// 		// );
// 		const nextMonthNumber: number = getNextMonth(d);
// 		const nextMonthNumberOfDays: number = getDaysInMonth(d.getFullYear(), nextMonthNumber);
// 		const fullYearString: string = d.getFullYear().toString();
// 		const yearNumber: number = d.getFullYear();
// 		// const isToday: boolean = dateIsToday(d);
// 		const isSelected = false;
// 		// const isTodayCurrentMonth: boolean = TODAY.getMonth() + 1 === d.getMonth() + 1;

// 		return {
// 			dateObject: d,
// 			date,
// 			dateString,
// 			weekdayString,
// 			dayOfMonth,
// 			currentMonthNumberOfDays,
// 			monthString,
// 			fullMonthString,
// 			monthNumber,
// 			previousMonthNumber,
// 			nextMonthNumber,
// 			nextMonthNumberOfDays,
// 			fullYearString,
// 			yearNumber,
// 			// isToday,
// 			isSelected,
// 			// isTodayCurrentMonth,
// 			projects: []
// 		};
// 	});

// 	// Add some dummy data for testing
// 	addDummyProjectsData(calendar);

// 	// Need to return an Array of objects
// 	console.log(calendar);
// 	return calendar;
// }

// NOTE Max introduced the concept of CUSTOM STORES exporting an object that
// has a Store.subscribe property, along with other helper functions:
// NOTE You must FIRST create a default Store (const cart = writable([]))
//
// const cart = writable([]);
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
