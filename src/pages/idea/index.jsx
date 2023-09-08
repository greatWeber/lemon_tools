import React, { useEffect, useState } from 'react';
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
    window.localStorage.setItem('ideaList', JSON.stringify(list));
  }, [list]);

  const addIdea = () => {
    if (!value) return;
    const _ = [...list];
    _.push({
      id: uuidv4(),
      content: value,
      finish: false,
    });
    setList(_);
    setValue('');
  };

  const onDelItem = (data) => {
    let _ = [...list];
    _ = _.filter((item) => item.id !== data.id);
    setList(_);
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
    <div className="idea-wrapper">
      <Input
        className="idea-input"
        value={value}
        size="large"
        placeholder="idea..."
        allowClear
        style={{ borderRadius: 20 }}
        onChange={(e) => setValue(e.target.value)}
        onPressEnter={() => addIdea()}
      />

      <Divider orientation="center">idea list</Divider>
      <List
        size="large"
        bordered
        dataSource={list}
        renderItem={(item) => (
          <List.Item>
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
