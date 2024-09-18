import React, { useRef, useEffect, forwardRef } from "react";
import bwipjs from "bwip-js";

const BarcodeLabel = forwardRef(({ producto }, ref) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (canvasRef.current && producto.nombre) {
            try {
                bwipjs.toCanvas(canvasRef.current, {
                    bcid: 'qrcode', // Tipo de código de barras
                    text: String(producto.nombre), // Convertir el nombre del producto a string
                    scale: 3, // Factor de escala 3x
                    includetext: false, // Mostrar texto legible por humanos
                });
            } catch (e) {
                console.error('Error generating barcode:', e);
            }
        }
    }, [producto.nombre]);

    return (
        <div
          ref={ref}
          style={{
            width: "37mm", // Ancho de la etiqueta
            height: "25mm", // Altura de la etiqueta
            padding: "0mm", // Margen interno
            boxSizing: "border-box",
            display: "flex", // Dividimos en columnas usando flex
            flexDirection: "row", // Dos columnas
            justifyContent: 'flex-start', 
            alignItems: 'center', 
            fontFamily: 'Roboto',
            fontWeight:'900' ,
            fontSize: "8px", 
            overflow: 'hidden'
          }}
        >
          <div style={{ width: "18.5mm", display: "flex", flexDirection: "column" , marginRight: '1mm'}}>
            <div style={{ display: "flex" }}>
              <div style={{ fontSize: "8px", fontWeight: "700" }}>
                {producto.codigo || "05-RPBI4L"}
              </div>
              <div style={{ fontSize: "8px", textAlign: "right" }}>
                REF: {producto.referencia || "HOU4L"}
              </div>
            </div>
            <div style={{ fontSize: "9px", fontWeight: "700", marginTop: "1mm" }}>
              {producto.nombre || "Bote RPBI de 4 litros con tapa"}
            </div>
            <canvas ref={canvasRef} style={{ width: "10mm", height: "10mm", marginTop: "1mm" }} />
          </div>
    

          <div style={{ width: "18.5mm", display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: "9px", fontWeight: "700", textAlign: "left" }}>
              LOT: {producto.lote || "020322"}
            </div>
            <div style={{ fontSize: "10px", fontWeight: "700", marginTop: "5mm" }}>
              1Pz
            </div>
          </div>
        </div>
      );
});

export default BarcodeLabel;

                


