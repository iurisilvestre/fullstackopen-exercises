/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import countriesService from "../services/countries";

function Country({ country }) {
    const [weather, setWeather] = useState([]);

    useEffect(() => {
        countriesService
            .getWeather(country.latlng)
            .then((response) => {
                setWeather([...weather, response]);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>capital: {country.capital}</p>
            <p>area: {country.area}</p>
            <p>
                <strong>languages:</strong>
            </p>
            <ul>
                {Object.values(country.languages).map((lang, i) => (
                    <li key={i}>{lang}</li>
                ))}
            </ul>
            <img
                src={country.flags.png}
                alt={country.flags.alt}
                style={{ width: "100px" }}
            />
            {weather.length > 0 && (
                <>
                    <h2>Weather in {country.name.common}</h2>
                    <p>
                        temperature {Math.trunc(weather[0].current.temp)}{" "}
                        Celcius
                    </p>
                    <img
                        src={`https://openweathermap.org/img/wn/${weather[0].current.weather[0].icon}@2x.png`}
                        alt=""
                    />
                    <p>wind {weather[0].current.wind_speed} m/s</p>
                </>
            )}
        </div>
    );
}

export default Country;
