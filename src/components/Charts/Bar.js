import React, { useState, useEffect } from 'react';
import fetchData from '../../lib/fetchData';
import targets from '../../data/targets.json'
import { format } from 'date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

export default function BarChart({mode, istat, latest}){

    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState({});

    useEffect(() => {
        async function get() {
            const res = await fetchData(mode, istat, latest);
            if(mode === 'incidenza'){
                setData({
                    date: res.map(a => format(new Date(a.data), "dd/MM/yy")),
                    casi: res.map(a => a.casi),
                    incidenza: res.map(a => a.incidenza)
                })
            } else if(mode === 'vaccini'){
                const target = targets.filter(a => a.pro_com_t.endsWith(istat))[0];
                const date = res.map(a => format(new Date(a.data), "dd/MM/yy"))
                const vaccinati = res.map(a => new Date(a.data) > new Date('2021-12-08') ? (a['prima_dose'] * target['>=5'] / 100) : a['prima_dose'] * target['>=12'] / 100).map((v, i, a) => v - (a[i - 1] || 0)).map(e => Math.round(e))
                const immunizzati = res.map(a => new Date(a.data) > new Date('2021-12-08') ? (a['seconda_dose'] * target['>=5'] / 100) : a['seconda_dose'] * target['>=12'] / 100).map((v, i, a) => v - (a[i - 1] || 0)).map(e => Math.round(e))
                setData({
                  date: date.slice(1),
                  vaccinati: vaccinati.slice(1),
                  immunizzati: immunizzati.slice(1)
                })
            }
            setIsLoading(false)
        }
        get();
      },[mode, istat, latest]);


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

  return (
      !isLoading&&
      <div className="h-100 card border-0 rounded">
        <Bar 
          data={{
            labels: data.date,
            datasets: mode === 'vaccini' ?
            [
              {
                label: 'Stima variazione vaccinati',
                backgroundColor: 'rgb(6, 214, 160)',
                borderColor: 'rgb(6, 214, 160)',
                borderWidth: 1,
                hoverBorderWidth: 2,
                hoverBorderColor: 'lightgray',
                hoverBackgroundColor: 'rgba(6, 214, 160, 0.5)',
                data: data.vaccinati
              },
              {
                label: 'Stima variazione immunizzati',
                backgroundColor: 'rgba(17, 138, 178, 1)',
                borderColor: 'rgba(17, 138, 178, 1)',
                borderWidth: 1,
                hoverBorderWidth: 2,
                hoverBorderColor: 'lightgray',
                hoverBackgroundColor: 'rgba(17, 138, 178, 0.5)',
                data: data.immunizzati
              }
            ]
          :
            [
              {
                label: 'Nuovi casi settimanali',
                backgroundColor: '#ef476f',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBorderWidth: 2,
                hoverBorderColor: 'lightgray',
                hoverBackgroundColor: '#ef476f',
                data: data.casi
              }
            ]
          }}
          options={{
            responsive: true,
            scales: {
                x: {
                    grid: {display: false}
                }
            },
            layout: {
              padding: {
                  top: 5,
                  right: 15,
                  bottom: 5,
                  left: 15,
              }
            },
            plugins: {
                legend: {
                    display: mode === 'vaccini' ? true : false,
              },
                title: {
                    display: mode === 'vaccini' ? false : true,
                    text: 'Nuovi casi settimanali',
                    font: {
                      family: 'Roboto',
                      size: 20,
                      weight: 'normal'
                    }
                },
            },
          }}
        />
      </div>
  )
}

