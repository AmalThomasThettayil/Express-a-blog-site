const expressAsyncHandler = require("express-async-handler");
const sgMail = require("@sendgrid/mail");
const generateToken = require("../../config/token/generateToken");
const User = require("../../model/user/User");
const validateMongodbId = require("../../utils/validateMongodbID");

sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
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

//FOLLOWING
const followingUserCtrl = expressAsyncHandler(async (req, res) => {
  const { followId } = req.body;
  const loginUserId = req.user.id;

  //find the target user and check if the login id exist
  const targetUser = await User.findById(followId)

  const alreadyFollowing = targetUser?.followers?.find(
    user => user?.toString() === loginUserId.toString()
  );

  if (alreadyFollowing) throw new Error("You have already followed this user")
  console.log(alreadyFollowing);

  //1. Find the user you want to follow(followId) and update its followers field
  await User.findByIdAndUpdate(followId, {
    $push: { followers: loginUserId },
    isFollowing: true,
  },
    {
      new: true
    })
  //2. Update the login user following field.
  await User.findByIdAndUpdate(loginUserId, {
    $push: { following: followId },
  },
    { new: true })
  console.log({ followId, loginUserId });
  res.json("YOu have successfully followed this user")
})

//------------------------------------------
//UNFOLLOW
//---------------------------------------
const unfollowUserCtrl = expressAsyncHandler(async (req, res) => {
  const { unFollowId } = req.body;
  const loginUserId = req.user.id;

  await User.findByIdAndUpdate(unFollowId, {
    $pull: { followers: loginUserId },
    isFollowing: false,
  }, { new: true })


  await User.findByIdAndUpdate(
    loginUserId,
    {
      $pull: { following: unFollowId },
    }, { new: true }
  )
  res.json("you have successfully unfollowed this user")
})

//------------------------------------------
//Block User
//--------------------------------------------
const blockUserCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id)

  const user = await User.findByIdAndUpdate(
    id,
    { isBlocked: true, },
    { new: true }
  );
  res.json(user)
})

//------------------------------------------
//UnBlock User
//--------------------------------------------
const unblockUserCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id)

  const user = await User.findByIdAndUpdate(
    id,
    { isBlocked: false, },
    { new: true }
  );
  res.json(user)
})

//-----------------------------------------
//ACCOUNT VERIFICATION- SEND EMAIL
//-----------------------------------------

const generateVerificationTokenCtrl = expressAsyncHandler(async (req, res) => {
  const loginUserId = req.user.id;

  const user = await User.findById(loginUserId)
  console.log(user);
  try {
    //Generate token
    const verificationToken = await user.createAccountVerificationToken();
    console.log(verificationToken)
    //build your message
    const msg = {
      to: 'amal.thms@gmail.com', // Change to your recipient
      from: 'amal.thms@gmail.com', // Change to your verified sender
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
    }
    //await sgMail.send(msg);
    res.json("Email sent")
  } catch (error) {

  }
}
)

module.exports = {
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
};
