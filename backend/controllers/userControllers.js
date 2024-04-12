import UserModel from "../models/userModel.js";
import formidable from "formidable";
import fs from "fs";


export const getUserById = async(req, res) => {
    
    const user = req.user;

    res.status(201).send(user);
    
};


export const deleteOwnUser = async(req, res) => {

    const id = req.user.id;
    
    UserModel.findOneAndDelete( {_id: id}    )
    .then((data) => {
        res.status(201).json({
            user: {
                email: data.email,
                pseudo: data.pseudo,
                name: data.name,
                firstName: data.firstName
            }
        });    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).json(err.message);
    });    
    res.status(200).json(req.user);
    
};


export const updateUser = async (req, res) => {
    const id = req.user;
    const form = formidable();

    form.parse(req, async function (err, fields, files) {
        try {
            let newpath = null;
            if (files.images) {
                const oldpath = files.images[0].filepath;
                newpath = 'images/' + new Date().getTime() + "_" + files.images[0].originalFilename;

                const oldUser = await UserModel.findById(id);
                if (oldUser.images) {
                    const oldImagePath = "./public/" + oldUser.images;
                    fs.unlink(oldImagePath, (err) => {
                        if (err) throw err;
                    });
                }

                fs.copyFile(oldpath, "./public/" + newpath, (err) => {
                    if (err) throw err;
                });
            }

            const updatedUser = await UserModel.findOneAndUpdate(
                { _id: id },
                {
                    pseudo: fields.pseudo[0],
                    name: fields.name[0],
                    firstName: fields.firstName[0],
                    images: newpath
                },
                { new: true }
            );
            res.status(201).json(updatedUser);
        } catch (error) {
            res.status(400).json(error.message);
        }
    });
};


export const getAllUsersPublic = async(req, res) => {
    
    const users = await UserModel.find().select("_id pseudo email images");
    
    res.status(200).json(users);
    
};