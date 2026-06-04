'use client';

import { selectLoader } from "@/lib/features/loaderSlice";
import { useAppSelector } from "@/lib/hooks";
import Numbers from "./numbers/Numbers";
import Chart from "./chart/Chart";


function Demographics() {

  const loader = useAppSelector(selectLoader);

  return (<>{loader ?
    <div className="loader-container">
      <div className="lds-ripple"><div>
        </div>
          <div></div>
        </div>
    </div>
  : <>
    <Numbers />
    <Chart />
  </>
  }</>);

}

export default Demographics;
