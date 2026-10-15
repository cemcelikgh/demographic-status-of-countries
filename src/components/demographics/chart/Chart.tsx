'use client';

import { Chart as DemographicChange, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import { selectDemographics } from "@/lib/features/demographicsSlice";
import { selectTheme } from "@/lib/features/themeSlice";
import { Theme } from "@/types/types";
import { useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";

let initialTheme: Theme | undefined;

const chartPalettes = {
  light: {
    chartColors: ['#62c073', '#ff6166', '#52a8ff', '#ffb224'],
    gridColor: '#ebebeb',
  },
  dark: {
    chartColors: ['#398e4a', '#d93036', '#0062d1', '#ff990a'],
    gridColor: '#454545',
  },
} as const;

DemographicChange.register(...registerables);

function Chart() {

  const theme = useAppSelector(selectTheme);
  const demographics = useAppSelector(selectDemographics);

  const currentTheme = theme ? theme : initialTheme ? initialTheme : 'light';
  const { chartColors, gridColor } = chartPalettes[currentTheme];

  useEffect(() => {
    const mediaQueryList = window.matchMedia('(prefers-color-scheme: light)');
    initialTheme = mediaQueryList.matches ? 'light' : 'dark';
  }, []);

  return (
    <section id='chart'>
      <Bar
        data = {{
          labels: ['Births','Deaths','Net Migrations','Net Change'],
          datasets: [{
            label: 'Demographics',
            data: [
              demographics.births,
              demographics.deaths,
              demographics.netMigrations,
              demographics.births - demographics.deaths + demographics.netMigrations
            ],
            backgroundColor: chartColors,
          }],
        }}
        options={{
          scales: {
            x: { grid: { color: gridColor } },
            y: { grid: { color: gridColor } },
          },
        }}
      />
    </section>
  );

}

export default Chart;
