import scarica from '../images/scarica-dati.png'
import logo from '../images/opendatasicilia.png'
import ccby4 from '../images/ccby4.png'
import {remove} from '../lib/cookieConsent'

export default function Footer(){
    return(
        <footer>
            <div className="container">
                <div  className="row p-3">
                    <div className="col-12 col-md-6 d-inline-flex text-center text-md-start order-2 order-md-1">
                        <img style={{height:'93px'}} src={logo} alt="open data Sicilia"/>
                        <div className="ms-3 text-white">
                            <p>
                                Fonte: <a href="https://github.com/opendatasicilia/covid-open-report-sicilia#readme" target="_blank" rel="noreferrer">Regione Siciliana (DASOE)</a><br/>
                                Elaborazione dati: <a href="https://opendatasicilia.it" target="_blank" rel="noreferrer">Open Data Sicilia</a><br/>
                            </p>
                            <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">
                                <img src={ccby4} alt="CCBY4"/>
                            </a>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 text-center text-md-end order-1 order-md-2">
                        <a href="https://github.com/opendatasicilia/covid-open-report-sicilia/tree/main/dati" target="_blank" rel="noreferrer">
                            <img style={{height:'42px'}} src={scarica} alt="Scarica i dati"/>
                        </a>
                        <p className="text-white pt-2">
                            Progetto <a href="https://github.com/opendatasicilia/covid-open-report-sicilia" target="_blank" rel="noreferrer">GitHub</a>
                        </p>
                    </div>
                </div>
                <div className='analytics text-center mx-auto'>
                    <small className="text-white">
                        Google Analytics tracks number of visitors.<br/>
                        You have&nbsp;{localStorage.getItem('consent') === 'yes' ? "accepted" : "refused"} to take part.
                        <button style={{backgroundColor:'transparent',color:'white',textDecoration:'underline'}} onClick={() => remove()}>
                            Review my choice
                        </button>
                    </small>
                </div>
            </div>
        </footer>
    )
}