const container = document.querySelector('.container');
const displaySize = document.querySelector('#sizeDisplay');
const clearButton = document.querySelector('#clear');
const eraserButton = document.querySelector('#erase');
const colorModeButton = document.querySelector('#colorMode');
const rainbowModeButton = document.querySelector('#rainbowMode');
const colorInput = document.getElementById('colorInput');

let currentColor = colorInput.value;
let currentMode = 'color';

// Create grid with specified size
function createGrid(size = 16) {
    // Clear any existing squares from container
    container.innerHTML = '';
  
    // Add rows and squares to container based on size
    for (let i = 0; i < size; i++) {
      let row = document.createElement('div');
      row.classList.add('row');
      container.appendChild(row);
  
      for (let j = 0; j < size; j++) {
        let square = document.createElement('div');
        square.classList.add('square');
        row.appendChild(square);
  
        // Add event listeners for drawing and erasing
        square.addEventListener('mousedown', function (event) {
          if (event.button === 0) {
            if (currentMode === 'color') {
              square.style.backgroundColor = currentColor;
            } else if (currentMode === 'raindbow'){
              square.style.backgroundColor = getRandomColor();
            }
            else if (currentMode === 'erase'){
                event.preventDefault();
                square.style.backgroundColor = 'transparent';
            }
          } 
        });
  
        square.addEventListener('mouseover', function (event) {
          if (event.buttons === 1) {
            if (currentMode === 'color') {
              square.style.backgroundColor = currentColor;
            } else if (currentMode === 'rainbow') {
              square.style.backgroundColor = getRandomColor();
            }
            else if (currentMode === 'erase'){
                event.preventDefault();
                square.style.backgroundColor = 'transparent';
            }
          }
        });
      }
    }
  }
  

// Clear all squares on the grid
function clearBoard() {
  const squares = document.querySelectorAll('.square');
  squares.forEach(square => {
    square.style.backgroundColor = '';
  });
}

// Change the displayed size of the grid
function changeSize() {
  const sizeInput = document.getElementById('sizeConfirm');
  const gridSize = sizeInput.value;
  displaySize.textContent = `${gridSize} x ${gridSize}`;
  clearBoard();
  createGrid(gridSize);
}

// Set the current drawing color
function setColor() {
  currentColor = colorInput.value;
}

// Set the current mode to color or rainbow
function setMode(mode) {
  currentMode = mode;
}

// Get a random color for rainbow mode
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Set the active button class and update current mode
function setActiveButton(button, mode) {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
      if (btn === button) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    
    if (mode === 'erase') {
      currentMode = 'erase';
    } else {
      setMode(mode);
    }
  }

// Initialize event listeners and drawing functionality
function init() {
  createGrid();
  changeSize();

  // Event listeners for buttons
  clearButton.addEventListener('click', clearBoard);
  eraserButton.addEventListener('click', () => setActiveButton(eraserButton, 'erase'));
  colorModeButton.addEventListener('click', () => setActiveButton(colorModeButton, 'color'));
  rainbowModeButton.addEventListener('click', () => setActiveButton(rainbowModeButton, 'rainbow'));
  colorInput.addEventListener('input', setColor);
  document.getElementById('sizeConfirm').addEventListener('change', changeSize);
}

init();
