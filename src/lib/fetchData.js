import axios from 'axios';

export default async function fetchData(mode, istat, latest) {
    const data = await axios.get(`https://covid-open-report-sicilia.herokuapp.com/${mode}${latest?"/latest":""}${istat?"?q="+istat:""}`)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            alert(error)
        })
        return data
    }