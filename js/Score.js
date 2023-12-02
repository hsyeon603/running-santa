import App from './App.js';
import Giftbox from './Giftbox.js';

export default class Score {
  constructor() {
    this.gift = new Giftbox({ x: App.width - 200, y: -26 });
    this.distCount = 0;
    this.giftCount = 0;
  }

  update() {
    this.distCount += 0.015;
  }
  draw() {
    this.gift.draw();

    App.ctx.font = '50px Jua';
    App.ctx.fillStyle = '#f1f1f1';
    App.ctx.textAlign = 'right';
    App.ctx.fillText(this.giftCount, App.width - 30, 69);

    App.ctx.textAlign = 'left';
    App.ctx.fillText(Math.floor(this.distCount) + 'm', 25, 69);
  }
}
