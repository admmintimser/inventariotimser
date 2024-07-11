import React, { useState, useEffect, useCallback } from "react";
import AddPurchaseDetails from "../components/AddPurchaseDetails";

function PurchaseDetails() {
  const [showPurchaseModal, setPurchaseModal] = useState(false);
  const [purchase, setAllPurchaseData] = useState([]);
  const [products, setAllProducts] = useState([]);
  const [updatePage, setUpdatePage] = useState(true);

  const fetchPurchaseData = useCallback(() => {
    fetch("https://apiwebinventariotimser.azurewebsites.net/api/purchase/get")
      .then((response) => response.json())
      .then((data) => {
        setAllPurchaseData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const fetchProductsData = useCallback(() => {
    fetch("https://apiwebinventariotimser.azurewebsites.net/api/product/get")
      .then((response) => response.json())
      .then((data) => {
        setAllProducts(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetchPurchaseData();
    fetchProductsData();
  }, [updatePage, fetchPurchaseData, fetchProductsData]);

  const addSaleModalSetting = () => {
    setPurchaseModal(!showPurchaseModal);
  };

  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };

  return (
    <div className="col-span-12 lg:col-span-10 flex justify-center">
      <div className="flex flex-col gap-5 w-11/12">
        {showPurchaseModal && (
          <AddPurchaseDetails
            addSaleModalSetting={addSaleModalSetting}
            products={products}
            handlePageUpdate={handlePageUpdate}
          />
        )}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200 ">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center ">
              <span className="font-bold">Detalles de la entrada</span>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs rounded"
                onClick={addSaleModalSetting}
              >
                Nueva Entrada
              </button>
            </div>
          </div>
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Nombre
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Cantidad Comprada
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Fecha de Compra
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Proveedor
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Marca
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Temperatura
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Caducidad
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {purchase.map((element) => (
                <tr key={element._id}>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                    {element.ProductID?.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {element.QuantityPurchased}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {new Date(element.PurchaseDate).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {element.Proveedor}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {element.Marca}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {element.Temperatura}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {element.Caducidad}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PurchaseDetails;
