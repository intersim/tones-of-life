var myRows = 3;
var myColumns = 3;

nx.onload = function(){
  nx.colorize("#5DD39E");
  matrix1.row = myRows;
  matrix1.col = myColumns;
  matrix1.resize(30*myColumns, 30*myRows);
  matrix1.init();

};

var loadRule30 = function () {
  matrix1.setCell(1,1,true);
  matrix1.setCell(0,1,true);
  // matrix1.draw();
  console.log("matrix1.place", matrix1.plaec);
};

var beatsArr = function (num) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push(i);
  }
  return arr;
};

var notes = new Tone.PolySynth(myRows, Tone.Monosynth, {
  "volume" : -12,
}).toMaster();

var pentatonic = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5", "F5"];
var noteNames = pentatonic.reverse(); 
//related to number of rows, also goes from highest pitch to lowest

var loop = new Tone.Sequence(function(time, col){
  var column = matrix1.matrix[col];
  for (var i = 0; i < myColumns; i++){
    if (column[i] === 1){
      notes.triggerAttackRelease(noteNames[i], "16n", time);
    }
  }
}, beatsArr(myColumns), "8n");

Tone.Transport.start();

$('#load').click(function() {
  loadRule30();
});

$('#start').click(function() {
  loop.start();
});

$('#stop').click(function () {
  loop.stop();
});