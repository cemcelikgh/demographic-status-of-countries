'use client';

import Chart from "@/components/Chart";
import Info from "@/components/Info";
import Select from "@/components/Select";
import { selectLoader } from "@/lib/features/loaderSlice";
import { useSelector } from "react-redux";


export default function Home() {

  const loader = useSelector(selectLoader);

  return (
    <main>
      <h1>Demographic Status of Countries</h1>
      <Select />
      {loader
        ? <div className="loader-container">
            <div className="lds-ripple"><div></div><div></div></div>
          </div>
        : <>
      <Info />
      <Chart />
      </>}
    </main>
  );
}
