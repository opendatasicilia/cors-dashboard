import React, { useState, useEffect } from 'react';
import fetchData from '../../lib/fetchData';
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

const options = {
    responsive: true,
    scales: {
        x: {
            grid: {display: false}
        }
    },
    plugins: {
        legend: {
            display: false,
      },
        title: {
            display: true,
            text: 'Nuovi casi settimanali',
        },
    },
}


  return (
      !isLoading&&
      <div className="h-100 card border-0 rounded">
      <Bar 
      options={options}
      data={{
        labels: data.date,
        datasets: [
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
      }}/>
      </div>
  )
}

