import React, { useRef } from 'react';
import { Row, Col, Button, Alert, message, Spin } from 'antd';
import { FolderOpenOutlined, CloseSquareOutlined } from '@ant-design/icons';

import { WebviewWindow } from '@tauri-apps/api/window';

export default function EnergyBar(props) {
  const webview = useRef(null);
  const onOpen = () => {
    webview.current = new WebviewWindow('EnergyBar', {
      url: '/energyBar',
      height: 500,
      width: 300,
      focus: true,
      // hiddenTitle: false,
      transparent: true,
      decorations: false,
      //   titleBarStyle: 'overlay',
      alwaysOnTop: true,
      resizable: false,
    });
    console.log(webview.current);
  };
  const onClose = () => {
    webview.current && webview.current.close();
  };
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Col>
        <Button
          type="primary"
          className="mr-10"
          icon={<FolderOpenOutlined />}
          onClick={onOpen}
        >
          打开能量条
        </Button>

        <Button type="primary" icon={<CloseSquareOutlined />} onClick={onClose}>
          关闭能量条
        </Button>
      </Col>
    </Row>
  );
}
