import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const inputElement = document.querySelector("#datetime-picker");
const startButton = document.querySelector('[data-start]');
      
const currentDate = Date.now();
let targetDate = null;
let countdownInterval = null;

startButton.disabled = false;
inputElement.disabled = false;

const refs = {

    daysUI: document.querySelector('[data-days]'),
    hoursUI: document.querySelector('[data-hours]'),
    minutesUI: document.querySelector('[data-minutes]'),
    secondsUI: document.querySelector('[data-seconds]'),
}

function addLeadingZero(value) { 
    return String(value).padStart(2,"0");
}

function convertMs(ms) {
 
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

flatpickr(inputElement, {

    enableTime: true,
    time_24hr: true,
    defaultDate: Date.now(),
    minuteIncrement: 1,

    onClose(selectedDates) {
    
        const selectedDate = selectedDates[0];

        if (selectedDate > currentDate) {
         
            
            Notify.info(`Date is in the future`)
            startButton.disabled = false;
            targetDate = selectedDate;
            

        } else {
    
             Notify.warning(`Warning! The date is in the past`),
            startButton.disabled = true;
        }
    }
});

startButton.addEventListener("click", () => { 

    const timeRemaining = targetDate - Date.now();
     
    const countdown = convertMs(timeRemaining);
    console.log(countdown);
    
    countdownInterval = setInterval(() => { 

    const timeRemaining = targetDate - Date.now();
    const countdown = convertMs(timeRemaining);
        
        updateTimerUI(countdown);
        startButton.disabled = true;
        inputElement.disabled = true;

        if (timeRemaining <= 1000)  {
         
            clearInterval(countdownInterval);
          
    }
  }, 1000);

});

function updateTimerUI(countdown) {
    refs.daysUI.textContent = countdown.days;
    refs.hoursUI.textContent = countdown.hours;
    refs.minutesUI.textContent = countdown.minutes;
    refs.secondsUI.textContent = countdown.seconds;
}
