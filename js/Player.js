import App from './App.js';
import BoundingBox from './BoundingBox.js';

export default class Player {
  constructor() {
    this.img = document.querySelector('#player-img');
    this.x = App.width * 0.1;
    this.y = App.height * 0.5;
    this.width = 100;
    this.height = (this.width * 32) / 40;
    this.frameX = 7;
    this.counter = 0;
    this.vy = -10;
    this.gravity = 0.2;

    this.boundingBox = new BoundingBox(this.x + 10, this.y + 16, this.width - 20, this.height - 20);

    App.canvas.addEventListener('click', () => {
      this.vy += -3.5;
    });
  }
  get coordX() {
    return this.x;
  }
  get coordY() {
    return this.y;
  }
  update() {
    this.counter += 1;
    if (++this.counter % 2 === 0) {
      this.frameX = ++this.frameX % 30;
    }

    this.vy += this.gravity;
    this.y += this.vy;
    this.boundingBox.y = this.y + 16;
  }
  draw() {
    App.ctx.drawImage(
      this.img,
      (this.img.width / 30) * this.frameX,
      0,
      this.img.width / 30,
      this.img.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
