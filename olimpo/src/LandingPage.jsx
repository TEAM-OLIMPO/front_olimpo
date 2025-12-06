import React, { useState } from "react";
import "./LandingPage.css";

const LandingPage = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login exitoso
        console.log("Login exitoso:", data);

        // Guardar token si tu backend lo envía
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        // Cerrar modal y navegar al dashboard
        setIsLoginOpen(false);
        if (props.onLogin) {
          props.onLogin();
        }
      } else {
        // Error del servidor (credenciales incorrectas, etc)
        alert(data.message || "Error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("No se pudo conectar con el servidor");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="header">
        <nav className="nav-container">
          <div className="nav-content">
            {/* Logo */}
            <div className="logo">
              <div className="logo-icon">🌱</div>
              <span className="logo-text">SaveFood</span>
            </div>

            {/* Desktop Navigation */}
            <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
              <a href="#features" onClick={() => setIsMenuOpen(false)}>
                Características
              </a>
              <a href="#pricing" onClick={() => setIsMenuOpen(false)}>
                Precios
              </a>
              <a href="#about" onClick={() => setIsMenuOpen(false)}>
                Nosotros
              </a>
              <button
                onClick={() => {
                  setIsLoginOpen(true);
                  setIsMenuOpen(false);
                }}
                className="btn-login"
              >
                Iniciar Sesión
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="menu-toggle"
            >
              {isMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="badge">
              ♻️ Nuevo: Ayuda a reducir el desperdicio de alimentos
            </div>

            <h1 className="hero-title">
              Comida fresca a
              <span className="gradient-text"> precios increíbles</span>
            </h1>

            <p className="hero-description">
              Conectamos usuarios con supermercados para rescatar alimentos
              perfectamente buenos que están por vencer. Ahorra dinero y ayuda
              al planeta.
            </p>

            <div className="hero-buttons">
              <button className="btn-primary" onClick={props.onRegister}>
                Comenzar Gratis →
              </button>
              <button
                className="btn-secondary"
                onClick={() => setIsLoginOpen(true)}
              >
                Iniciar Sesión
              </button>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="features-grid" id="features">
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Ahorra Dinero</h3>
              <p>Descuentos de hasta 70% en productos frescos de calidad</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌍</div>
              <h3>Ayuda al Planeta</h3>
              <p>Reduce el desperdicio de alimentos y tu huella de carbono</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛒</div>
              <h3>Fácil y Rápido</h3>
              <p>Compra en minutos y recoge en el supermercado cercano</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing" id="pricing">
        <div className="container">
          <h2 className="section-title">
            Precios <span className="gradient-text">Simples</span>
          </h2>

          <div className="pricing-grid">
            <div className="pricing-card">
              <h3>Básico</h3>
              <div className="price">
                <span className="amount">$9</span>
                <span className="period">/mes</span>
              </div>
              <ul className="features-list">
                <li>✓ 5 Usuarios</li>
                <li>✓ 10GB Almacenamiento</li>
                <li>✓ Soporte Email</li>
                <li>✓ Updates Básicos</li>
              </ul>
              <button className="btn-plan">Comenzar</button>
            </div>

            <div className="pricing-card popular">
              <div className="popular-badge">MÁS POPULAR</div>
              <h3>Pro</h3>
              <div className="price">
                <span className="amount">$29</span>
                <span className="period">/mes</span>
              </div>
              <ul className="features-list">
                <li>✓ 20 Usuarios</li>
                <li>✓ 100GB Almacenamiento</li>
                <li>✓ Soporte Prioritario</li>
                <li>✓ Updates Avanzados</li>
                <li>✓ API Access</li>
              </ul>
              <button className="btn-plan">Comenzar</button>
            </div>

            <div className="pricing-card">
              <h3>Enterprise</h3>
              <div className="price">
                <span className="amount">$99</span>
                <span className="period">/mes</span>
              </div>
              <ul className="features-list">
                <li>✓ Usuarios Ilimitados</li>
                <li>✓ Almacenamiento Ilimitado</li>
                <li>✓ Soporte 24/7</li>
                <li>✓ Updates Premium</li>
                <li>✓ Customización</li>
              </ul>
              <button className="btn-plan">Comenzar</button>
            </div>
          </div>
        </div>
      </section>

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="modal-overlay" onClick={() => setIsLoginOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Iniciar Sesión</h2>
              <button
                onClick={() => setIsLoginOpen(false)}
                className="close-button"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label>Contraseña</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>Recordarme</span>
                </label>
                <a href="#" className="forgot-password">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <button type="submit" className="btn-submit" disabled={isLoading}>
                {isLoading ? "Cargando..." : "Ingresar"}
              </button>

              <div className="signup-link">
                ¿No tienes cuenta?{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    props.onRegister();
                  }}
                >
                  Regístrate
                </a>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 SaveFood. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
