var currentX = 0;
var loopCount = 0;

var synth = new Tone.PolySynth(16, Tone.Monosynth).toMaster();

synth.set("envelope.attack", 0.04);

var scale = {};

// ********** RULE 30 **********
rule30 = {
    resurrect: {},
    kill: {}
};

rule30.resurrect.alive = [{left: false, right: false}, {left: false, right: true}];
rule30.resurrect.dead = [{left: true, right: false}, {left: false, right: true}];
rule30.kill.alive = [{left: true, right: false}, {left: true, right: true}];
rule30.kill.dead = [{left: false, right: false}, {right: true, left: true}];

// ********** RULE 54 **********
rule54 = {
    resurrect: {},
    kill: {}
};

rule54.resurrect.alive = [{left: false, right: false}];
rule54.resurrect.dead = [{left: false, right: true}, {left: true, right: false}, {left: true, right: true}];
rule54.kill.alive = [{left: false, right: true}, {left: true, right: false}, {left: true, right: true}];
rule54.kill.dead = [{left: false, right: false}];

// ********** RULE 90 **********
rule90 = {
    resurrect: {},
    kill: {}
};

rule90.resurrect.alive = [{left: false, right: true}, {left: true, right: false}];
rule90.resurrect.dead = [{left: false, right: true}, {left: true, right: false}];
rule90.kill.alive = [{left: false, right: false}, {left: true, right: true}];
rule90.kill.dead = [{left: false, right: false}, {left: true, right: true}];

// ********** RULE 150 **********
rule150 = {
    resurrect: {},
    kill: {}
};

rule150.resurrect.alive = [{left: false, right: false}, {left: true, right: true}];
rule150.resurrect.dead = [{left: false, right: true}, {left: true, right: false}];
rule150.kill.alive = [{left: false, right: true}, {left: true, right: false}];
rule150.kill.dead = [{left: false, right: false}, {left: true, right: true}];

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
        if (y == '0') note = "G5";
        if (y == '1') note = "E5";
        if (y == '2') note = "D5";
        if (y == '3') note = "C5";
        if (y == '4') note = "A4";
        if (y == '5') note = "G4";
        if (y == '6') note = "E4";
        if (y == '7') note = "D4";
        if (y == '8') note = "C4";
        if (y == '9') note = "A3";
        if (y == '10') note = "G3";
        if (y == '11') note = "E3";
        if (y == '12') note = "D3";
        if (y == '13') note = "C3";
        if (y == '14') note = "A2";
        if (y == '15') note = "G2";
        return note;
    },
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
        synth.triggerAttackRelease(note, 0.2);
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
    width: 17,
    height: 16,
    stepInterval: null,

    createAndShowBoard: function () {
        // create <table> element
        var goltable = document.createElement("tbody");

        // build Table HTML
        var tablehtml = '';
        for (var h = 0; h < this.height; h++) {
            tablehtml += "<tr id='row+" + h + "'>";
            for (var w = 0; w < this.width; w++) {
                if (w === 0 && h === Math.floor(this.height/2)) {
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

    getThisColumn: function (currentX, boardHeight) {
        var res = [];
        var i = currentX;
        for (var j = 0; j < boardHeight; j++) {
            var sc = gameUtilities.selectCellWithCoordinates;
            var myCell = sc(i, j)
            res.push(myCell);
    }
        return res;
    },

    forEachCellInColumn: function (currentX, iteratorFunc) {
        var cellElements = this.getThisColumn(currentX, this.height);

        [].slice.call(cellElements).forEach(function (cellElement) {
            if (!cellElement) return;
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
        document.getElementById('autoplay_btn').addEventListener('click', this.enableAutoPlay.bind(this));
    },

    clearBoard: function () {
        this.stop();
        this.forEachCell(function (cell) {
            currentX = 0;
            gameUtilities.setStatus(cell, 'dead');
        });
    },

    step: function () {
        this.forEachCellInColumn(currentX, function (cell) {

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
                var leftStatus = gameUtilities.getStatus(neighbors[1]) || 'dead';
                var rightStatus = gameUtilities.getStatus(neighbors[0]) || 'dead';
                var nextRow = gameUtilities.getNextRow(cell);
                var nextCell = nextRow[1];

                var isAliveConditionMet = isSelfConditionMet(true, cellStatus) && isANeighborConditionMet(ruleObj.resurrect.alive, rightStatus, leftStatus);

                var isDeadConditionMet = isSelfConditionMet(false, cellStatus) && isANeighborConditionMet(ruleObj.resurrect.dead, rightStatus, leftStatus)


                if (isAliveConditionMet || isDeadConditionMet) gameUtilities.resurrectCell(nextCell);

                isAliveConditionMet = isSelfConditionMet(true, cellStatus) && isANeighborConditionMet(ruleObj.kill.alive, rightStatus, leftStatus);

                isDeadConditionMet = isSelfConditionMet(false, cellStatus) && isANeighborConditionMet(ruleObj.kill.dead, rightStatus, leftStatus)

                
                if (isAliveConditionMet || isDeadConditionMet) gameUtilities.killCell(nextCell);
            }

            evaluateRuleSet (rule54, cell);
        });

        if (currentX === this.width - 2) {
            console.log("end of the board!");
            currentX = 0;
            loopCount++;
            console.log("loopCount: ", loopCount);
            return;
        }

        currentX++;
    },

    fillBoard: function () {
        var i = 0;
        while (i < 63) {
          this.step.bind(this)();
          i++;
        }
    },

    stepInterval: null,

    stop: function () {
        console.log("autoplay stopping!");
        if (this.stepInterval) {
            clearInterval(this.stepInterval);
            this.stepInterval = null;
        }
    },

    enableAutoPlay: function () {
        console.log("clicked autoplay!");
        if (!this.stepInterval) {
            this.stepInterval = setInterval(this.step.bind(this), 400);
        } else {
            this.stop();
        }
    }
};

gameOfLife.createAndShowBoard();
