import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {  ConfigProvider, theme } from 'antd';
import "./App.css";

import Layouts from "./layouts";
import Index from '@/pages/index';
import CreateIcon from '@/pages/create-icon';

function App() {
  return (
    <ConfigProvider
    theme={{
      // 2. 组合使用暗色算法与紧凑算法
      algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
    }}
  >
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layouts />} >
          <Route index path="/index" element={<Index />} />
          <Route path="/create-icon" element={<CreateIcon />} />
        </Route>
        
      </Routes>
    </BrowserRouter>

  </ConfigProvider>
    
  );
}

export default App;
