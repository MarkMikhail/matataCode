const canvas = document.getElementById("myCanvas");
const cn = canvas.getContext("2d");

const center = [canvas.width/2, canvas.height/2];

var order = "";

var drawInt; // Interval variable
var i = 0; // Delay variable

const scale = canvas.width/8 - 10;
const fps = 25;
const orderSpeed = 2;

function setup(){
    // Styling and clearing the canvas
    cn.strokeStyle = 'orange';
    cn.lineWidth = 5;
    cn.lineCap = "round";
    cn.clearRect(0, 0, canvas.width, canvas.height);

    // Initialising position variables
    targetX = currX = center[0];
    targetR = currR = 0;
    targetY = currY = center[1];

    cn.beginPath();
    cn.moveTo(currX, currY);

    orderIndex = 0;
    isOrderDone = true;
    i = 0;
}

// Initialising position variables
var targetX = currX = center[0];
var targetY = currY = center[1];
var targetR = currR = 0;

var orderIndex = 0;
var isOrderDone = true;

var moveX, moveY, moveR;
var errorX, errorY, errorR;

function drawRobot(X, Y, theta){

    cn.clearRect(0, 0, canvas.width, canvas.height);

    var size = scale*0.4;
    var radius = Math.sqrt(Math.pow(size/2,2)*2);
    var triangle = new Path2D();
    triangle.moveTo(X+radius*Math.sin(theta),Y-radius*Math.cos(theta));
    triangle.lineTo(X+radius*Math.sin(theta+(2*Math.PI/3)),Y-radius*Math.cos(theta+(2*Math.PI/3)));
    triangle.lineTo(X+radius*Math.sin(theta+(4*Math.PI/3)),Y-radius*Math.cos(theta+(4*Math.PI/3)));

    var circle = new Path2D();
    circle.arc(X, Y, radius, 0, 2 * Math.PI);
    
    cn.fillStyle = 'white';
    cn.fill(circle);
    cn.stroke(circle);
    cn.fillStyle = 'orange';
    cn.fill(triangle);
}

function draw(){
  
//   If last order is done get new order from order array
    if (isOrderDone) {
        
    //   Set new target
    //   Set order to not done
    //   Set current order
        
        currOrder = order[orderIndex];
        
        switch (currOrder) {
            case "F":
                targetX += scale*Math.sin(currR);
                targetY -= scale*Math.cos(currR);
                break;
            case "B":
                targetX -= scale*Math.sin(currR);
                targetY += scale*Math.cos(currR);
                break;
            case "R":
                targetR += Math.PI/2;
                break;
            case "L":
                targetR -= Math.PI/2;
        }
        
        moveX = (targetX - currX)/(fps*orderSpeed);
        moveY = (targetY - currY)/(fps*orderSpeed);
        moveR = (targetR - currR)/(fps*orderSpeed);
        
        isOrderDone = false;
        
        console.log("Order Received");
    }
    
    errorX = Math.abs(targetX - currX);
    errorY = Math.abs(targetY - currY);
    errorR = Math.abs(targetR - currR);
    
    if(errorX < 1 && errorY < 1 && errorR < 0.01){
        
        i++;

        if(i > Math.round(fps/2)){
            isOrderDone = true;
            orderIndex += 1;
            console.log("Order Done");
            i = 0;
        }
        

        if(orderIndex === order.length){
            stop();
        }

    } else {
        cn.lineTo(currX, currY);
        drawRobot(currX, currY, currR);
        cn.stroke();

        currX += moveX;
        currY += moveY;
        currR += moveR;
    }
}

function stop(){
    clearInterval(drawInt);
}

// drawInt = setInterval(draw, 1000/fps);
