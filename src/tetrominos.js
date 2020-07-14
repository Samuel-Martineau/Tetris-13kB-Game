// @flow

import Tetromino from './tetromino';

export const I = new Tetromino('#00cec9', [[1], [1], [1], [1]]);

export const J = new Tetromino('#00b894', [
  [0, 1],
  [0, 1],
  [1, 1],
]);

export const L = new Tetromino('#0984e3', [
  [1, 0],
  [1, 0],
  [1, 1],
]);

export const O = new Tetromino('#fdcb6e', [
  [1, 1],
  [1, 1],
]);

export const Z = new Tetromino('#81ecec', [
  [1, 1, 0],
  [0, 1, 1],
]);

export const T = new Tetromino('#d63031', [
  [0, 1, 0],
  [1, 1, 1],
]);

export const S = new Tetromino('#fd79a8', [
  [0, 1, 1],
  [1, 1, 0],
]);
