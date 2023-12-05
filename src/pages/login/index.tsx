import { Button, Form, Input } from "antd";
import logo from "../../assets/logo.gif";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth/auth";
import "./index.css";

interface FieldType {
  email?: string;
  password?: string;
}

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const handleOnClick = async () => {
    try {
      const values = form.getFieldsValue();
      console.log({ values });
      await login(values);
      navigate("/admin/gerenciarUsuarios");
    } catch (error) {
      console.error(error);
      alert("Falha ao entrar no sistema. Favor verificar suas credenciais.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <img src={logo} />
        <Form
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
        >
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Senha"
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" onClick={handleOnClick}>
              Entrar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
