// DECLARAÇÃO DAS VARIÁVEIS

let maxFiles;
let fileArray = [];
const inputFile = document.getElementById("fileInput");
const preview = document.getElementById("photoPreview");

const photoPlaceholder = document.getElementById("photoPlaceholder");
const divImagePreview = document.getElementById("divImagePreview");
const submitBtn = document.getElementById("submitButton");

const loadingBtn = document.querySelector(".wrap");

const form = document.getElementById("websiteForm");

const couplePreview = document.getElementById("headerTitle");
const nomeCasal = document.getElementById("nomecasal");

const messageText = document.getElementById("message");
const messagePreview = document.getElementById("messageSecond");

let youtubeInput = document.getElementById("youtubeInput");
let videoUrl = null;
let embedUrl = null;

let fileName;

let storage;
let db;

// const muteBtn = document.getElementById("muteBtn");

let selectedItem = null;
// VARIAVEL PARA O NOME DO ARQUIVO CODIFICADO COM O DATENOW
let nameWithId;

// VARIAVEL DO LINK GERADO PARA O USUARIO
// let costumerUrl;

let vercelUrl =
  "https://api-artjoywebsite.vercel.app/";

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

// MANDA AS FOTOS PARA O STORAGE

function logToServer(messageLog) {
  // Mude aqui
  fetch("/log", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messageLog }), // Mude aqui
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((data) => console.log(data))
    .catch((err) => console.error("Erro ao enviar log:", err));
}

