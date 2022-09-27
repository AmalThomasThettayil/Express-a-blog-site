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
    followingUserCtrl,
    unfollowUserCtrl,
    blockUserCtrl,
    unblockUserCtrl,
    generateVerificationTokenCtrl,
    profilePhotoUploadCtrl,
    accountVerificationCtrl,
} = require("../../controllers/users/userCtrl");
const authMiddleware = require('../../middlewares/auth/authMiddleware');
const { profilePhotoUpload,
    profilePhotoResize,
} = require('../../middlewares/upload/profilePhotoUpload');

const userRoutes = express.Router();

userRoutes.post("/v1/register", userRegisterCtrl);
userRoutes.post("/v1/login", loginUserCtrl);
userRoutes.put("/v1/profilePhoto-upload",
    authMiddleware,
    profilePhotoUpload.single("image"),
    profilePhotoResize,
    profilePhotoUploadCtrl,
);
userRoutes.get("/v1/", authMiddleware, fetchUsersCtrl);
userRoutes.delete("/v1/:id", deleteUserCtrl);
userRoutes.get("/v1/:id", fetchUserDetailsCtrl);
userRoutes.get("/v1/profile/:id", authMiddleware, userProfileCtrl);
userRoutes.put("/v1/password", authMiddleware, updateUserPasswordCtrl);
userRoutes.put("/v1/follow", authMiddleware, followingUserCtrl);
userRoutes.post("/v1/generate-verify-email-token",
    authMiddleware,
    generateVerificationTokenCtrl);
userRoutes.put("/v1/verify-account",
    authMiddleware,
    accountVerificationCtrl);
userRoutes.put("/v1/unfollow", authMiddleware, unfollowUserCtrl);
userRoutes.put("/v1/block-user/:id", authMiddleware, blockUserCtrl);
userRoutes.put("/v1/unblock-user/:id", authMiddleware, unblockUserCtrl);
userRoutes.put("/v1/:id", authMiddleware, updateUserCtrl);


module.exports = userRoutes;