/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Form, Slider, message, Button, Space } from 'antd';
import { useStores } from '@/store';
import { getModule } from '@/utils/common';
import ImgList from './imgList';

const modules = import.meta.glob('../../assets/images/bg/*.png');

function ConfigPage() {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const { systemStore } = useStores();
  const { Config } = systemStore;
  const [options, setOptions] = useState([]);

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  useEffect(() => {
    console.log('systemStore', systemStore);
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
  }, []);

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
          opacity: Config.opacity,
          bgImage: Config.bgImage,
        }}
      >
        <Form.Item label="透明度" name="opacity">
          <Slider min={0} max={1} step={0.01} tooltip={{ open: true }} />
        </Form.Item>
        <Form.Item label="背景图片" name="bgImage">
          <ImgList options={options} />
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
