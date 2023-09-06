import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Outlet, useNavigate } from 'react-router-dom';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import './index.css';
import { useStores } from '@/store';
import routes from '../router';

const { Header, Sider, Content } = Layout;

function Layouts() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { systemStore } = useStores();
  const { Config } = systemStore;
  const { opacity, bgImage } = Config;

  const menu = [...routes];
  menu.forEach((item) => {
    item.key = item.path;
  });

  const onMenuClick = (item) => {
    // console.log(item);
    navigate(item.key);
  };

  useEffect(() => {
    navigate('/index');
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <div className="background">
        <div className="background-mask" style={{ opacity }} />
        {bgImage && <img alt="bg" src={bgImage} />}
      </div>

      <Layout
        style={{ position: 'relative', zIndex: 1, background: 'transparent' }}
      >
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo-vertical">Lemon Tools</div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['/index']}
            items={menu}
            onClick={onMenuClick}
          />
        </Sider>
        <Layout style={{ background: 'transparent' }}>
          <Header style={{ padding: 0, background: 'transparent' }}>
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
              minHeight: 280,
              background: 'transparent',
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default observer(Layouts);
