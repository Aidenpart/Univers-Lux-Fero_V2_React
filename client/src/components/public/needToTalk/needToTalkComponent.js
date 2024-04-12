import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import { GenericLink } from "../../shared/links/navigationLinks.js";
import "./stylesNeedToTalk.scss";


export const NeedToTalk = () => {
    
    return (
        <div className="need-to-talk">
            <p>Et si on en parlait ? <br />C'est par ici </p>
            <span>
                <GenericLink direction={"/blog"} class={""} text={"Vers le blog "} />
                <FontAwesomeIcon icon={faRightToBracket} />
            </span>
        </div>
    );
};