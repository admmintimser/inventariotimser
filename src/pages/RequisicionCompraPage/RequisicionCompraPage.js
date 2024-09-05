import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Input, Select, DatePicker, Space, message } from "antd";
import { EditOutlined, DeleteOutlined, CheckOutlined, EyeOutlined, DownloadOutlined } from "@ant-design/icons";
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";

const { Option } = Select;

const API_URL = "https://apiwebinventariotimser.azurewebsites.net/api";

const RequisicionCompraPage = () => {
  const [requisiciones, setRequisiciones] = useState([]);
  const [productos, setProductos] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [selectedRequisicion, setSelectedRequisicion] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchRequisiciones();
    fetchProductos();
  }, []);

  const fetchRequisiciones = async () => {
    try {
      const response = await axios.get(`${API_URL}/requisicion-compra`);
      setRequisiciones(response.data);
    } catch (error) {
      message.error("Error al cargar las requisiciones de compra");
    }
  };

  const fetchProductos = async () => {
    try {
      const response = await axios.get(`${API_URL}/productos`);
      setProductos(response.data);
    } catch (error) {
      message.error("Error al cargar los productos");
    }
  };

  const handleCreateOrUpdate = async (values) => {
    try {
      if (isEditing) {
        await axios.put(`${API_URL}/requisicion-compra/${selectedRequisicion._id}`, values);
        message.success("Requisición de compra actualizada exitosamente");
      } else {
        await axios.post(`${API_URL}/requisicion-compra`, values);
        message.success("Requisición de compra creada exitosamente");
      }
      fetchRequisiciones();
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error("Error al guardar la requisición de compra");
    }
  };

  const handleEdit = (requisicion) => {
    setSelectedRequisicion(requisicion);
    setIsEditing(true);
    form.setFieldsValue({
      ...requisicion,
      productos: requisicion.productos.map((producto) => ({
        producto: producto.producto._id,
        cantidadSolicitada: producto.cantidadSolicitada,
      })),
      fechaSolicitud: requisicion.fechaSolicitud ? moment(requisicion.fechaSolicitud) : null,
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/requisicion-compra/${id}`);
      message.success("Requisición de compra eliminada exitosamente");
      fetchRequisiciones();
    } catch (error) {
      message.error("Error al eliminar la requisición de compra");
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.post(`${API_URL}/requisicion-compra/${id}/approve`);
      message.success("Requisición aprobada exitosamente y productos añadidos al inventario");
      fetchRequisiciones();
    } catch (error) {
      message.error("Error al aprobar la requisición de compra");
    }
  };

  const handleView = (requisicion) => {
    setSelectedRequisicion(requisicion);
    setIsViewing(true);
    setIsModalVisible(true);
  };

  const handleStatusChange = async (requisicionId, productId, estatus) => {
    try {
      await axios.put(`${API_URL}/requisicion-compra/${requisicionId}/producto/${productId}/estatus`, { estatus });
      message.success("Estatus del producto actualizado exitosamente");
      fetchRequisiciones();  // Refresh the data after status update
    } catch (error) {
      message.error("Error al actualizar el estatus del producto");
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
    setIsEditing(false);
    setIsViewing(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEditing(false);
    setIsViewing(false);
    form.resetFields();
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Detalles de Requisición de Compra", 14, 22);

    doc.setFontSize(12);
    doc.text(`Folio de Compra: ${selectedRequisicion.folioCompra}`, 14, 32);
    doc.text(`Área: ${selectedRequisicion.area}`, 14, 40);
    doc.text(`Nombre del Solicitante: ${selectedRequisicion.nombreSolicitante}`, 14, 48);
    doc.text(`Fecha de Solicitud: ${moment(selectedRequisicion.fechaSolicitud).format("DD/MM/YYYY")}`, 14, 56);

    const productos = selectedRequisicion.productos.map((item) => [
      item.producto.nombre,
      item.cantidadSolicitada,
      item.estatus,  // Including status in the PDF export
    ]);

    doc.autoTable({
      head: [["Producto", "Cantidad Solicitada", "Estatus"]],
      body: productos,
      startY: 65,
    });

    doc.save(`Requisicion_Compra_${selectedRequisicion.folioCompra}.pdf`);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
        Crear Requisición de Compra
      </Button>
      <Table dataSource={requisiciones} rowKey="_id">
        <Table.Column title="Producto" dataIndex={["productos", "producto", "nombre"]} key="producto" />
        <Table.Column title="Área" dataIndex="area" key="area" />
        <Table.Column title="Nombre del Solicitante" dataIndex="nombreSolicitante" key="nombreSolicitante" />
        <Table.Column title="Fecha de Solicitud" dataIndex="fechaSolicitud" key="fechaSolicitud" render={(value) => value && moment(value).format("DD/MM/YYYY")} />
        <Table.Column title="Cantidad Solicitada" dataIndex={["productos", "cantidadSolicitada"]} key="cantidadSolicitada" />
        <Table.Column title="Folio de Compra" dataIndex="folioCompra" key="folioCompra" />
        <Table.Column
          title="Estado de Aprobación"
          key="aprobacion"
          render={(text, record) => (
            <div
              style={{
                backgroundColor: record.aprobacion ? "green" : "red",
                color: "white",
                padding: "5px 10px",
                borderRadius: "10px",
                textAlign: "center",
              }}
            >
              {record.aprobacion ? "Aprobado" : "Pendiente"}
            </div>
          )}
        />
        <Table.Column
          title="Acciones"
          key="actions"
          render={(text, record) => (
            <Space>
              <Button icon={<EyeOutlined />} onClick={() => handleView(record)}>
                Ver
              </Button>
              <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
                Editar
              </Button>
              <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record._id)}>
                Eliminar
              </Button>
              {!record.aprobacion && (
                <Button icon={<CheckOutlined />} type="primary" onClick={() => handleApprove(record._id)}>
                  Aprobar
                </Button>
              )}
            </Space>
          )}
        />
      </Table>

      <Modal
        title={isViewing ? "Detalles de Requisición de Compra" : isEditing ? "Editar Requisición de Compra" : "Crear Requisición de Compra"}
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={() => (isViewing ? handleCancel() : form.submit())}
        footer={
          isViewing
            ? [
                <Button key="back" onClick={handleCancel}>
                  Cerrar
                </Button>,
                <Button key="pdf" icon={<DownloadOutlined />} onClick={exportToPDF} type="primary">
                  Exportar a PDF
                </Button>,
              ]
            : undefined
        }
      >
        {isViewing ? (
          <div>
            <p><strong>Folio de Compra:</strong> {selectedRequisicion.folioCompra}</p>
            <p><strong>Área:</strong> {selectedRequisicion.area}</p>
            <p><strong>Nombre del Solicitante:</strong> {selectedRequisicion.nombreSolicitante}</p>
            <p><strong>Fecha de Solicitud:</strong> {moment(selectedRequisicion.fechaSolicitud).format("DD/MM/YYYY")}</p>
            <Table
              dataSource={selectedRequisicion.productos}
              pagination={false}
              rowKey={(record) => record.producto._id}
              columns={[
                {
                  title: "Producto",
                  dataIndex: ["producto", "nombre"],
                  key: "producto",
                },
                {
                  title: "Cantidad Solicitada",
                  dataIndex: "cantidadSolicitada",
                  key: "cantidadSolicitada",
                },
                {
                  title: "Estatus",
                  dataIndex: "estatus",
                  key: "estatus",
                  render: (estatus, record) => (
                    <Select
                      defaultValue={estatus}
                      onChange={(value) => handleStatusChange(selectedRequisicion._id, record.producto._id, value)}
                    >
                      <Option value="Pendiente">Pendiente</Option>
                      <Option value="Transito">Transito</Option>
                      <Option value="Entregado">Entregado</Option>
                    </Select>
                  )
                }
              ]}
            />
          </div>
        ) : (
          <Form form={form} layout="vertical" onFinish={handleCreateOrUpdate}>
            <Form.Item name="area" label="Área" rules={[{ required: true, message: "Ingrese el área" }]}>
              <Input />
            </Form.Item>
            <Form.Item name="nombreSolicitante" label="Nombre del Solicitante" rules={[{ required: true, message: "Ingrese el nombre del solicitante" }]}>
              <Input />
            </Form.Item>
            <Form.List name="productos">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <Space key={key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                      <Form.Item
                        {...restField}
                        name={[name, "producto"]}
                        fieldKey={[fieldKey, "producto"]}
                        rules={[{ required: true, message: "Seleccione un producto" }]}
                      >
                        <Select placeholder="Seleccione un producto">
                          {productos.map((producto) => (
                            <Option key={producto._id} value={producto._id}>
                              {producto.nombre}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "cantidadSolicitada"]}
                        fieldKey={[fieldKey, "cantidadSolicitada"]}
                        rules={[{ required: true, message: "Ingrese la cantidad solicitada" }]}
                      >
                        <Input placeholder="Cantidad" type="number" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "estatus"]}
                        fieldKey={[fieldKey, "estatus"]}
                        rules={[{ required: true, message: "Seleccione un estatus" }]}
                      >
                        <Select placeholder="Seleccione un estatus">
                          <Option value="Pendiente">Pendiente</Option>
                          <Option value="Transito">Transito</Option>
                          <Option value="Entregado">Entregado</Option>
                        </Select>
                      </Form.Item>
                      <Button type="danger" onClick={() => remove(name)}>
                        Eliminar
                      </Button>
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block>
                      Agregar Producto
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default RequisicionCompraPage;
