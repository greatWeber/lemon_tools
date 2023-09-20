/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
class Keyboard {
  // 监听键盘事件
  _adEventListener(cb) {
    window.addEventListener('keydown', cb);

    return () => {
      window.removeEventListener('keydown', cb);
    };
  }

  _onLock(cb, e) {
    // ctrl+l 锁屏
    if (e.ctrlKey && e.keyCode === 76) {
      cb?.();
    }
  }

  onLock(cb) {
    return this._adEventListener(this._onLock.bind(null, cb));
  }
}

export default Keyboard;
