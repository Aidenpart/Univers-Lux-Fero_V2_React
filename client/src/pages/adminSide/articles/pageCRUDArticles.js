import { useEffect } from "react";


import { Header } from "../../../components/shared/header/header.js";
import { CreateArticle } from "../../../components/admin/CRUDArticles/createArticle.js";
import { ReadAllArticles } from "../../../components/admin/CRUDArticles/readArticles.js";
import { GetOneArticle } from "../../../components/admin/CRUDArticles/getOneArticle.js";
import { LinkPageAdmin } from "../../../components/shared/links/navigationLinks.js";
import { NavBar } from "../../../components/shared/navBar/navBar.js";
import { Footer } from "../../../components/shared/footer/footer.js";

import "../../../components/admin/adminComponentsStyles.scss";


export const PageCRUDArticles = () =>{

    useEffect(() => {
        document.title = "CRUD Articles";
    });

    return (
        <section className="main-CRUD">  
            <NavBar/>
            <main>
                <Header text={"Les Articles"} />
                <LinkPageAdmin/>
                <CreateArticle />
                <GetOneArticle />
                <ReadAllArticles />
            </main>
            <Footer/>
        </section>
    );
};