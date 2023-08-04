class Robot {
  constructor(battery) {
    this.position = [0, 0];
    this.battery = battery;
  }

  logBattery() {
    let battery = '';
    let copyBattery = this.battery;

    for (let i = 0; i < 10; i++) {
      battery += copyBattery > 0 ? '🟩' : '🟥';
      copyBattery -= 10;
    }

    console.log(battery);
  }
}

// 🦁 Créer une class Piece
// - Utilise `constructor` pour ajouter la propriété `state`
// - Ajoute une méthode `getEmoji` qui va retourner un emoji en fonction de l'état
//   * `clean` => 🧼
//   * `clean_by_robot` => 🧽
//   * `dirty` => 💩
class Piece {
  /**
   *
   * @param {"clean" | "dirty" | "clean_by_robot"} state
   */
  constructor(state) {
    this.state = state;
  }

  getEmoji() {
    if (this.state === 'clean') {
      return '🧼';
    }

    if (this.state === 'clean_by_robot') {
      return '🧽';
    }

    return '💩';
  }
}

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

class House {
  /**
   *
   * @param {Piece[][]} layout
   * @param {Robot} robot
   */
  constructor(layout, robot) {
    this.layout = layout;
    this.robot = robot;
  }

  logHouse() {
    const layoutString = this.layout.map((row, i) => {
      return row.map((piece, j) => {
        return piece.getEmoji();
      });
    });
  }
}

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
