const expressAsyncHandler = require("express-async-handler")
const Post = require("../../model/post/post");
const validateMongodbId = require("../../utils/validateMongodbID");
const Filter = require("bad-words");
const User = require("../../model/user/User");
const cloudinaryUploadImg = require("../../utils/cloudinary");
const fs = require("fs");

//-------------------------------------------------
//create post
//--------------------------------------------------
const createPostCtrl = expressAsyncHandler(async (req, res) => {
    console.log(req.file)
    //check for user
    const { _id } = req.user;
    // validateMongodbId(req.body.user)

    //check for bad words
    const filter = new Filter();
    const isProfane = filter.isProfane(req.body.title, req.body.description)
    //Block user
    if (isProfane) {
        const user = await User.findByIdAndUpdate(_id, {
            isBlocked: true,
        });
        throw new Error(
            "Creating failed due to presence of profane words, and you have been blocked"
        )

    }

    //1. Get the path to img
    const localPath = `public/images/posts/${req.file.filename}`;
    //2. Upload to cloudinary
    const imgUploaded = await cloudinaryUploadImg(localPath);

    try {
        const post = await Post.create({
            ...req.body,
            image: imgUploaded?.url,
            user: _id,
        })
        res.json(post)

        //Remove uploaded images
        fs.unlinkSync(localPath)

    } catch (error) {
        res.json(error)
    }
});


//-------------------------------------------------
//fetch all post
//--------------------------------------------------
const fetchPostsCtrl = expressAsyncHandler(async (req, res) => {
    try {
        const posts = await Post.find({});
        res.json(posts)
    } catch (error) {
    }
})

//---------------------------------------------------
// fetch a single post
//---------------------------------------------------
const fetchPostCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id)
    try {
        const post = await Post.findById(id).populate("user")
        //update number of views
        await Post.findByIdAndUpdate(id, {
            $inc: { numViews: 1 },
        }, {
            new: true
        })
        res.json(post)
    } catch (error) {
        res.json(error)
    }
});

//--------------------------------------
//Update post
//--------------------------------------
const updatePostCtrl = expressAsyncHandler(async (req, res) => {
    console.log(req.user);
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const post = await Post.findByIdAndUpdate(id, {
            ...req.body,
            user: req.user?._id,
        },
            {
                new: true,
            }
        );
        res.json(post)
    } catch (error) {
        res.json(error)
    }
    res.json("Update");

});


//--------------------------------------
//Delete post
//--------------------------------------
const deletePostCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id)
    try {
        const post = await Post.findOneAndDelete(id)
        res.json(post);
    } catch (error) {
        res.json(error)
    }
})
module.exports = {
    createPostCtrl,
    fetchPostsCtrl,
    fetchPostCtrl,
    updatePostCtrl,
    deletePostCtrl,
};