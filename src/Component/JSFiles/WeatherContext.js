import React, { useState, createContext, useEffect } from 'react'
import axios from 'axios';

export const WeatherContext = createContext();

export function WeatherContextWrapper({ children }) {
    const [weatherData, updateWeatherData] = useState({})
    const [state, updateState] = useState(false)

    useEffect(async () => {

        await axios('https://api.ipgeolocation.io/ipgeo?apiKey=b80e6e3d2bd7455db18973734658c0d6')
            .then(({ data }) => {
                axios.get(`https://api.weatherapi.com/v1/forecast.json?key=b62e36f1e34345028c3164050202612&q=${data.city.slice(0, data.city.indexOf(' '))}&days=10`)
                    .then(response => {
                        updateWeatherData(response.data);
                        updateState(true);
                    })
            })
            .catch(err => console.log(err))

    }, [])

    return (
        <>
            {
                state ?
                    <WeatherContext.Provider value={[weatherData, updateWeatherData]} >
                        {children}
                    </WeatherContext.Provider>
                    :
                    <>

                    </>

            }
        </>
    )
}


