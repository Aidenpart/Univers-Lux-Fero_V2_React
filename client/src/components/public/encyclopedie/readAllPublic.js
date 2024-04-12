import { useState, useEffect } from "react";


import { URL } from "../../../helpers/urlHelpers.js";
import { Loading } from "../../shared/loading/loading.js";
import { CardsLieux } from "../../shared/cards/cardsLieux.js";
import {CardCharacter} from "../../shared/cards/cardsEncyclopedie.js" 
import "../../admin/adminComponentsStyles.scss";


export const ReadAllPublic = (props) => {

    const camp = props.camp;
    const text = props.text;
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [dataFiltered, setDataFiltered] = useState([]) ;
    
    useEffect(() => {
        fetch(`${URL}/wiki/${text}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((data) => {
            setDataFiltered(data.filter((data) => data.appartenance === camp));
            setDataLoaded(true);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [camp, text, setDataFiltered, setDataLoaded]);
    
    const handleClick = () => {
        setModalIsOpen(false);
    };
    

    if(!dataLoaded)
        return <Loading />;    
    
    return (
        <section className="article-CRUD">
            <h3>Voir les {text}</h3>
            {modalIsOpen && (
                <div className="div-cards">
                    <button onClick={handleClick}>Cacher</button>
                    <div className="card-section">
                        { text === "lieux" ? 
                        <CardsLieux lieux={dataFiltered}/> 
                        : 
                        <CardCharacter personnages={dataFiltered}/>
                        }    
                    </div>
                </div>
            )}
            {!modalIsOpen && (<button onClick={() => setModalIsOpen(true)}>Afficher tous les {text}</button>)}
        </section>
    );
};