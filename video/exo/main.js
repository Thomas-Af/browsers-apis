/* Progressive enhancement : Use custom controls if JS is correctly loaded */
const video = document.getElementById("video");

const controls = document.getElementById("controls");
video.removeAttribute("controls");
controls.style.visibility = "visible";

/* Video controls */
const play = document.getElementById("play");
const rewind = document.getElementById("rewind");
const mute = document.getElementById("mute");
const current = document.getElementById("current");
const duration = document.getElementById("duration");
const volume = document.getElementById("volume");

const noMotionPreference = window.matchMedia(
  "(prefers-reduced-motion: no-preference)"
);

play.onclick = function () {
  if (video.paused) {
    play.innerHTML = "Pause";
    video.play();
  } else {
    play.innerHTML = "Play";
    video.pause();
  }
};

mute.addEventListener("click", () => {
  if (video.muted) {
    video.muted = false;
    mute.innerHTML = "Mute";
  } else {
    video.muted = true;
    mute.innerHTML = "Unmute";
  }
});

volume.onchange = function () {
  video.volume = volume.value;
};

rewind.onclick = function () {
  video.currentTime = 0;
};

video.ontimeupdate = function () {
  duration.innerHTML = timeFormat(video.duration);
  current.innerHTML = timeFormat(video.currentTime);
};

function timeFormat(time) {
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60);

  if (sec < 10) {
    return `${min}:0${sec}`;
  } else {
    return `${min}:${sec}`;
  }
}

/* !!! Magic happens... !!! */

/* Play the video if it is in viewport, otherwise pause the video */
function playPauseVideo() {
  /* It is nicer to our users to have the video muted by default */
  video.muted = true;
  const playPromise = video.play();

  if (noMotionPreference.matches) {
    video.play();
  }

  if (playPromise) {
    playPromise.then((_) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.intersectionRatio !== 1 && !video.paused) {
              video.pause();
            } else if (video.paused) {
              video.play();
            }
          });
        },
        { threshold: 0.2 }
      );
      observer.observe(video);
    });
  }
}

playPauseVideo();
