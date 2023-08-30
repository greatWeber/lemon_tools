
import React, { useState ,useRef, useEffect} from 'react';
import { Drawer,Tag,Space,Divider,List,Input,Button,Image } from 'antd';
import {CloseOutlined} from '@ant-design/icons';
import lunisolar from 'lunisolar';
import {festivalData} from './const';




export default function Detail(props){

  const {date,open,holidays} = props;
  const dateStr = date.format('YYYY-MM-DD');
  const d = lunisolar(date.toDate());
  const e5 = d.char8.day.stem.e5;
  const branch = d.char8.year.branch;

  let festival;
  const h = holidays && holidays[date.format('YYYY-MM-DD')];
    // console.log('h',h,date.format('YYYY-MM-DD'))
    if(h){
      festival = h.type === 'festival'? h.name:'';
    }

  

  // const _ = formatHoliday(holidays);

  // const [days,setDays] = useState(JSON.stringify(_));

  const [list,setList] = useState([]);
  const [value, setValue] = useState('');

  useEffect(()=>{
    if(!open) return;
    let _list = window.localStorage.getItem(dateStr);
    if(!_list) {
      setList([]); 
      return
    };
    _list = JSON.parse(_list);
    setList(_list);
    return ()=>{
      setValue('');
    }

  },[open]);

  useEffect(()=>{
    if(!list || !list.length) return;
    window.localStorage.setItem(dateStr, JSON.stringify(list));
  },[list])

  const onClose = ()=>{
    props?.onClose();
  }

  const inputChange = (e) =>{
    // console.log(e.target.value);
    setValue(e.target.value)
  }
  
  const addItem = ()=>{
    const _list = [...list];
    _list.push(value);
    setList(_list);
    setValue('');
  }

  const deleteItem = (item) => {
    let _list = [...list];
    _list = _list.filter(i=>i!==item);
    console.log(_list,item);
  }

  return (
    
    <Drawer title={dateStr} placement="right" onClose={onClose} open={open}>
      <Space size={[0, 8]} wrap>
        <Tag color="#f50">{d.lunar.toString()}</Tag>
        {d.solarTerm?.toString()&&<Tag color="#2db7f5">{d.solarTerm?.toString()}</Tag>}
        <Tag color="#87d068">{d.char8.toString()}</Tag>
        <Tag color="#2db7f5">五行: {e5.name}</Tag>
        <Tag color="#f50">相生: {e5.generating().name}</Tag>
        <Tag color="#f50">相克: {e5.overcoming().name}</Tag>
        <Tag color="#f50">相泄: {e5.weakening().name}</Tag>
        <Tag color="#f50">相侮: {e5.counteracting().name}</Tag>
        <Tag color="#87d068">地支: {branch.name}</Tag>
        <Tag color="#2db7f5">地支藏干: {branch.hiddenStems.join(', ')}</Tag>
        <Tag color="#2db7f5">相刑: {branch.punishing.name}</Tag>
        <Tag color="#2db7f5">相冲: {branch.conflict.name}</Tag>
        <Tag color="#2db7f5">相破: {branch.destroying.name}</Tag>
        <Tag color="#2db7f5">相害: {branch.harming.name}</Tag>
      </Space>

      <Divider orientation="left">待办</Divider>
      <List
        footer={<Space.Compact
          style={{
            width: '100%',
          }}
        >
          <Input value={value} onChange={inputChange} placeholder='请输入待办' />
          <Button type="primary" onClick={addItem}>添加</Button>
        </Space.Compact>}
        bordered
        dataSource={list}
        renderItem={(item) => (
          <List.Item className="flex-between">
              <span>{item}</span>
              <CloseOutlined onClick={(item)=> deleteItem(item)}/>
          </List.Item>
        )}
      />

      {festival && <>
        <Divider orientation="left">{festival}</Divider>
        <Image src={festivalData[festival]?.image}></Image>
        <p>{festivalData[festival]?.content}</p>
      </>}
      
    </Drawer>
  )
}