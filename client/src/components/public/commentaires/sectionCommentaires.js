import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getUserbyToken } from "../../../helpers/authHelpers.js";
import { addUser } from "../../../store/slice/userSlice";


import { URL } from "../../../helpers/urlHelpers.js";
import { Loading } from "../../shared/loading/loading.js";
import { GenericLink } from "../../shared/links/navigationLinks.js";
import { CreateFormCommentaire } from "./createCommentaire.js";
import { CommentairesComponent } from "./commentairesComponent.js";
import "./commentairesStyles.scss";


export const SectionCommentaires = (props) => {
    
    const user = useSelector(state => state.user);
    const [articleId, setArticleId] = useState("");
    const [commentaires, setCommentaires] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [users, setUsers] = useState([]);
    const [usersLoaded, setUsersLoaded] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!dataLoaded) {
            fetch(`${URL}/usersPublic`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((data) => {
                setUsers(data);
                setArticleId(props.idArticle);
                setCommentaires(props.commentaires);
                setDataLoaded(true);            
            })
            .catch((err) => {
                console.log(err);    
            });
            
            if (localStorage.getItem('jwt') && !user.isLogged) {
                const userTokenPromise = getUserbyToken();
                userTokenPromise
                .then(data => {
                    setUsersLoaded(true);
                    dispatch(addUser(data));
                })
                .catch(err => {
                    console.log(err);
                });
            }
        }
        
    }, [props.commentaires, props.idArticle, dispatch, user]);
    
    if (!dataLoaded && !usersLoaded)
        return <Loading />;

    return (
        <>
        {commentaires.length === 0 && !user.isLogged ?
            <section className="switcher">
                <p>Connectez-vous ou inscrivez-vous pour être le premier à pouvoir commenter.</p>
                <GenericLink direction={"/connexion"} class={"link-encyclopedie"} text={"connexion"}/>
            </section>
            : commentaires.length === 0 ?
            <section className="switcher">
                <p>Soyez le premier à commenter</p>
                <CreateFormCommentaire idArticle={articleId} idUser={user.id}/>
            </section>
            : !user.isLogged ?
            <section className="switcher">
                <div className="espacement">
                    <p>Connectez-vous ou inscrivez-vous pour pouvoir commenter.</p>
                    <GenericLink direction={"/connexion"} class={"link-encyclopedie"} text={"connexion"}/>
                </div>
                <CommentairesComponent commentaires={commentaires} user={user} users={users}/>
            </section>
            : 
            <section className="switcher">
                <CreateFormCommentaire idArticle={articleId} idUser={user.id}/>
                <CommentairesComponent commentaires={commentaires} user={user} users={users}/>
            </section>
        }
        </>
    );
};