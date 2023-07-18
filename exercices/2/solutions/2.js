export class Robot {
  constructor() {
    this.position = [0, 0];
    this.battery = 100;
  }

  /**
   *
   * @param {Number} x position x
   * @param {Number} y position y
   */
  move(x, y) {
    if (this.checkBattery()) return;

    if (x > Math.abs(1) || y > Math.abs(1)) {
      console.log("🤖 ne peut pas se déplacer de plus d'une case à la fois.");
      return;
    }

    this.battery -= 1;
    this.position = [this.position[0] + x, this.position[1] + y];

    console.log(
      `🤖 se déplace vers la position ${this.position}. État de la batterie: ${this.battery}%`
    );
  }

  logBattery() {
    let batterie = '';
    let saveBattery = this.battery;
    // show 🟩 each 10% or 🟥 each 10% with no battery
    for (let i = 0; i < 10; i++) {
      if (saveBattery > 0) {
        batterie += '🟩';
      } else {
        batterie += '🟥';
      }
      saveBattery -= 10;
    }

    console.log(batterie);
  }

  /**
   *
   * @param {House} house
   */
  clean(house) {
    if (this.checkBattery()) return;
    this.battery -= 5;
    console.log(
      `🧹 Nettoyage de la position ${this.position}. État de la batterie: ${this.battery}%`
    );

    house.clean(this.position);
  }

  checkBattery() {
    if (this.battery <= 0) {
      console.log('🔋 épuisée. Retour à la station de recharge.');
      this.position = [0, 0];
      this.battery = 100;
      console.log('🔋 chargée. Prêt à reprendre le nettoyage.');
      return true;
    }
  }
}

// create a class named of a house piece
export class Piece {
  /**
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

  clean() {
    if (this.state !== 'dirty') return;
    this.state = 'clean_by_robot';
  }
}

export class House {
  /**
   *
   * @param {Piece[][]} layout
   * @param {Robot} robot
   */
  constructor(layout, robot) {
    this.layout = layout;
    this.robot = robot;
  }

  logLayout() {
    const layoutString = this.layout
      .map((row, i) => {
        return row
          .map((piece, j) => {
            if (
              this.robot &&
              this.robot.position[0] === i &&
              this.robot.position[1] === j
            ) {
              return '🤖';
            } else {
              return piece.getEmoji();
            }
          })
          .join('');
      })
      .join('\n');

    console.log(layoutString);
  }

  clean(position) {
    const [x, y] = position;
    this.layout[x]?.[y]?.clean();
  }
}

export const createLayout = (size) => {
  const houseLayout = [];

  for (let i = 0; i < size[0]; i++) {
    const row = [];

    for (let j = 0; j < size[1]; j++) {
      const random = Math.random();
      row.push(new Piece(random < 0.5 ? 'clean' : 'dirty'));
    }
    houseLayout.push(row);
  }
  return houseLayout;
};

const play = async () => {
  const houseSize = [5, 5];

  let robot = new Robot();
  let house = new House(createLayout(houseSize), robot);

  robot.logBattery();
  house.logLayout();

  let direction = 1;

  for (let i = 0; i < houseSize[0]; i++) {
    for (let j = 0; j < houseSize[1]; j++) {
      console.clear();

      robot.logBattery();
      house.logLayout();
      robot.move(direction, 0);
      robot.clean(house);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    robot.move(0, 1);
    direction = direction === 1 ? -1 : 1;
    robot.clean(house);
  }
};

play();
