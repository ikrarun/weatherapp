"use client";
import { useState } from "react";
import {getWeatherData,getPollutionData} from "./action";
import { LuSearch } from "react-icons/lu"
import Image from "next/image";

enum AQILabel {
    Good = 1,
    Fair = 2,
    Moderate = 3,
    Poor = 4,
    VeryPoor = 5,
  }
const PageData = ({
  data,
  cityname,
  pollution
}: {
  data: WeatherData;
  cityname: string;
  pollution:PollutionData | null | undefined;
}) => {
//   console.log(data);
  const [weatherData, setWeatherData] = useState<WeatherData>(data);
  const [cureent_pollution, setPollutionData] = useState<PollutionData | null | undefined>(pollution);
  const [city, setcity] = useState<string>(cityname);
  const imageLink ='https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  const [isPending, setisPending] = useState<boolean>(false);
  const getData = async () => {
    if(!city){
      return
    }
    setisPending(true);
    const data = await getWeatherData(city.toLowerCase());
    const pollutionData = await getPollutionData(data);
    setWeatherData(data);
    setPollutionData(pollutionData)
    setisPending(false);
  };

  return (
    <main className="text-white select-none w-full my-auto h-full flex flex-col gap-8 grow pt-12">
    <Image alt="" quality={90} objectFit='cover' className="select-none pointer-events-none"  fill={true} src={imageLink}/>
    <nav className="w-full z-[1000] mx-auto max-w-[900px] gap-3 shadow-md bg-black/40 rounded-md py-2 px-4 flex items-center justify-between">
      <input
        type="text"
        value={city}
        onChange={(e)=>setcity(e.target.value)}
        onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              getData();
            }
          }}
        className="grow bg-transparent text-md placeholder:text-gray-700/50 capitalize text-white caret-white outline-none ring-0"
        placeholder="eg. Lucknow"
      />
      <button onClick={(e)=>{
        e.preventDefault();
        getData();
      }} className="rounded-full pl-2 relative text-gray-300 p-1 h-8 aspect-square bg-black/70">
        <LuSearch />
      </button>
    </nav>
  
    
      {/* Conditional Rendering based on Data Availability */}
      {isPending && (
        <h1 className="font-semibold text-5xl animate-pulse">Loading...</h1>
      )}
      {!isPending && weatherData.cod==200 && (
        <div className="sm:grid flex flex-col-reverse gap-4 sm:gap-1 sm:grid-cols-2">
        <div className="relative flex w-full h-fit flex-col gap-3 justify-center self-center">
          <h1 className="font-semibold text-5xl">{`${weatherData.name}, ${weatherData.sys.country}` }</h1>
          <h1 className="font-semibold text-xl">
            {weatherData.main.temp.toFixed(0)}&deg;C
          </h1>
          <div className="font-semibold inline-flex gap-2 items-end">
            <h1 className='text-base'>Feels Like</h1>
            <h1 className='text-2xl'>
            {weatherData.main.feels_like.toFixed(0)}&deg;C
            </h1>
          </div>
          <div className="font-semibold inline-flex gap-2 items-end">
            <h1 className='text-base'>Humidity</h1>
            <h1 className='text-2xl'>
            {weatherData.main.humidity.toFixed(0)}
            </h1>
          </div>
          <div className="font-semibold inline-flex gap-2 items-end">
            <h1 className='text-base'>AQI</h1>
            <h1 className='text-2xl'>
            { cureent_pollution && AQILabel[cureent_pollution.list[0].main.aqi]}
            </h1>
          </div>
          
        </div>
        <div>
        <div className="w-full gap-3 h-32 sm:h-full flex flex-col items-start sm:items-center justify-center ">
          <div className='rounded-full aspect-square relative h-1/2 bg-[#708090]'>
          <Image fill={true} src={`https://openweathermap.org/img/wn/${getWeatherIcon(weatherData.weather[0].id)}@2x.png`} alt={"weather icons"}/>
          </div>
          <h1 className="text-3xl z-[1000] text-center font-semibold">
            {getWeatherDescription(weatherData.weather[0].id)}
            </h1>
         </div>
        </div>
        </div>
      )}
      {!isPending && weatherData.cod==404  && (
        
        <div className="relative flex w-full h-fit flex-col gap-3 justify-center self-center">
            {/* 
            //@ts-ignore  */}
          <h1 className="font-semibold text-3xl capitalize">{weatherData.message}</h1>
        </div>
      )}
    
  </main>
    );
};

