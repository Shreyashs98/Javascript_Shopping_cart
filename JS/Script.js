// Product data
const products = [
  {
      id: 1,
      name: "iPhone 14 Pro",
      price: 1200,
      image: "../Images/iphone14proshs.jpg",
      quantity: 0
  },
  {
    id: 2,
    name: "iPhone 13",
    price: 900,
    image: "../Images/iphone13.jpg",
    quantity: 0
  },
  {
      id: 3,
      name: "Realme Gt Neo 3t",
      price: 300,
      image: "../Images/gtneo3t.jpg",
      quantity: 0
    },
    {
      id: 4,
      name: "OnePlus 11",
      price: 600,
      image: "../Images/1plus11.jpg",
      quantity: 0
    },
    {
      id: 5,
      name: "Samsung s22",
      price: 700,
      image: "../Images/s22.jpg",
      quantity: 0
    },
    {
      id: 6,
      name: "Samsung Flip 3",
      price: 800,
      image: "../Images/flip3.jpg",
      quantity: 0
    },
    {
        id: 7,
        name: "Vivo v27",
        price: 500,
        image: "../Images/v27.jpeg",
        quantity: 0
      },
      {
        id: 8,
        name: "Oneplus nord",
        price: 200,
        image: "../Images/nordce3.jpg",
        quantity: 0
      },
  // Add more product objects here
];

// Smartwatches data
const smartwatches = [
  {
    id: 9,
    name: "Apple Watch Series 7",
    price: 399,
    image: "https://m.media-amazon.com/images/I/71zkJruS5yL._SX679_.jpg",
    quantity: 0
  },
  {
    id: 10,
    name: "Samsung Galaxy Watch 4",
    price: 299,
    image: "https://images.samsung.com/is/image/samsung/p6pim/in/2108/gallery/in-galaxy-watch4-398879-sm-r870nzsainu-481111404?$730_584_PNG$",
    quantity: 0
  },
  {
    id: 11,
    name: "Fitbit Versa 3",
    price: 229,
    image: "https://m.media-amazon.com/images/I/612H8Z9G3CL._SX679_.jpg",
    quantity: 0
  },
  {
    id: 12,
    name: "Garmin Forerunner 945",
    price: 599,
    image: "https://fitnessstore.co.in/wp-content/uploads/2020/11/Forerunner945-Black.png",
    quantity: 0
  },
  {
    id: 13,
    name: "Huawei Watch GT 2",
    price: 199,
    image: "https://www.notebookcheck.net/fileadmin/Notebooks/Huawei/Watch_GT2/Huawei_Watch_GT_2_Teaser.jpg",
    quantity: 0
  },
  {
    id: 14,
    name: "Amazfit GTR 2",
    price: 179,
    image: "https://in.amazfit.com/cdn/shop/products/amazfit-gtr-2-with-spo2-wi-fi-bt-call-gps-bezel-less-design-571381_2048x.jpg?v=1657286984",
    quantity: 0
  },
  {
    id: 15,
    name: "Fossil Gen 5",
    price: 249,
    image: "https://fossil.scene7.com/is/image/FossilPartners/FTW4024_main?$sfcc_fos_large$",
    quantity: 0
  },
  {
    id: 16,
    name: "TicWatch Pro 3",
    price: 299,
    image: "https://ticwatchindia.com/cdn/shop/products/Mobvoi-TicWatchPro3Ultra-3.png?v=1643915520&width=1445",
    quantity: 0
  }
  // Add more smartwatch objects here
];

// Cart data
let cartItems = [];

// Function to store cart items in localStorage
function storeCartItems() {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

// Function to retrieve cart items from localStorage
function retrieveCartItems() {
  const storedCartItems = localStorage.getItem("cartItems");
  if (storedCartItems) {
      cartItems = JSON.parse(storedCartItems);
  } else {
      cartItems = [];
  }
}

// Function to render product cards
function renderProductCards() {
  const productList = document.getElementById("product-list");
  if (!productList) return;

  productList.innerHTML = "";

  const allProducts = [...products, ...smartwatches]; // Combine smartphones and smartwatches

  allProducts.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("col-lg-3", "col-md-4", "col-sm-6", "mb-4");
    card.innerHTML = `
      <div class="card">
        <img src="${product.image}" class="card-img-top" alt="${product.name}">
        <div class="card-body">
          <h4 class="card-title">${product.name}</h4>
          <span class="card-text">$${product.price}</span>
          <div class="d-grid gap-2">
            <button class="btn btn-primary add-to-cart-btn" data-product-id="${product.id}">Add to cart</button>
          </div>
        </div>
      </div>
    `;

    if (product instanceof Object && product.id >= 9 && product.id <= 16) {
      const smartwatchList = document.getElementById("smartwatch-list");
      if (smartwatchList) {
        smartwatchList.appendChild(card);
      }
    } else {
      productList.appendChild(card);
    }
  });

  // Add event listeners to the "Add to cart" buttons
  const addToCartButtons = document.getElementsByClassName("add-to-cart-btn");
  for (let i = 0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].addEventListener("click", addToCart);
  }
}

