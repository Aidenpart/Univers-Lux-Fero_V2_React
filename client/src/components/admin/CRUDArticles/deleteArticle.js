import { useState, useEffect } from "react";
import { useParams, useNavigate} from 'react-router-dom';


import { URL } from "../../../helpers/urlHelpers.js";
import { Loading } from "../../../components/shared/loading/loading.js";
import { getToken } from "../../../helpers/authHelpers.js";
import "../adminComponentsStyles.scss";


export const DeleteArticle = () =>{
 
    const { id } = useParams();
    const navigate = useNavigate();
    const [token, setToken] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);
    
    const handleDelete = () => {

        fetch(`${URL}/admin/delete-article/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => { 
            navigate("/admin/CRUD-Articles");
        })
        .catch((err) => {
            console.log(err);
        });
        
        setModalIsOpen(false);
    };
    
    useEffect(() => {
        setToken(getToken());
        setDataLoaded(true);
    }, [setToken, setDataLoaded]);
    
    if (!dataLoaded)
        return <Loading />;
        
    return (
        <div className="delete">
            <h2>Supprimer l'article</h2>
            {modalIsOpen && (
                <>
                    <button onClick={handleDelete}>Confirmer</button>
                    <button onClick={() => setModalIsOpen(false)}>Annuler</button>
                </>
            )}
                {!modalIsOpen && (<button onClick={() => setModalIsOpen(true)}>Supprimer</button>)}
        </div>
    );
};