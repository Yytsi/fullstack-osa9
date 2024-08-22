import { useEffect, useState } from 'react';
import diaryService from './services/diaryService';

import { DiaryEntry } from './types';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getDiaries().then((diaries) => {
      setDiaries(diaries);
    });
  }, []);

  return (
    <div>
      <h1>Flight Search</h1>
      <ul>
        {diaries.map((diary: any) => (
          <li key={diary.id}>
            {diary.date}, {diary.weather} weather, {diary.visibility}{' '}
            visibility: {diary.comment}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
