import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


import { URL } from "../../../helpers/urlHelpers.js";
import { appartenancesLieux } from "../categories.js";
import { Loading } from "../../../components/shared/loading/loading.js";
import { getToken } from "../../../helpers/authHelpers.js";
import "../adminComponentsStyles.scss";


export const CreateLieu = () =>{
    
    const navigate = useNavigate();    
    const [nom, setNom] = useState('');
    const [appartenance, setAppartenance] = useState('');
    const appartenances = appartenancesLieux;
    const [emplacement, setEmplacement] = useState('');
    const [description, setDescription] = useState('');
    const [population, setPopulation] = useState('');
    const [images, setImages] = useState('');
    const [message, setMessage] = useState('');
    const [token, setToken] = useState('');
    const [dataLoaded, setDataLoaded] = useState(false);
    
    const handleSubmit = (e) => {
        e.preventDefault();
       
        const formData = new FormData(); 

        formData.append('nom', nom);
        formData.append('appartenance', appartenance);
        formData.append('emplacement', emplacement);
        formData.append('description', description);
        formData.append('population', population);
        formData.append('images', images);
 
        fetch(`${URL}/admin/create-lieu`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`
            },
            body: formData
        })
        .then((data) => {
            navigate("/admin"); 
        })
        .catch((err) =>  {
            console.log(err);
            setMessage(err);
        });
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setImages(file);
    };
    
    useEffect(() => {
        setToken(getToken());
        setDataLoaded(true);
    }, [setToken, setDataLoaded]);

    if (!dataLoaded)
        return <Loading />;    

    return (
        <article className="article-CRUD">
            <h3>Créer un lieu</h3>
            <div className="div-form-admin">
                <form onSubmit={handleSubmit} className="form" encType='multipart/form-data'>
                    <label>Nom : </label>
                        <input onChange={(e) => setNom(e.target.value)} value={nom} placeholder={"nom"} type="text"/>
                    <label>Appartenance : </label>
                        <select onChange={(e) => setAppartenance(e.target.value)} value={appartenance}>
                            <option>-----</option>
                            {appartenances.map((appartenance, i) => {
                                return <option key={i}>{appartenance}</option>;
                            })
                            }
                        </select>
                    <label>Emplacement</label>
                        <input onChange={(e) => setEmplacement(e.target.value)} value={emplacement} placeholder={"emplacement"} type="text"/>
                    <label>Description</label>
                        <input onChange={(e) => setDescription(e.target.value)} value={description} placeholder={"description"} type="text"/>
                    <label>Population</label>
                        <input onChange={(e) => setPopulation(e.target.value)} value={population} placeholder={"population"} type="number"/>
                    <label>Images</label>
                        <input onChange={handleFileUpload} placeholder={"image"} fileinput="multiple" type="file" />
                    <button>Créer un lieu</button>
                </form>
            </div>
            <div className={"err-message"}>
            {message}
            </div>
        </article>
    );
};