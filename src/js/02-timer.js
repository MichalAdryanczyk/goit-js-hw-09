import flatpickr from 'flatpickr';
import { Notify } from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(str) {
  const desiredStringLength = 2;

  if (typeof str !== 'string') {
    str = str.toString();
  }

  if (str.length < desiredStringLength) {
    str = str.padStart(desiredStringLength, '0');
  }

  return str;
}

let intervalTimerId = 0;
let chosenDateMs = 0;

const startBtnElement = document.querySelector('button[data-start]');

const daysSpanElement = document.querySelector('span[data-days]');
const hoursSpanElement = document.querySelector('span[data-hours]');
const minutesSpanElement = document.querySelector('span[data-minutes]');
const secondsSpanElement = document.querySelector('span[data-seconds]');

const checkTime = () => {
  if (chosenDateMs) {
    const remainingTime = chosenDateMs - new Date().getTime();

    if (remainingTime > 0) {
      const { days, hours, minutes, seconds } = convertMs(remainingTime);

      daysSpanElement.textContent = addLeadingZero(days);
      hoursSpanElement.textContent = addLeadingZero(hours);
      minutesSpanElement.textContent = addLeadingZero(minutes);
      secondsSpanElement.textContent = addLeadingZero(seconds);
    } else {
      clearInterval(intervalTimerId);

      intervalTimerId = 0;
    }
  }
};

const onStartBtnClick = () => {
  intervalTimerId = setInterval(checkTime, 1000);
};

startBtnElement.setAttribute('disabled', '');

flatpickr('input#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    chosenDateMs = selectedDates[0].getTime();

    if (chosenDateMs <= new Date().getTime()) {
      Notify.failure('Please choose a date in the future');
    } else {
      startBtnElement.removeAttribute('disabled');
    }
  },
});

startBtnElement.addEventListener('click', onStartBtnClick);