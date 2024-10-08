interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

export const calculateExercises = (exercise_array: number[], target: number): Result => {
  const resultObj: Result = {
    periodLength: exercise_array.length,
    trainingDays: 0,
    success: false,
    rating: 0,
    ratingDescription: "",
    target: target,
    average: 0
  };

  const totalHours = exercise_array.reduce((prev, cur) => prev + cur, 0);
  resultObj.trainingDays = exercise_array.reduce((prev, cur) => prev + (cur > 0 ? 1 : 0), 0);
  resultObj.success = exercise_array.reduce((prev, cur) => prev + (cur >= target ? 1 : 0), 0)
                      == exercise_array.length;

  resultObj.rating = resultObj.trainingDays / exercise_array.length;
  if (resultObj.rating < 0.34) {
    resultObj.ratingDescription = "Keep going at it, don't be discouraged!";
    resultObj.rating = 1;
  } else if (resultObj.rating < 0.68) {
    resultObj.ratingDescription = "Nice! You are on a good rhytm!";
    resultObj.rating = 2;
  } else {
    resultObj.ratingDescription = "You're rocking it! Keep at it!";
    resultObj.rating = 3;
  }

  resultObj.average = totalHours / exercise_array.length;

  return resultObj;
};

// const inp = process.argv.slice(2);

// if (inp.length < 2) {
//   console.log("Insufficient arguments");
//   process.exit(1);
// }

// try {
//   console.log(calculateExercises(inp.slice(1).map(Number), Number(inp[0])));
// } catch (e) {
//   if (e instanceof Error) {
//     console.log("Error: ", e.message);
//   }
// }


// console.log(calculateExercises([3,0,2,4.5,0,3,1], 2));