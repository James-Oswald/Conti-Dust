"use strict";
function newData(data) {
}
function fileUpload() {
    var fileInput = document.getElementById("fileInput");
    var file = fileInput.files[0];
    if (file == null)
        throw "No file was provided";
    var reader = new FileReader();
    reader.onload = function (e) {
        if (e.target == null || e.target.result == null)
            throw "Failed to read file";
        newData(e.target.result);
    };
    reader.readAsText(file);
}
