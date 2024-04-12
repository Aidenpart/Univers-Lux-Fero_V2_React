import mongoose from "mongoose";


const articleSchema = new mongoose.Schema(
    {
        titre: {
            type: String,
            required: [true, 'Un titre est requis'],
            unique: true,
            message: "Titre déja existant",
        },
        sujet: {
            type: String,
            required: [true, 'Un sujet est requis']
        },
        contenu: {
            type: String,
            required: [true, 'Un contenu est requis']
        }
    }, 
    {
        timestamps: true,
        versionKey: false
    }
);


export default mongoose.model('Article', articleSchema);