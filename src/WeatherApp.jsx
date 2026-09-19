import { useState } from "react";
import SearchBox from "./SearchBox"
import InfoBox from "./InfoBox"

const emptyDay = {
    city: "---",
    feelsLike: 0,
    temp: 0,
    tempMin: 0,
    tempMax: 0,
    humidity: 0,
    weather: "--",
};

export default function WeatherApp(){
    const [weatherInfo, setWeatherInfo] = useState({
        yesterday: emptyDay,
        today: emptyDay,
        tomorrow: emptyDay,
    });

    let updateInfo = (newInfo) => {
        setWeatherInfo(newInfo);
    };

    return(
        <div style={{ textAlign: "center", minHeight: "100vh", paddingBottom: "40px" }}>
            <SearchBox updateInfo={updateInfo}/>
            <InfoBox info={weatherInfo}/>
            <h2 style={{ color: "#1a1a2e" }}>Weather App By Jishan</h2>
        </div>
    );
}