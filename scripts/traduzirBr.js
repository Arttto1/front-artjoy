function translatePageToPortuguese() {
  // Títulos e descrições principais
  document.getElementById("span1").textContent = "Presenteie seu";
  document.getElementById("span2").textContent = "Amor";
  document.querySelector("#title p").textContent =
    "Crie um site personalizado para o seu amor com um contador dinâmico de tempo de relacionamento e mais recursos especiais!";
  document.getElementById("fillForm").textContent =
    "Preencha o formulário e receba seu site personalizado + QR para compartilhar com o seu amor.";

  // Botões de planos
  document.getElementById("oneyear").textContent =
    "1 Ano, 4 Fotos, Sem Música - R$ 16,49";
  document.getElementById("lifetime").textContent =
    "Para Sempre, 8 Fotos, Com Música - R$ 29,99";

  // Labels e campos do formulário
  document.getElementById("namelabel").textContent = "Nome do Casal:";
  document.getElementById("nomecasal").placeholder =
    "Exemplo: Arthur e Joyce (sem emojis)";
  document.getElementById("datelabel").textContent =
    "Início do relacionamento:";
  document.getElementById("messagelabel").textContent = "Digite uma mensagem:";
  document.getElementById("message").placeholder =
    "Digite uma bela mensagem aqui!";
  document.getElementById("emailLabel").textContent =
    "Digite seu endereço de e-mail:";
  document.getElementById("userEmail").placeholder = "voce@exemplo.com";
  document.getElementById("filelabel").textContent = "Envie suas fotos";
  document.getElementById("ratio").textContent =
    "Certifique-se de enviar fotos no formato retrato, não paisagem, para obter os melhores resultados.";
  document.querySelector("#youtubeDiv label").textContent =
    "Digite uma música do Youtube (Opcional):";

  // Placeholder da pré-visualização
  document.getElementById("previewText").textContent = "Como vai ficar 👇";
  document.getElementById("headerTitle").textContent = "Nome do Casal";
  document.getElementById("timer").textContent = "Estamos juntos há:";
  document.getElementById("photoPlaceholderText").textContent = "Foto do Casal";
  document.getElementById("messageSecond").textContent =
    "Sua mensagem vai aparecer aqui!";

  // Botão de envio
  document.getElementById("submitButton").textContent = "Criar Site";
  document.querySelector(".text").textContent = "Enviando para o Checkout";

  // Como funciona
  document.getElementById("howWorks").querySelector("h2").textContent =
    "Como Funciona?";
  const steps = document.querySelectorAll(".step p");
  steps[0].textContent = "1 - Insira as Informações 📋";
  steps[1].textContent = "2 - Complete o Pagamento 💰";
  steps[2].textContent = "3 - Receba o Site + Código QR no Seu E-mail ✉️";
  steps[3].textContent = "4 - Surpreenda Seu Amor ❤️";

  const stepsCelular = document.querySelectorAll(".stepCelular p");
  stepsCelular[0].textContent = "1 - Insira as Informações 📋";
  stepsCelular[1].textContent = "2 - Complete o Pagamento 💰";
  stepsCelular[2].textContent =
    "3 - Receba o Site + Código QR no Seu E-mail ✉️";
  stepsCelular[3].textContent = "4 - Surpreenda Seu Amor ❤️";

  // Seção de FAQ
  document.querySelector("#faq h1").textContent = "Perguntas Frequentes (FAQ)";

  const faqItems = document.querySelectorAll(".faq-item");

  // Pergunta 1
  faqItems[0].querySelector("h2").textContent = "O que é o ArtJoy?";
  faqItems[0].querySelector("p").textContent =
    "O ArtJoy é uma plataforma que permite aos casais criarem páginas personalizadas de relacionamento. Você pode adicionar fotos, uma mensagem especial e um contador ao vivo mostrando há quanto tempo estão juntos.";

  // Pergunta 2
  faqItems[1].querySelector("h2").textContent =
    "Como posso criar uma página personalizada no ArtJoy?";
  faqItems[1].querySelector("p").textContent =
    "Para criar uma página, preencha o formulário com os nomes do casal, a data de início do relacionamento, uma mensagem e até 8 fotos. Em seguida, clique no botão 'Criar Site' e conclua o pagamento.";

  // Pergunta 3
  faqItems[2].querySelector("h2").textContent =
    "O que está incluído na minha página personalizada?";
  faqItems[2].querySelector("p").textContent =
    "Sua página contará com um contador ao vivo mostrando há quanto tempo estão juntos, uma apresentação de slides de fotos e uma declaração personalizada. Além disso, corações caem na tela com uma bela animação.";

  // Pergunta 4
  faqItems[3].querySelector("h2").textContent =
    "Como recebo minha página após o pagamento?";
  faqItems[3].querySelector("p").textContent =
    "Após o pagamento, você receberá um código QR para compartilhar com seu parceiro e um link via e-mail para acessar a página.";

  // Pergunta 5
  faqItems[4].querySelector("h2").textContent =
    "A página personalizada tem uma data de validade?";
  faqItems[4].querySelector("p").textContent =
    "No plano básico, sim – a página dura 1 ano. No plano avançado, a página está disponível para sempre.";

  // Pergunta 6
  faqItems[5].querySelector("h2").textContent =
    "Quanto custa criar uma página no ArtJoy?";
  faqItems[5].querySelector("p").textContent =
    "Atualmente, custa apenas R$ 16,49 para o plano básico e R$ 29,99 para o plano avançado.";

  // Pergunta 7
  faqItems[6].querySelector("h2").textContent =
    "Quanto tempo leva para receber o código QR por e-mail?";
  faqItems[6].querySelector("p").textContent =
    "Pagamentos com cartão de crédito e débito são processados instantaneamente.";

  // Pergunta 8
  faqItems[7].querySelector("h2").textContent =
    "Quais são os métodos de pagamento aceitos?";
  faqItems[7].querySelector("p").textContent =
    "Aceitamos pagamentos via cartão de crédito ou débito.";

  // Pergunta 9
  faqItems[8].querySelector("h2").textContent =
    "Como posso entrar em contato com o suporte ao cliente?";
  faqItems[8].querySelector("p").textContent =
    "Você pode entrar em contato com nossa equipe de suporte através do e-mail artjoy.app@gmail.com";

  // Botão 'Create Website'
  document.querySelector(".backTop button").textContent = "Criar Site";

  // Rodapé
  document.querySelector("footer p").textContent =
    "© 2024 ArtJoy. Todos os direitos reservados.";
  document.querySelector("footer p + p").textContent =
    "Usamos Stripe para pagamentos seguros. Suas informações estão seguras conosco!";

  document.querySelectorAll("footer a")[0].textContent =
    "Política de Privacidade";
  document.querySelectorAll("footer a")[1].textContent = "Termos de Serviço";
}

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

