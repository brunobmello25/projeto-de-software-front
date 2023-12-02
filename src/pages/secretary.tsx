import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

  import { Button, Modal, Form, Input, Table } from 'antd';

  const Secretary = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [dataSource, setDataSource] = useState([]);
  
    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
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
    ];
  
    return (
      <div>
        <Button type="primary" onClick={showModal}>
          Cadastrar Paciente
        </Button>
        <Modal
          title="Cadastro de Paciente"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form>
            <Form.Item label="Nome">
              <Input /> 
            </Form.Item>
            <Form.Item label="Email">
              <Input type="email" /> 
            </Form.Item>
          </Form>
        </Modal>
  
        <Table dataSource={dataSource} columns={columns} />
      </div>
    );
  };

export default Secretary;
