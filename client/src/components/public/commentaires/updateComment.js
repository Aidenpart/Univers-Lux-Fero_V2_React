import { useState, useEffect } from "react";
import { faPenToSquare, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import { URL } from "../../../helpers/urlHelpers.js";
import { getToken } from "../../../helpers/authHelpers.js";
import { Loading } from "../../../components/shared/loading/loading.js";
import "./commentairesStyles.scss";


export const UpdateComment = (props) => {
    
    const [token, setToken] = useState('');
    const [userId, setUserId] = useState('');
    const [commentId, setCommentId] = useState("");
    const [contenu, setContenu] = useState(props.contenuComment);
    const [message, setMessage] = useState('');
    const [dataLoaded, setDataLoaded] = useState(false);
    const [userComment, setUserComment] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        
        formData.append('user', userId);
        formData.append('contenu', contenu);
        
        fetch(`${URL}/user/update-comment/${commentId}`, {
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
            setMessage(err);
        });
    };
    
    useEffect(() => {
        setToken(getToken());
        setUserId(props.userId);
        setCommentId(props.commentId);
        setUserComment(props.commentUserId);
        setDataLoaded(true);
    }, [props.userId, props.commentId, props.commentUserId, props.idArticle]);
    
    if (!dataLoaded)
        return <Loading />;

    return (
        <div className="update-comment">
            {modalIsOpen && (
                <>
                    <div className="update-form">
                        <form onSubmit={handleSubmit} className="form" encType='multipart/form-data'>
                            <textarea onChange={(e) => setContenu(e.target.value)} value={contenu} className="textarea"></textarea>
                            <button className="update-button"><FontAwesomeIcon icon={faCheck} /></button>
                        </form>
                    </div>
                    <button className="cancel-update-button" onClick={() => setModalIsOpen(false)}><FontAwesomeIcon icon={faXmark} /></button>
                    <div className="err-message">
                        {message}
                    </div>
                </>
            )}
                {!modalIsOpen && userComment === userId ? (<button className="update-modal" onClick={() => setModalIsOpen(true)}><FontAwesomeIcon icon={faPenToSquare} className="icon"/></button>) : ""}
        </div>
    );
};