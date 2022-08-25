const express = require('express');
const {
    userRegisterCtrl,
    loginUserCtrl,
    fetchUsersCtrl,
    deleteUserCtrl,
    fetchUserDetailsCtrl,
    userProfileCtrl,
    updateUserCtrl,
    updateUserPasswordCtrl,
} = require("../../controllers/users/userCtrl");
const authMiddleware = require('../../middlewares/auth/authMiddleware');

const userRoutes = express.Router();

userRoutes.post("/v1/register",userRegisterCtrl);
userRoutes.post("/v1/login",loginUserCtrl);
userRoutes.get("/v1/",authMiddleware,fetchUsersCtrl);
userRoutes.delete("/v1/:id",deleteUserCtrl);
userRoutes.get("/v1/:id",fetchUserDetailsCtrl);
userRoutes.get("/v1/profile/:id",authMiddleware,userProfileCtrl);
userRoutes.put("/v1/:id",authMiddleware,updateUserCtrl);
userRoutes.put("v1/password/:id",authMiddleware,updateUserPasswordCtrl);

module.exports = userRoutes;