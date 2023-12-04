import React, { useState } from 'react';
import { Row, Col, Input, Button, Alert, message, Spin } from 'antd';
import {
  FileImageOutlined,
  FolderOpenOutlined,
  CaretRightOutlined,
  RestOutlined,
} from '@ant-design/icons';
import { invoke } from '@tauri-apps/api/tauri';
import { SUCCESS_CODE } from '@/utils/conf';

export default function PicCompress() {
  const [messageApi, contextHolder] = message.useMessage();

  const [imgPath, setImgPath] = useState('');
  const [dirPath, setDirPath] = useState('');
  const [loading, setLoading] = useState(false);

  const onSelectFile = (type) => {
    const options =
      type === 'image'
        ? {
            filters: [
              {
                name: 'Image',
                extensions: ['jpg', 'png', 'jpeg'],
              },
            ],
          }
        : { directory: true };
    window.__TAURI__.dialog.open(options).then((localPath) => {
      console.log('localPath', localPath);
      if (type === 'image') {
        setImgPath(localPath);
      } else {
        setDirPath(localPath);
      }
    });
  };

  const compressCode = async (path, type) => {
    let rs;
    if (type === 'image') {
      rs = await invoke('compress_pic', { path });
    } else {
      rs = await invoke('compress_dir', { path });
    }

    console.log('compress:', rs);
    if (rs.code === SUCCESS_CODE) {
      messageApi.open({
        type: 'success',
        content: rs.message,
      });
    } else {
      messageApi.open({
        type: 'warning',
        content: rs.message,
      });
    }
  };

  const onSubmit = async () => {
    let path = imgPath ? imgPath : dirPath;
    let type = imgPath ? 'image' : 'dir';
    setLoading(true);
    await compressCode(path, type).finally(() => {
      setLoading(false);
    });
    // if (imgPath) {
    //   await compressCode(imgPath, 'image');
    // } else if (dirPath) {
    //   await compressCode(dirPath, 'dir');
    // }
  };

  const onDelete = () => {
    setImgPath('');
    setDirPath('');
  };

  return (
    <>
      {contextHolder}
      <Spin tip="Loading..." spinning={loading}>
        <Row className="picCompress" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={20}>
            <div className="flex-between mb-20">
              <Button
                type="primary"
                icon={<FileImageOutlined />}
                onClick={() => onSelectFile('image')}
              >
                单个图片
              </Button>
              <p className="pathTip">{imgPath}</p>
            </div>
            <div className="flex-column ">
              <Button
                type="primary"
                icon={<FolderOpenOutlined />}
                onClick={() => onSelectFile('dir')}
              >
                整个文件夹
              </Button>
              <p className="pathTip">{dirPath}</p>
            </div>
          </Col>
          <Col span={2} className="flex-center">
            <Button
              shape="circle"
              icon={<CaretRightOutlined />}
              onClick={onSubmit}
            ></Button>
          </Col>

          <Col span={2} className="flex-center">
            <Button
              type="primary"
              danger
              icon={<RestOutlined />}
              onClick={onDelete}
            ></Button>
          </Col>
        </Row>
      </Spin>
    </>
  );
}
