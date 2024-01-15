import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const currentFilePath = fileURLToPath(import.meta.url);
export const currentDirPath = dirname(currentFilePath);

function readFileContent(file) {
  const p = join(currentDirPath, file);
  const fileContent = fs.readFileSync(p).toString();
  return fileContent;
}

const findLargestSum = (file) => {
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
};

export const part1 = (file) => {
  return findLargestSum(file);
};

// À faire après
export const part2 = (file) => {
  // 🦁 Pour la partie 2, utilise la fonction ici
  return 0;
};

// Should be 24000
console.log('Test part1', part1('./data.txt'));

// Should be 212117
console.log('Test part1', part2('./data.txt'));
