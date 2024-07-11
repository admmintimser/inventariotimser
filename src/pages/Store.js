import React, { useState, useEffect, useCallback } from "react";
import AddStore from "../components/AddStore";

function Store() {
  const [showModal, setShowModal] = useState(false);
  const [stores, setAllStores] = useState([]);

  const fetchData = useCallback(() => {
    fetch("https://apiwebinventariotimser.azurewebsites.net/api/store/get")
      .then((response) => response.json())
      .then((data) => {
        setAllStores(data);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const modalSetting = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="col-span-12 lg:col-span-10 flex justify-center">
      <div className="flex flex-col gap-5 w-11/12">
        <div className="bg-white rounded p-3">
          <div className="flex justify-between">
            <span className="font-bold">Ubicaciones</span>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs rounded"
              onClick={modalSetting}
            >
              Agregar Ubicación
            </button>
          </div>
        </div>
        {showModal && <AddStore modalSetting={modalSetting} />}

        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center">
              <span className="font-bold">Tiendas</span>
            </div>
          </div>
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Nombre
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Almacén
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Empresa
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Productos
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {stores.map((element) => (
                <tr key={element._id}>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                    {element.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {element.almacen}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {element.empresa}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {element.products.map((product, index) => (
                      <div key={index} className="flex flex-col">
                        <span>{product.name}</span>
                        <span>{product.manufacturer}</span>
                        <span>{product.stock}</span>
                        <span>{product.descripcion}</span>
                      </div>
                    ))}
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

export default Store;
