import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import './App.css';

import routes from '@/router';
import Layouts from './layouts';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
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
