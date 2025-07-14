// Carrega a API do YouTube
let tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let players = [];
let currentIndex = 0;
let videoContainers;

function onYouTubeIframeAPIReady() {
  videoContainers = document.querySelectorAll(".video-container");

  videoContainers.forEach((container, index) => {
    const iframe = container.querySelector("iframe");
    players[index] = new YT.Player(iframe, {
      events: {
        onReady: (event) => {
          if (index === 0) {
            event.target.playVideo(); // autoplay primeiro vídeo
          }
        },
        onStateChange: (event) => onPlayerStateChange(event, index),
      },
    });
  });
}

function onPlayerStateChange(event, index) {
  if (event.data === YT.PlayerState.ENDED) {
    goToNextVideo();
  }
}

function goToNextVideo() {
  // Parar vídeo atual
  players[currentIndex].stopVideo();
  videoContainers[currentIndex].classList.remove("active");

  // Atualizar índice
  currentIndex = (currentIndex + 1) % players.length;

  // Ativar próximo
  videoContainers[currentIndex].classList.add("active");
  players[currentIndex].playVideo();
}
