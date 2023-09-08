import React, { useState } from 'react';
import { Row, Col, Input, Button, Alert, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { copyToClipboard } from '@/utils/common';
import './index.css';

const { TextArea } = Input;

export default function Json() {
  const [value, setValue] = useState('');
  const [format, setFormat] = useState('');
  const [error, setError] = useState(null);

  const [messageApi, contextHolder] = message.useMessage();

  const onFormat = () => {
    if (!value) return;
    try {
      // eslint-disable-next-line no-new-func
      const obj = new Function(`return ${value}`)();
      // console.log('obj', obj);
      const rs = JSON.stringify(obj, null, 4);
      // console.log('rs', rs);
      setFormat(rs);
      setError(null);
    } catch (err) {
      // console.error(err);
      setError(err.toString());
    }
  };

  const onCopyToClipboard = async () => {
    if (!format) return;
    try {
      await copyToClipboard(format);
      messageApi.success('copy成功！');
    } catch (err) {
      messageApi.error(err);
    }
  };

  const onClear = () => {
    setValue('');
    setError(null);
    setFormat('');
  };

  return (
    <>
      {contextHolder}
      <Row
        className="json-component"
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
      >
        <Col span={12}>
          <p>输入json数据</p>
          <TextArea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoSize={{ minRows: 5, maxRows: 5 }}
          />
        </Col>
        <Col span={12}>
          <p>格式化结果</p>
          <div className="read-box">
            <TextArea
              value={format}
              readOnly
              autoSize={{ minRows: 5, maxRows: 5 }}
            />
            <p className="copy">
              <CopyOutlined onClick={() => onCopyToClipboard()} />
            </p>
          </div>
        </Col>
      </Row>

      <Row gutter={{ xs: 8, sm: 16 }} style={{ marginTop: 10 }}>
        <Col>
          <Button type="primary" onClick={() => onFormat()}>
            格式化
          </Button>
        </Col>
        <Col>
          <Button onClick={() => onClear()}>清空</Button>
        </Col>
      </Row>

      {error && <Alert message={error} type="error" />}
    </>
  );
}
