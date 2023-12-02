import { useState, ReactNode } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';
import { Layout, Menu, theme, Button } from 'antd';

const { Header, Sider, Content } = Layout;

const PersonalLayout = ( props: {children: ReactNode}) => {
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
            {props.children}
        </Content>
      </Layout>
    </Layout>
    )

}

export default PersonalLayout;