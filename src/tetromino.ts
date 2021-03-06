// @ts-ignore TS6133
import { generateGrid, transparentize } from './utils.ts';

export default class Tetromino {
  color: string;
  shapes: Array<Array<Array<any>>>;
  shape: Array<Array<any>>;
  currentShapeIndex: number;
  x: number;
  y: number;

  constructor(
    color: string,
    shapes: Array<Array<Array<any>>>,
    currentShapeIndex?: number,
    x?: number,
    y?: number,
  ) {
    this.currentShapeIndex = currentShapeIndex ?? 0;
    this.x = x ?? 0;
    this.y = y ?? 0;

    this.color = color;
    this.shapes = shapes;
    this.shape = shapes[this.currentShapeIndex];
  }

  setPos(x?: number, y?: number) {
    this.x = x ?? this.x;
    this.y = y ?? this.y;
  }

  draw(
    movingGrid: Array<Array<any>>,
    staticGrid: Array<Array<any>>,
  ): Array<Array<any>> {
    // Clear the moving grid
    movingGrid = generateGrid(movingGrid[0].length, movingGrid.length, null);

    // Get the Y "ghost" of the Tetromino
    let ghostY = 0;
    while (this.canBeThere(this.x, ghostY + 1, staticGrid)) ghostY++;

    // Draw the Tetromino and it's "ghost"
    const height = this.shape.length;
    const width = this.shape[0].length;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (this.shape[y][x]) {
          movingGrid[y + ghostY][x + this.x] = 'rgba(255,255,255,0.5)';
          movingGrid[y + this.y][x + this.x] = this.color;
        }
      }
    }
    return movingGrid;
  }

  drawPreview(movingGrid: Array<Array<any>>): Array<Array<any>> {
    const height = this.shape.length;
    const width = this.shape[0].length;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (this.shape[y][x] && !movingGrid[y][x + this.x]) {
          movingGrid[y][x + this.x] = transparentize(this.color, 0.25);
        }
      }
    }
    return movingGrid;
  }

  goDown() {
    this.setPos(this.x, this.y + 1);
  }

  goLeft() {
    this.setPos(this.x - 1, this.y);
  }

  goRight() {
    this.setPos(this.x + 1, this.y);
  }

  goOnSide(x: number) {
    this.setPos(x, this.y);
  }

  canBeThere(
    xToTest: number,
    yToTest: number,
    grid: Array<Array<any>>,
  ): boolean {
    if (this.y >= grid.length - 1) return false;
    const height = this.shape.length;
    const width = this.shape[0].length;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (
          grid[y + yToTest] === undefined ||
          grid[y + yToTest][x + xToTest] === undefined ||
          (this.shape[y][x] && grid[y + yToTest][x + xToTest])
        ) {
          return false;
        }
      }
    }
    return true;
  }

  isOnSide(xToTest: number, grid: Array<Array<any>>): boolean {
    if (xToTest < 0) return true;
    if (xToTest > grid[0].length - this.shape[0].length) return true;
    return false;
  }

  rotateRight() {
    if (++this.currentShapeIndex >= this.shapes.length)
      this.currentShapeIndex = 0;
    this.shape = this.shapes[this.currentShapeIndex];
  }

  rotateLeft() {
    if (--this.currentShapeIndex < 0)
      this.currentShapeIndex = this.shapes.length - 1;
    this.shape = this.shapes[this.currentShapeIndex];
  }

  // From https://gist.github.com/GeorgeGkas/36f7a7f9a9641c2115a11d58233ebed2
  clone() {
    return new Tetromino(
      this.color,
      this.shapes,
      this.currentShapeIndex,
      this.x,
      this.y,
    );
  }
}
