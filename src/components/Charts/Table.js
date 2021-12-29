import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import fetchData from '../../lib/fetchData';
import slugify from '../../lib/slugify';

export default function Table(){

    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState({});
    const [order, setOrder] = useState(true);
    const [comuniNumb, setComuniNumb] = useState(10)

    useEffect(() => {
        async function get() {
            const inc = await fetchData('incidenza',false,true);
            const vax = await fetchData('vaccini',false,true);
            const union = _.merge(inc,vax);
            setData(_.sortBy(union, 'incidenza').reverse())
            setIsLoading(false)
        }
        get();
      },[]);

    const sortBy = (object, field) => {
        setOrder(!order)
        let sortState = !order ? "desc": "asc"
        const sorted = _.orderBy(object, field, sortState)
        setData(sorted)
    }

    const showOptions = [10, 25, 50, 100]

  return(
    !isLoading&&
    <>
        <div className="d-flex justify-content-between">
            <div>
                <h1 className="h3 text-uppercase mb-3">
                    Quali sono i comuni con l'incidenza piu' alta?
                </h1>
            </div>
            <div className="align-self-center">
                <select onChange={(e) => setComuniNumb(e.target.value)} value={comuniNumb}>
                    {showOptions.map((option, i) => <option value={option} key={i}>Mostra {option}</option>)}
                    <option value={390}>Mostra tutti</option>
                </select>
            </div>
        </div>
        <div className="row w-100 mx-auto">
            <table>
                <thead className="text-end" style={{backgroundColor:'#e0e0e0'}}>
                    <tr>
                        <th className="d-none d-sm-block" />
                        <th className="text-start">
                            <span onClick={() => sortBy(data,'comune')}>
                                Comune
                            </span>
                        </th>
                        <th>
                            <span onClick={() => sortBy(data,'incidenza')}>
                                <abbr title="Incidenza">
                                    <span>Inc</span>
                                </abbr>
                            </span>
                        </th>
                        <th>
                            <span onClick={() => sortBy(data,'casi')}>
                                <abbr title="Nuovi casi">
                                    <span>Casi</span>
                                </abbr>
                            </span>
                        </th>
                        <th>
                            <span onClick={() => sortBy(data,'%vaccinati')}>
                                <abbr title="Vaccinati">
                                    <span>Vax</span>
                                </abbr>
                            </span>
                        </th>
                        <th>
                            <span onClick={() => sortBy(data,'%immunizzati')}>
                                <abbr title="Immunizzati">
                                    <span>Imm</span>
                                </abbr>
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                {data.slice(0, comuniNumb).map((comune, i) => (
                    <tr className="text-end" key={i}>
                        <td className="text-start d-none d-sm-block">{i+1}.</td>
                        <td className="text-start">
                            <a className="comune" href={process.env.PUBLIC_URL+'/comune/'+slugify(comune.comune)}>
                                {comune.comune}
                            </a>
                        </td>
                        <td>{comune.incidenza}</td>
                        <td>{comune.casi}</td>
                        <td>{comune['%vaccinati'] + '%'}</td>
                        <td>{comune['%immunizzati'] + '%'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </>
  );
}