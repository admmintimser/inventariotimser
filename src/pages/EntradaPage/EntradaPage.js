import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Input, Select, DatePicker, Space, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from 'moment';

const { Option } = Select;

const API_URL = "https://apiwebinventariotimser.azurewebsites.net/api";

const EntradaPage = () => {
  const [entradas, setEntradas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [ubicaciones, setUbicaciones] = useState([]); // Añadimos el estado para las ubicaciones
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedEntrada, setSelectedEntrada] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchEntradas();
    fetchProductos();
    fetchUbicaciones(); // Cargar ubicaciones
  }, []);

  const fetchEntradas = async () => {
    try {
      const response = await axios.get(`${API_URL}/entradas`);
      setEntradas(response.data);
    } catch (error) {
      message.error("Error al cargar las entradas");
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

  const fetchUbicaciones = async () => {
    try {
      const response = await axios.get(`${API_URL}/ubicaciones`);
      setUbicaciones(response.data);
    } catch (error) {
      message.error("Error al cargar las ubicaciones");
    }
  };

  const handleCreateOrUpdate = async (values) => {
    try {
      if (isEditing) {
        await axios.put(`${API_URL}/entradas/${selectedEntrada._id}`, values);
        message.success("Entrada actualizada exitosamente");
      } else {
        await axios.post(`${API_URL}/entradas`, values);
        message.success("Entrada creada exitosamente");
      }
      fetchEntradas();
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error("Error al guardar la entrada");
    }
  };

  const handleEdit = (entrada) => {
    setSelectedEntrada(entrada);
    setIsEditing(true);
    form.setFieldsValue({
      ...entrada,
      producto: entrada.producto?._id,
      ubicacion: entrada.ubicacion?._id, // Añadir ubicación al formulario
      fechaEntrada: entrada.fechaEntrada ? moment(entrada.fechaEntrada) : null,
      fechaCaducidad: entrada.fechaCaducidad ? moment(entrada.fechaCaducidad) : null,
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/entradas/${id}`);
      message.success("Entrada eliminada exitosamente");
      fetchEntradas();
    } catch (error) {
      message.error("Error al eliminar la entrada");
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
    setIsEditing(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEditing(false);
    form.resetFields();
  };

  return (
    <div>
      <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
        Crear Entrada
      </Button>
      <Table dataSource={entradas} rowKey="_id">
        <Table.Column title="Producto" dataIndex={["producto", "nombre"]} key="producto" />
        <Table.Column title="Lote" dataIndex="lote" key="lote" />
        <Table.Column title="Cantidad de Empaques" dataIndex="cantidadEmpaques" key="cantidadEmpaques" />
        <Table.Column title="Temperatura" dataIndex="temperatura" key="temperatura" />
        <Table.Column title="Ubicación" dataIndex={["ubicacion", "nombre"]} key="ubicacion" /> {/* Mostrar ubicación */}
        <Table.Column title="Fecha de Entrada" dataIndex="fechaEntrada" key="fechaEntrada" render={(value) => value && moment(value).format("DD/MM/YYYY")} />
        <Table.Column title="Fecha de Caducidad" dataIndex="fechaCaducidad" key="fechaCaducidad" render={(value) => value && moment(value).format("DD/MM/YYYY")} />
        <Table.Column
          title="Acciones"
          key="actions"
          render={(text, record) => (
            <Space>
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
        title={isEditing ? "Editar Entrada" : "Crear Entrada"}
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateOrUpdate}>
          <Form.Item name="producto" label="Producto" rules={[{ required: true }]}>
            <Select>
              {productos.map((producto) => (
                <Option key={producto._id} value={producto._id}>
                  {producto.nombre}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="ubicacion" label="Ubicación" rules={[{ required: true, message: 'Por favor selecciona una ubicación' }]}>
  <Select placeholder="Selecciona una ubicación">
    {ubicaciones.map((ubicacion) => (
      <Option key={ubicacion._id} value={ubicacion._id}>
        {ubicacion.nombre}
      </Option>
    ))}
  </Select>
</Form.Item>

          <Form.Item name="lote" label="Lote" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="cantidadEmpaques" label="Cantidad de Empaques" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="temperatura" label="Temperatura">
            <Input type="number" />
          </Form.Item>
          <Form.Item name="fechaEntrada" label="Fecha de Entrada">
            <DatePicker />
          </Form.Item>
          <Form.Item name="fechaCaducidad" label="Fecha de Caducidad">
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EntradaPage;
