// @flow

import { generateGrid, line, randomInArray, square } from "./utils";

import Tetromino from "./tetromino";
import ms from "ms.macro";
import { tetrominos } from "./tetrominos";

export default class Game {
  context: CanvasRenderingContext2D;
  tetromino: Tetromino;
  cols: number;
  rows: number;
  staticGrid: Array<Array<string>>;
  movingGrid: Array<Array<any>>;
  context: CanvasRenderingContext2D;
  lastGoDown: Date;
  done: boolean;

  constructor(cols: number, rows: number, context: CanvasRenderingContext2D) {
    this.cols = cols;
    this.rows = rows;
    this.staticGrid = generateGrid(cols, rows);
    this.movingGrid = generateGrid(cols, rows);
    this.context = context;
    this.lastGoDown = new Date();
    this.done = false;
    this.addTetromino(randomInArray(tetrominos));
  }

  addTetromino(tetromino: Tetromino) {
    this.tetromino = tetromino;
    this.tetromino.setPos(
      Math.floor(this.cols / 2) -
        Math.floor(this.tetromino.shape[0].length / 2),
      0
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
    if (this.lastGoDown.getTime() + ms("0.5s") < Date.now()) {
      if (
        this.tetromino.canBeThere(
          this.tetromino.x,
          this.tetromino.y + 1,
          this.staticGrid
        )
      )
        this.tetromino.goDown();
      else {
        this.moveTetrominoToStaticGrid();
        this.addTetromino(randomInArray(tetrominos));
        if (
          !this.tetromino.canBeThere(
            this.tetromino.x,
            this.tetromino.y,
            this.staticGrid
          )
        )
          this.done = true;
      }
      this.lastGoDown = new Date();
    }
    this.movingGrid = this.tetromino.draw(this.movingGrid);
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
          color ?? "#242424",
          this.context
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
            this.context
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
