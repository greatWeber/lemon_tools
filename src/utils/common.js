import dayjs from 'dayjs';

/**
 * 把第三方的json数据转换成合适的格式
 * @param {*} data
 */
export const formatHoliday = (data) => {
  const holiday = {};
  data.forEach((item) => {
    if (item.range.length === 1) {
      holiday[item.range[0]] = {
        name: item.name,
        type: item.type === 'workingday' ? 'workingday' : 'festival',
      };
    } else {
      const [start, end] = item.range;
      let day = start;
      while (day !== end) {
        holiday[day] = {
          name: item.name,
          type: item.type,
        };
        day = dayjs(day).add(1, 'day').format('YYYY-MM-DD');
      }
      holiday[end] = {
        name: item.name,
        type: item.type,
      };
    }
  });

  return holiday;
};

export const getImageUrl = (path) => new URL(path, import.meta.url).href;

export async function getModule(modules, reg = /(\d+)\.json/g) {
  // const modules = import.meta.glob(pathStr);
  const jsonObj = {};
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const path in modules) {
    // console.log('path', path);
    // eslint-disable-next-line no-await-in-loop
    const mod = await modules[path]();
    let name = '';
    path.replace(reg, ($1, $2) => {
      name = $2;
      // console.log(name);
      jsonObj[name] = mod.default;
    });
  }

  return jsonObj;
}
