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

  /**
   *
   * @param {House} house
   */
  doWork(house) {
    const nearestDirtyPiece = house.nearestDirtyPiece();

    if (!nearestDirtyPiece) {
      console.log('🤖 a terminé le nettoyage.');
      return;
    }

    const robotPosition = this.position;
    const deltaX = nearestDirtyPiece[0] - robotPosition[0];
    const deltaY = nearestDirtyPiece[1] - robotPosition[1];

    if (deltaX == 0 && deltaY === 0) {
      this.clean(house);
      return true;
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

class Piece {
  /**
   *
   * @param {"clean" | "dirty" | "clean_by_robot"} state
   */
  constructor(state) {
    this.state = state;
  }

  get isDirty() {
    return this.state === 'dirty';
  }

  get isClean() {
    return !this.isDirty;
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

  isClean() {
    return !this.layout.some((row) => row.some((piece) => piece.isDirty));
  }

  nearestDirtyPiece() {
    const position = this.robot.position;

    if (this.layout[position[0]][position[1]].isDirty) {
      return position;
    }

    let nearestDirtyPiece = null;
    let nearestDistance = null;

    for (let i = 0; i < this.layout.length; i++) {
      for (let j = 0; j < this.layout[i].length; j++) {
        if (this.layout[i][j].isClean) {
          continue;
        }
        const distance = Math.abs(position[0] - i) + Math.abs(position[1] - j);

        if (nearestDistance === null || distance < nearestDistance) {
          nearestDistance = distance;
          nearestDirtyPiece = [i, j];
        }
      }
    }
    return nearestDirtyPiece;
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
  const houseSize = [10, 10];
  const robot = new Robot();
  const house = new House(createLayout(houseSize[0], houseSize[1]), robot);

  let time = 0;
  const workInterval = setInterval(() => {
    console.clear();
    robot.logBattery();
    house.logHouse();
    time += 1;

    if (!house.isClean()) {
      robot.doWork(house);
      return;
    }

    clearInterval(workInterval);
    console.log(`🤖 a terminé le nettoyage en ${time} fois.`);
  }, 100);
};

play();
