import React, { useState } from "react";
import "./Dashboard.css";

const Dashboard = ({ onLogout }) => {
  const [selectedOption, setSelectedOption] = useState("browse");
  const [cart, setCart] = useState([]);
  const [myOrders, setMyOrders] = useState([
    {
      id: 1,
      store: "Supermercado Central",
      date: "2024-12-05",
      items: 2,
      total: 45.0,
      status: "Entregado",
      saved: 60,
    },
    {
      id: 2,
      store: "Frutas y Verduras Del Campo",
      date: "2024-12-03",
      items: 3,
      total: 28.5,
      status: "En camino",
      saved: 75,
    },
  ]);

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Pan Integral",
      store: "Panadería La Espiga",
      originalPrice: 35.0,
      discountPrice: 15.0,
      discount: 57,
      expiresIn: "Hoy",
      category: "Panadería",
      image: "🍞",
      stock: 8,
    },
    {
      id: 2,
      name: "Frutas Mixtas (1kg)",
      store: "Frutas Del Campo",
      originalPrice: 60.0,
      discountPrice: 20.0,
      discount: 67,
      expiresIn: "Mañana",
      category: "Frutas",
      image: "🍎",
      stock: 5,
    },
    {
      id: 3,
      name: "Yogurt Natural (Pack x6)",
      store: "Lácteos Premium",
      originalPrice: 80.0,
      discountPrice: 35.0,
      discount: 56,
      expiresIn: "2 días",
      category: "Lácteos",
      image: "🥛",
      stock: 12,
    },
    {
      id: 4,
      name: "Verduras Frescas (Bolsa)",
      store: "Mercado Orgánico",
      originalPrice: 50.0,
      discountPrice: 18.0,
      discount: 64,
      expiresIn: "Hoy",
      category: "Verduras",
      image: "🥬",
      stock: 6,
    },
    {
      id: 5,
      name: "Pollo Fresco (500g)",
      store: "Carnicería San Miguel",
      originalPrice: 85.0,
      discountPrice: 40.0,
      discount: 53,
      expiresIn: "Hoy",
      category: "Carnes",
      image: "🍗",
      stock: 4,
    },
    {
      id: 6,
      name: "Galletas Artesanales",
      store: "Panadería La Espiga",
      originalPrice: 45.0,
      discountPrice: 20.0,
      discount: 56,
      expiresIn: "3 días",
      category: "Panadería",
      image: "🍪",
      stock: 15,
    },
  ]);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(
        cart.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.discountPrice * item.quantity,
    0
  );
  const totalSaved = cart.reduce(
    (sum, item) =>
      sum + (item.originalPrice - item.discountPrice) * item.quantity,
    0
  );

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">🌱</div>
            <span className="logo-text">Olimpo</span>
          </div>

          <div className="user-section">
            <button
              className="cart-button"
              onClick={() => setSelectedOption("cart")}
            >
              🛒 Carrito {cart.length > 0 && `(${cart.length})`}
            </button>
            <span className="user-name">Bienvenido, Usuario</span>
            <button onClick={onLogout} className="btn-logout">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="dashboard-container">
        {/* Sidebar Menu */}
        <aside className="sidebar">
          <nav className="menu">
            <button
              className={`menu-item ${
                selectedOption === "browse" ? "active" : ""
              }`}
              onClick={() => setSelectedOption("browse")}
            >
              <span className="menu-icon">🛍️</span>
              <span>Explorar Productos</span>
            </button>
            <button
              className={`menu-item ${
                selectedOption === "cart" ? "active" : ""
              }`}
              onClick={() => setSelectedOption("cart")}
            >
              <span className="menu-icon">🛒</span>
              <span>Mi Carrito</span>
              {cart.length > 0 && <span className="badge">{cart.length}</span>}
            </button>
            <button
              className={`menu-item ${
                selectedOption === "orders" ? "active" : ""
              }`}
              onClick={() => setSelectedOption("orders")}
            >
              <span className="menu-icon">📦</span>
              <span>Mis Pedidos</span>
            </button>
          </nav>

          {/* Impact Card */}
          <div className="stats-card impact-card">
            <h3>Tu Impacto 🌍</h3>
            <div className="stat-item">
              <span className="stat-label">Comida rescatada</span>
              <span className="stat-value">12.5 kg</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Dinero ahorrado</span>
              <span className="stat-value success">$380</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Pedidos realizados</span>
              <span className="stat-value">8</span>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="content-area">
          {selectedOption === "browse" && (
            <div className="browse-section">
              <div className="section-header">
                <h2>Productos Disponibles</h2>
                <p>Comida fresca a punto de vencer con descuentos increíbles</p>
              </div>

              <div className="impact-banner">
                <span className="banner-icon">♻️</span>
                <div className="banner-content">
                  <h3>Ayuda a reducir el desperdicio de alimentos</h3>
                  <p>
                    Cada compra salva comida perfectamente buena de terminar en
                    la basura
                  </p>
                </div>
              </div>

              <div className="products-grid">
                {products.map((product) => (
                  <div key={product.id} className="product-card">
                    <div className="product-badge urgent">
                      ⏰ Vence {product.expiresIn}
                    </div>
                    <div className="product-image">{product.image}</div>
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <p className="store-name">📍 {product.store}</p>
                      <div className="price-section">
                        <span className="original-price">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                        <span className="discount-price">
                          ${product.discountPrice.toFixed(2)}
                        </span>
                        <span className="discount-badge">
                          -{product.discount}%
                        </span>
                      </div>
                      <p className="stock-info">
                        📦 {product.stock} disponibles
                      </p>
                      <button
                        className="btn-add-cart"
                        onClick={() => addToCart(product)}
                      >
                        Agregar al Carrito
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedOption === "cart" && (
            <div className="cart-section">
              <div className="section-header">
                <h2>Mi Carrito</h2>
                <p>Revisa tus productos antes de confirmar</p>
              </div>

              {cart.length === 0 ? (
                <div className="empty-cart">
                  <div className="empty-icon">🛒</div>
                  <h3>Tu carrito está vacío</h3>
                  <p>Explora productos y comienza a rescatar comida</p>
                  <button
                    className="btn-browse"
                    onClick={() => setSelectedOption("browse")}
                  >
                    Explorar Productos
                  </button>
                </div>
              ) : (
                <>
                  <div className="cart-items">
                    {cart.map((item) => (
                      <div key={item.id} className="cart-item">
                        <div className="item-image">{item.image}</div>
                        <div className="item-details">
                          <h4>{item.name}</h4>
                          <p className="item-store">{item.store}</p>
                          <p className="item-expires">Vence {item.expiresIn}</p>
                        </div>
                        <div className="item-quantity">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                        <div className="item-price">
                          <span className="item-total">
                            ${(item.discountPrice * item.quantity).toFixed(2)}
                          </span>
                          <span className="item-saved">
                            Ahorras $
                            {(
                              (item.originalPrice - item.discountPrice) *
                              item.quantity
                            ).toFixed(2)}
                          </span>
                        </div>
                        <button
                          className="btn-remove"
                          onClick={() => removeFromCart(item.id)}
                        >
                          🗑️
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="cart-summary">
                    <div className="summary-row">
                      <span>Subtotal:</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="summary-row impact">
                      <span>💰 Total Ahorrado:</span>
                      <span className="saved-amount">
                        ${totalSaved.toFixed(2)}
                      </span>
                    </div>
                    <div className="summary-row total">
                      <span>Total a Pagar:</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <button className="btn-checkout">Confirmar Pedido</button>
                  </div>
                </>
              )}
            </div>
          )}

          {selectedOption === "orders" && (
            <div className="orders-section">
              <div className="section-header">
                <h2>Mis Pedidos</h2>
                <p>Historial de tus compras y entregas</p>
              </div>

              <div className="orders-list">
                {myOrders.map((order) => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <div>
                        <h3>Pedido #{order.id}</h3>
                        <p className="order-store">📍 {order.store}</p>
                      </div>
                      <span
                        className={`order-status ${
                          order.status === "Entregado" ? "delivered" : "pending"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div className="order-details">
                      <div className="order-info">
                        <span>📅 {order.date}</span>
                        <span>📦 {order.items} productos</span>
                        <span>💰 ${order.total.toFixed(2)}</span>
                      </div>
                      <div className="order-impact">
                        <span className="impact-badge">
                          🌱 Ahorraste {order.saved}% y evitaste desperdicio
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
