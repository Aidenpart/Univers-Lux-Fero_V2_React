import { useState, useEffect } from "react";


import { URL } from "../../../helpers/urlHelpers.js";
import { UpdateComment } from "./updateComment.js";
import { DeleteComment } from "./deleteComment.js";
import { DeleteCommentAdmin } from "../../admin/buttons/deleteCommentAdmin.js";
import { Loading } from "../../shared/loading/loading.js";
import "./commentairesStyles.scss";


export const CommentairesComponent = (props) => {

    const [users, setUsers] = useState("");
    const [user, setUser] = useState("");
    const [commentaires, setCommentaires] = useState(props.commentaires);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        setUsers(props.users);
        setUser(props.user);
        setDataLoaded(true);
    }, [setUsers, props.user, props.users]);
    
    const findUserById = (userId) => {
        const user = users.find((user) => user._id === userId);
        return user ? user : 'Utilisateur inconnu';
    };

    const newFormatDate = (date) => {
        const newDate = date.replace("T", ' à ').slice(0,date.length-3)
        return newDate
    }
    
    if (!dataLoaded)
        return <Loading />;

    return (
        <>
            {commentaires.length>0 && commentaires.map((commentaire, i) => (
            <div key={i} className="commentaire">
                <p className="pseudo-user border-right">{findUserById(commentaire.user).pseudo}</p>
                <p>Posté le {newFormatDate(commentaire.createdAt)}</p>
                <div className="img-commentaire border-right">
                    <img alt="user" src={`${URL}/${findUserById(commentaire.user).images}`} props="user-picture" />
                </div>
                <p className="contenu">{commentaire.contenu}</p>
                {
                    !user.isAdmin ?
                    <> 
                        <DeleteComment commentId={commentaire._id} userId={user.id} commentUserId={commentaire.user} />
                        <UpdateComment commentId={commentaire._id} userId={user.id} commentUserId={commentaire.user} contenuComment={commentaire.contenu} />
                    </>
                    :
                    <>
                    <DeleteCommentAdmin commentId={commentaire._id} />
                    <UpdateComment commentId={commentaire._id} userId={user.id} commentUserId={commentaire.user} contenuComment={commentaire.contenu} />
                    </>
                }
            </div>
            ))}
        </>
    );
};
