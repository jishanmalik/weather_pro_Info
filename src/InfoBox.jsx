import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import Typography from '@mui/material/Typography';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import SunnyIcon from '@mui/icons-material/Sunny';
import "./InfoBox.css"



export default function InfoBox({info}){
    if (!info) return null;

    const INIT_URL ="https://images.unsplash.com/photo-1722858343990-1604f540c15d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHVzdHklMjB3ZWF0aGVyfGVufDB8fDB8fHww";
    const HOT_URL="https://plus.unsplash.com/premium_photo-1733306531071-087c077e1502?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c3VubnklMjB3ZWF0aGVyfGVufDB8fDB8fHww";
    const COLD_URL="https://images.unsplash.com/photo-1612208695882-02f2322b7fee?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29sZCUyMHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D";
    const RAIN_URL="https://images.unsplash.com/photo-1493314894560-5c412a56c17c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFpbnklMjB3ZWF0aGVyfGVufDB8fDB8fHww";

    return(
        <div className="InfoBox">
            <h1>Weather Info</h1>

            <div className="cardContainer">
            <Card sx={{  width:"100%" ,maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 160 }}
        image={info.humidity>80?RAIN_URL:info.temp>15?HOT_URL:COLD_URL}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        <LocationPinIcon/> &nbsp;
         {info.city}
         {" "}
         &nbsp;&nbsp;
          {info.humidity > 80 ? (
            <ThunderstormIcon/>
            ) : info.temp>15?(
            <SunnyIcon/>
            ) : (
            <AcUnitIcon/>
            )}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} component={"span"}>
          <p>  Temprature = {info.temp}&deg;C </p>
          <p>Feels Like = {info.feelsLike}&deg;C </p>
          <p> Minimum Temprature = {info.tempMin}&deg;C </p>
          <p> Maximum Temprature = {info.tempMax}&deg;C </p>
          <p> Humidity = {info.humidity} </p>
          <p>  Weather = {info.weather} </p>
        </Typography>
      </CardContent>
    </Card>
    </div>
        </div>
    );
}