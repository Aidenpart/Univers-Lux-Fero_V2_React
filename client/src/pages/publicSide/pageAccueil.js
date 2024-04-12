import { useEffect } from "react";


import { NavBar } from "../../components/shared/navBar/navBar.js";
import { Header } from "../../components/shared/header/header.js";
import { GenericLink } from "../../components/shared/links/navigationLinks.js";
import { Introduction } from "../../components/public/introductions/introductions.js";
import { Footer } from "../../components/shared/footer/footer.js";
import "./accueilStyles.scss";


export const PageAccueil = () => {

    useEffect(() => {
        document.title = "Lux Fero";
    });

    return (
        <section className="main-accueil">  
            <NavBar />
            <main>
                <Header text={"Accueil"} />
                <Introduction/>
                <section className="link-section">
                    <GenericLink direction={"/encyclopedie/"} class={"link"} text={"Encyclopédie"} />
                    <GenericLink direction={"/blog/"} class={"link"} text={"Blog"} />
                </section>
            </main>
            <Footer/>
        </section>
    );
};