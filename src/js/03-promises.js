import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const firstDelay = document.querySelector('input[name="delay"]');
const stepDelay = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');

// Function to create a promise with a random fulfillment or rejection
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

// Function to handle form submission
function handleSubmit(event) {
  event.preventDefault();

  // Get form input values
  const userDelay = parseInt(firstDelay.value);
  const userStep = parseInt(stepDelay.value);
  const userAmount = parseInt(amount.value);

  // Create an empty array to hold the promises
  const promises = [];

  // Create a promise for the initial trade with userDelay
  const initialPromise = createPromise(1, userDelay);

  initialPromise
    .then(({ position, delay }) => {
      Notify.success(`Fulfilled initial promise ${position} in ${delay}ms`);
      console.log(`✅ Fulfilled initial promise ${position} in ${delay}ms`);
      form.reset();
    })
    .catch(({ position, delay }) => {
      Notify.failure(`Rejected initial promise ${position} in ${delay}ms`);
      console.log(`❌ Rejected initial promise ${position} in ${delay}ms`);
      form.reset();
    });

  // Create promises based on the form inputs
  for (let i = 2; i <= userAmount; i += 1) {
    const position = i;
    const delay = userDelay + userStep * (i - 1); // Adjust delay for subsequent trades
    const promise = createPromise(position, delay);

    promise
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    promises.push(promise);
  }

  // Handle all promises when they settle using Promise.all
  Promise.all(promises)
    .then(() => {
      console.log("All promises have settled!");
    })
    .catch((error) => {
      console.error("Error in Promise.all:", error);
    });
}

// Add a submit event listener to the form
form.addEventListener("submit", handleSubmit);