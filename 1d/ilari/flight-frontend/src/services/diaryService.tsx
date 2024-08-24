import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from '../types';

const getDiaries = async () => {
  const response = await axios.get<DiaryEntry[]>(
    'http://localhost:3000/api/diaries'
  );
  return response.data;
};

const addDiary = async (entry: NewDiaryEntry) => {
  const response = await axios.post<DiaryEntry>(
    'http://localhost:3000/api/diaries',
    entry
  );
  return response.data;
};

export default { getDiaries, addDiary };
