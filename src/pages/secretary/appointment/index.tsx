import { Modal, Form, DatePicker } from 'antd';
import Layout from "../../../components/layout/layoutSecretaria"

const Appointment = () => {
  const [form] = Form.useForm();


  const handleOk = () => {
    form.validateFields().then((values) => {
      console.log('Agendar Consulta:', values);
      form.resetFields();

    });
  };

  return (
    <Layout>
      <Modal title="Agendar Consulta" onOk={handleOk} >
        <Form form={form}>
          <Form.Item label="Data da Consulta" name="dataConsulta" rules={[{ required: true, message: 'Por favor, escolha a data!' }]}>
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Appointment;
