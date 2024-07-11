import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function AddPurchaseDetails({
  addSaleModalSetting,
  products,
  handlePageUpdate,
}) {
  const [purchase, setPurchase] = useState({
    productID: "",
    lote: "",
    referencia: "",
    unidadMedida: "",
    cantidadEmpaques: "",
    cantidadPorEmaque: "",
    quantityPurchased: "",
    purchaseDate: "",
    temperatura: "",
    caducidad: "",
    documento: "",
    proveedor: "",
    marca: "",
  });
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);

  // Handling Input Change for input fields
  const handleInputChange = (key, value) => {
    setPurchase({ ...purchase, [key]: value });
  };

  // POST Data
  const addSale = () => {
    fetch("https://apiwebinventariotimser.azurewebsites.net/api/purchase/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(purchase),
    })
      .then((result) => {
        alert("Purchase ADDED");
        handlePageUpdate();
        addSaleModalSetting();
      })
      .catch((err) => console.log(err));
  };

  return (
    // Modal
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
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg overflow-y-scroll">
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
                        className="text-lg py-4 font-semibold leading-6 text-gray-900 "
                      >
                        Agregar a inventario
                      </Dialog.Title>
                      <form action="#">
                        <div className="grid gap-4 mb-4 sm:grid-cols-2">
                          <div>
                            <label
                              htmlFor="productID"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Product Name
                            </label>
                            <select
                              id="productID"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              name="productID"
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                            >
                              <option selected="">Seleccionar Productos</option>
                              {products.map((element, index) => (
                                <option key={element._id} value={element._id}>
                                  {element.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label
                              htmlFor="lote"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Lote
                            </label>
                            <input
                              type="text"
                              name="lote"
                              id="lote"
                              value={purchase.lote}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Lote"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="referencia"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Referencia
                            </label>
                            <input
                              type="text"
                              name="referencia"
                              id="referencia"
                              value={purchase.referencia}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Referencia"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="unidadMedida"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Unidad de Medida
                            </label>
                            <input
                              type="text"
                              name="unidadMedida"
                              id="unidadMedida"
                              value={purchase.unidadMedida}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Unidad de Medida"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="cantidadEmpaques"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Cantidad de Empaques
                            </label>
                            <input
                              type="text"
                              name="cantidadEmpaques"
                              id="cantidadEmpaques"
                              value={purchase.cantidadEmpaques}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Cantidad de Empaques"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="cantidadPorEmaque"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Cantidad por Empaque
                            </label>
                            <input
                              type="text"
                              name="cantidadPorEmaque"
                              id="cantidadPorEmaque"
                              value={purchase.cantidadPorEmaque}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Cantidad por Empaque"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="quantityPurchased"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Cantidad Comprada
                            </label>
                            <input
                              type="number"
                              name="quantityPurchased"
                              id="quantityPurchased"
                              value={purchase.quantityPurchased}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="0 - 999"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="temperatura"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Temperatura
                            </label>
                            <input
                              type="text"
                              name="temperatura"
                              id="temperatura"
                              value={purchase.temperatura}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Temperatura"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="caducidad"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Caducidad
                            </label>
                            <input
                              type="text"
                              name="caducidad"
                              id="caducidad"
                              value={purchase.caducidad}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Caducidad"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="documento"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Documento
                            </label>
                            <input
                              type="text"
                              name="documento"
                              id="documento"
                              value={purchase.documento}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Documento"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="proveedor"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Proveedor
                            </label>
                            <input
                              type="text"
                              name="proveedor"
                              id="proveedor"
                              value={purchase.proveedor}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Proveedor"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="marca"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Marca
                            </label>
                            <input
                              type="text"
                              name="marca"
                              id="marca"
                              value={purchase.marca}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Marca"
                            />
                          </div>
                          <div className="h-fit w-fit">
                            <label
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              htmlFor="purchaseDate"
                            >
                              Purchase Date
                            </label>
                            <input
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              type="date"
                              id="purchaseDate"
                              name="purchaseDate"
                              value={purchase.purchaseDate}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <button
                            type="button"
                            className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                            onClick={addSale}
                          >
                            Agregar
                          </button>
                          <button
                            type="button"
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            onClick={() => addSaleModalSetting()}
                            ref={cancelButtonRef}
                          >
                            Cancelar
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
