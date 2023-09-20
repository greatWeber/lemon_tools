import React, { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import './App.css';

import routes from '@/router';
import { useStores } from '@/store';
import Layouts from './layouts';
import Keyboard from './lib/keyboard';

function App() {
  const { systemStore } = useStores();
  const { isLock } = systemStore;
  useEffect(() => {
    const keyboard = new Keyboard();
    keyboard.onLock(() => {
      systemStore.setIsLock(!isLock);
    });
  }, []);
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
