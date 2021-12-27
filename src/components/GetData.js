import React, { useState, useEffect } from 'react';
import fetchData from '../lib/fetchData';
import ReactTooltip from "react-tooltip";
import Spinner from './Spinner';

import { FcInfo } from 'react-icons/fc'
import vaccinati from '../images/vaccinati.png'
import immunizzati from '../images/immunizzati.png'

export default function GetData({mode, istat, latest}){
    
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState(null);

    useEffect(() => {
        async function get() {
          const res = await fetchData(mode, istat, latest);
          setData(res)
          setIsLoading(false)
        }
        get();
      },[mode, istat, latest]);

    const layout = {
        incidenza: [
            {
                title: 'Incidenza',
                field: 'incidenza',
                description: 'Incidenza cumulativa settimanale (ogni 100.000 abitanti)',
                icon: null,
                suffix: null
            },
            {
                title: 'Casi',
                field: 'casi',
                description: 'Nuovi casi settimanali',
                icon: null,
                suffix: null
            }
        ],
        vaccini: [
            {
                title: 'Vaccinati',
                field: '%vaccinati',
                description: 'Percentuale di persone vaccinate con almeno una dose (calcolata rispetto al target)',
                icon: vaccinati,
                suffix: '%'
            },
            {
                title: 'Immunizzati',
                field: '%immunizzati',
                description: 'Percentuale di: persone vaccinate con 2 o più dosi, persone vaccinate in monodose per pregressa infezione Covid, persone vaccinate con Janssen (calcolata rispetto al target)',
                icon: immunizzati,
                suffix: '%'
            }
        ]
    }

    return(    
        layout[mode].map((col, i) => (
            <div className="col-12 col-md-6 col-lg-3 mb-4 text-end" key={col.title+i}>
                <div className="p-3 card border-0 rounded">
                    <div className="d-flex justify-content-end">
                        <h3 className="text-muted">
                            {col.title}
                        </h3>
                        <span className="h4 info ms-1" data-tip data-for={col.title+i}><FcInfo/></span>
                    </div>
                    <ReactTooltip className="tooltip" multiline={true} id={col.title+i} place="left" effect="solid" type="info">
                        {col.description}
                    </ReactTooltip>
                    {
                        isLoading ? <Spinner/> :
                        <h4 className="h1">
                            {col.icon && <img style={{height:'30px',margin:'0px 8px 8px 0px'}} src={col.icon} alt={col.title} />}
                            {data[0][col.field]}{col.suffix && col.suffix}
                        </h4>
                    }
                </div>
            </div>
        ))
    )
}