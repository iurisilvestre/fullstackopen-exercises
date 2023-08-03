import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const getAllCountries = () => {
    const request = axios.get(`${baseUrl}/all`);
    return request.then((response) => {
        return response.data;
    });
};

const getWeather = ([lat, lng]) => {
    console.log(import.meta.env.VITE_API_KEY);
    const request = axios.get(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&units=metric&appid=${
            import.meta.env.VITE_API_KEY
        }`
    );
    return request.then((response) => {
        return response.data;
    });
};

export default { getAllCountries, getWeather };
