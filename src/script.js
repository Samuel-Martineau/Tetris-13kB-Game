// @flow

import { GameLoop, init } from 'kontra';
import { I, J, L, O, S, T, Z } from './tetrominos';

import Grid from './grid';

console.log(I, J, L, O, Z, T, S);

let { canvas } = init();

let grid = new Grid(5, 10);

let loop = GameLoop({
  update() {
    grid.update();
  },
  render() {
    grid.render();
  },
});

loop.start();

function resize() {
  const { innerWidth } = window;
  let width, height;

  if (innerWidth >= 1281) {
    // Desktops
    width = 300;
    height = 600;
  } else if (innerWidth >= 1025) {
    // Laptops, Desktops
    width = 250;
    height = 500;
  } else if (innerWidth >= 768) {
    // Tablets, Ipads
    width = 150;
    height = 300;
  } else if (innerWidth >= 481) {
    // Low Resolution Tablets, Mobiles (Landscape)
    width = 100;
    height = 200;
  } else if (innerWidth >= 320) {
    // Most of the Smartphones Mobiles (Portrait)
    width = 50;
    height = 100;
  } else {
    width = 50;
    height = 100;
  }
  canvas.width = width;
  canvas.height = height;
}
resize();
window.addEventListener('resize', resize);
