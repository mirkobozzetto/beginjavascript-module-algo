// 🦁 Créer une class Robot
// - Utilise `constructor` pour ajouter les prorpritésé `battery` et `position`
// - Créer une méthode `logBattery`
//   - Pour affiché la batterie tu peux utiliser cette méthode :
//     On va copié la battery dans une variable `batteryCopy` et créer une boucle qui va de 0 à 10,
//     On va créer une variable batterie qui va être égale à une string vide
//     ensuite si la battery est supérieur à 0, on ajoute un carré vert
//     sinon un carré rouge
//     puis on vient décrémenter la batteryCopy de 10

// 🦁 Créer une class Piece
// - Utilise `constructor` pour ajouter la propriété `state`
// - Ajoute une méthode `getEmoji` qui va retourner un emoji en fonction de l'état
//   * `clean` => 🧼
//   * `clean_by_robot` => 🧽
//   * `dirty` => 💩

/**

Afin de typer `State` on peut utiliser de la JSDoc : 

/**
 * @param {"clean" | "dirty" | "clean_by_robot"} state
 *

Pour l'utiliser il suffit de tapper `/**` et de valider avec `tab`
Ensuite tu pourras ajouter le type de `state` en utilisant `|` entre chaque possibilité
VSCode comprendras que `state` ne peut être que `clean`, `dirty` ou `clean_by_robot`

 */

// 🦁 Créer une class House
//   - Elle prends en propritétés `layout` qui corerspond à un tableau de tableau de pièces
//   - Elle prends aussi le robot
// Quand tu récupères ces propriétés, il faut les assignées à `this`:
// 💡 this.layout = layout;
// Créer une function `logLayout`
//   - Elle va afficher le layout de la maison
//   - Pour afficher le layout tu peux utiliser cette méthode :
//   On va créer une variable `layoutString` qui viens `.map` sur le layout
//    Dans le .map, pour chaque `row` on va refaire `.map` pour chaque `piece`
//    Si la coordonées de la pièce correspond à l'endroit du robot, on return l'émoji du robot
//    Sinon on retourne l'émoji de la pièce
//   Ensuite on `.join` les pièces de la ligne
//   Et on `.join` les lignes avec des retours à la ligne
//   💡 .join("\n")

// 🦁 Finalement créer une function `createLayout` qui prends en paramètre x et y
// Cette function va générer un layout de x par y pièces
//  Pour cela on va créer un tableau vide `layout`
//  On va créer une boucle qui va de 0 à x
//   Dans cette boucle on va créer un tableau vide `row`
//   On va créer une boucle qui va de 0 à y
//     Dans cette boucle on va créer une pièce
//     En utilisant Math.random() on va générer un nombre aléatoire entre 0 et 1
//     Si le nombre est inférieur à 0.5 on va créer une pièce `clean` sinon `dirty`

// 🦁 Créer une function `play`
//    - Créer un robot
//      💡 const robot = new Robot();
//    - Créer une maison
//      💡 const house = new House(createLayout(5,5), robot);
//    - Log la batterie du robot
//      💡 robot.logBattery();
//    - Log la maison
//      💡 house.logLayout();

// 🦁 Appel `play`
