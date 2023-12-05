import { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, Table } from 'antd';
import Layout from "../../../components/layout/layoutAdmin"
import { createProduct, getListProducts } from "../../../services/product/index"

const Product = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [error, setError] = useState('');
    const [isModalVisibleError, setIsModalVisibleError] = useState(false);
    const [form] = Form.useForm();
    const [product, setProduct] = useState({
        name: '',
        number: '',
        quantity: '',
    })

    const loadUsers = async () => {
        const listUsers = await getListProducts();
        const usersWithKey = listUsers.map(product => ({ ...product, key: product.id }));
        return usersWithKey;
    }

    const loadData = async () => {
        try {
            const users = await loadUsers();
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

    const handleCancelError = () => {
        setIsModalVisibleError(false)
    }

    const handleInputChange = (name: string, value: string) => {
        setProduct((prevDados) => ({
            ...prevDados,
            [name]: value,
        }));
    };

    const columns = [
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
        }
    ];

    return (
        <Layout>
            <div className={'centralized'}>
                <Table dataSource={dataSource} columns={columns} />
                <Button type="primary" onClick={showModal} className='button'>
                    Cadastrar Produto
                </Button>
                <Modal title="Cadastro de Produto" open={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText="Salvar" cancelText="Fechar">
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
                                value={product.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                name="name"
                            />
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

export default Product;