const images = document.querySelectorAll('.checkable');
const checkAllButton = document.getElementById('checkAllButton');
const checkAllButtonMobile = document.getElementById('checkAllButtonMobile');
const resetButton = document.getElementById('resetButton');
const aboutToggle = document.getElementById('about-toggle');
const aboutContent = document.getElementById('about-content');

// Function to set the checked state
function setChecked(img, checked) {
  const id = img.dataset.id;
  if (checked) {
    img.classList.add('checked');
    img.closest('.image-wrapper').classList.add('checked');
    localStorage.setItem(`checked-${id}`, "true");
  } else {
    img.classList.remove('checked');
    img.closest('.image-wrapper').classList.remove('checked');
    localStorage.setItem(`checked-${id}`, "false");
  }
}

// Set up the initial state
images.forEach(img => {
  const id = img.dataset.id;
  if (localStorage.getItem(`checked-${id}`) === "true") {
    img.classList.add("checked");
    img.closest('.image-wrapper').classList.add("checked");
  }

  img.addEventListener("click", () => {
    const isChecked = img.classList.toggle("checked");
    img.closest('.image-wrapper').classList.toggle("checked");
    localStorage.setItem(`checked-${id}`, isChecked);
  });
});

// Check All button
if (checkAllButton) {
  checkAllButton.addEventListener("click", () => {
    images.forEach(img => {
      setChecked(img, true);
    });
  });
}

if (checkAllButtonMobile) {
  checkAllButtonMobile.addEventListener("click", () => {
    images.forEach(img => {
      setChecked(img, true);
    });
  });
}

// Reset button
if (resetButton) {
  resetButton.addEventListener("click", () => {
    images.forEach(img => {
      setChecked(img, false);
    });
  });
}

// About button
if (aboutToggle && aboutContent) {
  aboutToggle.addEventListener("click", () => {
    aboutContent.classList.toggle('show');
  });
}

document.querySelectorAll('.nav-button[data-toggle]').forEach(button => {
  button.addEventListener('click', () => {
    const targetId = button.getAttribute('data-toggle');
    const section = document.getElementById(targetId);

    // Hide all other sections
    document.querySelectorAll('.nav-section').forEach(s => {
      if (s !== section) s.classList.remove('show');
    });

    // Toggle the clicked one
    section.classList.toggle('show');
  });
});

// Get the button
let backToTopBtn = document.getElementById("backToTopBtn");

// Scroll to top when clicked
backToTopBtn.onclick = function() {
  window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to top
};

window.onload = function() {
  let topMobile = document.getElementById("topMobile");
  topMobile.onclick = function() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
};

//Secret additon
  let clickCount = 0;
  let clickTimer;

  // Preload 5 different sounds (adjust file names/paths as needed)
  const clickSounds = [
    new Audio('/sounds/I.mp3'),
    new Audio('/sounds/ALWAYS.mp3'),
    new Audio('/sounds/COME.mp3'),
    new Audio('/sounds/BACK.mp3'),
    new Audio('/sounds/YAY.mp3') // on 5th click
  ];

  const secretImage = document.querySelector('[data-id="237"]');

  if (secretImage) {
    secretImage.addEventListener('click', () => {
      // Play sound based on click count
      if (clickCount < clickSounds.length) {
        const sound = clickSounds[clickCount];
        sound.currentTime = 0;
        sound.play();
      }

      // Wobble animation
      secretImage.classList.remove('wobble');
      void secretImage.offsetWidth; // Force reflow
      secretImage.classList.add('wobble');

      // Count clicks
      clickCount++;

      // Reset timer after 10 seconds of no clicks
      clearTimeout(clickTimer);
      clickTimer = setTimeout(() => {
        clickCount = 0;
      }, 10000);

      // Trigger secret redirect on 5th click
      if (clickCount >= 5) {
        window.location.href = "/secret-page.html"; // Change this to your secret page
      }
    });
  }