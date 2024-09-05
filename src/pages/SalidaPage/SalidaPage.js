import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Input, Select, DatePicker, Space, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";

const { Option } = Select;

const API_URL = "https://apiwebinventariotimser.azurewebsites.net/api";

const SalidaPage = () => {
  const [salidas, setSalidas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [destinos, setDestinos] = useState([]); // Estado para los destinos
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSalida, setSelectedSalida] = useState(null);
  const [form] = Form.useForm();
  const [ubicaciones, setUbicaciones] = useState([]);

  useEffect(() => {
    fetchSalidas();
    fetchProductos();
    fetchDestinos(); // Llama a la función para cargar los destinos
  }, []);

  const fetchSalidas = async () => {
    try {
        const response = await axios.get(`${API_URL}/salidas`);
        setSalidas(response.data);
    } catch (error) {
        // Verifica si hay una respuesta de error del servidor
        if (error.response && error.response.data && error.response.data.error) {
            // Muestra el mensaje de error específico devuelto por el servidor
            message.error(`Error: ${error.response.data.error}`);
        } else {
            // Muestra un mensaje de error genérico si no se recibe una respuesta específica
            message.error("Error al cargar las salidas");
        }
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

  const fetchDestinos = async () => {
    try {
      const response = await axios.get(`${API_URL}/destinos`); // Asegúrate de que esta ruta exista y devuelva los destinos
      setDestinos(response.data);
    } catch (error) {
      message.error("Error al cargar los destinos");
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
            await axios.put(`${API_URL}/salidas/${selectedSalida._id}`, values);
            message.success("Salida actualizada exitosamente");
        } else {
            await axios.post(`${API_URL}/salidas`, values);
            message.success("Salida creada exitosamente");
        }
        fetchSalidas();
        setIsModalVisible(false);
        form.resetFields();
    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            message.error(`Error: ${error.response.data.error}`);
        } else {
            message.error("Error al guardar la salida");
        }
    }
};

  const handleEdit = (salida) => {
    setSelectedSalida(salida);
    setIsEditing(true);
    form.setFieldsValue({
      ...salida,
      producto: salida.producto?._id,
      fechaSalida: salida.fechaSalida ? moment(salida.fechaSalida) : null,
      destino: salida.destino,  // Incluyendo el destino
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
        await axios.delete(`${API_URL}/salidas/${id}`);
        message.success("Salida eliminada exitosamente");
        fetchSalidas();
    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            message.error(`Error: ${error.response.data.error}`);
        } else {
            message.error("Error al eliminar la salida");
        }
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
        Crear Salida
      </Button>
      <Table dataSource={salidas} rowKey="_id">
        <Table.Column title="Producto" dataIndex={["producto", "nombre"]} key="producto" />
        <Table.Column title="Fecha de Salida" dataIndex="fechaSalida" key="fechaSalida" render={(value) => value && moment(value).format("DD/MM/YYYY")} />
        <Table.Column title="Cantidad de Salida" dataIndex="cantidadSalida" key="cantidadSalida" />
        <Table.Column title="Destino" dataIndex={["destino", "nombre"]} key="destino" /> {/* Muestra el nombre del destino */}
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
        title={isEditing ? "Editar Salida" : "Crear Salida"}
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
          <Form.Item name="fechaSalida" label="Fecha de Salida">
            <DatePicker />
          </Form.Item>
          <Form.Item name="cantidadSalida" label="Cantidad de Salida" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="ubicacion" label="Ubicación" rules={[{ required: true }]}>
  <Select placeholder="Selecciona una ubicación">
    {ubicaciones.map((ubicacion) => (
      <Option key={ubicacion._id} value={ubicacion._id}>
        {ubicacion.nombre}
      </Option>
    ))}
  </Select>
</Form.Item>

          <Form.Item name="destino" label="Destino" rules={[{ required: true }]}>
            <Select placeholder="Selecciona un destino">
              {destinos.map((destino) => (
                <Option key={destino._id} value={destino._id}>
                  {destino.nombre}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SalidaPage;
