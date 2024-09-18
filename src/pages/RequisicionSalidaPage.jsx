import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Input, Select, DatePicker, Space, message } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, MinusCircleOutlined, EyeOutlined, DownloadOutlined } from "@ant-design/icons";
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";

const { Option } = Select;

const API_URL = "http://localhost:5000/api";

const RequisicionSalidaPage = () => {
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
      const response = await axios.get(`${API_URL}/requisicion-salida`);
      setRequisiciones(response.data);
    } catch (error) {
      message.error("Error al cargar las requisiciones de salida");
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
        await axios.put(`${API_URL}/requisicion-salida/${selectedRequisicion._id}`, values);
        message.success("Requisición de salida actualizada exitosamente");
      } else {
        await axios.post(`${API_URL}/requisicion-salida`, values);
        message.success("Requisición de salida creada exitosamente");
      }
      fetchRequisiciones();
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error("Error al guardar la requisición de salida");
    }
  };

  const handleEdit = (requisicion) => {
    setSelectedRequisicion(requisicion);
    setIsEditing(true);
    form.setFieldsValue({
      ...requisicion,
      productos: requisicion.productos.map(p => ({
        producto: p.producto._id,
        cantidadSolicitada: p.cantidadSolicitada,
      })),
      fechaSolicitud: requisicion.fechaSolicitud ? moment(requisicion.fechaSolicitud) : null,
    });
    setIsModalVisible(true);
  };

  const handleView = (requisicion) => {
    setSelectedRequisicion(requisicion);
    setIsViewing(true);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/requisicion-salida/${id}`);
      message.success("Requisición de salida eliminada exitosamente");
      fetchRequisiciones();
    } catch (error) {
      message.error("Error al eliminar la requisición de salida");
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
    doc.text("Detalles de Requisición de Salida", 14, 22);

    doc.setFontSize(12);
    doc.text(`Folio de Salida: ${selectedRequisicion.folioSalida}`, 14, 32);
    doc.text(`Área: ${selectedRequisicion.area}`, 14, 40);
    doc.text(`Nombre del Solicitante: ${selectedRequisicion.nombreSolicitante}`, 14, 48);
    doc.text(`Fecha de Solicitud: ${moment(selectedRequisicion.fechaSolicitud).format("DD/MM/YYYY")}`, 14, 56);

    const productos = selectedRequisicion.productos.map((item) => [
      item.producto.nombre,
      item.cantidadSolicitada,
    ]);

    doc.autoTable({
      head: [["Producto", "Cantidad Solicitada"]],
      body: productos,
      startY: 65,
    });

    doc.save(`Requisicion_Salida_${selectedRequisicion.folioSalida}.pdf`);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
        Crear Requisición de Salida
      </Button>
      <Table dataSource={requisiciones} rowKey="_id">
        <Table.Column title="Área" dataIndex="area" key="area" />
        <Table.Column title="Nombre del Solicitante" dataIndex="nombreSolicitante" key="nombreSolicitante" />
        <Table.Column title="Fecha de Solicitud" dataIndex="fechaSolicitud" key="fechaSolicitud" render={(value) => value && moment(value).format("DD/MM/YYYY")} />
        <Table.Column title="Folio de Salida" dataIndex="folioSalida" key="folioSalida" />
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
            </Space>
          )}
        />
      </Table>

      <Modal
        title={isViewing ? "Detalles de Requisición de Salida" : isEditing ? "Editar Requisición de Salida" : "Crear Requisición de Salida"}
        open={isModalVisible}
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
            <p><strong>Folio de Salida:</strong> {selectedRequisicion.folioSalida}</p>
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
              ]}
            />
          </div>
        ) : (
          <Form form={form} layout="vertical" onFinish={handleCreateOrUpdate}>
            <Form.Item name="area" label="Área" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="nombreSolicitante" label="Nombre del Solicitante" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="fechaSolicitud" label="Fecha de Solicitud">
              <DatePicker />
            </Form.Item>
            <Form.List name="productos">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                      <Form.Item
                        {...restField}
                        name={[name, 'producto']}
                        fieldKey={[fieldKey, 'producto']}
                        rules={[{ required: true, message: 'Seleccione un producto' }]}
                      >
                        <Select placeholder="Seleccione un producto" style={{ width: 200 }}>
                          {productos.map((producto) => (
                            <Option key={producto._id} value={producto._id}>
                              {producto.nombre}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'cantidadSolicitada']}
                        fieldKey={[fieldKey, 'cantidadSolicitada']}
                        rules={[{ required: true, message: 'Ingrese la cantidad solicitada' }]}
                      >
                        <Input type="number" placeholder="Cantidad" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
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

export default RequisicionSalidaPage;
