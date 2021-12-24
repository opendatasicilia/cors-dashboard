import React, { useState, useEffect, useCallback } from "react";
import axios from 'axios'
import csvToJson from 'csvtojson';
import { format } from 'date-fns';
import { it } from 'date-fns/esm/locale'
import {BiCalendarEvent} from 'react-icons/bi'
import {MdPictureAsPdf} from 'react-icons/md'

export default function Reports(){

    const [isLoading,setIsLoading] = useState(true)
    const [data, setData] = useState(null);

    const fetchData = useCallback(async () => {
        axios({
            "method": "GET",
            "url": `https://raw.githubusercontent.com/opendatasicilia/covid-open-report-sicilia/main/download/report.csv`,
            "responseType": "blob"
            })
            .then((response) => {
                return response.data.text();
            })
            .then((text) => {
                csvToJson()
                    .fromString(text)
                    .then((json) => {
                        setData(json)
                        setIsLoading(false)
                    })
            })
            .catch((error) => {
                alert(error)
            })
        }, [])
        
        useEffect(() => {
            fetchData()
        }, [fetchData])

    return(
        <>
        {
            !isLoading && data.slice(0).reverse().slice(0, 6).map(report => (
                <div className="col-12 col-md-2" key={report.n}>
                    <a className="text-decoration-none" href={report.URL} target="_blank" rel="noreferrer">
                        <div className="card border-1 mb-4" style={{borderRadius:'20px'}}>
                            <div className="text-center p-3" style={{backgroundColor:'#118ab2', borderRadius:'20px 20px 0px 0px', position:'relative'}}>
                                <MdPictureAsPdf color={'white'} size={96} />
                            </div>
                            <div className="p-3 text-black">
                                <p className="fw-bold mb-1">Bollettino Dasoe n° {report.n}</p>
                                <p><BiCalendarEvent className="me-1"/>{format(new Date(report.data_report), "dd MMMM Y", {locale: it})}</p>
                            </div>
                        </div>
                    </a>
                </div>
            ))
        }
        </>
    )
}