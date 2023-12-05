import {
  CalendarOutlined,
  InboxOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SolutionOutlined,
  TeamOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from "../../services/auth/auth";

const { Header, Sider, Content } = Layout;

const PersonalLayout = ( props: {children: ReactNode}) => {
    const [active, setActive] = useState("1");
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);

    const {
        token: { colorBgContainer },
      } = theme.useToken();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const menuItems = [
      {
          key: "1",
          icon: <SolutionOutlined />,
          label: 'Pacientes',
          onClick: () => navigate("/secretaria/CRUD")
      },        
      {
          key: "2",
          icon: <TeamOutlined />,
          label: 'Usuários',
          onClick: () => navigate("/admin/gerenciarUsuarios")
      },
      {
          key: "3",
          icon: <CalendarOutlined />,
          label: 'Consultas',
          onClick: () => navigate("/secretaria/agendar")
      },
      {
          key: "4",
          icon: <InboxOutlined />,
          label: 'Estoque',
          onClick: () => navigate("/produtos")
      },
      {
          key: '5',
          icon: <LogoutOutlined />,
          label: 'Sair',
          onClick: handleLogout,
      },
    ];

    return (
        <Layout style={{ minHeight: '100vh', overflow: 'hidden' }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <Menu
            theme="dark"
            mode="inline"
            activeKey={active}
            onClick={({ key }) => {
                const menuItem = menuItems.find(item => item.key === key);
                setActive(key);
                if (menuItem && menuItem.onClick) menuItem.onClick();
            }}
            items={menuItems}
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