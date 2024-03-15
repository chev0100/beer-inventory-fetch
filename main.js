const newBeers = [];
const orders = [];
// Initialize the app.

function init() {
	console.log('App initialized.');
	fetchBeers();
	document.getElementById('beerList').addEventListener('click', orderBeer);
}

function fetchBeers() {
	const size = 3;
	const url = `https://random-data-api.com/api/v2/beers?size=${size}`;
	console.log('fetching beers');

	fetch(url)
		.then((response) => {
			if (!response.ok) throw new Error('The response was ot good.');
			console.log(response);
			return response.json();
		})
		.then(function (beers) {
			beers.forEach((item) => {
				// console.log(item);
				const newBeer = {
					id: item.id,
					name: item.name,
					style: item.style,
					alcohol: item.alcohol,
					price: getRandomPrice(5, 20),
				};
				console.log(newBeer);
				newBeers.push(newBeer);
			});
			// const newBeers = beers.map(function (item) {
			// 	const newBeer = {
			// 		id: item.id,
			// 		name: item.name,
			// 		style: item.style,
			// 		alcohol: item.alcohol,
			// 		price: getRandomPrice(5, 20),
			// 	};
			// 	return newBeer;
			// });
			console.log(newBeers);
			displayBeers(newBeers);
			return newBeers;
		})
		// .then(function (beers) {
		// 	displayBeers(beers);
		// })
		.catch((error) => console.error('Error:', error));
}

function displayBeers(beers) {
	const beerList = document.getElementById('beerList');

	const df = document.createDocumentFragment();
	beerList.querySelector('.message').remove();
	// beerList.remove(message);

	beers.forEach(function (beer) {
		const li = document.createElement('li');
		li.setAttribute('data-beer', beer.id);
		li.classList.add('beer');

		const div = document.createElement('div');
		div.classList.add('beer__info');
		li.appendChild(div);

		const beerName = document.createElement('p');
		beerName.classList.add('beer__name');
		beerName.textContent = beer.name;
		div.append(beerName);

		const beerStyle = document.createElement('p');
		beerStyle.classList.add('beer__style');
		beerStyle.textContent = beer.style;
		div.append(beerStyle);

		const beerAlchohol = document.createElement('p');
		beerAlchohol.classList.add('beer__alchohol');
		beerAlchohol.textContent = beer.alcohol;
		div.append(beerAlchohol);

		const beerPrice = document.createElement('p');
		beerPrice.classList.add('beer__price');
		beerPrice.textContent = beer.price;
		li.append(beerPrice);

		const orderBeer = document.createElement('button');
		orderBeer.classList.add('beer__button');
		orderBeer.textContent = 'Add to order';
		li.append(orderBeer);

		df.append(li);
	});
	beerList.append(df);
}

function getRandomPrice(min, max) {
	const cents = Math.random() < 0.5 ? '00' : '50';
	const price = Math.trunc(Math.random() * (max - min + 1) + min);
	return `${price}.${cents}`;
}

// Create a function called orderBeer()
function orderBeer(ev) {
	console.log('clicked');
	// console.log(ev.target);

	console.log(ev.target.matches('.beer__button'));

	if (ev.target.matches('.beer__button')) {
		console.log('i am button');
		console.log(ev.target.closest('.beer'));
		const beerId = +ev.target.closest('.beer').dataset.beer;
		console.log(beerId);

		const beer = newBeers.find((beer) => beer.id === beerId);
		console.log(beer);
		orders.push(beer);
		displayOrders(orders);
	}
}

function displayOrders(orderArr) {
	console.log(orderArr);
	const orderList = document.getElementById('orderList');
	const fragment = document.createDocumentFragment();

	orderArr.forEach((order) => {
		const li = document.createElement('li');
		li.classList.add('order');
		li.dataset.id = order.id;

		const nameParagraph = document.createElement('p');
		nameParagraph.classList.add('order__name');
		nameParagraph.textContent = order.name;
		li.appendChild(nameParagraph);

		const tallyParagraph = document.createElement('p');
		tallyParagraph.classList.add('order__tally');
		tallyParagraph.textContent = order.tally;
		li.appendChild(tallyParagraph);

		const priceParagraph = document.createElement('p');
		priceParagraph.classList.add('order__price');
		priceParagraph.textContent = `$${order.price}`;
		li.appendChild(priceParagraph);

		fragment.appendChild(li);
	});
	orderList.innerHTML = '';

	orderList.appendChild(fragment);
}
//add a beer to the order array when the user clicks the "Add to Order" button. Only include the id, name, price, and tally to your order object. Use ev.target and the .matches() method to check if the clicked element is the "Add to Order" button. Use the .closest() method to get the beer id from the clicked beer.

document.addEventListener('DOMContentLoaded', init);
// Create an array called beerMenu to store the beer objects.

// Create a function called fetchBeers() to fetch a list of beers from https://random-data-api.com/api/v2/beers

// Add an event listener to the beerList <ul> to listen for clicks on the "Add to Order" buttons in the beer list.

// Run the fetchBeers() function when the app is initialized.

// Create a beer object only keeping the id, name, style, and alcohol properties from the fetched beer data. Create a new price property with a random price between $7 and $15. (Build a function called getRandomPrice() to generate a random price between these two numbers and that is a string with two decimal places.)

// Push new beer objects into beerMenu.

// Use the beerMenu array to display the list of beers (with the random price included).

// Create a function called displayBeers() to display the list of beers in the beerList <ul>.

// Build the list of beers using a map, join, and a template literal using the following markup:
// `
//  <li class="beer" data-id="${beer.id}">
//    <div class="beer__info">
//      <p class="beer__name">${beer.name}</p>
//      <p class="beer__style">${beer.style}</p>
//      <p class="beer__abv">${beer.alcohol}</p>
//    </div>
//    <p class="beer__price">$${beer.price}</p>
//    <button id="addBeerButton" class="beer__button">Add to Order</button>
//  </li>
//`;

// Create a function called orderBeer() to add a beer to the order array when the user clicks the "Add to Order" button. Only include the id, name, price, and tally to your order object. Use ev.target and the .matches() method to check if the clicked element is the "Add to Order" button. Use the .closest() method to get the beer id from the clicked beer.

// Your data should look like this:
// const order = {
// 	id: beer.id,
// 	name: beer.name,
// 	price: beer.price,
// 	tally: 1,
// };

// Check if the beer is already in the orders array. If it is not, add the beer to the orders array with a tally of 1. Otherwise, increment the tally by 1.

// Use ev.target, .matched(), and .closest() to get the beer id from the clicked beer.

// Create a function called displayOrders() to display the orders from the orders array in the orderList <ul>. Use the document fragment and append methods to display the orders on the page.

// Clear existing content before appending the fragment.

// Append the fragment to the orderList.

// Calculate the total price of the order by multiplying the beer price by the number of beers in each order object. Then use the reduce method (totalPrice + orderPrice * tally) to find the total price of the order. Display the total price in the totalPriceDisplay <p> element.
