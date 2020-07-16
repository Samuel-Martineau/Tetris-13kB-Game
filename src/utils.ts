// @flow

// From https://codepen.io/hendrysadrak/pen/VYZQYv
export function roundRect(
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  ctx: CanvasRenderingContext2D,
) {
  if (width < 2 * radius) radius = width / 2;
  if (height < 2 * radius) radius = height / 2;
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

export function line(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  ctx: CanvasRenderingContext2D,
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
  val?: T,
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
  ctx: CanvasRenderingContext2D,
) {
  roundRect(x, y, width, height, ctx.canvas.width / 27, ctx);
  ctx.fillStyle = color;
  ctx.fill();
}

// From https://stackoverflow.com/a/4550514/9723899
export function randomInArray<T>(array: Array<T>): T {
  return array[Math.floor(Math.random() * array.length)];
}
