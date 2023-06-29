const fs = require("fs");
const path = require("path");

const readFileContent = (file) => {
  const filePath = path.join(__dirname, file);
  const fileContent = fs.readFileSync(filePath).toString();
  return fileContent;
};

const findLargestSum = (file) => {
  // 🦁 Utilise readFileContent pour lire le fichier et stock dans une variable fileContent
  // 🦁 Trouve les lutins en utilisant `.split("\n\n")` dans notre liste
  // 🦁 Initialise une variable largestSum à 0
  // 🦁 Pour chaque lutin (boucle for)
  // 🦁   Trouve les calories en utilisant `.split("\n")` dans notre liste
  // 🦁   Initialise une variable sum à 0
  // 🦁   Pour chaque calorie (boucle for)
  // 🦁     Ajoute la calorie à la variable sum
  // 🦁   Si la variable sum est plus grande que la variable largestSum
  // 🦁     Mets la variable sum dans la variable largestSum
  // 🦁 Retourne la variable largestSum

  return 0;
};

export const part1 = (file) => {
  return findLargestSum(file);
};

// À faire après
export const part2 = (file) => {
  // 🦁 Pour la partie 2, utiliser la function ici
  return 0;
};

// Should be 24000
console.log("Test part1", part1("./data.txt"));

// Should be 212117
console.log("Test part1", part2("./data.txt"));
