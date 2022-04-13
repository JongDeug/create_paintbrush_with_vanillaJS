const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");

const DEFAULT_COLOR = "#2c2c2c";

// set canvas background
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// set canvas line color, line width
ctx.fillStyle = DEFAULT_COLOR;
ctx.strokeStyle = DEFAULT_COLOR;
ctx.lineWidth = 2.5;

// set booleans
let filling = false;
let painting = false;

function stopPainting(){
    painting = false;
}    
function startPainting(){ 
    painting = true;
}

function onMouseMove(e){
    const x = e.offsetX;
    const y = e.offsetY;

    // if mouse move, up
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    } 
    // if mouse down
    else{
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

// set color
function setColor(){
    // return NodeList 
    const jsColors = document.querySelectorAll("#jsColors .controls_color");
    
    // NodeList have forEach function, but it's not Array 
    jsColors.forEach(element => {
        element.addEventListener("click", function(event){
            ctx.strokeStyle = event.target.style.backgroundColor;
            ctx.fillStyle = event.target.style.backgroundColor;
        });
    });
}

// set line width
function setLineWidth(){
    const jsRange = document.querySelector("#jsRange");

    if(jsRange){
        // fires when the value of an element has been changed.
        jsRange.addEventListener("input", function(){
            console.log(jsRange.value);
            ctx.lineWidth = jsRange.value;
        })
    }
    else{
        console.error("jsRange doesn't exist");
    }
}

function setMode(){
    const mode = document.querySelector("#jsMode");
    if(mode){
        mode.addEventListener("click", function(){
            if(filling === true){
                filling = false;
                mode.innerText = "fill";
            }else{
                filling = true;
                mode.innerText = "paint"   
            }
        });
    }
}

function save(){
    const saveBtn = document.querySelector("#jsSave");
    if(saveBtn){
        saveBtn.addEventListener("click", function(){

            // 복습 하세용
            const image = canvas.toDataURL();
            const link = document.createElement("a");
            link.href = image; //url 적구
            link.download = "image/png"; //download하고 싶은 이미지 경로 적고 
            console.log(link);
            link.click();
        })
    }
}

function handleCM(e){
    //우클릭 눌렀는데 막혔네, 기본 동작을 막음
    e.preventDefault();
}

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM); // 마우스 우클릭
}
setColor();
setLineWidth();
setMode();
save();