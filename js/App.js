import Background from './Background.js';
import Chimney from './Chimney.js';
import Player from './Player.js';
import Giftbox from './Giftbox.js';
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

    this.reset();
  }

  reset() {
    this.chimneys = [new Chimney({ type: 'BIG' })];
    this.player = new Player();
    this.giftboxes = [];
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

    window.addEventListener('click', () => {
      const x = this.player.coordX;
      const y = this.player.coordY;
      const vx = 10 * Math.cos((Math.PI / 180) * 360);
      this.giftboxes.push(new Giftbox({ x, y, vx }));
    });

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

      for (let i = this.chimneys.length - 1; i >= 0; i--) {
        this.chimneys[i].update();
        this.chimneys[i].draw();

        if (this.chimneys[i].isOutSide) {
          this.chimneys.splice(i, 1);
          continue;
        }
        if (this.chimneys[i].canGenerateNext) {
          this.chimneys[i].generatedNext = true;
          const newChimney = new Chimney({ type: Math.random() > 0.3 ? 'SMALL' : 'BIG' });
          this.chimneys.push(newChimney);
        }
      }

      if (this.giftboxes.length) {
        for (let i = this.giftboxes.length - 1; i >= 0; i--) {
          this.giftboxes[i].update();
          this.giftboxes[i].draw();

          if (this.giftboxes[i].isOutSide) {
            this.giftboxes.splice(i, 1);
            continue;
          }
        }
      }

      this.player.update();
      this.player.draw();

      then = now - (delta % App.interval);
    };

    requestAnimationFrame(frame);
  }
}
