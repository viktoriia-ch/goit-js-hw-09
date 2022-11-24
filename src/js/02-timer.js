import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  input: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('button[data-start]'),
  timer: document.querySelector('.timer'),
  field: document.querySelector('.field'),
  dataDays: document.querySelector('span[data-days]'),
  dataHour: document.querySelector('span[data-hours]'),
  dataMinutes: document.querySelector('span[data-minutes]'),
  dataSeconds: document.querySelector('span[data-seconds]'),
};
refs.btnStart.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < options.defaultDate.getTime()) {
      Notify.failure('Please choose a date in the future');
      return;
    }
    refs.btnStart.removeAttribute('disabled');
    // console.log(options.defaultDate.getTime());
    // console.log(selectedDates[0].getTime());
  },
};

const calendar = flatpickr('#datetime-picker', options);
const KEY_DELAY = 1000;
let isActive = false;

// ADD EVENT LISTENERS
refs.btnStart.addEventListener('click', onStartTimer);

// FUNCTIONS

function update({ days, hours, minutes, seconds }) {
  refs.dataDays.textContent = days;
  refs.dataHour.textContent = hours;
  refs.dataMinutes.textContent = minutes;
  refs.dataSeconds.textContent = seconds;
}

function onStartTimer() {
  const startDate = calendar.selectedDates[0].getTime();
  if (isActive) {
    return;
  }

  const idInterval = setInterval(() => {
    isActive = true;
    const currentTime = new Date().getTime();
    const deltaTime = startDate - currentTime;

    if (deltaTime < -1) {
      clearInterval(idInterval);
      isActive = false;
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    update({ days, hours, minutes, seconds });
    // stopTimer(deltaTime, idInterval);
  }, KEY_DELAY);
}

// function stopTimer(delta, id) {

// }

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
