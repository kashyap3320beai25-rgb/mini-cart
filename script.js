const API = "https://dummyjson.com/products";

let products = [];
let cart = [];


// Get Products
async function getProducts() {

    try {

        const response = await fetch(API);

        const data = await response.json();

        products = data.products;

        displayProducts();

    } 
    catch (error) {

        console.log("Error:", error);

    }

}


// Display Products
function displayProducts() {

    const container = document.getElementById("productContainer");

    container.innerHTML = "";


    products.forEach(function(product) {

        const card = document.createElement("div");

        card.className = "card";


        card.innerHTML = `

            <img src="${product.thumbnail}" alt="${product.title}">

            <h3>${product.title}</h3>

            <p class="price">
                ⭐ ${product.rating.toFixed(1)}
                | $${product.price}
            </p>

            <p class="stock">
                Availability: ${product.availabilityStatus}
            </p>

            <p class="stock">
                Stock Left: ${product.stock}
            </p>

            <p class="stock">
                Reviews: ${product.reviews.length}
            </p>

            <button 
                class="add-btn"
                onclick="addToCart(${product.id})">

                Add to Cart

            </button>

        `;


        container.appendChild(card);

    });

}


// Add Product to Cart
function addToCart(id) {

    const product = products.find(function(item) {

        return item.id === id;

    });


    const existingProduct = cart.find(function(item) {

        return item.id === id;

    });


    if (existingProduct) {

        existingProduct.quantity++;

    } 
    else {

        cart.push({

            id: product.id,

            title: product.title,

            price: product.price,

            thumbnail: product.thumbnail,

            quantity: 1

        });

    }


    updateCart();

}


// Display Cart
function updateCart() {

    const cartItems = document.getElementById("cartItems");

    cartItems.innerHTML = "";


    let total = 0;

    let count = 0;


    cart.forEach(function(item) {

        total += item.price * item.quantity;

        count += item.quantity;


        const div = document.createElement("div");

        div.className = "cart-item";


        div.innerHTML = `

            <img src="${item.thumbnail}">

            <div class="cart-details">

                <h4>${item.title}</h4>

                <p>
                    $${item.price} × ${item.quantity}
                </p>

                <div class="quantity">

                    <button onclick="decrease(${item.id})">
                        -
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="increase(${item.id})">
                        +
                    </button>

                </div>

                <button 
                    class="remove"
                    onclick="removeItem(${item.id})">

                    Remove

                </button>

            </div>

        `;


        cartItems.appendChild(div);

    });


    document.getElementById("cartCount").innerText = count;

    document.getElementById("totalPrice").innerText =
        total.toFixed(2);


    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Your cart is empty 🛒</p>";

    }

}


// Increase Quantity
function increase(id) {

    const item = cart.find(function(product) {

        return product.id === id;

    });


    item.quantity++;

    updateCart();

}


// Decrease Quantity
function decrease(id) {

    const item = cart.find(function(product) {

        return product.id === id;

    });


    if (item.quantity > 1) {

        item.quantity--;

    } 
    else {

        cart = cart.filter(function(product) {

            return product.id !== id;

        });

    }


    updateCart();

}


// Remove Item
function removeItem(id) {

    cart = cart.filter(function(product) {

        return product.id !== id;

    });


    updateCart();

}


// Clear Cart
document.getElementById("clearCart").addEventListener(
    "click",
    function() {

        cart = [];

        updateCart();

    }
);


// Open Cart
document.getElementById("cartBtn").addEventListener(
    "click",
    function() {

        document.getElementById("cartBox")
            .classList.add("active");

    }
);


// Close Cart
document.getElementById("closeCart").addEventListener(
    "click",
    function() {

        document.getElementById("cartBox")
            .classList.remove("active");

    }
);


// Start
getProducts();