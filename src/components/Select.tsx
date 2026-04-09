'use client';

import { selectDemographics, setData } from "@/lib/features/demographicsSlice";
import ChangeTheme from "@/utils/ChangeTheme";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import countries from "../lib/data/countries";
import demographicDataFor2024 from "../lib/data/demographicDataFor2024";
import { setLoader } from "@/lib/features/loaderSlice";

type Value = keyof typeof demographicDataFor2024;

function Select() {

  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<'ok' | 'error'>('ok');

  const fetchData = useCallback((isCountry: string, locID?: string) => {

    dispatch(setLoader(true));

    const endpoint = (isCountry === 'country')
      ? `/.netlify/functions/worldDemographics`
      : `/.netlify/functions/countriesDemographics?locID=${locID}`;
    return fetch(endpoint)
    .then(response => {
      if(!response.ok) {
        setStatus('error');
        throw new Error('Could not fetch the demographics.');
      };
      return response.json();
    }).then(data => {
      const yearIndex = new Date().getFullYear() - 1951;
      const thisYear = data?.[yearIndex];
      if (thisYear === undefined) {
        setStatus('error');
        throw new Error('Could not retrieve the demographic data.');
      };
      setStatus('ok');
      dispatch(setData(thisYear));
    }).finally(() => { dispatch(setLoader(false)) });

  }, [dispatch]);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    fetchData(value === '900' ? 'world' : 'country', value)
      .catch((error) => {
        dispatch(setData(demographicDataFor2024[value as Value]));
        console.error(error);
      });
  };

  useEffect(() => {
    fetchData('world')
      .catch((error) => {
        dispatch(setData(demographicDataFor2024['900']));
        console.error(error);
      });  
  }, [fetchData, dispatch]);

  const { time, locID } = useAppSelector(selectDemographics);

  return (<>
    {status === "error" &&
    <div id="failure">
      Data could not be accessed. You can view the demographics of the World, China, Türkiye, and United States of America for 2024.
    </div>
    }
    <section id="utilities">
      <div>Year: {time}</div>
      <div>
        <label htmlFor="text-format">
          <span id="country">{locID === 900 ? 'Entire' : 'Country'}</span>
          <select
            id="text-format" name="text-format"
            value={locID}
            onChange={handleSelect}
          >
            {status === "ok" ?
            <>
            <option key={900} value="900">World</option>
            {countries.map(country => <option
              key={country[1]} value={country[1]}>{country[0]}
            </option>)}
            </>
            :
            <>
            <option key={900} value="900">World</option>
            <option key={156} value="156">China</option>
            <option key={792} value="792">Türkiye</option>
            <option key={840} value="840">United States of America</option>
            </>
            }
          </select>
        </label>
      </div>
      <div>
        <ChangeTheme />
      </div>
    </section>
  </>);

}

export default Select;
