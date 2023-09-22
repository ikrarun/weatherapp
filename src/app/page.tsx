import Pagedata from "./pagedata";



const getWeatherData = async(cityname:string)=>{
  const initialWeatherData = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&&appid=${process.env.API_KEY}&units=metric`,
    { cache: "no-store" }
  ).then((res) => res.json());

  return initialWeatherData as WeatherData
}

const getPollutionData = async(data:WeatherData)=>{
  let lat=data.coord.lat;
  let lon=data.coord.lon;

  if(lat &&lon){
  const initialWeatherData = await fetch(
    `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&&appid=${process.env.API_KEY}&units=metric`,
    { cache: "no-store" }
  ).then((res) => res.json());

  return initialWeatherData as PollutionData}
  else return null
}

let getCityName = async(searchParams: { [key: string]: string |string[]| undefined })=>{
  if (typeof searchParams.city === 'string') {
    return searchParams.city;
  } else if (Array.isArray(searchParams.city)) {
    return searchParams.city[0];
  } else if (typeof searchParams.city === 'undefined') {
    const city ='Lucknow' 
    return city;
  }
  else return 'Lucknow';
}

export default async function Home({ searchParams }: { searchParams: { [key: string]: string |string[]| undefined }}) {
const city = await getCityName(searchParams)
const data = await getWeatherData(city.toLowerCase());
const pollution = await getPollutionData(data)
return (
  <Pagedata data={data} pollution={pollution} cityname={city}/>
  )
}
