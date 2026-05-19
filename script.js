const introScreen = document.querySelector("#introScreen");
const loveScreen = document.querySelector("#loveScreen");
const lolScreen = document.querySelector("#lolScreen");
const envelope = document.querySelector("#openEnvelope");
const cards = [...document.querySelectorAll(".locked-card")];
const openedCount = document.querySelector("#openedCount");
const totalCount = document.querySelector("#totalCount");
const loveWord = document.querySelector("#loveWord");
const playButton = document.querySelector("#playButton");
const profileButton = document.querySelector("#profileButton");
const profileFrame = document.querySelector("#profileFrame");
const profileImage = document.querySelector("#profileImage");
const modal = document.querySelector("#imageModal");
const modalClose = document.querySelector("#modalClose");
const emojiLayer = document.querySelector("#emojiLayer");
const floatingHearts = document.querySelector("#floatingHearts");

const burstEmojis = ["❤", "💕", "💗", "💖", "✨", "🌸"];
const mouseEmojis = ["♡", "✦", "✨", "💗"];
let openedCards = 0;
let heartsStarted = false;
let lastMouseParticle = 0;

totalCount.textContent = cards.length;

envelope.addEventListener("click", () => {
  envelope.classList.add("is-open");
  setTimeout(() => {
    introScreen.classList.add("is-leaving");
    loveScreen.classList.add("is-active");
    loveScreen.setAttribute("aria-hidden", "false");
    startFloatingHearts();
  }, 620);

  setTimeout(() => {
    introScreen.style.display = "none";
  }, 1700);
});

cards.forEach((card) => {
  card.addEventListener("click", () => {
    if (card.classList.contains("is-open")) return;

    card.classList.add("is-open");
    openedCards = cards.filter((item) => item.classList.contains("is-open")).length;
    openedCount.textContent = openedCards;
    createBurst(card);

    if (openedCards >= cards.length) {
      setTimeout(() => {
        loveWord.classList.add("is-visible");
        createBurst(loveWord, 16);
      }, 320);

      setTimeout(() => {
        playButton.classList.add("is-visible");
        playButton.style.opacity = "1";
        playButton.style.pointerEvents = "auto";
      }, 1050);
    }
  });
});

playButton.addEventListener("click", () => {
  loveScreen.classList.remove("is-active");
  loveScreen.setAttribute("aria-hidden", "true");
  lolScreen.classList.add("is-active");
  lolScreen.setAttribute("aria-hidden", "false");
  createBurst(playButton, 22);
});

profileButton.addEventListener("click", revealProfile);
profileImage.addEventListener("click", openProfile);
modalClose.addEventListener("click", closeProfile);
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeProfile();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeProfile();
});

document.addEventListener("pointermove", (event) => {
  document.documentElement.style.setProperty("--mouse-x", `${event.clientX}px`);
  document.documentElement.style.setProperty("--mouse-y", `${event.clientY}px`);

  const now = Date.now();
  if (now - lastMouseParticle < 95) return;
  lastMouseParticle = now;
  createMouseParticle(event.clientX, event.clientY);
});

profileImage.addEventListener("error", () => {
  profileImage.alt = "Falta agregar perfilLol.png en esta carpeta";
  profileImage.style.background =
    "linear-gradient(135deg, rgba(255,255,255,.72), rgba(255,216,231,.9))";
});

function openProfile() {
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  createBurst(profileImage, 34);
}

function revealProfile() {
  profileFrame.classList.add("is-visible");
  profileFrame.setAttribute("aria-hidden", "false");
  profileButton.textContent = "miralo amor";
  profileButton.disabled = true;
  createBurst(profileButton, 22);
}

function closeProfile() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
}

function createBurst(source, amount = 18) {
  const rect = source.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  for (let i = 0; i < amount; i += 1) {
    const emoji = document.createElement("span");
    emoji.className = "burst-emoji";
    emoji.textContent = burstEmojis[Math.floor(Math.random() * burstEmojis.length)];
    emoji.style.setProperty("--x", `${centerX}px`);
    emoji.style.setProperty("--y", `${centerY}px`);
    emoji.style.setProperty("--dx", `${random(-190, 190)}px`);
    emoji.style.setProperty("--dy", `${random(-180, 120)}px`);
    emoji.style.setProperty("--rot", `${random(-90, 90)}deg`);
    emojiLayer.appendChild(emoji);
    emoji.addEventListener("animationend", () => emoji.remove());
  }
}

function startFloatingHearts() {
  if (heartsStarted) return;
  heartsStarted = true;

  setInterval(() => {
    if (floatingHearts.childElementCount > 18) return;

    const floating = document.createElement("span");
    const isSparkle = Math.random() > .55;
    floating.className = isSparkle ? "float-sparkle" : "float-heart";
    floating.textContent = isSparkle ? ["✨", "✦", "💫"][random(0, 2)] : burstEmojis[Math.floor(Math.random() * 4)];
    floating.style.left = `${random(4, 96)}vw`;
    floating.style.fontSize = `${random(14, 32)}px`;
    floating.style.animationDuration = `${random(7000, 12000)}ms`;
    floating.style.setProperty("--drift", `${random(-80, 80)}px`);
    floatingHearts.appendChild(floating);
    floating.addEventListener("animationend", () => floating.remove());
  }, 900);
}

function createMouseParticle(x, y) {
  const particle = document.createElement("span");
  particle.className = "mouse-particle";
  particle.textContent = mouseEmojis[random(0, mouseEmojis.length - 1)];
  particle.style.setProperty("--x", `${x}px`);
  particle.style.setProperty("--y", `${y}px`);
  particle.style.setProperty("--dx", `${random(-28, 28)}px`);
  particle.style.setProperty("--dy", `${random(-44, -16)}px`);
  particle.style.setProperty("--rot", `${random(-24, 24)}deg`);
  emojiLayer.appendChild(particle);
  particle.addEventListener("animationend", () => particle.remove());
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
