import sicily from "../../src/images/regione-sicilia.png"
import LastUpdate from './LastUpdate';

export default function Header(){
    return(
    <div className="row pt-5">
        <div className="col-12 col-lg-2 text-center text-lg-start">
          <img style={{height:'96px'}} src={sicily} alt="Regione Sicilia"/>
        </div>
        <div className="col-12 col-lg-10">
          <h1 className="text-uppercase fw-bold text-center text-lg-start">
            Report Settimanale Interattivo
          </h1>
          <h2 className="text-muted fw-light h4 text-center text-lg-start">
            Dati Epidemiologici e Vaccinali - Regione Sicilia
          </h2>
          <LastUpdate/>
        </div>
    </div>
    )
}