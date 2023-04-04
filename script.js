const displaySize = document.querySelector('#sizeDisplay');
const clearBttn = document.querySelector('#clear');
let currColor = colorInput.value;

function createGrid(gridSize = 16){
    const colorInput = document.getElementById('colorInput');
    const container = document.querySelector('.container');

    container.innerHTML = '';
    for (let i = 0; i < gridSize; i++){
        // Create row
        let row = document.createElement('div'); 
        row.className = `row`;
        container.appendChild(row);

        for(let j = 0; j < gridSize; j++){
            // Create the squares in one row according to size
            const square = document.createElement('div');
            square.className = 'square';
            row.appendChild(square);

            square.addEventListener('click',function(){
                square.style.backgroundColor = currColor;
            });
        }
    }
}

function clearBoard(){
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
    square.style.backgroundColor = '';
    });
}

function changeSize(){
    const sizeInput = document.getElementById('sizeConfirm');
    sizeInput.addEventListener('change',function(){
        let gridSize = sizeInput.value;
        displaySize.textContent = `${gridSize} x ${gridSize}`;
        clearBoard();
        createGrid(gridSize);
    });
}

function checkForClear(){
    clearBttn.addEventListener('click',function(){
        clearBoard();
    });
}

function startDrawing(){
    let gridSize = 16;
    createGrid(gridSize);
    changeSize();
    checkForClear();
}

startDrawing();