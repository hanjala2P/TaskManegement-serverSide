import { Router } from "express";
import { UserController } from "./user.controller";
import auth from "../../middleware/auth"; // সিকিউরিটি মিডলওয়্যার
import { uploadFile } from "../../middleware/fileUpload";

const router = Router();

router.post("/", UserController.createUser);          

router.get("/", auth(), UserController.getAllUsers);          

router.get("/:id", auth(), UserController.getSingleUser);     

router.patch("/:id", auth(), UserController.updateUser);       

router.delete("/:id", auth(), UserController.deleteUser);  
router.post(
  "/upload-profile",
  auth(),
  uploadFile.single("image"), 
  UserController.updateProfileImage
);  


export const UserRoutes = router;