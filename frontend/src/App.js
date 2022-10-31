import { BrowserRouter, Switch, Route } from "react-router-dom"
import AddNewCategory from "./components/Categories/AddNewCategory";
import CategoryList from "./components/Categories/CategoryList";
import UpdateCategory from "./components/Categories/UpdateCategory";
import HomePage from "./components/HomePage/HomePage"
import Navbar from "./components/Navigation/Navbar";
import AdminRoute from "./components/Navigation/ProtectedRoute/AdminProtectedRoute";
import PrivateProtectRoute from "./components/Navigation/ProtectedRoute/PrivateProtectedRoute";
import CreatePost from "./components/Posts/CreatePost";
import PostDetails from "./components/Posts/PostDetails";
import PostsList from "./components/Posts/PostList";
import UpdatePost from "./components/Posts/UpdatePost";
import Login from "./components/Users/Login/Login";
import Register from "./components/Users/Register/Register";
import { GoogleOAuthProvider } from '@react-oauth/google';
import UpdateComment from "./components/Comments/UpdateComment";
import Profile from "./components/Users/ProfileComponent/Profile";
import UploadProfilePhoto from "./components/Users/ProfileComponent/UploadProfilePhoto";
import UpdateProfileForm from "./components/Users/ProfileComponent/UpdateProfileForm";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId="931713857882-ic4fva3cjipjc6lhd3jpv3koqoj28gjj.apps.googleusercontent.com">
        <Navbar />
        <Switch>
          <AdminRoute exact path="/update-category/:id" component={UpdateCategory} />
          <PrivateProtectRoute exact path="/update-post/:id" component={UpdatePost} />
          <PrivateProtectRoute exact path="/upload-profile-photo"
            component={UploadProfilePhoto} />
          <PrivateProtectRoute exact path="/create-post" component={CreatePost} />
          <PrivateProtectRoute exact path="/update-comment/:id" component={UpdateComment} />
          {/* <PrivateProtectRoute exact path="/profile" component={Profile} /> */}
          <PrivateProtectRoute exact path="/profile/:id" component={Profile} />
          <PrivateProtectRoute exact path="/update-profile/:id" component={UpdateProfileForm} />
          <AdminRoute exact path="/add-category" component={AddNewCategory} />
          <Route exact path="/posts" component={PostsList} />
          <AdminRoute exact path="/category-list" component={CategoryList} />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/posts/:id" component={PostDetails} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />

        </Switch>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
}

export default App;
