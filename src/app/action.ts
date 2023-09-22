'use server'
const getWeatherData = async(cityname:string)=>{
    const initialWeatherData = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&&appid=${process.env.API_KEY}&units=metric`,
      { cache: "no-store" }
    ).then((res) => res.json());
  
    return initialWeatherData as WeatherData
  }


  const getPollutionData = async (data: WeatherData) => {
    try {
      let lat = data.coord.lat;
      let lon = data.coord.lon;
  
      if (lat && lon) {
        const initialWeatherData = await fetch(
          `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&&appid=${process.env.API_KEY}&units=metric`,
          { cache: "no-store" }
        ).then((res) => res.json());
  
        return initialWeatherData as PollutionData;
      }
    } catch (error) {
      return null;
    }
  };

  export {getWeatherData,getPollutionData}