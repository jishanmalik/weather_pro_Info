import { useState } from "react";
import SearchBox from "./SearchBox"
import InfoBox from "./InfoBox"
export default function WeatherApp(){
    const [weatherInfo,setWeatherInfo]= useState(
        {
            city:"---",
            feelsLike: .00,
            temp: .00,
            tempMin: .00,
            tempMax: .00,
            humidity: .00,
            weather:"--",
        });
        let updateInfo=(newInfo)=>{
            setWeatherInfo(newInfo);
        }

    return(
        <div style={{textAlign:"center"}}>
            <SearchBox updateInfo={updateInfo}/>
            <InfoBox info={weatherInfo}/>
            <h2>Weather App By Jishan</h2>
        </div>
    );
}