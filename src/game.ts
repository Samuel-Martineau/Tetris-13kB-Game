// @ts-ignore TS6133
import ms from 'ms.macro';
// @ts-ignore TS6133
import Tetromino from './tetromino.ts';
// @ts-ignore TS6133
import { I, J, L, O, S, T, Z } from './tetrominos.ts';
import {
  generateGrid,
  line,
  randomInArray,
  roundRect,
  getRelativeMousePos,
  // @ts-ignore TS6133
} from './utils.ts';

const audio = new Audio('assets/pook.mp3');

export default class Game {
  private tetromino: Tetromino;
  private nextTetromino: Tetromino;
  private staticGrid: Array<Array<any>>;
  private movingGrid: Array<Array<any>>;
  private lastGoDown: Date;
  private lastNewTetromino: Date;
  private speed: number;
  private done: boolean;

  constructor(
    private cols: number,
    private rows: number,
    private context: CanvasRenderingContext2D,
    private onEnd: () => void,
  ) {
    this.staticGrid = generateGrid(cols, rows, null);
    this.movingGrid = generateGrid(cols, rows, null);
    this.lastGoDown = new Date();
    this.lastNewTetromino = new Date();
    this.speed = ms('0.5s');
    this.done = false;
    this.tetromino = Game.randomTetromino;
    this.setupTetromino(this.tetromino);
    this.nextTetromino = Game.randomTetromino;
    this.setupTetromino(this.nextTetromino);

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
            !this.tetromino.isOnSide(this.tetromino.x - 1, this.staticGrid) &&
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
            !this.tetromino.isOnSide(this.tetromino.x + 1, this.staticGrid) &&
            this.tetromino.canBeThere(
              this.tetromino.x + 1,
              this.tetromino.y,
              this.staticGrid,
            )
          ) {
            console.log(this.tetromino.x);
            this.tetromino.goRight();
          }

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

    window.addEventListener('mousemove', (e) => {
      let canvas = this.context.canvas;
      const { x: mx } = getRelativeMousePos(canvas, e);
      let width: number;
      if (window.devicePixelRatio > 1) {
        width = canvas.width / window.devicePixelRatio;
      } else {
        width = canvas.width;
      }
      const xSpacing = width / this.cols;
      let newSidePos = Math.floor(mx / xSpacing);
      if (newSidePos < 0) {
        newSidePos = 0;
      } else if (newSidePos >= this.cols) {
        newSidePos = this.cols - this.tetromino.shape[0].length;
      }
      if (
        this.tetromino.canBeThere(newSidePos, this.tetromino.y, this.staticGrid)
      ) {
        this.tetromino.goOnSide(newSidePos);
      }
    });

    setTimeout(() => {
      window.addEventListener('click', (e) => {
        while (
          this.tetromino.canBeThere(
            this.tetromino.x,
            this.tetromino.y + 1,
            this.staticGrid,
          )
        )
          this.tetromino.goDown();
      });
    }, 500);

    // canvas.addEventListener('mousedown', hold);
    // canvas.addEventListener('mouseup', hold);

    // let holding;
    // function hold(e) {
    //   function frame() {
    //     holding && requestAnimationFrame(frame);
    //     console.log(getRelativeMousePos(canvas, e));
    //   }

    //   if (e.type === 'mousedown') {
    //     holding = true;
    //     frame();
    //   } else if (e.type === 'mouseup') {
    //     holding = false;
    //   }
    // }
  }

  static get randomTetromino(): Tetromino {
    return randomInArray([
      I.clone(),
      J.clone(),
      L.clone(),
      O.clone(),
      Z.clone(),
      T.clone(),
      S.clone(),
    ]);
  }

  setupTetromino(tetromino: Tetromino) {
    tetromino.setPos(
      Math.floor(this.cols / 2) - Math.floor(tetromino.shape[0].length / 2),
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
    if (this.lastGoDown.getTime() + this.speed < Date.now()) {
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
        this.speed -= ms('0.0025s');
        this.lastNewTetromino = new Date();
        this.moveTetrominoToStaticGrid();
        this.tetromino = this.nextTetromino;
        this.nextTetromino = Game.randomTetromino;
        this.setupTetromino(this.nextTetromino);
        if (
          !this.tetromino.canBeThere(
            this.tetromino.x,
            this.tetromino.y,
            this.staticGrid,
          )
        ) {
          this.done = true;
          this.onEnd();
          return;
        }
      }
      this.lastGoDown = new Date();
    }
    this.movingGrid = this.tetromino.draw(this.movingGrid, this.staticGrid);
    if (this.lastNewTetromino.getTime() + this.speed * 6 < Date.now())
      this.movingGrid = this.nextTetromino.drawPreview(this.movingGrid);
    this.clearFullRows();
  }

  clearFullRows() {
    for (let index = 0; index < this.staticGrid.length; index++) {
      const row = this.staticGrid[index];
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
        roundRect(
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
          roundRect(
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
