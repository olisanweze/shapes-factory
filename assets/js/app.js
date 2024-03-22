/*=======================================================*/
/*                                                       */
/*  Olisa Nweze (2024)                                   */
/*  github.com/olisanweze                                */
/*                                                       */
/*====================================================== */

'use strict';

// This app requires a server to handle import statements and CORS issues
import * as utils from './utils.js';
import { Shape } from './Shape.js';

/* =====================================================*/
/*  Global Variables                                    */
/* =====================================================*/

const shapeButton = utils.select('.shape-button span');
const colorButton = utils.select('.color-button span');
const selectShape = utils.selectAll('.shape-content li');
const selectColor = utils.selectAll('.color-content li');
const create = utils.select('.create-button');
const output = utils.select('.output');
const panel = utils.select('.shape-panel');
const shapes = [];

const colors = {
  'Blue': '#09f',
  'Green': '#9f0',
  'Orange': '#f90',
  'Pink': '#f09',
  'Purple': '#90f'
};

let selectedShape = null;
let selectedColor = null;

/* =====================================================*/
/*  Functions                                          */
/* =====================================================*/

function setColor(element) {
  element.style.backgroundColor = colors[selectedColor]
}

function setShape(element) {
  element.classList.add('square');
  if (selectedShape === 'Circle') {
    element.classList.add('circle');
  }
}

function createShape() {
  if (shapes.length < 20) {
    let newDiv = utils.create('div'); 
    setColor(newDiv);
    setShape(newDiv);
    panel.appendChild(newDiv);

    const shape = new Shape(selectedShape, selectedColor);
    shapes.push(shape);
  }
}

function getShapeInfo(e) {
  let shapeIndex = Array.from(panel.children).indexOf(e.target);
  if (shapeIndex !== -1 && shapes[shapeIndex]) {
    shapes[shapeIndex].getInfo(output, shapeIndex);
  }
}

function loadTexts() {
  shapeButton.innerText = 'Shape';
  colorButton.innerText = 'Color';
  output.innerText = 'Select shape and color to start';
}

selectShape.forEach(shape => {
  utils.listen('click', shape, () => {
    selectedShape = shape.innerText;
    shapeButton.innerText = shape.innerText;
  });
});

selectColor.forEach(color => {
  utils.listen('click', color, () => {
    selectedColor = color.innerText;
    colorButton.innerText = color.innerText;
  });
});

utils.listen('load', window, loadTexts);
utils.listen('click', create, createShape);
utils.listen('click', panel, getShapeInfo);