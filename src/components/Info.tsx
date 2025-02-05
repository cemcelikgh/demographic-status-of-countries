'use client';

import { useSelector } from "react-redux";
import { selectDemographics } from "@/lib/features/demographicsSlice";

function Info() {

  const demographics = useSelector(selectDemographics);

  return (
    <section id='info'>
      <div>
        <h4>Total Population</h4>
        <p>{demographics.tpopulation1July} (K)</p>
      </div>
      <div>
        <h4>Births</h4>
        <p>{demographics.births} (K)</p>
      </div>
      <div>
        <h4>Deaths</h4>
        <p>{demographics.deaths} (K)</p>
      </div>
      <div>
        <h4>Net Migrations</h4>
        <p>{demographics.netMigrations} (K)</p>
      </div>
      <div>
        <h4>Net Change</h4>
        <p>
          {(demographics.births - demographics.deaths
          + demographics.netMigrations).toFixed(3)
          } (K)
        </p>
      </div>
    </section>
  )
}

export default Info;
