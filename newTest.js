// Initialize Firebase (compat)
firebase.initializeApp({
  apiKey: "AIzaSyDAvpu7L-TS3q2AQioixMpBRuRYWo4tU38",
  authDomain: "fntd-checklist.firebaseapp.com",
  projectId: "fntd-checklist",
  storageBucket: "fntd-checklist.firebasestorage.app",
  messagingSenderId: "316986853631",
  appId: "1:316986853631:web:abe7fc2be5d9c6922524ca"
});

const auth = firebase.auth();
const db = firebase.firestore();

const images = document.querySelectorAll('.checkable');
const checkAllButton = document.getElementById('checkAllButton');
const checkAllButtonMobile = document.getElementById('checkAllButtonMobile');
const resetButton = document.getElementById('resetButton');
const aboutToggle = document.getElementById('about-toggle');
const aboutContent = document.getElementById('about-content');

const signInBtn = document.getElementById('signInBtn'); // Create in your HTML
const signOutBtn = document.getElementById('signOutBtn'); // Create in your HTML
const userStatus = document.getElementById('userStatus'); // Element to show user email/status

let currentUser = null;

// --- Authentication ---

signInBtn.addEventListener('click', () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .catch(error => {
      console.error('Sign-in error:', error);
      alert('Sign-in failed: ' + error.message);
    });
});

signOutBtn.addEventListener('click', () => {
  auth.signOut();
});

// Listen for auth state changes
auth.onAuthStateChanged(async (user) => {
  if (user) {
    currentUser = user.uid;
    userStatus.textContent = `Signed in as ${user.email}`;
    signInBtn.style.display = 'none';
    signOutBtn.style.display = 'inline-block';

    await loadAndApplyUserChecklist();
  } else {
    currentUser = null;
    userStatus.textContent = 'Not signed in';
    signInBtn.style.display = 'inline-block';
    signOutBtn.style.display = 'none';

    applyChecklistState(getLocalChecklistState()); // Just load from localStorage
  }
});

// --- Firestore checklist functions ---

async function saveChecklistToFirestore(data) {
  if (!currentUser) return;
  try {
    await db.collection('checklists').doc(currentUser).set(data);
    console.log('Checklist saved to Firestore.');
  } catch (error) {
    console.error('Error saving checklist:', error);
  }
}

async function loadChecklistFromFirestore() {
  if (!currentUser) return null;
  try {
    const doc = await db.collection('checklists').doc(currentUser).get();
    if (doc.exists) {
      console.log('Checklist loaded from Firestore.');
      return doc.data();
    }
  } catch (error) {
    console.error('Error loading checklist:', error);
  }
  return null;
}

// --- Checklist state helpers (same as before) ---

function getLocalChecklistState() {
  let state = {};
  images.forEach(img => {
    const id = img.dataset.id;
    const val = localStorage.getItem(`checked-${id}`);
    state[id] = (val === 'true');
  });
  return state;
}

function applyChecklistState(state) {
  images.forEach(img => {
    const id = img.dataset.id;
    const checked = !!state[id];
    if (checked) {
      img.classList.add('checked');
      img.closest('.image-wrapper').classList.add('checked');
      localStorage.setItem(`checked-${id}`, "true");
    } else {
      img.classList.remove('checked');
      img.closest('.image-wrapper').classList.remove('checked');
      localStorage.setItem(`checked-${id}`, "false");
    }
  });
}

// --- Load user checklist and merge with localStorage ---

async function loadAndApplyUserChecklist() {
  const firestoreState = await loadChecklistFromFirestore();
  const localState = getLocalChecklistState();

  // Merge Firestore state over localStorage (Firestore wins on conflicts)
  const merged = {...localState, ...firestoreState};
  applyChecklistState(merged);

  // Save merged state back to Firestore so localStorage and Firestore sync
  await saveChecklistToFirestore(merged);
}

// --- Initialize UI and listeners ---

function setupImageClickHandlers() {
  images.forEach(img => {
    const id = img.dataset.id;
    img.addEventListener('click', async () => {
      const isChecked = img.classList.toggle('checked');
      img.closest('.image-wrapper').classList.toggle('checked');
      localStorage.setItem(`checked-${id}`, isChecked ? 'true' : 'false');

      if (currentUser) {
        const updatedState = getLocalChecklistState();
        await saveChecklistToFirestore(updatedState);
      }
    });
  });
}

function setupButtons() {
  if (checkAllButton) {
    checkAllButton.addEventListener('click', async () => {
      images.forEach(img => {
        img.classList.add('checked');
        img.closest('.image-wrapper').classList.add('checked');
        localStorage.setItem(`checked-${img.dataset.id}`, "true");
      });
      if (currentUser) {
        await saveChecklistToFirestore(getLocalChecklistState());
      }
    });
  }

  if (checkAllButtonMobile) {
    checkAllButtonMobile.addEventListener('click', async () => {
      images.forEach(img => {
        img.classList.add('checked');
        img.closest('.image-wrapper').classList.add('checked');
        localStorage.setItem(`checked-${img.dataset.id}`, "true");
      });
      if (currentUser) {
        await saveChecklistToFirestore(getLocalChecklistState());
      }
    });
  }

  if (resetButton) {
    resetButton.addEventListener('click', async () => {
      images.forEach(img => {
        img.classList.remove('checked');
        img.closest('.image-wrapper').classList.remove('checked');
        localStorage.setItem(`checked-${img.dataset.id}`, "false");
      });
      if (currentUser) {
        await saveChecklistToFirestore(getLocalChecklistState());
      }
    });
  }
}

// --- Other UI code unchanged ---

if (aboutToggle && aboutContent) {
  aboutToggle.addEventListener("click", () => {
    aboutContent.classList.toggle('show');
  });
}

document.querySelectorAll('.nav-button[data-toggle]').forEach(button => {
  button.addEventListener('click', () => {
    const targetId = button.getAttribute('data-toggle');
    const section = document.getElementById(targetId);

    document.querySelectorAll('.nav-section').forEach(s => {
      if (s !== section) s.classList.remove('show');
    });

    section.classList.toggle('show');
  });
});

const backToTopBtn = document.getElementById("backToTopBtn");
if (backToTopBtn) {
  backToTopBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
}
window.onload = function() {
  const topMobile = document.getElementById("topMobile");
  if (topMobile) {
    topMobile.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

// Secret easter egg code should come here unchanged...

// --- Run setup ---

setupImageClickHandlers();
setupButtons();




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
                setTimeout(() => {
                window.open("ILoveSteveRaglanSoMuchIYKYK.html", "_self"); 
            }, 2000);
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
            
            // Open secret page in a new tab
            

            // Hide canvas after confetti is done
            setTimeout(() => {
                canvas.style.display = 'none'; // Hide canvas again after confetti
            }, 3000); // Adjust time based on how long you want the confetti to show
        }
    }
});
