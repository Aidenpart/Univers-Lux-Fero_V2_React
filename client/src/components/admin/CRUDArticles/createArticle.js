import { useState, useEffect } from "react";


import { URL } from "../../../helpers/urlHelpers.js";
import { sujetsArticles } from "../categories.js";
import { Loading } from "../../../components/shared/loading/loading.js";
import { getToken } from "../../../helpers/authHelpers.js";
import "../adminComponentsStyles.scss";


export const CreateArticle = () =>{
    
    const [token, setToken] = useState('');
    const [titre, setTitre] = useState('');
    const [sujet, setSujet] = useState('');
    const [nouveauSujet, setNouveauSujet] = useState([]);
    const [sujets, setSujets] = useState(sujetsArticles);
    const [contenu, setContenu] = useState('');
    const [message, setMessage] = useState('');
    const [dataLoaded, setDataLoaded] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
       
        const formData = new FormData(); 

        formData.append('titre', titre);
        formData.append('sujet', sujet);
        formData.append('contenu', contenu);

        fetch(`${URL}/admin/new-article`, {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${token}`
                },
                body: formData
        })
        .then((data) => {
            window.location.reload(false) ;
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
        <section className="article-CRUD">
            <div>
                <h3>Ajouter un sujet exceptionnel</h3>
                <form onSubmit={handleSubmitSujet} className="form-subject">
                    <input onChange={(e) => setNouveauSujet(e.target.value)} type="text" required/>
                    <button>Ajouter un sujet</button>
                </form>
            </div>
            <div>
                <h3>Écrire un article</h3>
                <div className="div-form-admin">
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
                        <button>Publier un article</button>
                    </form>
                </div>            
            </div>
            <div className={"err-message"}>
            {message}
            </div>
        </section>
    );
};