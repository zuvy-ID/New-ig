const musicScreen = document.getElementById("musicScreen");
const startScreen = document.getElementById("startScreen");
const videoScreen = document.getElementById("videoScreen");

const music = document.getElementById("music");
const video = document.getElementById("mainVideo");

const playMusic = document.getElementById("playMusic");
const playIcon = document.getElementById("playIcon");
const playText = document.getElementById("playText");
const musicTime = document.getElementById("musicTime");

const startVideo = document.getElementById("startVideo");
const backMusic = document.getElementById("backMusic");
const pauseVideo = document.getElementById("pauseVideo");
const disc = document.querySelector(".disc");

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "00:00";
  const min = Math.floor(seconds / 60).toString().padStart(2, "0");
  const sec = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}

playMusic.addEventListener("click", async () => {
  try {
    await music.play();
    disc.classList.add("playing");
    playIcon.textContent = "Ⅱ";
    playText.textContent = "MUSIC PLAYING";

    setTimeout(() => {
      musicScreen.classList.add("fade-out");

      setTimeout(() => {
        musicScreen.classList.add("hidden");
        musicScreen.classList.remove("fade-out");
        startScreen.classList.remove("hidden");
      }, 700);
    }, 450);
  } catch (error) {
    alert("File musik belum ditemukan. Masukkan music.mp3 ke folder assets/music/");
  }
});

music.addEventListener("timeupdate", () => {
  musicTime.textContent = formatTime(music.currentTime);
});

music.addEventListener("loadedmetadata", () => {
  musicTime.textContent = "00:00";
});

startVideo.addEventListener("click", async () => {
  startScreen.classList.add("fade-out");

  setTimeout(async () => {
    startScreen.classList.add("hidden");
    videoScreen.classList.remove("hidden");

    try {
      await video.play();
    } catch (error) {
      console.log("Video belum bisa autoplay:", error);
    }
  }, 700);
});

backMusic.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  musicScreen.classList.remove("hidden");
});

pauseVideo.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    pauseVideo.textContent = "Ⅱ";
  } else {
    video.pause();
    pauseVideo.textContent = "▶";
  }
});

video.addEventListener("ended", () => {
  pauseVideo.textContent = "↻";
});

pauseVideo.addEventListener("click", () => {
  if (video.ended) {
    video.currentTime = 0;
    video.play();
    pauseVideo.textContent = "Ⅱ";
  }
});
