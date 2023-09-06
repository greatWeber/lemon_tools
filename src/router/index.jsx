import React from 'react';
import {
  PictureOutlined,
  HomeOutlined,
  AppleOutlined,
  CalendarOutlined,
  SettingOutlined,
} from '@ant-design/icons';

import Index from '@/pages/index';
import CreateIcon from '@/pages/create-icon';
import SysInfo from '@/pages/sys-info';
import Calendar from '@/pages/calendar';
import Config from '@/pages/config';

const routes = [
  {
    path: '/index',
    icon: <HomeOutlined />,
    label: '首页',
    element: <Index />,
  },
  {
    path: '/create-icon',
    icon: <PictureOutlined />,
    label: '生成logo',
    element: <CreateIcon />,
  },
  {
    path: '/calendar',
    icon: <CalendarOutlined />,
    label: '日历',
    element: <Calendar />,
  },
  {
    path: '/sys-info',
    icon: <AppleOutlined />,
    label: '系统信息',
    element: <SysInfo />,
  },
  {
    path: '/config',
    icon: <SettingOutlined />,
    label: '系统配置',
    element: <Config />,
  },
];

export default routes;
