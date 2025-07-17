// === Quantity Change ===
function changeQuantity(button, delta) {
  const input = button.parentElement.querySelector("input");
  let value = parseInt(input.value) || 1;
  value = Math.max(1, value + delta);
  input.value = value;
}

// === Extract price helper ===
function extractPrice(priceString) {
  return parseInt(priceString.replace(/[^\d]/g, ""), 10);
}

// === Add to Cart ===
function addToCart(button) {
  const card = button.closest(".pro");
  const productName = card.querySelector("h5").textContent;
  const quantity = parseInt(card.querySelector("input").value);
  const priceText = card.querySelector(".price").textContent;
  const image = card.querySelector("img").src;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(item => item.name === productName);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ name: productName, price: priceText, quantity, image });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
}

// === Product Data ===
const allProducts = [

  // === Category Data ===
  // === Cognac ===
  { name: "Hennessy XO", price: "₦388,000", image: "img/Features/XO.png", category: "cognac" },
  { name: "Hennessy VSOP", price: "₦105,000", image: "img/Products/", category: "cognac" },
  { name: "Hennessy VS", price: "₦62,000", image: "img/Products/", category: "cognac" },
  { name: "D'USSE VSOP", price: "₦90,500", image: "img/Products/", category: "cognac" },
  { name: "Martell VS", price: "₦58,500", image: "img/Products/", category: "cognac" },
  { name: "Blue Swift", price: "₦95,000", image: "img/Products/", category: "cognac" },
  { name: "Remy Martin", price: "₦87,000", image: "img/Products/", category: "cognac" },

  // === Whiskey ===
  { name: "Glenfiddich 21", price: "₦360,000", image: "img/Features/Glenfiddich.png", category: "whiskey" },
  { name: "Glenfiddich 18", price: "₦141,000", image: "img/Products/", category: "whiskey" },
  { name: "Glenfiddich 15", price: "₦90,000", image: "img/Products/", category: "whiskey" },
  { name: "Glenfiddich 12", price: "₦60,200", image: "img/Products/", category: "whiskey" },
  { name: "Jack Daniels Old No. 7", price: "₦29,700", image: "img/Products/", category: "whiskey" },
  { name: "Jameson Black Barrel", price: "₦45,000", image: "img/Products/", category: "whiskey" },
  { name: "Jameson Irish Whiskey", price: "₦27,000", image: "img/Products/", category: "whiskey" },
  { name: "Macallan 15", price: "₦208,000", image: "img/Products/", category: "whiskey" },
  { name: "Macallan 12", price: "₦98,500", image: "img/Products/", category: "whiskey" },
  { name: "The Observatory", price: "₦45,700", image: "img/Products/", category: "whiskey" },

  // === Tequila ===
  { name: "Don Julio 1942", price: "₦475,000", image: "img/Features/1942.png", category: "tequila" },
  { name: "Olmeca Gold", price: "₦23,700", image: "img/Products/3.png", category: "tequila" },
  { name: "Salamanca", price: "₦62,000", image: "img/Products/2.png", category: "tequila" },
  { name: "Clase Azul Reposado", price: "₦430,000", image: "img/Features/Azul.png", category: "tequila" },
  { name: "Volcan Blanco", price: "₦75,000", image: "img/Products/", category: "tequila" },
  { name: "Volcan Cristalino", price: "₦125,000", image: "img/Products/", category: "tequila" },
  { name: "Patron Silver", price: "₦55,850", image: "img/Products/5.png", category: "tequila" },
  { name: "Sierra Reposado", price: "₦19,000", image: "img/Products/6.png", category: "tequila" },
  { name: "Sierra Blanco", price: "₦17,500", image: "img/Products/4.png", category: "tequila" },
  { name: "Camino Blanco", price: "₦22,320", image: "img/Products/7.png", category: "tequila" },
  { name: "Camino Gold", price: "₦23,700", image: "img/Products/12", category: "tequila" },

  // === Syrup ===
  { name: "Triple Sec Bardinet", price: "₦17,000", image: "img/Products/9.png", category: "syrup" },
  { name: "Grenadine", price: "₦13,500", image: "grenadine-removebg-previewimg/Products/8.png", category: "syrup" },

  // === Wines ===
  { name: "Martini Brut ", price: "₦15,900", image: "img/Products/13.png", category: "wines" },
  { name: "Martini Rose", price: "₦15,900", image: "img/Products/11.png", category: "wines" },
  { name: "Martini Proseco", price: "₦15,900", image: "img/Products/10.png", category: "wines" },
  { name: "Nederburg Cabernet Sauvignon", price: "₦22,000", image: "img/Products/16.png", category: "wines" },
  { name: "Nederberg Sauvignon Blanc", price: "₦22,000", image: "img/Products/14.png", category: "wines" },
  { name: "Nederberg Chapel Red", price: "₦22,000", image: "img/Products/nederburgred-removebg-preview.png", category: "wines" },
  { name: "Four Cousins Red", price: "₦8,500", image: "img/Products/", category: "wines" },
  { name: "Four Cousins White", price: "₦8,500", image: "img/Products/", category: "wines" },
  { name: "Four Cousins Rose", price: "₦8,500", image: "img/Products/", category: "wines" },
  { name: "Declan Red", price: "₦8,900", image: "img/Products/", category: "wines" },
  { name: "Declan White", price: "₦8,900", image: "img/Products/", category: "wines" },
  { name: "Asconi Agor", price: "₦9,200", image: "img/Products/", category: "wines" },
  { name: "Escudo Rojo", price: "₦24,500", image: "img/Products/", category: "wines" },
  { name: "Terrazas Chardonnay", price: "₦24,795", image: "img/Products/17", category: "wines" },
  { name: "Terrazas Malbec", price: "₦24,795", image: "img/Products/", category: "wines" },
  { name: "Robertson Winery Red", price: "₦24,795", image: "img/Products/15", category: "wines" },
  { name: "Robertson Winery White", price: "₦24,795", image: "img/Products/1.png", category: "wines" },
  { name: "Isobella della Cruze", price: "₦24,795", image: "img/Products/18.png", category: "wines" },

  // === Vodka ===
  { name: "Absolut Blue", price: "₦22,500", image: "img/Products/", category: "vodka" },
  { name: "Skyy Raspberry", price: "₦20,500", image: "img/Products/", category: "vodka" },
  { name: "Skyy Passionfruit", price: "₦20,500", image: "img/Products/", category: "vodka" },
  { name: "Skyy Original", price: "₦20,500", image: "img/Products/", category: "vodka" },
  { name: "Skyy Citrus" , price: "₦20,500", image: "img/Products/", category: "vodka" },
  { name: "Ciroc Blue", price: "₦46,000", image: "img/Products/", category: "vodka" },

  // === Gin ===
  { name: "Gin Mare", price: "₦62,500", image: "img/Products/", category: "Gin" },
  { name: "Bombay", price: "₦22,500", image: "img/Products/", category: "Gin" },
  { name: "Gordons", price: "₦11,250", image: "img/Products/", category: "Gin" },

  // === Gin ===
  { name: "Bacardi Spiced", price: "₦15,850", image: "img/Products/", category: "rum" },
  { name: "Bacardi Carta Blanca", price: "₦17,500", image: "img/Products/", category: "rum" },

  // === Champagne ===
  { name: "Moet & Chandon Nectar Imperial", price: "₦107,000", image: "img/Products/", category: "champagne" },
  { name: "Moet & Chandon Nectar Rose", price: "₦120,000", image: "img/Products/", category: "champagne" },
  { name: "Moet & Chandon Brut Imperial", price: "₦98,000", image: "img/Products/", category: "champagne" },
  { name: "BELAIRE Rosé", price: "₦70,000", image: "img/Products/", category: "champagne" },

];

