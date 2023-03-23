import Main from 'fitstic/layouts/Main';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const dettaglio = () => {
    //Richiedo il router di next
    const rt = useRouter();

    //Definisco la proprietà padrone nello state per
    // Gestirne il ciclo di vita nella mia applicazione
    const [padrone, setPadrone] = useState({
        nome: '',
        cognome: '',
        eta: 0
    });

    //Leggo un valore dalla query string (url parsato dal router)
    const {id} = rt.query;

    //Leggo dal local storage i dati 
    // dei padroni e ne estraggo uno
    const getPadroneById = (padroneId) => {
        try {
            //Leggo i dati dal local storage
            const res = localStorage.getItem("padroni");

            //Essendo una stringa, e avendoci salvato 
            //all'interno un JSON, devo trasformarlo in array/oggetto
            const parsed = JSON.parse(res);

            //Ritorno in base alla chiave (il mio "id")
            // Il padrone desiderato
            return parsed[padroneId];
        } catch(e) {
            return null;
        }
    }

    //Definisco una callback allevento di render del mio componente
    useEffect(() => {
        const newVal = getPadroneById(id);

        if(newVal)
            setPadrone(newVal);
    }, []);

    //Render
    return (
        <Main>
            <>
                <p>Nome: {padrone.nome}</p>
                <p>Cognome: {padrone.cognome}</p>
                <p>Età: {padrone.eta}</p>
                <p>
                <Link href={{
                    pathname: '/padroni/modifica/[id]',
                    query: {id: id}
                    }}>Modifica</Link>
                </p>
            </>
        </Main>
    )
}

export default dettaglio