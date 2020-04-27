const board = document.querySelector(".board");

drawBlocks();

const orderEmpty = document.querySelectorAll(".order");
const stores = document.querySelectorAll(".storedOrder");
const upArrow = document.querySelectorAll(".orderSub");

const boardContainer = document.querySelector(".container")
const blocks = document.querySelectorAll(".block")
const storeAnim = document.querySelector(".storeContainer")
const canvasAnim = document.querySelector("#myCanvas")

let isMouseDown = false;
let offset = [0, 0];
let draggedElement = [];
let targetOver;
let orders;

// Arrow listeners
for(arrow of upArrow){
    arrow.addEventListener("mousedown", dragStart);
    arrow.addEventListener("touchstart", dragStart);
}

document.addEventListener("mousemove", dragProcess);
document.addEventListener("touchmove", dragProcess);

document.addEventListener("mouseup", dragEnd);
document.addEventListener("touchend", dragEnd);

document.querySelector("#play").addEventListener("click", function(){
    orders = "";
    for (empty of orderEmpty) {
        if (empty.children.length) {
            orders += empty.children[0].dataset.command;
        }
    }
    order = orders;

    boardContainer.classList.add("move");
    storeAnim.classList.add("move");
    canvasAnim.classList.add("move");
    for (block of blocks){
        block.classList.add("move");
    }

    setup()

    drawInt = setInterval(draw, 1000/fps);
})

document.querySelector("#reset").addEventListener("click", function(){
    boardContainer.classList.remove("move");
    storeAnim.classList.remove("move");
    canvasAnim.classList.remove("move");
    for (block of blocks){
        block.classList.remove("move");
    }
})

function drawBlocks() {
  for(var i = 0; i < 17; i++){
    board.innerHTML += "<div class='block'><div class='order'></div><div class='number'></div></div>";
  }
}

function dragStart(ev) {
    ev.preventDefault();
    try {
        ev = ev.targetTouches[0];
    } catch {} finally {
        isMouseDown = true;
        offset = [this.offsetLeft - ev.clientX, this.offsetTop - ev.clientY];
        draggedElement.push(this);
        // console.log(draggedElement);
        draggedElement[0].style.pointerEvents = "none";
    }
}

function dragProcess(ev){
    ev.preventDefault();
    try {
        ev = ev.targetTouches[0];
    } catch {} finally {
        if (isMouseDown) {
            // console.log('event triggered');
            draggedElement[0].style.left = ev.clientX + offset[0] + 'px';
            draggedElement[0].style.top = ev.clientY + offset[1] + 'px';
            draggedElement[0].style.right = - parseInt(draggedElement[0].style.left) + 'px';
            draggedElement[0].style.bottom = - parseInt(draggedElement[0].style.top) + 'px';

            for (empty of orderEmpty) {
                emptyRect = empty.getBoundingClientRect();
                if(ev.clientX > emptyRect.left & ev.clientX < emptyRect.right & ev.clientY > emptyRect.top & ev.clientY < emptyRect.bottom){
                    if (empty.children.length === 0){
                        empty.classList.add("hovered");
                        targetOver = empty;
                    }
                } else {
                    empty.classList.remove("hovered");
                }
            }

            for (store of stores) {
                storeRect = store.getBoundingClientRect();
                if(ev.clientX > storeRect.left & ev.clientX < storeRect.right & ev.clientY > storeRect.top & ev.clientY < storeRect.bottom){
                    if(store.dataset.store === draggedElement[0].dataset.command){
                        store.classList.add("hovered");
                        targetOver = store;
                    }
                } else {
                    store.classList.remove("hovered");
                }
            }
        }
    }
}

function dragEnd(ev){
    isMouseDown = false;
    // console.log("Mouse Up");
    if(draggedElement[0]){
        if(targetOver){
            targetOver.append(draggedElement[0]);
            targetOver.classList.remove("hovered");
            targetOver = undefined;
        }
        draggedElement[0].style.left = 0 + 'px';
        draggedElement[0].style.top = 0 + 'px';
        draggedElement[0].style.right = - parseInt(draggedElement[0].style.left) + 'px';
        draggedElement[0].style.bottom = - parseInt(draggedElement[0].style.top) + 'px';
        
        draggedElement[0].style.pointerEvents = "auto";
        draggedElement.pop();
    }

    // console.log(draggedElement);
}