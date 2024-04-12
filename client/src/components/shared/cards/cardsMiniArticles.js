import { GenericLink } from "../../shared/links/navigationLinks.js";


export const MiniCardsArticles = (props) => {

    return (
        <>
            {props.articles.map((article, i) => {
                return (
                    <div key={i} className="mini-card">
                        <h3 className="sujet-mini-card">{article.sujet}</h3>             
                        <p className="titre-mini-card">{article.titre}</p>
                        <GenericLink direction={`/blog/article/${article._id}`} class={"link-mini-card"} text={"Lire l'article"} />
                    </div>
                );
            })}
        </>  
    );
};


export const MiniCardsArticlesAdmin = (props) => {
   
    return (
        <>
            {props.articles.map((article, i) => {
                return (
                    <div key={i} className="mini-card">
                        <h3 className="sujet-mini-card">{article.sujet}</h3>             
                        <p className="titre-mini-card">{article.titre}</p>
                        <GenericLink direction={`/admin/CRUD-Articles/article/${article._id}`} class={"link-mini-card"} text={"Voir l'article"} />
                    </div>
                );
            })}
        </>  
    );
};