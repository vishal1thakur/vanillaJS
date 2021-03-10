'use strict';

// Create a random number. Assign it to a variable
let secretNumber = Math.trunc(Math.random() * 20) + 1;

// Create a variable to store the score that keeps updating - A State Variable
let score = 20;

// Create a variable to store the highscore that keeps updating
let highscore = 0;

// Implement game logic, add interactions to the click button
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  // If there is no input
  if (!guess) {
    document.querySelector('.message').textContent = "⛔ No number!";
  } // If guess is correct
  else if (guess === secretNumber) {
    document.querySelector('.message').textContent = "🎉 Correct number!";
    // Display the correct number instead of ?
    document.querySelector('.number').textContent = secretNumber;
    // Change background to green for winning
    document.querySelector('body').style.backgroundColor = '#60b347';
    // Increase widht of the winning number
    document.querySelector('.number').style.width = '30rem';
    // update highscore
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  } // If guess is incorrect
  else if (guess !== secretNumber) {
    if (score > 1) {
      // Display messsage for high and low guesses
      document.querySelector('.message').textContent = guess > secretNumber ? "📈 Too High!" : "📉 Too Low!"
      // Reduce 1 point from score
      score--;
      // Display the new score
      document.querySelector('.score').textContent = score;
    } // If all all tries are used, score = 0
      else {
      document.querySelector('.message').textContent = "😭 You lost the game!";
      // Set score to 0 because if score is > 0, it takes two clicks
      document.querySelector('.score').textContent = 0;
      }
    }
});

// Implement game reset, add interaction to the again button
document.querySelector('.again').addEventListener('click', function () {
  // reset the secret number
  document.querySelector('.number').textContent = '?';
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  // reset score
  score = 20;
  document.querySelector('.score').textContent = score;
  // reset message
  document.querySelector('.message').textContent = 'Start guessing...';
  // reset background
  document.querySelector('body').style.backgroundColor = '#222';
  // reset width
  document.querySelector('.number').style.width = '15rem';
  // reset guess
  document.querySelector('.guess').value = '';
})

// // If the input is greater than the secret number
//   else if (guess > secretNumber) {
//     // Execute only if the score is more than 1
//     if (score > 1) {
//       document.querySelector('.message').textContent = "📈 Too High!";
//       // Reduce 1 point from score
//       score--;
//       // Display the new score
//       document.querySelector('.score').textContent = score;
//     } // If all all tries are used, score = 0
//     else {
//       document.querySelector('.message').textContent = "😭 You lost the game!";
//       // Set score to 0 because if score is > 0, it takes two clicks
//       document.querySelector('.score').textContent = 0;
//     } 
    
//   } // If the input is lower than the secret number
//     else if (guess < secretNumber) {
//     // Execute only if the score is more than 1
//     if (score > 1) {
//       document.querySelector('.message').textContent = "📉 Too Low!";
//       // Reduce 1 point from score
//       score--;
//       // Display the new score
//       document.querySelector('.score').textContent = score;
//     } // If all all tries are used, score = 0
//     else {
//       document.querySelector('.message').textContent = "😭 You lost the game!";
//       // Set score to 0 because if score is > 0, it takes two clicks
//       document.querySelector('.score').textContent = 0;
//     } 
//   }


