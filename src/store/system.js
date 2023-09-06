// 系统配置
import { observable, action, runInAction, makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

class System {
  @observable
  Config = {
    opacity: 1, //背景透明度
    bgImage: '', //背景图片
  };

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: 'System',
      properties: ['Config'],
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
}

export default System;
