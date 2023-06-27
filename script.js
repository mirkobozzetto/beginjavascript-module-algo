import { prompt } from "./helper.js";

function validateNumber(number) {
  if (Number.isNaN(number) && Math.abs(firstNumber) > 100000000000000) {
    console.log(
      "Error : number is not a number or is too big / too small (max: 100000000000000)"
    );
    process.exit(1);
  }
}

function promptNumber(message) {
  const number = Number(prompt(message));

  validateNumber(number);

  return number;
}

function calculateResult(operator, firstNumber, secondNumber) {
  // Addition
  if (operator === 1) {
    return firstNumber + secondNumber;
  }

  if (operator === 2) {
    return firstNumber - secondNumber;
  }

  if (operator === 3) {
    return firstNumber * secondNumber;
  }

  if (operator === 4) {
    if (secondNumber === 0) {
      console.log("Error : divion by 0");
      process.exit();
    }
    return firstNumber / secondNumber;
  }
}

console.log("ADDITION-MASTER ™️");

console.log(`Choose an operator :
1. Addition
2. Soustraction
3. Multiplication
4. Division`);

const operator = Number(prompt("Enter the operator : "));

if (operator !== 1 && operator !== 2 && operator !== 3 && operator !== 4) {
  console.log("Error : operator is not 1, 2, 3 or 4");
  process.exit(1);
}

const firstNumber = promptNumber("Enter the first number : ");

const secondNumber = promptNumber("Enter the second number : ");

const result = calculateResult(operator, firstNumber, secondNumber);

console.log("The result : ", result);
