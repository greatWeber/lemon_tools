import React, { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { getCurrent, LogicalSize } from '@tauri-apps/api/window';

import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { SUCCESS_CODE } from '@/utils/conf';

import './index.css';

export default function Finder() {
  const [value, setValue] = useState('');
  const [list, setList] = useState([]);

  useEffect(() => {}, [
    document.addEventListener('mousedown', async () => {
      await getCurrent().startDragging();
    }),
  ]);

  useEffect(() => {
    if (list.length > 0) {
      getCurrent().setSize(new LogicalSize(500, 400));
    } else {
      getCurrent().setSize(new LogicalSize(500, 100));
    }
  }, [list]);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onClose = async () => {
    await getCurrent().close();
  };

  const onClear = () => {
    setValue('');
    setList([]);
  };
  const onSearch = async () => {
    if (!value) return;
    let rs = await invoke('search', {
      path: 'Downloads',
      searchName: value,
    }).catch((e) => {
      console.error(e);
      setList([]);
    });
    console.log('search', rs);
    if (rs.code === SUCCESS_CODE) {
      setList(rs.data);
    } else {
      setList([]);
    }
  };

  const onOpenFile = async (path) => {
    await invoke('open_finder', { path }).catch((e) => {
      console.error(e);
    });
  };
  return (
    <div className="finder-wrapper">
      <CloseCircleOutlined className="finder-close" onClick={onClose} />
      <div className="finder-box">
        <div className="input-box">
          <input
            type="text"
            className="finder-input"
            value={value}
            onChange={onChange}
          />
          {value && (
            <CloseCircleOutlined className="finder-clear" onClick={onClear} />
          )}
        </div>

        <span className="finder-btn" onClick={onSearch}>
          <SearchOutlined />
        </span>
      </div>

      {list.length > 0 && (
        <div className="finder-list">
          {list.map((item, index) => {
            return (
              <div
                className="list-item"
                key={index}
                onClick={() => onOpenFile(item)}
              >
                {item}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
