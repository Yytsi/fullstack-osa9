import { CoursePart } from '../types';
import Part from './Part';

const content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map((part, i) => {
        return <Part key={i} part={part} />;
      })}
    </div>
  );
};

export default content;
