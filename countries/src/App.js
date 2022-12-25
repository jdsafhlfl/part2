import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios'

function App() {
  const [countryName, setName] = useState('')
  const [countryData, setData] = useState([])
  const [flag, setFlag] = useState(false)
  const [singleCountryName, setSingle] = useState('')
  const [showFlag, setShowFlag] = useState(false)

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
  }

  const filterCountry = countryData.filter(country => country.name.common.toLowerCase().includes(countryName.toLowerCase()))

  const singleCountry = filterCountry.filter(country => country.name.common === singleCountryName)

  if(showFlag === true){
    return (
      <div>
      find countries
      <input value={countryName} onChange={handleInput} />
      <FullInfor country={singleCountry} />
      </div>
    )
  }
  else{
    return (
      <div>
        find countries
        <input value={countryName} onChange={handleInput} />
        <Filter flag={flag} country={filterCountry} update={setSingle} updateShow={setShowFlag} />
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
        <FullInfor country={props.country} />
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
      <h2>languages:</h2>
      <ul>{language.map(l => <li key={l}>{l}</li>)}</ul>
      <img src={props.country[0].flags.png} alt="flag"></img>
    </div>
  )
}



export default App;
