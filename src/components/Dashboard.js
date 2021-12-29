import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import Select, { createFilter } from 'react-select';
import MenuList from '../lib/menuList';
import comuni from '../data/elenco-comuni-siciliani.json';

import Get from './GetData';
import Bar from "./Charts/Bar";
import Line from "./Charts/Line";
import Table from './Charts/Table';

export default function Dashboard(){

    let { input } = useParams()
    let random = comuni[[Math.floor(Math.random()*comuni.length)]]

    if(typeof(slug) !== undefined && (comuni.some(e => e.slug === input) || comuni.some(e => e.comune_codice_istat === input))) {
        random = comuni.find(x => x.slug === input) || comuni.find(x => x.comune_codice_istat === input)
    }

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
            <div className="row mb-3">
                <Get mode={"incidenza"} istat={istat} latest={true}/>
                <Get mode={"vaccini"} istat={istat} latest={true}/>
            </div>
            <div className="row">
                <div className="col-12 col-md-6 mb-3">
                    <Bar mode={"incidenza"} istat={istat} latest={false}/>
                </div>
                <div className="col-12 col-md-6 mb-3">
                    <Line mode={"incidenza"} istat={istat} latest={false}/>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-6 mb-3">
                    <Bar mode={"vaccini"} istat={istat} latest={false}/>
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
        </div>
      )
}