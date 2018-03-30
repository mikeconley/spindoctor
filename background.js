function spinnerListener() {
  SpinDoctor.sawSpinner();
}

const SpinDoctor = {
  spins: 0,

  init() {
    browser.tabswitcher.onSpinner.addListener(spinnerListener);
    browser.browserAction.onClicked.addListener(() => {
      this.reset();
    });
  },

  sawSpinner() {
    this.spins++;
    this.playSound();
    this.updateBadge();
  },

  reset() {
    this.spins = 0;
    this.updateBadge();
  },

  _playTimer: null,
  _soundObj: new Audio("/sounds/sonar-sweep.mp3"),
  playSound() {
    if (this._playTimer) {
      clearTimeout(this._playTimer);
    }
    this._playTimer = setTimeout(() => {
      this._soundObj.play();
      this._playTimer = null;
    }, 500);
  },

  updateBadge() {
    let text = this.spins > 0 ? String(this.spins) : "";
    browser.browserAction.setBadgeText({ text });
  },
}

SpinDoctor.init();
