import React, { useState, useEffect } from 'react';
import fetchData from '../../lib/fetchData';
import { format } from 'date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

export default function LineChart({mode, istat, latest}){

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
                setData({
                    date: res.map(a => format(new Date(a.data), "dd/MM/yy")),
                    vaccinati: res.map(a => a['%vaccinati']),
                    immunizzati: res.map(a => a['%immunizzati'])
                })
            }
            setIsLoading(false)
        }
        get();
      },[mode, istat, latest]);

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  scales: {
    x: {
        grid: {display: false}
    },
    y: {
        suggestedMin: 10,
        suggestedMax: 100,
      }
  },
  layout: {
    padding: {
        top: 15,
        right: 15,
        bottom: 5,
        left: 15,
    }
  },
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

  return(
      !isLoading&&
        <div className="h-100 card border-0 rounded">
            <Line options={options}
            data={{
                labels: data.date,
                datasets: [
                    {
                        label: '%Vaccinati',
                        data: data.vaccinati,
                        borderColor: 'rgb(6, 214, 160)',
                        backgroundColor: 'rgba(6, 214, 160, 0.5)',
                      },
                      {
                        label: '%Immunizzati',
                        data: data.immunizzati,
                        borderColor: 'rgb(17, 138, 178)',
                        backgroundColor: 'rgba(17, 138, 178, 0.5)',
                      },
                ]
            }}
            />
        </div>
  );
}