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
import { CardsLieux } from "../../../../components/shared/cards/cardsLieux.js";
import { Footer } from "../../../../components/shared/footer/footer.js";
import "../encyclopedieStyles.scss";


export const PagesLieux = (props) => {
    const location = useLocation(); 
    const state = location.state;
    const [message, setMessage] = useState("");
    const [lieux, setLieux] = useState([]);
    const [selectedLieu, setSelectedLieu] = useState("");
    const [selectedLieuDetails, setSelectedLieuDetails] = useState(null);
    const [dataLoaded, setDataLoaded] = useState(false);
    const lieuxFiltered = lieux.filter((lieu) => lieu.appartenance === `${state.appartenanceSetter}` );
    
    useEffect(() => {
        fetch(`${URL}/wiki/lieux`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        })
        .then((response) => response.json())
        .then((data) => {
            setLieux(data);
            setDataLoaded(true);
        })
        .catch((err) => {
            console.log(err);
            setMessage(err);
        });
        
        document.title = `Côté ${state.appartenanceSetter} : Lieux`;
        
    });
    
    const handleSubmitOne = (e) => {
        e.preventDefault();
        
        const foundLieu = lieux.find((lieu) => selectedLieu === lieu.nom);
        
        if (foundLieu) {
            setSelectedLieuDetails(foundLieu); 
        }
    };
    
    if(!dataLoaded)
        return <Loading />;
    
    return (
        <section className="main-encyclopedie">
            <NavBar />
            <main>
                <Header text={`Lieux ${state.textSetter}`}/>
                <GenericLink direction={"/encyclopedie/accueil-lieux"} class={"link-encyclopedie"} text={"Accueil des Lieux"} />
                <IntroductionArticlesEncyclopedie text={`lieux ${state.textSetter}`} liste={`${state.listeSetter}`}/>
                <NeedToTalk />
                <article className="div-search">
                    <div className="div-form">
                        <form onSubmit={handleSubmitOne} className="form">
                            <label>Nom du Lieu</label>
                            <select onChange={(e) => setSelectedLieu(e.target.value)}>
                                <option disabled={true} selected>-----</option>
                                    {lieuxFiltered.map((lieu, i) => {
                                        return <option key={i}>{lieu.nom}</option>;
                                    })}
                            </select>
                            <button>Chercher le lieu</button>
                        </form>
                    </div>
                    <div className={"err-message"}>{message}</div>
                    {selectedLieuDetails && (
                        <CardsLieux lieux={[selectedLieuDetails]} />
                    )}
                </article>
                <ReadAllPublic camp={`${state.appartenanceSetter}`} text={`${state.typeSetter}`} />
            </main>
            <Footer/>
        </section>
    );
};