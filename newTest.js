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
  new Audio('/sounds/click1.mp3'),
  new Audio('/sounds/click2.mp3'),
  new Audio('/sounds/click3.mp3'),
  new Audio('/sounds/click4.mp3'),
  new Audio('/sounds/magic-chime.mp3') // on 5th click
];

// Target the wrapper with the classes mythic and raglan
const secretImage = document.querySelector('.image-wrapper.mythic.raglan');

if (secretImage) {
  secretImage.addEventListener('click', () => {
    // Play the sound based on the current click count
    if (clickCount < clickSounds.length) {
      const sound = clickSounds[clickCount];
      sound.currentTime = 0;
      sound.play();
    }

    // Wobble animation on the image
    const image = secretImage.querySelector('img');
    image.classList.remove('wobble');
    void image.offsetWidth; // Force reflow (so the animation works)
    image.classList.add('wobble');

    // Increment click count
    clickCount++;

    // Reset click count if user pauses for 10 seconds
    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => {
      clickCount = 0;
    }, 10000);

    // Trigger secret redirect on the 5th click
    if (clickCount >= 5) {
      window.location.href = "/secret-page.html"; // Change this to your secret page
    }
  });
}
