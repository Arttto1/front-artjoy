const checkVideo = document.getElementById("check-video");
let youtubeInput = document.getElementById("youtubeInput");
let videoUrl;
let player;
let hasError = false; // Variável para armazenar se houve erro

let alertMessage = document.getElementById("alertMessage");
const alertDisplay = document.getElementById("customAlert");

function alertBox(alertText) {
  alertMessage.textContent = alertText;
  alertDisplay.style.display = "flex";
}

// document.getElementById('showAlertBtn').addEventListener('click', function () {
//   alertBox("XD")
// });

document.getElementById("closeAlertBtn").addEventListener("click", function () {
  alertDisplay.style.display = "none";
});

// Captura o valor do input
youtubeInput.addEventListener("input", function () {
  videoUrl = youtubeInput.value; // Captura o valor atual do input
});

// Função para obter o ID do vídeo
function getEmbedUrl(videoUrl) {

  if (!videoUrl || typeof videoUrl !== "string") {
    console.error("URL vazia ou inválida");
    return null;
  }
  // Adiciona 'https://' se não estiver presente
  if (!videoUrl.startsWith("http://") && !videoUrl.startsWith("https://")) {
    videoUrl = "https://" + videoUrl; // Adiciona https:// se faltar
  }

  try {
    const url = new URL(videoUrl); // Cria um objeto URL a partir da videoUrl

    // Verifica se é uma URL normal do YouTube
    if (url.hostname === "www.youtube.com" || url.hostname === "youtube.com") {
      return url.searchParams.get("v"); // Retorna o VIDEO_ID
    }

    // Verifica se é uma URL encurtada do YouTube
    if (url.hostname === "youtu.be") {
      return url.pathname.substring(1); // Retorna o VIDEO_ID
    }
  } catch (error) {
    console.error("URL inválida:", videoUrl); // Loga a URL inválida para depuração
  }

  // Se a URL não for válida, retorna null
  return null;
}

// Função chamada quando a API do IFrame do YouTube estiver pronta
function onYouTubeIframeAPIReady() {
  return new Promise((resolve) => {
    let newUrl = getEmbedUrl(videoUrl);

    if (player) {
      player.destroy(); // Destrói o player existente
    }

    player = new YT.Player("youtubePlayer", {
      height: "315",
      width: "560",
      videoId: newUrl, // Substitua pelo ID do vídeo
      events: {
        onReady: (event) => {
          event.target.playVideo();
          event.target.setVolume(1); // Tenta reproduzir o vídeo imediatamente
        },
        onError: () => {
          resolve(false);
        },
        onStateChange: (event) => {
          if (event.data === YT.PlayerState.PLAYING) {
            resolve(true); // O vídeo está reproduzindo corretamente
          } else if (event.data === YT.PlayerState.PAUSED) {
            resolve(false); // O vídeo está pausado
          } else if (
            event.data === YT.PlayerState.ENDED ||
            event.data === YT.PlayerState.ERROR
          ) {
            resolve(false); // O vídeo terminou ou houve um erro
          }
        },
      },
    });
  });
}

// Listener para o botão de checagem
checkVideo.addEventListener("click", async function (event) {
  event.preventDefault();

  if (!videoUrl) {
    alertBox("Adicione um URL válido.");
    console.log(alertMessage);
    return;
  }

  hasError = false; // Reseta a variável de erro antes de criar o player

  // Aguarda a verificação completa do vídeo
  const isValid = await onYouTubeIframeAPIReady();

  // Verifica se não houve erro antes de mostrar o link válido
  if (isValid) {
    // Verifica se o volume do player é maior que 0
    const volume = player.getVolume(); // Pega o volume do player
    if (volume === 0) {
      alertBox(
        "Este vídeo não pode ser utilizado por questões de direitos autorais ou porque o autor não permitiu sua utilização."
      );
    } else {
      alertBox("Este é um vídeo válido!");
    }
  } else {
    alertBox(
      "Este vídeo não pode ser utilizado por questões de direitos autorais ou porque o autor não permitiu sua utilização."
    );
  }
  player.destroy();
});
// Carrega a API do YouTube
const tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// BOTAO VALID? ANIMAÇÃO
checkVideo.addEventListener("mousedown", function () {
  checkVideo.style.transform = "scale(0.95)"; // Reduz levemente o botão
  checkVideo.style.backgroundColor = "#ff5a73"; // Muda a cor para um tom mais escuro
});

checkVideo.addEventListener("mouseup", function () {
  timeout = setTimeout(function () {
    checkVideo.style.transform = "scale(1)"; // Restaura o botão ao tamanho normal
    checkVideo.style.backgroundColor = "#d43f55"; // Restaura a cor original
  }, 500); // Duração da animação após soltar o botão
});

checkVideo.addEventListener("mouseleave", function () {
  timeout = setTimeout(function () {
    checkVideo.style.transform = "scale(1)"; // Restaura o tamanho do botão
    checkVideo.style.backgroundColor = "#d43f55"; // Restaura a cor original
  }, 500);
});
