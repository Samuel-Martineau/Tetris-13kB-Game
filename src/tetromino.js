// @flow

import { generateGrid } from "./utils";

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
    y?: number
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

  draw(grid: Array<Array<any>>): Array<Array<any>> {
    grid = generateGrid(grid[0].length, grid.length);
    const height = this.shape.length;
    const width = this.shape[0].length;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (this.shape[y][x]) grid[y + this.y][x + this.x] = this.color;
      }
    }
    return grid;
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

  canBeThere(
    xToTest: number,
    yToTest: number,
    grid: Array<Array<any>>
  ): boolean {
    if (this.y >= grid.length - 1) return false;
    const height = this.shape.length;
    const width = this.shape[0].length;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (
          !grid[y + yToTest] ||
          (this.shape[y][x] && grid[y + yToTest][x + xToTest])
        ) {
          return false;
        }
      }
    }
    return true;
  }

  isOnLeftSide(grid: Array<Array<any>>): boolean {
    if (this.x <= 0) return true;
    return false;
  }

  isOnRightSide(grid: Array<Array<any>>): boolean {
    if (this.x >= grid[0].length - this.shape[0].length) return true;
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
      this.y
    );
  }
}
