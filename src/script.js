// @flow

import Game from './game';
import './styles.css';
import { square } from './utils';

const audioContext = new AudioContext();
const audioElement: HTMLAudioElement = (document.querySelector('audio'): any);
const track = audioContext.createMediaElementSource(audioElement);

audioElement.play();

const canvas: HTMLCanvasElement = (document.querySelector('canvas'): any);
const ctx = canvas.getContext('2d');

ctx.fillRect(20, 20, 150, 100);

start();
// play();

function start() {
  // canvas.addEventListener('click', function (event) {
  //   if (event.region) {
  //     alert('hit region: ' + event.region);
  //   }
  // });

  function frame() {
    requestAnimationFrame(frame);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#242424';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const baseY = canvas.height / 2 - canvas.height / 15;

    ctx.font = `italic ${canvas.width / 6}px MinecraftTen`;
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText('Tetris', canvas.width / 2, baseY);

    ctx.font = `italic ${canvas.width / 6}px MinecraftTen`;
    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    ctx.textAlign = 'center';
    ctx.fillText(
      'Tetris',
      canvas.width / 2 + canvas.width / 80,
      baseY + canvas.width / 80,
    );

    ctx.font = `italic ${canvas.width / 13}px MinecraftTen`;
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText('In 13 kB', canvas.width / 2, baseY + canvas.width / 10);

    const buttonWidth = canvas.width * 0.9;
    const buttonY = baseY + canvas.width / 6;
    const buttonHeight = canvas.height / 15;
    const borderSize = canvas.width / 70;
    square(
      canvas.width / 2 - buttonWidth / 2 - borderSize / 2,
      buttonY - borderSize / 2,
      buttonWidth + borderSize,
      buttonHeight + borderSize,
      'white',
      ctx,
    );
    square(
      canvas.width / 2 - buttonWidth / 2,
      buttonY,
      buttonWidth,
      buttonHeight,
      '#0652dd',
      ctx,
    );
    ctx.font = `${canvas.width / 13}px MinecraftTen`;
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText('Start !', canvas.width / 2, buttonY + canvas.height / 21.5);
    // ctx.addHitRegion({ id: 'start' });
  }

  frame();
}

function play() {
  let game = new Game(15, 30, ctx);

  function frame() {
    requestAnimationFrame(frame);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update();
    game.render();
  }

  frame();
}

function end() {}

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
window.addEventListener('resize', resize);
resize();
