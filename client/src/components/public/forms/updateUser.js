import { useState, useEffect } from "react";


import { URL } from "../../../helpers/urlHelpers.js";
import { getToken } from "../../../helpers/authHelpers.js";
import { Loading } from "../../../components/shared/loading/loading.js";


export const UpdateForm = (props) =>{

    const [token, setToken] = useState('');
    const [dataLoaded, setDataLoaded] = useState(false);
    const [pseudo, setPseudo] = useState(props.user.pseudo);
    const [name, setName] = useState(props.user.name);
    const [firstName, setFirstName] = useState(props.user.firstName);
    const [images, setImages] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
       
        const formData = new FormData(); 
        formData.append('pseudo', pseudo);
        formData.append('name', name);
        formData.append('firstName', firstName);
        formData.append('images', images);

        fetch(`${URL}/user/update`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        })
        .then((data) => {
            window.location.reload(false);
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
        console.log(props.id);
        setToken(getToken());
        setDataLoaded(true);
    }, [setToken]);
    
    if (!dataLoaded)
        return <Loading />;
    
    return (
        <article className="update">
            <h3>On change d'air ?</h3>
            <div className="div-form">
                <form onSubmit={handleSubmit} className="form" encType='multipart/form-data'>
                    <label>Nom : </label>
                        <input onChange={(e) => setName(e.target.value)} value={name} type="text" />
                    <label>Prénom : </label>
                        <input onChange={(e) => setFirstName(e.target.value)} value={firstName} type="text" />
                    <label>Pseudo : </label>
                        <input onChange={(e) => setPseudo(e.target.value)} value={pseudo} type="text" />
                    <label>Image : </label>
                        <input onChange={handleFileUpload} fileinput="multiple" type="file" />
                    <button>Mettre à jour le profil</button>
                </form>
            </div>
            <div className="err-message">
            {message}
            </div>
        </article>
    );
};