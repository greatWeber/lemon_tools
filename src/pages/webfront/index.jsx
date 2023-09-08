import React from 'react';
import { Collapse } from 'antd';
import Json from './components/json';

// const { Panel } = Collapse;

export default function Webfront() {
  const items = [{ key: '1', label: 'JSON 格式化', children: <Json /> }];

  return <Collapse defaultActiveKey={['1']} items={items} />;
}
