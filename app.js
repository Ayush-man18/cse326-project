const defaultProducts = [
  {
    id: 1,
    name: "Upcycled Patchwork Denim Jacket",
    category: "Jackets",
    price: 2499,
    tag: "100% Recycled Denim",
    image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=600&q=80",
    description: "Re-engineered vintage denim saving approx 2,500L of water. Handcrafted with zero toxic chemical washes.",
    reviews: ["⭐ 5/5 - Incredible fit and high quality!", "⭐ 4.5/5 - Love the raw vintage texture."]
  },
  {
    id: 2,
    name: "Organic Hemp Relaxed Shirt",
    category: "Shirts",
    price: 1699,
    tag: "Pesticide-Free Hemp",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80",
    description: "Ultra-breathable linen texture made with 100% biodegradable natural hemp fibers.",
    reviews: ["⭐ 5/5 - Best breathable summer casual shirt!"]
  },
  {
    id: 3,
    name: "Recycled Cotton Baggy Chinos",
    category: "Pants",
    price: 1899,
    tag: "Pre-Consumer Waste",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80",
    description: "Spun from reclaimed factory cotton trims. Zero synthetic microplastics.",
    reviews: ["⭐ 4.8/5 - Sturdy fabric and relaxed drape."]
  },
  {
    id: 4,
    name: "Bamboo Fiber Oversized Tee",
    category: "Shirts",
    price: 999,
    tag: "Zero Plastic / Bamboo",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
    description: "Silky soft organic bamboo tee dyed with non-toxic, water-based botanical dyes.",
    reviews: ["⭐ 4.9/5 - Super soft on the skin!"]
  },
  {
    id: 5,
    name: "Vintage Washed Worker Shacket",
    category: "Jackets",
    price: 2199,
    tag: "Curated Vintage Thrift",
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80",
    description: "Sanitized and restored authentic utility workwear given a second lifespan.",
    reviews: ["⭐ 5/5 - Aesthetic boxy fit, looks amazing."]
  },
  {
    id: 6,
    name: "Raw Organic Linen Trouser",
    category: "Pants",
    price: 2299,
    tag: "Low-Water European Flax",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80",
    description: "Crafted from rain-fed European flax linen requiring zero irrigation pesticides.",
    reviews: ["⭐ 4.7/5 - Perfect airy trousers for hot weather."]
  },
  {
    id: 7,
    name: "Thrifted Military Field Parka",
    category: "Jackets",
    price: 2799,
    tag: "Deadstock Military Surplus",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80",
    description: "Authentic deadstock surplus combat jacket saved from warehouse landfill waste.",
    reviews: ["⭐ 5/5 - Rare find, indestructible fabric."]
  },
  {
    id: 8,
    name: "Zero-Waste Striped Camp Shirt",
    category: "Shirts",
    price: 1499,
    tag: "Zero-Waste Pattern Cut",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80",
    description: "Designed using geometric pattern engineering that produces zero fabric cutting scrap.",
    reviews: ["⭐ 4.6/5 - Love the collar and clean stitch."]
  },
  {
    id: 9,
    name: "Hand-Spun Khadi Cargo Pants",
    category: "Pants",
    price: 1999,
    tag: "Fair-Trade Artisan Khadi",
    image: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=600&q=80",
    description: "Hand-spun and hand-woven by rural artisan clusters using rain-harvested natural cotton.",
    reviews: ["⭐ 4.8/5 - Authentic feel and very durable pockets."]
  },
  {
    id: 10,
    name: "Reclaimed Wool Oversized Coat",
    category: "Jackets",
    price: 3499,
    tag: "100% Recycled Post-Consumer Wool",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80",
    description: "Heavy winter overcoat regenerated from shredded pre-owned woolen garments.",
    reviews: ["⭐ 5/5 - Heavy, warm, and zero virgin sheep wool used."]
  }
];

// Note: Agar browser me purana data cached ho, toh storage update karo
let products = JSON.parse(localStorage.getItem('products'));
if (!products || products.length < 10) {
  products = defaultProducts;
  localStorage.setItem('products', JSON.stringify(defaultProducts));
}

let cart = [];
let isSignUpMode = false;

function saveProducts() {
  localStorage.setItem('products', JSON.stringify(products));
}

// Render Catalogue
function displayProducts(itemsToDisplay) {
  const container = document.getElementById('product-container');
  container.innerHTML = '';

  itemsToDisplay.forEach(item => {
    container.innerHTML += `
      <div class="card">
        <img src="${item.image}" alt="${item.name}" onclick="openProductDetails(${item.id})">
        <div class="card-details">
          <span class="eco-badge">${item.tag}</span>
          <h3 onclick="openProductDetails(${item.id})">${item.name}</h3>
          <p class="price">₹${item.price}</p>
          <div class="btn-row">
            <button class="view-btn" onclick="openProductDetails(${item.id})">Details</button>
            <button class="add-cart-btn" onclick="addToCart(${item.id})">Add to Cart</button>
          </div>
        </div>
      </div>
    `;
  });
}

// Search & Filter
function filterProducts() {
  const query = document.getElementById('search-box').value.toLowerCase();
  const selectedCategory = document.getElementById('category-filter').value;

  const filtered = products.filter(item => {
    const matchesName = item.name.toLowerCase().includes(query);
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesName && matchesCat;
  });

  displayProducts(filtered);
}

