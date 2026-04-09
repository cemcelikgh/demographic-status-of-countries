'use client';

import Chart from "@/components/Chart";
import Info from "@/components/Info";
import Select from "@/components/Select";
import { selectLoader } from "@/lib/features/loaderSlice";
import { useAppSelector } from "@/lib/hooks/hooks";

function Home() {

  const loader = useAppSelector(selectLoader);

  return (
    <main>
      <h1>Demographic Status of Countries</h1>
      <Select />
      {loader
      ? <div className="loader-container">
          <div className="lds-ripple"><div>
            </div>
              <div></div>
            </div>
        </div>
      : <>
      <Info />
      <Chart />
        </>
      }
    </main>
  );

}

export default Home;
