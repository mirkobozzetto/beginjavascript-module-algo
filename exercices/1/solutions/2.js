import fs from 'fs';
import path from 'path';

function readFileContent(file) {
  const filePath = path.join(__dirname, file);
  const fileContent = fs.readFileSync(filePath).toString();
  return fileContent;
}

function findLargestSum(file) {
  const fileContent = readFileContent(file);
  const paragraphs = fileContent.split('\n\n');
  let largestSum = 0;

  for (let i = 0; i < paragraphs.length; i++) {
    const lines = paragraphs[i].split('\n');
    let sum = 0;

    for (let j = 0; j < lines.length; j++) {
      sum += +lines[j];
    }

    if (sum > largestSum) {
      largestSum = sum;
    }
  }

  return largestSum;
}

function findSumOfThreeLargest(file) {
  const fileContent = readFileContent(file);
  const paragraphs = fileContent.split('\n\n');
  const sums = [];

  for (let i = 0; i < paragraphs.length; i++) {
    const lines = paragraphs[i].split('\n');
    let sum = 0;

    for (let j = 0; j < lines.length; j++) {
      sum += +lines[j];
    }

    sums.push(sum);
  }

  const sortedSums = sums.sort((a, b) => a - b);
  const threeLargest = sortedSums.slice(-3);
  let sumOfThreeLargest = 0;

  for (let i = 0; i < threeLargest.length; i++) {
    sumOfThreeLargest += threeLargest[i];
  }

  return sumOfThreeLargest;
}

export const part1 = (file) => {
  return findLargestSum(file);
};

// À faire après
export const part2 = (file) => {
  return findSumOfThreeLargest(file);
};

console.log('Result 1', part1('../data.txt'));
