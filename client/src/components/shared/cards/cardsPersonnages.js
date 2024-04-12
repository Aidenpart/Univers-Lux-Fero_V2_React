import { URL } from "../../../helpers/urlHelpers";
import "./cardsStyles.scss";


export const CardsPersonnages = (props) => {

    return (
        <>
            {props.personnages.map((personnage, i) => {
                return (
                    <article key={i} className="card">
                        <h1>{personnage.nom}</h1>
                        <p>Groupe d'appartenance : {personnage.appartenance}</p>
                        <p>Titre(s) : {personnage.titre}</p>
                        <p>{personnage.description}</p>
                        <section className="section-image">
                            <img alt={personnage.nom} className="image" src={`${URL}/${personnage.images}`}/>
                        </section>
                    </article>
                );
            })}
        </>  
    );
};