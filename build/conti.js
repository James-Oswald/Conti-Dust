import * as THREE from "./lib/three.module.js";
function newData(data) {
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
        newData(e.target.result);
    };
    reader.readAsText(file);
}
function init() {
    let existsingApplication = document.getElementById("application");
    if (existsingApplication != null)
        existsingApplication.remove();
    let w = window.innerWidth;
    let h = window.innerHeight;
    document.body.innerHTML += `<div id="application" width="${w}px" height="${h}px" style="padding:${h / 10}px ${w / 10}px;"></div>`;
    let application = document.getElementById("application");
    application.innerHTML += `<canvas id="selCol1" width="${w / 7}px" height="${h * 8 / 10}px"></canvas>`;
    application.innerHTML += `<canvas id="selCol2" width="${w / 7}px" height="${h * 8 / 10}px"></canvas>`;
    application.innerHTML += `<canvas id="main" width="${w * 4 / 10}px" height="${h * 8 / 10}px"></canvas>`;
    document.body.appendChild(application);
    let mainCanvas = document.getElementById("main");
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    let renderer = new THREE.WebGLRenderer({ canvas: mainCanvas });
    application.appendChild(renderer.domElement);
    renderer.render(scene, camera);
}
init();
window.addEventListener("resize", init);
//# sourceMappingURL=conti.js.map