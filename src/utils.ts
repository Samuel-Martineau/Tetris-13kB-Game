// @flow

export function line(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  ctx: CanvasRenderingContext2D,
) {
  ctx.beginPath();
  ctx.lineWidth = ctx.canvas.width / 100;
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

export function roundRect(
  x: number,
  y: number,
  width: number,
  height: number,
  color: string,
  ctx: CanvasRenderingContext2D,
) {
  // From https://codepen.io/hendrysadrak/pen/VYZQYv
  let radius: number = ctx.canvas.width / 35;
  if (width < 2 * radius) radius = width / 2;
  if (height < 2 * radius) radius = height / 2;
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();

  ctx.fillStyle = color;
  ctx.fill();
}

export function text(
  font: string,
  color: string,
  textAlign: CanvasTextAlign,
  text: string,
  x: number,
  y: number,
  ctx: CanvasRenderingContext2D,
) {
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = textAlign;
  ctx.fillText(text, x, y);
}

export function button(
  canvas: HTMLCanvasElement,
  onClick: (listener: (e: any) => void) => void,
) {
  let _x, _y, _width, _height;

  function onButtonClick(e) {
    const { x: mx, y: my } = getRelativeMousePos(canvas, e);
    if (
      mx * (window.devicePixelRatio ?? 1) > _x &&
      mx * (window.devicePixelRatio ?? 1) < _x + _width &&
      my * (window.devicePixelRatio ?? 1) > _y &&
      my * (window.devicePixelRatio ?? 1) < _y + _height
    ) {
      onClick(onButtonClick);
    }
  }

  canvas.addEventListener('click', onButtonClick);

  return (
    title: string,
    x: number,
    y: number,
    width: number,
    height: number,
    borderSize: number,
    ctx: CanvasRenderingContext2D,
  ) => {
    _x = x;
    _y = y;
    _width = width;
    _height = height;
    roundRect(
      x,
      y - borderSize / 2,
      width + borderSize,
      height + borderSize,
      'white',
      ctx,
    );
    roundRect(canvas.width / 2 - width / 2, y, width, height, '#0652dd', ctx);
    text(
      `${canvas.width / 13}px MinecraftTen`,
      'white',
      'center',
      title,
      canvas.width / 2,
      y + canvas.height / 21.5,
      ctx,
    );
  };
}

// From https://stackoverflow.com/a/17130415/9723899
export function getRelativeMousePos(canvas, e) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
}

// From https://stackoverflow.com/a/4550514/9723899
export function randomInArray<T>(array: Array<T>): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function transparentize(hex: string, opacity: number): string {
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);
  return `rgba(${r},${g},${b},${opacity})`;
}
