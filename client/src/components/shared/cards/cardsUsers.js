import { URL } from "../../../helpers/urlHelpers";


export const CardsUsers = (props) => {

    return (
        <>
            {props.users.map((user, i) => {
                return (
                    <article key={i} className="card-user">
                        <div className="section-image">
                            <img alt={user.name} className="image" src={`${URL}/${user.images}`}/>
                        </div>
                        <div className="section-infos">
                            <p>Id user : {user._id}</p>
                            <p>Pseudo user : {user.pseudo}</p>
                        </div>
                    </article>
                );
            })}
        </>  
    );
};