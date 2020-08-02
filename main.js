// DOM Elements
const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("clipboard");

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

generateEl.addEventListener("click", () => {
  const length = +lengthEl.value;
  const hasUpper = uppercaseEl.checked;
  const hasLower = lowercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  resultEl.innerText = generatePassword(
    length,
    hasLower,
    hasNumber,
    hasSymbol,
    hasUpper
  );
});

//Copy password to clipboard
clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password Copied to Clipboard')
})

//Generate password function
function generatePassword(length, lower, number, symbol, upper) {
  let generatedPassword = '';
  const typesCount = lower + upper + number + symbol;

  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);

  if(typesCount === 0) {
    return '';
  }

  for (let i = 0; i < length; i+= typesCount) {
      typesArr.forEach(type => {
          const funcName = Object.keys(type)[0];
          generatedPassword += randomFunc[funcName]();
      });  
  };
  // console.log(generatedPassword.slice(0, length));
  const finalPassword = generatedPassword.slice(0, length);
  // console.log(finalPassword);
  return finalPassword;
}

//Generator Functions

function getRandomLower() {
  const lower = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  return lower;
}
function getRandomUpper() {
  const upper = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  return upper;
}
function getRandomNumber() {
  const num = String.fromCharCode(Math.floor(Math.random() * 10) + 48);
  return num;
}
function getRandomSymbol() {
  const symbols = "!@#$%^&*()_{}[],.~<>?|";
  const symbol = symbols[Math.floor(Math.random() * symbols.length)];
  return symbol;
}
