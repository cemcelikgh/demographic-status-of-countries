'use client';

import { selectDemographics, setData }
  from "@/lib/features/demographicsSlice";
import ThemeSelector from "@/utils/ThemeSelector";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import countries from "./countries";
import demographicDataFor2026 from "../../data/demographicDataFor2026";
import { setLoader } from "@/lib/features/loaderSlice";

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
        const val = value === '900' ? '900'
          : value === '840' ? '840' : value === '792' ? '792' : '156';
        dispatch(setData(demographicDataFor2026[val]));
        console.error(error);
      });
  };

  useEffect(() => {
    fetchData('world')
      .catch((error) => {
        dispatch(setData(demographicDataFor2026['900']));
        console.error(error);
      });  
  }, [fetchData, dispatch]);

  const { time, locID } = useAppSelector(selectDemographics);

  return (<>
    {status === "error" &&
    <div id="failure">
      Data could not be accessed. You can view the demographics of the World, China, Türkiye, and United States of America for 2026.
    </div>
    }
    <section id="selectors">
      <div>Year: {time}</div>
      <div>
        <label htmlFor="text-format">
          <span id="country">{locID === 900 ? 'Entire' : 'Country:'}</span>
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
      <ThemeSelector />
    </section>
  </>);

}

export default Select;
