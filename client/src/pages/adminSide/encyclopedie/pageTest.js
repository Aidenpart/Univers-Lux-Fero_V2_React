import { useEffect } from "react";


import { NavBar } from "../../../components/shared/navBar/navBar.js";
import { Header } from "../../../components/shared/header/header.js";
import { GenericLink, LinkLogOut } from "../../../components/shared/links/navigationLinks.js";
import { Footer } from "../../../components/shared/footer/footer.js";
import "../adminStyles.scss";


export const PageTest = () => {

    useEffect(() => {
        document.title = "Page Test";
    });

    return (
        <section className="main-admin">  
            <NavBar/>
            <main>
            </main>
            <Footer/>
        </section>
    );
};