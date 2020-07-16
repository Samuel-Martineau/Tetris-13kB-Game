// @flow

import ms from 'ms.macro';
import Tetromino from './tetromino';
import { tetrominos } from './tetrominos';
import { generateGrid, line, randomInArray, square } from './utils';

const audio = new Audio('assets/pook.mp3');

export default class Game {
  context: CanvasRenderingContext2D;
  tetromino: Tetromino;
  cols: number;
  rows: number;
  staticGrid: Array<Array<any>>;
  movingGrid: Array<Array<any>>;
  context: CanvasRenderingContext2D;
  lastGoDown: Date;
  done: boolean;

  constructor(cols: number, rows: number, context: CanvasRenderingContext2D) {
    this.cols = cols;
    this.rows = rows;
    this.staticGrid = generateGrid(cols, rows, null);
    this.movingGrid = generateGrid(cols, rows, null);
    this.context = context;
    this.lastGoDown = new Date();
    this.done = false;
    this.addTetromino(randomInArray(tetrominos));

    window.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 's':
          while (
            this.tetromino.canBeThere(
              this.tetromino.x,
              this.tetromino.y + 1,
              this.staticGrid,
            )
          )
            this.tetromino.goDown();
          break;
        case 'w':
          break;
        case 'a':
          if (
            !this.tetromino.isOnLeftSide(this.staticGrid) &&
            this.tetromino.canBeThere(
              this.tetromino.x - 1,
              this.tetromino.y,
              this.staticGrid,
            )
          )
            this.tetromino.goLeft();
          break;
        case 'd':
          if (
            !this.tetromino.isOnRightSide(this.staticGrid) &&
            this.tetromino.canBeThere(
              this.tetromino.x + 1,
              this.tetromino.y,
              this.staticGrid,
            )
          )
            this.tetromino.goRight();
          break;
        case 'e':
          this.tetromino.rotateLeft();
          if (
            !this.tetromino.canBeThere(
              this.tetromino.x,
              this.tetromino.y,
              this.staticGrid,
            )
          )
            this.tetromino.rotateRight();
          break;
        case 'q':
          this.tetromino.rotateRight();
          if (
            !this.tetromino.canBeThere(
              this.tetromino.x,
              this.tetromino.y,
              this.staticGrid,
            )
          )
            this.tetromino.rotateLeft();
          break;
      }
    });
  }

  addTetromino(tetromino: Tetromino) {
    this.tetromino = tetromino;
    this.tetromino.setPos(
      Math.floor(this.cols / 2) -
        Math.floor(this.tetromino.shape[0].length / 2),
      0,
    );
  }

  moveTetrominoToStaticGrid() {
    for (let y = 0; y < this.tetromino.shape.length; y++) {
      for (let x = 0; x < this.tetromino.shape[0].length; x++) {
        if (this.tetromino.shape[y][x])
          this.staticGrid[y + this.tetromino.y][
            x + this.tetromino.x
          ] = this.tetromino.color;
      }
    }
  }

  update() {
    if (this.done) return;
    if (this.lastGoDown.getTime() + ms('0.5s') < Date.now()) {
      if (
        this.tetromino.canBeThere(
          this.tetromino.x,
          this.tetromino.y + 1,
          this.staticGrid,
        )
      )
        this.tetromino.goDown();
      else {
        audio.play();
        this.moveTetrominoToStaticGrid();
        this.addTetromino(randomInArray(tetrominos));
        if (
          !this.tetromino.canBeThere(
            this.tetromino.x,
            this.tetromino.y,
            this.staticGrid,
          )
        )
          return (this.done = true);
      }
      this.lastGoDown = new Date();
    }
    this.movingGrid = this.tetromino.draw(this.movingGrid, this.staticGrid);
    this.clearFullRows();
  }

  clearFullRows() {
    for (const [index, row] of this.staticGrid.entries()) {
      if (!row.includes(null)) {
        this.staticGrid[index] = Array(this.cols).fill('white');
      }
      if (row.every((color) => color === 'white')) {
        audio.play();
        this.staticGrid[index] = Array(this.cols).fill(null);
        for (let i = index; i > 0; i--)
          this.staticGrid[i] = this.staticGrid[i - 1].slice();
      }
    }
  }

  render() {
    let { width, height } = this.context.canvas;
    const xSpacing = width / this.cols;
    const ySpacing = height / this.rows;

    this.staticGrid.forEach((row, y) => {
      row.forEach((color, x) => {
        square(
          x * xSpacing,
          y * ySpacing,
          xSpacing,
          ySpacing,
          color ?? '#242424',
          this.context,
        );
      });
    });
    this.movingGrid.forEach((row, y) => {
      row.forEach((color, x) => {
        if (color != undefined) {
          square(
            x * xSpacing,
            y * ySpacing,
            xSpacing,
            ySpacing,
            color,
            this.context,
          );
        }
      });
    });

    for (let i = 1; i < this.cols; i++) {
      line(i * xSpacing, 0, i * xSpacing, height, this.context);
    }
    for (let i = 1; i < this.rows; i++) {
      line(0, i * ySpacing, width, i * ySpacing, this.context);
    }
  }
}
