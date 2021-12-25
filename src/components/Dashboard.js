import React, {useState} from 'react';
import Select, { createFilter } from 'react-select';
import MenuList from '../lib/menuList';
import comuni from '../data/elenco-comuni-siciliani.json';

import Get from './GetData';
import Bar from "./Charts/Bar";
import Line from "./Charts/Line";
import Table from './Charts/Table';
import Reports from './Reports';

export default function Dashboard(){

    const random = comuni[[Math.floor(Math.random()*comuni.length)]]
    const [istat, setIstat] = useState(random['comune_codice_istat'])
    const options = comuni.map(item => ({
          value: item.comune_codice_istat.substring(1),
          label: item.comune_denominazione + " (" + item.provincia_sigla + ")"
        })
    );

    return(
        <div>
            <div className="mt-5 mb-5">
                <p className="text-muted">
                    Seleziona un comune dal menù a tendina per filtrare i dati
                </p>
                <Select
                    styles={{control: base => ({...base, border:0})}}
                    filterOption={createFilter({ ignoreAccents: false })}
                    defaultValue={{value: random['comune_codice_istat'], label: `${random['comune_denominazione']} (${random['provincia_sigla']})`}}
                    options={options}
                    components={{MenuList}}
                    onChange={(e) => setIstat(e.value)}
                />
            </div>
            <div className="row">
                <div className="col-12 col-md-6">
                    <Get mode={"incidenza"} istat={istat} latest={true}/>
                </div>
                <div className="col-12 col-md-6">
                    <Get mode={"vaccini"} istat={istat} latest={true}/>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-6 mb-3">
                    <Bar mode={"incidenza"} istat={istat} latest={false}/>
                </div>
                <div className="col-12 col-md-6 mb-3">
                    <Line mode={"vaccini"} istat={istat} latest={false}/>
                </div>
            </div>
            <div className="row mt-5">
                <h1 className="h3 text-uppercase mb-3">
                    Quali sono i comuni con l'incidenza piu' alta?
                </h1>
                <div className="col-12">
                    <Table/>
                </div>
            </div>
            <div className="row mt-5">
                <h1 className="h3 text-end mb-3">
                    Bollettini pubblicati
                </h1>
                <Reports/>
            </div>
        </div>
      )
}