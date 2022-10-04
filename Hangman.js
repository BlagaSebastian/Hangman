let word;

function settWord() {
  let aux = document.querySelector('#guessWord').value;
  if (/^[a-zA-Z]+$/.test(aux)) {
    word = aux;
    settLetters();
  } else {
    alert("Please enter a word.");
  }
  document.getElementById('guessWord').value = '';
}

function settLetters() {
    document.getElementById('label').textContent = "Can you guess all the word letters?";
    for (let i = 65; i <= 90; ++i) {
      let button = document.createElement("button");
      button.innerHTML = String.fromCharCode(i);
      button.setAttribute('id', String.fromCharCode(i));
      button.onclick = function() {checkLetter(String.fromCharCode(i))};
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

const canvas = document.getElementById('hangmanDraw');
const context = canvas.getContext("2d");
const draws = ['gallows', 
'head', 
'body', 
'rightArm', 
'leftArm',
'rightLeg',
'leftLeg',
'rightFoot',
'leftFoot',]
let step = 0;

function draw(part) {
    switch(part) {
       case 'gallows' :
         context.strokeStyle = '#400';
         context.lineWidth = 10; 
         context.beginPath();
         context.moveTo(175, 225);
         context.lineTo(5, 225);
         context.moveTo(40, 225);
         context.lineTo(25, 5);
         context.lineTo(100, 5);
         context.lineTo(100, 25);
         context.stroke();
         break;
 
       case 'head':
         context.lineWidth = 5;
         context.beginPath();
         context.arc(100, 50, 25, 0, Math.PI*2, true);
         context.closePath();
         context.stroke();
         break;
       
       case 'body':
         context.beginPath();
         context.moveTo(100, 75);
         context.lineTo(100, 140);
         context.stroke();
         break;
 
       case 'rightArm':
         context.beginPath();
         context.moveTo(100, 85);
         context.lineTo(60, 100);
         context.stroke();
         break;
 
       case 'leftArm':
         context.beginPath();
         context.moveTo(100, 85);
         context.lineTo(140, 100);
         context.stroke();
         break;
 
       case 'rightLeg':
         context.beginPath();
         context.moveTo(100, 140);
         context.lineTo(80, 190);
         context.stroke();
         break;
 
       case 'leftLeg':
         context.beginPath();
         context.moveTo(100, 140);
         context.lineTo(125, 190);
         context.stroke();
       break;
        
       case 'rightFoot':
          context.beginPath();
          context.moveTo(82, 190);
          context.lineTo(70, 185);
          context.stroke();
       break;
 
       case 'leftFoot':
          context.beginPath();
          context.moveTo(122, 190);
          context.lineTo(135, 185);
          context.stroke();
       break;
    } 
}

let foundLetters = 0;

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
    draw(draws[step++]);
  }
  if (typeof draws[step] === 'undefined') {
    for (let i = 65; i <= 90; ++i) {
      document.getElementById(String.fromCharCode(i)).disabled = true;
    }
    result.innerHTML = "You lost!";
    result.style.color = "red";
  }
}
