export class Shape  {
  constructor(shape, color) {
    this.name = shape;
    this.color = color;
  }

  _name;
  _color;

  set name(value) {
    this._name = value;
  }

  set color(value) {
    this._color = value;
  }

  get name() {
    return this._name;
  }

  get color() {
    return this._color;
  }

  getInfo(output, index) {
    output.innerText = `Unit ${index + 1}: ${this._color} ${this._name}`;
  }
}