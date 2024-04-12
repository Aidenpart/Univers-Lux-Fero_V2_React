import { useEffect } from "react";

import { Header } from "../../../components/shared/header/header.js";
import { NavBar } from "../../../components/shared/navBar/navBar.js";
import { LinkAccueil } from "../../../components/shared/links/navigationLinks.js";
import { Footer } from "../../../components/shared/footer/footer.js";
import "./legalStyles.scss";


export const PageMentionsLegales = () => {

    useEffect(() => {
        document.title = "Mentions Légales";
    });

    return (
        <section className="main-legal">
            <NavBar/>
            <main>
                <LinkAccueil/>
                <Header text={"Mentions Légales"} />
                <article>
                    <h2>Propriétaire du site</h2>
                    <p>Site crée par Sulivan GEFFROY</p>
                    <a href="mailto:sulivan.geffroy@3wa.io">Envoyer un courriel</a>
                    <h2>But du site</h2>
                    <p>Ce site est un support de soutenance dans le cadre de la formation 3WA Fullstack React Node JS.</p>
                    <h2>Mentions Relatives à la Propriété Intellectuelle</h2>
                    <p>Les polices de caractère sont issues de Google-Fonts</p>
                    <p>Les images sont issues de Wallhaven.cc et appartiennent à leurs auteurs et autrices respectives</p>
                    <p>Les symboles sont issus de Font-Awesome</p>
                </article>
            </main>
            <Footer/>
        </section>
    );
};




