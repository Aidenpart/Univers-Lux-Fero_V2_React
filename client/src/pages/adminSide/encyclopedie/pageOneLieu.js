import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


import { URL } from "../../../helpers/urlHelpers.js";
import { Loading } from "../../../components/shared/loading/loading.js";
import { Header } from "../../../components/shared/header/header.js";
import { CardsLieux } from "../../../components/shared/cards/cardsLieux.js";
import { UpdateLieu } from "../../../components/admin/CRUDLieux/updateLieu.js";
import { DeleteOne } from "../../../components/admin/CRUDGeneral/deleteOne.js";
import { GenericLink } from "../../../components/shared/links/navigationLinks.js";
import { NavBar } from "../../../components/shared/navBar/navBar.js";
import { Footer } from "../../../components/shared/footer/footer.js";
import "../../../components/admin/adminComponentsStyles.scss";


export const PageOneLieu = () =>{
 
    const { id } = useParams(); 
    const [lieu, setLieu] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        
        fetch(`${URL}/wiki/lieux/get-lieu/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((data) => {
            setLieu(data);
            setDataLoaded(true);
        })
        .catch((err) => {
            console.log(err);
        });
        
        document.title = `${lieu.nom}`;

    }, [lieu.nom, id]);

    if(!dataLoaded)
        return <Loading />;
 
    return (
        <section className="CRUD-One">  
            <NavBar/>
            <main>
                <Header text={lieu.nom} />
                <GenericLink direction={"/admin/CRUD-Lieux"} class={"link"} text={"CRUD Lieux"}/>
                <UpdateLieu lieu={lieu} id={id}/>
                <DeleteOne text={"lieu"} direction={"Lieux"}/>
                <CardsLieux lieux={[lieu]}/>
            </main>
            <Footer/>
        </section>
    );
};