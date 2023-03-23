import React, { useEffect, useRef, useState } from 'react'
import Main from 'fitstic/layouts/Main'
import Nav from 'fitstic/parts/Nav';
import Link from 'next/link';

const index = () => {
    const [padroni, setPadroni] = useState([]);
    
    const iNome = useRef(null);
    const iCognome = useRef(null);
    const iEta = useRef(null);

    // Pesco dal local storage le mie righe
    // ha lo stesso valore di usare una API
    // ma per semplificazione uso lo storage del browser
    const getPadroni = () => {
        try {
            const res = localStorage.getItem("padroni");
            
            return JSON.parse(res);
        } catch(e) {
            return [];
        }
    }

    //Aggiungo una nuova riga in local sotrage
    const aggiungiPersona = () => {
        if(!iNome || !iCognome || !iEta) {
            return false;
        }
        
        const res = [...padroni, {
            nome: iNome.current.value,
            cognome: iCognome.current.value,
            eta: iEta.current.value
        }];
        
        localStorage.setItem("padroni", JSON.stringify(res));

        setPadroni(res)
    }

    //Al render del mio componente
    useEffect(() => {
        const res = getPadroni();
        
        if(res)
        setPadroni(res);
    }, []);

    return (
        <Main>
            <h1>Padroni</h1>
            <div>
                <input type={'text'} ref={iNome}/>
                <input type={'text'} ref={iCognome}/>
                <input type={'text'} ref={iEta}/>
                <button onClick={aggiungiPersona}>Salva</button>
            </div>
            <table>
                <tbody>
                    <tr>
                        <th>Nome</th>
                        <th>Cognome</th>
                        <th></th>
                    </tr>
                    {padroni.map((padrone, index) => <tr key={index}>
                        <td>{padrone.nome}</td>
                        <td>{padrone.cognome}</td>
                        <td>
                            <Link href={{
                                pathname: '/padroni/dettaglio/[id]',
                                query: {id: index}
                            }}>
                                Dettaglio
                            </Link>
                        </td>
                    </tr>)}
                </tbody>
            </table>
        </Main>
    )
}

export default index