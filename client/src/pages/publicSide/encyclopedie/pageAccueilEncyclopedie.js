import { useEffect } from "react";


import { NavBar } from "../../../components/shared/navBar/navBar.js";
import { Header } from "../../../components/shared/header/header.js";
import { LinkAccueil, GenericLink } from "../../../components/shared/links/navigationLinks.js";
import { IntroductionAccueilEncyclopedie } from "../../../components/public/introductions/introductions.js";
import { NeedToTalk } from "../../../components/public/needToTalk/needToTalkComponent.js";
import { Footer } from "../../../components/shared/footer/footer.js";
import "./encyclopedieStyles.scss";


export const PageAccueilEncyclopedie = () => {

    useEffect(() => {
        document.title = "Encyclopédie";
    });

    return (
        <section className="main-accueil-encyclopedie">
            <NavBar />
            <main>
                <Header text={"Encyclopédie"} />
                <LinkAccueil />
                <IntroductionAccueilEncyclopedie />
                <NeedToTalk/>
                <section className="link-section">
                    <GenericLink direction={"/encyclopedie/accueil-personnages"} class={"link"} text={"Personnages"} />
                    <GenericLink direction={"/encyclopedie/accueil-lieux"} class={"link"} text={"Lieux"} />
                </section>
            </main>
            <Footer/>
        </section>
    );
};