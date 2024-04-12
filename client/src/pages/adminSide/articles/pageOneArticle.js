import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


import { URL } from "../../../helpers/urlHelpers.js";
import { Loading } from "../../../components/shared/loading/loading.js";
import { Header } from "../../../components/shared/header/header.js";
import { GenericLink } from "../../../components/shared/links/navigationLinks.js";
import { UpdateArticle } from "../../../components/admin/CRUDArticles/updateArticle.js";
import { DeleteArticle } from "../../../components/admin/CRUDArticles/deleteArticle.js";
import { NavBar } from "../../../components/shared/navBar/navBar.js";
import { Footer } from "../../../components/shared/footer/footer.js";
import "../../../components/admin/adminComponentsStyles.scss";


export const PageOneArticle = () =>{
 
    const { id } = useParams(); 
    const [article, setArticle] = useState("") ;
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {

        fetch(`${URL}/blog/articles/get-article/${id}`, {
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((data) => {
            setArticle(data.specifiedArticle);
            setDataLoaded(true);
        })
        .catch((err) => {
            console.log(err);
        });
        
        document.title = `${article.titre}`;

    }, [dataLoaded, article.titre, id]);

    if(!dataLoaded)
        return <Loading />;
    
    return (
        <section className="CRUD-One">  
            <NavBar/>
            <main>
                <Header text={article.titre} />
                <GenericLink direction={"/admin/CRUD-Articles"} class={"link"} text={"CRUD Articles"}/>
                <UpdateArticle article={article}/>
                <DeleteArticle />
            </main>
            <Footer/>
        </section>
    );
};