// Function to handle adding a product to the cart
function addToCart(event) {
  const productId = parseInt(event.target.getAttribute("data-product-id"));

  // Check if the product is already in the cart
  const existingCartItem = cartItems.find(item => item.id === productId);
  if (existingCartItem) {
      existingCartItem.quantity++;
  } else {
      const product = [...products, ...smartwatches].find(item => item.id === productId);
      cartItems.push({ ...product, quantity: 1 });
  }

  // Update the cart count and store the cart items in localStorage
  updateCartCount();
  storeCartItems();
}

// Function to remove a product from the cart
function removeFromCart(event) {
  const productId = parseInt(event.target.getAttribute("data-product-id"));
  cartItems = cartItems.filter(item => item.id !== productId);
  renderCartItems();
  updateTotalPrice();
  updateCartCount();

  // Store the cart items in localStorage or clear it if all items are removed
  if (cartItems.length > 0) {
      storeCartItems();
  } else {
      clearCart();
  }
}

// Function to clear the cart
function clearCart() {
  cartItems = [];
  renderCartItems();
  updateTotalPrice();
  updateCartCount();
  localStorage.removeItem("cartItems");
}

// Function to decrease the quantity of a cart item
function decreaseQuantity(event) {
  const productId = parseInt(event.target.getAttribute("data-product-id"));
  const cartItem = cartItems.find(item => item.id === productId);

  if (cartItem.quantity > 1) {
      cartItem.quantity--;
      renderCartItems();
      updateTotalPrice();
      storeCartItems(); // Store cart items after updating the quantity
  }
}

// Function to increase the quantity of a cart item
function increaseQuantity(event) {
  const productId = parseInt(event.target.getAttribute("data-product-id"));
  const cartItem = cartItems.find(item => item.id === productId);

  cartItem.quantity++;
  renderCartItems();
  updateTotalPrice();
  storeCartItems(); // Store cart items after updating the quantity
}

// Function to render cart items
function renderCartItems() {
  const cartItemsContainer = document.getElementById("cart-items");
  if (!cartItemsContainer) return;

  cartItemsContainer.innerHTML = "";

  cartItems.forEach(item => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("mb-3");
    cartItem.innerHTML = `
      <div class="card">
        <div class="row g-0">
          <div class="col-md-1">
            <img src="${item.image}" class="img-fluid rounded-start" alt="${item.name}">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${item.name}</h5>
              <p class="card-text">$${item.price}</p>
              <div class="d-flex align-items-center">
                <button class="btn btn-secondary decrease-quantity-btn" data-product-id="${item.id}">-</button>
                <span class="mx-2">${item.quantity}</span>
                <button class="btn btn-secondary increase-quantity-btn" data-product-id="${item.id}">+</button>
                <button class="btn btn-danger remove-from-cart-btn ms-auto" data-product-id="${item.id}">Remove</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    cartItemsContainer.appendChild(cartItem);
  });

  // Add event listeners to the quantity and remove buttons
  const decreaseQuantityButtons = document.getElementsByClassName("decrease-quantity-btn");
  const increaseQuantityButtons = document.getElementsByClassName("increase-quantity-btn");
  const removeFromCartButtons = document.getElementsByClassName("remove-from-cart-btn");

  for (let i = 0; i < decreaseQuantityButtons.length; i++) {
    decreaseQuantityButtons[i].addEventListener("click", decreaseQuantity);
    increaseQuantityButtons[i].addEventListener("click", increaseQuantity);
    removeFromCartButtons[i].addEventListener("click", removeFromCart);
  }

  updateTotalPrice();
  updateCartCount();
}

// Function to update the cart count
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  if (!cartCount) return;

  cartCount.textContent = cartItems.length;

  const navLink = document.querySelector(".nav-link");
  if (cartItems.length > 0) {
    navLink.classList.add("has-count");
  } else {
    navLink.classList.remove("has-count");
  }

  storeCartItems();
}

// Function to update the total price
function updateTotalPrice() {
  const totalPriceElement = document.getElementById("total-price");
  if (!totalPriceElement) return;

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
}

// Function to handle checkout button click
function checkout() {
  // Check if there are items in the cart
  if (cartItems && cartItems.length > 0) {
    alert("Order placed successfully!");
  } else {
    alert("No items found in the cart. Please add items to your cart before proceeding to checkout.");
  }
}

// Function to render cart items on page load
function renderCartItemsOnLoad() {
  retrieveCartItems();
  renderCartItems();
  updateTotalPrice();
  updateCartCount();

  if (cartItems.length === 0) {
    localStorage.removeItem("cartItems");
  }
}

// Call the necessary functions to initialize the page
document.addEventListener("DOMContentLoaded", function() {
  renderProductCards();
  renderCartItemsOnLoad();
});
