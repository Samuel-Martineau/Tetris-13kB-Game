// @flow

export default class Tetromino {
  color: string;
  shape: Array<Array<any>>;

  constructor(color: string, shape: Array<Array<any>>) {
    this.color = color;
    this.shape = shape;
  }

  // From https://gist.github.com/GeorgeGkas/36f7a7f9a9641c2115a11d58233ebed2
  clone() {
    return Object.assign(
      Object.create(Object.getPrototypeOf(this)),
      JSON.parse(JSON.stringify(this)),
    );
  }
}
