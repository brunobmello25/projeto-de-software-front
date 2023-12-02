import { useState } from 'react';
import { Button, Modal, Form, Input, Table, Space, Popconfirm, Row, Col, Select } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined } from '@ant-design/icons';
import Layout from "../../../components/layout/index"


const crudUsers = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [user,setUser] = useState({
        name:'',
        email:'',
        password:'',
        role:'',
    })
    const [showPassword, setShowPassword] = useState(false);
    const [form] = Form.useForm();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser((prevDados) => ({
          ...prevDados,
          [name]: value,
        }));
      };

    const handleOk = () => {
        console.log(user);
        form.validateFields().then((values) => {
            const updatedDataSource = [...dataSource, values];
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

    const roles = ['STORAGE_MANAGER','ADMIN','SECRETARY','DOCTOR']
    
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

    function makeid() {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        let length = Math.random() * (12 - 8) + 8;

        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        setUser((prevUser) => ({
            ...prevUser,
            password: result,
        }));
    }

    return (
        <Layout>
            <div className={'centralized'}>
                <Table dataSource={dataSource} columns={columns} />
                <Button type="primary" onClick={showModal} className='button'>
                    Cadastrar Paciente
                </Button>
                <Modal title="Cadastro de Paciente" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText="Salvar" cancelText="Fechar">
                    <Form form={form}>
                        <Form.Item label="Nome"  rules={[{ required: true, message: 'Por favor, insira o nome!' }]}>
                            <Input value={user.name}  onChange={handleInputChange} name="name"/>
                        </Form.Item>
                        <Form.Item label="Email"  rules={[{ required: true, message: 'Por favor, insira o email!' }]}>
                            <Input type="email" value={user.email} onChange={handleInputChange} name="email"/>
                        </Form.Item>
                        <Form.Item label="Senha" rules={[{ required: true, message: 'Por favor, insira o email!' }]}>
                            <Row gutter={8} align="middle">
                                <Col span={16}>
                                    <Input.Password
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        value={user.password}
                                        name="password"
                                        onChange={handleInputChange}
                                        iconRender={(visible) => (
                                            <Button
                                                type="text"
                                                size="small"
                                                onClick={togglePasswordVisibility}
                                                icon={visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                                            />
                                        )}
                                    />
                                </Col>
                                <Col span={8}>
                                    <Button type="primary" onClick={makeid} className='button'>
                                        Gerar nova senha
                                    </Button>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item>
                            <Select/>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </Layout>
    )
}

export default crudUsers;