// code to change flowers
const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d");
context.imageSmoothingEnabled =false;

const windowWidth = window.innerWidth;

let margins = 0;
let optimalWidthtotal = 0;
let widthMult = 0;



const DATE = new Date();
const FRAME_SIZE = 128;




let month = DATE.getMonth();
let day = DATE.getDate();
let timeOfMonth = 0;
let flowers = new Image();
flowers.src = "assets/img/flower sprite sheet.png"



getTimeOfMonth();
setFlowerSize();
function setFlowerSize()
{
    margins = windowWidth /5;
    optimalWidthtotal = (windowWidth - (margins *2)) /2;
    widthMult = optimalWidthtotal / FRAME_SIZE;



}

function getTimeOfMonth()
{
    if (day <= 7)
    {
        timeOfMonth = 0;
    }
    else if (day <= 14)
    {
        timeOfMonth = 1;
    }
    else if (day <= 21)
    {
        timeOfMonth = 2;
    }
    else 
    {
        timeOfMonth = 3;
    }
    console.log("time of month: " + timeOfMonth,"DAY: " + day);
}

flowers.onload = function() {
    pickFlower();
};

function pickFlower()
{

    context.drawImage(
        flowers,
        FRAME_SIZE*month,
        FRAME_SIZE*timeOfMonth,
        FRAME_SIZE,
        FRAME_SIZE,
        0,
        0,
        FRAME_SIZE*widthMult,
        FRAME_SIZE*widthMult
    );
    console.log("drew flower");
}

