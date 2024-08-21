import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Space,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Checkbox,
  message,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Option } = Select;

const API_URL = "https://apiwebinventariotimser.azurewebsites.net/api"; // Actualiza con tu URL de la API

const ProductoPage = () => {
  const [productos, setProductos] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [ubicaciones, setUbicaciones] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchProductos();
    fetchProveedores();
    fetchUbicaciones();
  }, []);

  const fetchProductos = async () => {
    try {
      const response = await axios.get(`${API_URL}/productos`);
      setProductos(response.data);
    } catch (error) {
      console.error("Error fetching productos:", error);
      message.error("Error al cargar los productos");
    }
  };

  const fetchProveedores = async () => {
    try {
      const response = await axios.get(`${API_URL}/proveedores`);
      setProveedores(response.data);
    } catch (error) {
      console.error("Error fetching proveedores:", error);
      message.error("Error al cargar los proveedores");
    }
  };

  const fetchUbicaciones = async () => {
    try {
      const response = await axios.get(`${API_URL}/ubicaciones`);
      setUbicaciones(response.data);
    } catch (error) {
      console.error("Error fetching ubicaciones:", error);
      message.error("Error al cargar las ubicaciones");
    }
  };

  const handleCreateOrUpdate = async (values) => {
    try {
      if (isEditing) {
        await axios.put(`${API_URL}/productos/${selectedProducto._id}`, values);
        message.success("Producto actualizado exitosamente");
      } else {
        await axios.post(`${API_URL}/productos`, values);
        message.success("Producto creado exitosamente");
      }
      fetchProductos();
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Error saving producto:", error);
      message.error("Error al guardar el producto");
    }
  };

  const handleEdit = (producto) => {
    setSelectedProducto(producto);
    setIsEditing(true);
    form.setFieldsValue({
      ...producto,
      proveedor: producto.proveedor?._id,
      ubicacion: producto.ubicacion?._id,
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/productos/${id}`);
      message.success("Producto eliminado exitosamente");
      fetchProductos();
    } catch (error) {
      console.error("Error deleting producto:", error);
      message.error("Error al eliminar el producto");
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
        Crear Producto
      </Button>
      <Table dataSource={productos} rowKey="_id">
        <Table.Column title="Nombre" dataIndex="nombre" key="nombre" />
        <Table.Column title="Proveedor" dataIndex={["proveedor", "nombre"]} key="proveedor" />
        <Table.Column title="Marca" dataIndex="marca" key="marca" />
        <Table.Column title="Presentación" dataIndex="presentacion" key="presentacion" />
        <Table.Column title="Unidad Medida" dataIndex="unidadMedida" key="unidadMedida" />
        <Table.Column title="Código Interno" dataIndex="codigoInterno" key="codigoInterno" />
        <Table.Column title="SKU" dataIndex="sku" key="sku" />
        <Table.Column title="Ubicación" dataIndex={["ubicacion", "nombre"]} key="ubicacion" />
        <Table.Column title="Cantidad por Empaque" dataIndex="cantidadPorEmpaque" key="cantidadPorEmpaque" />
        <Table.Column title="Alcance Preventix" dataIndex="alcancePreventix" key="alcancePreventix" render={(value) => (value ? "Sí" : "No")} />
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
        title={isEditing ? "Editar Producto" : "Crear Producto"}
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateOrUpdate}>
          <Form.Item name="nombre" label="Nombre" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="proveedor" label="Proveedor" rules={[{ required: true }]}>
            <Select>
              {proveedores.map((proveedor) => (
                <Option key={proveedor._id} value={proveedor._id}>
                  {proveedor.nombre}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="marca" label="Marca">
            <Input />
          </Form.Item>
          <Form.Item name="presentacion" label="Presentación">
            <Input />
          </Form.Item>
          <Form.Item name="unidadMedida" label="Unidad Medida">
            <Input />
          </Form.Item>
          <Form.Item name="codigoInterno" label="Código Interno" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="sku" label="SKU" rules={[{ required: true }]}>
            <Input />
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
          <Form.Item name="cantidadPorEmpaque" label="Cantidad por Empaque" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="alcancePreventix" valuePropName="checked" label="Alcance Preventix">
            <Checkbox />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductoPage;
