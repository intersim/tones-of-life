var currentX = 0;
var loopCount = 0;

// ********** Instrument **********
var synth = new Tone.PolySynth(16, Tone.SimpleSynth, {
            "oscillator" : {
                "partials" : [0, 2, 3, 4],
            },
            "volume" : -24
        }).toMaster();

var selectedInstr = synth;

var marimba = new Tone.PolySynth(8, Tone.Sampler, {
    "A" : {
        2 : "./samples/marimba/ogg/Marimba.yarn.ff.A2.stereo.ogg",
        3 : "./samples/marimba/ogg/Marimba.yarn.ff.A3.stereo.ogg",
        4 : "./samples/marimba/ogg/Marimba.yarn.ff.A4.stereo.ogg"
        },
    // "Bb" : {
    //     3 : "./samples/marimba/ogg/Marimba.yarn.ff.Bb3.stereo.ogg",
    //     4 : "./samples/marimba/ogg/Marimba.yarn.ff.Bb4.stereo.ogg"
    //     },
    // "B" : {
    //     3 : "./samples/marimba/ogg/Marimba.yarn.ff.B3.stereo.ogg",
    //     4 : "./samples/marimba/ogg/Marimba.yarn.ff.B4.stereo.ogg"
    //     },
    "C" : {
        3 : "./samples/marimba/ogg/Marimba.yarn.ff.C3.stereo.ogg",
        4 : "./samples/marimba/ogg/Marimba.yarn.ff.C4.stereo.ogg",
        5 : "./samples/marimba/ogg/Marimba.yarn.ff.C5.stereo.ogg"
        },
    "D" : {
        3 : "./samples/marimba/ogg/Marimba.yarn.ff.D3.stereo.ogg",
        4 : "./samples/marimba/ogg/Marimba.yarn.ff.D4.stereo.ogg",
        5 : "./samples/marimba/ogg/Marimba.yarn.ff.D5.stereo.ogg"
        },
    // "Eb" : {
    //     3 : "./samples/marimba/ogg/Marimba.yarn.ff.Eb3.stereo.ogg",
    //     4 : "./samples/marimba/ogg/Marimba.yarn.ff.Eb4.stereo.ogg",
    //     5 : "./samples/marimba/ogg/Marimba.yarn.ff.Eb5.stereo.ogg"
    //     },
    "E" : {
        3 : "./samples/marimba/ogg/Marimba.yarn.ff.E3.stereo.ogg",
        4 : "./samples/marimba/ogg/Marimba.yarn.ff.E4.stereo.ogg",
        5 : "./samples/marimba/ogg/Marimba.yarn.ff.E5.stereo.ogg"
        },
    "G" : {
        2 : "./samples/marimba/ogg/Marimba.yarn.ff.G2.stereo.ogg",
        3 : "./samples/marimba/ogg/Marimba.yarn.ff.G3.stereo.ogg",
        4 : "./samples/marimba/ogg/Marimba.yarn.ff.G4.stereo.ogg",
        5 : "./samples/marimba/ogg/Marimba.yarn.ff.G5.stereo.ogg"
        }
}).toMaster();

// Tone.Buffer.on('load', function () {
//     console.log("trying to get samples working...");
//     marimba.triggerAttack(['C.4', 'E.4', 'G.4']);
// });

// $('#instrument').on('change', function () {
//     var val = $('#instrument option:selected').val();
//     if (val == "synth") selectedInstr = synth;
//     if (val == "marimba") selectedInstr = marimba;

//     var cells = document.getElementsByTagName('td');
//     var cellsArr = [].slice.call(cells);

//     var cells = document.getElementsByTagName('td');
//     var cellsArr = [].slice.call(cells);
//     cellsArr.forEach(function(cell){
//         gameUtilities.setSamplerNote(cell);
//     })

//     // getting this err when trying to select marimba: Tone.min.js:12 Uncaught TypeError: Failed to set the 'buffer' property on 'AudioBufferSourceNode': The provided value is not of type 'AudioBuffer'
// });

// ********** Scales **********

var pentatonicScale = {
    name: "pentatonic",
    0: "G5",
    1: "E5",
    2: "D5",
    3: "C5",
    4: "A4",
    5: "G4",
    6: "E4",
    7: "D4",
    8: "C4",
    9: "A3",
    10: "G3",
    11: "E3",
    12: "D3",
    13: "C3",
    14: "A2",
    15: "G2"
};

var mixoScale = {
    name: "mixolydian",
    0: "G5",
    1: "E5",
    2: "D5",
    3: "C5",
    4: "Bb4",
    5: "G4",
    6: "E4",
    7: "D4",
    8: "C4",
    9: "Bb3",
    10: "G3",
    11: "E3",
    12: "D3",
    13: "C3",
    14: "Bb2",
    15: "G2"
};

var minorPentatonicScale = {
    name: "minor",
    0: "G5",
    1: "Eb5",
    2: "D5",
    3: "C5",
    4: "A4",
    5: "G4",
    6: "Eb4",
    7: "D4",
    8: "C4",
    9: "A3",
    10: "G3",
    11: "Eb3",
    12: "D3",
    13: "C3",
    14: "A2",
    15: "G2"
};

var scale = pentatonicScale;

$('#scale').on('change', function () {
    var val = $('#scale option:selected').val();
    if (val == "pen") scale = pentatonicScale;
    if (val == "mix") scale = mixoScale;
    if (val == "min") scale = minorPentatonicScale;

    var cells = document.getElementsByTagName('td');
    var cellsArr = [].slice.call(cells);

    cellsArr.forEach(function(cell){
        gameUtilities.setNewNote(cell);
    });
});

