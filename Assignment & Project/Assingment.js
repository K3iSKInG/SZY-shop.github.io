let products = [];
let orders = [];

const initialSampleProducts = [
  {
    id: "sample-basketball",
    name: "Pro Basketball",
    description: "Official size 7, durable for indoor and outdoor play.",
    price: 35.99,
    imageUrl: "https://placehold.co/150x150/ADD8E6/000000?text=Basketball",
  },
  {
    id: "sample-runningshoes",
    name: "Advanced Running Shoes",
    description: "Lightweight design with superior cushioning for long runs.",
    price: 120.0,
    imageUrl: "https://placehold.co/150x150/FFD700/000000?text=Run+Shoes",
  },
  {
    id: "sample-yogamat",
    name: "Premium Yoga Mat",
    description:
      "Eco-friendly, non-slip surface for all yoga styles. 6mm thick.",
    price: 45.0,
    imageUrl: "https://placehold.co/150x150/90EE90/000000?text=Yoga+Mat",
  },
  {
    id: "sample-soccerball",
    name: "Soccer Ball (Size 5)",
    description:
      "High-quality training ball with excellent flight characteristics.",
    price: 25.5,
    imageUrl: "https://placehold.co/150x150/FFA07A/000000?text=Soccer+Ball",
  },
  {
    id: "sample-tennisracket",
    name: "Tennis Racket",
    description: "Lightweight racket for intermediate players, good control.",
    price: 89.99,
    imageUrl: "https://placehold.co/150x150/DDA0DD/000000?text=Tennis+Racket",
  },
  {
    id: "sample-goggles",
    name: "Swimming Goggles",
    description: "Anti-fog, UV protection, comfortable fit for all swimmers.",
    price: 15.0,
    imageUrl: "https://placehold.co/150x150/87CEEB/000000?text=Goggles",
  },
  {
    id: "sample-tracker",
    name: "Fitness Tracker Watch",
    description: "Monitors heart rate, steps, and sleep. Waterproof.",
    price: 60.0,
    imageUrl: "https://placehold.co/150x150/F08080/000000?text=Tracker",
  },
  {
    id: "sample-dumbbells",
    name: "Dumbbell Set (Pair)",
    description: "Adjustable dumbbell set, 5-25 lbs, ideal for home workouts.",
    price: 75.0,
    imageUrl: "https://placehold.co/150x150/C0C0C0/000000?text=Dumbbells",
  },
  {
    id: "sample-helmet",
    name: "Cycling Helmet",
    description:
      "Lightweight and ventilated helmet for road and mountain biking.",
    price: 55.0,
    imageUrl: "https://placehold.co/150x150/FFB6C1/000000?text=Helmet",
  },
  {
    id: "sample-shuttlecocks",
    name: "Badminton Shuttlecocks (6-pack)",
    description: "Durable nylon shuttlecocks for recreational play.",
    price: 9.99,
    imageUrl: "https://placehold.co/150x150/ADD8E6/000000?text=Shuttlecocks",
  },
];

const ADMIN_PASSWORD = "Username@123";

