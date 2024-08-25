import { useEffect, useState } from 'react';
import axios from 'axios';
import diaryService from './services/diaryService';

import { DiaryEntry, NewDiaryEntry } from './types';

import toNewDiaryEntry from './utils';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('sunny');
  const [visibility, setVisibility] = useState('ok');
  const [comment, setComment] = useState('');

  const [weatherBeingChosen, setWeatherBeingChosen] = useState(false);
  const [visibilityBeingChosen, setVisibilityBeingChosen] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    diaryService.getDiaries().then((diaries) => {
      setDiaries(diaries);
    });
  }, []);

  const handleWeatherChange = (weather: string) => {
    setWeather(weather);
    setWeatherBeingChosen(false);
  };

  const handleVisibilityChange = (visibility: string) => {
    setVisibility(visibility);
    setVisibilityBeingChosen(false);
  };

  const submitDiary = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // debugger;
      const newDiary = toNewDiaryEntry({
        date,
        weather,
        visibility,
        comment,
      });

      await diaryService.addDiary(newDiary);
      const updatedDiaries = await diaryService.getDiaries();
      setDiaries(updatedDiaries);

      setDate('');
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

  return (
    <div data-theme="light" className="min-h-screen">
      <h1 className="text-4xl font-bold mt-4 mb-2 text-primary">
        Flight Search
      </h1>
      <ul>
        {diaries.map((diary: any) => (
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
            type="text"
            className="border border-neutral mb-3"
            id="date"
            name="date"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="weather" className="mr-4 text-2xl">
            Weather
          </label>
          <div className="dropdown mb-2">
            <div
              tabIndex={0}
              role="button"
              className="btn m-1"
              onClick={() => setWeatherBeingChosen(!weatherBeingChosen)}
            >
              {weather}
            </div>
            {weatherBeingChosen && (
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
              >
                {['sunny', 'rainy', 'cloudy', 'stormy', 'windy'].map((item) => (
                  <li
                    key={item}
                    onClick={() => handleWeatherChange(item)}
                    className={`${
                      weather === item ? 'bg-secondary text-white' : ''
                    }`}
                  >
                    <a>{item}</a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="visibility" className="mr-4 text-2xl">
            Visibility
          </label>
          <div className="dropdown mb-2">
            <div
              tabIndex={0}
              role="button"
              className="btn m-1"
              onClick={() => setVisibilityBeingChosen(!visibilityBeingChosen)}
            >
              {visibility}
            </div>
            {visibilityBeingChosen && (
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
              >
                {['great', 'good', 'ok', 'poor'].map((item) => (
                  <li
                    key={item}
                    onClick={() => handleVisibilityChange(item)}
                    className={
                      visibility === item ? 'bg-secondary text-white' : ''
                    }
                  >
                    <a>{item}</a>
                  </li>
                ))}
              </ul>
            )}
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
