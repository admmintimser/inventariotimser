import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function AddProveedor({ addProveedorModalSetting, handlePageUpdate }) {
  const [proveedor, setProveedor] = useState({
    nombre: "",
    razonSocial: "",
    nombreComercial: "",
    rfc: "",
    curp: "",
    calle: "",
    numero: "",
    colonia: "",
    municipio: "",
    estado: "",
    pais: "",
    telefono: "",
    email: "",
    codigopostal: "",
    giroempresa: "",
    condicionespago: "",
    contactopago: "",
    correopago: "",
    telefonopago: "",
    nombrecorroborador: "",
    cargocorroborador: ""
  });
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);

  const handleInputChange = (key, value) => {
    setProveedor({ ...proveedor, [key]: value });
  };

  const addProveedor = () => {
    fetch("https://apiwebinventariotimser.azurewebsites.net/api/proveedor/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(proveedor),
    })
      .then((result) => {
        alert("Proveedor Agregado");
        handlePageUpdate();
        addProveedorModalSetting();
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
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-semibold leading-6 text-gray-900"
                      >
                        Proveedor Nuevo
                      </Dialog.Title>
                      <form action="#">
                        <div className="grid gap-4 mb-4 sm:grid-cols-2">
                          <div>
                            <label
                              htmlFor="nombre"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                            >
                              Nombre
                            </label>
                            <input
                              type="text"
                              name="nombre"
                              id="nombre"
                              value={proveedor.nombre}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Nombre"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="razonSocial"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                            >
                              Razón Social
                            </label>
                            <input
                              type="text"
                              name="razonSocial"
                              id="razonSocial"
                              value={proveedor.razonSocial}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Razón Social"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="nombreComercial"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                            >
                              Nombre Comercial
                            </label>
                            <input
                              type="text"
                              name="nombreComercial"
                              id="nombreComercial"
                              value={proveedor.nombreComercial}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Nombre Comercial"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="rfc"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                            >
                              RFC
                            </label>
                            <input
                              type="text"
                              name="rfc"
                              id="rfc"
                              value={proveedor.rfc}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="RFC"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="curp"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                            >
                              CURP
                            </label>
                            <input
                              type="text"
                              name="curp"
                              id="curp"
                              value={proveedor.curp}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="CURP"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="calle"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                            >
                              Calle
                            </label>
                            <input
                              type="text"
                              name="calle"
                              id="calle"
                              value={proveedor.calle}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Calle"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="numero"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                            >
                              Número
                            </label>
                            <input
                              type="text"
                              name="numero"
                              id="numero"
                              value={proveedor.numero}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Número"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="colonia"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                            >
                              Colonia
                            </label>
                            <input
                              type="text"
                              name="colonia"
                              id="colonia"
                              value={proveedor.colonia}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Colonia"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="municipio"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                            >
                              Municipio
                            </label>
                            <input
                              type="text"
                              name="municipio"
                              id="municipio"
                              value={proveedor.municipio}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Municipio"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="estado"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                            >
                              Estado
                            </label>
                            <input
                              type="text"
                              name="estado"
                              id="estado"
                              value={proveedor.estado}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Estado"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="pais"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                            >
                              País
                            </label>
                            <input
                              type="text"
                              name="pais"
                              id="pais"
                              value={proveedor.pais}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="País"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="telefono"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                            >
                              Teléfono
                            </label>
                            <input
                              type="text"
                              name="telefono"
                              id="telefono"
                              value={proveedor.telefono}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Teléfono"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="email"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                            >
                              Email
                            </label>
                            <input
                              type="email"
                              name="email"
                              id="email"
                              value={proveedor.email}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Email"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="codigopostal"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                            >
                              Código Postal
                            </label>
                            <input
                              type="text"
                              name="codigopostal"
                              id="codigopostal"
                              value={proveedor.codigopostal}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Código Postal"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="giroempresa"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                            >
                              Giro de la Empresa
                            </label>
                            <input
                              type="text"
                              name="giroempresa"
                              id="giroempresa"
                              value={proveedor.giroempresa}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Giro de la Empresa"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="condicionespago"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                            >
                              Condiciones de Pago
                            </label>
                            <input
                              type="text"
                              name="condicionespago"
                              id="condicionespago"
                              value={proveedor.condicionespago}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Condiciones de Pago"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="contactopago"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                            >
                              Contacto de Pago
                            </label>
                            <input
                              type="text"
                              name="contactopago"
                              id="contactopago"
                              value={proveedor.contactopago}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Contacto de Pago"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="correopago"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                            >
                              Correo de Pago
                            </label>
                            <input
                              type="email"
                              name="correopago"
                              id="correopago"
                              value={proveedor.correopago}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Correo de Pago"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="telefonopago"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                            >
                              Teléfono de Pago
                            </label>
                            <input
                              type="text"
                              name="telefonopago"
                              id="telefonopago"
                              value={proveedor.telefonopago}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Teléfono de Pago"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="nombrecorroborador"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                            >
                              Nombre Corroborador
                            </label>
                            <input
                              type="text"
                              name="nombrecorroborador"
                              id="nombrecorroborador"
                              value={proveedor.nombrecorroborador}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Nombre Corroborador"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="cargocorroborador"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                            >
                              Cargo Corroborador
                            </label>
                            <input
                              type="text"
                              name="cargocorroborador"
                              id="cargocorroborador"
                              value={proveedor.cargocorroborador}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Cargo Corroborador"
                            />
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
                    onClick={addProveedor}
                  >
                    Agregar Proveedor
                  </button>
                  <button
                    type="button"
                    className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                    onClick={() => addProveedorModalSetting()}
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
