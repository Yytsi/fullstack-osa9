interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (exercise_array: number[], target: number): Result => {
  let resultObj: Result = {
    periodLength: exercise_array.length,
    trainingDays: 0,
    success: false,
    rating: 0,
    ratingDescription: "",
    target: target,
    average: 0
  };

  let totalHours = exercise_array.reduce((prev, cur) => prev + cur, 0);
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
}

console.log(calculateExercises([3,0,2,4.5,0,3,1], 2));