window.onload = async function () {
  const mainAppContainer = document.getElementById("main-app-container");
  const switchRoleBtn = document.getElementById("switch-role-btn");
  const appTitle = document.getElementById("app-title");
  const headerUserIdDisplay = document.getElementById("header-user-id");

  const userDashboard = document.getElementById("user-dashboard");
  const adminDashboard = document.getElementById("admin-dashboard");

  // User Dashboard Elements
  const productsList = document.getElementById("products-list");
  const cartItemCount = document.getElementById("cart-item-count");
  const toggleCartBtn = document.getElementById("toggle-cart-btn");
  const cartDetails = document.getElementById("cart-details");
  const cartItemsList = document.getElementById("cart-items-list");
  const cartTotal = document.getElementById("cart-total");
  const placeOrderBtn = document.getElementById("place-order-btn");

  // Admin Dashboard Elements
  const adminProductsTab = document.getElementById("admin-products-tab");
  const adminOrdersTab = document.getElementById("admin-orders-tab");
  const adminProductsSection = document.getElementById(
    "admin-products-section"
  );
  const adminOrdersSection = document.getElementById("admin-orders-section");
  const productForm = document.getElementById("product-form");
  const productNameInput = document.getElementById("product-name");
  const productPriceInput = document.getElementById("product-price");
  const productDescriptionInput = document.getElementById(
    "product-description"
  );
  const productImageUrlInput = document.getElementById("product-image-url");
  const addUpdateProductBtn = document.getElementById("add-update-product-btn");
  const cancelEditBtn = document.getElementById("cancel-edit-btn");
  const adminProductsTableBody = document.getElementById(
    "admin-products-table-body"
  );
  const adminOrdersTableBody = document.getElementById(
    "admin-orders-table-body"
  );
  const clearLocalDataBtn = document.getElementById("clear-local-data-btn");

  // Modal Elements
  const customModal = document.getElementById("custom-modal");
  const modalMessage = document.getElementById("modal-message");
  const modalConfirmBtn = document.getElementById("modal-confirm-btn");
  const modalCancelBtn = document.getElementById("modal-cancel-btn");
  const closeModalBtn = customModal.querySelector(".close-button");
  const modalActions = document.getElementById("modal-actions"); // Get reference to modal actions div
  // Add a reference for a potential password input within the modal
  let modalPasswordInput = null;

  let currentRole = "user"; // Default to 'user' role
  // Mock user IDs as there's no real authentication
  const MOCK_USER_ID = "user_szy_12345";
  const MOCK_ADMIN_ID = "admin_szy_67890";
  let currentUserId = MOCK_USER_ID;
  let cart = [];
  let editingProductId = null; // Used for admin product editing

  // --- Local Storage Functions ---
  function saveProductsToLocalStorage() {
    localStorage.setItem("szy_products", JSON.stringify(products));
  }

  function loadProductsFromLocalStorage() {
    const storedProducts = localStorage.getItem("szy_products");
    if (storedProducts) {
      products = JSON.parse(storedProducts);
    } else {
      products = [...initialSampleProducts]; // Load initial samples if nothing in storage
    }
  }

  function saveCartToLocalStorage() {
    localStorage.setItem("szy_cart", JSON.stringify(cart));
  }

  function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem("szy_cart");
    if (storedCart) {
      cart = JSON.parse(storedCart);
    } else {
      cart = [];
    }
  }

  function saveOrdersToLocalStorage() {
    localStorage.setItem("szy_orders", JSON.stringify(orders));
  }

  function loadOrdersFromLocalStorage() {
    const storedOrders = localStorage.getItem("szy_orders");
    if (storedOrders) {
      orders = JSON.parse(storedOrders);
      // Convert orderDate strings back to Date objects if needed for sorting/display
      orders.forEach((order) => {
        if (typeof order.orderDate === "string") {
          order.orderDate = new Date(order.orderDate);
        }
      });
    } else {
      orders = [];
    }
  }

  function clearAllLocalData() {
    showModal(
      "Are you sure you want to clear ALL local product and order data? This cannot be undone.",
      "confirm",
      () => {
        localStorage.removeItem("szy_products");
        localStorage.removeItem("szy_cart");
        localStorage.removeItem("szy_orders");
        loadProductsFromLocalStorage(); // Reset products to initial samples
        loadCartFromLocalStorage(); // Clear cart
        loadOrdersFromLocalStorage(); // Clear orders
        showModal("All local data cleared. Products reset to samples.");
        setRole(currentRole); // Refresh current view
      }
    );
  }

  // --- Modal Functions ---
  // Modified showModal to accept an input field for password prompt
  function showModal(
    message,
    type = "alert",
    onConfirm = null,
    onCancel = null,
    showInput = false
  ) {
    modalMessage.innerHTML = message; // Use innerHTML to allow for input field
    modalConfirmBtn.textContent = type === "alert" ? "OK" : "Confirm";
    modalCancelBtn.style.display =
      type === "confirm" || showInput ? "inline-flex" : "none";
    customModal.style.display = "flex"; // Use flex to center

    // Clear previous input if any
    if (modalPasswordInput && modalPasswordInput.parentNode) {
      modalPasswordInput.parentNode.removeChild(modalPasswordInput);
      modalPasswordInput = null;
    }

    if (showInput) {
      modalPasswordInput = document.createElement("input");
      modalPasswordInput.type = "password";
      modalPasswordInput.placeholder = "Enter password";
      modalPasswordInput.className = "form-input mt-4 w-full"; // Tailwind classes for styling
      modalPasswordInput.style.maxWidth = "300px"; // Limit width for modal
      // Insert the password input directly into the modal's content div, before the action buttons
      modalActions.parentNode.insertBefore(modalPasswordInput, modalActions);
      modalPasswordInput.focus(); // Focus the input field

      // Allow pressing Enter to confirm
      modalPasswordInput.onkeyup = (event) => {
        if (event.key === "Enter") {
          modalConfirmBtn.click();
        }
      };
    }

    modalConfirmBtn.onclick = () => {
      customModal.style.display = "none";
      if (showInput && onConfirm) {
        onConfirm(modalPasswordInput.value); // Pass input value to confirm callback
      } else if (onConfirm) {
        onConfirm();
      }
      // Clean up input field after use
      if (modalPasswordInput && modalPasswordInput.parentNode) {
        modalPasswordInput.parentNode.removeChild(modalPasswordInput);
        modalPasswordInput = null;
      }
    };

    modalCancelBtn.onclick = () => {
      customModal.style.display = "none";
      if (onCancel) onCancel();
      // Clean up input field after use
      if (modalPasswordInput && modalPasswordInput.parentNode) {
        modalPasswordInput.parentNode.removeChild(modalPasswordInput);
        modalPasswordInput = null;
      }
    };

    closeModalBtn.onclick = () => {
      customModal.style.display = "none";
      if (onCancel && (type === "confirm" || showInput)) onCancel(); // Call cancel if confirm/input modal is closed by X
      // Clean up input field after use
      if (modalPasswordInput && modalPasswordInput.parentNode) {
        modalPasswordInput.parentNode.removeChild(modalPasswordInput);
        modalPasswordInput = null;
      }
    };
  }

  // --- Core Application Logic ---

  function setRole(role) {
    currentRole = role;
    if (currentRole === "user") {
      currentUserId = MOCK_USER_ID;
      userDashboard.classList.remove("hidden");
      adminDashboard.classList.add("hidden");
      appTitle.textContent = "SZY Sport Shop - User Dashboard";
      headerUserIdDisplay.textContent = `User ID: ${currentUserId} (Data persistent locally)`;
      switchRoleBtn.textContent = "Switch to Admin";
      loadProducts(); // Load products for user view
      renderCart(); // Initialize cart view
    } else if (currentRole === "admin") {
      currentUserId = MOCK_ADMIN_ID;
      userDashboard.classList.add("hidden");
      adminDashboard.classList.remove("hidden");
      appTitle.textContent = "SZY Sport Shop - Admin Dashboard";
      headerUserIdDisplay.textContent = `User ID: ${currentUserId} (Data persistent locally)`;
      switchRoleBtn.textContent = "Switch to User";
      loadAdminProducts(); // Load products for admin view
      loadAdminOrders(); // Load orders for admin view
      setActiveAdminTab("products"); // Default to products tab
    }
  }

  // --- User Dashboard Functions ---

  function loadProducts() {
    renderProductCards(products); // Render from the in-memory 'products' array
  }

  // Helper function to render product cards
  function renderProductCards(productsArray) {
    productsList.innerHTML = ""; // Clear existing content
    if (productsArray.length === 0) {
      productsList.innerHTML =
        '<p class="col-span-full text-center text-gray-500">No products available.</p>';
      return;
    }

    productsArray.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";
      productCard.innerHTML = `
                <img src="${
                  product.imageUrl ||
                  "https://placehold.co/150x150/e0e0e0/000000?text=No+Image"
                }" alt="${product.name}" class="product-card-image">
                <div class="product-card-content">
                    <div>
                        <h3 class="product-card-title">${product.name}</h3>
                        <p class="product-card-description">${
                          product.description
                        }</p>
                    </div>
                    <div class="product-card-footer">
                        <p class="product-card-price">$${product.price.toFixed(
                          2
                        )}</p>
                        <button data-product-id="${
                          product.id
                        }" class="add-to-cart-button">
                            Add to Cart
                        </button>
                    </div>
                </div>
            `;
      productsList.appendChild(productCard);
    });

    // Add event listeners for "Add to Cart" buttons after rendering
    document.querySelectorAll(".add-to-cart-button").forEach((button) => {
      button.addEventListener("click", (e) => {
        const productId = e.target.dataset.productId;
        const productToAdd = products.find((p) => p.id === productId); // Find from in-memory array
        if (productToAdd) {
          addToCart(productToAdd);
        } else {
          console.warn(
            "Product not found in current data for add to cart:",
            productId
          );
        }
      });
    });
  }

  function addToCart(product) {
    const existingItemIndex = cart.findIndex((item) => item.id === product.id);
    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    renderCart();
    saveCartToLocalStorage(); // Save cart after modification
    showModal(`${product.name} added to cart!`);
  }

  function updateCartQuantity(productId, newQuantity) {
    const itemIndex = cart.findIndex((item) => item.id === productId);
    if (itemIndex > -1) {
      if (newQuantity > 0) {
        cart[itemIndex].quantity = newQuantity;
      } else {
        cart.splice(itemIndex, 1); // Remove if quantity is 0
      }
    }
    renderCart();
    saveCartToLocalStorage(); // Save cart after modification
  }

  function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    renderCart();
    saveCartToLocalStorage(); // Save cart after modification
    showModal("Item removed from cart.");
  }

  function renderCart() {
    cartItemsList.innerHTML = "";
    let total = 0;
    if (cart.length === 0) {
      cartItemsList.innerHTML =
        '<p class="text-gray-500 py-2">Cart is empty.</p>';
    } else {
      cart.forEach((item) => {
        total += item.price * item.quantity;
        const listItem = document.createElement("li");
        listItem.className = "cart-item-list-item";
        listItem.innerHTML = `
                    <div>
                        <p class="cart-item-name">${item.name}</p>
                        <p class="cart-item-details">$${item.price.toFixed(
                          2
                        )} x ${item.quantity}</p>
                    </div>
                    <div class="cart-item-controls">
                        <input type="number" min="1" value="${
                          item.quantity
                        }" data-product-id="${item.id}"
                            class="cart-quantity-input">
                        <button data-product-id="${
                          item.id
                        }" class="remove-from-cart-button">
                            Remove
                        </button>
                    </div>
                `;
        cartItemsList.appendChild(listItem);
      });
    }
    cartItemCount.textContent = cart.length;
    cartTotal.textContent = total.toFixed(2);

    // Add event listeners for cart quantity and remove buttons
    document.querySelectorAll(".cart-quantity-input").forEach((input) => {
      input.onchange = (e) =>
        updateCartQuantity(
          e.target.dataset.productId,
          parseInt(e.target.value)
        );
    });
    document.querySelectorAll(".remove-from-cart-button").forEach((button) => {
      button.onclick = (e) => removeFromCart(e.target.dataset.productId);
    });
  }

  async function placeOrder() {
    if (cart.length === 0) {
      showModal("Your cart is empty!");
      return;
    }

    showModal("Are you sure you want to place this order?", "confirm", () => {
      const order = {
        id: `order-${Date.now()}`, // Simple unique ID for order
        userId: currentUserId,
        items: cart.map((item) => ({
          productId: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        totalPrice: parseFloat(cartTotal.textContent),
        orderDate: new Date().toISOString(),
        status: "Pending", // Initial status
      };
      orders.push(order);
      saveOrdersToLocalStorage(); // Save orders after modification

      showModal("Order placed successfully! (Data saved locally)");
      cart = []; // Clear cart
      saveCartToLocalStorage();
      renderCart();
      cartDetails.classList.add("hidden");
      toggleCartBtn.textContent = "Show Cart";
    });
  }

  // --- Admin Dashboard Functions ---

  function setActiveAdminTab(tabName) {
    adminProductsTab.classList.remove("active-tab");
    adminOrdersTab.classList.remove("active-tab");
    adminProductsSection.classList.add("hidden");
    adminOrdersSection.classList.add("hidden");

    if (tabName === "products") {
      adminProductsTab.classList.add("active-tab");
      adminProductsSection.classList.remove("hidden");
      loadAdminProducts();
    } else if (tabName === "orders") {
      adminOrdersTab.classList.add("active-tab");
      adminOrdersSection.classList.remove("hidden");
      loadAdminOrders();
    }
  }

  function loadAdminProducts() {
    adminProductsTableBody.innerHTML = "";
    if (products.length === 0) {
      adminProductsTableBody.innerHTML =
        '<tr><td colspan="5" class="table-cell-center">No products found.</td></tr>';
      return;
    }

    const fragment = document.createDocumentFragment();
    products.forEach((product) => {
      const row = document.createElement("tr");
      row.setAttribute("data-product-id", product.id);
      row.innerHTML = `
                <td class="table-td">
                    <img src="${
                      product.imageUrl ||
                      "https://placehold.co/50x50/e0e0e0/000000?text=No+Image"
                    }" alt="${product.name}" class="table-image">
                </td>
                <td class="table-td">
                    <div class="table-text-medium product-name-display">${
                      product.name
                    }</div>
                </td>
                <td class="table-td">
                    <div class="table-text product-price-display">$${product.price.toFixed(
                      2
                    )}</div>
                </td>
                <td class="table-td table-description-cell">
                    <p class="line-clamp-2">${product.description}</p>
                </td>
                <td class="table-td table-actions-cell">
                    <button data-id="${product.id}" class="edit-product-btn">
                        Edit
                    </button>
                    <button data-id="${product.id}" class="delete-product-btn">
                        Delete
                    </button>
                </td>
            `;
      fragment.appendChild(row);
    });
    adminProductsTableBody.appendChild(fragment);

    adminProductsTableBody.removeEventListener(
      "click",
      handleAdminProductActions
    );
    adminProductsTableBody.addEventListener("click", handleAdminProductActions);
  }

  function handleAdminProductActions(e) {
    const target = e.target;
    const button = target.closest("button[data-id]");
    if (button) {
      const productId = button.dataset.id;
      if (button.classList.contains("edit-product-btn")) {
        editProduct(productId);
      } else if (button.classList.contains("delete-product-btn")) {
        deleteProduct(productId);
      }
    }
  }

  function addOrUpdateProduct(e) {
    e.preventDefault();
    const name = productNameInput.value;
    const price = parseFloat(productPriceInput.value);
    const description = productDescriptionInput.value;
    const imageUrl = productImageUrlInput.value;

    if (!name || isNaN(price) || !description || !imageUrl) {
      showModal("Please fill in all product fields correctly.");
      return;
    }

    const productData = { name, price, description, imageUrl };

    if (editingProductId) {
      const productIndex = products.findIndex((p) => p.id === editingProductId);
      if (productIndex !== -1) {
        showModal(`Confirm update for product "${name}"?`, "confirm", () => {
          products[productIndex] = {
            ...products[productIndex],
            ...productData,
          };
          saveProductsToLocalStorage();
          showModal("Product updated successfully!");
          resetProductForm();
          loadAdminProducts();
          loadProducts();
        });
      } else {
        showModal("Product not found for updating.");
      }
    } else {
      const newId = `prod-${Date.now()}`;
      const newProduct = { id: newId, ...productData };
      showModal(`Confirm add new product "${name}"?`, "confirm", () => {
        products.push(newProduct);
        saveProductsToLocalStorage();
        showModal("Product added successfully!");
        resetProductForm();
        loadAdminProducts();
        loadProducts();
      });
    }
  }

  function editProduct(id) {
    const productToEdit = products.find((p) => p.id === id);
    if (productToEdit) {
      editingProductId = id;
      productNameInput.value = productToEdit.name;
      productPriceInput.value = productToEdit.price;
      productDescriptionInput.value = productToEdit.description;
      productImageUrlInput.value = productToEdit.imageUrl;
      addUpdateProductBtn.textContent = "Update Product";
      cancelEditBtn.classList.remove("hidden");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      showModal("Product not found for editing.");
    }
  }

  function resetProductForm() {
    editingProductId = null;
    productForm.reset();
    productNameInput.value = "";
    productPriceInput.value = "";
    productDescriptionInput.value = "";
    productImageUrlInput.value = "";
    addUpdateProductBtn.textContent = "Add Product";
    cancelEditBtn.classList.add("hidden");
  }

  function deleteProduct(id) {
    showModal(
      "Are you sure you want to delete this product?",
      "confirm",
      () => {
        products = products.filter((p) => p.id !== id);
        saveProductsToLocalStorage();
        showModal("Product deleted successfully!");
        loadAdminProducts();
        loadProducts();
      }
    );
  }

  function loadAdminOrders() {
    adminOrdersTableBody.innerHTML = "";
    if (orders.length === 0) {
      adminOrdersTableBody.innerHTML =
        '<tr><td colspan="7" class="table-cell-center">No orders found.</td></tr>';
      return;
    }

    const sortedOrders = [...orders].sort((a, b) => {
      const dateA = new Date(a.orderDate);
      const dateB = new Date(b.orderDate);
      return dateB - dateA;
    });

    sortedOrders.forEach((order) => {
      const row = document.createElement("tr");
      row.setAttribute("data-order-id", order.id);
      const orderDate = new Date(order.orderDate).toLocaleString();
      const statusClass =
        {
          Pending: "pending",
          Shipped: "shipped",
          Delivered: "delivered",
          Cancelled: "cancelled",
        }[order.status] || "default";

      row.innerHTML = `
                <td class="table-td table-text-medium">${order.id}</td>
                <td class="table-td table-text">${order.userId}</td>
                <td class="table-td table-text">
                    <ul class="order-items-list">
                        ${order.items
                          .map(
                            (item) =>
                              `<li>${item.name} (x${
                                item.quantity
                              }) - $${item.price.toFixed(2)}</li>`
                          )
                          .join("")}
                    </ul>
                </td>
                <td class="table-td table-text-medium">$${order.totalPrice.toFixed(
                  2
                )}</td>
                <td class="table-td table-text">${orderDate}</td>
                <td class="table-td">
                    <span class="status-badge ${statusClass}" data-order-status-span="${
        order.id
      }">
                        ${order.status}
                    </span>
                </td>
                <td class="table-td table-actions-cell">
                    <select data-order-id="${
                      order.id
                    }" class="order-status-select">
                        <option value="Pending" ${
                          order.status === "Pending" ? "selected" : ""
                        }>Pending</option>
                        <option value="Shipped" ${
                          order.status === "Shipped" ? "selected" : ""
                        }>Shipped</option>
                        <option value="Delivered" ${
                          order.status === "Delivered" ? "selected" : ""
                        }>Delivered</option>
                        <option value="Cancelled" ${
                          order.status === "Cancelled" ? "selected" : ""
                        }>Cancelled</option>
                    </select>
                    <button data-id="${order.id}" class="delete-order-btn">
                        Delete
                    </button>
                </td>
            `;
      adminOrdersTableBody.appendChild(row);
    });

    adminOrdersTableBody.removeEventListener("change", handleOrderStatusChange);
    adminOrdersTableBody.addEventListener("change", handleOrderStatusChange);
    adminOrdersTableBody.removeEventListener(
      "click",
      handleAdminOrderButtonActions
    );
    adminOrdersTableBody.addEventListener(
      "click",
      handleAdminOrderButtonActions
    );
  }

  function handleAdminOrderButtonActions(e) {
    const target = e.target;
    const button = target.closest("button[data-id]");
    if (button && button.classList.contains("delete-order-btn")) {
      const orderId = button.dataset.id;
      deleteOrder(orderId);
    }
  }

  function deleteOrder(id) {
    showModal("Are you sure you want to delete this order?", "confirm", () => {
      orders = orders.filter((order) => order.id !== id);
      saveOrdersToLocalStorage();
      showModal("Order deleted successfully!");
      loadAdminOrders();
    });
  }

  function handleOrderStatusChange(e) {
    const target = e.target;
    if (target.classList.contains("order-status-select")) {
      const orderId = target.dataset.orderId;
      const newStatus = target.value;
      updateOrderStatus(orderId, newStatus, target);
    }
  }

  function updateOrderStatus(orderId, newStatus, selectElement) {
    showModal(
      `Change status of order ${orderId} to "${newStatus}"?`,
      "confirm",
      () => {
        const orderIndex = orders.findIndex((o) => o.id === orderId);
        if (orderIndex !== -1) {
          orders[orderIndex].status = newStatus;
          saveOrdersToLocalStorage();
          showModal(`Order ${orderId} status updated to ${newStatus}.`);
          loadAdminOrders();
        } else {
          showModal("Order not found.");
        }
      },
      () => {
        loadAdminOrders();
      }
    );
  }

  switchRoleBtn.addEventListener("click", () => {
    if (currentRole === "user") {
      showModal(
        "Enter admin password:",
        "input", // Custom type to indicate input needed
        (enteredPassword) => {
          // onConfirm callback
          if (enteredPassword === ADMIN_PASSWORD) {
            setRole("admin");
          } else {
            showModal("Incorrect password. Access denied.", "alert");
          }
        },
        () => {
          console.log("Admin password entry cancelled.");
        },
        true // showInput = true
      );
    } else {
      setRole("user");
    }
  });

  toggleCartBtn.addEventListener("click", () => {
    const isHidden = cartDetails.classList.contains("hidden");
    if (isHidden) {
      cartDetails.classList.remove("hidden");
      toggleCartBtn.textContent = "Hide Cart";
    } else {
      cartDetails.classList.add("hidden");
      toggleCartBtn.textContent = "Show Cart";
    }
  });

  placeOrderBtn.addEventListener("click", placeOrder);

  adminProductsTab.addEventListener("click", () =>
    setActiveAdminTab("products")
  );
  adminOrdersTab.addEventListener("click", () => setActiveAdminTab("orders"));

  productForm.addEventListener("submit", addOrUpdateProduct);
  cancelEditBtn.addEventListener("click", resetProductForm);
  clearLocalDataBtn.addEventListener("click", clearAllLocalData);

  document.getElementById("current-year").textContent =
    new Date().getFullYear();

  loadProductsFromLocalStorage();
  loadCartFromLocalStorage();
  loadOrdersFromLocalStorage();

  setRole("user");
};
