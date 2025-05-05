import axios from 'axios';

const API_KEY = '31e1fa9e68322d1bd36a9a7568f69106'; 
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';

export const getWeather = async (lat, lon) => {
  try {
    const res = await axios.get(`${BASE_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
    return res.data;
  } catch (err) {
    console.log('Weather API error:', err.message);
    throw err;
  }
};

export const getWeatherByCity = async (city) => {
  try {
    const res = await axios.get(`${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`);
    return res.data;
  } catch (err) {
    console.log('City Weather API error:', err.message);
    throw err;
  }
};
