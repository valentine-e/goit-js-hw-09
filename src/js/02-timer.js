import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  dataInput: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

// consts

let dateDifference = null;
let timerCounter = null;
refs.startBtn.disabled = true;
DATA_DELAY = 1000;

// options for flatpickr

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let currentDate = new Date();

    dateDifference = selectedDates[0] - currentDate;

    if (selectedDates[0] < currentDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      Notiflix.Notify.success('Great! Press "start" to start :)');
      refs.startBtn.disabled = false;
    }
  },
};

flatpickr(refs.dataInput, options);

// timercounter click

refs.startBtn.addEventListener('click', timerCount);

function timerCount() {
  timerCounter = setInterval(() => {
    let dateDifferenceConverted = convertMs(dateDifference);
    dateDifference = dateDifference - 1000;
    refs.dataInput.disabled = true;

    dateTimerTextContent(dateDifferenceConverted);
    refs.startBtn.disabled = true;

    console.log(dateDifferenceConverted);
  }, DATA_DELAY);
}

// convert units

function dateTimerTextContent({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// style
document.querySelector('.timer').style.display = 'flex';
document.querySelector('button').style.marginBottom = '30px';
document.querySelectorAll('.field').forEach(el => (el.style.fontSize = '30px'));
document
  .querySelectorAll('.field')
  .forEach(el => (el.style.marginRight = '15px'));
document.querySelectorAll('.field').forEach(el => (el.style.fontSize = '20px'));
document;

document.querySelectorAll('.label').forEach(el => (el.style.color = '#52A4FF'));
