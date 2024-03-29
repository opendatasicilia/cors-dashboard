import React, { useState, useEffect, useCallback } from "react";
import axios from 'axios'
import csvToJson from 'csvtojson';
import { format } from 'date-fns';
import { it } from 'date-fns/esm/locale'
import Slider from "react-slick"
import {BiCalendarEvent} from 'react-icons/bi'
import {MdPictureAsPdf} from 'react-icons/md'
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa'

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

        const settings = {
            autoplay: false,
            dots: true,
            arrows: true,
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 4,
            initialSlide: 0,
            centerMode: false,
            speed: 123,
            nextArrow: <FaChevronRight color={'#434343'} />,
            prevArrow: <FaChevronLeft color={'#434343'} />,
            responsive: [
                {
                    breakpoint: 960,
                    settings: {
                        initialSlide:0,
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 800,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 2
                    }
                },
                {
                      breakpoint: 400,
                      settings: {
                        dots: false,
                        autoplay: true,
                        slidesToShow: 1,
                        slidesToScroll: 1
                      }
                }
            ]
          }

    return(
        !isLoading && 
        <div className="w-100 container mt-5 mb-5">
            <h1 className="h3 text-end mb-3">
                Bollettini pubblicati
            </h1>
            <Slider {...settings}>
            {data.slice(0).reverse().map(report => (
                <div className="col-6 col-md-4 col-xl-2 p-2" key={report.n}>
                    <a className="text-decoration-none" href={report.URL} target="_blank" rel="noreferrer">
                        <div className="card border-1 mb-4" style={{borderRadius:'20px'}}>
                            <div className="text-center p-3" style={{backgroundColor:'#118ab2', borderRadius:'20px 20px 0px 0px', position:'relative'}}>
                                <MdPictureAsPdf color={'white'} size={96} />
                            </div>
                            <div className="p-3 text-black">
                                <p className="fw-bold mb-1">Bollettino DASOE n°{report.n}</p>
                                <p><BiCalendarEvent className="me-1"/>{format(new Date(report.data_report), "dd MMMM Y", {locale: it})}</p>
                            </div>
                        </div>
                    </a>
                </div>
            ))}
            </Slider>
        </div>
    )
}
