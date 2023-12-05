import { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, Table, Space, Popconfirm } from 'antd';
import "./crud.css"
import Layout from "../../../components/layout/layoutSecretaria"
import { createPatient, deletePatient, getListPatients, updatePatient } from "../../../services/secretaria/index"

const Secretary = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [form] = Form.useForm();
  const [patient, setPatient] = useState({
    name: '',
    email: '',
    cpf: '',
  })
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [error, setError] = useState('');
  const [isModalVisibleError, setIsModalVisibleError] = useState(false);

  const loadPatients = async () => {
    const listPatients = await getListPatients();
    const patientsWithKey = listPatients.map(patient => ({ ...patient, key: patient.id }));
    return patientsWithKey;
  }


  const loadData = async () => {
    try {
      const users = await loadPatients();
      setDataSource(users);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, [dataSource]);

  const showModal = () => {
    setIsModalVisible(true);
  };


  const handleOk = async () => {
    try {
      await createPatient(patient);
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


  const handleDelete = async (user: any) => {
    try {
      const response = await deletePatient(user);
      if (response.status >= 200 && response.status <= 203) {
        const updatedDataSource = dataSource.filter((item) => item !== user);
        setDataSource(updatedDataSource);
      }
    } catch (err) {
      console.log(err);
    }

  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
    form.resetFields();
  }

  const showEditModal = (record: any) => {
    setPatient(record);
    form.setFieldsValue(record);
    setIsEditModalVisible(true);
  };

  const handleEditOk = async () => {
    try {
      await updatePatient(patient);
      form.resetFields();
      setIsEditModalVisible(false);
      loadData();
    } catch (error: any) {
      setError(error.message);
      setIsModalVisibleError(true);
    }
  };

  const handleCancelError = () => {
    setIsModalVisibleError(false)
  }

  const handleInputChange = (name: string, value: string) => {
    setPatient((prevDados) => ({
      ...prevDados,
      [name]: value,
    }));
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
      title: 'CPF',
      dataIndex: 'cpf',
      key: 'cpf',
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (record: any) => (
        <Space size="middle">
          <a onClick={() => showEditModal(record)}>Editar</a>
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
        <Modal title="Cadastro de Paciente" open={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText="Salvar" cancelText="Fechar">
          <Form form={form}>
            <Form.Item label="Nome" name="name" rules={[{ required: true, message: 'Por favor, insira o nome!' }]}>
              <Input
                value={patient.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                name="name" />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Por favor, insira o email!' }]}>
              <Input
                value={patient.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                name="email" />
            </Form.Item>
            <Form.Item label="CPF" name="cpf" rules={[{ required: true, message: 'Por favor, insira o cpf!' }, { max: 11, message: "Digite 11 digitos" }, { min: 11, message: "Digite 11 digitos"}]}>
              <Input
                minLength={11}
                maxLength={11}
                value={patient.cpf}
                onChange={(e) => handleInputChange('cpf', e.target.value)}
                name="cpf" />
            </Form.Item>
          </Form>
        </Modal>
        <Modal title="Editar Usuário" open={isEditModalVisible} onOk={handleEditOk} onCancel={handleEditCancel} okText="Salvar" cancelText="Fechar">
          <Form form={form} initialValues={patient}>
            <Form.Item label="Nome" name="name" rules={[{ required: true, message: 'Por favor, insira o nome!' }]}>
              <Input
                value={patient.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                name="name" />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Por favor, insira o email!' }]}>
              <Input
                value={patient.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                name="email" />
            </Form.Item>
            <Form.Item label="CPF" name="cpf" rules={[{ required: true, message: 'Por favor, insira o cpf!' }, { max: 11, message: "Digite 11 digitos" }, { min: 11, message: "Digite 11 digitos"}]}>
              <Input
                maxLength={11}
                minLength={11}
                value={patient.cpf}
                onChange={(e) => handleInputChange('cpf', e.target.value)}
                name="cpf" />
            </Form.Item>
          </Form>
        </Modal>
        <Modal open={isModalVisibleError} onCancel={handleCancelError} okText="Ok">
          {error}
        </Modal>
      </div>
    </Layout>

  );
};

export default Secretary;
