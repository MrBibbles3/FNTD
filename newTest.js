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
document.addEventListener('DOMContentLoaded', () => {
    const secretImage = document.querySelector('.image-wrapper.raglan');
    const allCheckableImages = document.querySelectorAll('.checkable');
    const canvas = document.getElementById('confettiCanvas');
    const clickSounds = [
        new Audio('sounds/I.mp3'),
        new Audio('sounds/ALWAYS.mp3'),
        new Audio('sounds/COME.mp3'),
        new Audio('sounds/BACK.mp3'),
        new Audio('sounds/YAY.mp3')
    ];

    let clickCount = 0;
    let clickTimer = null;
    let soundQueue = [];
    let isPlaying = false;
    let confettiTriggered = false; // Prevent multiple confetti triggers

    function playNextInQueue() {
        if (soundQueue.length === 0) {
            isPlaying = false;
            return;
        }

        const nextSound = soundQueue.shift();
        isPlaying = true;
        nextSound.currentTime = 0;
        nextSound.play();
        nextSound.onended = () => {
            playNextInQueue();
        };
    }

    // 🎯 Secret Image Click
    if (secretImage) {
        secretImage.addEventListener('click', (event) => {
            event.stopPropagation();

            const image = secretImage.querySelector('img');

            image.classList.remove('wobble');
            void image.offsetWidth;
            image.classList.add('wobble');

            if (clickCount < clickSounds.length) {
                const sound = clickSounds[clickCount];
                soundQueue.push(sound);

                if (!isPlaying) {
                    playNextInQueue();
                }
            }

            clickCount++;
            console.log(`Secret click count: ${clickCount}`);

            clearTimeout(clickTimer);
            clickTimer = setTimeout(() => {
                console.log('Click sequence timed out!');
                clickCount = 0;
                soundQueue = [];
                isPlaying = false;
            }, 10000);

            if (clickCount >= 5) {
                // 🎉 Trigger Confetti 🎉
                launchConfetti();
            }
        });
    }

    // ❌ Any OTHER image resets the sequence
    allCheckableImages.forEach(img => {
        const parentWrapper = img.closest('.image-wrapper');

        if (!parentWrapper.classList.contains('raglan')) {
            img.addEventListener('click', () => {
                if (clickCount > 0) {
                    console.log('Wrong image clicked! Sequence reset.');
                    clickCount = 0;
                    clearTimeout(clickTimer);
                    soundQueue = [];
                    isPlaying = false;
                    confettiTriggered = false; // Reset confetti trigger

                    parentWrapper.classList.add('wrong-click');
                    setTimeout(() => {
                        parentWrapper.classList.remove('wrong-click');
                    }, 500);
                }
            });
        }
    });

    // 🎉 Confetti Effect and Open Secret Page
    function launchConfetti() {
        if (!confettiTriggered) {
            confettiTriggered = true; // Prevent multiple triggers of confetti
            canvas.style.display = 'block'; // Show the canvas for confetti
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Launch Confetti
            confetti.create(canvas, {
                resize: true,
                useWorker: true
            })({
                particleCount: 200,
                spread: 160,
                origin: { y: 0.6 }
            });
            setTimeout(() => {
                window.open("ILoveSteveRaglanSoMuchIYKYK.html", "_blank"); 
            }, 2000);
            // Open secret page in a new tab
            

            // Hide canvas after confetti is done
            setTimeout(() => {
                canvas.style.display = 'none'; // Hide canvas again after confetti
            }, 3000); // Adjust time based on how long you want the confetti to show
        }
    }
});
