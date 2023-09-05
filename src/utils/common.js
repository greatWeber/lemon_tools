import dayjs from "dayjs";

/**
 * 把第三方的json数据转换成合适的格式
 * @param {*} data 
 */
export const formatHoliday = (data) => {
  const holiday = {};
  data.forEach(item=>{
    if(item.range.length===1){
      holiday[item.range[0]] = {
        name: item.name,
        type: item.type === 'workingday'?'workingday':'festival'
      }
    }else {
      const [start,end] = item.range;
      let day = start;
      while(day !== end) {
        holiday[day] = {
          name: item.name,
          type: item.type
        };
        day = dayjs(day).add(1,'day').format('YYYY-MM-DD');
      }
      holiday[end] = {
        name: item.name,
        type: item.type
      }
    }
  });

  return holiday;
}

export const getImageUrl = (path) => {
  return new URL(path, import.meta.url).href
}

