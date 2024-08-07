import React from 'react';
import { Collapse } from 'antd';
import Json from './components/json';
import PicCompress from './components/pic-compress';
import FinderCart from './components/finder';
import EnergyBar from './components/energy-bar';

// const { Panel } = Collapse;

export default function Webfront() {
  const items = [
    { key: '1', label: 'JSON 格式化', children: <Json /> },
    { key: '2', label: '图片压缩', children: <PicCompress /> },
    { key: '3', label: 'finder', children: <FinderCart /> },
    { key: '4', label: '能量条', children: <EnergyBar /> },
  ];

  return <Collapse defaultActiveKey={['1', '2', '3', '4']} items={items} />;
}