let currentPage = 1;
const itemsPerPage = 16;
let filteredProducts = [...allProducts];

// === Display Products with Pagination ===
function displayProducts(products, containerId = "shop-products") {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = products.slice(start, end);

  pageItems.forEach(product => {
    const card = document.createElement("div");
    card.className = "pro";
    const productLink = `product.html?name=${encodeURIComponent(product.name)}`;
    card.innerHTML = `
      <a href="${productLink}">
        <img src="${product.image}" alt="${product.name}">
      </a>
      <h5><a href="${productLink}">${product.name}</a></h5>
      <p class="price">${product.price}</p>
      <div class="quantity-selector">
        <button onclick="changeQuantity(this, -1)">−</button>
        <input type="number" value="1" min="1" readonly>
        <button onclick="changeQuantity(this, 1)">+</button>
      </div>
      <button class="add-cart-btn" onclick="addToCart(this)">Add to Cart</button>
    `;
    container.appendChild(card);
  });

  updatePagination(products.length);
}

// === Pagination ===
function updatePagination(totalItems) {
  const pagination = document.querySelector(".pagination");
  if (!pagination) return;
  pagination.innerHTML = "";

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const createPageButton = (label, isDisabled, onClick) => {
    const btn = document.createElement("span");
    btn.className = isDisabled ? "page-nav disabled" : "page-nav";
    btn.innerHTML = label;
    if (!isDisabled) btn.onclick = onClick;
    return btn;
  };

  pagination.appendChild(createPageButton("&lt;", currentPage === 1, () => {
    currentPage--;
    displayProducts(filteredProducts);
  }));

  for (let i = 1; i <= totalPages; i++) {
    const page = document.createElement("span");
    page.className = "page-number" + (i === currentPage ? " active" : "");
    page.innerText = i;
    page.onclick = () => {
      currentPage = i;
      displayProducts(filteredProducts);
    };
    pagination.appendChild(page);
  }

  pagination.appendChild(createPageButton("&gt;", currentPage === totalPages, () => {
    currentPage++;
    displayProducts(filteredProducts);
  }));
}

