// Define the set of images for the graphical password
var images = [
    'C:/Users/user/Desktop/smartcity/jupiter.jpg',
    'C:/Users/user/Desktop/smartcity/mars.jpg',
    'C:/Users/user/Desktop/smartcity/neptune.jpg',
    'C:/Users/user/Desktop/smartcity/pluto.jpg',
    'C:/Users/user/Desktop/smartcity/saturn.jpg',
    'C:/Users/user/Desktop/smartcity/uranus.jpg',
  ];
  
  // Define the maximum number of selections for the graphical password
  maxSelections = 3;
  
  // Generate the image HTML for the password selection
  function generatePasswordHTML(containerId) {
    var passwordContainer = document.getElementById(containerId);
    var passwordHTML = '';
    for (var i = 0; i < images.length; i++) {
      passwordHTML += '<div class="password-image" style="background-image: url(' + images[i] + ');" data-index="' + i + '"></div>';
    }
    passwordContainer.innerHTML = passwordHTML;
  
    // Add click event listeners to the password images
    var passwordImages = document.querySelectorAll('#' + containerId + ' .password-image');
    for (var j = 0; j < passwordImages.length; j++) {
      passwordImages[j].addEventListener('click', function() {
        if (this.classList.contains('selected')) {
          this.classList.remove('selected');
        } else if (document.querySelectorAll('#' + containerId + ' .password-image.selected').length < maxSelections) {
          this.classList.add('selected');
        }
      });
    }
  }
  
  // Generate the password HTML for sign up and sign in
  generatePasswordHTML('signup-password-container');
  generatePasswordHTML('signin-password-container');
  
  // Handle the sign up form submission
  document.getElementById('signup-form').addEventListener('submit', function(e) {
    e.preventDefault();
    signupPassword = [];
    var selectedImages = document.querySelectorAll('#signup-password-container .password-image.selected');
    for (var i = 0; i < selectedImages.length; i++) {
      signupPassword.push(parseInt(selectedImages[i].getAttribute('data-index')));
    }
    alert('Sign up successful. Your password is: ' + signupPassword.join(', '));
    document.getElementById('signup-form').reset();
  });
  
  // Handle the sign in form submission
  document.getElementById('signin-form').addEventListener('submit', function(e) {
    e.preventDefault();
    signinPassword = [];
    var selectedImages = document.querySelectorAll('#signin-password-container .password-image.selected');
    for (var i = 0; i < selectedImages.length; i++) {
      signinPassword.push(parseInt(selectedImages[i].getAttribute('data-index')));
    }
    if (JSON.stringify(signupPassword) === JSON.stringify(signinPassword)) {
      alert('Sign in successful.');
    } else {
      alert('Sign in failed. Please try again.');
    }
    document.getElementById('signin-form').reset();
  });