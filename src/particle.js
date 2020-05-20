import { Utils } from './util';

const mouse = {};
const colors = ['#645f5a'];

window.addEventListener('mousemove', function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
})

export class Particle {
  constructor(x, y) {
    this.canvas = document.querySelector('#canvas');
    this.ctx = canvas.getContext("2d");
    this.color = Utils.randomColor(colors);
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.x2 = x;
    this.y2 = y;
    this.vx = 0;
    this.vy = 0;
    this.radius = Math.random() * 2.5 + 1;
    this.friction = Math.random() * 0.05 + 0.94;
    this.speed = 20;
  }
  update() {
    this.vx = (this.x2 - this.x) / this.speed;
    this.vy = (this.y2 - this.y) / this.speed;
    this.x += this.vx;
    this.y += this.vy;
  }
  draw() {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fillStyle = this.color;
    this.ctx.fill()
    this.ctx.restore();
  }
}