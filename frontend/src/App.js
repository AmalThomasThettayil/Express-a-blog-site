import { BrowserRouter, Switch, Route } from "react-router-dom"
import AddNewCategory from "./components/Categories/AddNewCategory";
import CategoryList from "./components/Categories/CategoryList";
import UpdateCategory from "./components/Categories/UpdateCategory";
import HomePage from "./components/HomePage/HomePage";
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


function App() {
  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId="931713857882-ic4fva3cjipjc6lhd3jpv3koqoj28gjj.apps.googleusercontent.com">
        <Navbar />
        <Switch>
          <AdminRoute exact path="/update-category/:id" component={UpdateCategory} />
          <PrivateProtectRoute exact path="/update-post/:id" component={UpdatePost} />
          <PrivateProtectRoute exact path="/create-post" component={CreatePost} />
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
