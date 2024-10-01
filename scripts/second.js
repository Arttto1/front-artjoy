// Carrega a API do YouTube
const tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player; // Variável para armazenar a instância do player
let isPlaying = false;

let vercelUrl =
  "https://api-artjoywebsite.vercel.app";

// LINK DINÂMICO
function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

const urlName = decodeURIComponent(getQueryParam("name"));
console.log(urlName);

// DECLARAR VARIAVEIS
let startDate;
let imagePath;
let urlYtb;
let coupleName;
let coupleMessage;
const muteBtn = document.getElementById("muteBtn");

// PEGAR AS INFORMAÇÕES DO FIRESTORE

document.addEventListener("DOMContentLoaded", function () {
  fetch(`${vercelUrl}/api/submissions/${urlName}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erro ao buscar dados');
      }
      return response.json();
    })
    .then((data) => {
      startDate = data.date;
      const [year, month, day] = startDate.split("-").map(Number);
      startDate = new Date(year, month - 1, day);
      const imageUrls = data.imageUrls; // URLs das imagens
      urlYtb = data.urlYtb;
      coupleName = data.name;
      coupleMessage = data.message;
      
      document.getElementById("headerTitle").textContent = coupleName;
      document.getElementById("message").textContent = coupleMessage;

      const imageContainer = document.getElementById("imageContainer");
      imageContainer.innerHTML = ""; // Limpa o contêiner antes de adicionar novas imagens

      if (imageUrls && imageUrls.length > 0) {
        let currentIndex = 0;
      
        const img = document.createElement("img");
        img.className = "coupleImg";
        img.src = imageUrls[currentIndex];
        imageContainer.appendChild(img);
      
        img.onload = () => {
          let intervalId = setInterval(() => {
            currentIndex++;
            if (currentIndex >= imageUrls.length) {
              currentIndex = 0;
            }
      
            img.src = imageUrls[currentIndex];
          }, 3000); // Muda a imagem a cada 3000 ms (3 segundos)
        };
      } else {
        console.error("Nenhuma imagem encontrada.");
      }

      if (urlYtb) {
        muteBtn.style.display = "flex";
        initYouTubePlayer();
      }
      updateTimer();
      setInterval(updateTimer, 1000); // Inicie o intervalo do timer aqui
      document.getElementById("bodySecond").style.display = "flex";
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});


// Função chamada quando a API do YouTube é carregada
function initYouTubePlayer() {
  player = new YT.Player("player", {
    height: "315",
    width: "560",
    videoId: `${urlYtb}`, // Use a variável urlYtb aqui
    playerVars: {
      autoplay: 0,
      loop: 1,
      playlist: `${urlYtb}`,
      mute: 0,
    },
    events: {
      onReady: function (event) {
        event.target.mute(); // Muta o vídeo quando estiver pronto
      },
    },
  });
}
console.log(urlYtb);

// Adiciona o listener ao botão apenas se o player for inicializado
document.getElementById("muteBtn").addEventListener("click", () => {
  if (player) {
    // Verifica se o player está definido
    if (isPlaying) {
      player.pauseVideo(); // Pausa o vídeo
      muteBtn.textContent = "Play Music";
      isPlaying = false; // Atualiza o estado para refletir que o vídeo está pausado
    } else {
      player.playVideo();
      player.unMute(); // Despausa o vídeo
      muteBtn.textContent = "Pause Music";
      isPlaying = true; // Atualiza o estado para refletir que o vídeo está tocando
    }
  } else {
    console.error("Player is not initialized yet."); // Mensagem de erro para depuração
  }
});

// Supondo que urlYtb seja a URL do vídeo
// urlYtb = "KS_TrJOQB-g"; // Exemplo; substitua isso pela sua variável real

// Verifica se urlYtb não é nulo antes de carregar o player

// ATUALIZAÇÃO DO TIMER

function updateTimer() {
  if (!startDate) {
    console.error("startDate is not defined");
    return; // Se startDate não está definido, saia da função
  }

  const now = new Date(); // Data e hora atuais
  const elapsed = now - startDate; // Diferença em milissegundos

  // Calcular total de segundos, minutos, horas e dias
  const totalSeconds = Math.floor(elapsed / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);

  // Calcular anos, meses e dias restantes
  const years = now.getFullYear() - startDate.getFullYear();

  let months = now.getMonth() - startDate.getMonth();
  if (months < 0) {
    months += 12; // Ajusta se o mês atual é antes do mês de início
  }

  let days = now.getDate() - startDate.getDate();
  if (days < 0) {
    months--; // Subtrai um mês se os dias não foram completos
    // Ajuste de dias para o mês anterior
    const lastMonth = (now.getMonth() - 1 + 12) % 12;
    const lastMonthDays = new Date(
      now.getFullYear(),
      lastMonth + 1,
      0
    ).getDate();
    days += lastMonthDays; // Adiciona os dias do mês anterior
  }

  // Calcular horas, minutos e segundos restantes
  const displayHours = now.getHours() - startDate.getHours();
  const displayMinutes = now.getMinutes() - startDate.getMinutes();
  const displaySeconds = now.getSeconds() - startDate.getSeconds();

  // Ajustar horas, minutos e segundos
  if (displaySeconds < 0) {
    displaySeconds += 60;
    displayMinutes--;
  }
  if (displayMinutes < 0) {
    displayMinutes += 60;
    displayHours--;
  }
  if (displayHours < 0) {
    displayHours += 24;
  }

  // Atualiza o conteúdo do elemento com o tempo decorrido
  let timerText = "We've been together for:<br>";

  // Mostrar "years" apenas se for maior que 0, e ajustar o plural
  if (years > 0) {
    timerText += `${years} ${years === 1 ? "year" : "years"}<br>`;
  }

  // Mostrar "months" apenas se for maior que 0, e ajustar o plural
  if (months > 0) {
    timerText += `${months} ${months === 1 ? "month" : "months"}<br>`;
  }

  // Mostrar "days" apenas se for maior que 0, e ajustar o plural
  if (days > 0) {
    timerText += `${days} ${days === 1 ? "day" : "days"}<br>`;
  }

  // Adicionar sempre horas, minutos e segundos
  timerText += `${displayHours} hours <br> ${displayMinutes} minutes <br>and ${displaySeconds} seconds`;

  // Atualiza o conteúdo do elemento com o tempo decorrido
  document.getElementById("timer").innerHTML = timerText;
}

// Supondo que muteBtn já esteja definido
let timeout; // Variável para armazenar o timeout

// Os eventos de mouse são os mesmos
muteBtn.addEventListener("mousedown", function () {
  muteBtn.style.transform = "scale(0.95)"; // Reduz levemente o botão
  muteBtn.style.backgroundColor = "#ff5a73"; // Muda a cor para um tom mais escuro
});

muteBtn.addEventListener("mouseup", function () {
  timeout = setTimeout(function () {
    muteBtn.style.transform = "scale(1)"; // Restaura o botão ao tamanho normal
    muteBtn.style.backgroundColor = "var(--pink)"; // Restaura a cor original
  }, 500); // Duração da animação após soltar o botão
});

muteBtn.addEventListener("mouseleave", function () {
  timeout = setTimeout(function () {
    muteBtn.style.transform = "scale(1)"; // Restaura o tamanho do botão
    muteBtn.style.backgroundColor = "#d43f55"; // Restaura a cor original
  }, 500);
});

// SCRIPT CORAÇÃO
let heartCount = 0; // Contador para IDs únicos

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";

  // Aumenta o contador e atribui um ID único ao coração
  heart.id = `heart-${heartCount++}`;
  // Define a posição em vw
  const randomX = Math.random() * 100; // Gera um número entre 0 e 100
  heart.style.left = `${randomX}vw`; // Define a posição horizontal em vw

  const fallDuration = Math.random() * 8 + 18;
  heart.style.animationDuration = `${fallDuration}s`;

  document.getElementById("heart-container").appendChild(heart);

  // Remove o coração após a animação
  setTimeout(() => heart.remove(), fallDuration * 1000 * 0.7);
}

let intervalIdHeart;
let resizeTimeout;

// Função para calcular o intervalo com base no tamanho da tela
function calculateInterval() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Exemplo de ajuste de intervalo: mais corações em telas maiores
  if (width > 1200) {
    return 500; // Mais rápido em telas grandes
  } else if (width > 800) {
    return 600; // Médio em telas médias
  } else {
    return 1000; // Mais lento em telas pequenas
  }
}

// Função para iniciar a criação de corações
function startHeartCreation() {
  // Limpar qualquer intervalo existente
  clearInterval(intervalIdHeart);

  // Ajustar o intervalo com base no tamanho atual da tela
  const interval = calculateInterval();

  // Iniciar o setInterval com o novo intervalo
  intervalIdHeart = setInterval(createHeart, interval);
}

// Event listener para detectar mudanças no tamanho da tela
window.addEventListener("resize", function () {
  // Limpa o timeout anterior se houver (evita chamadas múltiplas desnecessárias)
  clearTimeout(resizeTimeout);

  // Espera 2 segundos antes de chamar a função para evitar problemas de desempenho
  resizeTimeout = setTimeout(() => {
    startHeartCreation();
  }, 2000);
});

// Chamar a função ao carregar a página
startHeartCreation();

setTimeout(() => {
  heartCount = 0; // Reseta o contador de corações
}, 20000);