export default PageData;



function getWeatherDescription(code: number): string {
  const weatherCodes: { [key: number]: string } = {
      // Group 2xx: Thunderstorm
      200: "Thunderstorm with light rain",
      201: "Thunderstorm with rain",
      202: "Thunderstorm with heavy rain",
      210: "Light thunderstorm",
      211: "Thunderstorm",
      212: "Heavy thunderstorm",
      221: "Ragged thunderstorm",
      230: "Thunderstorm with light drizzle",
      231: "Thunderstorm with drizzle",
      232: "Thunderstorm with heavy drizzle",

      // Group 3xx: Drizzle
      300: "Light intensity drizzle",
      301: "Drizzle",
      302: "Heavy intensity drizzle",
      310: "Light intensity drizzle rain",
      311: "Drizzle rain",
      312: "Heavy intensity drizzle rain",
      313: "Shower rain and drizzle",
      314: "Heavy shower rain and drizzle",
      321: "Shower drizzle",

      // Group 5xx: Rain
      500: "Light rain",
      501: "Moderate rain",
      502: "Heavy intensity rain",
      503: "Very heavy rain",
      504: "Extreme rain",
      511: "Freezing rain",
      520: "Light intensity shower rain",
      521: "Shower rain",
      522: "Heavy intensity shower rain",
      531: "Ragged shower rain",

      // Group 6xx: Snow
      600: "Light snow",
      601: "Snow",
      602: "Heavy snow",
      611: "Sleet",
      612: "Light shower sleet",
      613: "Shower sleet",
      615: "Light rain and snow",
      616: "Rain and snow",
      620: "Light shower snow",
      621: "Shower snow",
      622: "Heavy shower snow",

      // Group 7xx: Atmosphere
      701: "Mist",
      711: "Smoke",
      721: "Haze",
      731: "Sand whirls",
      741: "Fog",
      751: "Sand",
      761: "Dust",
      762: "Volcanic ash",
      771: "Squalls",
      781: "Tornado",

      // Group 800: Clear
      800: "Clear sky",

      // Group 80x: Clouds
      801: "Few clouds",
      802: "Scattered clouds",
      803: "Broken clouds",
      804: "Overcast clouds",
  };

  return weatherCodes[code] || "Unknown";
}


function getWeatherIcon(code: number): string {
  const weatherIcons: { [key: number]: string } = {
      // Group 2xx: Thunderstorm
      200: "11d",
      201: "11d",
      202: "11d",
      210: "11d",
      211: "11d",
      212: "11d",
      221: "11d",
      230: "11d",
      231: "11d",
      232: "11d",

      // Group 3xx: Drizzle
      300: "09d",
      301: "09d",
      302: "09d",
      310: "09d",
      311: "09d",
      312: "09d",
      313: "09d",
      314: "09d",
      321: "09d",

      // Group 5xx: Rain
      500: "10d",
      501: "10d",
      502: "10d",
      503: "10d",
      504: "10d",
      511: "13d",
      520: "09d",
      521: "09d",
      522: "09d",
      531: "09d",

      // Group 6xx: Snow
      600: "13d",
      601: "13d",
      602: "13d",
      611: "13d",
      612: "13d",
      613: "13d",
      615: "13d",
      616: "13d",
      620: "13d",
      621: "13d",
      622: "13d",

      // Group 7xx: Atmosphere
      701: "50d",
      711: "50d",
      721: "50d",
      731: "50d",
      741: "50d",
      751: "50d",
      761: "50d",
      762: "50d",
      771: "50d",
      781: "50d",

      // Group 800: Clear
      800: "01d",

      // Group 80x: Clouds
      801: "02d",
      802: "03d",
      803: "04d",
      804: "04d",
  };

  return weatherIcons[code] || "unknown-icon"; // Return "unknown-icon" for unknown codes
}