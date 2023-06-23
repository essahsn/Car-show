function openCarDetails(image, type, date, rentalType, rentalValue) {
    const windowFeatures = 'width=600,height=400';
    const detailsPageURL = `car_details.html?image=${image}&type=${type}&date=${date}&rentalType=${rentalType}&rentalValue=${rentalValue}`;
    window.open(detailsPageURL, '_blank', windowFeatures);
  }


     // Get URL parameters
const urlParams = new URLSearchParams(window.location.search);
const image = urlParams.get('image');
const type = urlParams.get('type');
const date = urlParams.get('date');
const rentalType = urlParams.get('rentalType');
const rentalValue = urlParams.get('rentalValue');

// Set Car Details
document.getElementById('carType').textContent = type;
document.getElementById('manufacturingDate').textContent = date;
document.getElementById('rentalType').textContent = rentalType;
document.getElementById('rentalValue').textContent = rentalValue;

var rentalValueInt = parseInt(rentalValue.replace(/,/g, ""));

// Show additional image (if available)
  const additionalImagesContainer = document.getElementById('additionalImages');
  const imgElement = document.createElement('img');
  imgElement.src = decodeURIComponent(image); // Decode the URL parameter value
  additionalImagesContainer.appendChild(imgElement);

      // Calculate rental value details
      // Replace "dailyRentalValue" with the daily rental value for the car
      const dailyRentalValue = rentalValueInt;
      const reconstructionFee = dailyRentalValue * 0.01;
      const tax = dailyRentalValue * 0.05;
  
      // Set rental value details
      document.getElementById('dailyRental').textContent = dailyRentalValue;
      document.getElementById('reconstructionFee').textContent = reconstructionFee + ' SYP';
      document.getElementById('tax').textContent = tax + ' SYP';
  
      // Function to show/hide the request form
      function toggleForm() {
        const form = document.getElementById('requestForm');
        form.style.display = document.getElementById('proceedCheckbox').checked ? 'block' : 'none';
      }
  
  // Function to submit the request form
  function submitRequest(event) {
    event.preventDefault();
  
    // Validate the form inputs
    if (!validateInputs()) {
      return;
    }
  
    // Get the rental value and duration
    const duration = parseInt(document.getElementById('duration').value);
  
    // Calculate the final rental value
    const finalRentalValue = dailyRentalValue * duration;
  
    alert('Final Rental Value: ' + finalRentalValue + ' SYP');
  }
  
      // Function to generate random Captcha code
      function generateCaptcha() {
        const captcha = Math.random().toString(36).substr(2, 5).toUpperCase();
        document.getElementById('captchaCode').textContent = captcha;
      }
  
      // Function to cancel and return to the main page
      function cancel() {
        window.location.href = 'cars.html';
      }
  
      // Function to validate the request form inputs
      function validateInputs() {
        const fullName = document.getElementById('fullName').value;
        const nationalID = document.getElementById('nationalID').value;
        const dateOfBirth = document.getElementById('dateOfBirth').value;
        const mobileNumber = document.getElementById('mobileNumber').value;
        const email = document.getElementById('email').value;
        const duration = document.getElementById('duration').value;
        const captchaInput = document.getElementById('captchaInput').value;
        const captchaCode = document.getElementById('captchaCode').textContent;
  
        // Validate Full Name (Arabic alphabetical characters only)
        const arabicRegex = /^[\u0600-\u06FF\s]+$/;
        if (!arabicRegex.test(fullName)) {
          alert('Please enter a valid full name (Arabic alphabetical characters only).');
          return false;
        }
  
        // Validate National ID (11 characters - first two represent the province)
        const nationalIDRegex = /^\d{2}\d{2}\d{2}\d{2}\d{2}\d{1}$/;
        if (!nationalIDRegex.test(nationalID)) {
          alert('Please enter a valid National ID (e.g., 08-07-06-05-04-03-02-01).');
          return false;
        }
  
        // Validate Date of Birth (format: YYYY-MM-DD)
        const dateOfBirthRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateOfBirthRegex.test(dateOfBirth)) {
          alert('Please enter a valid date of birth (format: YYYY-MM-DD).');
          return false;
        }
  
        // Validate Mobile Number (matching Syriatel and MTN network numbers)
        const mobileNumberRegex = /^((\+?[9,6,3]{3}?[-. ]?[0-9]{9})|(\+?[0-9]{0,3}?[-. ]?[0-9]{7}))$/;
        if (!mobileNumberRegex.test(mobileNumber)) {
          alert('Please enter a valid Syrian mobile number.');
          return false;
        }
  
        // Validate Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          alert('Please enter a valid email address.');
          return false;
        }
  
        // Validate Duration (should be a positive integer)
        if (isNaN(duration) || duration <= 0 || !Number.isInteger(parseFloat(duration))) {
          alert('Please enter a valid duration (a positive integer).');
          return false;
        }
  
        // Validate Captcha
        if (captchaInput.toUpperCase() !== captchaCode) {
          alert('Invalid Captcha code. Please try again.');
          return false;
        }
  
        return true;
      }
  
      // Generate Captcha code on page load
      window.addEventListener('load', generateCaptcha);