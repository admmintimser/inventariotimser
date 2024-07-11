import React, { useState, useEffect, useCallback } from "react";
import { FaCalculator } from "react-icons/fa";

import AddProveedor from "../components/AddProveedor";
import UpdateProveedor from "../components/UpdateProveedor";

function Proveedor() {
  const [showProveedorModal, setShowProveedorModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateProveedor, setUpdateProveedor] = useState([]);
  const [proveedores, setAllProveedores] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [updatePage, setUpdatePage] = useState(true);

  const fetchProveedoresData = useCallback(() => {
    fetch(`https://apiwebinventariotimser.azurewebsites.net/api/proveedor/get`)
      .then((response) => response.json())
      .then((data) => {
        setAllProveedores(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const fetchSearchData = useCallback(() => {
    fetch(`https://apiwebinventariotimser.azurewebsites.net/api/proveedor/search?searchTerm=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        setAllProveedores(data);
      })
      .catch((err) => console.log(err));
  }, [searchTerm]);

  useEffect(() => {
    fetchProveedoresData();
  }, [updatePage, fetchProveedoresData]);

  const addProveedorModalSetting = () => {
    setShowProveedorModal(!showProveedorModal);
  };

  const updateProveedorModalSetting = (selectedProveedorData) => {
    setUpdateProveedor(selectedProveedorData);
    setShowUpdateModal(!showUpdateModal);
  };

  const deleteItem = (id) => {
    fetch(`https://apiwebinventariotimser.azurewebsites.net/api/proveedor/delete/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setUpdatePage(!updatePage);
      });
  };

  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    fetchSearchData();
  };

  return (
    <div className="col-span-12 lg:col-span-10 flex justify-center">
      <div className="flex flex-col gap-5 w-11/12">
        <div className="bg-white rounded p-3">
          <span className="font-semibold px-4">Lista de Proveedores</span>
          <div className="flex flex-col md:flex-row justify-center items-center">
            <div className="flex flex-col p-10 w-full md:w-3/12">
              <span className="font-semibold text-blue-600 text-base">
                Proveedores Totales
              </span>
              <span className="font-semibold text-gray-600 text-base">
                {proveedores.length}
              </span>
            </div>
            <div className="flex flex-col gap-3 p-10 w-full md:w-3/12 sm:border-y-2 md:border-x-2 md:border-y-0">
              <span className="font-semibold text-yellow-600 text-base">
                Ubicaciones
              </span>
              <div className="flex gap-8">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    {/* Aquí podrías agregar datos sobre ubicaciones de proveedores si es aplicable */}
                    10
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 p-10 w-full md:w-3/12 sm:border-y-2 md:border-x-2 md:border-y-0">
              <span className="font-semibold text-purple-600 text-base">
                Más Utilizados
              </span>
              <div className="flex gap-8">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    5
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    Proveedor XYZ
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 p-10 w-full md:w-3/12 border-y-2 md:border-x-2 md:border-y-0">
              <span className="font-semibold text-red-600 text-base">
                Stock Bajo
              </span>
              <div className="flex gap-8">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    12
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    En Transito
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    2
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Agotados
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showProveedorModal && (
          <AddProveedor
            addProveedorModalSetting={addProveedorModalSetting}
            handlePageUpdate={handlePageUpdate}
          />
        )}
        {showUpdateModal && (
          <UpdateProveedor
            updateProveedorData={updateProveedor}
            updateModalSetting={updateProveedorModalSetting}
          />
        )}

        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center">
              <span className="font-bold">Proveedores</span>
              <div className="flex justify-center items-center px-2 border-2 rounded-md">
                <img
                  alt="search-icon"
                  className="w-5 h-5"
                  src={require("../assets/search-icon.png")}
                />
                <input
                  className="border-none outline-none focus:border-none text-xs"
                  type="text"
                  placeholder="Buscar aquí"
                  value={searchTerm}
                  onChange={handleSearchTerm}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs rounded"
                onClick={addProveedorModalSetting}
              >
                Agregar
              </button>
            </div>
          </div>
          <ul className="list-disc pl-5">
            <li className="flex items-center gap-2 text-gray-700">
              <FaCalculator />
              Preventix
            </li>
          </ul>
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Nombre
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Razón Social
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  RFC
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Teléfono
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {proveedores.map((element, index) => {
                return (
                  <tr key={element._id}>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                      {element.nombre}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.razonSocial}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.rfc}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.telefono}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      <span
                        className="text-green-700 cursor-pointer"
                        onClick={() => updateProveedorModalSetting(element)}
                      >
                        Editar{" "}
                      </span>
                      <span
                        className="text-red-600 px-2 cursor-pointer"
                        onClick={() => deleteItem(element._id)}
                      >
                        Eliminar
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Proveedor;
