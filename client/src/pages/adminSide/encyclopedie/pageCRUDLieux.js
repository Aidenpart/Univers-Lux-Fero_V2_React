import { useEffect } from "react";


import { Header } from "../../../components/shared/header/header.js";
import { CreateLieu } from "../../../components/admin/CRUDLieux/createLieu.js";
import { ReadAllAdmin } from "../../../components/admin/CRUDGeneral/readAllAdmin.js";
import { GetOne } from "../../../components/admin/CRUDGeneral/getOne.js";
import { LinkPageAdmin } from "../../../components/shared/links/navigationLinks.js";
import { NavBar } from "../../../components/shared/navBar/navBar.js";
import { Footer } from "../../../components/shared/footer/footer.js";
import "../../../components/admin/adminComponentsStyles.scss";


export const PageCRUDLieux = () =>{

    useEffect(() => {
        document.title = "CRUD Lieux";
    });

    return (
        <section className="main-CRUD">  
            <NavBar/>
            <main>
                <Header text={"Page CRUD Lieux"} />
                <LinkPageAdmin/>
                <article className="links-CRUD">
                    <CreateLieu />
                    <GetOne dataSetter="lieux" textSetter="lieu"/>
                    <ReadAllAdmin text={"lieux"} />
                </article>
            </main>
            <Footer/>
        </section>
    );
};