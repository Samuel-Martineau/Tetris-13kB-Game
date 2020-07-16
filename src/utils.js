// @flow

// From https://codepen.io/hendrysadrak/pen/VYZQYv
CanvasRenderingContext2D.prototype.roundRect = function (
  x,
  y,
  width,
  height,
  radius
) {
  if (width < 2 * radius) radius = width / 2;
  if (height < 2 * radius) radius = height / 2;
  this.beginPath();
  this.moveTo(x + radius, y);
  this.arcTo(x + width, y, x + width, y + height, radius);
  this.arcTo(x + width, y + height, x, y + height, radius);
  this.arcTo(x, y + height, x, y, radius);
  this.arcTo(x, y, x + width, y, radius);
  this.closePath();
  return this;
};

export function line(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  ctx: CanvasRenderingContext2D
) {
  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

export function generateGrid<T>(
  cols: number,
  rows: number,
  val?: T
): Array<Array<T>> {
  return Array(rows)
    .fill(undefined)
    .map(() => Array(cols).fill(val));
}

export function square(
  x: number,
  y: number,
  width: number,
  height: number,
  color: string,
  ctx: CanvasRenderingContext2D
) {
  // ctx.beginPath();
  // ctx.fillRect(x, y, width, height);
  ctx.roundRect(x, y, width, height, 15);
  ctx.fillStyle = color;
  ctx.fill();
  // ctx.stroke();
}

// From https://stackoverflow.com/a/4550514/9723899
export function randomInArray<T>(array: Array<T>): T {
  return array[Math.floor(Math.random() * array.length)];
}
