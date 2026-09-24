
import { useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "Premium Headphones",
    price: 129,
    category: "Audio",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    price: 199,
    category: "Wearables",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Nike Running Shoes",
    price: 149,
    category: "Shoes",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Modern Backpack",
    price: 89,
    category: "Bags",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Wireless Speaker",
    price: 99,
    category: "Audio",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Classic Sneakers",
    price: 119,
    category: "Shoes",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
  },
];

function App() {
  const [page, setPage] = useState("home");

  const [cart, setCart] = useState([]);

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [showAuth, setShowAuth] = useState(false);

  const [authMode, setAuthMode] = useState("signup");

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [menuOpen, setMenuOpen] = useState(false);

  // ADD TO CART
  const addToCart = (product) => {
    // User login nahi hai
    if (!user) {
      setSelectedProduct(product);
      setAuthMode("signup");
      setShowAuth(true);
      return;
    }

    setCart([...cart, product]);
  };

  // SIGNUP
  const handleSignup = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const newUser = {
      name: form.get("name"),
      email: form.get("email"),
    };

    localStorage.setItem("user", JSON.stringify(newUser));

    setUser(newUser);
    setShowAuth(false);

    // Signup ke baad selected product automatically cart mein
    if (selectedProduct) {
      setCart([...cart, selectedProduct]);
      setSelectedProduct(null);
    }
  };

  // LOGIN
  const handleLogin = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const loginUser = {
      name: "Customer",
      email: form.get("email"),
    };

    localStorage.setItem("user", JSON.stringify(loginUser));

    setUser(loginUser);
    setShowAuth(false);

    if (selectedProduct) {
      setCart([...cart, selectedProduct]);
      setSelectedProduct(null);
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setCart([]);
    setPage("home");
  };

  // REMOVE CART ITEM
  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const categories = [
    "All",
    "Audio",
    "Wearables",
    "Shoes",
    "Bags",
  ];

  const filteredProducts = products.filter((product) => {
    const searchMatch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const categoryMatch =
      category === "All" || product.category === category;

    return searchMatch && categoryMatch;
  });

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="app">

      {/* ================= NAVBAR ================= */}

      <header className="navbar">

        <div
          className="logo"
          onClick={() => setPage("home")}
        >
          TALHA<span>Waseem</span>
        </div>

        <nav className={menuOpen ? "nav active" : "nav"}>

          <button onClick={() => setPage("home")}>
            Home
          </button>

          <button onClick={() => setPage("shop")}>
            Shop
          </button>

          <button onClick={() => setPage("categories")}>
            Categories
          </button>

          <button onClick={() => setPage("deals")}>
            Deals
          </button>

        </nav>

        <div className="nav-right">

          <div className="search">
            🔍
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {user ? (
            <div className="user-box">
              <span className="avatar">
                {user.name?.charAt(0).toUpperCase()}
              </span>

              <span className="username">
                {user.name}
              </span>

              <button onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <button
              className="login-btn"
              onClick={() => {
                setAuthMode("login");
                setShowAuth(true);
              }}
            >
              Login
            </button>
          )}

          <button
            className="cart-icon"
            onClick={() => setPage("cart")}
          >
            🛒
            <span>{cart.length}</span>
          </button>

          <button
            className="menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

        </div>

      </header>

      {/* ================= HOME ================= */}

      {page === "home" && (
        <>

          <section className="hero">

            <div className="hero-content">

              <span className="eyebrow">
                PREMIUM ONLINE STORE
              </span>

              <h1>
                Everything You Need.
                <span> One Place.</span>
              </h1>

              <p>
                Discover premium technology, fashion and
                lifestyle products designed for modern living.
              </p>

              <button
                className="main-btn"
                onClick={() => setPage("shop")}
              >
                Start Shopping →
              </button>

            </div>

            <div className="hero-product">

              <div className="circle"></div>

              <div className="hero-card">
                🎧
              </div>

              <div className="floating-box">
                ⭐ 4.9 Rating
              </div>

            </div>

          </section>

          {/* DASHBOARD CARDS */}

          <section className="dashboard">

            <div className="dashboard-title">
              <span>STORE DASHBOARD</span>
              <h2>Explore Our Store</h2>
            </div>

            <div className="dashboard-grid">

              <div
                className="dashboard-card purple"
                onClick={() => setPage("shop")}
              >
                <span>🛍️</span>
                <h3>Shop Products</h3>
                <p>Explore our latest products.</p>
                <strong>View Products →</strong>
              </div>

              <div
                className="dashboard-card blue"
                onClick={() => setPage("categories")}
              >
                <span>📦</span>
                <h3>Categories</h3>
                <p>Find products by category.</p>
                <strong>Browse Categories →</strong>
              </div>

              <div
                className="dashboard-card pink"
                onClick={() => setPage("deals")}
              >
                <span>🔥</span>
                <h3>Today's Deals</h3>
                <p>Check our latest discounts.</p>
                <strong>See Deals →</strong>
              </div>

              <div
                className="dashboard-card green"
                onClick={() => setPage("cart")}
              >
                <span>🛒</span>
                <h3>Your Cart</h3>
                <p>{cart.length} items in your cart.</p>
                <strong>Open Cart →</strong>
              </div>

            </div>

          </section>

          {/* FEATURED PRODUCTS */}

          <section className="products">

            <div className="section-heading">
              <div>
                <span>POPULAR PRODUCTS</span>
                <h2>Trending Now</h2>
              </div>

              <button onClick={() => setPage("shop")}>
                View All →
              </button>
            </div>

            <div className="product-grid">

              {products.slice(0, 4).map((product) => (

                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                />

              ))}

            </div>

          </section>

        </>
      )}

      {/* ================= SHOP ================= */}

      {page === "shop" && (

        <section className="products page">

          <div className="section-heading">
            <div>
              <span>OUR COLLECTION</span>
              <h2>All Products</h2>
            </div>
          </div>

          <div className="filters">

            {categories.map((item) => (

              <button
                className={category === item ? "active" : ""}
                key={item}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>

            ))}

          </div>

          <div className="product-grid">

            {filteredProducts.map((product) => (

              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />

            ))}

          </div>

        </section>

      )}

      {/* ================= CATEGORIES ================= */}

      {page === "categories" && (

        <section className="category-page">

          <span>EXPLORE</span>
          <h2>Shop By Category</h2>

          <div className="category-grid">

            {categories.slice(1).map((item) => (

              <div
                className="category-box"
                key={item}
                onClick={() => {
                  setCategory(item);
                  setPage("shop");
                }}
              >
                <div>
                  {item === "Audio" && "🎧"}
                  {item === "Wearables" && "⌚"}
                  {item === "Shoes" && "👟"}
                  {item === "Bags" && "🎒"}
                </div>

                <h3>{item}</h3>

                <p>
                  Explore {item} products
                </p>

              </div>

            ))}

          </div>

        </section>

      )}

      {/* ================= DEALS ================= */}

      {page === "deals" && (

        <section className="products page">

          <div className="deal-banner">

            <span>LIMITED OFFER</span>

            <h2>
              Up to <strong>50% OFF</strong>
            </h2>

            <p>
              Grab today's special deals before they're gone.
            </p>

          </div>

          <div className="product-grid">

            {products.map((product) => (

              <ProductCard
                key={product.id}
                product={{
                  ...product,
                  price: Math.round(product.price * 0.5),
                }}
                addToCart={addToCart}
              />

            ))}

          </div>

        </section>

      )}

      {/* ================= CART ================= */}

      {page === "cart" && (

        <section className="cart-page">

          <div className="section-heading">
            <div>
              <span>YOUR SHOPPING BAG</span>
              <h2>Shopping Cart</h2>
            </div>
          </div>

          {cart.length === 0 ? (

            <div className="empty-cart">

              <div>🛒</div>

              <h2>Your cart is empty</h2>

              <p>
                Add some products to your cart.
              </p>

              <button
                className="main-btn"
                onClick={() => setPage("shop")}
              >
                Start Shopping
              </button>

            </div>

          ) : (

            <div className="cart-container">

              <div className="cart-items">

                {cart.map((item, index) => (

                  <div
                    className="cart-item"
                    key={index}
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <div>
                      <span>{item.category}</span>
                      <h3>{item.name}</h3>
                      <strong>
                        ${item.price}
                      </strong>
                    </div>

                    <button
                      onClick={() =>
                        removeFromCart(index)
                      }
                    >
                      Remove
                    </button>

                  </div>

                ))}

              </div>

              <div className="cart-summary">

                <h3>Order Summary</h3>

                <div>
                  <span>Items</span>
                  <strong>{cart.length}</strong>
                </div>

                <div>
                  <span>Subtotal</span>
                  <strong>${total}</strong>
                </div>

                <div>
                  <span>Shipping</span>
                  <strong>FREE</strong>
                </div>

                <hr />

                <div className="total">
                  <span>Total</span>
                  <strong>${total}</strong>
                </div>

                <button className="checkout">
                  Proceed to Checkout →
                </button>

              </div>

            </div>

          )}

        </section>

      )}

      {/* ================= AUTH MODAL ================= */}

      {showAuth && (

        <div className="modal-overlay">

          <div className="auth-modal">

            <button
              className="close"
              onClick={() => setShowAuth(false)}
            >
              ×
            </button>

            <div className="auth-logo">
              NEX<span>ORA</span>
            </div>

            {authMode === "signup" ? (

              <>
                <h2>Create Account</h2>

                <p>
                  Create an account to add products
                  to your shopping cart.
                </p>

                <form onSubmit={handleSignup}>

                  <input
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    required
                  />

                  <input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    required
                  />

                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                  />

                  <button type="submit">
                    Create Account
                  </button>

                </form>

                <div className="switch-auth">
                  Already have an account?

                  <button
                    onClick={() => setAuthMode("login")}
                  >
                    Login
                  </button>
                </div>
              </>

            ) : (

              <>
                <h2>Welcome Back</h2>

                <p>
                  Login to continue shopping.
                </p>

                <form onSubmit={handleLogin}>

                  <input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    required
                  />

                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                  />

                  <button type="submit">
                    Login
                  </button>

                </form>

                <div className="switch-auth">
                  Don't have an account?

                  <button
                    onClick={() => setAuthMode("signup")}
                  >
                    Sign Up
                  </button>
                </div>
              </>

            )}

          </div>

        </div>

      )}

      {/* ================= FOOTER ================= */}

      <footer>

        <div>
          <div className="logo">
            TALHA<span>Waseem</span>
          </div>

          <p>
            Premium products for modern lifestyles.
          </p>
        </div>

        <div className="footer-links">

          <a href="#home">Home</a>
          <a href="#shop">Shop</a>
          <a href="#categories">Categories</a>
          <a href="#contact">Contact</a>

        </div>

      </footer>

    </div>
  );
}


// PRODUCT CARD

function ProductCard({ product, addToCart }) {

  return (

    <article className="product-card">

      <div className="product-image">

        <img
          src={product.image}
          alt={product.name}
        />

        <span className="sale">
          SALE
        </span>

        <button className="heart">
          ♡
        </button>

        <button
          className="quick-add"
          onClick={() => addToCart(product)}
        >
          Add To Cart +
        </button>

      </div>

      <div className="product-info">

        <span>{product.category}</span>

        <h3>{product.name}</h3>

        <div className="rating">
          ★★★★★
        </div>

        <div className="price">
          ${product.price}

          <button
            onClick={() => addToCart(product)}
          >
            +
          </button>
        </div>

      </div>

    </article>
  );
}

export default App;