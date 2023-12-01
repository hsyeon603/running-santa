import App from './App.js';
import BoundingBox from './BoundingBox.js';
import { randomNumBetween } from './utils.js';

export default class Chimney {
  constructor(config) {
    this.img = document.querySelector('#wall-img');
    this.type = config.type; // BIG, SMALL
    switch (this.type) {
      case 'BIG':
        this.sx = this.img.width * (9 / 30);
        this.sizeX = 13 / 30;
        this.gapY = randomNumBetween(App.height * 0.2, App.height * 0.45);
        break;
      case 'SMALL':
        this.sx = this.img.width * (0 / 30);
        this.sizeX = 9 / 30;
        this.gapY = randomNumBetween(App.height * 0.1, App.height * 0.35);
        break;
    }
    this.width = App.height * this.sizeX;
    this.height = App.height;
    this.x = App.width;
    this.y = randomNumBetween(30, App.height - this.gapY - 30) + this.gapY;
    this.vx = -6;
    this.generatedNext = false;
    this.gapNextX = App.width * randomNumBetween(0.6, 0.75);
    this.boundingBox = new BoundingBox(
      this.type === 'BIG' ? this.x + 80 : this.x + 30,
      this.y + 30,
      this.type === 'BIG' ? this.width - 80 : this.width - 30,
      this.height
    );
  }
  get isOutSide() {
    return this.x + this.width < 0;
  }
  get canGenerateNext() {
    return !this.generatedNext && this.x + this.width < this.gapNextX;
  }
  isColliding(target) {
    return this.boundingBox.isColliding(target);
  }
  update() {
    this.x += this.vx;
    this.boundingBox.x = this.type === 'BIG' ? this.x + 80 : this.x + 30;
  }
  draw() {
    App.ctx.drawImage(
      this.img,
      this.sx,
      0,
      this.img.width * this.sizeX,
      this.img.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
    this.boundingBox.draw();
  }
}
