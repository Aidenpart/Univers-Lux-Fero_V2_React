import { useEffect } from "react";


import { NavBar } from "../../../../components/shared/navBar/navBar.js";
import { Header } from "../../../../components/shared/header/header.js";
import { GenericLink, GenericLinkDynamicData } from "../../../../components/shared/links/navigationLinks.js";
import { IntroductionPageEncyclopedie } from "../../../../components/public/introductions/introductions.js";
import { NeedToTalk } from "../../../../components/public/needToTalk/needToTalkComponent.js";
import { Footer } from "../../../../components/shared/footer/footer.js";
import "../encyclopedieStyles.scss";


export const PageAccueilPersonnages = () => {

    useEffect(() => {
        document.title = "Accueil Personnages";
    });

    return (
        <section className="main-encyclopedie">
            <NavBar />
            <main>
                <Header text={"Personnages"}/>
                <GenericLink direction={"/encyclopedie"} class={"link"} text={"Accueil Encyclopédie"} />
                <IntroductionPageEncyclopedie text={"personnages"}/>
                <NeedToTalk/>
                <section className="link-section">
                    <GenericLinkDynamicData 
                        direction={"/encyclopedie/accueil-personnages/personnages"} 
                        class={"link-encyclopedie"} 
                        text={"Personnages des Cieux"} 
                        setters={{
                            appartenanceSetter : "Céleste", 
                            listeSetter : "anges, primordiaux, et archanges", 
                            textSetter : "des Cieux",
                            typeSetter: "personnages"
                        }}
                    />
                    <GenericLinkDynamicData 
                        direction={"/encyclopedie/accueil-personnages/personnages"} 
                        class={"link-encyclopedie"} 
                        text={"Personnages de l'Enfer"} 
                        setters={{
                            appartenanceSetter : "Infernal", 
                            listeSetter : "déchus, démons, et Généraux infernaux",
                            textSetter : "de l'Enfer",
                            typeSetter: "personnages"
                        }} 
                    />
                </section>
            </main>
            <Footer/>
        </section>
    );
};
