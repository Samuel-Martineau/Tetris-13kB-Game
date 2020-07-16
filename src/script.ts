import "./styles.css";

// @ts-ignore TS6133
import Game from "./game.ts";
// @ts-ignore TS6133
import { text, button } from "./utils.ts";

const audioContext = new AudioContext();
const audioElement: HTMLAudioElement = document.querySelector("audio");
const track = audioContext.createMediaElementSource(audioElement);

audioElement.play();

const audio = new Audio("assets/pook.mp3");

const canvas: HTMLCanvasElement = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

ctx.fillRect(20, 20, 150, 100);

enum State {
  Start,
  Playing,
  End,
}

let state;

start();

function start() {
  state = State.Start;
  let baseY, buttonWidth, buttonY, buttonHeight, borderSize, buttonX;

  function frame() {
    if (state === State.Start) requestAnimationFrame(frame);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#242424";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    baseY = canvas.height / 2 - canvas.height / 15;
    buttonWidth = canvas.width * 0.9;
    buttonY = baseY + canvas.width / 6;
    buttonHeight = canvas.height / 15;
    borderSize = canvas.width / 70;
    buttonX = canvas.width / 2 - buttonWidth / 2 - borderSize / 2;

    text(
      `italic ${canvas.width / 6}px MinecraftTen`,
      "white",
      "center",
      "Tetris",
      canvas.width / 2,
      baseY,
      ctx
    );

    text(
      `italic ${canvas.width / 6}px MinecraftTen`,
      "rgba(255,255,255,0.25)",
      "center",
      "Tetris",
      canvas.width / 2 + canvas.width / 80,
      baseY + canvas.width / 80,
      ctx
    );

    text(
      `italic ${canvas.width / 13}px MinecraftTen`,
      "white",
      "center",
      "In 13 kB",
      canvas.width / 2,
      baseY + canvas.width / 10,
      ctx
    );

    button(
      "Start !",
      buttonX,
      buttonY,
      buttonWidth,
      buttonHeight,
      borderSize,
      ctx,
      canvas
    );
  }

  frame();

  function onButtonClick(e) {
    const { x: mx, y: my } = getMousePos(canvas, e);
    if (
      mx * (window.devicePixelRatio ?? 1) > buttonX &&
      mx * (window.devicePixelRatio ?? 1) < buttonX + buttonWidth &&
      my * (window.devicePixelRatio ?? 1) > buttonY &&
      my * (window.devicePixelRatio ?? 1) < buttonY + buttonHeight
    ) {
      canvas.removeEventListener("click", onButtonClick);
      audio.play();
      play();
    }
  }

  canvas.addEventListener("click", onButtonClick);
}

function play() {
  state = State.Playing;
  let game = new Game(15, 30, ctx, end);

  function frame() {
    if (state === State.Playing) requestAnimationFrame(frame);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update();
    game.render();
  }

  frame();
}

function end() {
  state = State.End;
  let baseY, buttonWidth, buttonY, buttonHeight, borderSize, buttonX;

  function frame() {
    if (state === State.End) requestAnimationFrame(frame);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#242424";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    baseY = canvas.height / 2 - canvas.height / 15;
    buttonWidth = canvas.width * 0.9;
    buttonY = baseY + canvas.width / 6;
    buttonHeight = canvas.height / 15;
    borderSize = canvas.width / 70;
    buttonX = canvas.width / 2 - buttonWidth / 2 - borderSize / 2;

    text(
      `italic ${canvas.width / 6}px MinecraftTen`,
      "white",
      "center",
      "Tetris",
      canvas.width / 2,
      baseY,
      ctx
    );

    text(
      `italic ${canvas.width / 6}px MinecraftTen`,
      "rgba(255,255,255,0.25)",
      "center",
      "Tetris",
      canvas.width / 2 + canvas.width / 80,
      baseY + canvas.width / 80,
      ctx
    );

    text(
      `italic ${canvas.width / 13}px MinecraftTen`,
      "white",
      "center",
      "Game Over",
      canvas.width / 2,
      baseY + canvas.width / 10,
      ctx
    );

    button(
      "Restart",
      buttonX,
      buttonY,
      buttonWidth,
      buttonHeight,
      borderSize,
      ctx,
      canvas
    );
  }

  frame();

  function onButtonClick(e) {
    const { x: mx, y: my } = getMousePos(canvas, e);
    if (
      mx * (window.devicePixelRatio ?? 1) > buttonX &&
      mx * (window.devicePixelRatio ?? 1) < buttonX + buttonWidth &&
      my * (window.devicePixelRatio ?? 1) > buttonY &&
      my * (window.devicePixelRatio ?? 1) < buttonY + buttonHeight
    ) {
      canvas.removeEventListener("click", onButtonClick);
      audio.play();
      play();
    }
  }

  canvas.addEventListener("click", onButtonClick);
}

// From https://stackoverflow.com/a/17130415/9723899
function getMousePos(canvas, e) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
}

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
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
  } else {
    canvas.width = width;
    canvas.height = height;
  }
}
window.addEventListener("resize", resize);
resize();
