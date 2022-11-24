import Notiflix from 'notiflix';

let position = 0;
const refs = {
  form: document.querySelector('.form'),
};

// refs.form.addEventListener('submit', onSubmitForm);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve(Notiflix.Notify.success({ position, delay }));
      } else {
        reject(Notiflix.Notify.failure({ position, delay }));
      }
    }, delay);
  });
}

createPromise(2, 1500)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });

// function onSubmitForm(evt) {
//   evt.preventDefault();

//   const delay = evt.target.delay.value;
//   const step = evt.target.step.value;
//   const amount = evt.target.amount.value;

//   position += 1;

//   setTimeout(() => {
//     if (position > amount) {
//       return;
//     }
//     createPromise(position, delay)
//       .then(({ position, delay }) => {
//         console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//       })
//       .catch(({ position, delay }) => {
//         console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//       });
//   }, delay);
// }

// createPromise(2, 1500)
//
