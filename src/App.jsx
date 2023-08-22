import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route,RouterProvider,createBrowserRouter } from 'react-router-dom';
import {  ConfigProvider, theme } from 'antd';
import "./App.css";

import Layouts from "./layouts";
import Index from '@/pages/index';
import CreateIcon from '@/pages/create-icon';

import {routes} from '@/router'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layouts />,
      children: routes,
    },
  ]);
  return (
    <ConfigProvider
    theme={{
      // 2. 组合使用暗色算法与紧凑算法
      algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
    }}
  >
    <RouterProvider router={router} />
  </ConfigProvider>
    
  );
}

export default App;
