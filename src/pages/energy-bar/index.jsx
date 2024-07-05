import React, { useState, useEffect, useRef } from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import './index.css';

import { getCurrent } from '@tauri-apps/api/window';

const STATE = {
  working: 'working',
  relax: 'relax',
};

const TIME = {
  hour: 3600,
  minutes: 600,
};

export default function EnergyBar() {
  const [countdown, setCountdown] = useState('01:00:00'); // 初始倒计时时间
  const [countdownPercentage, setCountdownPercentage] = useState(100); // 初始百分比
  const [state, setState] = useState(STATE.working);
  const [isStop, setIsStop] = useState(false);
  const [lastClickTime, setLastClickTime] = useState(null);

  const doubleClickTimeout = useRef(null);
  const countdownRef = useRef(TIME.hour);
  const totalCountdownSeconds = useRef(TIME.hour);
  const intervalId = useRef(null);
  const stateRef = useRef(STATE.working);

  useEffect(() => {
    document.addEventListener('mousedown', async () => {
      await getCurrent().startDragging();
    });
  }, []);

  // 使用useEffect Hook在组件加载时启动定时器
  useEffect(() => {
    startInterval();
    // 返回清除函数的引用，这样当组件卸载时，定时器会被清除
    return () => clearInterval(intervalId.current);
  }, []);

  const startInterval = () => {
    intervalId.current = setInterval(() => tick(), 1000);
  };

  const onChangeStopStatus = () => {
    setIsStop(!isStop);
    if (isStop) {
      startInterval();
    } else {
      clearInterval(intervalId.current);
    }
  };

  const onDoubleClick = () => {
    const currentTime = Date.now();

    // 如果在上次点击后的300毫秒内再次点击，则认为是双击
    if (lastClickTime && currentTime - lastClickTime < 300) {
      clearTimeout(doubleClickTimeout.current);
      console.log('Double click detected!');
      // 在这里执行你的双击逻辑
      onChangeStopStatus();
    } else {
      // 否则，重置上次点击时间，并设置一个超时来取消可能的双击
      setLastClickTime(currentTime);
      doubleClickTimeout.current = setTimeout(() => {
        setLastClickTime(null);
      }, 300);
    }
  };

  // 定义一个辅助函数，用于格式化倒计时时间
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
      2,
      '0'
    )}:${String(seconds).padStart(2, '0')}`;
  };

  // 定义一个函数，用于计算并更新倒计时百分比
  const updateCountdownPercentage = (totalSeconds, totalCountdownSeconds) => {
    // 假设1小时是3600秒
    // const totalCountdownSeconds = 3600;
    const percentage = Math.max(
      0,
      ((totalCountdownSeconds - totalSeconds) / totalCountdownSeconds) * 100
    );
    setCountdownPercentage(percentage.toFixed(2)); // 保留两位小数
  };

  // 定义一个函数，用于每秒更新倒计时和百分比
  const tick = () => {
    const totalSeconds = countdownRef.current;
    if (totalSeconds > 0) {
      countdownRef.current = totalSeconds - 1;
      setCountdown(formatTime(totalSeconds - 1));
      updateCountdownPercentage(
        totalSeconds - 1,
        totalCountdownSeconds.current
      );
    } else {
      console.log('state', state);
      // 倒计时结束，更新百分比为0
      setCountdown('00:00:00');
      setCountdownPercentage(0);
      clearInterval(intervalId.current);
      // 改变状态
      if (stateRef.current === STATE.working) {
        countdownRef.current = TIME.minutes;
        totalCountdownSeconds.current = TIME.minutes;
        stateRef.current = STATE.relax;
        setState(STATE.relax);
        setCountdown('00:10:00');
      } else {
        countdownRef.current = TIME.hour;
        totalCountdownSeconds.current = TIME.hour;
        stateRef.current = STATE.working;
        setState(STATE.working);
        setCountdown('01:00:00');
      }
      setTimeout(() => {
        setCountdownPercentage(100);
        startInterval();
      }, 3000);
    }
  };

  return (
    <div className="energy-wrapper">
      <div className="battery-box" onClick={onDoubleClick}>
        <div className="energy-star">
          {isStop && (
            <CaretRightOutlined
              style={{ fontSize: 100 }}
              onClick={onChangeStopStatus}
            />
          )}
        </div>

        <div className="battery-text">
          <span>{state}</span>
          <span>{countdown}</span>
        </div>
        <div className="battery">
          <div
            className="battery-after"
            style={{ top: countdownPercentage + '%' }}
          ></div>
          <div
            className="wave-box"
            style={{
              top: `-${280 - (180 * countdownPercentage) / 100}px`,
            }}
          >
            <div className="g-wave"></div>
            <div className="g-wave"></div>
            <div className="g-wave"></div>
          </div>
        </div>
      </div>
      <div
        className={[
          'contrast',
          state === STATE.working ? 'move-down' : 'move-up',
        ].join(' ')}
      >
        {/* <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span> */}
        {/* 底部的 */}
        <div className="circle"></div>
        {/* 下面的 */}
        <div className="button"></div>
      </div>
    </div>
  );
}
