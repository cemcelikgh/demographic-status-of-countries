'use client';

import { Chart as DemographicChange, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectDemographics } from "@/lib/features/demographicsSlice";
import { selectTheme } from "@/lib/features/themeSlice";

DemographicChange.register(...registerables);

function Chart() {

  const changes = useSelector(selectDemographics);
  const theme = useSelector(selectTheme);

  const [chartColors, setChartColors]
    = useState(['#398e4a', '#d93036', '#0062d1', '#ff990a']);
  const [gridColor, setGridColor] = useState('#808080');
  useEffect(() => {
    const root = getComputedStyle(document.documentElement);
    const birthsColor = root.getPropertyValue('--color-five').trim();
    const deathsColor = root.getPropertyValue('--colour-six').trim();
    const migrationsColor = root.getPropertyValue('--color-seve').trim();
    const changeColor = root.getPropertyValue('--color-eigh').trim();
    setChartColors([birthsColor, deathsColor, migrationsColor, changeColor]);
    const gridColor = root.getPropertyValue('--colour-one').trim();
    setGridColor(gridColor);
  }, [theme]);

  return (
    <section id='chart'>
      <Bar
        data = {{
          labels: ['Births','Deaths','Net Migrations','Net Change'],
          datasets: [{
            label: 'Demographics',
            data: [
              changes.births,
              changes.deaths,
              changes.netMigrations,
              changes.births - changes.deaths + changes.netMigrations
            ],
            backgroundColor: chartColors
          }]
        }}
        options={{ scales: {
          x: { grid: { color: gridColor } },
          y: { grid: { color: gridColor } }
        } }}
      />
    </section>
  )
}

export default Chart;