submitBtn.addEventListener("click", async (event) => {
  event.preventDefault();

  // APARECER O LOADING QUANDO APERTAR
  submitBtn.style.display = "none";
  loadingBtn.style.display = "flex";

  // COMUNICAÇÃO COM O SERVIDOR
  try {
    // Chama a função para fazer o upload dos arquivos após a inicialização
    await uploadFiles();

    // Cria a sessão de checkout
    const checkoutResponse = await fetch(
      `${vercelUrl}/create-checkout-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [{ id: selectedItem.id, quantity: 1 }],
        }),
      }
    );

    if (checkoutResponse.ok) {
      const { url } = await checkoutResponse.json();
      window.location = url;
    } else {
      const errorJson = await checkoutResponse.json();
      console.error(errorJson);
    }
  } catch (error) {
    console.error("Erro:", error);
  }
});

async function uploadFiles() {
  if (youtubeInput.value.trim() !== "") {
    embedUrl = getEmbedUrl(videoUrl);
  }
  const formData = new FormData(form);
  const data = {
    date: DOMPurify.sanitize(formData.get("data-inicio")),
    name: formData.get("nome-casal"),
    message: DOMPurify.sanitize(formData.get("message")),
    urlYtb: embedUrl ? embedUrl : "",
  };

  // Adicionar os dados ao FormData como JSON string
  formData.append("data", JSON.stringify(data));

  // Adiciona os arquivos ao FormData
  for (const file of fileArray) {
    // Certifique-se de que 'fileArray' é um array de arquivos válido
    formData.append("files", file);
  }

  try {
    // Enviar os dados e arquivos para o servidor
    const response = await fetch(`${vercelUrl}/api/upload`, {
      method: "POST",
      body: formData, // Envie o FormData diretamente
    });

    // Aqui você pode adicionar tratamento de resposta
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error("Erro ao enviar os arquivos:", error);
  }
}

// INICIA A PAGINA COM O BOTAO 2 APERTADO
document.addEventListener("DOMContentLoaded", function () {
  // Simula um clique no botão 2 ao carregar a página
  btn2.click(); // Chama a função changeBg2()
});

// MUDA O BOTÃO DO PLANO E O VALOR
const btn1 = document.getElementById("oneyear");
const btn2 = document.getElementById("lifetime");
const white = "#FFFFFF";
const blue = "#000027";
const lightBlue = "#0e004f";
const pink = "#d43f55";
const lightPink = "#f59eab";
const ytbDiv = document.getElementById("youtubeDiv");

btn1.addEventListener("click", function (event) {
  event.preventDefault();
  maxFiles = 4;

  selectedItem = { id: 1, quantity: 1 };

  // Remover as imagens excedentes se o número de imagens for maior que o máximo permitido
  const imagesToRemove = fileArray.length - maxFiles;
  if (imagesToRemove > 0) {
    const allImageDivs = document.querySelectorAll(".imageDivTest");

    // Remover a quantidade necessária de imagens e clicar nos botões de exclusão
    for (let i = 0; i < imagesToRemove; i++) {
      const imageDiv = allImageDivs[allImageDivs.length - 1 - i]; // Pega a última imagem para remover
      if (imageDiv) {
        const button = imageDiv.querySelector("#previewBtn"); // Seleciona o botão de preview na imagem
        if (button) {
          button.click(); // Simula o clique no botão de exclusão
        }
      }
    }
  }
  // Alterar o estilo dos botões
  btn1.style.backgroundColor = pink;
  btn1.style.color = white;
  btn2.style.backgroundColor = lightPink;
  btn2.style.color = lightBlue;
  ytbDiv.style.display = "none";
  // Supondo que ytbDiv seja uma div que você quer esconder
  checkFileLimit();
  // muteBtn.style.display = "none";
  videoUrl = "";
  embedUrl = "";
});

btn2.addEventListener("click", function (event) {
  event.preventDefault();
  btn1.style.backgroundColor = lightPink;
  btn1.style.color = lightBlue;
  btn2.style.backgroundColor = pink;
  btn2.style.color = white;
  ytbDiv.style.display = "block"; // Supondo que você quer mostrar essa div
  maxFiles = 8; // Aumenta o limite de arquivos quando btn2 é clicado
  selectedItem = { id: 2, quantity: 1 };
  checkFileLimit();
  // muteBtn.style.display = "block";
});

let timeout; // Variável para armazenar o timeout

// Os eventos de mouse são os mesmos
// muteBtn.addEventListener("click", function (event) {
//   event.preventDefault();

//   if (muteBtn.textContent === "Click Me!") {
//     muteBtn.textContent = "Pause Music";
//   } else if (muteBtn.textContent === "Play Music") {
//     muteBtn.textContent = "Pause Music";
//   } else {
//     muteBtn.textContent = "Play Music";
//   }
// });

// muteBtn.addEventListener("mousedown", function () {
//   muteBtn.style.transform = "scale(0.95)"; // Reduz levemente o botão
//   muteBtn.style.backgroundColor = "#ff5a73"; // Muda a cor para um tom mais escuro
// });

// muteBtn.addEventListener("mouseup", function () {
//   timeout = setTimeout(function () {
//     muteBtn.style.transform = "scale(1)"; // Restaura o botão ao tamanho normal
//     muteBtn.style.backgroundColor = "var(--pink)"; // Restaura a cor original
//   }, 500); // Duração da animação após soltar o botão
// });

// muteBtn.addEventListener("mouseleave", function () {
//   timeout = setTimeout(function () {
//     muteBtn.style.transform = "scale(1)"; // Restaura o tamanho do botão
//     muteBtn.style.backgroundColor = "#d43f55"; // Restaura a cor original
//   }, 500);
// });

function isValidImage(file) {
  const validTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/svg+xml",
    "image/jpg",
  ];
  return validTypes.includes(file.type);
}

// MUDA AS IMAGENS DO PREVIEW
let intervalId = null;

inputFile.addEventListener("change", function () {
  let divPreview = divImagePreview.querySelector(".divImagem");
  let imgDivPreview = divImagePreview.querySelector(".coupleImg");
  const files = Array.from(inputFile.files);
  // Limpa o intervalo existente quando uma nova imagem é adicionada
  if (intervalId) {
    clearInterval(intervalId);
  }

  files.forEach((file) => {
    if (!isValidImage(file)) {
      alert("Por favor, carregue apenas arquivos de imagem.");
      return;
    } else if (fileArray.length < maxFiles) {
      fileArray.push(file);
      const reader = new FileReader();
      reader.onload = function (e) {
        const div = document.createElement("div");
        div.className = "imageDivTest";
        const img = document.createElement("img");
        img.src = e.target.result;

        const button = document.createElement("button");
        button.id = "previewBtn";
        button.textContent = "×";
        button.onclick = () => {
          fileArray = fileArray.filter((f) => f !== file);
          div.remove();
          //   divPreview.remove();
          if (fileArray.length === 0) {
            divPreview.remove();
            clearInterval(intervalId);
          }
          checkFileLimit();
          updatePhotoPlaceholderVisibility();
        };

        div.appendChild(img);
        div.appendChild(button);
        preview.appendChild(div);

        divImagePreview.style.display = "flex";
        updatePhotoPlaceholderVisibility();
      };
      reader.readAsDataURL(file);
    }
  });

  // Criação e rotação das imagens no divPreview
  let currentIndex = 0;

  // Cria a imagem inicial para o divPreview

  if (!divPreview) {
    // Se não existir, cria o 'divPreview'
    divPreview = document.createElement("div");
    divPreview.className = "divImagem";
    divImagePreview.appendChild(divPreview);
    imgDivPreview = document.createElement("img");
    imgDivPreview.className = "coupleImg";
  }

  // Função para mostrar a imagem no imgDivPreview com FileReader
  const showImage = (index) => {
    const file = fileArray[index];
    const reader = new FileReader();

    reader.onload = function (e) {
      imgDivPreview.src = e.target.result; // Define a imagem diretamente
    };

    reader.readAsDataURL(file); // Lê o arquivo e obtém a imagem
  };

  divPreview.appendChild(imgDivPreview);

  // Exibe a primeira imagem
  if (fileArray.length > 0) {
    showImage(currentIndex);
  }

  // Inicia a rotação de imagens
  const startImageRotation = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }

    intervalId = setInterval(() => {
      currentIndex++;
      if (currentIndex >= fileArray.length) {
        currentIndex = 0;
      }

      // Exibe a próxima imagem no índice atual
      showImage(currentIndex);
    }, 3000); // Muda a imagem a cada 3 segundos
  };

  if (fileArray.length > 0) {
    startImageRotation();
  }

  checkFileLimit();
  inputFile.value = ""; // Reseta o input para permitir mais uploads
});

// HABILITAÇÃO DO BOTÃO DE SUBMIT DO FORM
function checkFileLimit() {
  if (fileArray.length >= maxFiles) {
    inputFile.disabled = true; // Desabilita o input se o limite for atingido
  } else {
    inputFile.disabled = false; // Habilita o input se o limite não for atingido
  }
  submitBtn.disabled = fileArray.length === 0;
}

// MUDA A VISUALIZAÇÃO DO PLACEHOLDER DAS FOTOS DO PREVIEW

function updatePhotoPlaceholderVisibility() {
  if (divImagePreview.children.length > 0) {
    photoPlaceholder.style.display = "none";
  } else {
    photoPlaceholder.style.display = "block";
    divImagePreview.style.display = "none";
  }
}

// MUDA O TITULO DO PREVIEW
nomeCasal.addEventListener("input", function () {
  if (nomeCasal.value.trim() === "") {
    couplePreview.textContent = "Couple's Name"; // Define para "Couple's Name" se estiver vazio
  } else {
    couplePreview.textContent = nomeCasal.value; // Atualiza com o valor do campo
  }
});

// MUDA A MENSAGEM DO PREVIEW
messageText.addEventListener("input", function () {
  if (messageText.value.trim() === "") {
    messagePreview.textContent = "Yor message is going to be here!"; // Define para "Couple's Name" se estiver vazio
  } else {
    messagePreview.textContent = messageText.value; // Atualiza com o valor do campo
  }
});

// const formData = new FormData(form);
// const data = {
//   date: formData.get("data-inicio"),
//   name: formData.get("nome-casal"),
//   message: formData.get("message"),
//   urlYtb: formData.get("youtube-input"),
// };

// setInterval(function () {
//   console.log(data); // Exibe o valor da variável no console
// }, 5000);
