/* eslint-disable no-shadow */
import React, { useEffect, useState, useRef } from 'react';
import { Input, Divider, List, Switch } from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';

export default function Idea() {
  const [value, setValue] = useState('');
  const [list, setList] = useState([]);

  useEffect(() => {
    let _ = window.localStorage.getItem('bugList');
    if (!_) return;
    _ = JSON.parse(_);
    setList(_);
  }, []);

  const setLocalStorage = (value) => {
    window.localStorage.setItem('bugList', JSON.stringify(value));
  };

  const addBug = () => {
    if (!value) return;
    const _ = [...list];
    _.push({
      id: uuidv4(),
      content: value,
      finish: false,
    });
    setList(_);
    setValue('');
    setLocalStorage(_);
  };

  const onDelItem = (data) => {
    let _ = [...list];
    _ = _.filter((item) => item.id !== data.id);
    setList(_);
    setLocalStorage(_);
  };

  const onSwitch = (data) => {
    const _ = [...list];
    for (const item of _) {
      if (item.id === data.id) {
        item.finish = !item.finish;
      }
    }
    setList(_);
  };

  return (
    <div className="bug-wrapper">
      <Input
        className="bug-input"
        value={value}
        size="large"
        placeholder="bug report..."
        allowClear
        style={{ borderRadius: 20 }}
        onChange={(e) => setValue(e.target.value)}
        onPressEnter={() => addBug()}
      />

      <Divider orientation="center">bug list</Divider>
      <List
        size="large"
        bordered
        dataSource={list}
        renderItem={(item) => (
          <List.Item style={{ fontSize: 18 }}>
            <CloseCircleOutlined onClick={() => onDelItem(item)} />
            <p>{item.content}</p>
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              checked={item.finish}
              onChange={() => onSwitch(item)}
            />
          </List.Item>
        )}
      />
    </div>
  );
}
