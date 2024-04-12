import { useState, useEffect } from "react";


import { URL } from "../../../helpers/urlHelpers.js";
import { MiniCardsArticles } from "../../../components/shared/cards/cardsMiniArticles.js";
import "./blogComponentsStyles.scss";


export const ReadAllArticlesPublic = () => {

    const [articles, setArticles] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        fetch(`${URL}/blog/articles`, {
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((data) => {
            setArticles(data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [setArticles]);

    const handleClick = () => {
        setModalIsOpen(false);
    };

    return (
        <article className="cards-section">
            <p>Ou si vous préférez tous les parcourir :</p>
            <h2 className="titre">Voir les articles</h2>
            {modalIsOpen && (
                <>
                    <button onClick={handleClick} className="button-read-all">Cacher</button>
                    <div className="render-card">
                        <MiniCardsArticles articles={articles}/>
                    </div>
                </>
            )}
                {!modalIsOpen && (<button onClick={() => setModalIsOpen(true)} className="button-read-all">Afficher tous les articles</button>)}
        </article>
    );
};