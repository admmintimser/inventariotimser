import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Input, Space, Checkbox, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Search } = Input; // Añadido para el campo de búsqueda

const API_URL = "https://apiwebinventariotimser.azurewebsites.net/api";

const ProveedorPage = () => {
  const [proveedores, setProveedores] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProveedor, setSelectedProveedor] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState(""); // Estado para el texto de búsqueda

  useEffect(() => {
    fetchProveedores();
  }, []);

  const fetchProveedores = async () => {
    try {
      const response = await axios.get(`${API_URL}/proveedores`);
      setProveedores(response.data);
    } catch (error) {
      message.error("Error al cargar los proveedores");
    }
  };

  const handleCreateOrUpdate = async (values) => {
    try {
      if (isEditing) {
        await axios.put(`${API_URL}/proveedores/${selectedProveedor._id}`, values);
        message.success("Proveedor actualizado exitosamente");
      } else {
        await axios.post(`${API_URL}/proveedores`, values);
        message.success("Proveedor creado exitosamente");
      }
      fetchProveedores();
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error("Error al guardar el proveedor");
    }
  };

  const handleEdit = (proveedor) => {
    setSelectedProveedor(proveedor);
    setIsEditing(true);
    form.setFieldsValue(proveedor);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/proveedores/${id}`);
      message.success("Proveedor eliminado exitosamente");
      fetchProveedores();
    } catch (error) {
      message.error("Error al eliminar el proveedor");
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

  // Función de filtrado de proveedores basada en el texto de búsqueda
  const filteredProveedores = proveedores.filter((proveedor) =>
    proveedor.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      {/* Campo de búsqueda */}
      <Search
        placeholder="Buscar por nombre"
        onChange={(e) => setSearchText(e.target.value)} // Actualiza el estado de búsqueda
        style={{ marginBottom: 16, width: 300 }}
        allowClear
      />

      <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
        Crear Proveedor
      </Button>

      <Table dataSource={filteredProveedores} rowKey="_id"> {/* Proveedores filtrados */}
        <Table.Column title="Nombre" dataIndex="nombre" key="nombre" />
        <Table.Column title="Razón Social" dataIndex="razonSocial" key="razonSocial" />
        <Table.Column title="Dirección" dataIndex="direccion" key="direccion" />
        <Table.Column title="Correo" dataIndex="correo" key="correo" />
        <Table.Column title="Activo" dataIndex="activo" key="activo" render={(value) => (value ? "Sí" : "No")} />
        <Table.Column title="Clasificación 1" dataIndex="clasificacion1" key="clasificacion1" />
        <Table.Column title="Clasificación 2" dataIndex="clasificacion2" key="clasificacion2" />
        <Table.Column title="Detalles" dataIndex="detalles" key="detalles" />
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
        title={isEditing ? "Editar Proveedor" : "Crear Proveedor"}
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateOrUpdate}>
          <Form.Item name="nombre" label="Nombre" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="razonSocial" label="Razón Social" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="direccion" label="Dirección" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="correo" label="Correo o Página WEB" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="activo" valuePropName="checked" label="Activo">
            <Checkbox />
          </Form.Item>
          <Form.Item name="clasificacion1" label="Clasificación 1">
            <Input />
          </Form.Item>
          <Form.Item name="clasificacion2" label="Clasificación 2">
            <Input />
          </Form.Item>
          <Form.Item name="detalles" label="Detalles">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProveedorPage;
