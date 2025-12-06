// Configuración base de la API
const API_URL = "http://localhost:3000/"; // Cambia esto según tu backend

// Helper para manejar respuestas
const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    throw {
      status: response.status,
      message: data.message || "Error en la petición",
    };
  }

  return data;
};

// Servicio de autenticación
export const authService = {
  // Login
  login: async (email, password) => {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    return handleResponse(response);
  },

  // Registro
  register: async (userData) => {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    return handleResponse(response);
  },

  // Logout
  logout: () => {
    localStorage.removeItem("token");
  },

  // Obtener token
  getToken: () => {
    return localStorage.getItem("token");
  },
};

// Servicio de productos
export const productService = {
  // Obtener todos los productos
  getProducts: async () => {
    const token = authService.getToken();

    const response = await fetch(`${API_URL}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Si tu backend usa tokens
      },
    });

    return handleResponse(response);
  },

  // Crear producto (para proveedores)
  createProduct: async (productData) => {
    const token = authService.getToken();

    const response = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });

    return handleResponse(response);
  },
};

// Servicio de pedidos
export const orderService = {
  // Crear pedido
  createOrder: async (orderData) => {
    const token = authService.getToken();

    const response = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });

    return handleResponse(response);
  },

  // Obtener mis pedidos
  getMyOrders: async () => {
    const token = authService.getToken();

    const response = await fetch(`${API_URL}/orders/my-orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return handleResponse(response);
  },
};
