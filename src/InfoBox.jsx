import Card from '@mui/material/Card';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import "./InfoBox.css"

export default function InfoBox({ info }) {
    if (!info || !info.today || !info.yesterday || !info.tomorrow) return null;

    const getTheme = (day) => {
        if (day.humidity > 80) return { key: "rain", gradient: "gradRain", Icon: ThunderstormIcon };
        if (day.temp > 28) return { key: "hot", gradient: "gradHot", Icon: WbSunnyIcon };
        if (day.temp > 15) return { key: "mild", gradient: "gradMild", Icon: CloudIcon };
        return { key: "cold", gradient: "gradCold", Icon: AcUnitIcon };
    };

    const days = [
        { key: "yesterday", label: "Yesterday", data: info.yesterday },
        { key: "today", label: "Today", data: info.today },
        { key: "tomorrow", label: "Tomorrow", data: info.tomorrow },
    ];

    return (
        <div className="InfoBox">
            <h1 id="heading">Weather Forecast</h1>
            <div className="cardContainer">
                {days.map((day, index) => {
                    const theme = getTheme(day.data);
                    const { Icon } = theme;
                    return (
                        <Card
                            key={day.key}
                            className={`weatherCard ${theme.gradient} ${day.label === "Today" ? "activeCard" : ""}`}
                            style={{ animationDelay: `${index * 0.12}s` }}
                            elevation={0}
                        >
                            <div className="decor">
                                {theme.key === "rain" && (
                                    <>
                                        <span className="drop d1" />
                                        <span className="drop d2" />
                                        <span className="drop d3" />
                                        <span className="drop d4" />
                                    </>
                                )}
                                {theme.key === "hot" && <div className="sunGlow" />}
                                {(theme.key === "mild" || theme.key === "cold") && (
                                    <>
                                        <span className="cloud c1" />
                                        <span className="cloud c2" />
                                    </>
                                )}
                            </div>

                            <div className="cardTop">
                                <span className="dayChip">{day.label}</span>
                                <span className="locationRow">
                                    <LocationPinIcon fontSize="inherit" /> {day.data.city}
                                </span>
                            </div>

                            <div className="heroRow">
                                <Icon className={`weatherIcon icon-${theme.key}`} />
                                <div className="heroTemp">
                                    {day.data.temp}
                                    <span className="degSym">&deg;</span>
                                </div>
                            </div>

                            <div className="conditionText">{day.data.weather}</div>

                            <div className="statRow">
                                <div className="statChip">
                                    <ThermostatIcon fontSize="inherit" />
                                    <span>Feels {day.data.feelsLike}&deg;</span>
                                </div>
                                <div className="statChip">
                                    <WaterDropIcon fontSize="inherit" />
                                    <span>{day.data.humidity}%</span>
                                </div>
                            </div>

                            <div className="minMaxRow">
                                <span className="minMaxItem">↓ {day.data.tempMin}&deg;</span>
                                <div className="minMaxBar">
                                    <div className="minMaxFill" style={{ left: "10%", width: "80%" }} />
                                </div>
                                <span className="minMaxItem">↑ {day.data.tempMax}&deg;</span>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}