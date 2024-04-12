import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';


import { URL } from "../../../helpers/urlHelpers.js";
import { sujetsArticles } from "../categories.js";
import { Loading } from "../../../components/shared/loading/loading.js";
import { getToken } from "../../../helpers/authHelpers.js";
import "../adminComponentsStyles.scss";


export const UpdateArticle = (props) =>{

    const { id } = useParams(); 
    const navigate = useNavigate();
    const [titre, setTitre] = useState(props.article.titre);
    const [sujet, setSujet] = useState(props.article.sujet);
    const [nouveauSujet, setNouveauSujet] = useState([]);
    const [sujets, setSujets] = useState(sujetsArticles);
    const [contenu, setContenu] = useState(props.article.contenu);
    const [message, setMessage] = useState('');
    const [token, setToken] = useState('');
    const [dataLoaded, setDataLoaded] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
       
        const formData = new FormData(); 

        formData.append('titre', titre);
        formData.append('sujet', sujet);
        formData.append('contenu', contenu);

        fetch(`${URL}/admin/update-article/${id}`, {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${token}`
                },
                body: formData
        })
        .then((data) => {
            navigate('/admin/CRUD-Articles');
        })
        .catch((err) =>  {
            console.log(err);
            setMessage(err);
        });
    };
    
    const handleSubmitSujet = (e) => {
        e.preventDefault();
        setSujets([...sujets, nouveauSujet]);
    };
    
    useEffect(() => {
        setToken(getToken());
        setDataLoaded(true);
    }, [setToken, setDataLoaded]);
    
    if (!dataLoaded)
        return <Loading />;
    
    return (
        <article className="update">
            <section>
                <h3>Ajouter un sujet exceptionnel</h3>
                <form onSubmit={handleSubmitSujet} className="form">
                    <input onChange={(e) => setNouveauSujet(e.target.value)} type="text" required className="sujet"/>
                    <button>Ajouter un sujet</button>
                </form>            
            </section>
            <section>
                <h3>Modifier l'article</h3>
                <div className="div-form">
                    <form onSubmit={handleSubmit} className="form">
                        <label>Titre</label>
                        <input onChange={(e) => setTitre(e.target.value)} value={titre} type="text"/>
                        <label>Sujet</label>
                            <select onChange={(e) => setSujet(e.target.value)} value={sujet}>
                                {sujets.map((sujet, i) => {
                                    return <option key={i}>{sujet}</option>;
                                })
                                }
                            </select>                    
                        <label>Contenu</label>
                        <textarea onChange={(e) => setContenu(e.target.value)} value={contenu} className="textarea"></textarea>
                        <button>Mettre l'article à jour</button>
                    </form>
                </div>            
            </section>
            <div className={"err-message"}>
                {message}
            </div>
        </article>
    );
};