
let canvas : CanvasRenderingContext2D;

function median(values: Array<number>):number{
    if(values.length === 0) 
        return 0;
    values.sort((a,b) => a - b);
    let half:number = Math.floor(values.length / 2);
    if (values.length % 2)
        return values[half];
    return (values[half - 1] + values[half]) / 2.0;
}

function newData(data: Uint8Array):void{
    let id: ImageData = canvas.createImageData(255, 255);
    let counts: Array<number> = new Array(256 * 256).fill(0);
    for(let i: number = 3; i < id.data.length; i += 4)
        id.data[i] = 255;
    for(let i : number = 0; i < data.length - 1; i++)
        counts[255 * data[i] + data[i + 1]]++;
    let med:number = median(counts.slice());
    for (let i:number = 0, j: number = 0; i < counts.length; i++, j += 4){
        if(counts[i] == 0){
            id.data[j] = 0;
            id.data[j + 1] = 0;
            id.data[j + 2] = 0;
            id.data[j + 3] = 255;
        }else{
            id.data[j] = 127 + counts[i] - med;
            id.data[j + 1] = 0;
            id.data[j + 2] = 127 - (counts[i] - med);
            id.data[j + 3] = 255;
        }
    }
    let tempCanvas = <HTMLCanvasElement>document.createElement("Canvas");
    tempCanvas.setAttribute("width", "255px");
    tempCanvas.setAttribute("height", "255px");
    document.body.append(tempCanvas);
    (<CanvasRenderingContext2D>tempCanvas.getContext("2d")).putImageData(id, 0, 0);
    canvas.scale(2, 2);
    canvas.drawImage(tempCanvas, 0, 0);
    canvas.scale(0.5, 0.5);
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
        let data: Uint8Array;
        if(typeof(e.target.result) == "string")
            data = new TextEncoder().encode(e.target.result);
        else
            data = new Uint8Array(e.target.result);
        newData(data);
    } 
	reader.readAsArrayBuffer(file);
}

function init(): void{
    canvas = <CanvasRenderingContext2D>(<HTMLCanvasElement>document.getElementById("canvas")).getContext("2d");
    canvas.fillStyle = "black";
    canvas.fillRect(0, 0, 510, 510);
}