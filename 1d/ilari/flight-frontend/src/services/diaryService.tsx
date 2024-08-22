import axios from 'axios';
import { DiaryEntry } from '../types';

const getDiaries = async () => {
  const response = await axios.get<DiaryEntry[]>(
    'http://localhost:3000/api/diaries'
  );
  return response.data;
};

export default { getDiaries };