// === Filter + Sort Function ===
function filterAndSortProducts() {
  const category = document.getElementById("categoryFilter")?.value || "";
  const sort = document.getElementById("sortFilter")?.value || "";

  filteredProducts = category
    ? allProducts.filter(p => p.category === category.toLowerCase())
    : [...allProducts];

  if (sort === "asc") {
    filteredProducts.sort((a, b) => extractPrice(a.price) - extractPrice(b.price));
  } else if (sort === "desc") {
    filteredProducts.sort((a, b) => extractPrice(b.price) - extractPrice(a.price));
  }

  currentPage = 1;
  displayProducts(filteredProducts);
}

// === Reset Filters ===
function resetFilters() {
  document.getElementById("categoryFilter").value = "";
  document.getElementById("sortFilter").value = "";
  filterAndSortProducts();
}

// === Live Search ===
function handleSearch(query) {
  const resultBox = document.getElementById("searchResults");
  if (!resultBox) return;
  resultBox.innerHTML = "";

  if (!query.trim()) return;

  const matches = allProducts.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  matches.forEach(product => {
    const a = document.createElement("a");
    a.href = `product.html?name=${encodeURIComponent(product.name)}`;
    a.textContent = product.name;
    resultBox.appendChild(a);
  });
}

// === Carousel ===
const track = document.querySelector(".carousel-track");
const slides = Array.from(track?.children || []);
let currentSlide = 0;
let startX = 0;
let isDragging = false;
let autoplayInterval;

function updateSlidePosition() {
  if (track) {
    track.style.transition = "transform 0.6s ease-in-out";
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
  }
}

function goToNextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlidePosition();
}

function goToPrevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateSlidePosition();
}

document.getElementById("nextBtn")?.addEventListener("click", () => {
  stopAutoplay();
  goToNextSlide();
  startAutoplay();
});

document.getElementById("prevBtn")?.addEventListener("click", () => {
  stopAutoplay();
  goToPrevSlide();
  startAutoplay();
});

track?.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
  track.style.transition = "none";
});

track?.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  const moveX = e.touches[0].clientX - startX;
  track.style.transform = `translateX(-${currentSlide * 100 - (moveX / window.innerWidth) * 100}%)`;
});

track?.addEventListener("touchend", (e) => {
  isDragging = false;
  const diff = e.changedTouches[0].clientX - startX;
  Math.abs(diff) > 50 ? (diff > 0 ? goToPrevSlide() : goToNextSlide()) : updateSlidePosition();
});

function startAutoplay() {
  autoplayInterval = setInterval(goToNextSlide, 5000);
}
function stopAutoplay() {
  clearInterval(autoplayInterval);
}
startAutoplay();

// === Single Product Page Loader ===
function loadSingleProduct() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name");
  if (!name) return;

  const product = allProducts.find(p => p.name === name);
  if (!product) return;

  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-price").textContent = product.price;
  const img = document.getElementById("product-img");
  img.src = product.image;
  img.alt = product.name;
  document.getElementById("product-category").textContent = `Category: ${product.category}`;
}

// === Cart Page Rendering ===
function loadCart() {
  const cartContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  if (!cartContainer || !cartTotal) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartContainer.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    const price = extractPrice(item.price);
    total += price * item.quantity;

    const div = document.createElement("div");
    div.className = "cart-item";
div.innerHTML = `
  <img src="${item.image}" alt="${item.name}">
  <div class="cart-details">
    <h4>${item.name}</h4>
    <p>₦${price.toLocaleString()}</p>

    <div class="qty-controls">
      <button onclick="updateCartQty('${item.name}', -1)">−</button>
      <span>${item.quantity}</span>
      <button onclick="updateCartQty('${item.name}', 1)">+</button>
    </div>

    <button class="remove-btn" onclick="removeFromCart('${item.name}')">Remove</button>
  </div>
`;

    cartContainer.appendChild(div);
  });

  cartTotal.textContent = `₦${total.toLocaleString()}`;
}

