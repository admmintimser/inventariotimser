import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Sidebar from "./pages/Header"; 
import HomePage from "./pages/HomePage";
import ProductoPage from "./pages/ProductoPage";
import EntradaPage from "./pages/EntradaPage";
import SalidaPage from "./pages/SalidaPage";
import RequisicionSalidaPage from "./pages/RequisicionSalidaPage";
import RequisicionCompraPage from "./pages/RequisicionCompraPage";
import InventarioPage from "./pages/InventarioPage";
import ProveedorPage from "./pages/ProveedorPage";
import UbicacionPage from "./pages/UbicacionPage";
import DashboardPage from "./pages/DashboardPage";
import DestinosPage from "./pages/DestinosPage";

import "../src/App.scss"

function App() {
  const [isMinimized, setIsMinimized] = React.useState(false);

  return (
    <div className={`app ${isMinimized ? "minimized" : "expanded"}`}>
      <BrowserRouter>
        <Sidebar isMinimized={isMinimized} setIsMinimized={setIsMinimized} />
        <div className="app__container">
          <Routes>
            <Route path="/" element={<Navigate to="/inventario" />} />
            <Route path="/producto" element={<ProductoPage />} />
            <Route path="/entrada" element={<EntradaPage />} />
            <Route path="/salida" element={<SalidaPage />} />
            <Route path="/requisicion-salida" element={<RequisicionSalidaPage />} />
            <Route path="/requisicion-compra" element={<RequisicionCompraPage />} />
            <Route path="/inventario" element={<InventarioPage />} />
            <Route path="/proveedor" element={<ProveedorPage />} />
            <Route path="/ubicacion" element={<UbicacionPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/destinos" element={<DestinosPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
