
// Função para calcular a diferença entre a data atual e a data de início
const dataInicio = document.getElementById("datainicio");

function updateTimer() {
  const [year, month, day] = dataInicio.value.split("-").map(Number);
  const startDate = new Date(year, month - 1, day);

  // Verifica se a data de início foi definida
  if (isNaN(startDate.getTime())) {
    const timer = document.getElementById("timer");
    timer.textContent = "We've been together for:";
    return;
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
    const lastMonthDays = new Date(now.getFullYear(), lastMonth + 1, 0).getDate();
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
    timerText += `${years} ${years === 1 ? 'year' : 'years'}<br>`;
  }

  // Mostrar "months" apenas se for maior que 0, e ajustar o plural
  if (months > 0) {
    timerText += `${months} ${months === 1 ? 'month' : 'months'}<br>`;
  }

  // Mostrar "days" apenas se for maior que 0, e ajustar o plural
  if (days > 0) {
    timerText += `${days} ${days === 1 ? 'day' : 'days'}<br>`;
  }

  // Adicionar sempre horas, minutos e segundos
  timerText += `${displayHours} hours <br> ${displayMinutes} minutes <br>and ${displaySeconds} seconds`;

  // Atualiza o conteúdo do elemento com o tempo decorrido
  document.getElementById("timer").innerHTML = timerText;
}

// Atualiza o timer a cada segundo
setInterval(updateTimer, 1000);

dataInicio.addEventListener("input", updateTimer);

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
// Função para iniciar a criação de corações
function startHeartCreation() {
  heartInterval = setInterval(createHeart, 1000);
}

// Função para parar a criação de corações
function stopHeartCreation() {
  clearInterval(heartInterval);
}

// Iniciar a criação de corações
startHeartCreation();

// Adiciona eventos para parar a animação
document.addEventListener("visibilitychange", function() {
  if (document.visibilityState === 'hidden') {
    stopHeartCreation(); // Para a criação se a página estiver oculta
  } else {
    startHeartCreation(); // Reinicia a criação se a página estiver visível
  }
});

window.addEventListener("blur", stopHeartCreation); // Para a criação ao perder foco
window.addEventListener("focus", startHeartCreation); // Reinicia a criação ao ganhar foco

// FUNÇAO PARA MOSTRAR A PAGINA QUANDO ESTIVER CARREGADA
window.addEventListener("load", function () {
  document.getElementById("mainLoader").style.display = "block";
});
