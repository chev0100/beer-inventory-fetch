import API from './api.js';

const APP = {
	beerMenu: [],
	orders: [],

	beerList: document.querySelector('#beerList'),
	orderList: document.querySelector('#orderList'),
	totalPriceDisplay: document.querySelector('#totalPrice'),

	init: () => {
		API.load;
		APP.load();
		APP.fetchBeers();
		APP.beerList.addEventListener('click', APP.orderBeer);
	},

	load: () => {
		console.log('Loaded the App module.');
	},

	fetchBeers: () => {
		const size = 5;
		const url = `https://random-data-api.com/api/v2/beers?size=${size}`;
		fetch(url)
			.then((response) => {
				if (!response.ok) throw new Error(response.statusText);
				return response.json();
			})
			.then((beers) => {
				const localBeers = beers.map((beer) => {
					const localBeer = {
						id: beer.id,
						name: beer.name,
						style: beer.style,
						alcohol: beer.alcohol,
						price: APP.getRandomPrice(7, 15),
					};
					return localBeer;
				});
				return localBeers;
			})
			.then((beers) => {
				APP.beerMenu.push(...beers);

				APP.displayBeers(APP.beerMenu);
			})
			.catch((err) => console.log(err));
	},

	displayBeers: (beers) => {
		let html = beers
			.map((beer) => {
				return `
								<li class="beer" data-id="${beer.id}">
									<div class="beer__info">
										<p class="beer__name">${beer.name}</p>
										<p class="beer__style">${beer.style}</p>
										<p class="beer__abv">${beer.alcohol}</p>
									</div>
									<p class="beer__price">$${beer.price}</p>
									<button id="addBeerButton" class="beer__button">Add to Order</button>
								</li>
							`;
			})
			.join('');

		APP.beerList.innerHTML = html;
	},

	orderBeer: (ev) => {
		if (ev.target.matches('#addBeerButton')) {
			const listId = +ev.target.closest('.beer').dataset.id;

			const beer = APP.beerMenu.find((beer) => beer.id === listId);

			const existingOrder = APP.orders.find((order) => order.id === listId);

			if (existingOrder) {
				existingOrder.tally += 1;
			} else {
				const order = {
					id: beer.id,
					name: beer.name,
					price: beer.price,
					tally: 1,
				};

				APP.orders.push(order);
			}

			APP.displayOrders(APP.orders);
			APP.displayTotalPrice(APP.orders);
		}
	},

	displayOrders: (orderArr) => {
		let html = orderArr
			.map((order) => {
				return `
					<li class="order" data-id="${order.id}">
						<p class="order__name">${order.name}</p>
						<p class="order__tally">${order.tally}</p>
						<p class="order__price">$${order.price}</p>
					</li>
				`;
			})
			.join('');

		APP.orderList.innerHTML = html;
	},

	getRandomPrice: (min, max) => {
		const cents = Math.random() < 0.5 ? '00' : '50';
		const dollars = Math.trunc(Math.random() * (max - min + 1) + min);
		return `${dollars}.${cents}`;
	},

	calculateTotalPrice: (orders) => {
		return orders.reduce(
			(totalPrice, order) => totalPrice + order.price * order.tally,
			0
		);
	},

	displayTotalPrice: (orders) => {
		const total = APP.calculateTotalPrice(orders);

		APP.totalPriceDisplay.textContent = `$${total.toFixed(2)}`;
	},
};

document.addEventListener('DOMContentLoaded', APP.init);
