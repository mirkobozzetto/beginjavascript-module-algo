const last = {
  code: `const initialAmount = 1000;
  const lossPercentage = 5;
  let currentAmount = initialAmount;
  let days = 0;
  
  while (currentAmount > 0) {
    currentAmount -= (currentAmount * lossPercentage) / 100;
    days++;
  }
  
  console.log(days);`,
};

const timeout = (ms) =>
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout exceeded')), ms)
  );

const executeWithTimeout = async (code, timeoutDuration) => {
  try {
    const result = await Promise.race([eval(code), timeout(timeoutDuration)]);
    return result;
  } catch (error) {
    throw error; // ou vous pouvez traiter l'erreur comme vous le souhaitez
  }
};

const main = async () => {
  try {
    const result = await executeWithTimeout(last.code, 5000); // 5000ms = 5 secondes
    console.log(result);
  } catch (error) {
    console.error('Error during evaluation:', error.message);
  }
};

main();
