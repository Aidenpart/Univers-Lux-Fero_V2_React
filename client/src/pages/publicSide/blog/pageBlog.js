import { useEffect } from "react";


import { NavBar } from "../../../components/shared/navBar/navBar.js";
import { Header } from "../../../components/shared/header/header.js";
import { LinkAccueil } from "../../../components/shared/links/navigationLinks.js";
import { Preambule } from "../../../components/public/introductions/introductions.js";
import { GetArticlePublic } from "../../../components/public/blog/getArticlesPublic.js";
import { ReadAllArticlesPublic } from "../../../components/public/blog/readAllArticlesPublic.js";
import { Footer } from "../../../components/shared/footer/footer.js";
import "./blogStyles.scss";


export const PageBlog = () => {

    useEffect(() => {
        document.title = "Blog";
    });

    return (
        <section className="main-blog">  
            <NavBar />
            <main>
                <Header text={"Blog"} />
                <br />
                <LinkAccueil />
                <Preambule />
                <GetArticlePublic />
                <ReadAllArticlesPublic />
            </main>
            <Footer/>
        </section>
    );
};