import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Button, Modal, Form, Input, Table, Space, Popconfirm} from 'antd';
import "./crud.css"


const { Header, Sider, Content } = Layout;

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
      render: (text, record) => (
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


  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh', overflow: 'hidden' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div  />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Cadastrar Pacientes',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'Agendar Consulta',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: '100%', 
            background: colorBgContainer,
          }}
        >
          <div className={'centralized'}>
            <Table dataSource={dataSource} columns={columns} />
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
        </Content>
      </Layout>
    </Layout>

  );
};

export default Secretary;
