import { useState, useEffect } from "react";
import { faTrash, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import { URL } from "../../../helpers/urlHelpers.js";
import { getToken } from "../../../helpers/authHelpers.js";
import { Loading } from "../../shared/loading/loading.js";


export const DeleteCommentAdmin = (props) =>{
    
    const [token, setToken] = useState('');
    const [commentId, setCommentId] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);

    const handleDelete = (e) => {
        e.preventDefault();

        fetch(`${URL}/admin/delete-comment-by-admin/${commentId}`, {
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
        setCommentId(props.commentId);
        setDataLoaded(true);
    }, [props.commentId, setToken]);
    
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
            {!modalIsOpen ? (<button onClick={() => setModalIsOpen(true)}><FontAwesomeIcon icon={faTrash} /></button>) : ""}
        </div>
    );
};