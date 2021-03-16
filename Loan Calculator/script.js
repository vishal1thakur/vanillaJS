// A) ------------Event Handlers-----------------
// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function (e) {
  // Hide Results
  document.getElementById('results').style.display = 'none';

  // Show Loader
  document.getElementById('loading').style.display = 'block';

  // Show results after 2 seconds of laoding
  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

// B) -----------Call back function---------------

// 1) Calculate Results
function calculateResults() {
  console.log('Working');
  // Ui Variables
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
    // Show Results
    document.getElementById('results').style.display = 'block';
    // Hide Loader
    document.getElementById('loading').style.display = 'none';
  } else {
    // 1b) Show error
    showError('Please check your numbers');
  }
}

// 1b) Show Error function
function showError(error) {
  // Hide Results
  document.getElementById('results').style.display = 'none';

  // Hide Loader
  document.getElementById('loading').style.display = 'none';

  // Create a div
  const errorDiv = document.createElement('div');

  // Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // Add class
  errorDiv.className = 'alert alert-danger';

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  // 1c) Clear Error
  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

// 1c) Clear Error function
function clearError() {
  document.querySelector('.alert').remove();
}
