import { Button, Form, Input } from "antd";
import logo from "../../assets/logo.gif";
import "./index.css";

type FieldType = {
  username?: string;
  password?: string;
};

const Login = () => {
  const [form] = Form.useForm();

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
                    label="Username"
                    name="username"
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
                    <Button type="primary" htmlType="submit">
                        Entrar
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </div>
  );
};

export default Login;
