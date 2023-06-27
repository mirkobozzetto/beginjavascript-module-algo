const fs = require('fs');
const path = require('path');

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

export const part1 = (file) => {
  return findLargestSum;
};

// À faire après
export const part2 = (file) => {
  return 0;
};

console.log('Result 1', part1('../data.txt'));
