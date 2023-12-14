/**
    Author: Pedro Rodrigues Alves
            Gabriel Felipe Quaresma
            Luca Lourenço Gonzaga


*/

const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  // faça a validação ou processamento adicional aqui
});

const numero = document.getElementById("num");
const baseAtual = document.getElementById("baseAtual");
const baseFutura = document.getElementById("baseFutura");
var divErro = document.getElementById("erro");


function Conversion() {
  let number = AnyToAny(numero.value, baseAtual.value, baseFutura.value);
  imprimeDados(number);
}



// funcão para verificar se o usuário está digitando corretamente o input esperado
function itsRadix(event) {
  divErro.innerText = '';
  const keyCode = event.key; //Valor da tecla digitada pelo usuário

  // Verificar se eh uma letra maiuscula ou um digito
  if ((keyCode === 'Backspace') || (/^[A-Z0-9]$/.test(keyCode))) {
    // Tecla permitida ou tecla de exclusao, nao faz nada
  }
  else {
    divErro.innerText = "Erro! Digite apenas letras maiusculas ou numeros";
    console.log(divErro.innerText);
    event.preventDefault(); // Impede a entrada da tecla inválida
  }
}

//Funcao recursiva que faz potencia nao negativas
function Power(number, times) {
  if (times > 0) {
    return (number * Power(number, times - 1));
  }
  else {
    return 1;
  }
}


function LettersToNumber(array) {
  let length = array.length;
  let intArray = new Array(length);

  for (let i = 0; i < length; i++) {
    //Código 
    let unicodeValue = array.charCodeAt(i);
    if ('A' <= array[i] && array[i] <= 'Z') {
      intArray[i] = unicodeValue - 55;
    }
    else {
      intArray[i] = parseInt(array[i]); //Função que pega um char e transforma em inteiro, caso seja um digito
    }
  }
  console.log("array=" + intArray);
  return intArray;
}


//Funcao para corrigir os numeros passados
function RadixCorrection(array) {
  let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  let length = array.length;

  for (let i = 0; i < length; i++) {
    if (array[i] > 9) {
      let index = array[i] - 10;
      array[i] = letters[index];
    }
  }
  console.log()
  //Retorna o inverso do Array
  return (array.reverse());
}


function AnyToAny(array, fromRadix, toRadix) {

  return (DecToAny(AnyToDec(LettersToNumber(array), fromRadix), toRadix));
}// fim AnyToAny

function AnyToDec(array, radix) {
  let length = array.length;

  let result = 0;

  for (let i = 0, j = length - 1; i < length; i++, j--) {
    console.log("power=" + Power(radix, i));
    result += array[j] * Power(radix, i);
  }
  return result;
}// fim AnytToDec


function DecToAny(number, radix) {
  let result = [];

    for (let i = 0; number >= 1; i++) {
      result[i] = number % radix;
      number = Math.floor(number / radix);
    }
  return (RadixCorrection(result));
}

//
//Funcao principal
//







function imprimeDados(number) {
  let tela = document.getElementById('result');
  let strHtml = '';
  for (let i = 0; i < number.length; i++) {
    strHtml += `${number[i]}`
  }
  tela.innerHTML = strHtml;

}//fim imprimeDados() 


//impedir teclas incorretas
const campoDeEntrada = document.getElementById('num');
campoDeEntrada.addEventListener('keydown', itsRadix);


// Adicionar um ouvinte de evento ao elemento de entrada
let button = document.getElementById('btnConvert');

button.addEventListener('click', Conversion);