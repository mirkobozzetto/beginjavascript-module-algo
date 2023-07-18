import { House, Robot, createLayout } from './solutions/4.js';

const times = [];

const tryCount = 1000;

for (let i = 0; i < tryCount; i++) {
  const start = Date.now();

  const houseSize = [10, 10];

  let house = new House(createLayout(houseSize));
  let robot = new Robot();
  let timeCount = 0;
  console.log({ tryCount, i });

  while (!house.isAllClean()) {
    console.clear();
    console.log(`Current try :`, i);
    // robot.showBattery();
    // house.showLayout(robot);
    timeCount += 1;

    robot.doWork(house);

    // await new Promise((resolve) => setTimeout(resolve, 1));
  }

  times.push({
    timeCount: timeCount,
    time: Date.now() - start,
  });
}

const averageTime = times.reduce((acc, time) => acc + time.time, 0) / tryCount;
const averageTimeCount =
  times.reduce((acc, time) => acc + time.timeCount, 0) / tryCount;

console.log({
  averageTime,
  averageTimeCount,
});
