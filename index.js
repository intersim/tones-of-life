// var start4th = "";

// var next4th = function () {
//   return start4th += "+4n";
// };

// var synth = new Tone.SimpleSynth().toMaster();

// synth.triggerAttackRelease("D4", "4n");
// synth.triggerAttackRelease("E4", "4n", next4th());
// synth.triggerAttackRelease("C4", "4n", next4th());
// synth.triggerAttackRelease("C3", "4n", next4th());
// synth.triggerAttackRelease("G3", "4n", next4th());

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
    // makeDuration: function (w) {
    //   var duration = "";

    //   for (var i = 0; i < w; i++) {
    //     // make note values here!
    //   };

    //   return duration;
    // },
    setNoteClass: function(cell, note) {
        cell.className = note;
    },
    toggleStatus: function (cell) {
        if (!cell) return;

        if (gameUtilities.getStatus(cell) === 'alive') {
            gameUtilities.setStatus(cell, 'dead');
        } else {
            var note = gameUtilities.getNote(cell);
            synth.triggerAttackRelease(note, 0.2);
            gameUtilities.setStatus(cell, 'alive');
            gameUtilities.setNoteClass(cell, note);
        }
    },
    killCell: function (cell) {
        if (!cell) return;
        gameUtilities.setStatus(cell, 'dead');
    },
    resurrectCell: function (cell) {
        if (!cell) return;

        var note = gameUtilities.getNote(cell);
        gameUtilities.setStatus(cell, 'alive');
        gameUtilities.setNoteClass(cell, note);
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

        return nextRow;
    }

};

var gameOfLife = {
    width: 40,
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

    forEachRow: function (iteratorFunc) {
        var cellElements = document.getElementsByTagName('td');

        [].slice.call(cellElements).forEach(function (cellElement) {
            var idHalves = cellElement.id.split('-');
            iteratorFunc(cellElement, parseInt(idHalves[0], 10), parseInt(idHalves[1], 10));
        });
    },

    setupBoardEvents: function () {
        var onCellClick = function (e) {
            gameUtilities.toggleStatus(this);
            var neighbors = gameUtilities.getNeighbors(this);

        };

        this.forEachCell(function (cellElement) {
            cellElement.addEventListener('click', onCellClick);
        });

        document.getElementById('step_btn').addEventListener('click', this.step.bind(this));
        document.getElementById('clear_btn').addEventListener('click', this.clearBoard.bind(this));
        document.getElementById('fill_btn').addEventListener('click', this.fillBoard.bind(this));
    },

    clearBoard: function () {
        this.forEachCell(function (cell) {
            gameUtilities.setStatus(cell, 'dead');
        });
    },

    step: function () {
        this.forEachCell(function (cell) {
            rule30 = {
                resurrect: {},
                kill: {}
            };

            rule30.resurrect.alive = [{left: false, right: false}, {left: false, right: true}];
            rule30.resurrect.dead = [{left: true, right: false}, {left: false, right: true}];
            rule30.kill.alive = [{left: true, right: false}, {left: true, right: true}];
            rule30.kill.dead = [{left: false, right: false}, {right: true, left: true}];

            // should the cell be alive, or dead?
            function isSelfConditionMet (shouldSelfAlive, selfStatus) {
               return shouldSelfAlive == (selfStatus === 'alive')
            }

            // are the neighbors' statuses meeting the given condition?
            function isNeighborConditionsMet (innerConditions, rightStatus, leftStatus) {
                var leftConditionMet = (innerConditions.left == (leftStatus === 'alive'));
                var rightConditionMet = (innerConditions.right == (rightStatus === 'alive'));
                return leftConditionMet && rightConditionMet;
            }

            // is one of the conditions in the array being met?
            function isANeighborConditionMet (arrNeighborCond, rightStatus, leftStatus) {
                for (var i = 0; i < arrNeighborCond.length; i++) {
                    var isConditionMet = isNeighborConditionsMet(arrNeighborCond[i], rightStatus, leftStatus);
                    if (isConditionMet) return true;
                }
                return false;
            }

            // is the cell status right, and is the condition in the array being met? if yes, kill or resurrect the cell
            function evaluateRuleSet (ruleObj, cell) {
                var cellCoords = gameUtilities.getCellCoords(cell);
                var cellX = cellCoords.x;
                var cellY = cellCoords.y;

                var cellStatus = gameUtilities.getStatus(cell);
                var neighbors = gameUtilities.getNeighbors(cell);
                var leftStatus = gameUtilities.getStatus(neighbors[1])/* || 'dead'*/;
                var rightStatus = gameUtilities.getStatus(neighbors[0])/* || 'dead'*/;
                var nextRow = gameUtilities.getNextRow(cell);
                var nextCell = nextRow[1];

                var isAliveConditionMet = isSelfConditionMet(true, cellStatus) && isANeighborConditionMet(ruleObj.resurrect.alive, rightStatus, leftStatus);

                var isDeadConditionMet = isSelfConditionMet(false, cellStatus) && isANeighborConditionMet(ruleObj.resurrect.dead, rightStatus, leftStatus)


                if (isAliveConditionMet || isDeadConditionMet) gameUtilities.resurrectCell(nextCell);

                isAliveConditionMet = isSelfConditionMet(true, cellStatus) && isANeighborConditionMet(ruleObj.kill.alive, rightStatus, leftStatus);

                isDeadConditionMet = isSelfConditionMet(false, cellStatus) && isANeighborConditionMet(ruleObj.kill.dead, rightStatus, leftStatus)

                
                if (isAliveConditionMet || isDeadConditionMet) gameUtilities.killCell(nextCell);
            }

            evaluateRuleSet (rule30, cell);
        });
    },

    fillBoard: function () {
        var i = 0;
        while (i < 63) {
          this.step.bind(this)();
          i++;
        }
    }
};

gameOfLife.createAndShowBoard();

// time to play the board!
// set duration depending on w value in board setup by making it data in the 
// gameUtilities.makeDuration: needs to return a string of 8n or more (simplify into measures, quarter notes?)

var playBoard = function () {
  // one column at a time:
};
