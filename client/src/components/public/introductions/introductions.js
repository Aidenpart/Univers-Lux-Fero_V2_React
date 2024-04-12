import { faBookJournalWhills } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import "./introductionsStyles.scss";


export const Introduction = () => {
    
    return (
        <article className="intro-accueil">
            <p className="introduction">
                Lecteurs, Lectrices, curieux et curieuses de tous horizons
                <br /><span className="bienvenu">Bienvenue sur le site officiel de</span>
                <br /><span className="titre-LF">Lux Fero</span>
                <br />Ici, vous trouverez nombres d'articles, d'informations, et détails quant aux personnages et lieux du roman. N'hésitez pas à interagir, parcourir, et laisser des commentaires sous les articles, tout ça pour le simple coût d'un profil.
                <br />Et pour ceux qui ne souhaitent que se renseigner, l'encyclopedie vous est ouverte.
                <br />Si vous découvrez cet endroit, un lien pour lire le roman se trouve à la suite de ce paragraphe, en accès sur la plateforme Wattpad.
                <br />Alors, comme il m'est l'habitude de le dire, que vous voguiez ici, ou là-bas...
                <br />Bonne Lecture ! 
            </p>
            <a className="lien-wattpad" rel="noreferrer" target="_blank" href="https://www.wattpad.com/story/318552524-lux-fero-le-porteur-de-lumi%C3%A8re">
                <FontAwesomeIcon icon={faBookJournalWhills} /><span className="lire-roman">Lire le roman</span>
            </a>
        </article>
    );
};


export const IntroductionRegister = () => {
    
    return (
        <article className="intro-register">
            <p className="introduction">
                Pourquoi créer un profil, me direz-vous ? J'ai déjà accès à toute l'encyclopédie et à la lecture des articles du blog !
                <br />Certes, vous-répondrais-je. Mais et si vous désiriez discuter avec les autres lecteurs et lectrices ? Pour cela, une unique solution :
                <br /><span className="titre-LF">Inscrivez-vous !</span>
            </p>
        </article>
    );
};


export const Preambule = () => {
    
    return (
        <article className="preambule">
            <h2 className="titre">Préambule</h2>
            <p className="introduction">
                <span className="bienvenu">Bonjour à tous et toutes !</span>
                <br />Ici l'auteur ! Je suis ravi de vous accueillir en ces lieux !
                <br />Vous trouverez ici des articles de mon cru, où vous me trouverez à déblatérer quant à l'écriture de ce roman, à ma condition d'auteur, ou à la suite des aventures de mes héros et héroïnes.
                <br />Votre retour m'est précieux, alors n'hésitez pas à commenter (dans le respect des unes et des autres, même si leur avis vous déplait)
                <br />Ensemble, construisons une communauté engagée et passionnée autour des personnages et lieux de cet univers.
                <br />J'ai hâte de vous lire !
                <br />
                <br /><span className="titre-LF">L'auteur</span>
                <br />
                <br />Vous voulez commenter ? 
                <br />Pensez à vous connecter !
            </p>    
        </article>
    );
};


export const IntroductionAccueilEncyclopedie = () => {
    
    return (
        <article className="intro-encyclopedie">
            <p className="introduction">
                Vous entrez dans l'encyclopédie de l'univers 
                <br /><span className="titre-LF">Lux Fero</span>
                <br />Vous trouverez ici des descriptifs des lieux et des personnages du roman.
                <br />S'il manque l'un de vos favoris, n'hésitez pas à suivre le lien "besoin d'en parler".
            </p>
        </article>
    );
};


export const IntroductionPageEncyclopedie = (props) => {
    
    return (
        <article className="intro-encyclopedie">
            <p className="introduction">
                Vous entrez dans la section des {props.text} de l'univers 
                <br /><span className="titre-LF">Lux Fero</span>
                <br />Vous trouverez ici des cartes fournissant un résumé des {props.text}, ainsi qu'une image d'illustration.
                <br />Libre à vous de ne pas en tenir compte pour laisser votre imagination prendre le relai.
                <br />S'il manque l'un de vos favoris, n'hésitez pas à suivre le lien "besoin d'en parler".
            </p>
        </article>
    );
};


export const IntroductionArticlesEncyclopedie = (props) => {
    
    return (
        <article className="intro-encyclopedie">
            <p className="introduction">
                Vous entrez dans la section des {props.text}.
                <br />Entre {props.liste}, parcourez les nombreux {props.text} de ce camp.
                <br />Découvrez plus en profondeur les {props.text} que vous avez rencontré lors de votre lecture.
                <br />S'il manque l'un de vos favoris, n'hésitez pas à suivre le lien "besoin d'en parler".
            </p>
        </article>
    );
};