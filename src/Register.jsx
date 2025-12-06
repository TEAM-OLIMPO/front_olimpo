import React, { useState } from "react";
import "./Register.css";
import { authService } from "./apiService";

const Register = ({ onBack, onRegisterSuccess }) => {
  const [userType, setUserType] = useState(""); // 'customer' or 'provider'
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    // Provider specific fields
    businessName: "",
    businessAddress: "",
    rfc: "",
    licenseNumber: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    setIsLoading(true);

    try {
      let response;

      // Preparar datos según el tipo de usuario
      if (userType === "customer") {
        // Registro de comprador (buyer)
        const buyerData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
        };

        response = await authService.registerBuyer(buyerData);
      } else {
        // Registro de vendedor (provider/vendor)
        const vendorData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          businessName: formData.businessName,
          businessAddress: formData.businessAddress,
          rfc: formData.rfc,
          licenseNumber: formData.licenseNumber,
        };

        response = await authService.registerVendor(vendorData);
      }

      // Registro exitoso
      console.log("Registro exitoso:", response);
      alert(
        `¡Registro exitoso como ${
          userType === "customer" ? "Usuario" : "Proveedor"
        }!`
      );

      // Guardar token si viene en la respuesta
      if (response.token) {
        localStorage.setItem("token", response.token);
      }

      if (onRegisterSuccess) {
        onRegisterSuccess();
      }
    } catch (error) {
      console.error("Error en registro:", error);
      alert(error.message || "Error al registrarse. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-header">
          <button onClick={onBack} className="back-button">
            ← Volver
          </button>
          <div className="logo-section">
            <div className="logo-icon">🌱</div>
            <span className="logo-text">SaveFood</span>
          </div>
          <h1>Crear Cuenta</h1>
          <p>
            Únete a nuestra comunidad y ayuda a reducir el desperdicio de
            alimentos
          </p>
        </div>

        {!userType ? (
          <div className="user-type-selection">
            <h2>¿Cómo quieres registrarte?</h2>
            <div className="type-cards">
              <div
                className="type-card"
                onClick={() => setUserType("customer")}
              >
                <div className="type-icon">🛒</div>
                <h3>Soy Usuario</h3>
                <p>
                  Quiero comprar productos con descuento y ayudar al planeta
                </p>
                <ul className="benefits-list">
                  <li>✓ Descuentos hasta 70%</li>
                  <li>✓ Productos frescos de calidad</li>
                  <li>✓ Contribuye al medio ambiente</li>
                  <li>✓ Recoge en tiendas cercanas</li>
                </ul>
                <button className="btn-select">Registrarme como Usuario</button>
              </div>

              <div
                className="type-card"
                onClick={() => setUserType("provider")}
              >
                <div className="type-icon">🏪</div>
                <h3>Soy Proveedor</h3>
                <p>
                  Tengo un supermercado/tienda y quiero vender productos
                  próximos a vencer
                </p>
                <ul className="benefits-list">
                  <li>✓ Reduce pérdidas económicas</li>
                  <li>✓ Evita desperdicios</li>
                  <li>✓ Llega a más clientes</li>
                  <li>✓ Imagen responsable</li>
                </ul>
                <button className="btn-select">
                  Registrarme como Proveedor
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="registration-form">
            <div className="form-type-badge">
              {userType === "customer"
                ? "🛒 Registro de Usuario"
                : "🏪 Registro de Proveedor"}
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-section">
                <h3>Información Personal</h3>

                <div className="form-row">
                  <div className="form-group">
                    <label>Nombre Completo *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Juan Pérez"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Teléfono *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+52 123 456 7890"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Correo Electrónico *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="tu@email.com"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Contraseña *</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Confirmar Contraseña *</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
              </div>

              {userType === "provider" && (
                <div className="form-section">
                  <h3>Información del Negocio</h3>

                  <div className="form-group">
                    <label>Nombre del Negocio *</label>
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      placeholder="Supermercado Central"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Dirección del Negocio *</label>
                    <input
                      type="text"
                      name="businessAddress"
                      value={formData.businessAddress}
                      onChange={handleInputChange}
                      placeholder="Calle Principal #123, Col. Centro"
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>RFC *</label>
                      <input
                        type="text"
                        name="rfc"
                        value={formData.rfc}
                        onChange={handleInputChange}
                        placeholder="ABC123456XYZ"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Licencia Sanitaria</label>
                      <input
                        type="text"
                        name="licenseNumber"
                        value={formData.licenseNumber}
                        onChange={handleInputChange}
                        placeholder="LS-12345678"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="form-actions">
                <button
                  type="button"
                  className="btn-back"
                  onClick={() => setUserType("")}
                >
                  ← Cambiar Tipo de Cuenta
                </button>
                <button
                  type="submit"
                  className="btn-submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
                </button>
              </div>
            </form>

            <div className="login-link">
              ¿Ya tienes cuenta?{" "}
              <a href="#" onClick={onBack}>
                Inicia sesión
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
