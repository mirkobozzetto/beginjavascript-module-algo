export class Robot {
  constructor() {
    this.position = [0, 0];
    this.battery = 100;
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
  const houseSize = [5, 5];

  let robot = new Robot();
  let house = new House(createLayout(houseSize), robot);

  robot.logBattery();
  house.logLayout();
};

play();