// ********** Looping **********

var loopEvent = jQuery.Event('loop');

$('body').on('loop', function () {
    console.log('loop!');
});

// ********** BPM **********

var selectedBPM = 300;

$('#bpm').on('change', function () {
    var val = $('#bpm option:selected').val();
    if (val == 120) selectedBPM = 250;
    if (val == 100) selectedBPM = 300;
    if (val == 80) selectedBPM = 375;
    if (val == 60) selectedBPM = 500;
    console.log(selectedBPM);
});

// ********** Rules: **********
// ********** Rule 30 **********
rule30 = {
    resurrect: {},
    kill: {}
};

rule30.resurrect.alive = [{left: false, right: false}, {left: false, right: true}];
rule30.resurrect.dead = [{left: true, right: false}, {left: false, right: true}];
rule30.kill.alive = [{left: true, right: false}, {left: true, right: true}];
rule30.kill.dead = [{left: false, right: false}, {right: true, left: true}];

// ********** Rule 54 **********
rule54 = {
    resurrect: {},
    kill: {}
};

rule54.resurrect.alive = [{left: false, right: false}];
rule54.resurrect.dead = [{left: false, right: true}, {left: true, right: false}, {left: true, right: true}];
rule54.kill.alive = [{left: false, right: true}, {left: true, right: false}, {left: true, right: true}];
rule54.kill.dead = [{left: false, right: false}];

// ********** Rule 90 **********
rule90 = {
    resurrect: {},
    kill: {}
};

rule90.resurrect.alive = [{left: false, right: true}, {left: true, right: false}];
rule90.resurrect.dead = [{left: false, right: true}, {left: true, right: false}];
rule90.kill.alive = [{left: false, right: false}, {left: true, right: true}];
rule90.kill.dead = [{left: false, right: false}, {left: true, right: true}];

// ********** Rule 150 **********
rule150 = {
    resurrect: {},
    kill: {}
};

rule150.resurrect.alive = [{left: false, right: false}, {left: true, right: true}];
rule150.resurrect.dead = [{left: false, right: true}, {left: true, right: false}];
rule150.kill.alive = [{left: false, right: true}, {left: true, right: false}];
rule150.kill.dead = [{left: false, right: false}, {left: true, right: true}];

var selectedRule = rule30;

$('#rule').on('change', function () {
    var val = $('#rule option:selected').val();
    if (val == 30) selectedRule = rule30;
    if (val == 54) selectedRule = rule54;
    if (val == 90) selectedRule = rule90;
    if (val == 150) selectedRule = rule150;
});

// ********** Game Utilities **********

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
        if (y == '0') note = scale[0];
        if (y == '1') note = scale[1];
        if (y == '2') note = scale[2];
        if (y == '3') note = scale[3];
        if (y == '4') note = scale[4];
        if (y == '5') note = scale[5];
        if (y == '6') note = scale[6];
        if (y == '7') note = scale[7];
        if (y == '8') note = scale[8];
        if (y == '9') note = scale[9];
        if (y == '10') note = scale[10];
        if (y == '11') note = scale[11];
        if (y == '12') note = scale[12];
        if (y == '13') note = scale[13];
        if (y == '14') note = scale[14];
        if (y == '15') note = scale[15];
        return note;
    },
    setScaleClass: function(cell, scale) {
        cell.className = scale.name;
    },
    setNewNote: function(cell) {
        var cellCoords = gameUtilities.getCellCoords(cell);
        var cellX = cellCoords.x;
        var cellY = cellCoords.y;
        var newNote = gameUtilities.setNote(cellY);
        cell.dataset.note = newNote;
    },
    getSamplerNote: function(cell) { 
        var str = gameUtilities.getNote(cell)
        str.length == 2 ? newStr = str[0] + "." + str[1] : newStr = str.substr(0, 1) + "." + str[2];
        return newStr;
    },
    setSamplerNote: function(cell) {
        var newNote = gameUtilities.getSamplerNote(cell);
        cell.dataset.note = newNote;
    },
    toggleStatus: function (cell) {
        if (!cell) return;

        if (gameUtilities.getStatus(cell) === 'alive') {
            gameUtilities.setStatus(cell, 'dead');
        } else {
            var note = gameUtilities.getNote(cell);
            selectedInstr.triggerAttackRelease(note, 0.2);
            gameUtilities.setStatus(cell, 'alive');
            // gameUtilities.setScaleClass(cell, scale);
        }
    },
    killCell: function (cell) {
        if (!cell) return;
        gameUtilities.setStatus(cell, 'dead');
    },
    resurrectCell: function (cell) {
        if (!cell) return;

        var note = gameUtilities.getNote(cell);
        selectedInstr.triggerAttackRelease(note, 0.2);
        gameUtilities.setStatus(cell, 'alive');
        gameUtilities.setScaleClass(cell, scale);
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

// ********** Game Board **********

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
                    tablehtml += "<td data-status='alive' class='alive' data-note='" + gameUtilities.setNote(h) + "' id='" + w + "-" + h + "'></td>";
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

            evaluateRuleSet (selectedRule, cell);
        });

        if (currentX === this.width - 2) {
            console.log("end of the board!");
            currentX = 0;
            loopCount++;
            $('body').trigger('loop');
            return;
        }

        currentX++;
    },

    // fillBoard: function () {
    //     var i = 0;
    //     while (i < 63) {
    //       this.step.bind(this)();
    //       i++;
    //     }
    // },

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
            this.stepInterval = setInterval(this.step.bind(this), selectedBPM);
        } else {
            this.stop();
        }
    }
};

gameOfLife.createAndShowBoard();
