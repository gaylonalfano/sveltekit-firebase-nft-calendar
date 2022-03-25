import { writable } from 'svelte/store';

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
