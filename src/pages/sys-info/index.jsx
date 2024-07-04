import React, { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { Descriptions, message } from 'antd';

function SysInfo() {
  const [info, setInfo] = useState(null);

  // 这里会执行两次，why?
  useEffect(() => {
    if (!info) {
      getSysInfo();
    }
  }, []);

  const getSysInfo = async () => {
    let rs = await invoke('get_system_info').catch((e) => {
      message.error(e);
    });
    // console.log(rs);
    setInfo(rs);
  };
  // b->gb
  const byteToGb = (byte) => {
    if (!byte) return 0;
    return (byte / (1024 * 1024 * 1024)).toFixed(1);
  };
  return (
    <Descriptions title={info?.system_host_name}>
      <Descriptions.Item label="CPU">
        {info?.cpus[0]?.brand} / {info?.cpus.length} 核
      </Descriptions.Item>
      <Descriptions.Item label="os版本">
        macos {info?.system_os_version}
      </Descriptions.Item>
      <Descriptions.Item label="内存">
        可用: {byteToGb(info?.used_memory)}GB / 总共:{' '}
        {byteToGb(info?.total_memory)}GB
      </Descriptions.Item>
      <Descriptions.Item label="硬盘">
        可用: {byteToGb(info?.disks[0]?.available_space)}GB / 总共:{' '}
        {byteToGb(info?.disks[0]?.total_space)}GB
      </Descriptions.Item>
    </Descriptions>
  );
}

export default SysInfo;
