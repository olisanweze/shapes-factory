/*=======================================================*/
/*                                                       */
/*  Olisa Nweze (2024)                                   */
/*  github.com/olisanweze                                */
/*                                                       */
/*====================================================== */

'use strict';

import { select, selectAll, listen, create } from './utils.js';
import { Shape } from './Shape.js';

/* =====================================================*/
/*  Global Variables                                    */
/* =====================================================*/

const shapeButton = select('.shape-button span');
const colorButton = select('.color-button span');
const selectShape = selectAll('.shape-content li');
const selectColor = selectAll('.color-content li');
const createButton = select('.create-button');
const output = select('.output');
const panel = select('.shape-panel');
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
    let newDiv = create('div'); 
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
  listen('click', shape, () => {
    selectedShape = shape.innerText;
    shapeButton.innerText = shape.innerText;
  });
});

selectColor.forEach(color => {
  listen('click', color, () => {
    selectedColor = color.innerText;
    colorButton.innerText = color.innerText;
  });
});

/* =====================================================*/
/*  Event Listeners                                     */
/* =====================================================*/

listen('load', window, loadTexts);
listen('click', createButton, createShape);
listen('click', panel, getShapeInfo);