import { useState, useEffect } from "react";


import { URL } from "../../../helpers/urlHelpers.js";
import { Loading } from "../../../components/shared/loading/loading.js";
import { getToken } from "../../../helpers/authHelpers.js";
import "../forms/formStyle.scss";


export const CreateFormCommentaire = (props) => {

    const [articleId, setArticleId] = useState(props.idArticle);
    const [userId, setUserId] = useState(props.userId);
    const [contenu, setContenu] = useState('');
    const [token, setToken] = useState('');
    const [dataLoaded, setDataLoaded] = useState(false);
    
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        
        formData.append('article', articleId);
        formData.append('user', userId);
        formData.append('contenu', contenu);
        
        fetch(`${URL}/user/comment`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
        },
        body: formData
        })
        .then((data) => {
            window.location.reload(false);
            setUserId(props.idUser);
        })
        .catch((err) => {
            console.log(err);
        });
    };
    
    useEffect(() => {
        setToken(getToken());
        setUserId(props.idUser);
        setArticleId(props.idArticle);
        setDataLoaded(true);
    }, [props.idUser, props.idArticle, setToken, setDataLoaded]);

    if (!dataLoaded)
        return <Loading />;
    
    return (
        <div className="comment-form">
            <form onSubmit={handleSubmit} className="form" encType='multipart/form-data'>
                <h4>Un commentaire ?</h4>
                <textarea onChange={(e) => setContenu(e.target.value)} value={contenu} placeholder={contenu} className="textarea"></textarea>
                <button>Poster le commentaire</button>
            </form>
        </div>
    );
};