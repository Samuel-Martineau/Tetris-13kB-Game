// @flow

import { Sprite } from 'kontra';
import { line } from './utils';

export default class Grid extends Sprite.class {
  grid: Array<Array<any>>;
  context: CanvasRenderingContext2D;

  constructor(cols: number, rows: number) {
    super();
    this.cols = cols;
    this.rows = rows;
    this.grid = Array(rows).fill(Array(cols).fill(undefined));
  }

  render() {
    const { clientHeight, clientWidth } = this.context.canvas;
    const xSpacing = clientWidth / this.cols;
    const ySpacing = clientHeight / this.rows;
    for (let i = 0; i < this.cols; i++) {
      line(
        (i + 1) * xSpacing,
        0,
        (i + 1) * xSpacing,
        clientHeight,
        this.context,
      );
    }
    for (let i = 0; i < this.rows; i++) {
      line(
        0,
        (i + 1) * ySpacing,
        clientWidth,
        (i + 1) * ySpacing,
        this.context,
      );
    }
  }
}
