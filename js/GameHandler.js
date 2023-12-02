export default class GameHandler {
  constructor(app) {
    this._status = 'READY';
    this.init();
    this.app = app;
  }
  get status() {
    return this._status;
  }
  set status(value) {
    this._status = value;
    switch (value) {
      case 'READY':
        this.showReadyScreen();
        break;
      case 'FINISH':
        this.showFinishScreen();
        break;
    }
  }

  init() {
    this.readyScreen = document.querySelector('.ready-screen');
    this.playBtn = this.readyScreen.querySelector('.play-img');
    this.playBtn.addEventListener('click', () => {
      this.hideReadyScreen();
    });

    this.finishScreen = document.querySelector('.finish-screen');
    this.distanceText = this.finishScreen.querySelector('.distance');
    this.giftText = this.finishScreen.querySelector('.gift');
    this.replayBtn = this.finishScreen.querySelector('.replay-img');
    this.replayBtn.addEventListener('click', () => {
      this.hideFinishScreen();
    });

    this.status = 'READY';
  }
  showReadyScreen() {
    gsap.to(this.titleImage, {
      scale: 1,
      rotation: 720,
      opacity: 1,
      duration: 0.5,
    });
    gsap.to(this.playBtn, {
      scale: 1,
      duration: 1,
      ease: Elastic.easeOut.config(2, 0.5),
      delay: 0.5,
    });
  }
  hideReadyScreen() {
    gsap.to(this.readyScreen, {
      opacity: 0,
      pointerEvents: 'none',
      duraton: 0.3,
      onComplete: () => {
        this.status = 'PLAYING';
      },
    });
  }
  showFinishScreen() {
    this.distanceText.innerText = Math.floor(this.app.score.distCount) + 'm';
    this.giftText.innerText = this.app.score.giftCount + ' gift';
    gsap.fromTo(
      this.finishScreen,
      {
        opacity: 0,
      },
      { opacity: 1, duration: 0.5, pointerEvents: 'all' }
    );
    gsap.fromTo(
      this.distanceText,
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        delay: 1,
      }
    );
    gsap.fromTo(
      this.giftText,
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        delay: 1.1,
      }
    );
    gsap.fromTo(
      this.replayBtn,
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        rotation: 720,
        duration: 0.5,
        delay: 1.3,
      }
    );
  }
  hideFinishScreen() {
    gsap.fromTo(
      this.finishScreen,
      { opacity: 1 },
      {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.1,
      }
    );
    this.status = 'PLAYING';
    this.app.reset();
  }
}
