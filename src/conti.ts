import * as THREE from "./lib/three.module.js";

function newData(data: ArrayBuffer):void{
    
}

function fileUpload():void{
    const fileInput: HTMLInputElement = <HTMLInputElement>document.getElementById("fileInput");
    const file: File = <File>(<FileList>fileInput.files)[0];
    if(file == null)
        throw "No file was provided"
	const reader: FileReader = new FileReader();
	reader.onload = function(e):void{
        if(e.target == null || e.target.result == null)
            throw "Failed to read file"
        data = <ArrayBuffer>e.target.result;
        newData(data);
    } 
	reader.readAsText(file);
}

let data: ArrayBuffer | null = null;
let sel1: CanvasRenderingContext2D;
let sel2: CanvasRenderingContext2D;
let scene : any;
let camera : any;
let renderer : any;

function init(){
    let existsingApplication: HTMLElement | null  = document.getElementById("application");
    if(existsingApplication != null)
        existsingApplication.remove();
    let w : number = window.innerWidth;
    let h : number = window.innerHeight;
    document.body.innerHTML += `<div id="application" width="${w}px" height="${h}px" style="padding:${h/10}px ${w/10}px;"></div>`;
    let application : HTMLDivElement = <HTMLDivElement>document.getElementById("application");
    application.innerHTML += `<canvas id="selCol1" width="${w/7}px" height="${h * 8/10}px"></canvas>`
    application.innerHTML += `<canvas id="selCol2" width="${w/7}px" height="${h * 8/10}px"></canvas>`
    application.innerHTML += `<canvas id="main" width="${w * 4/10}px" height="${h * 8/10}px"></canvas>`
    document.body.appendChild(application);
    let mainCanvas : HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("main");
    scene  = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, (w * 4/10) / (h * 8/10), 0.1, 1000);
    renderer = new THREE.WebGLRenderer({canvas: mainCanvas});
    application.appendChild(renderer.domElement);
    renderer.render(scene, camera);
    sel1 = <CanvasRenderingContext2D>(<HTMLCanvasElement>document.getElementById("selCol1")).getContext("2d");
    sel2 = <CanvasRenderingContext2D>(<HTMLCanvasElement>document.getElementById("selCol2")).getContext("2d");
    if(data != null)
        newData(data);
}
init();
window.addEventListener("resize", init);