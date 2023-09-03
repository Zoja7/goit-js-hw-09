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
  const userStep = parseInt(stepDelay.value);// Calculate delay for each promise
  const userAmount = parseInt(amount.value);

//Create an empthy array to hold on the promises
  const promises = [];

//Create promises based on the form inputs
  for (let i = 0; i < userAmount; i++) {
    const position = i + 1;
    const delay = userDelay + (i + 1) * userStep;
    const promise = createPromise(position, delay);

    promise
      .then(({ position, delay }) => {

        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        form.reset();   
      })
      .catch(({ position, delay }) => {

        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        form.reset();  
      })
    
    promises.push(promise);

  }

//I can something when all promises are settled using Promise.all
  // Promise.all(promises)
  //   .then(() => { 
  //     console.log("All promises have settled!");
  //   })
  //   .catch((error) => { 
  //     console.error("Error in Promise.all:", error);
  //   })
}

//Add a submit event listener to the form
form.addEventListener("submit", handleSubmit);
