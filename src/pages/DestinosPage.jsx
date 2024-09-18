import React, { useState, useEffect } from "react";
import axios from 'axios';

import { Table, Button, Modal, Form, Input, Space, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment"; // Para formatear fechas

const API_URL = "https://apiwebinventariotimser.azurewebsites.net/api";

const DestinoPage = () => {
  const [destinos, setDestinos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDestino, setSelectedDestino] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchDestinos();
  }, []);

  // Obtener todos los destinos
  const fetchDestinos = async () => {
    try {
      const response = await axios.get(`${API_URL}/destinos`);
      setDestinos(response.data);
    } catch (error) {
      message.error("Error al cargar los destinos");
    }
  };

  const fetchProductosByDestino = async (destinoId) => {
    try {
        const response = await axios.get(`${API_URL}/destinos/${destinoId}/productos`);
        if (response.data.length === 0) {
            message.info("No hay productos asociados con este destino");
        } else {
            setProductos(response.data);
            setIsProductModalVisible(true);
        }
    } catch (error) {
        message.error(error.response?.data?.error || "Error al cargar los productos del destino");
    }
};



  const handleCreateOrUpdate = async (values) => {
    try {
      if (isEditing) {
        await axios.put(`${API_URL}/destinos/${selectedDestino._id}`, values);
        message.success("Destino actualizado exitosamente");
      } else {
        await axios.post(`${API_URL}/destinos`, values);
        message.success("Destino creado exitosamente");
      }
      fetchDestinos();
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error("Error al guardar el destino");
    }
  };

  const handleEdit = (destino) => {
    setSelectedDestino(destino);
    setIsEditing(true);
    form.setFieldsValue(destino);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/destinos/${id}`);
      message.success("Destino eliminado exitosamente");
      fetchDestinos();
    } catch (error) {
      message.error("Error al eliminar el destino");
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
        Crear Destino
      </Button>
      <Table dataSource={destinos} rowKey="_id">
        <Table.Column title="Nombre" dataIndex="nombre" key="nombre" />
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
              <Button onClick={() => fetchProductosByDestino(record._id)}>
                Ver Productos
              </Button>
            </Space>
          )}
        />
      </Table>

      {/* Modal para crear o editar destino */}
      <Modal
        title={isEditing ? "Editar Destino" : "Crear Destino"}
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateOrUpdate}>
          <Form.Item name="nombre" label="Nombre" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal para ver los productos del destino */}
      <Modal
        title="Productos en el Destino"
        open={isProductModalVisible}
        onCancel={handleProductModalCancel}
        footer={null}
      >
        <Table dataSource={productos} rowKey="_id">
          <Table.Column title="Producto" dataIndex={["producto", "nombre"]} key="producto" />
          <Table.Column title="Cantidad Disponible" dataIndex="cantidad" key="cantidad" />
          <Table.Column title="Fecha Movimiento" dataIndex="fechaMovimiento" key="fechaMovimiento" render={(value) => value && moment(value).format("DD/MM/YYYY")} />
          <Table.Column title="Comentario" dataIndex="comentario" key="comentario" />
        </Table>
      </Modal>
    </div>
  );
};

export default DestinoPage;
