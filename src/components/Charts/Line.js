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

  return(
      !isLoading&&
        <div className="h-100 card border-0 rounded">
          <Line
            data={{
                labels: data.date,
                datasets: mode === 'vaccini' ? 
                  [
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
                :
                  [
                    {
                        label: 'Incidenza settimanale',
                        data: data.incidenza,
                        borderColor: '#073b4c',
                        backgroundColor: '#073b4c',
                      },
                      {
                        label: '250 soglia critica',
                        data: Array(data.date.length).fill(250),
                        borderDash: [4],
                        borderColor: '#b7b7b7',
                        backgroundColor: '#b7b7b7',
                        pointRadius: 0,
                      },
                ]
            }}
            options={
              {
                responsive: true,
                borderWidth: 2,
                scales: {
                  x: {
                      grid: {display: false}
                  },
                  y: mode === 'vaccini' ? {
                      suggestedMin: 10,
                      suggestedMax: 100,
                    } : {
                      suggestedMin: 0,
                      suggestedMax: 300
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
              }
            }
          />
        </div>
  );
}