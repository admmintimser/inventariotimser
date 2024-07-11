import { Fragment, useContext, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import AuthContext from "../AuthContext";

export default function AddProduct({
  addProductModalSetting,
  handlePageUpdate,
}) {
  const authContext = useContext(AuthContext);
  const [product, setProduct] = useState({
    userId: authContext.user,
    name: "",
    manufacturer: "",
    stock: 0,
    categoria: "",
    sku: "",
    descripcion: "",
    marca: "",
    presentacion: "",
    UM: "",
    cantidadpresentacion: "",
    codigointernto: "",
    moneda: "MXN",
    prioridad: "Necesario",
  });
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);

  const handleInputChange = (key, value) => {
    setProduct({ ...product, [key]: value });
  };

  const addProduct = () => {
    fetch("https://apiwebinventariotimser.azurewebsites.net/api/product/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((result) => {
        alert("Producto Agregado");
        handlePageUpdate();
        addProductModalSetting();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                      <PlusIcon
                        className="h-6 w-6 text-blue-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left ">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-semibold leading-6 text-gray-900 "
                      >
                        Producto Nuevo
                      </Dialog.Title>
                      <form action="#">
                        <div className="grid gap-4 mb-4 sm:grid-cols-2">
                          <div>
                            <label
                              htmlFor="name"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                            >
                              Nombre
                            </label>
                            <input
                              type="text"
                              name="name"
                              id="name"
                              value={product.name}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Ex... Micropipetas"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="manufacturer"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                            >
                              Proveedor
                            </label>
                            <input
                              type="text"
                              name="manufacturer"
                              id="manufacturer"
                              value={product.manufacturer}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Ex.. Axigen"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="stock"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                            >
                              Stock
                            </label>
                            <input
                              type="number"
                              name="stock"
                              id="stock"
                              value={product.stock}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Stock"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="categoria"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                            >
                              Categoría
                            </label>
                            <input
                              type="text"
                              name="categoria"
                              id="categoria"
                              value={product.categoria}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Categoría"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="sku"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                            >
                              SKU
                            </label>
                            <input
                              type="text"
                              name="sku"
                              id="sku"
                              value={product.sku}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="SKU"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="marca"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                            >
                              Marca
                            </label>
                            <input
                              type="text"
                              name="marca"
                              id="marca"
                              value={product.marca}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Marca"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="codigointernto"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                            >
                              Código Interno
                            </label>
                            <input
                              type="text"
                              name="codigointernto"
                              id="codigointernto"
                              value={product.codigointernto}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Codigo Interno"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="moneda"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                            >
                              Moneda
                            </label>
                            <select
                              name="moneda"
                              id="moneda"
                              value={product.moneda}
                              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            >
                              <option value="MXN">MXN</option>
                              <option value="USD">USD</option>
                            </select>
                          </div>
                          <div>
                            <label
                              htmlFor="prioridad"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                            >
                              Prioridad
                            </label>
                            <select
                              name="prioridad"
                              id="prioridad"
                              value={product.prioridad}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            >
                              <option value="Critico">Critico</option>
                              <option value="Necesario">Necesario</option>
                              <option value="Util">Util</option>
                            </select>
                          </div>
                          <div>
                            <label
                              htmlFor="presentacion"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                            >
                              Presentación
                            </label>
                            <input
                              type="text"
                              name="presentacion"
                              id="presentacion"
                              value={product.presentacion}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Presentación"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="UM"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                            >
                              Unidad de Medida
                            </label>
                            <select
                              name="UM"
                              id="UM"
                              value={product.UM}
                              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            >
                              <option value="g">g</option>
                              <option value="mg">mg</option>
                              <option value="kg">kg</option>
                              <option value="l">l</option>
                              <option value="ml">ml</option>
                              <option value="Pz">Pz</option>
                              <option value="m">m</option>
                              <option value="pzs">pzs</option>
                              <option value="ul">ul</option>
                              <option value="ug">ug</option>
                            </select>
                          </div>
                          <div>
                            <label
                              htmlFor="cantidadpresentacion"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                            >
                              Cantidad Presentación
                            </label>
                            <input
                              type="text"
                              name="cantidadpresentacion"
                              id="cantidadpresentacion"
                              value={product.cantidadpresentacion}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Cantidad Presentación"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label
                              htmlFor="descripcion"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                            >
                              Descripción
                            </label>
                            <textarea
                              id="descripcion"
                              rows="5"
                              name="descripcion"
                              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Agrega descripción..."
                              value={product.descripcion}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                            ></textarea>
                          </div>
                        </div>
                        
                      </form>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                    onClick={addProduct}
                  >
                    Agregar Producto
                  </button>
                  <button
                    type="button"
                    className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                    onClick={() => addProductModalSetting()}
                    ref={cancelButtonRef}
                  >
                    Cancelar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
