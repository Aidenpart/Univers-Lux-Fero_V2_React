import { useState, useEffect } from "react";


import { URL } from "../../../helpers/urlHelpers.js";
import { MiniCardsArticlesAdmin } from "../../shared/cards/cardsMiniArticles.js";
import "../adminComponentsStyles.scss";


export const GetOneArticle = () => {
    
    const [message, setMessage] = useState('');
    const [articles, setArticles] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState("");
    const [choice, setChoice] = useState("");
    const [showMiniCard, setShowerCard] = useState(false);

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
            setMessage(err);
        });
    }, [showMiniCard, setArticles, setMessage]);
    
    const handleSubmitOne = (e) => {
        e.preventDefault();

        const foundArticle = articles.find(article => article.titre === choice);

        if (foundArticle) {
            setSelectedArticle(foundArticle);
            setShowerCard(true);
        }
    };

    return (
        <article className="article-CRUD">
            <h3>Chercher un article</h3>
            <div className="div-form-admin">
                <form onSubmit={handleSubmitOne}  className="form">
                    <label>Titre de l'article</label>
                        <select onChange={(e) => setChoice(e.target.value)}>
                            <option disabled={true} selected>-----</option>
                            {articles.map((article, i) => {
                                return <option key={i}>{article.titre}</option>;
                            })
                            }
                        </select>
                    <button>Chercher</button>
                </form>
            </div>
            <div className={"err-message"}>
            {message}
            </div>
            {showMiniCard && (
                <MiniCardsArticlesAdmin articles={[selectedArticle]} />
            )}
        </article>
    );
};