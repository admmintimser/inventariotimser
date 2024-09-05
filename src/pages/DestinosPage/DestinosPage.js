import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Input, Select, Space, message } from "antd";

const { Option } = Select;

const API_URL = "https://apiwebinventariotimser.azurewebsites.net/api";

const DestinoPage = () => {
  const [destinos, setDestinos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDestino, setSelectedDestino] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchDestinos();
    fetchProductos();
  }, []);

  const fetchDestinos = async () => {
    try {
      const response = await axios.get(`${API_URL}/destinos`);
      setDestinos(response.data);
    } catch (error) {
      message.error("Error al cargar los destinos");
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
              <Button onClick={() => handleEdit(record)}>Editar</Button>
              <Button danger onClick={() => handleDelete(record._id)}>Eliminar</Button>
            </Space>
          )}
        />
      </Table>

      <Modal
        title={isEditing ? "Editar Destino" : "Crear Destino"}
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateOrUpdate}>
          <Form.Item name="nombre" label="Nombre" rules={[{ required: true }]}>
            <Input />
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
                      name={[name, 'cantidad']}
                      fieldKey={[fieldKey, 'cantidad']}
                      rules={[{ required: true, message: 'Ingrese la cantidad' }]}
                    >
                      <Input type="number" placeholder="Cantidad" />
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
      </Modal>
    </div>
  );
};

export default DestinoPage;
