import { useState } from 'react';
import { Button, Modal, Form, Input, Table, Space, Popconfirm } from 'antd';
import "./crud.css"
import Layout from "../../../components/layout/index"

const Secretary = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const updatedDataSource = [...dataSource, values];
      setDataSource(updatedDataSource);
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleDelete = (record) => {
    const updatedDataSource = dataSource.filter((item) => item !== record);
    setDataSource(updatedDataSource);
  };

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (record) => (
        <Space size="middle">
          <a onClick={() => console.log('Editar', record)}>Editar</a>
          <Popconfirm
            title="Tem certeza de que deseja deletar?"
            onConfirm={() => handleDelete(record)}
            okText="Sim"
            cancelText="Não"
          >
            <a style={{ color: 'red' }}>Deletar</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Layout>
      <div className={'centralized'}>
        <Table size={"small"} dataSource={dataSource} columns={columns} />
        <Button type="primary" onClick={showModal} className='button'>
          Cadastrar Paciente
        </Button>
        <Modal title="Cadastro de Paciente" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText="Salvar" cancelText="Fechar">
          <Form form={form}>
            <Form.Item label="Nome" name="name" rules={[{ required: true, message: 'Por favor, insira o nome!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Por favor, insira o email!' }]}>
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </Layout>

  );
};

export default Secretary;
