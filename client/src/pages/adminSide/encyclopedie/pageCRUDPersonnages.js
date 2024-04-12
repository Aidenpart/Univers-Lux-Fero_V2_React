import { useEffect } from "react";


import { Header } from "../../../components/shared/header/header.js";
import { CreatePersonnage } from "../../../components/admin/CRUDPersonnages/createPersonnage.js";
import { ReadAllAdmin } from "../../../components/admin/CRUDGeneral/readAllAdmin.js";
import { GetOne } from "../../../components/admin/CRUDGeneral/getOne.js";
import { LinkPageAdmin } from "../../../components/shared/links/navigationLinks.js";
import { NavBar } from "../../../components/shared/navBar/navBar.js";
import { Footer } from "../../../components/shared/footer/footer.js";
import "../../../components/admin/adminComponentsStyles.scss";


export const PageCRUDPersonnages = () =>{

    useEffect(() => {
        document.title = "CRUD Personnages";
    });

    return (
        <section className="main-CRUD">  
            <NavBar/>
            <main>
                <Header text={"Page CRUD Personnages"} />
                <LinkPageAdmin/>
                <article className="links-CRUD">
                    <CreatePersonnage />
                    <GetOne dataSetter="personnages" textSetter="personnage"/>
                    <ReadAllAdmin text={"personnages"} />
                </article>
            </main>
            <Footer/>
        </section>
    );
};