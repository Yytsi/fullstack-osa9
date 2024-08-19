type CoursePart = {
  name: string;
  exerciseCount: number;
};

const content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map((part, i) => {
        return (
          <p key={i}>
            {part.name} {part.exerciseCount}
          </p>
        );
      })}
    </div>
  );
};

export default content;
