import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'antd';
import './index.css';

export default function ImgList(props) {
  const { value, onChange, options } = props;

  function imgRender(item) {
    if (item) {
      return <Image src={item} preview={false} />;
    }
    return <div className="imglist-nodata" />;
  }

  return (
    <div className="imglist-wrapper">
      {options.map((item) => (
        <div
          role="radio"
          aria-checked={value === item}
          tabIndex="0"
          key={item}
          className={[
            'imglist-item',
            value === item ? 'imglist-active' : '',
          ].join(' ')}
          onClick={() => onChange(item)}
        >
          {imgRender(item)}
        </div>
      ))}
    </div>
  );
}

ImgList.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array,
};

ImgList.defaultProps = {
  value: '',
  onChange: () => {},
  options: [],
};
