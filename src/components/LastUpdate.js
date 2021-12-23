import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { it } from 'date-fns/esm/locale'
import fetchData from '../lib/fetchData';

export default function LastUpdate(){
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState(null);

    useEffect(() => {
        async function get() {
          const res = await fetchData("vaccini","081001",true);
          setData(res[0].data)
          setIsLoading(false)
        }
        get();
      },[]);

      return(
          !isLoading&&
          <pre className="text-muted text-center text-lg-start">
            Data ultimo bollettino: {format(new Date(data), "dd MMMM Y", {locale: it})}
          </pre>
      )
}