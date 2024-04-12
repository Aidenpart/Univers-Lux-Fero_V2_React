import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../../store/slice/userSlice.js';


import { URL } from '../../helpers/urlHelpers.js';
import { NavBar } from "../../components/shared/navBar/navBar.js";
import { Header } from "../../components/shared/header/header.js";
import { LinkAccueil, GenericLink } from "../../components/shared/links/navigationLinks.js";
import { IntroductionRegister } from "../../components/public/introductions/introductions.js";
import { Footer } from "../../components/shared/footer/footer.js";
import "./authStyles.scss";


export const PageRegister = () =>{
    const [name, setName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [images, setImages] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setImages(file);
    };

    document.title = "Créer un profil";

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const uppercaseRegex = /[A-Z]/;
        const digitRegex = /\d/;
        const specialCharacterRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

        const formData = new FormData(); 

        formData.append('name', name);
        formData.append('firstName', firstName);
        formData.append('pseudo', pseudo);
        formData.append('images', images);
        formData.append('email', email);
        formData.append('password', password);        

        if(!uppercaseRegex.test(password) || !digitRegex.test(password) || !specialCharacterRegex.test(password) || password.length<8 ) {
            alert("Le mot de passe doit contenir minimum 8 caractères, dont un spécial, un chiffre, et une majuscule.");
        }else{
            fetch(`${URL}/auth/register`, {
                method: 'POST',
                body: formData
            })
            .then((response) => response.json())
            .then(data => {
                localStorage.setItem("jwt", data.jwt)
                dispatch(addUser(data.user));
                navigate('/profil');
            })
            .catch((err) => {
                console.log(err);
                setMessage("L'email existe déjà");
            });
        }
    };
    
    return (
        <section className="main-register">
            <NavBar/>
            <main>
                <Header text={"Créer un profil"}/>
                <article className="links-place">
                    <LinkAccueil/>
                    <GenericLink direction={"/connexion"} class={"link"} text={"S'identifier"}/>
                </article>
                <IntroductionRegister />
                <article className="form-register">
                    <h3>Créer un profil</h3>
                    <form onSubmit={handleSubmit} className="form" encType='multipart/form-data'>
                        <label>Nom :</label>
                            <input onChange={(e) => setName(e.target.value)} value={name} placeholder={"Nom"} type="text" required/>
                        <label>Prénom :</label>
                            <input onChange={(e) => setFirstName(e.target.value)} value={firstName} placeholder={"Prénom"} type="text" required/>
                        <label>Pseudo :</label>
                            <input onChange={(e) => setPseudo(e.target.value)} value={pseudo} placeholder={"Pseudo"} type="text" required/>
                        <label>Image :</label>
                            <input onChange={handleFileUpload} placeholder={"image"} fileinput="multiple" type="file" required/>
                        <label>Email :</label>
                            <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder={"Email"} type="email" required/>
                        <label>Mot de passe (8 characters minimum):</label>
                            <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder={"Mot de passe"} type="password" required/>
                        <button>Créer un profil</button>
                    </form>
                    <div className={"err-message"}>
                    {message}
                    </div>
                </article>
            </main>
            <Footer/>
        </section>
        );
};