import React from 'react';
import { Collapse } from 'antd';
import Json from './components/json';
import PicCompress from './components/pic-compress';

// const { Panel } = Collapse;

export default function Webfront() {
  const items = [
    { key: '1', label: 'JSON 格式化', children: <Json /> },
    { key: '2', label: '图片压缩', children: <PicCompress /> },
  ];

  return <Collapse defaultActiveKey={['1', '2']} items={items} />;
}
