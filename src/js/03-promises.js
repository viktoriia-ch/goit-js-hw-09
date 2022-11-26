import { Notify } from 'notiflix';

const form = document.querySelector('.form');
let position = 1;

form.addEventListener('submit', onSubmitForm);

// FUNCTIONS
function onSubmitForm(evt) {
  evt.preventDefault();

  const inputDelay = evt.target.delay.value;
  const inputStep = evt.target.step.value;
  const inputAmount = evt.target.amount.value;

  setTimeout(() => {
    createPromise(position, inputDelay).then(onSuccess).catch(onError);
    onSetInterval(inputDelay, inputStep, inputAmount);
  }, inputDelay);

  position = 1;
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}

function onSetInterval(inputDelay, inputStep, inputAmount) {
  let delay = Number(inputDelay);

  const idInterval = setInterval(() => {
    delay += Number(inputStep);
    position += 1;

    if (position > inputAmount) {
      clearInterval(idInterval);
      return;
    }

    createPromise(position, delay).then(onSuccess).catch(onError);
  }, inputStep);
}

function onSuccess({ position, delay }) {
  // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
}

function onError({ position, delay }) {
  // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  Notify.failure(`Rejected promise ${position} in ${delay}ms`);
}
