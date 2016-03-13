var synth = new Tone.PolySynth(10, Tone.Monosynth).toMaster(); // 10 is the height of the board; make variable in future?

synth.set({
    "envelope" : {
        "attack" : 0.1
    }
});

getNote: function (cell) {
    if (!cell) return;
    return cell.getAttribute('data-note');
}

setNote: function (y) {
    if (y == '0') note = "E5";
    if (y == '1') note = "D5";
    if (y == '2') note = "C5";
    if (y == '3') note = "B4";
    if (y == '4') note = "A4";
    if (y == '5') note = "G4";
    if (y == '6') note = "F4";
    if (y == '7') note = "E4";
    if (y == '8') note = "D4";
    if (y == '9') note = "C4";
    return note;
}

console.log("cell is born!");
var note = gameUtilities.getNote(cell);
synth.triggerAttackRelease(note, 0.2);
gameUtilities.setStatus(cell, 'alive');

for (var w = 0; w < this.width; w++) {
    tablehtml += "<td data-status='dead' data-note='" + gameUtilities.setNote(h) + "' id='" + w + "-" + h + "'></td>";
}