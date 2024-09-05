import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Input, Space, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";

const API_URL = "https://apiwebinventariotimser.azurewebsites.net/api";

const UbicacionPage = () => {
  const [ubicaciones, setUbicaciones] = useState([]);
  const [productos, setProductos] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUbicacion, setSelectedUbicacion] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchUbicaciones();
  }, []);

  const fetchUbicaciones = async () => {
    try {
      const response = await axios.get(`${API_URL}/ubicaciones`);
      setUbicaciones(response.data);
    } catch (error) {
      message.error("Error al cargar las ubicaciones");
    }
  };

  const fetchProductosByUbicacion = async (ubicacionId) => {
    try {
        const response = await axios.get(`${API_URL}/ubicaciones/${ubicacionId}/productos`);
        
        if (response.data.length === 0) {
            message.info("No hay productos asociados con esta ubicación");
        } else {
            console.log("Productos obtenidos:", response.data); // Añadir log para ver los datos
            setProductos(response.data);
            setIsProductModalVisible(true);
        }
    } catch (error) {
        message.error(error.response?.data?.error || "Error al cargar los productos de la ubicación");
    }
};

  const handleCreateOrUpdate = async (values) => {
    try {
      if (isEditing) {
        await axios.put(`${API_URL}/ubicaciones/${selectedUbicacion._id}`, values);
        message.success("Ubicación actualizada exitosamente");
      } else {
        await axios.post(`${API_URL}/ubicaciones`, values);
        message.success("Ubicación creada exitosamente");
      }
      fetchUbicaciones();
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error("Error al guardar la ubicación");
    }
  };

  const handleEdit = (ubicacion) => {
    setSelectedUbicacion(ubicacion);
    setIsEditing(true);
    form.setFieldsValue(ubicacion);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/ubicaciones/${id}`);
      message.success("Ubicación eliminada exitosamente");
      fetchUbicaciones();
    } catch (error) {
      message.error("Error al eliminar la ubicación");
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

  const handleProductModalCancel = () => {
    setIsProductModalVisible(false);
    setProductos([]);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
        Crear Ubicación
      </Button>
      <Table dataSource={ubicaciones} rowKey="_id">
        <Table.Column title="Nombre" dataIndex="nombre" key="nombre" />
        <Table.Column title="Empresa" dataIndex="empresa" key="empresa" />
        <Table.Column title="Cantidad de Productos" dataIndex="productCount" key="productCount" />
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
              <Button onClick={() => fetchProductosByUbicacion(record._id)}>
                Ver Productos
              </Button>
            </Space>
          )}
        />
      </Table>

      <Modal
        title={isEditing ? "Editar Ubicación" : "Crear Ubicación"}
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateOrUpdate}>
          <Form.Item name="nombre" label="Nombre" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="empresa" label="Empresa" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Productos en la Ubicación"
        visible={isProductModalVisible}
        onCancel={handleProductModalCancel}
        footer={null}
      >
        <Table dataSource={productos} rowKey="_id">
          <Table.Column title="Producto" dataIndex={["producto", "nombre"]} key="producto" />
          <Table.Column title="Cantidad Disponible" dataIndex="cantidadDisponible" key="cantidadDisponible" />
          <Table.Column title="Lote" dataIndex="lote" key="lote" />
          <Table.Column title="Caducidad" dataIndex="caducidad" key="caducidad" render={(value) => value && moment(value).format("DD/MM/YYYY")} />
        </Table>
      </Modal>

    </div>
  );
};

export default UbicacionPage;
