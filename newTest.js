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