function updateTimerBr() {
  const [year, month, day] = dataInicio.value.split("-").map(Number);
  const startDate = new Date(year, month - 1, day);

  // Verifica se a data de início foi definida
  if (isNaN(startDate.getTime())) {
    const timer = document.getElementById("timer");
    timer.textContent = "Estamos juntos há:";
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
  let timerText = "Estamos juntos há:<br>";

  // Mostrar "years" apenas se for maior que 0, e ajustar o plural
  if (years > 0) {
    timerText += `${years} ${years === 1 ? "ano" : "anos"}<br>`;
  }

  // Mostrar "months" apenas se for maior que 0, e ajustar o plural
  if (months > 0) {
    timerText += `${months} ${months === 1 ? "mês" : "meses"}<br>`;
  }

  // Mostrar "days" apenas se for maior que 0, e ajustar o plural
  if (days > 0) {
    timerText += `${days} ${days === 1 ? "dia" : "dias"}<br>`;
  }

  // Adicionar sempre horas, minutos e segundos
  timerText += `${displayHours} horas <br> ${displayMinutes} minutos <br>e ${displaySeconds} segundos`;

  // Atualiza o conteúdo do elemento com o tempo decorrido
  document.getElementById("timer").innerHTML = timerText;
}

// document.addEventListener("DOMContentLoaded", function () {
//     async function fetchUserCountry() {
//       try {
//         // Faz a requisição à rota do backend
//         const response = await fetch(
//           "https://api-artjoywebsite.vercel.app/api/get-country"
//         );
//         const data = await response.json();
  
//         // Verifica o país e chama as funções correspondentes
//         if (data.country === "BR") {
//           translatePageToPortuguese();
//           // Se o país for Brasil, usa updateTimerBr
//           setInterval(updateTimerBr, 1000);
//           dataInicio.addEventListener("input", updateTimerBr);
//         } else {
//           // Se não for Brasil, usa updateTimer padrão
//           setInterval(updateTimer, 1000);
//           dataInicio.addEventListener("input", updateTimer);
//         }
//       } catch (error) {
//         console.error("Erro ao buscar o país do usuário:", error);
//         // Em caso de erro, você pode optar por um comportamento padrão
//         setInterval(updateTimer, 1000);
//         dataInicio.addEventListener("input", updateTimer);
//       }
//       console.log(data.country)
//     }
  
//     // Chama a função ao carregar a página
//     fetchUserCountry();
//   });
translatePageToPortuguese();
// Se o país for Brasil, usa updateTimerBr
setInterval(updateTimerBr, 1000);
dataInicio.addEventListener("input", updateTimerBr);