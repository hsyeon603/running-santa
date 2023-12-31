import App from './App.js';
import BoundingBox from './BoundingBox.js';

export default class Giftbox {
  constructor(config) {
    this.img = document.querySelector('#giftbox-img');
    this.width = 60;
    this.height = 50;
    this.x = config.x + this.width;
    this.y = config.y + this.height;
    this.vx = 10 * Math.cos((Math.PI / 180) * 360);
    this.vy = 0;
    this.friction = 0.93;
    this.gravity = 2;
    console.log(this.x, this.y);
    this.boundingBox = new BoundingBox(this.x, this.y, this.width, this.height);
  }

  get isOutSide() {
    return this.y > App.height;
  }

  isColliding(target) {
    return this.boundingBox.isColliding({ type: 'GIFTBOX', target });
  }

  update() {
    this.vy += this.gravity;

    this.vx *= this.friction;
    this.vy *= this.friction;

    this.x += this.vx;
    this.y += this.vy;
    this.boundingBox.x = this.x;
    this.boundingBox.y = this.y;
  }

  draw() {
    App.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
