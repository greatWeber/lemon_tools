import dayjs from 'dayjs';
import React,{useEffect, useState} from 'react';
import lunisolar from 'lunisolar';
import zhCn from 'lunisolar/locale/zh-cn';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { Calendar, Col, Radio, Row, Select,Button } from 'antd';
import Detail from './detail';

import jsonObj from  '@/assets/json/index.js';
import {formatHoliday} from '@/utils/common.js';

console.log(jsonObj);


lunisolar.locale(zhCn);
const useStyle = createStyles(({ token, css, cx }) => {
  const lunar = css`
    color: ${token.colorTextTertiary};
    font-size: ${token.fontSizeSM}px;
  `;
  return {
    wrapper: css`
      width: 100%;
      border: 1px solid ${token.colorBorderSecondary};
      border-radius: ${token.borderRadiusOuter}px;
      padding: 5px;
    `,
    dateCell: css`
      position: relative;
      padding: 10px 0;
      &:before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        max-width: 40px;
        max-height: 40px;
        background: transparent;
        transition: background 300ms;
        border-radius: ${token.borderRadiusOuter}px;
        border: 1px solid transparent;
        box-sizing: border-box;
      }
      &:hover:before {
        background: rgba(0, 0, 0, 0.04);
      }
    `,
    dateCellContent: css`
      position: relative;
      margin: auto;
      max-width: 40px;
      max-height: 40px;
      
    `,
    today: css`
      &:before {
        border: 1px solid ${token.colorPrimary};
      }
    `,
    text: css`
      position: relative;
      z-index: 1;
    `,
    holiday:css `
      position: absolute;
      font-size:11px;
      right:25%;
      top:0;
      color: ${token.colorSuccess};
    `,
    workingday:css `
      position: absolute;
      font-size:11px;
      right:25%;
      top:0;
      color: ${token.colorError};
    `,
    bold:css`
      font-weight: bold;
    `,
    todo:css`
      position: absolute;
      left:5px;
      top: 5px;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background:${token.colorSuccess};
    `,
    lunar,
    current: css`
      color: ${token.colorTextLightSolid};
      &:before {
        background: ${token.colorPrimary};
      }
      &:hover:before {
        background: ${token.colorPrimary};
        opacity: 0.8;
      }
      .${cx(lunar)} {
        color: ${token.colorTextLightSolid};
        opacity: 0.9;
      }
    `,
    monthCell: css`
      width: 120px;
      color: ${token.colorTextBase};
      border-radius: ${token.borderRadiusOuter}px;
      padding: 5px 0;
      &:hover {
        background: rgba(0, 0, 0, 0.04);
      }
    `,
    monthCellCurrent: css`
      color: ${token.colorTextLightSolid};
      background: ${token.colorPrimary};
      &:hover {
        background: ${token.colorPrimary};
        opacity: 0.8;
      }
    `,
  };
});

