import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios'

function App() {
  const [countryName, setName] = useState('')
  const [countryData, setData] = useState([])
  const [flag, setFlag] = useState(false)
  const [singleCountryName, setSingle] = useState('')
  const [showFlag, setShowFlag] = useState(false)
  const [weather, showWeather] = useState(false)

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setData(response.data)
      })
  }, [])

  const handleInput = (event) => {
    setName(event.target.value)
    setFlag(true)
    setShowFlag(false)
    showWeather(false)
  }

  const filterCountry = countryData.filter(country => country.name.common.toLowerCase().includes(countryName.toLowerCase()))

  const singleCountry = filterCountry.filter(country => country.name.common === singleCountryName)

  if (showFlag === true) {
    return (
      <div>
        find countries
        <input value={countryName} onChange={handleInput} />
        <FullInfor country={singleCountry} weather={weather} showWeather={showWeather} />
      </div>
    )
  }
  else {
    return (
      <div>
        find countries
        <input value={countryName} onChange={handleInput} />
        <Filter flag={flag} country={filterCountry} update={setSingle} updateShow={setShowFlag} weather={weather} showWeather={showWeather} />
      </div>
    );
  }
}

const Filter = (props) => {
  const show = (country_name) => {
    props.update(country_name)
    props.updateShow(true)
  }

  if (props.flag === true) {
    if (props.country.length > 10) {
      return (
        <p>Too many matches, specify another filter</p>
      )
    } else if (props.country.length === 1) {
      return (
        <FullInfor country={props.country} weather={props.weather} showWeather={props.showWeather} />
      )
    } else {
      return (
        <div>
          {props.country.map(c => <p key={c.name.common}>{c.name.common} <button onClick={function () { show(c.name.common) }}>show</button></p>)}
        </div>
      )
    }
  }
}

const FullInfor = (props) => {
  let language = []
  for (var key in props.country[0].languages) {
    language.push(props.country[0].languages[key])
  }
  return (
    <div>
      <h1>{props.country[0].name.common}</h1>
      <p>capital {props.country[0].capital[0]}</p>
      <p>area {props.country[0].area}</p>
      <h3>languages:</h3>
      <ul>{language.map(l => <li key={l}>{l}</li>)}</ul>
      <img src={props.country[0].flags.png} alt="flag"></img>
      <Geo country={props.country} weather={props.weather} showWeather={props.showWeather} />
    </div>
  )
}

const Geo = (props) => {
  const city = props.country[0].capital
  const api_key = process.env.REACT_APP_API_KEY
  const [geoInfo, setGeo] = useState([])

  useEffect(() => {
    axios.get("http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + api_key)
      .then(response => {
        setGeo(response.data)
        props.showWeather(true)
      })
  }
    , [city, api_key, props])

  if(props.weather === true){
    return (
      <Weather geoInfo={geoInfo} city={city}/>
    )
  }
}

const Weather = (props) =>{
  const lon = props.geoInfo[0].lon
  const lat = props.geoInfo[0].lat
  const api_key = process.env.REACT_APP_API_KEY
  const [weatherInfo, setWeather] = useState([])
  const [flag, setFlag] = useState(false)
  useEffect(() => {
    axios.get("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+api_key+"&units=metric")
         .then(response =>{
          setWeather(response.data)
          setFlag(true)
         })
  }
    ,[lon, lat, api_key])  
  // console.log(weatherInfo)

  if(flag === true){
    const icon = weatherInfo.weather[0].icon
    const icon_url = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
    // console.log(icon_url)
    return (
      <div>
        <h2>Weather in {props.city}</h2>
        <p>temperature {weatherInfo.main.temp} Celcius</p>
        <img alt="weather icon" src={icon_url}></img>
        <p>wind {weatherInfo.wind.speed} m/s</p>
      </div>
    )
  }
}


export default App;
