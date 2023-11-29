import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Switch, Drawer, Form, Input, Row, Space } from 'antd';

export default function SettingDrawer(props) {
  const { open, formData, onClose, onSubmit } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (formData && Object.keys(formData).length) {
      form.setFieldsValue({ ...formData });
    }
  }, [open]);

  const submitHander = () => {
    // TODO
    // console.log('submitHander', form.getFieldsValue());
    onSubmit?.(form.getFieldsValue());
    onClose?.();
  };
  return (
    <Drawer
      title="高级设置"
      width="50%"
      onClose={onClose}
      open={open}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
      extra={
        <Space>
          <Button onClick={onClose}>取消</Button>
          <Button onClick={submitHander} type="primary">
            确定
          </Button>
        </Space>
      }
    >
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 20,
        }}
        form={form}
      >
        <Form.Item name="name" label="输出文件名称">
          <Input placeholder="请输入输出文件名称" />
        </Form.Item>

        <Form.Item name="captions" label="多轨字幕" valuePropName="checked">
          <Switch></Switch>
        </Form.Item>
      </Form>
    </Drawer>
  );
}

SettingDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  formData: PropTypes.object,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};
