/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Button } from 'antd';

export default function VideoComponent() {
  const onOpen = () => {
    window.__TAURI__.dialog.open().then((localPath) => {
      console.log('Video selected', localPath, localPath.split('.').pop());
      const apiPath = window.__TAURI__.tauri.convertFileSrc(localPath);
      console.log('API Path', apiPath);
    });
  };
  return (
    <div>
      <Button type="primary" onClick={() => onOpen()}>
        打开视频
      </Button>
    </div>
  );
}
