import { useState, useEffect } from "react";


import { URL } from "../../../helpers/urlHelpers.js";
import { MiniCardsArticles } from "../../shared/cards/cardsMiniArticles.js";
import {sujetsArticles} from "../../admin/categories.js"
import "./blogComponentsStyles.scss";


export const GetArticlePublic = () => {
    
    const [message, setMessage] = useState('');
    const [allArticles, setAllArticles] = useState([]);    
    const [selectedArticles, setSelectedArticles] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState("");
    const [choice, setChoice] = useState("");
    const [showArticleByTitle, setShowArticleByTitle] = useState(false);
    const [showArticlesBySuject, setshowArticlesBySuject] = useState(false);

    
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
            setAllArticles(data);
        })
        .catch((err) => {
            console.log(err);
            setMessage(err);
        });
    }, [setAllArticles, setMessage]);
    
    const handleSubmitTitle = (e) => {
        e.preventDefault();

        const foundArticleByTitle = allArticles.find(article => article.titre === choice);

        if (foundArticleByTitle) {
            setSelectedArticle(foundArticleByTitle);
            setshowArticlesBySuject(false);
            setShowArticleByTitle(true);
        }
    };

    const handleSubmitSubject = (e) => {
        e.preventDefault();

        const foundArticlesbySubject = [];
        
        allArticles.forEach((article) => {
            if(article.sujet === choice) 
                foundArticlesbySubject.push(article)
        })
        
        if (foundArticlesbySubject > 0) {
            setSelectedArticles(foundArticlesbySubject);
            setShowArticleByTitle(false);
            setshowArticlesBySuject(true);
        }
    };

    return (
        <article className="article-search">
            <h2 className="title">Chercher les articles</h2>
            <p>Vous cherchez un article en particulier ? Trouvez-le par son titre, ou son sujet !</p>
            <div className="selection-articles">
                <form onSubmit={handleSubmitTitle} className="form">
                    <label className="title">Titre de l'article</label>
                        <select onChange={(e) => setChoice(e.target.value)}>
                            <option disabled={true} selected>-----</option>
                            {allArticles.map((article, i) => {
                                return <option key={i}>{article.titre}</option>;
                            })
                            }
                        </select>
                    <button>Chercher l'article</button>
                </form>
                <form onSubmit={handleSubmitSubject} className="form">
                    <label className="title">Sujet des articles</label>
                        <select onChange={(e) => setChoice(e.target.value)}>
                            <option disabled={true} selected>-----</option>
                            {sujetsArticles.map((sujet, i) => {
                                return <option key={i}>{sujet}</option>;
                            })
                            }
                        </select>
                    <button>Chercher le sujet</button>
                </form>
            </div>
            <div className={"err-message"}>
            {message}
            </div>
            {showArticleByTitle && (
                <MiniCardsArticles articles={[selectedArticle]} />
            )}
            {showArticlesBySuject && (
                <MiniCardsArticles articles={selectedArticles} />
            )}
        </article>
    ); 
};

