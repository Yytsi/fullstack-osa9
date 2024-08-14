const calculateBmi = (height: number, mass: number): string => {
  const bmi = mass / (height / 100) ** 2;
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi < 25) {
    return "Normal range";
  } else if (bmi < 30) {
    return "Overweight";
  } else {
    return "Obese";
  }
};

// take from CLI

try {
  const height = Number(process.argv[2]);
  const mass = Number(process.argv[3]);

  console.log(calculateBmi(height, mass));
} catch (e) {
  if (e instanceof Error) {
    console.log("Error: ", e.message);
  }
}
