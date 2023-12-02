import React, {useState} from 'react';
import { Modal, Form, DatePicker, Button } from 'antd';

const Appointment = () => {
  const [form] = Form.useForm();
  

  const handleOk = () => {
    form.validateFields().then((values) => {
      console.log('Agendar Consulta:', values);
      form.resetFields();
     
    });
  };

  return (
    <Modal title="Agendar Consulta"  onOk={handleOk} >
      <Form form={form}>
        <Form.Item label="Data da Consulta" name="dataConsulta" rules={[{ required: true, message: 'Por favor, escolha a data!' }]}>
          <DatePicker />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Appointment;
