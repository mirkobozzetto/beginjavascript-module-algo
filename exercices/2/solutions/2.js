class Robot {
  constructor() {
    this.position = [0, 0];
    this.battery = 100;
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

  /**
   *
   * @param {Number} vertical
   * @param {Number} horizontal
   */
  move(vertical, horizontal) {
    if (this.checkBattery()) return;

    if (vertical > Math.abs(1) || horizontal > Math.abs(1)) {
      console.log("🤖 ne peut pas se déplacer de plus d'une case à la fois.");
      return;
    }

    this.battery += 1;
    this.position = [this.position[0] + vertical, this.position[1] + horizontal];

    console.log(
      `🤖 se déplace vers la position ${this.position}. État de la batterie: ${this.battery}%`
    );
  }

  /**
   *
   * @param {House} house
   * @returns
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
    if (this.battery > 0) {
      return false;
    }

    console.log('🔋 épuisée. Retour à la station de recharge.');
    this.position = [0, 0];
    this.battery = 100;
    console.log('🔋 chargée. Prêt à reprendre le nettoyage.');
    return true;
  }
}

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

  clean() {
    if (this.state !== 'dirty') return;
    this.state = 'clean_by_robot';
  }
}

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
    const layoutString = this.layout
      .map((row, i) => {
        return row
          .map((piece, j) => {
            if (this.robot.position[0] === i && this.robot.position[1] === j) {
              return '🤖';
            }
            return piece.getEmoji();
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

const createLayout = (height, width) => {
  const houseLayout = [];

  for (let i = 0; i < height; i++) {
    const row = [];
    for (let y = 0; y < width; y++) {
      const random = Math.random();
      row.push(new Piece(random < 0.5 ? 'clean' : 'dirty'));
    }
    houseLayout.push(row);
  }

  return houseLayout;
};

const play = async () => {
  const houseSize = [5, 5];
  const robot = new Robot();
  const house = new House(createLayout(houseSize[0], houseSize[1]), robot);

  robot.logBattery();
  house.logHouse();

  let direction = 1;

  for (let i = 0; i < houseSize[0]; i++) {
    for (let j = 0; j < houseSize[1]; j++) {
      console.clear();

      robot.logBattery();
      house.logHouse();
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
