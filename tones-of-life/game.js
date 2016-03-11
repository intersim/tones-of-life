var synth = new Tone.PolySynth(10, Tone.Monosynth).toMaster(); // 10 is the height of the board; make variable in future?

synth.set({
    "envelope" : {
        "attack" : 0.1
    }
});

var gameUtilities = {
    selectCellWithCoordinates: function (x, y) {
        return document.getElementById(x + '-' + y);
    },
    getStatus: function (cell) {
        if (!cell) return;
        return cell.getAttribute('data-status');
    },
    setStatus: function (cell, status) {
        cell.className = status;
        cell.setAttribute('data-status', status);
    },
    getNote: function (cell) {
        if (!cell) return;
        return cell.getAttribute('data-note');
    },
    setNote: function (y) {
        if (y == '0') note = "F5";
        if (y == '1') note = "E5";
        if (y == '2') note = "D5";
        if (y == '3') note = "C5";
        if (y == '4') note = "B4";
        if (y == '5') note = "A4";
        if (y == '6') note = "G4";
        if (y == '7') note = "F4";
        if (y == '8') note = "E4";
        if (y == '9') note = "D4";
        if (y == '10') note = "C4";
        return note;
    },
    setNoteClass: function(cell, note) {
        cell.className = note;
    },
    toggleStatus: function (cell) {
        if (!cell) return;

        if (gameUtilities.getStatus(cell) === 'alive') {
            console.log("cell is dying...");
            gameUtilities.setStatus(cell, 'dead');
        } else {
            console.log("cell is born!");
            var note = gameUtilities.getNote(cell);
            synth.triggerAttackRelease(note, 0.2);
            gameUtilities.setStatus(cell, 'alive');
            gameUtilities.setNoteClass(cell, note);
        }
    },
    getCellCoords: function (cell) {
        var idSplit = cell.id.split('-');
        return {
            x: parseInt(idSplit[0], 10),
            y: parseInt(idSplit[1], 10)
        };
    },
    getNeighbors: function (cell) {

        var neighbors = [];
        var cellCoords = gameUtilities.getCellCoords(cell);
        var cellX = cellCoords.x;
        var cellY = cellCoords.y;
        var sc = gameUtilities.selectCellWithCoordinates;

        // Same column, adjacent
        neighbors.push(sc(cellX, cellY - 1)); // Same col, above
        neighbors.push(sc(cellX, cellY + 1)); // Same col, below

        return neighbors.filter(function (cell) {
            return cell !== null;
        });

    },

    getNextRow: function (cell) {

        var nextRow = [];
        var cellCoords = gameUtilities.getCellCoords(cell);
        var cellX = cellCoords.x;
        var cellY = cellCoords.y;
        var sc = gameUtilities.selectCellWithCoordinates;

        // Get next column
        nextRow.push(sc(cellX + 1, cellY - 1)); // Next column, row above
        nextRow.push(sc(cellX + 1, cellY)); // Next column, same row
        nextRow.push(sc(cellX + 1, cellY + 1)); // Next column, row below

        return nextRow.filter(function (cell) {
            return cell !== null;
        });
    }

};

