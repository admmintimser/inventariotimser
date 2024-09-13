import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Input, Select, DatePicker, Space, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";

const { Option } = Select;

const API_URL = "https://apiwebinventariotimser.azurewebsites.net/api";

const InventarioPage = () => {
  const [inventarios, setInventarios] = useState([]);
  const [productos, setProductos] = useState([]);
  const [ubicaciones, setUbicaciones] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedInventario, setSelectedInventario] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchInventarios();
    fetchProductos();
    fetchUbicaciones();
  }, []);

  const fetchInventarios = async () => {
    try {
      const response = await axios.get(`${API_URL}/inventarios`);
      setInventarios(response.data);  // Guardar inventarios obtenidos
    } catch (error) {
      message.error("Error al cargar los inventarios");
    }
  };

  const fetchProductos = async () => {
    try {
      const response = await axios.get(`${API_URL}/productos`);
      setProductos(response.data);  // Guardar productos obtenidos
    } catch (error) {
      message.error("Error al cargar los productos");
    }
  };

  const fetchUbicaciones = async () => {
    try {
      const response = await axios.get(`${API_URL}/ubicaciones`);
      setUbicaciones(response.data);  // Guardar ubicaciones obtenidas
    } catch (error) {
      message.error("Error al cargar las ubicaciones");
    }
  };

  const handleCreateOrUpdate = async (values) => {
    try {
      if (isEditing) {
        await axios.put(`${API_URL}/inventarios/${selectedInventario._id}`, values);
        message.success("Inventario actualizado exitosamente");
      } else {
        await axios.post(`${API_URL}/inventarios`, values);
        message.success("Inventario creado exitosamente");
      }
      fetchInventarios();
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error("Error al guardar el inventario");
    }
  };

  const handleEdit = (inventario) => {
    setSelectedInventario(inventario);
    setIsEditing(true);
    form.setFieldsValue({
      ...inventario,
      producto: inventario.producto?._id,
      ubicacion: inventario.ubicacion?._id,
      caducidad: inventario.caducidad ? moment(inventario.caducidad) : null,
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/inventarios/${id}`);
      message.success("Inventario eliminado exitosamente");
      fetchInventarios();
    } catch (error) {
      message.error("Error al eliminar el inventario");
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
      {/* <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
        Crear Inventario
      </Button> */}
      <Table dataSource={inventarios} rowKey="_id">
        <Table.Column 
          title="Producto" 
          dataIndex="producto" 
          key="producto" 
          render={(producto) => (producto ? producto.nombre : "Sin Producto")} 
        />
        <Table.Column 
          title="Ubicación" 
          dataIndex="ubicacion" 
          key="ubicacion" 
          render={(ubicacion) => (ubicacion ? ubicacion.nombre : "Sin Ubicación")} 
        />
        <Table.Column 
          title="Cantidad Disponible" 
          dataIndex="cantidadDisponible" 
          key="cantidadDisponible" 
        />
        <Table.Column 
          title="Caducidad" 
          dataIndex="caducidad" 
          key="caducidad" 
          render={(value) => value && moment(value).format("DD/MM/YYYY")} 
        />
        <Table.Column title="Lote" dataIndex="lote" key="lote" />
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
        title={isEditing ? "Editar Inventario" : "Crear Inventario"}
        open={isModalVisible}
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
          <Form.Item name="ubicacion" label="Ubicación" rules={[{ required: true }]}>
            <Select>
              {ubicaciones.map((ubicacion) => (
                <Option key={ubicacion._id} value={ubicacion._id}>
                  {ubicacion.nombre}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="cantidadDisponible" label="Cantidad Disponible" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="caducidad" label="Caducidad">
            <DatePicker />
          </Form.Item>
          <Form.Item name="lote" label="Lote" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default InventarioPage;
