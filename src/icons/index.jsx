/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import Icon from '@ant-design/icons';

const videoSvg = () => (
  <svg
    t="1695352953452"
    className="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="4439"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="64"
    height="64"
  >
    <path
      d="M147.2 0C102.4 0 65.6 36.8 65.6 81.6v860.8c0 44.8 36.8 81.6 81.6 81.6h731.2c44.8 0 81.6-36.8 81.6-81.6V324.8L657.6 0H147.2z"
      fill="#8E4C9E"
      p-id="4440"
    />
    <path
      d="M960 326.4v16H755.2s-100.8-20.8-99.2-108.8c0 0 4.8 92.8 97.6 92.8H960z"
      fill="#713985"
      p-id="4441"
    />
    <path
      d="M657.6 0v233.6c0 25.6 17.6 92.8 97.6 92.8H960L657.6 0z"
      fill="#FFFFFF"
      p-id="4442"
    />
    <path
      d="M456 728c0 6.4-1.6 12.8-6.4 16-3.2 3.2-84.8 70.4-190.4 113.6-1.6 1.6-4.8 1.6-8 1.6s-6.4-1.6-9.6-3.2c-6.4-3.2-9.6-8-11.2-16 0-1.6-4.8-54.4-4.8-112s4.8-108.8 4.8-112c1.6-6.4 4.8-11.2 11.2-16 3.2-1.6 6.4-3.2 9.6-3.2 3.2 0 6.4 1.6 8 3.2 105.6 41.6 187.2 110.4 190.4 113.6 4.8 3.2 6.4 9.6 6.4 14.4z"
      fill="#FFFFFF"
      p-id="4443"
    />
  </svg>
);
export function VideoIcon(props) {
  return <Icon component={videoSvg} {...props} />;
}
