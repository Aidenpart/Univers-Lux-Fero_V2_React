import { useEffect } from "react";


import { NavBar } from "../../../../components/shared/navBar/navBar.js";
import { Header } from "../../../../components/shared/header/header.js";
import { GenericLink, GenericLinkDynamicData } from "../../../../components/shared/links/navigationLinks.js";
import { IntroductionPageEncyclopedie } from "../../../../components/public/introductions/introductions.js";
import { NeedToTalk } from "../../../../components/public/needToTalk/needToTalkComponent.js";
import { Footer } from "../../../../components/shared/footer/footer.js";
import "../encyclopedieStyles.scss";


export const PageAccueilLieux = () => {

    useEffect(() => {
        document.title = "Accueil Lieux";
    });

    return (
        <section className="main-encyclopedie">
            <NavBar />
            <main>
                <Header text={"Lieux"}/>
                <GenericLink direction={"/encyclopedie"} class={"link"} text={"Accueil Encyclopédie"} />
                <IntroductionPageEncyclopedie text={"lieux"}/>
                <NeedToTalk/>
                <section className="link-section">
                    <GenericLinkDynamicData 
                        direction={"/encyclopedie/accueil-lieux/lieux"} 
                        class={"link-encyclopedie"} 
                        text={"Lieux des Cieux"} 
                        setters={{
                            appartenanceSetter : "Cieux", 
                            listeSetter : "hauts-lieux, villes et mégastructure", 
                            textSetter : "des Cieux",
                            typeSetter: "lieux"
                        }} 
                    />
                    <GenericLinkDynamicData 
                        direction={"/encyclopedie/accueil-lieux/lieux"} 
                        class={"link-encyclopedie"} 
                        text={"Lieux de l'Enfer"} 
                        setters={{
                            appartenanceSetter : "Enfer", 
                            listeSetter : "hauts-lieux, villes et mégastructure", 
                            textSetter : "de l'Enfer",
                            typeSetter: "lieux"
                        }} 
                    />
                </section>
            </main>
            <Footer/>
        </section>
    );
};