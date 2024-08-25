import { useEffect, useState } from 'react';
import axios from 'axios';
import diaryService from './services/diaryService';

import { DiaryEntry } from './types';

import toNewDiaryEntry from './utils';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState('');
  const [comment, setComment] = useState('');
  const [weather, setWeather] = useState('sunny');
  const [visibility, setVisibility] = useState('ok');

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    diaryService.getDiaries().then((diaries) => {
      setDiaries(diaries);
    });
  }, []);

  const submitDiary = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const newDiary = toNewDiaryEntry({
        date,
        weather,
        visibility,
        comment,
      });

      await diaryService.addDiary(newDiary);
      const updatedDiaries = await diaryService.getDiaries();
      setDiaries(updatedDiaries);

      setWeather('sunny');
      setVisibility('ok');
      setComment('');
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        let msg = e.response?.data;
        if (typeof msg === 'string' || msg instanceof String) {
          msg = msg.replace(/^Something went wrong\. /, '');
        }
        setErrorMessage(msg);
        setTimeout(() => {
          setErrorMessage('');
        }, 5000);
      } else if (e instanceof Error) {
        setErrorMessage(e.message);
        setTimeout(() => {
          setErrorMessage('');
        }, 5000);
      }
    }
  };

  const handleVisibilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVisibility(e.target.value);
  };

  const handleWeatherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeather(e.target.value);
  };

  return (
    <div data-theme="light" className="min-h-screen">
      <h1 className="text-4xl font-bold mt-4 mb-2 text-primary">
        Flight Search
      </h1>
      <ul>
        {diaries.map((diary) => (
          <li key={diary.id} className="text-neutral">
            {diary.date}, {diary.weather} weather, {diary.visibility}{' '}
            visibility: {diary.comment}
          </li>
        ))}
      </ul>

      <h2 className="text-2xl text-secondary">Add a new entry to the diary</h2>
      {errorMessage && <div className="text-red-600">{errorMessage}</div>}
      <form onSubmit={(e) => submitDiary(e)}>
        <div>
          <label htmlFor="date" className="mr-4 text-2xl">
            Date
          </label>
          <input
            type="date"
            id="date"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="weather" className="mr-4 text-2xl">
            Weather
          </label>
          <input
            type="radio"
            name="weather"
            id="sunny"
            value="sunny"
            onChange={handleWeatherChange}
          />
          <label htmlFor="sunny" className="mr-4 ml-1">
            Sunny
          </label>
          <input
            type="radio"
            name="weather"
            id="rainy"
            value="rainy"
            onChange={handleWeatherChange}
          />
          <label htmlFor="rainy" className="mr-4 ml-1">
            Rainy
          </label>
          <input
            type="radio"
            name="weather"
            id="cloud"
            value="cloudy"
            onChange={handleWeatherChange}
          />
          <label htmlFor="cloud" className="mr-4 ml-1">
            Cloudy
          </label>
          <input
            type="radio"
            name="weather"
            id="stormy"
            value="stormy"
            onChange={handleWeatherChange}
          />
          <label htmlFor="stormy" className="mr-4 ml-1">
            Stormy
          </label>
          <input
            type="radio"
            name="weather"
            id="windy"
            value="windy"
            onChange={handleWeatherChange}
          />
          <label htmlFor="windy" className="mr-4 ml-1">
            Windy
          </label>
        </div>

        <div>
          <div>
            <label htmlFor="visibility" className="mr-4 text-2xl">
              Visibility
            </label>
            <input
              type="radio"
              name="visibility"
              id="great"
              value="great"
              onChange={handleVisibilityChange}
            />
            <label htmlFor="great" className="mr-4 ml-1">
              Great
            </label>
            <input
              type="radio"
              name="visibility"
              id="good"
              value="good"
              onChange={handleVisibilityChange}
            />
            <label htmlFor="good" className="mr-4 ml-1">
              Good
            </label>
            <input
              type="radio"
              name="visibility"
              id="ok"
              value="ok"
              onChange={handleVisibilityChange}
            />
            <label htmlFor="ok" className="mr-4 ml-1">
              Ok
            </label>
            <input
              type="radio"
              name="visibility"
              id="poor"
              value="poor"
              onChange={handleVisibilityChange}
            />
            <label htmlFor="poor" className="mr-4 ml-1">
              Poor
            </label>
          </div>
        </div>
        <div>
          <label htmlFor="comment" className="mr-4 text-2xl">
            Comment
          </label>
          <input
            type="text"
            className="border border-neutral mb-3"
            id="comment"
            name="comment"
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-accent btn-outline btn-wide ml-4 btn-circle"
        >
          Add to diary
        </button>
      </form>
    </div>
  );
};

export default App;
