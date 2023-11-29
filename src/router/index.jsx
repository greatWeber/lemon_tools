import React from 'react';
import {
  PictureOutlined,
  HomeOutlined,
  AppleOutlined,
  CalendarOutlined,
  SettingOutlined,
  Html5Outlined,
  AlertOutlined,
  BugOutlined,
  VideoCameraAddOutlined,
} from '@ant-design/icons';

import Index from '@/pages/index';
import CreateIcon from '@/pages/create-icon';
import SysInfo from '@/pages/sys-info';
import Calendar from '@/pages/calendar';
import Config from '@/pages/config';
import Webfront from '@/pages/webfront';
import Idea from '@/pages/idea';
import Video from '@/pages/video';
import BugReport from '@/pages/bug-report';
import VideoConvert from '../pages/video-convert';

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
    path: '/webfront',
    icon: <Html5Outlined />,
    label: '前端tool',
    element: <Webfront />,
  },
  {
    path: '/video',
    icon: <Html5Outlined />,
    label: 'video',
    element: <Video />,
  },
  {
    path: '/video-convert',
    icon: <VideoCameraAddOutlined />,
    label: '视频格式转换',
    element: <VideoConvert />,
  },
  {
    path: '/config',
    icon: <SettingOutlined />,
    label: '系统配置',
    element: <Config />,
  },
  {
    path: '/idea',
    icon: <AlertOutlined />,
    label: 'idea记录',
    element: <Idea />,
  },
  {
    path: '/bug',
    icon: <BugOutlined />,
    label: 'bug报告',
    element: <BugReport />,
  },
  {
    path: '/sys-info',
    icon: <AppleOutlined />,
    label: '系统信息',
    element: <SysInfo />,
  },
];

export default routes;
