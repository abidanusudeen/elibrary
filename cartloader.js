onLoad();
displayCart();
let carts = document.querySelectorAll('.addToCart');
let products = [ { title: "The Martian", tag: "c01.jpeg", price: 750, inCart: 0 },
				 { title: "Invisible Man", tag: "c02.jpeg", price: 360, inCart: 0 },
				 { title: "The Alienist", tag: "c03.jpeg", price: 450, inCart: 0 },
				 { title: "Becoming", tag: "c04.jpeg", price: 628, inCart: 0 },
				 { title: "Hiroshima", tag: "c05.jpeg", price: 265, inCart: 0 },
				 { title: "Gone Girl", tag: "c06.jpeg", price: 280, inCart: 0 },
				 { title: "Dune", tag: "c07.jpeg", price: 288, inCart: 0 },
				 { title: "The Alchemist", tag: "c08.jpeg", price: 229, inCart: 0 } ];
/*   CHECKING ADD TO CART BUTTON   */
for(let i = 0; i < carts.length; i++) {
	carts[i].addEventListener('click', () => {
		cartNumbers(products[i]);
		totalCost(products[i]);
	})
}
/*   GET THE NUMBER OF PRODUCTS   */
function cartNumbers(product) {
	let productNumbers = localStorage.getItem('cartNumbers');
	productNumbers = parseInt(productNumbers);
	if(productNumbers) { localStorage.setItem('cartNumbers', productNumbers + 1); }
	else {
		productNumbers = 0;
		localStorage.setItem('cartNumbers', 1);
	}
	document.querySelector('.icon2 span').textContent = productNumbers + 1;
	setItems(product);
}
/*   GET THE DETAILS OF PRODUCTS   */
function setItems(product) {
	let cartItems = localStorage.getItem('productsInCart');
	cartItems = JSON.parse(cartItems);
	if (cartItems != null) {
		if(cartItems[product.tag] == undefined) { cartItems = { ...cartItems, [product.tag]: product }; }
		cartItems[product.tag].inCart += 1;
	}
	else {
		product.inCart = 1;
		cartItems = { [product.tag]: product };
	}
	localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}
/*   UPDATE TOTAL PRICE OF PRODUCTS   */
function totalCost(product) {
	let cartCost = localStorage.getItem('totalPrice');
	cartCost = parseInt(cartCost);
	if(cartCost) { localStorage.setItem('totalPrice', cartCost + product.price); }
	else { localStorage.setItem('totalPrice', product.price); }
}
/*   UPDATE CART NUMBER ON LOAD   */
function onLoad() {
	let productNumbers = localStorage.getItem('cartNumbers');
	productNumbers = parseInt(productNumbers);
	if(productNumbers) { document.querySelector('.icon2 span').textContent = productNumbers; }
}
/*   DISPLAY THE CART ITEMS   */
function displayCart() {
	let cartItems = localStorage.getItem('productsInCart');
	cartItems = JSON.parse(cartItems);
	let productContainer = document.querySelector('.products');
	if(cartItems && productContainer) {
		productContainer.innerHTML = "";
		Object.values(cartItems).map(item => {
			productContainer.innerHTML += `
			<div class="containers">
				<div class="product-title">
					<img src="${item.tag}">
					<h5> ${item.title} </h5>
				</div>
				<div class="price"> Rs. ${item.price} </div>
				<div class="quantity"> ${item.inCart} </div>
				<div class="total"> Rs. ${item.price * item.inCart} </div>
			</div>
			`;
		});
		let cartCost = localStorage.getItem('totalPrice');
		productContainer.innerHTML += `
		<div class="fullTotal"> TOTAL =  Rs. ${cartCost} </div>
		`;
	}
}