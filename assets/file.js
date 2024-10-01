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

let cheatEnabled = false;

let month = DATE.getMonth();
let day = DATE.getDate();
let timeOfMonth = 0;
let flowers = new Image();

const FLOWER_TEXT = document.getElementsByClassName("flower-Description")

let userMonth = DATE.getMonth(); // month for while user is navigating
let userTimeOfMonth = DATE.getDate();
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

    pickFlower(month,timeOfMonth);

}

function previousMonth()
{
    userMonth--;
    if(userMonth < 0)
    {
        userMonth = 11;
    }
    if(userMonth > month)
    {
        userTimeOfMonth = 0;
    }
    else userTimeOfMonth=4;
    
    pickFlower(userMonth,userTimeOfMonth);

}

function futureMonth()
{
    userMonth++;
    if(userMonth > 11)
    {
        userMonth = 0;
    }
    if(userMonth < month)
    {
        userTimeOfMonth = 4;
    }
    else userTimeOfMonth = 0;
    pickFlower(userMonth,userTimeOfMonth)
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
    pickFlower(month,timeOfMonth);
};


function pickFlower(m,d)
{   
    if (userMonth==month)
    {
        d = timeOfMonth;
    }
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
    context.drawImage(
        flowers,
        FRAME_SIZEX*m,
        FRAME_SIZE*d,
        FRAME_SIZEX,
        FRAME_SIZE,
        0,
        0,
        FRAME_SIZEX*widthMult,
        FRAME_SIZE*widthMult
    );
    checkDate();
    pickFlowerText();
    console.log("drew flower");
}

function checkDate(){
    if (userMonth!=month && !cheatEnabled)
    {
        context.fillStyle = "rgba(54, 54, 54, 0.5)"; // Corrected case
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
}

document.getElementById("cheatForm").addEventListener("submit", cheatDateIn);

function cheatDateIn(event){

    event.preventDefault(); // Prevent the form from submitting normally

    // Get values from input fields
    const d = parseFloat(document.getElementById("d").value);
    const m = parseFloat(document.getElementById("m").value);

    month = m;
    timeOfMonth = d;
    pickFlower(month,timeOfMonth);
}

function pickFlowerText(){
    if (userMonth < month)
        {
            FLOWER_TEXT[13].style.display = "block";
            FLOWER_TEXT[12].style.display = "none";
            FLOWER_TEXT[month].style.display = "none";
        }
    else if (userMonth > month)
        {
            FLOWER_TEXT[13].style.display = "none";
            FLOWER_TEXT[month].style.display = "none";
            FLOWER_TEXT[12].style.display = "block";
        }
    else
    {
        FLOWER_TEXT[13].style.display = "none";
        FLOWER_TEXT[12].style.display = "none";
        FLOWER_TEXT[month].style.display = "block";
    }
}

function revealCheats()
{
    if (cheatEnabled == true)
    {
        document.getElementById("cheatForm").style.display = "none";  
        cheatEnabled = false;
        checkDate();
    }
    else
    {
        document.getElementById("cheatForm").style.display = "block";  
        cheatEnabled = true;
    }
}