const MyCalendar = () => {
  const { styles } = useStyle({
    test: true,
  });
  const [selectDate, setSelectDate] = useState(dayjs());
  const [year,setYear] = useState(dayjs().year());
  const [holidays,setholidays] = useState({});
  const [openDetail, setOpenDetail] = useState(false);

  useEffect(()=>{
    const holidays = jsonObj[year];
    console.log('holidays',holidays);
    setholidays(holidays);
  },[year])



  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
    setSelectDate(value);
  };
  const onDateChange = (value) => {
    setSelectDate(value);
  };
  const cellRender = (date, info) => {
    const d = lunisolar(date.toDate());
    const lunar = d.lunar.getDayName();
    const solarTerm = d.solarTerm?.name;
    let festival; 
    let isHoliday;
    let isWorkingday;
    const h = holidays && holidays[date.format('YYYY-MM-DD')];
    // console.log('h',h,date.format('YYYY-MM-DD'))
    if(h){
      festival = h.type === 'festival'? h.name:'';
      isHoliday = h.type === 'holiday';
      isWorkingday = h.type === 'workingday';
    }

    const hasTodo = window.localStorage.getItem(date.format('YYYY-MM-DD'));

    if (info.type === 'date') {
      return React.cloneElement(info.originNode, {
        ...info.originNode.props,
        className: classNames(styles.dateCell, {
          [styles.current]: selectDate.isSame(date, 'date'),
          [styles.today]: date.isSame(dayjs(), 'date'),
        }),
        children: (
          <div className={styles.text} onClick={()=>setOpenDetail(true)}>
            <div className={styles.dateCellContent}>
              {!!hasTodo && <span className={styles.todo}></span>}
              {date.get('date')}
              {info.type === 'date' && <div className={classNames(styles.lunar,{
                [styles.bold]:!!festival
              })}>
                {festival || solarTerm || lunar}
              </div>}
            </div>
            
            {(isHoliday || festival) && <span className={styles.holiday}>休</span>}
            {isWorkingday && <span className={styles.workingday}>调</span>}
          </div>
        ),
      });
    }
    if (info.type === 'month') {
      const d2 = lunisolar(new Date(date.get('year'), date.get('month')));
      const month = d2.lunar.getMonthName();
      return (
        <div
          className={classNames(styles.monthCell, {
            [styles.monthCellCurrent]: selectDate.isSame(date, 'month'),
          })}
        >
          {date.get('month') + 1}月（{month}）
        </div>
      );
    }
  };
  const getYearLabel = (year) => {
    const d = lunisolar(new Date(year + 1, 0));
    return `${year}年（${d.format('cYcZ年')}）`;
  };
  const getMonthLabel = (month, value) => {
    const d = lunisolar(new Date(value.year(), month));
    const lunar = d.lunar.getMonthName();
    return `${month + 1}月（${lunar}）`;
  };
  return (
    <>
      <div className={styles.wrapper}>
        <Calendar
          fullCellRender={cellRender}
          fullscreen={false}
          onPanelChange={onPanelChange}
          onChange={onDateChange}
          headerRender={({ value, type, onChange, onTypeChange }) => {
            const start = 0;
            const end = 12;
            const monthOptions = [];
            let current = value.clone();
            const localeData = value.localeData();
            const months = [];
            for (let i = 0; i < 12; i++) {
              current = current.month(i);
              months.push(localeData.monthsShort(current));
            }
            for (let i = start; i < end; i++) {
              monthOptions.push({
                label: getMonthLabel(i, value),
                value: i,
              });
            }
            const year = value.year();
            const month = value.month();
            const options = [];
            for (let i = year - 10; i < year + 10; i += 1) {
              options.push({
                label: getYearLabel(i),
                value: i,
              });
            }
            return (
              <Row
                justify="end"
                gutter={8}
                style={{
                  padding: 8,
                }}
              >
                <Col>
                  <Select
                    size="small"
                    popupMatchSelectWidth={false}
                    className="my-year-select"
                    value={year}
                    options={options}
                    onChange={(newYear) => {
                      const now = value.clone().year(newYear);
                      setYear(newYear);
                      onChange(now);
                    }}
                  />
                </Col>
                <Col>
                  <Select
                    size="small"
                    popupMatchSelectWidth={false}
                    value={month}
                    options={monthOptions}
                    onChange={(newMonth) => {
                      const now = value.clone().month(newMonth);
                      onChange(now);
                    }}
                  />
                </Col>
                <Col>
                  <Button size="small" onClick={()=>{
                    const now = dayjs();
                    onChange(now);
                  }}>今天</Button>
                </Col>
                <Col>
                  
                  <Radio.Group
                    size="small"
                    onChange={(e) => onTypeChange(e.target.value)}
                    value={type}
                  >
                    <Radio.Button value="month">月</Radio.Button>
                    <Radio.Button value="year">年</Radio.Button>
                  </Radio.Group>
                </Col>
              </Row>
            );
          }}
        />
      </div>

      <Detail open={openDetail} date={selectDate} holidays={holidays} onClose={()=>setOpenDetail(false)}></Detail>
    </>
    
  );
};
export default MyCalendar; 