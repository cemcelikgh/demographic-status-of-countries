'use client';

import { selectDemographics, setData } from "@/lib/features/demographicsSlice";
import ChangeTheme from "@/utils/ChangeTheme";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import countries from "../lib/data/countries";
import demographicsOfWorld2024 from "../lib/data/demographicsOfWorld2024";
import { setLoader } from "@/lib/features/loaderSlice";

function Select() {

  const dispatch = useDispatch();

  function fetchData(isCountry: string, locID?: string) {
    dispatch(setLoader(true));
    let endpoint = '';
    if (isCountry === 'country') {
      endpoint = `https://world-demographics.p.rapidapi.com/countries/${locID}`;
    } else {
      endpoint = 'https://world-demographics.p.rapidapi.com/world';
    }
    fetch(endpoint, { method: 'GET',
      headers: {
        'x-rapidapi-key': '006e52307fmshd4072f4e9b6a7c5p140e58jsn2335a1bbb4e3',
        'x-rapidapi-host': 'world-demographics.p.rapidapi.com'
      }
    }).then(response => {
      if(!response.ok) {
        throw new Error('Failed to fetch response: ' + response.statusText);
      } else { return response.json() }
    }).then(json => {
      const yearIndex = new Date().getFullYear() - 1950;
      dispatch(setData(json[yearIndex]));
    }).catch(error => {
      dispatch(setData(demographicsOfWorld2024));
      alert('Data could not be accessed. The screen is displaying the World 2024 data.');
      console.error('Fetch Error: ', error);
    }).finally(() => { dispatch(setLoader(false)) });
  }

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== '900') {
      fetchData('country', e.target.value)
    } else {
      fetchData('world');
    }
  }

  useEffect(() => { fetchData('world'); }, [])

  const { time } = useSelector(selectDemographics);
  const { locID } = useSelector(selectDemographics);

  return (
    <section id='utilities'>
      <div>Year: {time}</div>
      <div>
        <label htmlFor="text-format">
          <span id="country">{locID === 900 ? 'Entire' : 'Country'}</span>
          <select
            id="text-format" name="text-format"
            value={locID}
            onChange={handleSelect}
          >
            <option key={900} value="900">World</option>
            {countries.map(country => <option
              key={country[1]} value={country[1]}>{country[0]}
            </option>)}
          </select>
        </label>
      </div>
      <div>
        <ChangeTheme />
      </div>
    </section>
  )
}

export default Select;
