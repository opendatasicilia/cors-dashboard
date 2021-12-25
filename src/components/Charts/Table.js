import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import fetchData from '../../lib/fetchData';

export default function Table(){

    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState({});
    const [order, setOrder] = useState(true);

    let comuniNumb = 10

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

  return(
      !isLoading&&
        <div className="row p-2">
            <table>
                <thead className="text-end" style={{backgroundColor:'#e0e0e0'}}>
                    <th/>
                    <th className="text-start">
                        <span onClick={() => sortBy(data,'comune')}>
                            Comune
                        </span>
                    </th>
                    <th>
                        <span onClick={() => sortBy(data,'incidenza')}>
                            Incidenza
                        </span>
                    </th>
                    <th>
                        <span onClick={() => sortBy(data,'casi')}>
                            Nuovi casi
                        </span>
                    </th>
                    <th>
                        <span onClick={() => sortBy(data,'%vaccinati')}>
                            %Vaccinati
                        </span>
                    </th>
                    <th>
                        <span onClick={() => sortBy(data,'%immunizzati')}>
                            %Immunizzati
                        </span>
                    </th>
                </thead>
                <tbody>
                {data.slice(0, comuniNumb).map((comune, i) => (
                    <tr className="text-end" key={i}>
                        <td className="text-start">{i+1}.</td>
                        <td className="text-start">{comune.comune}</td>
                        <td>{comune.incidenza}</td>
                        <td>{comune.casi}</td>
                        <td>{comune['%vaccinati']}</td>
                        <td>{comune['%immunizzati']}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
  );
}