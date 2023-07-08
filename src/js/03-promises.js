// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   if (shouldResolve) {
//     // Fulfill
//   } else {
//     // Reject
//   }
// }


import { Notify } from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    const value = { position, delay };

    setTimeout(() => {
      if (shouldResolve) {
        resolve(value);
      } else {
        reject(value);
      }
    }, delay);
  });
}

const formElement = document.querySelector('form.form');

const onSubmit = submitEvent => {
  const {
    delay: delayInputElement,
    step: stepInputElement,
    amount: amountInputElement,
  } = submitEvent.target.elements;

  setTimeout(() => {
    for (let i = 0; i < amountInputElement.value; i += 1) {
      createPromise(
        i + 1,
        Number(delayInputElement.value) + Number(stepInputElement.value) * i
      )
        .then(({ position, delay }) => {
          Notify.success(`&#9989; Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`&#10060; Rejected promise ${position} in ${delay}ms`);
        });
    }
  }, delayInputElement.value);

  submitEvent.preventDefault();
};

formElement.addEventListener('submit', onSubmit);