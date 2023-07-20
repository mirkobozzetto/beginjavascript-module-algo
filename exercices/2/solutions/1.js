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

const play = () => {
  const robot = new Robot();
  const house = new House(createLayout(5, 5), robot);

  robot.logBattery();
  house.logHouse();
};

play();
