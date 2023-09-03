import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

class CountdownTimer {
  constructor() {
    this.inputElement = document.querySelector("#datetime-picker");
    this.startButton = document.querySelector('[data-start]');
    this.currentDate = Date.now();
    this.targetDate = null;
    this.countdownInterval = null;
    this.refs = {
      daysUI: document.querySelector('[data-days]'),
      hoursUI: document.querySelector('[data-hours]'),
      minutesUI: document.querySelector('[data-minutes]'),
      secondsUI: document.querySelector('[data-seconds]'),
    };
    this.init();
  }

  addLeadingZero(value) {
    return String(value).padStart(2, "0");
  }

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = this.addLeadingZero(Math.floor(ms / day));
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
  }

  init() {
    flatpickr(this.inputElement, {
      enableTime: true,
      time_24hr: true,
      defaultDate: Date.now(),
      minuteIncrement: 1,
      onClose: (selectedDates) => this.onDatePickerClose(selectedDates),
    });

    this.startButton.addEventListener("click", () => {
      this.startCountdown();
    });
  }

  onDatePickerClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate <= this.currentDate) {
      Notify.warning(`Warning! The date: ${selectedDate} - is in the past`, () => {
        alert("Please choose a date in the future!!!");
      });
      this.startButton.disabled = true;
    } else {
      Notify.info(`Date is in the future ${selectedDate}`);
      this.startButton.disabled = false;
      this.targetDate = selectedDate;
    }
  }

  startCountdown() {
    const timeRemaining = this.targetDate - Date.now();
    const countdown = this.convertMs(timeRemaining);
    console.log(countdown);

    this.countdownInterval = setInterval(() => {
      const timeRemaining = this.targetDate - Date.now();
      const countdown = this.convertMs(timeRemaining);

      this.updateTimerUI(countdown);

      if (
        countdown.days === "00" &&
        countdown.hours === "00" &&
        countdown.minutes === "00" &&
        countdown.seconds === "00"
      ) {
        clearInterval(this.countdownInterval);
      }
    }, 1000);
  }

  updateTimerUI(countdown) {
    this.refs.daysUI.textContent = countdown.days;
    this.refs.hoursUI.textContent = countdown.hours;
    this.refs.minutesUI.textContent = countdown.minutes;
    this.refs.secondsUI.textContent = countdown.seconds;
  }
}

