import React, { useEffect, useState } from "react";
import axios from "axios";

function CartPage() {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    // Obtener el carrito de compras desde el servidor
    const fetchCart = async () => {
      try {
        const response = await axios.get("/api/cart");
        setCart(response.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);

  const handleCheckout = async () => {
    try {
      await axios.post("/api/cart/checkout");
      // Actualizar el estado del carrito después del checkout
      setCart(null);
      alert("Compra procesada exitosamente");
    } catch (error) {
      console.error("Error processing checkout:", error);
      alert("Error al procesar la compra");
    }
  };

  if (!cart) {
    return <div>El carrito está vacío.</div>;
  }

  return (
    <div>
      <h2>Carrito de Compras</h2>
      <ul>
        {cart.items.map((item) => (
          <li key={item.productId}>
            {item.productId} - Cantidad: {item.quantity}
          </li>
        ))}
      </ul>
      <button onClick={handleCheckout}>Procesar Compra</button>
    </div>
  );
}

export default CartPage;
