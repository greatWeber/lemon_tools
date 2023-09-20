/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import { convertFileSrc } from '@tauri-apps/api/tauri';

class Video {
  // 挂载对象
  _video = null;

  // 是否显示control
  _isControl = false;

  // 保存视频来源
  _source = null;

  constructor(el, isControl) {
    this._video = el;
    this._isControl = isControl;
  }

  /**
   * 新增视频源
   * @param {*} url
   * @param {*} type
   */
  addSource(url, type) {
    if (!this._source) {
      this._source = document.createElement('source');
      this._video.appendChild(this._source);
    }
    this._source.type = `video/${type}`;
    this._source.src = url;
    this._video.load();
    this._video.play();
  }

  /**
   * 把选择的本地路径转成可以播放的路径
   * @param {*} url
   * @returns
   */
  changeUrl(url) {
    return [convertFileSrc(url), url.split('.').pop()];
  }

  /**
   * 选择文件播放
   * @param {*} immediate 是否立即添加视频源
   */
  openFile(immediate) {
    return new Promise((resolve, reject) => {
      window.__TAURI__.dialog
        .open()
        .then((localPath) => {
          // console.log('Video selected', localPath, localPath.split('.').pop());
          const [url, type] = this.changeUrl(localPath);
          if (immediate) {
            this.addSource(url, type);
          }
          resolve({ localPath, url, type });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  // 通用的设置属性，加上判断，防止null报错
  setAttribute(attr, value) {
    if (this._video) {
      this._video[attr] = value;
    }
  }

  // 设置是否循环播放
  setLoop(bool) {
    // this._video.loop = bool;
    this.setAttribute('loop', bool);
  }

  // 设置是否自动播放
  setAutoPlay(bool) {
    // this._video.autoPlay = bool;
    this.setAttribute('autoPlay', bool);
  }

  // 设置是否静音
  setMuted(bool) {
    // this._video.muted = bool;
    this.setAttribute('muted', bool);
  }
}

export default Video;
