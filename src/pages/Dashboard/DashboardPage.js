import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DashboardPage.scss";

function DashboardPage() {
  const [mostStockProduct, setMostStockProduct] = useState(null);
  const [aboutToRunOutProducts, setAboutToRunOutProducts] = useState([]);
  const [totalStockAndCapacity, setTotalStockAndCapacity] = useState({});
  const [topSupplier, setTopSupplier] = useState(null);
  const [mostActiveArea, setMostActiveArea] = useState(null);

  const API_URL = "https://apiwebinventariotimser.azurewebsites.net/api";
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const mostStockProductRes = await axios.get(`${API_URL}/dashboard/product-most-stock`);
     setMostStockProduct(mostStockProductRes.data);

     const aboutToRunOutProductsRes = await axios.get(`${API_URL}/dashboard/products-about-to-run-out`);
     setAboutToRunOutProducts(aboutToRunOutProductsRes.data);

     const totalStockAndCapacityRes = await axios.get(`${API_URL}/dashboard/total-stock-and-test-capacity`);
     setTotalStockAndCapacity(totalStockAndCapacityRes.data);

        const topSupplierRes = await axios.get(`${API_URL}/dashboard/top-supplier`);
        setTopSupplier(topSupplierRes.data);

        const mostActiveAreaRes = await axios.get(`${API_URL}/dashboard/area-most-entries`);
        setMostActiveArea(mostActiveAreaRes.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="dashboard__section">
        <h2>Producto con más stock</h2>
        {mostStockProduct ? (
          <p>{mostStockProduct.descripcion} - {mostStockProduct.cantidadDisponible} unidades</p>
        ) : (
          <p>No se pudo cargar la información o no hay datos disponibles.</p>
        )}
      </div>

      <div className="dashboard__section">
        <h2>Productos por agotarse</h2>
        {aboutToRunOutProducts.length > 0 ? (
          <ul>
            {aboutToRunOutProducts.map(product => (
              <li key={product._id}>{product.descripcion} - {product.cantidadDisponible} unidades</li>
            ))}
          </ul>
        ) : (
          <p>No se pudo cargar la información o no hay productos por agotarse.</p>
        )}
      </div>

      <div className="dashboard__section">
        <h2>Proveedor con más entradas</h2>
        {topSupplier ? (
          <p>{topSupplier.nombre} - {topSupplier.totalEntradas} unidades recibidas</p>
        ) : (
          <p>No se pudo cargar la información o no hay datos disponibles.</p>
        )}
      </div>

      <div className="dashboard__section">
        <h2>Área con más entradas/salidas</h2>
        {mostActiveArea ? (
          <p>{mostActiveArea._id} - {mostActiveArea.total} movimientos</p>
        ) : (
          <p>No se pudo cargar la información o no hay datos disponibles.</p>
        )}
      </div>

      <div className="dashboard__section">
        <h2>Stock total y capacidad de pruebas</h2>
        <p>Stock total: {totalStockAndCapacity.totalStock} unidades</p>
        <p>Capacidad de pruebas: {totalStockAndCapacity.testCapacity} pruebas</p>
      </div>
    </div>
  );
}

export default DashboardPage;
