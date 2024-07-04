/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
import React, { useState } from 'react';
import { Select, FloatButton, message, Spin } from 'antd';
import { invoke } from '@tauri-apps/api/core';
import {
  FolderOpenOutlined,
  CaretRightOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { VideoIcon } from '@/icons';
import SettingDrawer from './components/settingDrawer';
import './index.less';

export default function VideoConvert() {
  const [messageApi, contextHolder] = message.useMessage();

  const [type, setType] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [openSetting, setOpenSetting] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const typeList = [
    { value: 'mp4', label: 'mp4' },
    { value: 'flv', label: 'flv' },
    { value: 'mkv', label: 'mkv' },
  ];

  const onSelectType = (e) => {
    setType(e);
  };

  const onSelectFile = (type) => {
    const options =
      type === 'input'
        ? {
            filters: [
              {
                name: 'Video',
                extensions: ['mp4', 'flv', 'mkv'],
              },
            ],
          }
        : { directory: true };
    // console.log('options', options);
    window.__TAURI__.dialog.open(options).then((localPath) => {
      console.log('localPath', localPath);
      if (type === 'input') {
        setInput(localPath);
      } else {
        setOutput(localPath);
      }
    });
  };

  const checkSubmit = () => {
    let errorText = '';
    if (!input) {
      errorText = '请先选择转换的文件';
    } else if (!type) {
      errorText = '请选择转换的类型';
    } else if (!output) {
      errorText = '请选择输出的目录';
    }

    if (errorText) {
      messageApi.open({
        type: 'warning',
        content: errorText,
      });
      return false;
    }
    return true;
  };

  const drawerSubmit = (value) => {
    setFormData({ ...value });
  };

  const onSubmitConvert = async () => {
    if (!checkSubmit()) return;
    let name;
    if (!formData.name) {
      input.replace(/([0-9a-zA-Z\u4e00-\u9fa5]+)\./gi, ($0, $1) => {
        name = $1;
      });
    } else {
      name = formData.name;
    }
    const outputStr = `${output}/${name}.${type}`;
    setLoading(true);
    await invoke('convert_video_format', {
      suffix: type,
      inputPath: input,
      outputPath: outputStr,
      captions: formData.captions || false,
    })
      .catch(() => {
        messageApi.open({
          type: 'warning',
          content: '转换出错',
        });
      })
      .finally(() => {
        setLoading(false);
      });
    messageApi.open({
      type: 'success',
      content: '转换成功',
    });
  };

  return (
    <>
      {contextHolder}
      <Spin tip="Loading..." spinning={loading}>
        <div className="video-convert flex-center">
          <div className="upload-box">
            <div
              className="upload-select flex-center"
              onClick={() => onSelectFile('input')}
            >
              {!input ? (
                <>
                  <FolderOpenOutlined className="upload-icon" />
                  <p>点击选择文件</p>
                </>
              ) : (
                <>
                  <VideoIcon className="upload-icon" />
                  <p>{input}</p>
                </>
              )}
            </div>
          </div>

          <div className="convert-list flex-between">
            <Select
              className="type-select"
              options={typeList}
              placeholder="类型"
              onChange={onSelectType}
            />
            <p className="output-dir" onClick={() => onSelectFile('output')}>
              {output || '请选择输出目录'}
            </p>
            <div className="convert-start">
              <CaretRightOutlined onClick={onSubmitConvert} />
            </div>
          </div>
          <FloatButton
            icon={<SettingOutlined />}
            onClick={() => setOpenSetting(!openSetting)}
          />
          <SettingDrawer
            open={openSetting}
            formData={formData}
            onClose={() => setOpenSetting(!openSetting)}
            onSubmit={drawerSubmit}
          ></SettingDrawer>
        </div>
      </Spin>
    </>
  );
}
