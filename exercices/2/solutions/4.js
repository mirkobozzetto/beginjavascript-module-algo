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

  checkBattery() {
    if (this.battery <= 0) {
      console.log('🔋 épuisée. Retour à la station de recharge.');
      this.position = [0, 0];
      this.battery = 100;
      console.log('🔋 chargée. Prêt à reprendre le nettoyage.');
      return true;
    }
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
    this.battery -= 5;
    console.log(
      `🧹 Nettoyage de la position ${this.position}. État de la batterie: ${this.battery}%`
    );

    house.clean(this.position);

    this.checkBattery();
  }

  /**
   *
   * @param {House} house
   */
  doWork(house) {
    const nearestDirtyPiece = house.nearestDirtyPiece();
    if (!nearestDirtyPiece) {
      console.log('🤖 a terminé le nettoyage.');
      return false;
    }

    const robotPosition = this.position;
    const deltaX = nearestDirtyPiece[0] - robotPosition[0];
    const deltaY = nearestDirtyPiece[1] - robotPosition[1];

    if (deltaX === 0 && deltaY === 0) {
      this.clean(house);
    }

    if (deltaX > 0) {
      this.move(1, 0);
    } else if (deltaX < 0) {
      this.move(-1, 0);
    } else if (deltaY > 0) {
      this.move(0, 1);
    } else if (deltaY < 0) {
      this.move(0, -1);
    }

    return true;
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

  get isDirty() {
    return this.state === 'dirty';
  }

  get isClean() {
    return this.state === 'clean' || this.state === 'clean_by_robot';
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

  nearestDirtyPiece() {
    const position = this.robot.position;

    // check if the robot is on a dirty piece
    if (this.layout[position[0]][position[1]].isDirty) {
      return position;
    }

    let nearestDirtyPiece = null;
    let nearestDistance = null;
    for (let i = 0; i < this.layout.length; i++) {
      for (let j = 0; j < this.layout[i].length; j++) {
        if (this.layout[i][j].isDirty) {
          const distance = Math.abs(position[0] - i) + Math.abs(position[1] - j);

          if (nearestDistance === null || distance < nearestDistance) {
            nearestDistance = distance;
            nearestDirtyPiece = [i, j];
          }
        }
      }
    }

    return nearestDirtyPiece;
  }

  isAllClean() {
    return !this.layout.some((row) => row.some((piece) => piece.isDirty));
  }

  clean(position) {
    const [x, y] = position;
    this.layout[x][y].clean();
  }

  logLayout() {
    for (let i = 0; i < this.layout.length; i++) {
      let row = '';
      for (let j = 0; j < this.layout[i].length; j++) {
        if (
          this.robot &&
          this.robot.position[0] === i &&
          this.robot.position[1] === j
        ) {
          row += '🤖';
        } else {
          row += this.layout[i][j].getEmoji();
        }
      }
      console.log(row);
    }
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

const play = () => {
  const houseSize = [10, 10];

  let robot = new Robot();
  let house = new House(createLayout(houseSize), robot);
  let time = 0;
  let speed = 200;

  const workInterval = setInterval(() => {
    console.clear();
    robot.logBattery();
    house.logLayout();
    time += 1;

    if (!house.isAllClean() && robot.doWork(house)) {
      return;
    }

    clearInterval(workInterval);
    console.log(`🤖 a terminé le nettoyage en ${time} fois.`);
  }, speed);
};

play();
