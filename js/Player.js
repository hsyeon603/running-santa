import App from './App.js';

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
    App.canvas.addEventListener('click', () => {
      this.vy += -3.5;
    });
  }
  update() {
    this.counter += 1;
    if (++this.counter % 2 === 0) {
      this.frameX = ++this.frameX % 30;
    }

    // this.frameX += 1;
    // if (this.frameX === 15) this.frameX = 0;

    this.vy += this.gravity;
    this.y += this.vy;
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
