// @flow

import Game from './game';
import './styles.css';

const canvas: HTMLCanvasElement = (document.querySelector('canvas'): any);
const ctx = canvas.getContext('2d');

let game = new Game(15, 30, ctx);

function frame() {
  requestAnimationFrame(frame);
  ctx.clearRect(0, 0, ctx.width, ctx.height);
  game.update();
  game.render();
}

frame();

function resize() {
  const { innerWidth, innerHeight } = window;
  let width = 400,
    height = 800,
    minSpacing = 100;
  if (innerWidth < width + minSpacing) {
    width = innerWidth - minSpacing;
    height = 2 * width;
  } else if (innerHeight < height + minSpacing) {
    height = innerHeight - minSpacing;
    width = height / 2;
  }
  if (window.devicePixelRatio > 1) {
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
  } else {
    canvas.width = width;
    canvas.height = height;
  }
}
resize();
window.addEventListener('resize', resize);
