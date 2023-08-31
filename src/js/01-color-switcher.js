const bodyEl = document.body;
const startBtn = document.querySelector(`[data-start]`);
const stopBtn = document.querySelector(`[data-stop]`);
let colorId = null;

startBtn.addEventListener("click", startChangeBackground);
stopBtn.addEventListener("click", stopChangeBackground );

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};

function startChangeBackground() {

    startBtn.disabled = true;
    
    colorId = setInterval(() => {
           
        const randomColorId = getRandomHexColor();
        bodyEl.style.backgroundColor = randomColorId;
        console.log(`Interval with id ${colorId} has started!`);

        }, 1000) 
  
}

function stopChangeBackground() {

    startBtn.disabled = false;
    clearInterval(colorId);
    console.log(`Interval with id ${colorId} has stopped!!!`);
 }