// Product Details Modal
function openProductDetails(id) {
  const prod = products.find(p => p.id === id);
  if (!prod) return;

  const body = document.getElementById('modal-product-body');
  const reviewsHtml = (prod.reviews || ["No reviews yet."]).map(r => `<li>${r}</li>`).join('');

  body.innerHTML = `
    <img src="${prod.image}" alt="${prod.name}" style="width:100%; height:240px; object-fit:cover; border-radius:8px;">
    <h2 style="margin:1rem 0 0.5rem;">${prod.name}</h2>
    <span class="eco-badge">${prod.tag}</span>
    <p style="margin:0.8rem 0; font-size:1.2rem; font-weight:bold; color:#2e4f32;">₹${prod.price}</p>
    <p style="margin-bottom:1rem; color:#555;">${prod.description || 'Eco-friendly sustainable apparel.'}</p>
    <hr style="margin-bottom:1rem; border:0; border-top:1px solid #eee;">
    <h4>Verified Buyer Reviews:</h4>
    <ul style="margin:0.5rem 0 1rem 1.2rem; color:#444;">${reviewsHtml}</ul>
    <button class="submit-btn" onclick="addToCart(${prod.id}); closeModal('details-modal');">Add to Cart</button>
  `;
  openModal('details-modal');
}

// Cart Drawer
function addToCart(id) {
  const item = products.find(p => p.id === id);
  cart.push(item);
  updateCartUI();
}

function updateCartUI() {
  document.getElementById('cart-count').innerText = cart.length;
  const cartContainer = document.getElementById('cart-items');
  cartContainer.innerHTML = '';

  let total = 0;
  cart.forEach((item, index) => {
    total += Number(item.price);
    cartContainer.innerHTML += `
      <div class="cart-item">
        <span>${item.name}</span>
        <span>₹${item.price}</span>
        <button onclick="removeFromCart(${index})" style="color:red; background:none; border:none; cursor:pointer;">✕</button>
      </div>
    `;
  });

  document.getElementById('cart-total-price').innerText = total;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

function toggleCart() {
  document.getElementById('cart-drawer').classList.toggle('open');
}

// Checkout Modal
function startCheckout() {
  if (cart.length === 0) {
    alert("Cart is empty! Add products first.");
    return;
  }
  const total = document.getElementById('cart-total-price').innerText;
  document.getElementById('checkout-total-price').innerText = total;
  toggleCart();
  openModal('checkout-modal');
}

function handleOrderSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('cust-name').value;
  const method = document.getElementById('payment-method').value;

  alert(`Thank you, ${name}! Your order has been placed via ${method}. Order ID: #ECO${Date.now().toString().slice(-4)}`);
  cart = [];
  updateCartUI();
  closeModal('checkout-modal');
  document.getElementById('checkout-form').reset();
}

// User Authentication Modal
function toggleAuthMode() {
  isSignUpMode = !isSignUpMode;
  document.getElementById('auth-title').innerText = isSignUpMode ? "Create an EcoThreads Account" : "Login to EcoThreads";
  document.getElementById('auth-name').style.display = isSignUpMode ? "block" : "none";
  document.getElementById('auth-submit-btn').innerText = isSignUpMode ? "Sign Up" : "Login";
  document.getElementById('auth-switch-text').innerText = isSignUpMode ? "Already registered?" : "Don't have an account?";
  document.getElementById('auth-toggle-link').innerText = isSignUpMode ? "Login" : "Sign Up";
}

function handleAuth(event) {
  event.preventDefault();
  const email = document.getElementById('auth-email').value;
  alert(isSignUpMode ? `Account registered successfully for ${email}!` : `Welcome back, ${email}!`);
  closeModal('auth-modal');
  document.getElementById('auth-form').reset();
}

// Modal Utilities
function openModal(id) {
  document.getElementById(id).classList.add('active');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('active');
}

// Admin CRUD
function renderAdminTable() {
  const tbody = document.getElementById('admin-table-body');
  tbody.innerHTML = '';

  products.forEach(p => {
    tbody.innerHTML += `
      <tr>
        <td>${p.name}</td>
        <td>${p.category}</td>
        <td>₹${p.price}</td>
        <td><button class="delete-btn" onclick="deleteProduct(${p.id})">Delete</button></td>
      </tr>
    `;
  });
}

function handleAddProduct(event) {
  event.preventDefault();

  const newProduct = {
    id: Date.now(),
    name: document.getElementById('prod-name').value,
    category: document.getElementById('prod-category').value,
    price: Number(document.getElementById('prod-price').value),
    tag: document.getElementById('prod-tag').value,
    image: document.getElementById('prod-img').value,
    description: "New eco-friendly catalog addition.",
    reviews: ["⭐ 5/5 - Brand new sustainable piece!"]
  };

  products.push(newProduct);
  saveProducts();
  displayProducts(products);
  renderAdminTable();
  document.getElementById('add-product-form').reset();
  alert("Product Added Successfully!");
}

function deleteProduct(id) {
  products = products.filter(p => p.id !== id);
  saveProducts();
  displayProducts(products);
  renderAdminTable();
}

// Initialise
displayProducts(products);
renderAdminTable();
document.getElementById('auth-name').style.display = "none";