// === Update Cart Quantity ===
function updateCartQty(name, delta) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart.find(p => p.name === name);
  if (!item) return;

  item.quantity = Math.max(1, item.quantity + delta);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
  updateCartBadge();
  showToast(`${name} quantity updated`);
}

// === Clear Cart ===
function clearCart() {
  localStorage.removeItem("cart");
  loadCart();
  updateCartBadge();
  showToast("Cart cleared");
}

// === Checkout Redirect ===
function checkout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (!cart.length) return showToast("Your cart is empty!");

  showToast("Proceeding to checkout...");
  setTimeout(() => {
    window.location.href = "checkout.html"; // Update if you have a real checkout page
  }, 1000);
}

// === Toast Notification ===
function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      background: #222;
      color: #fff;
      padding: 12px 20px;
      border-radius: 4px;
      z-index: 9999;
      opacity: 0;
      transition: opacity 0.4s ease;
    `;
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.opacity = "1";

  setTimeout(() => {
    toast.style.opacity = "0";
  }, 2500);
}

// === Cart Badge Update ===
function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  let badge = document.getElementById("cart-badge");

  if (!badge) {
    const cartIcon = document.querySelector("#navbar a[href='cart.html']");
    if (cartIcon) {
      badge = document.createElement("span");
      badge.id = "cart-badge";
      badge.style.cssText = `
        position: absolute;
        top: -6px;
        right: -6px;
        background: red;
        color: white;
        font-size: 12px;
        padding: 2px 6px;
        border-radius: 50%;
      `;
      cartIcon.style.position = "relative";
      cartIcon.appendChild(badge);
    }
  }

  if (badge) {
    badge.textContent = totalQty || "";
    badge.style.display = totalQty > 0 ? "inline-block" : "none";
  }
}

// === Remove from Cart ===
function removeFromCart(name) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.name !== name);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// === DOM Load Triggers ===
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("shop-products")) filterAndSortProducts();
  if (document.getElementById("product-details")) loadSingleProduct();
  if (window.location.pathname.includes("cart.html")) loadCart();
  if (window.location.pathname.includes("checkout.html")) loadCheckoutSummary();
  updateCartBadge();
  // ✅ Always update badge
});


function updateCartBadge() {
  const badge = document.getElementById("cart-badge");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((total, item) => total + item.quantity, 0);

  if (badge) {
    badge.textContent = count > 0 ? count : '';
    badge.style.display = count > 0 ? 'inline-block' : 'none';
  }
}

function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById("cart-badge");

  if (badge) {
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? "inline-block" : "none";
  }
}

// === Checkout Total Calculator ===
function loadCheckoutSummary() {
  const summaryContainer = document.getElementById("order-summary");
  const totalElement = document.getElementById("order-total");

  if (!summaryContainer || !totalElement) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  summaryContainer.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const itemTotal = extractPrice(item.price) * item.quantity;
    total += itemTotal;

    const div = document.createElement("div");
    div.className = "summary-item";
    div.innerHTML = `
      <span>${item.name} (x${item.quantity})</span>
      <span>₦${itemTotal.toLocaleString()}</span>
    `;
    summaryContainer.appendChild(div);
  });

  totalElement.textContent = `₦${total.toLocaleString()}`;
}


function calculateCheckoutTotal() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  return cart.reduce((sum, item) => {
    const price = extractPrice(item.price);
    return sum + (price * item.quantity);
  }, 0);
}


// === Paystack Payment Handler ===
function payWithPaystack(totalAmount, customerEmail) {
  let handler = PaystackPop.setup({
    key: 'pk_test_xxxxxxxxxxxxxxxxxxxxxx', // 🔑 Replace with your actual Paystack public key
    email: customerEmail,
    amount: totalAmount * 100, // Paystack expects the amount in kobo (1 NGN = 100 kobo)
    currency: "NGN",
    callback: function (response) {
      showToast("✅ Payment successful! Ref: " + response.reference);
      localStorage.removeItem("cart");
      updateCartBadge();
      setTimeout(() => {
        window.location.href = "success.html"; // Replace with your own success page
      }, 1500);
    },
    onClose: function () {
      showToast("❌ Transaction cancelled.");
    }
  });

  handler.openIframe();
}

// === Checkout Form Submission ===
document.getElementById("checkout-form")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const total = calculateCheckoutTotal();

  if (!name || !email || !phone || !address || total === 0) {
    showToast("⚠️ Please fill in all fields and make sure cart is not empty.");
    return;
  }

  // Optionally: Save shipping info to localStorage or backend

  payWithPaystack(total, email);
});

// Toggle mobile menu
const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", () => {
  navbar.classList.toggle("show");
});
