import { useEffect } from "react";


import { NavBar } from "../../components/shared/navBar/navBar.js";
import { Header } from "../../components/shared/header/header.js";
import { GenericLink, LinkLogOut } from "../../components/shared/links/navigationLinks.js";
import { Footer } from "../../components/shared/footer/footer.js";
import "./adminStyles.scss";


export const PageAdmin = () => {

    useEffect(() => {
        document.title = "Administrateur";
    });

    return (
        <section className="main-admin">  
            <NavBar/>
            <main>
                <Header text={"Page Admin"} />
                <article className="links">
                    <GenericLink direction={"/profil"} class={"link"} text={"Profil"}/>
                    <LinkLogOut />
                </article>
                <article className="links CRUD">
                    <GenericLink direction={"/admin/CRUD-Articles"} class={"links-admin"} text={"Création des Articles"}/>
                    <GenericLink direction={"/admin/CRUD-Lieux"} class={"links-admin"} text={`Création des Lieux`}/>
                    <GenericLink direction={"/admin/CRUD-Personnages"} class={"links-admin"} text={"Création des Personnages"}/>
                    <GenericLink direction={"/admin/users"} class={"links-admin"} text={"Liste des Utilisateurs"}/>
                    <GenericLink direction={"/admin/tests"} class={"links-admin"} text={"Page Test"}/>
                </article>
            </main>
            <Footer/>
        </section>
    );
};