import React, { useState, useEffect } from 'react';
import { convertFileSrc } from '@tauri-apps/api/core';
import { appDataDir, join } from '@tauri-apps/api/path';
import { observer } from 'mobx-react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import './index.css';
import { useStores } from '@/store';
import withTransition from '@/components/hoc/WithTransition';
import routes from '../router';

const { Header, Sider, Content } = Layout;

// console.log(lockTransition);

function Layouts() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [videoSrc, setVideoSrc] = useState('');
  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();
  const { systemStore } = useStores();
  const { Config, isLock } = systemStore;
  const { opacity, bgImage, isBgVideo, bgVideo, videoType } = Config;

  const LockTransition = withTransition(LockOutlined);

  const menu = [];
  routes.map((item) => {
    item.key = item.path;
    if (!item.hidden) {
      menu.push(item);
    }
  });

  const onMenuClick = (item) => {
    // console.log(item);
    navigate(item.key);
  };

  const changeLock = () => {
    systemStore.setIsLock(!isLock);
  };

  useEffect(() => {
    navigate('/index');
  }, []);

  useEffect(() => {
    appDataDir().then((appDataDirPath) => {
      console.log('appDataDirPath', appDataDirPath);
    });
    if (bgVideo) {
      console.log('bgVideo', bgVideo);
      setVideoSrc(convertFileSrc(bgVideo));
    }
  }, [bgVideo]);

  return (
    <div style={{ position: 'relative' }}>
      <div className="background" style={{ zIndex: isLock ? 999 : 0 }}>
        <div
          className="background-mask"
          style={{ opacity, zIndex: isLock ? 0 : 999 }}
        />
        {bgImage && <img alt="bg" src={bgImage} />}
        {isBgVideo && videoSrc && (
          <video id="bg-video" autoPlay loop muted>
            <source src={videoSrc} type={`video/${videoType}`} />
          </video>
        )}
        <div
          className="background-lock"
          role="button"
          tabIndex={0}
          onClick={() => changeLock()}
        >
          {isLock && <LockTransition />}
        </div>
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
