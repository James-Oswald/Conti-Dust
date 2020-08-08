

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
        newData(<ArrayBuffer>e.target.result);
    } 
	reader.readAsText(file);
}
