<<<<<<< Updated upstream
import { DeleteOutlined } from "@ant-design/icons";
=======
import { useState, useEffect } from "react";
import { Button, Modal, Form, Input, Table } from "antd";
import Layout from "../../../components/layout";
>>>>>>> Stashed changes
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Table
} from "antd";
import { useEffect, useState } from "react";
import Layout from "../../../components/layout";
import {
  addProduct,
  createProduct,
  deleteProduct,
  getListProducts,
  getListStock,
  removeStorage
} from "../../../services/product/index";

const Product = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalStorageVisible, setIsModalStorageVisible] = useState(false);
  const [productData, setProductData] = useState([]);
  const [stockData, setStockData] = useState([]);
  const [error, setError] = useState("");
  const [isModalVisibleError, setIsModalVisibleError] = useState(false);
  const [form] = Form.useForm();
  const [storageForm] = Form.useForm();
  const [product, setProduct] = useState({
    name: "",
  });

  const loadProducts = async () => {
    const listProducts = await getListProducts();
    console.log(listProducts);
    const productsList = listProducts.map((product: { id: any }) => ({
      ...product,
      key: product.id,
    }));
    return productsList;
  };

  const loadStock = async () => {
    const listStock = await getListStock();
    console.log(listStock);
    const stockList = listStock.map((stock: { id: any }) => ({
      ...stock,
      key: stock.id,
    }));
    return stockList;
  };

  const loadData = async () => {
    try {
      const products = await loadProducts();
      const stock = await loadStock();
      setProductData(products);
      setStockData(stock);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, [isModalVisible, isModalStorageVisible]);

  const handleOk = async () => {
    try {
      await createProduct(product);
      form.resetFields();
      setIsModalVisible(false);
    } catch (error: any) {
      setError(error.message);
      setIsModalVisibleError(true);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleStorageOk = async () => {
    try {
      await addProduct(product);
      storageForm.resetFields();
      setIsModalStorageVisible(false);
    } catch (error: any) {
      setError(error.message);
      setIsModalVisibleError(true);
    }
  };

  const handleStorageCancel = () => {
    setIsModalStorageVisible(false);
    storageForm.resetFields();
  };

  const handleCancelError = () => {
    setIsModalVisibleError(false);
  };

  const handleInputChange = (name: string, value: string) => {
    setProduct((prevDados) => ({
      ...prevDados,
      [name]: value,
    }));
  };

  const productColumns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ações",
      key: "action",
      render: (_: any, record: any) => (
        <a
          onClick={() => {
            deleteProduct(record.id);
            setProductData(
              productData.filter((item: any) => item.id !== record.id)
            );
          }}
        >
          <DeleteOutlined />
        </a>
      ),
    },
  ];

  const stockColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Produto",
      key: "product",
      render: (_: any, record: any) => record.product.name,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Ações",
      key: "action",
      render: (_: any, record: any) => (
        <a
          onClick={() => {
            removeStorage(record.productId);
            setStockData(
              stockData.filter((item: any) => item.id !== record.id)
            );
          }}
        >
          <DeleteOutlined />
        </a>
      ),
    },
  ];

  return (
    <Layout>
      <div className={"centralized"}>
        <div className="row">
          <p className="table-title">Produtos</p>
          <Button
            type="primary"
            onClick={() => setIsModalVisible(true)}
            className="button"
          >
            Cadastrar Produto
          </Button>
        </div>
        <Table
          size={"small"}
          dataSource={productData}
          columns={productColumns}
        />
        <div className="row">
          <p className="table-title">Estoque</p>
          <Button
            type="primary"
            onClick={() => setIsModalStorageVisible(true)}
            className="button"
          >
            Adicionar Produto
          </Button>
        </div>
        <Table size={"small"} dataSource={stockData} columns={stockColumns} />
      </div>

      <Modal
        title="Cadastro de Produto"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Salvar"
        cancelText="Fechar"
      >
        <Form form={form}>
          <Form.Item
            label="Nome"
            name="name"
            rules={[
              {
                required: true,
                message: "Por favor, insira o nome!",
              },
            ]}
            validateTrigger={["onChange", "onBlur"]}
            hasFeedback
          >
            <Input
              value={product.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              name="name"
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Adicionar ao estoque"
        open={isModalStorageVisible}
        onOk={handleStorageOk}
        onCancel={handleStorageCancel}
        okText="Salvar"
        cancelText="Fechar"
      >
        <Form form={storageForm}>
          <Form.Item
            label="Selecione o produto"
            name="productId"
            rules={[
              {
                required: true,
                message: "Por favor, selecione um produto!",
              },
            ]}
            validateTrigger={["onChange"]}
            hasFeedback
          >
            <Select onChange={(value) => handleInputChange("productId", value)}>
              {productData.length > 0 &&
                productData.map((product: any) => (
                  <Select.Option key={product.id} value={product.id}>
                    {product.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Quantidade"
            name="quantity"
            rules={[
              {
                required: true,
                message: "Por favor, insira a quantidade!",
              },
            ]}
            validateTrigger={["onChange", "onBlur"]}
            hasFeedback
          >
            <Input
              onChange={(e) => handleInputChange("quantity", e.target.value)}
              name="quantity"
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        open={isModalVisibleError}
        onCancel={handleCancelError}
        okText="Ok"
      >
        {error}
      </Modal>
    </Layout>
  );
};

export default Product;
