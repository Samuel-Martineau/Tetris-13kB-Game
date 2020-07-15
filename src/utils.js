// @flow

export function line(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  ctx: CanvasRenderingContext2D,
) {
  ctx.beginPath();
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
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
  ctx.stroke();
}

// From https://stackoverflow.com/a/4550514/9723899
export function randomInArray<T>(array: Array<T>): T {
  return array[Math.floor(Math.random() * array.length)];
}
