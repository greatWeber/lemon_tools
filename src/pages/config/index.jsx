/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import { Form, Slider, message, Button, Space, Input, Switch } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useStores } from '@/store';
import { getModule } from '@/utils/common';
import Video from '@/lib/video';
import ImgList from './imgList';

const modules = import.meta.glob('../../assets/images/bg/*.png');

function ConfigPage() {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const { systemStore } = useStores();
  const { Config } = systemStore;
  const [options, setOptions] = useState([]);
  const videoRef = useRef(null);

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  useEffect(() => {
    getModule(modules, /([^\.]+)\.png/g).then((obj) => {
      // console.log('image', obj);
      const rs = [];
      for (const value of Object.values(obj)) {
        rs.push(value);
      }
      rs.unshift('');
      // console.log('rs', rs);
      setOptions(rs);
    });

    // init Video
    const $el = document.getElementById('bg-video');
    videoRef.current = new Video($el, false);
    videoRef.current.setLoop(true);
    console.log('init video', videoRef);
    return () => {
      videoRef.current = null;
    };
  }, []);

  const onChooseVideo = async () => {
    const { localPath, type } = await videoRef.current.openFile(false);
    form.setFieldsValue({
      bgVideo: localPath,
      videoType: type,
    });
    // console.log('onChooseVideo');
  };

  const onFinish = (values) => {
    console.log('onFinish', values);
    systemStore.setConfig(values);
    messageApi.success('修改成功');
  };

  return (
    <>
      {contextHolder}
      <Form
        name="create_icon"
        form={form}
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={{
          ...Config,
        }}
      >
        <Form.Item label="透明度" name="opacity">
          <Slider min={0} max={1} step={0.01} tooltip={{ open: true }} />
        </Form.Item>
        <Form.Item label="背景图片" name="bgImage">
          <ImgList options={options} />
        </Form.Item>
        <Form.Item
          label="开启背景视频"
          name="isBgVideo"
          valuePropName="checked"
        >
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
          />
        </Form.Item>
        <Form.Item label="背景视频" name="bgVideo">
          <Input
            placeholder="请点击选择视频"
            readOnly
            onClick={() => onChooseVideo()}
          />
        </Form.Item>
        <Form.Item name="videoType" hidden>
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 10, offset: 4 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              修改
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
}

export default observer(ConfigPage);
