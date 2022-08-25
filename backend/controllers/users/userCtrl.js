const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../../config/token/generateToken");
const User = require("../../model/user/User");
const validateMongodbId = require("../../utils/validateMongodbID");

//USER REGISTER
const userRegisterCtrl = expressAsyncHandler(async (req, res) => {
  //checkif user Exist
  const userExists = await User.findOne({ email: req?.body?.email });
  if (userExists) throw new Error("User already exists");
  try {
    const user = await User.create({
      firstName: req?.body?.firstName,
      lastName: req?.body?.lastName,
      email: req?.body?.email,
      password: req?.body?.password,
    });
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

//USER LOGIN
const loginUserCtrl = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //check if user Exist
  const userFound = await User.findOne({ email });
  //Check if password is match
  if (userFound && (await userFound.isPasswordMatched(password))) {
    res.json({
      _id: userFound?._id,
      firstName: userFound?.firstName,
      lastName: userFound?.lastName,
      email: userFound?.email,
      profilePhoto: userFound?.profilePhoto,
      isAdmin: userFound?.isAdmin,
      token: generateToken(userFound?._id),
    });
  } else if (!userFound) {
    res.status(404);
    throw new Error("Invalid Email!");
  } else {
    res.status(404);
    throw new Error("Invalid Password!");
  }
});

//FETCHING all users
const fetchUsersCtrl = expressAsyncHandler(async (req, res) => {
  console.log(req.headers)
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.json(error);
  }
});

//DELETE USER
const deleteUserCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  //checkif user id is valid
  validateMongodbId(id);
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.json(deletedUser);
  } catch (error) {
    res.json(error);
  }
});

//Fetch single user
const fetchUserDetailsCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  //check if user id is valid
  validateMongodbId(id);
  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    res.json(error);
  }
})

//FETCH USER PROFILE
const userProfileCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongodbId(id)
  try {
    const myProfile = await User.findById(id)
    res.json(myProfile);
  } catch {
    res.json(error)
  }
})

//UPDATE USER PROFILE
const updateUserCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req?.user

  validateMongodbId(_id)
  const user = await User.findByIdAndUpdate(_id, {
    firstName: req?.body?.firstName,
    lastName: req?.body?.lastName,
    email: req?.body?.email,
    bio: req?.body?.bio
  }, {
    new: true,
    runValidators: true,
  })
  res.json(user)
})

//UPDATE PASSWORD
const updateUserPasswordCtrl = expressAsyncHandler(async (req, res) => {
  //destructure the login user
  const { _id } = req.user;
  const { password } = req.body;
  validateMongodbId(_id);
  //find the user  by _id
  const user = await User.findById(_id);

  if (password) {
    user.password = password;
    const updatedUser = await user.save();
        res.json(updatedUser);
  } else {
    res.json(user)
  }
})

module.exports = {
  userRegisterCtrl,
  loginUserCtrl,
  fetchUsersCtrl,
  deleteUserCtrl,
  fetchUserDetailsCtrl,
  userProfileCtrl,
  updateUserCtrl,
  updateUserPasswordCtrl,
};
