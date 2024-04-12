import { useState, useEffect } from "react";


import { URL } from "../../../helpers/urlHelpers.js";
import { Header } from "../../../components/shared/header/header.js";
import { Loading } from "../../../components/shared/loading/loading.js";
import { NavBar } from "../../../components/shared/navBar/navBar.js";
import { Footer } from "../../../components/shared/footer/footer.js";
import { CardsUsers } from "../../../components/shared/cards/cardsUsers.js";
import "../adminStyles.scss";


export const PageUsers = () => {
    
    const [users, setUsers] = useState("") ;
    const [dataLoaded, setDataLoaded] = useState(false);
    
    useEffect(() => {

        fetch(`${URL}/usersPublic`, {
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((data) => {
            setUsers(data);
            setDataLoaded(true);
        })
        .catch((err) => {
            console.log(err);
        });
        
        document.title = "Utilisateurs";
        
    }, [setUsers, setDataLoaded]);
    
    if(!dataLoaded) {
        return <Loading />;
    }
    
    return (
        <section className="main-users">  
            <NavBar/>
            <main>
                <Header text={"Page Users"} />
                <section className="card-section">
                    <CardsUsers users={users}/>
                </section>
           </main>
            <Footer/>
        </section>
    );
};