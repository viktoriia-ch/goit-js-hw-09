const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
};

const KEY_DELAY = 1000;
let intervalId = 0;
setAttributeOnBtnStop();

// ADD EVENT LISTENERS
refs.btnStart.addEventListener('click', startChangingColors);
refs.btnStop.addEventListener('click', stopChangingColors);

// FUNCTIONS
function startChangingColors() {
  refs.btnStop.removeAttribute('disabled');
  refs.btnStart.setAttribute('disabled', true);

  setColorOnBody();
  intervalId = setInterval(() => {
    setColorOnBody();
  }, KEY_DELAY);
}

function stopChangingColors() {
  refs.btnStart.removeAttribute('disabled');
  setAttributeOnBtnStop();

  clearInterval(intervalId);
}

function setAttributeOnBtnStop() {
  refs.btnStop.setAttribute('disabled', true);
}

function setColorOnBody() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
