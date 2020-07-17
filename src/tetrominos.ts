// @ts-ignore TS6133
import Tetromino from './tetromino.ts';

export const I = new Tetromino('#12CBC4', [
  [[1], [1], [1], [1]],
  [[1, 1, 1, 1]],
]);

export const J = new Tetromino('#0652DD', [
  [
    [0, 1],
    [0, 1],
    [1, 1],
  ],
  [
    [1, 0, 0],
    [1, 1, 1],
  ],
  [
    [1, 1],
    [1, 0],
    [1, 0],
  ],
  [
    [1, 1, 1],
    [0, 0, 1],
  ],
]);

export const L = new Tetromino('#F79F1F', [
  [
    [1, 0],
    [1, 0],
    [1, 1],
  ],
  [
    [1, 1, 1],
    [1, 0, 0],
  ],
  [
    [1, 1],
    [0, 1],
    [0, 1],
  ],
  [
    [0, 0, 1],
    [1, 1, 1],
  ],
]);

export const O = new Tetromino('#FFC312', [
  [
    [1, 1],
    [1, 1],
  ],
]);

export const Z = new Tetromino('#EA2027', [
  [
    [1, 1, 0],
    [0, 1, 1],
  ],
  [
    [0, 1],
    [1, 1],
    [1, 0],
  ],
]);

export const T = new Tetromino('#833471', [
  [
    [0, 1, 0],
    [1, 1, 1],
  ],
  [
    [1, 0],
    [1, 1],
    [1, 0],
  ],
  [
    [1, 1, 1],
    [0, 1, 0],
  ],
  [
    [0, 1],
    [1, 1],
    [0, 1],
  ],
]);

export const S = new Tetromino('#009432', [
  [
    [0, 1, 1],
    [1, 1, 0],
  ],
  [
    [1, 0],
    [1, 1],
    [0, 1],
  ],
]);
