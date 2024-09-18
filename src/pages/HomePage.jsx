import "../assets/HomePage.scss";
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, Grid } from '@mui/material';
import React from 'react';


function HomePage() {
  const sections = [
    { title: "Inventario", path: "/inventario" },
    { title: "Productos", path: "/producto" },
    { title: "Entrada", path: "/entrada" },
    { title: "Salida", path: "/salida" },
    { title: "Requisición de Salida", path: "/requisicion-salida" },
    { title: "Requisición de Compra", path: "/requisicion-compra" },
    { title: "Proveedores", path: "/proveedor" },
    { title: "Ubicaciones", path: "/ubicacion" },
  ];

  return (
    <div className="homepage">
      <Typography variant="h4" gutterBottom>
        Panel de Control
      </Typography>
      <Grid container spacing={3}>
        {sections.map((section) => (
          <Grid item xs={12} sm={6} md={4} key={section.title}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {section.title}
                </Typography>
                <Link to={section.path} className="homepage__link">
                  Ir a {section.title}
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default HomePage;
