var SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
var SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList;

var colors = ["violet", "indigo", "blue", "green", "yellow", "orange", "red"];

var recognition = new SpeechRecognition();

recognition.continuous = false;
recognition.lang = "en-IN";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector(".output");
var bg = document.querySelector("body");
var hints = document.querySelector(".hints");
let clicker = document.querySelector(".clicker");

var colorHTML = "";
colors.forEach(function (v, i, a) {
  console.log(v, i);
  colorHTML += `<div style="background-color: ${v};margin: 5px; padding:5px; display: inline-block " > ${v} </div>`;
});
hints.innerHTML = `Tap/click then say a color to change the background color of the app. Try ${colorHTML}`;

document.querySelector("#speechInput").onclick = function () {
  recognition.start();
  console.log("Ready to receive a color command.");
};

recognition.onresult = function (event) {
  var color = event.results[0][0].transcript;
  diagnostic.textContent = "Result received: " + color + ".";
  clicker.style.backgroundColor = color;
  console.log("Confidence: " + event.results[0][0].confidence);
};

recognition.onspeechend = function () {
  recognition.stop();
};

recognition.onnomatch = function (event) {
  diagnostic.textContent = "I didn't recognise that color.";
};

recognition.onerror = function (event) {
  diagnostic.textContent = "Error occurred in recognition: " + event.error;
};
