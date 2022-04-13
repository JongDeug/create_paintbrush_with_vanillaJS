const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");





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
    setColor();
    setLineWidth();

    // if mouse move, up, leave
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

// function onMouseDown(e){
//     painting = true;
// }

function onMouseLeave(e){
    stopPainting();
}


// set color
function setColor(){
    const jsColors = document.querySelectorAll("#jsColors .controls_color");
    jsColors.forEach(element => {
        element.addEventListener("click", function(event){
            ctx.strokeStyle = event.target.style.backgroundColor;
        });
    });
}

// set line width
function setLineWidth(){
    const jsRange = document.querySelector("#jsRange");
    ctx.lineWidth = jsRange.value;
}


if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}