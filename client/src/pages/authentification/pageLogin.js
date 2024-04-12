import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addUser } from "../../store/slice/userSlice.js";


import { URL } from "../../helpers/urlHelpers.js";
import { Header } from "../../components/shared/header/header.js";
import { Footer } from "../../components/shared/footer/footer.js";
import { NavBar } from "../../components/shared/navBar/navBar.js";
import { GenericLink, LinkAccueil } from "../../components/shared/links/navigationLinks.js";
import "./authStyles.scss";


export const PageConnexion = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        fetch(`${URL}/auth/login`, {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
        .then((response) => response.json())
        .then(data => {
            if (data.message === "utilisateur/utilisatrice inexistant/e"){
                window.alert(data.message);
            }else{
                dispatch(addUser(data.user));
                localStorage.setItem('jwt', data.jwt);
                data.user.admin ? navigate("/admin") : navigate("/");
            }
        })
        .catch((err) => {
            console.log(err);
        });
        
        document.title = "Connexion";
        
    };    

    return (
        <section className="main-auth">
            <NavBar/>
            <main>
                <Header text={"Connexion"} />
                <article className="links-place">
                    <LinkAccueil/>
                    <GenericLink direction={"/register"} class={"link"} text={"Créer un compte"}/>
                </article>
                <article className="log-in-form">
                    <h3>S'identifier</h3>
                    <form onSubmit={handleSubmit} className="form">
                        <label>Email :</label>
                            <input placeholder={"Email"} type="mail" required onChange={(e) => setEmail(e.target.value)}/>
                        <label>Mot de passe :</label> 
                            <input placeholder={"Mot de passe"} type="password" required onChange={(e) => setPassword(e.target.value)}/>
                        <button>S'identifier</button>
                    </form>
                </article>
            </main>
            <Footer/>
        </section>
    );
};




