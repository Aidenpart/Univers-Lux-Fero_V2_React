import { useState, useEffect } from "react";


import { URL } from "../../../helpers/urlHelpers.js";
import { MiniCardsArticlesAdmin } from "../../shared/cards/cardsMiniArticles.js";


export const ReadAllArticles = () => {

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
        <section className="article-CRUD">
            <h3>Voir les articles</h3>
            {modalIsOpen && (
                <div className="div-form-admin">
                    <button onClick={handleClick}>Cacher</button>
                    <MiniCardsArticlesAdmin articles={articles}/>
                </div>
            )}
            {!modalIsOpen && (<button onClick={() => setModalIsOpen(true)}>Afficher tous les articles</button>)}
        </section>
    );
};