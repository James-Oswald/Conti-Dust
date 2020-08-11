"use strict";
let canvas;
function median(values) {
    if (values.length === 0)
        return 0;
    values.sort((a, b) => a - b);
    let half = Math.floor(values.length / 2);
    if (values.length % 2)
        return values[half];
    return (values[half - 1] + values[half]) / 2.0;
}
function newData(data) {
    let id = canvas.createImageData(255, 255);
    let counts = new Array(256 * 256).fill(0);
    for (let i = 3; i < id.data.length; i += 4)
        id.data[i] = 255;
    for (let i = 0; i < data.length - 1; i++)
        counts[255 * data[i] + data[i + 1]]++;
    let med = median(counts.slice());
    for (let i = 0, j = 0; i < counts.length; i++, j += 4) {
        if (counts[i] == 0) {
            id.data[j] = 0;
            id.data[j + 1] = 0;
            id.data[j + 2] = 0;
            id.data[j + 3] = 255;
        }
        else {
            id.data[j] = 127 + counts[i] - med;
            id.data[j + 1] = 0;
            id.data[j + 2] = 127 - (counts[i] - med);
            id.data[j + 3] = 255;
        }
    }
    let tempCanvas = document.createElement("Canvas");
    tempCanvas.setAttribute("width", "255px");
    tempCanvas.setAttribute("height", "255px");
    document.body.append(tempCanvas);
    tempCanvas.getContext("2d").putImageData(id, 0, 0);
    canvas.scale(2, 2);
    canvas.drawImage(tempCanvas, 0, 0);
    canvas.scale(0.5, 0.5);
}
function fileUpload() {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
    if (file == null)
        throw "No file was provided";
    const reader = new FileReader();
    reader.onload = function (e) {
        if (e.target == null || e.target.result == null)
            throw "Failed to read file";
        let data;
        if (typeof (e.target.result) == "string")
            data = new TextEncoder().encode(e.target.result);
        else
            data = new Uint8Array(e.target.result);
        newData(data);
    };
    reader.readAsArrayBuffer(file);
}
function init() {
    canvas = document.getElementById("canvas").getContext("2d");
    canvas.fillStyle = "black";
    canvas.fillRect(0, 0, 510, 510);
}
//# sourceMappingURL=conti.js.map