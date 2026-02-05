document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('excelGrid');
    const rowNumbersContainer = document.getElementById('rowNumbers');
    const clearBtn = document.getElementById('clearBtn');
    const clearAllBtn = document.getElementById('clearAllBtn');
    const cellInfo = document.getElementById('cellInfo');

    let selectedCell = null;

    const cellWidth = 70;
    const cellHeight = 35;

   
    const pageHeight = window.innerHeight * 2.6;
    const stulpeliai = Math.floor((window.innerWidth - 60) / cellWidth);
    const eilutes = Math.floor(pageHeight / cellHeight);

    gridContainer.style.gridTemplateColumns = `repeat(${stulpeliai}, ${cellWidth}px)`;

   
    for (let r = 0; r < eilutes; r++) {
        const rowNumber = document.createElement('div');
        rowNumber.classList.add('row-number');
        rowNumber.textContent = r + 1;
        rowNumbersContainer.appendChild(rowNumber);

        for (let c = 0; c < stulpeliai; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.contentEditable = "true";
            cell.dataset.eilute = r + 1;
            cell.dataset.stulpelis = c + 1;

            
            cell.addEventListener('click', () => {
                if (selectedCell) selectedCell.classList.remove('selected');
                selectedCell = cell;
                cell.classList.add('selected');
                cellInfo.textContent = `Pasirinkta: Eilutė ${cell.dataset.eilute}, Stulpelis ${cell.dataset.stulpelis}`;
            });

           
            cell.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') e.preventDefault();
            });

            
            cell.addEventListener('input', () => {
                const maxSimboliai = 15;
                if (cell.textContent.length > maxSimboliai) {
                    cell.textContent = cell.textContent.slice(0, maxSimboliai);
                    placeCaretAtEnd(cell);
                }
            });

            function placeCaretAtEnd(el) {
                const range = document.createRange();
                range.selectNodeContents(el);
                range.collapse(false);
                const sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            }

            gridContainer.appendChild(cell);
        }
    }

    
    clearBtn.addEventListener('click', () => {
        if (selectedCell) {
            selectedCell.textContent = '';
        } else {
            alert("Pasirinkite langelį, kurį norite išvalyti!");
        }
    });

   
    clearAllBtn.addEventListener('click', () => {
        const allCells = document.querySelectorAll('.cell');
        allCells.forEach(cell => cell.textContent = '');
        cellInfo.textContent = "Visi langeliai išvalyti";
    });
});



