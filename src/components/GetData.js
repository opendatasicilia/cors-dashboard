import React, { useState, useEffect } from 'react';
import fetchData from '../lib/fetchData';

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

    return(
        isLoading ? "" :
        
        <div className="row text-end">
            {
                mode === 'incidenza' ?
                <>
                    <div className="col-6 mb-4">
                        <div className="p-3 card border-0 rounded">
                            <h3 className="text-muted">
                                Incidenza
                            </h3>
                            <h4 className="h1">
                                {data[0]['incidenza']}
                            </h4>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="p-3 card border-0 rounded">
                            <h3 className="text-muted">
                                Casi
                            </h3>
                            <h4 className="h1">
                                {data[0]['casi']}
                            </h4>
                        </div>
                    </div>
                </>
                :
                <>
                    <div className="col-6">
                        <div className="p-3 card border-0 rounded">
                            <h3 className="text-muted">
                                Vaccinati
                            </h3>
                            <h4 className="h1">
                                <img style={{height:'30px',margin:'0px 8px 8px 0px'}} src={vaccinati} alt="vaccinati"/>
                                {data[0]['%vaccinati']}%
                            </h4>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="p-3 card border-0 rounded"> 
                            <h3 className="text-muted">
                                Immunizzati
                            </h3>
                            <h4 className="h1">
                                <img style={{height:'30px',margin:'0px 8px 8px 0px'}} src={immunizzati} alt="immunizzati"/>
                                {data[0]['%immunizzati']}%
                            </h4>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}