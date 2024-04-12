import mongoose from "mongoose";


const commentaireSchema = new mongoose.Schema(
    {        
        article: {
            type : mongoose.Schema.Types.ObjectId, 
            ref: "Article",
        },
        user: {
            type : mongoose.Schema.Types.ObjectId, 
            ref: "User",
        },
        contenu: {
            type: String,
            required: [true, 'Un contenu est requis']
        },
    }, 
    {
        timestamps: true,
        versionKey: false
    }
);


export default mongoose.model('Commentaire', commentaireSchema);