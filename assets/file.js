// code to change flowers
const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d");
context.imageSmoothingEnabled = false;

const windowWidth = window.innerWidth;

let flowerSection = document.getElementsByClassName("flex-element-70")
let margins = 0;
let optimalWidthtotal = 0;
let widthMult = 0;
const ASPECT_RATIO = 128 / 96;


const DATE = new Date();
const FRAME_SIZE = 128;
const FRAME_SIZEX = 96;



let month = DATE.getMonth();
let day = DATE.getDate();
let timeOfMonth = 0;
let flowers = new Image();
flowers.src = "assets/img/flower sprite sheet.png"

window.addEventListener("resize",setFlowerSize)

getTimeOfMonth();

setFlowerSize();
//set aspect ratio of flower content
function setFlowerSize()
{
    optimalWidthtotal = flowerSection[0].clientWidth;
    if (optimalWidthtotal > 800)
        {
            optimalWidthtotal = 800;
        }
    widthMult = optimalWidthtotal / FRAME_SIZEX;
    canvas.width = optimalWidthtotal;
    canvas.height = optimalWidthtotal * ASPECT_RATIO; // calclates the best height to view the content
    context.imageSmoothingEnabled = false;

    pickFlower();

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
        FRAME_SIZEX*month,
        FRAME_SIZE*timeOfMonth,
        FRAME_SIZEX,
        FRAME_SIZE,
        0,
        0,
        FRAME_SIZEX*widthMult,
        FRAME_SIZE*widthMult
    );
    console.log("drew flower");
}

