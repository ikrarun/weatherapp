"use client";
import { useState } from "react";
import getWeatherData from "./action";
import { LuSearch } from "react-icons/lu"

enum AQILabel {
    Good = 1,
    Fair = 2,
    Moderate = 3,
    Poor = 4,
    VeryPoor = 5,
  }
const pagedata = ({
  data,
  cityname,
  pollution
}: {
  data: WeatherData;
  cityname: string;
  pollution:PollutionData|null;
}) => {
//   console.log(data);
  const [weatherData, setWeatherData] = useState<WeatherData>(data);
  const [city, setcity] = useState<string>(cityname);
  const [isPending, setisPending] = useState<boolean>(false);
  const getData = async () => {
    setisPending(true);
    const data = await getWeatherData(city.toLowerCase());
    setWeatherData(data);
    setisPending(false);
  };

  return (
    <main className="text-white select-none w-full my-auto h-full flex flex-col gap-8 grow pt-12">
    <nav className="w-full mx-auto max-w-[900px] gap-3 shadow-md bg-white/40 rounded-md py-2 px-4 flex items-center justify-between">
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
        className="grow bg-transparent text-md placeholder:text-gray-400 capitalize text-white caret-white outline-none ring-0"
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
            { pollution && AQILabel[pollution.list[0].main.aqi]}
            </h1>
          </div>
          
          <h1 className="right-0 rotate-90 absolute text-2xl top-1/2">
            {weatherData.weather[0].main}
          </h1>
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

export default pagedata;
