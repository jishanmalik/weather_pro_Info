import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import "./SearchBox.css"
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

const weatherCodeMap = {
    0: "Clear sky", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
    45: "Fog", 48: "Depositing rime fog",
    51: "Light drizzle", 53: "Moderate drizzle", 55: "Dense drizzle",
    61: "Slight rain", 63: "Moderate rain", 65: "Heavy rain",
    71: "Slight snow", 73: "Moderate snow", 75: "Heavy snow",
    80: "Rain showers", 81: "Moderate showers", 82: "Violent showers",
    95: "Thunderstorm", 96: "Thunderstorm with hail", 99: "Severe thunderstorm",
};
const describeWeather = (code) => weatherCodeMap[code] || "Unknown";

export default function SearchBox({ updateInfo }) {
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);

    let getWeatherInfo = async (cityName) => {
        let geoRes = await fetch(`${GEO_URL}?name=${encodeURIComponent(cityName)}&count=1`);
        let geoData = await geoRes.json();

        if (!geoData.results || geoData.results.length === 0) {
            throw new Error("City not found");
        }
        const { latitude, longitude, name, country } = geoData.results[0];

        let weatherRes = await fetch(
            `${WEATHER_URL}?latitude=${latitude}&longitude=${longitude}` +
            `&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,relative_humidity_2m_mean,weathercode` +
            `&past_days=1&forecast_days=2&timezone=auto`
        );
        let weatherData = await weatherRes.json();
        const daily = weatherData.daily;

        if (!daily || !daily.temperature_2m_max || daily.temperature_2m_max.length < 3) {
            throw new Error("Incomplete weather data");
        }

        const buildDay = (index) => ({
            city: `${name}, ${country}`,
            temp: Math.round((daily.temperature_2m_max[index] + daily.temperature_2m_min[index]) / 2),
            tempMin: Math.round(daily.temperature_2m_min[index]),
            tempMax: Math.round(daily.temperature_2m_max[index]),
            feelsLike: Math.round(daily.apparent_temperature_max[index]),
            humidity: Math.round(daily.relative_humidity_2m_mean[index]),
            weather: describeWeather(daily.weathercode[index]),
        });

        return {
            yesterday: buildDay(0),
            today: buildDay(1),
            tomorrow: buildDay(2),
        };
    };

    let handleChange = (event) => setCity(event.target.value);

    let handleSubmit = async (event) => {
        event.preventDefault();
        const searchedCity = city.trim();
        if (!searchedCity) return;

        setLoading(true);
        setError(false);
        try {
            let newInfo = await getWeatherInfo(searchedCity);
            updateInfo(newInfo);
            setCity("");
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='SearchBox'>
            <h3>Search for the weather</h3>
            <form onSubmit={handleSubmit} className="searchForm">
                <TextField
                    id="city" label="Enter city name" variant="outlined" required
                    value={city} onChange={handleChange} error={error}
                    disabled={loading} fullWidth className="cityInput"
                />
                <Button
                    variant="contained" type="submit" size="large"
                    disabled={loading || !city.trim()} className="searchBtn"
                    endIcon={!loading && <SearchIcon />}
                >
                    {loading ? <CircularProgress size={22} color="inherit" /> : "Search"}
                </Button>
            </form>
            {error && <p className="errorText">No such place exists! Try another city.</p>}
        </div>
    );
}