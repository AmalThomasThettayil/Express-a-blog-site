import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesAction } from "../../redux/slices/category/categorySlice";
import { fetchPostsAction } from "../../redux/slices/posts/postSlices";
import CardItems from "./CardItems";
import './Cards.css'

const Cards = () => {
    //select post from store
    const post = useSelector(state => state?.post)
    const { postLists, loading, appErr, serverErr, likes, dislikes } = post;
    console.log(post);
    const user = useSelector((state) => state?.users);
    const { userAuth } = user;
    //const navigate = useNavigate();
    //select category from store
    const category = useSelector(state => state?.category)

    const {
        categoryList,
        loading: catLoading,
        appErr: catAppErr,
        serverErr: catServerErr,
    } = category;

    //dispatch
    const dispatch = useDispatch();
    //fetch post
    useEffect(() => {
        // if (userAuth) 

        dispatch(fetchPostsAction(""));

    }, [dispatch, likes, dislikes]);

    //fetch categories
    useEffect(() => {
        dispatch(fetchCategoriesAction());
    }, [dispatch]);


    console.log(post);
    return (
        <div className='cards'>

            <h1>Check out these EPIC Destinations!</h1>
            <div className='cards__container'>
                <div className='cards__wrapper'>
                    <ul className='cards__items'>
                        {postLists?.map(post =>
                            <CardItems
                                src={post?.image}
                                text={post?.description}
                                label={post?.category}
                                path={`/posts/${post?._id}`}
                            />
                        )
                        }
                    </ul>

                </div>
            </div>


        </div>
    );
}

export default Cards;