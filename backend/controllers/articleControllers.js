import articleModel from '../models/articleModel.js';
import commentaireModel from '../models/commentaireModel.js';
import formidable from "formidable";
import fs from "fs";


export const newArticle = (req, res) => {

    const form = formidable();
    form.parse(req, function (err, fields, files){
    
        articleModel.create({
            titre: fields.titre[0],
            sujet: fields.sujet[0],
            contenu: fields.contenu[0]          
        })
        .then((article) => {
            res.status(201).json(article);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json("fail");
        });
    });
};


export const readArticles = async (req, res) => {
    
    const articles = await articleModel.find();
    
    res.status(200).json(articles);

};


export const updateArticle = async (req, res) => {

    const form = formidable();

    form.parse(req, function (err, fields, files){
     
    const id = req.params.id;
    
    articleModel.findOneAndUpdate(
        {_id : id}, 
        {
            titre : fields.titre[0],
            sujet : fields.sujet[0],
            contenu : fields.contenu[0]
        }, 
        {new: true}
    )
    .then((article) => {
        res.status(201).json(article);    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).json(err);
    });
    })
};


export const deleteArticle = async (req, res) => {

    const id = req.params.id;
    
    articleModel.findOneAndDelete( {id: id} )
    .then((article) => {
        res.status(201).json(article);    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).json(err.message);
    });
    
};


export const getArticle = async(req, res) => {
    
    const id = req.params.id;

    const specifiedArticle = await articleModel.findOne({_id : id});
    const commentaires = await commentaireModel.find({article : specifiedArticle.id});

    res.status(200).json({
        specifiedArticle,
        commentaires
    });
    
};
