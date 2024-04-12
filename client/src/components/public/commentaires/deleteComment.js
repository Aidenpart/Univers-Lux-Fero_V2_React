import { useState, useEffect } from "react";
import { faTrash, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import { URL } from "../../../helpers/urlHelpers.js";
import { getToken } from "../../../helpers/authHelpers.js";
import { Loading } from "../../shared/loading/loading.js";


export const DeleteComment = (props) =>{

    const [token, setToken] = useState("");
    const [commentId, setCommentId] = useState("");
    const [userComment, setUserComment] = useState("");
    const [userId, setUserId] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);

    const handleDelete = () => {

        fetch(`${URL}/user/delete-comment/${commentId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then((response) => (response.json))
        .then((data) => {
            window.location.reload(false) ;
        })
        .catch((err) => {
            console.log(err);
        });
        setModalIsOpen(false);
    };

    useEffect(() => {
        setToken(getToken());
        setUserId(props.userId);
        setCommentId(props.commentId);
        setUserComment(props.commentUserId);
        setDataLoaded(true);
    }, [props.userId, props.commentId, props.commentUserId, setToken]);
    
    if(!dataLoaded)
        return <Loading />;
    
    return (
        <div className="delete-button">
        {modalIsOpen && (
            <>
                <button onClick={handleDelete}><FontAwesomeIcon icon={faCheck} /></button>
                <button onClick={() => setModalIsOpen(false)}><FontAwesomeIcon icon={faXmark} /></button>
            </>
        )}
            {!modalIsOpen && userComment === userId ? (<button onClick={() => setModalIsOpen(true)}><FontAwesomeIcon icon={faTrash} /></button>) : ""}
        </div>
    );
};