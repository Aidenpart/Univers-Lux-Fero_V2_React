import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


import { URL } from '../../../helpers/urlHelpers.js';
import { addUser } from "../../../store/slice/userSlice";
import { getUserbyToken } from "../../../helpers/authHelpers.js";


import { Loading } from "../../../components/shared/loading/loading.js";
import { NavBar } from "../../../components/shared/navBar/navBar.js";
import { GenericLink } from "../../../components/shared/links/navigationLinks.js";
import { SectionCommentaires } from "../../../components/public/commentaires/sectionCommentaires.js";
import { Footer } from "../../../components/shared/footer/footer.js";
import "./blogStyles.scss";


export const PageArticle = (props) => {
    
    const { id } = useParams();
    const [article, setArticle] = useState([]);
    const [commentaires, setCommentaires] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const user = useSelector(state => state.user);
    const [userLoaded, setUserLoaded] = useState(false);
    const dispatch = useDispatch();

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
            setCommentaires(data.commentaires);
            setDataLoaded(true);
        })
        .catch((err) => {
            console.log(err);
        });
        
        if (localStorage.getItem('jwt') && !user.isLogged) {
            const userTokenPromise = getUserbyToken();
            userTokenPromise
            .then(data => {
                setUserLoaded(true);
                dispatch(addUser(data));
            })
            .catch(err => {
                console.log(err);
            });
        }
        
        document.title = `${article.titre}`;
        
    }, [id, article.titre, dispatch, user.isLogged]);
    
    if(!dataLoaded && !userLoaded)
        return <Loading />;

    return (
        <section className="main-article">
            <NavBar />
            <main>
                <GenericLink direction={"/blog"} class={"link"} text={"Accueil Blog"} />
                <article className="article">
                    <h2 className="titre">{article.sujet}</h2>
                    <h1 className="titre">{article.titre}</h1>
                    <p>{article.contenu}</p>
                    <SectionCommentaires commentaires={commentaires} idArticle={id}/>
                </article>
            </main>
            <Footer/>
        </section>
    );
};