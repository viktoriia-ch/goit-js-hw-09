import Notiflix from 'notiflix';

let position = 0;

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onSubmitForm);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.5;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onSubmitForm(evt) {
  evt.preventDefault();

  const delay = evt.target.delay.value;
  const step = evt.target.step.value;
  const amount = evt.target.amount.value;

  const id = setInterval(() => {
    position += 1;
    if (position > amount) {
      clearInterval(id);
      return;
    }
    createPromise(position, delay).then(onSuccess).catch(onError);
  }, step);
}

function onSuccess({ position, delay }) {
  console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
}

function onError({ position, delay }) {
  console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
}
