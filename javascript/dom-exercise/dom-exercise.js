/* ---------------------------------------------------------
   State
   --------------------------------------------------------- */
let homeScore = 0;
let guestScore = 0;

/* ---------------------------------------------------------
   DOM Selectors
   --------------------------------------------------------- */
const homeCount = document.getElementById("home-count");
const guestCount = document.getElementById("guest-count");
const homeBoard = document.getElementById("home-board");
const guestBoard = document.getElementById("guest-board");
const homeTitle = document.getElementById("home-title");
const guestTitle = document.getElementById("guest-title");

const historyList = document.getElementById("history-list");
const saveBtn = document.getElementById("save-btn");
const resetBtn = document.getElementById("reset-btn");
const teamForm = document.getElementById("team-form");
const homeNameInput = document.getElementById("home-name");
const guestNameInput = document.getElementById("guest-name");

/* ---------------------------------------------------------
   1. Attach event handlers with addEventListener
   (replaces inline onclick)
   --------------------------------------------------------- */
document.querySelectorAll(".add-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const team = btn.dataset.team;
    const points = Number(btn.dataset.points);

    if (team === "home") {
      homeScore += points;
      homeCount.textContent = homeScore;
    } else {
      guestScore += points;
      guestCount.textContent = guestScore;
    }

    updateLeaderHighlight(); // toggle class
  });
});

/* ---------------------------------------------------------
   2. TOGGLE CLASS — highlight the leading team
   --------------------------------------------------------- */
function updateLeaderHighlight() {
  // remove first
  homeBoard.classList.remove("is-leading");
  guestBoard.classList.remove("is-leading");

  if (homeScore > guestScore) {
    homeBoard.classList.add("is-leading");
  } else if (guestScore > homeScore) {
    guestBoard.classList.add("is-leading");
  }
}

/* ---------------------------------------------------------
   3. CREATE ELEMENT — save current score to history
   --------------------------------------------------------- */
saveBtn.addEventListener("click", () => {
  const li = document.createElement("li");
  li.className = "history-item";
  li.textContent = `${homeTitle.textContent} ${homeScore} — ${guestScore} ${guestTitle.textContent}`;

  // Remove button per item
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "✕";
  removeBtn.className = "remove-btn";
  removeBtn.addEventListener("click", () => li.remove());

  li.appendChild(removeBtn);
  historyList.appendChild(li);
});

/* ---------------------------------------------------------
   4. REMOVE ELEMENTS + reset state — New Game
   --------------------------------------------------------- */
resetBtn.addEventListener("click", () => {
  homeScore = 0;
  guestScore = 0;
  homeCount.textContent = "0";
  guestCount.textContent = "0";

  homeBoard.classList.remove("is-leading");
  guestBoard.classList.remove("is-leading");

  historyList.innerHTML = ""; // remove all children
});

/* ---------------------------------------------------------
   5. PREVENT DEFAULT — team name form
   --------------------------------------------------------- */
teamForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const homeName = homeNameInput.value.trim() || "HOME";
  const guestName = guestNameInput.value.trim() || "GUEST";

  homeTitle.textContent = homeName.toUpperCase();
  guestTitle.textContent = guestName.toUpperCase();
});