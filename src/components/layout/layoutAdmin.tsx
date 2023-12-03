import { useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme, Button } from 'antd';
import { logout } from "../../services/auth/auth"; 

const { Header, Sider, Content } = Layout;

const PersonalLayoutAdmin = (props: { children: ReactNode }) => {
   const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const menuItems = [
        {
            key: '1',
            icon: <UserOutlined />,
            label: 'Cadastrar Usuários',
        },
        {
            key: '2',
            icon: <LogoutOutlined />,
            label: 'Sair',
            onClick: handleLogout,
            
        },
    ];

    return (
        <Layout style={{ minHeight: '100vh', overflow: 'hidden' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    onClick={({ key }) => {
                        const menuItem = menuItems.find(item => item.key === key);
                        if (menuItem && menuItem.onClick) {
                            menuItem.onClick();
                        }
                    }}
                >
                    {menuItems.map(item => (
                        <Menu.Item key={item.key} icon={item.icon} style={{ marginLeft: 'auto' }}>
                            {item.label}
                        </Menu.Item>
                    ))}
                </Menu>
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
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
    );
};

export default PersonalLayoutAdmin;