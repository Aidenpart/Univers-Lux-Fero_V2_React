import commentaireModel from '../models/commentaireModel.js';
import formidable from "formidable";


export const newCommentaire = (req, res) => {
    
    const form = formidable();
    form.parse(req, function (err, fields, files){
    
        commentaireModel.create({
            article: fields.article[0],
            user: fields.user[0],
            contenu: fields.contenu[0]          
        })
        .then((commentaire) => {
            res.status(201).json(commentaire);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json("fail");
        });
    });
};


export const updateCommentaire = async (req, res) => {

    const commentId = req.params.id;

    const form = formidable();
    form.parse(req, function (err, fields, files){

        commentaireModel.findOne({ _id: commentId })
        .then((comment) => {
            if (!comment) {
                return res.status(404).json({ message: "Commentaire introuvable" });
            }else {
                commentaireModel.findOneAndUpdate(
                    {_id : commentId}, 
                    {
                        contenu: fields.contenu[0]
                    }, 
                    {new: true}
                )            
                .then((commentaire) => {
                    res.status(200).json(commentaire);
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "Une erreur s'est produite lors de l'update du commentaire" });
        });
    });
};


export const deleteCommentaire = async (req, res) => {
    
    const commentId = req.params.id;

    commentaireModel.findOne({ _id: commentId })
    .then((comment) => {
        if (!comment) {
            return res.status(404).json({ message: "Commentaire introuvable" });
        }else {
            commentaireModel.findOneAndDelete({_id: comment.id})
            .then((commentaire) => {
                res.status(200).json(commentaire);
            });
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Une erreur s'est produite lors de la recherche du commentaire" });
    });
    
};


export const deleteCommentaireByAdmin = async (req, res) => {
    
    const commentId = req.params.id;

    commentaireModel.findOneAndDelete({ _id: commentId })
    .then((comment) => {
        res.status(201).json({ message: "Commentaire supprimé" });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Une erreur s'est produite lors de la recherche du commentaire" });
    });
};