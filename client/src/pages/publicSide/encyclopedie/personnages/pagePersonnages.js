import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";


import { URL } from "../../../../helpers/urlHelpers.js";
import { Loading } from "../../../../components/shared/loading/loading.js";
import { NavBar } from "../../../../components/shared/navBar/navBar.js";
import { Header } from "../../../../components/shared/header/header.js";
import { GenericLink } from "../../../../components/shared/links/navigationLinks.js";
import { IntroductionArticlesEncyclopedie } from "../../../../components/public/introductions/introductions.js";
import { NeedToTalk } from "../../../../components/public/needToTalk/needToTalkComponent.js";
import { ReadAllPublic } from "../../../../components/public/encyclopedie/readAllPublic.js";
import { CardCharacter } from "../../../../components/shared/cards/cardsEncyclopedie.js";
import { Footer } from "../../../../components/shared/footer/footer.js";
import "../encyclopedieStyles.scss";


export const PagePersonnages = (props) => {
    const location = useLocation(); 
    const state = location.state;
    const [message, setMessage] = useState("");
    const [personnages, setPersonnages] = useState([]);
    const [selectedPersonnage, setSelectedPersonnage] = useState("");
    const [selectedPersonnageDetails, setSelectedPersonnageDetails] = useState(null);
    const [dataLoaded, setDataLoaded] = useState(false);
    const personnagesFiltered = personnages.filter((personnage) => personnage.appartenance === `${state.appartenanceSetter}` );
    
    useEffect(() => {
        fetch(`${URL}/wiki/personnages`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        })
        .then((response) => response.json())
        .then((data) => {
            setPersonnages(data);
            setDataLoaded(true);
        })
        .catch((err) => {
            console.log(err);
            setMessage(err);
        });
        
        document.title = `Côté ${state.appartenanceSetter} : Personnages`;
        
    }, [state.appartenanceSetter]);
    
    const handleSubmitOne = (e) => {
        e.preventDefault();
        
        const foundPersonnage = personnages.find((personnage) => selectedPersonnage === personnage.nom);
        
        if (foundPersonnage) {
            setSelectedPersonnageDetails(foundPersonnage); 
        }
    };
    
    if(!dataLoaded)
        return <Loading />;
    
    return (
        <section className="main-encyclopedie">
            <NavBar />
            <main>
                <Header text={`Personnages ${state.textSetter}`}/>
                <GenericLink direction={"/encyclopedie/accueil-personnages"} class={"link-encyclopedie"} text={"Accueil des Personnages"} />
                <IntroductionArticlesEncyclopedie text={`personnages ${state.textSetter}`} liste={`${state.listeSetter}`}/>
                <NeedToTalk />
                <article className="div-search">
                    <div className="div-form">
                        <form onSubmit={handleSubmitOne} className="form">
                            <label>Nom du Personnage</label>
                            <select onChange={(e) => setSelectedPersonnage(e.target.value)}>
                                <option disabled={true} selected>-----</option>
                                    {personnagesFiltered.map((personnage, i) => {
                                        return <option key={i}>{personnage.nom}</option>;
                                    })}
                            </select>
                            <button>Chercher le personnage</button>
                        </form>
                    </div>
                    <div className={"err-message"}>{message}</div>
                    {selectedPersonnageDetails && (
                        <CardCharacter personnages={[selectedPersonnageDetails]} />
                    )}
                </article>
                <ReadAllPublic camp={`${state.appartenanceSetter}`} text={`${state.typeSetter}`} />
            </main>
            <Footer/>
        </section>
    );
};