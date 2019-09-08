import axios from 'axios';

axios.defaults.headers = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'};
const API_URL = 'https://api.openweathermap.org';
const APPKEY = 'a9e802ed8c97264e358e698ce0f5571c';
export default {
    async getWeatherByCity(city) {
        return await fetch(`${API_URL}/data/2.5/weather?q=${city}&units=metric&appid=${APPKEY}`)
        .then(res =>  {
            if(res.status != 200) throw new Error(res.message)
            return res.json();
        })
        .then( json => {
            // console.log(json)
            if(json.weather.length > 0) return json.weather[0].main;
            else return "";
        })
        .catch(error => {
            return "";
        });
    }
};