var gameOfLife = {
    width: 60,
    height: 11,
    stepInterval: null,

    createAndShowBoard: function () {
        // create <table> element
        var goltable = document.createElement("tbody");

        // build Table HTML
        var tablehtml = '';
        for (var h = 0; h < this.height; h++) {
            tablehtml += "<tr id='row+" + h + "'>";
            for (var w = 0; w < this.width; w++) {
                if (w === 0 && h === 5) {
                    tablehtml += "<td data-status='alive' class='alive " + gameUtilities.setNote(h) + "' data-note='" + gameUtilities.setNote(h) + "' id='" + w + "-" + h + "'></td>";
                }
                else tablehtml += "<td data-status='dead' data-note='" + gameUtilities.setNote(h) + "' id='" + w + "-" + h + "'></td>";
            }
            tablehtml += "</tr>";
        }
        goltable.innerHTML = tablehtml;

        // add table to the #board element
        var board = document.getElementById('board');
        board.appendChild(goltable);

        // once html elements are added to the page, attach events to them
        this.setupBoardEvents();
    },

    forEachCell: function (iteratorFunc) {
        var cellElements = document.getElementsByTagName('td');

        [].slice.call(cellElements).forEach(function (cellElement) {
            var idHalves = cellElement.id.split('-');
            iteratorFunc(cellElement, parseInt(idHalves[0], 10), parseInt(idHalves[1], 10));
        });
    },

    setupBoardEvents: function () {
        var onCellClick = function (e) {
            console.log("this cell: ", this);
            gameUtilities.toggleStatus(this);
            var neighbors = gameUtilities.getNeighbors(this);

        };

        this.forEachCell(function (cellElement) {
            cellElement.addEventListener('click', onCellClick);
        });

        document.getElementById('step_btn').addEventListener('click', this.step.bind(this));
        document.getElementById('clear_btn').addEventListener('click', this.clearBoard.bind(this));
        document.getElementById('play_btn').addEventListener('click', this.enableAutoPlay.bind(this));
    },

    clearBoard: function () {

        this.stop();

        this.forEachCell(function (cell) {
            gameUtilities.setStatus(cell, 'dead');
        });

    },

    step: function () {
        var toggles = [];
        this.forEachCell(function (cell) {

        var neighbors = gameUtilities.getNeighbors(cell);
        var leftNeighbor = neighbors[0];
        var rightNeighbor = neighbors[1];
        var nextRow = gameUtilities.getNextRow(cell);
        var aboveNextRow = nextRow[0]; // Next row, prev col
        var acrossNextRow = nextRow[1]; // Next row, same col
        var bottomNextRow = nextRow[2]; // Next row, next col
        console.log("this cell: ", cell);
        console.log("nextRow: ", acrossNextRow);

        // ********** RULE 30 **********
        if (gameUtilities.getStatus(cell) === 'alive') {
            // 3
            if (gameUtilities.getStatus(leftNeighbor) !== 'alive' && gameUtilities.getStatus(rightNeighbor) !== 'alive') {
                resurrect.push(acrossNextRow);
            }
            // 4
            if (gameUtilities.getStatus(leftNeighbor) !== 'alive' && gameUtilities.getStatus(rightNeighbor) === 'alive') {
                resurrect.push(acrossNextRow);
            }
            // 7
            if (gameUtilities.getStatus(leftNeighbor) === 'alive' && gameUtilities.getStatus(rightNeighbor) !== 'alive') {
                kill.push(acrossNextRow);
            }
            // 8
            if (gameUtilities.getStatus(leftNeighbor) === 'alive' && gameUtilities.getStatus(rightNeighbor) === 'alive') {
                kill.push(acrossNextRow);
            }
        }

        if (gameUtilities.getStatus(cell) !== 'alive') {
            // 1
            if (gameUtilities.getStatus(leftNeighbor) !== 'alive' && gameUtilities.getStatus(rightNeighbor) !== 'alive') {
                kill.push(acrossNextRow);
            }
            // 2
            if (gameUtilities.getStatus(leftNeighbor) !== 'alive' && gameUtilities.getStatus(rightNeighbor) === 'alive') {
                resurrect.push(acrossNextRow);
            }
            // 5
            if (gameUtilities.getStatus(leftNeighbor) === 'alive' && gameUtilities.getStatus(rightNeighbor) !== 'alive') {
                resurrect.push(acrossNextRow);
            }
            // 6
            if (gameUtilities.getStatus(leftNeighbor) === 'alive' && gameUtilities.getStatus(rightNeighbor) === 'alive') {
                kill.push(acrossNextRow);
            }
        }

        });
        toggles.forEach(gameUtilities.toggleStatus);
    },

    stepInterval: null,

    stop: function () {
        if (this.stepInterval) {
            clearInterval(this.stepInterval);
            this.stepInterval = null;
        }
    },

    enableAutoPlay: function () {
        if (!this.stepInterval) {
            this.stepInterval = setInterval(this.step.bind(this), 400);
        } else {
            this.stop();
        }
    }
};

gameOfLife.createAndShowBoard();