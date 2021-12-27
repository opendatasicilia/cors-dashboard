import React from 'react';
import styled from 'styled-components';
import { set } from '../lib/cookieConsent';

export default function CookiePolicy(){
    return(
        localStorage.getItem('consent') === null &&
        <Bar>
            <div className="container text-white p-3 mt-3 text-center text-md-start">
                <h3>
                    Informativa
                </h3>
                <p>
                    Questo sito o gli strumenti di terze parti in esso integrati fanno uso di cookie necessari per il funzionamento e per il raggiungimento delle finalità descritte nella cookie policy.
                </p>
                <div className="d-block d-md-flex justify-content-between">
                    <div>
                        <Button>
                            Scopri di piu
                        </Button>
                    </div>
                    <div>
                        <Button className="me-2" onClick={() => set('no')}>
                            Rifiuta
                        </Button>
                        <Button className="" onClick={() => set('yes')}>
                            Accetta
                        </Button>
                    </div>
                </div>
            </div>
        </Bar>
    )
}

const Bar = styled.div`
    min-height:200px;
    width: 100%;
    background-color: #434343;
    position: fixed;
    bottom: 0;
`

const Button = styled.button`
    border: 2px solid white;
    border-radius: 2px;
    color: white;
    background-color: transparent;
    &:hover{
        background-color:white;
        color: #118ab2;
    }
    @media (max-width:769px) { 
        display:block;
        width: 100%;
        margin:10px auto;
    }
`