import { useEffect, useState } from "react";
import { invoke } from '@tauri-apps/api/tauri'

import { InboxOutlined, UploadOutlined,PlusOutlined ,QuestionCircleOutlined} from '@ant-design/icons';
import { Form,Space,Button,Upload,Input,message,Tooltip,Row,Col  } from "antd";
import Tags from "./components/tags";

import { open } from '@tauri-apps/api/dialog';
import { appDir } from '@tauri-apps/api/path';
import { SUCCESS_CODE } from "@/utils/conf";

function CreateIcon(){
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 10 },
  };

  const uploadProps = {
    name:'files',
    action:'',
    listType:"picture-card",
    beforeUpload: (file) => {
      form.setFieldValue('upload',[file])

      return false;
    }
  }

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = (error) => reject(error);
    });

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    const {upload,sizes,path,format} = values;
    const base64 = await getBase64(upload[0].originFileObj);
    // console.log(base64,sizes,path);
    let rs = await invoke('create_icon_create',{base64,sizes,path,format}).catch(e=>{
      message.error(e);
    });
    if(rs === SUCCESS_CODE){
      message.success("icon 生成成功！")
    }
    
  };

  const onChoosePath = async ()=>{
    
    // 打开一个选择目录的对话框
    const selected = await open({
      directory: true,
      multiple: false,
      defaultPath: await appDir(),
    });

    console.log('Selected path:', selected);
    if(selected){
      form.setFieldValue('path',selected)
    }
  }

  return (
    <>
       {contextHolder}
      <Form
        name="create_icon"
        form={form}
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={{
          path:'',
          format:'',
          sizes:[]
        }}
      >
        <Form.Item label="上传图片">
          <Form.Item name="upload" valuePropName="fileList" rules={[{ required: true }]} getValueFromEvent={normFile} noStyle>
            <Upload {...uploadProps}>
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
            </Upload>
          </Form.Item>
        </Form.Item>

        <Form.Item label="保存路径" name="path" onClick={onChoosePath} rules={[{ required: true }]}>
          <Input disabled={true} placeholder="点击选择路径" ></Input>
        </Form.Item>

        <Form.Item label="格式化" wrapperCol={{span: 11}}>
          <Row gutter={10}>
            <Col span="22">
            <Form.Item  name="format" noStyle rules={[{ required: true }]}>
            <Input  placeholder="例如： logo{}x{}" ></Input>
          </Form.Item>
            </Col>
            <Col span="2">
            <Tooltip  title="格式化内容：{}为替换的占位符，里面填充的是尺寸">
              <QuestionCircleOutlined />
            </Tooltip>
            </Col>
          </Row>
          
          
        </Form.Item>

        <Form.Item label="图片尺寸" name="sizes" rules={[{ required: true },{type:'array',min:1}]}>
          <Tags></Tags> 
        </Form.Item>

        <Form.Item wrapperCol={{ span: 10, offset: 4 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="reset">reset</Button>
          </Space>
        </Form.Item>
      </Form> 
    </>
      
  )
      ;
 
}

export default CreateIcon;