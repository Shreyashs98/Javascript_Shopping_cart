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
    
  ];
  
  // Cart data
  let cartItems = [];
  
  // Function to render product cards(shs)
  function renderProductCards() {
    const shsproductList = document.getElementById("product-list");
    shsproductList.innerHTML = "";
  
    products.forEach(product => {
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
  
      shsproductList.appendChild(card);
    });
  
    // Add event listeners to the "Add to cart" buttons(shs)
    const addToCartButtons = document.getElementsByClassName("add-to-cart-btn");
    for (let i = 0; i < addToCartButtons.length; i++) {
      addToCartButtons[i].addEventListener("click", addToCart);
    }
  }
  
// Function to handle adding a product to the cart(shs)
function addToCart(event) {
    const productId = parseInt(event.target.getAttribute("data-product-id"));
  
    // Check if the product is already in the cart(shs)
    const existingCartItem = cartItems.find(item => item.id === productId);
    if (existingCartItem) {
      existingCartItem.quantity++;
    } else {
      const product = products.find(item => item.id === productId);
      cartItems.push({ ...product, quantity: 1 });
    }
  
    // Update the cart count and store the cart items in localStorage(shs)
    updateCartCount();
    storeCartItems();
  }

  // Function to store cart items in localStorage(shs)
function storeCartItems() {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  // Function to retrieve cart items from localStorage(shs)
function retrieveCartItems() {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      cartItems = JSON.parse(storedCartItems);
    }
  }
  
  
  // Function to render cart items(shs)
  function renderCartItems() {
    const cartItemsContainer = document.getElementById("cart-items");
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
  
    // Add event listeners to the quantity and remove buttons(shs)
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
  
  // Function to decrease the quantity of a cart item(shs)
  function decreaseQuantity(event) {
    const productId = parseInt(event.target.getAttribute("data-product-id"));
    const cartItem = cartItems.find(item => item.id === productId);
  
    if (cartItem.quantity > 1) {
      cartItem.quantity--;
      renderCartItems();
      updateTotalPrice();
    }
  }
  
  // Function to increase the quantity of a cart item(shs)
  function increaseQuantity(event) {
    const productId = parseInt(event.target.getAttribute("data-product-id"));
    const cartItem = cartItems.find(item => item.id === productId);
  
    cartItem.quantity++;
    renderCartItems();
    updateTotalPrice();
  }
  
  // Function to remove a product from the cart(shs)
  function removeFromCart(event) {
    const productId = parseInt(event.target.getAttribute("data-product-id"));
    cartItems = cartItems.filter(item => item.id !== productId);
    renderCartItems();
    updateTotalPrice();
    updateCartCount();
  }
  
// Function to update the cart count(shs)
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    cartCount.textContent = cartItems.length;
  
    const navLink = document.querySelector(".nav-link");
    if (cartItems.length > 0) {
      navLink.classList.add("has-count");
    } else {
      navLink.classList.remove("has-count");
    }
  
    // Store the cart items in localStorage(shs)
    storeCartItems();
  }
  
  
  
  // Function to update the total price(shs)
  function updateTotalPrice() {
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalPriceElement = document.getElementById("total-price");
    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
  }
  
  // Call the necessary functions to initialize the page(shs)
  renderProductCards();
  renderCartItems();
  updateCartCount();
  updateTotalPrice();
  