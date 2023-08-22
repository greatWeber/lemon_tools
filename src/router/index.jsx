
import {
  PictureOutlined,
  HomeOutlined,
  AppleOutlined,
} from '@ant-design/icons';

import {
  createBrowserRouter,
} from "react-router-dom";

import Layouts from "@/layouts";
import Index from '@/pages/index';
import CreateIcon from '@/pages/create-icon';
import SysInfo from '@/pages/sys-info';

export const routes = [
  {
    path: '/index',
    icon: <HomeOutlined />,
    label: '首页',
    element:<Index />
  },
  {
    path: '/create-icon',
    icon: <PictureOutlined />,
    label: '生成logo',
    element:<CreateIcon />
  },
  {
    path: '/sys-info',
    icon: <AppleOutlined />,
    label: '系统信息',
    element:<SysInfo />
  },
];


