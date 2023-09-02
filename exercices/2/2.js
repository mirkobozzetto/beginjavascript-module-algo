// 🦁 Crée une classe Robot
// - Utilise `constructor` pour ajouter les propriétés `battery` et `position`
// - Crée une méthode `logBattery`
//   - Pour afficher la batterie tu peux utiliser cette méthode :
//     On va copier la battery dans une variable `batteryCopy` et créer une boucle qui va de 0 à 10,
//     On va créer une variable batterie qui va être égale à une string vide
//     ensuite si la battery est supérieure à 0, on ajoute un carré vert
//     sinon un carré rouge
//     puis on vient décrémenter la batteryCopy de 10

// 🦁 Crée une classe Piece
// - Utilise `constructor` pour ajouter la propriété `state`
// - Ajoute une méthode `getEmoji` qui va retourner un emoji en fonction de l'état
//   * `clean` => 🧼
//   * `clean_by_robot` => 🧽
//   * `dirty` => 💩

// 🦁 Crée une classe House
//   - Elle prend en propriétés `layout` qui correspond à un tableau de tableau de pièces
//   - Elle prend aussi le robot
// Quand tu récupères ces propriétés, il faut les assigner à `this`:
// 💡 this.layout = layout;
// Crée une fonction `logLayout`
//   - Elle va afficher le layout de la maison
//   - Pour afficher le layout tu peux utiliser cette méthode :
//   On va créer une variable `layoutString` qui vient `.map` sur le layout
//    Dans le .map, pour chaque `row` on va refaire `.map` pour chaque `piece`
//    Si la coordonnée de la pièce correspond à l'endroit du robot, on retourne l'émoji du robot
//    Sinon on retourne l'émoji de la pièce
//   Ensuite on `.join` les pièces de la ligne
//   Et on `.join` les lignes avec des retours à la ligne
//   💡 .join("\n")

// 🦁 Finalement crée une fonction `createLayout` qui prend en paramètre x et y
// Cette fonction va générer un layout de x par y pièces
//  Pour cela on va créer un tableau vide `layout`
//  On va créer une boucle qui va de 0 à x
//   Dans cette boucle on va créer un tableau vide `row`
//   On va créer une boucle qui va de 0 à y
//     Dans cette boucle on va créer une pièce
//     En utilisant Math.random() on va générer un nombre aléatoire entre 0 et 1
//     Si le nombre est inférieur à 0.5 on va créer une pièce `clean` sinon `dirty`

// 🦁 Crée une fonction `play`
//    - Crée un robot
//      💡 const robot = new Robot();
//    - Crée une maison
//      💡 const house = new House(createLayout(5,5), robot);
//    - Log la batterie du robot
//      💡 robot.logBattery();
//    - Log la maison
//      💡 house.logLayout();

// 🦁 Appelle `play`
