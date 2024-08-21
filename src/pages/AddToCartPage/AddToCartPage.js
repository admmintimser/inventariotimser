import React, { useEffect, useState } from "react";
import axios from "axios";

function AddToCartPage() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Obtener todos los productos desde el servidor
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/inventories");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async () => {
    try {
      await axios.post("/api/cart/add", {
        productId: selectedProduct,
        quantity: parseInt(quantity),
      });
      alert("Producto agregado al carrito");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Error al agregar al carrito");
    }
  };

  return (
    <div>
      <h2>Agregar Productos al Carrito</h2>
      <div>
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
        >
          <option value="">Seleccione un producto</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.descripcion}
            </option>
          ))}
        </select>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button onClick={handleAddToCart}>Agregar al Carrito</button>
      </div>
    </div>
  );
}

export default AddToCartPage;
