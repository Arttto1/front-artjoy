const btn1 = document.getElementById("1year");
const btn2 = document.getElementById("lifetime");
const white = "#FFFFFF";
const blue = "#130065";
const lightBlue = "#130065";
const ytbDiv = document.getElementById("youtubeDiv");

function changeBg1(event) {
  btn1.style.backgroundColor = white;
  btn1.style.color = lightBlue;
  btn2.style.backgroundColor = lightBlue;
  btn2.style.color = white;
  ytbDiv.style.display = "none";
}

function changeBg2(event) {
  btn1.style.backgroundColor = lightBlue;
  btn1.style.color = white;
  btn2.style.backgroundColor = white;
  btn2.style.color = lightBlue;
  ytbDiv.style.display = "block";
}

btn1.addEventListener("click", changeBg1);
btn2.addEventListener("click", changeBg2);