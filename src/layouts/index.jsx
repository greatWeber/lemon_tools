

import React, { useState,useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  PictureOutlined,
  HomeOutlined,
  AppleOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import './index.css';
import { routes } from '../router';

const { Header, Sider, Content } = Layout;


const Layouts = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menu = [...routes];
  menu.forEach(item=>{ 
    item.key = item.path 
  })
 

  const onMenuClick = (item)=> {
    // console.log(item);
    navigate(item.key);
  }

  useEffect(()=>{
    navigate('/index')
  },[])

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo-vertical" >Lemon Tools</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['/index']}
          items={menu}
          onClick={onMenuClick}
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
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Layouts;