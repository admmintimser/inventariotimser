import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "antd";  // Asegúrate de importar Button aquí
import BarcodeLabel from "./BarcodeLabel";

const PrintButton = ({ producto }) => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: `${producto.nombre}_label`,
    });

    return (
        <div>
            <Button onClick={handlePrint} className="buttonprint">
                Imprimir
            </Button>
            <div style={{ display: "none" }}>
                <BarcodeLabel ref={componentRef} producto={producto} />
            </div>
        </div>
    );
};

export default PrintButton;
