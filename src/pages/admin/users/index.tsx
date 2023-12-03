import { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, Table, Space, Popconfirm, Row, Col, Select } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined } from '@ant-design/icons';
import Layout from "../../../components/layout/index"
import { createUser } from "../../../services/admin/index"

const crudUsers = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [roles] = useState([
        { id: 'ADMIN', name: 'Administrador' },
        { id: 'DOCTOR', name: 'Médico' },
        { id: 'SECRETARY', name: 'Secretária' },
        { id: 'STORAGE_MANAGER', name: 'Gerente de estoque' },
    ]);
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
    })
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isModalVisibleError, setIsModalVisibleError] = useState(false);
    const [form] = Form.useForm();


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleInputChange = (name: string, value: string) => {
        setUser((prevDados) => ({
            ...prevDados,
            [name]: value,
        }));
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            await createUser(values);
            form.resetFields();
            setIsModalVisible(false);
        } catch (error: any) {
            console.error(error.message);
            setError(error.message);
            setIsModalVisibleError(true);
        }
    };


    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleDelete = (record: any) => {
        const updatedDataSource = dataSource.filter((item) => item !== record);
        setDataSource(updatedDataSource);
    };

    const handleCancelError = () => {
        setIsModalVisibleError(false)
    }

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
            title: 'Cargo',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Ações',
            key: 'actions',
            render: (record: any) => (
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
                <Modal title="Cadastro de Paciente" open={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText="Salvar" cancelText="Fechar">
                    <Form form={form}>
                        <Form.Item
                            label="Nome"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor, insira o nome!',
                                },
                            ]}
                            validateTrigger={['onChange', 'onBlur']}
                            hasFeedback
                        >
                            <Input
                                value={user.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                name="name"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor, insira o email!',
                                },
                            ]}
                            validateTrigger={['onChange', 'onBlur']}
                            hasFeedback
                        >
                            <Input
                                type="email"
                                value={user.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                name="email"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Senha"
                            name="password"
                            validateTrigger={['onChange', 'onBlur']}
                            hasFeedback>
                            <Row gutter={8} align="middle">
                                <Col span={16}>
                                    <Input.Password
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        value={user.password}
                                        name="password"
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
                        <Form.Item
                            label="Seleciona o cargo"
                            name="role"
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor, selecione um cargo!',
                                },
                            ]}
                            validateTrigger={['onChange']}
                            hasFeedback
                        >
                            <Select
                                value={user.role}
                                onChange={(value) => handleInputChange('role', value)}
                            >
                                {roles.map((role) => (
                                    <Select.Option key={role.id} value={role.id}>
                                        {role.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
            <Modal open={isModalVisibleError} onCancel={handleCancelError} okText="Ok">
                {error}
            </Modal>
        </Layout >
    )
}

export default crudUsers;