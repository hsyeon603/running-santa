import Background from './Background.js';

export default class App {
  static canvas = document.querySelector('canvas');
  static ctx = App.canvas.getContext('2d');
  static dpr = devicePixelRatio > 1 ? 2 : 1;
  static interval = 1000 / 60;
  static width = 1024;
  static height = 768;

  constructor() {
    this.backgrounds = [
      new Background({ img: document.querySelector('#bg1-img'), speed: -0.5 }),
      new Background({ img: document.querySelector('#bg2-img'), speed: -1 }),
      new Background({ img: document.querySelector('#bg3-img'), speed: -1.5 }),
      new Background({ img: document.querySelector('#bg4-img'), speed: -2 }),
      new Background({ img: document.querySelector('#bg5-img'), speed: -3 }),
    ];
  }

  init() {
    App.canvas.width = App.width * App.dpr;
    App.canvas.height = App.height * App.dpr;
    App.ctx.scale(App.dpr, App.dpr);

    this.backgrounds.forEach((background) => {
      background.draw();
    });
  }
  render() {
    let now, delta;
    let then = Date.now();

    const frame = () => {
      requestAnimationFrame(frame);
      now = Date.now();
      delta = now - then;
      if (delta < App.interval) return;

      App.ctx.clearRect(0, 0, App.width, App.height);

      this.backgrounds.forEach((background) => {
        background.update();
        background.draw();
      });

      then = now - (delta % App.interval);
    };

    requestAnimationFrame(frame);
  }
}
