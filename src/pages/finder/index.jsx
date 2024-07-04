import React, { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { getCurrent } from '@tauri-apps/api/window';

import './index.css';

export default function Finder() {
  const [value, setValue] = useState('');

  useEffect(() => {
    document.addEventListener('mousedown', async (e) => {
      await getCurrent().startDragging();
    });
  }, []);

  const onChange = (e) => {
    console.log(e);
  };
  const onSearch = async () => {
    console.log('search');
    let rs = await invoke('search', {
      path: 'Downloads',
      searchName: 'AEM',
    }).catch((e) => {
      console.error(e);
    });
    console.log('search', rs);
  };
  return (
    <div className="finder-wrapper" data-tauri-drag-region>
      <div className="finder-box">
        <input
          type="text"
          className="finder-input"
          value={value}
          onChange={onChange}
        />
        <button className="finder-btn" onClick={onSearch}>
          search
        </button>
      </div>
    </div>
  );
}
