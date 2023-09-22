type Coord = {
    lon: number;
    lat: number;
  };
  
  type Weather = {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
  
  type Main = {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  
  type Wind = {
    speed: number;
    deg: number;
    gust: number;
  };
  
  type Clouds = {
    all: number;
  };
  
  type Sys = {
    country: string;
    sunrise: number;
    sunset: number;
  };
  
  type WeatherData = {
    coord: Coord;
    weather: Weather[];
    base: string;
    main: Main;
    visibility: number;
    wind: Wind;
    clouds: Clouds;
    dt: number;
    sys: Sys;
    timezone: number;
    id: number;
    name: string;
    cod: number;
  };
  


  type PollutionData = {
    coord: [number, number];
    list: {
      dt: number;
      main: {
        aqi: number;
      };
      components: {
        co: number;
        no: number;
        no2: number;
        o3: number;
        so2: number;
        pm2_5: number;
        pm10: number;
        nh3: number;
      };
    }[];
  };


 