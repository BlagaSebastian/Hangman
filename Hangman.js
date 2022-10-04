let word;

function setWord() {
  let aux = document.querySelector('#guessWord').value;
  if (/^[a-zA-Z]+$/.test(aux)) {
    word = aux;
    setLetters();
  } else {
    alert("Please enter a word.");
  }
  document.getElementById('guessWord').value = '';
}

function setLetters() {
    document.getElementById('label').textContent = "Can you guess all the word letters?";
    for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); ++i) {
      let button = document.createElement("button");
      button.innerHTML = String.fromCharCode(i);
      button.setAttribute('id', String.fromCharCode(i));
      button.onclick = function() {
        checkLetter(String.fromCharCode(i))
      };
      document.getElementById("allLetters").appendChild(button);
    }
    for (let i = 0; i < word.length; ++i) {
      let hiddenLetters = document.createElement('p');
      hiddenLetters.id = i;
      hiddenLetters.innerHTML = ' _ ';
      hiddenLetters.style.display = "inline";
      document.getElementById("hiddenWord").appendChild(hiddenLetters);
    }
}

let foundLetters = 0;
let part = 0;

function checkLetter(letter) {
  let result = document.getElementById('result');
  document.getElementById(letter).disabled = true;
  let found = false;
  for (let i = 0; i < word.length; ++i) {
    if (letter == word[i].toUpperCase()) {
      found = true;
      ++foundLetters;
      document.getElementById(i).innerHTML = letter;
    }
  }
  if (foundLetters == word.length) {
    result.innerHTML = "You won!";
    result.style.color = "green";
  }
  if (found == false) {
    draw(drawParts[part++]);
  }
  if (typeof drawParts[part] === 'undefined') {
    for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); ++i) {
      document.getElementById(String.fromCharCode(i)).disabled = true;
    }
    result.innerHTML = "You lost!";
    result.style.color = "red";
  }
}
