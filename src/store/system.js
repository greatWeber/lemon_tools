// 系统配置
import { observable, action, runInAction, makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

class System {
  @observable
  Config = {
    opacity: 1, //背景透明度
    bgImage: '', //背景图片
    isBgVideo: false, //是否开启背景视频
    bgVideo: '', //背景视频的本地路径
    videoType: '', //视频的类型
  };

  @observable
  isLock = false; //是否锁屏

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: 'System',
      properties: ['Config', 'isLock'],
      storage: window.localStorage,
    });
  }

  @action('setOpacity')
  setOpacity(value) {
    runInAction(() => {
      this.Config.opacity = value;
    });
  }

  @action('setBgImage')
  setBgImage(value) {
    runInAction(() => {
      this.Config.bgImage = value;
    });
  }

  @action('setConfig')
  setConfig(value) {
    runInAction(() => {
      this.Config = { ...value };
    });
  }

  @action('setIsLock')
  setIsLock(value) {
    runInAction(() => {
      this.isLock = value;
    });
  }
}

export default System;
