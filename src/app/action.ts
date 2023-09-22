'use server'
const getWeatherData = async(cityname:string)=>{
    const initialWeatherData = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&&appid=${process.env.API_KEY}&units=metric`,
      { cache: "no-store" }
    ).then((res) => res.json());
  
    return initialWeatherData as WeatherData
  }


  export default getWeatherData