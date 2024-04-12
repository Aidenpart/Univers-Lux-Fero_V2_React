import { useSelector } from 'react-redux';
import { useState, useEffect } from "react";


import { URL } from '../../helpers/urlHelpers.js';
import { NavBar } from "../../components/shared/navBar/navBar.js";
import { Header } from "../../components/shared/header/header.js";
import { LinkLogOut, LinkAccueil } from "../../components/shared/links/navigationLinks.js";
import { LinkPageAdmin } from "../../components/shared/links/navigationLinks.js";
import { UpdateForm } from "../../components/public/forms/updateUser.js";
import { Footer } from "../../components/shared/footer/footer.js";
import { Loading } from "../../components/shared/loading/loading.js";

import "./authStyles.scss";


export const PageProfil = () => {
    
    const [id, setId] = useState("");
    const user = useSelector(state => state.user);

    useEffect(() => {
        setId(user.id);
        document.title = "Profil";
    }, [user]);


    if (!user.name)
        return <Loading />;
    
        
    return (
        <section className="main-user">
            <NavBar/>
            <main>
                <Header text={`Bonjour, ${user.pseudo}`} />
                <article className="links-place">
                    <LinkAccueil/>
                    <LinkLogOut/>
                </article>
                <article className="info-user">
                    <div className="info-side">
                        <h4>Infos User</h4>
                        <p>Nom : {user.name}</p>
                        <p>Prénom : {user.firstName}</p>
                        <p>Mail : {user.email}</p>
                        <p>Peusdo : {user.pseudo}</p>
                    </div>
                    <div className="img-side border-right">
                        <img src={`${URL}/${user.images}`} alt="user"/>
                    </div>
                </article>
                { user.isAdmin? <LinkPageAdmin/> : "" }
                <UpdateForm user={user} id={id}/>
            </main>
            <Footer/>
        </section>
    );
};