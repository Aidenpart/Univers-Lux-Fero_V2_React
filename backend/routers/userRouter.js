import express from "express";
import {getUserById, updateUser, deleteOwnUser} from "../controllers/userControllers.js";
import {newCommentaire, updateCommentaire, deleteCommentaire} from "../controllers/commentairesControllers.js";


const router = express.Router();


router.get("/user/:id", getUserById);


router.post("/update", updateUser);


router.post("/delete", deleteOwnUser);


router.post("/comment", newCommentaire);
router.post("/update-comment/:id", updateCommentaire);
router.delete("/delete-comment/:id", deleteCommentaire);


export default router;