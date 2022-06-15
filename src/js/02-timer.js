import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  dataInput: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

let dateDifference = null;
let timerCounter = null;
refs.startBtn.disabled = true;
DATA_DELAY = 1000;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let currentDate = new Date();

    dateDifference = selectedDates[0] - currentDate;

    if (selectedDates[0] < currentDate) {
      window.alert('Please choose a date in the future');
    } else {
      refs.startBtn.disabled = false;
    }
  },
};

flatpickr(refs.dataInput, options);

refs.startBtn.addEventListener('click', timerCount);

function timerCount() {
  timerCounter = setInterval(() => {
    let dateDifferenceConverted = convertMs(dateDifference);
    dateDifference -= 1000;

    dateTimerTextContent(dateDifferenceConverted);

    console.log(dateDifferenceConverted);
  }, DATA_DELAY);
}

function dateTimerTextContent({ days, hours, minutes, seconds }) {
  refs.days.textContect = addLeadingZero(days);
  refs.hours.textContect = addLeadingZero(hours);
  refs.minutes.textContect = addLeadingZero(minutes);
  refs.seconds.textContect = addLeadingZero(seconds);
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
