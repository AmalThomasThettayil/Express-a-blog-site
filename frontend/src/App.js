import { BrowserRouter, Switch, Route } from "react-router-dom"
import AddNewCategory from "./components/Categories/AddNewCategory";
import CategoryList from "./components/Categories/CategoryList";
import UpdateCategory from "./components/Categories/UpdateCategory";
import HomePage from "./components/HomePage/HomePage";
import Navbar from "./components/Navigation/Navbar";
import AdminRoute from "./components/Navigation/ProtectedRoute/AdminProtectedRoute";
import PrivateProtectRoute from "./components/Navigation/ProtectedRoute/PrivateProtectedRoute";
import CreatePost from "./components/Posts/CreatePost";
import PostsList from "./components/Posts/PostList";
import Login from "./components/Users/Login/Login";
import Register from "./components/Users/Register/Register";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <PrivateProtectRoute exact path="/create-post" component={CreatePost} />
        <AdminRoute exact path="/add-category" component={AddNewCategory} />
        <Route exact path="/posts" component={PostsList} />
        <AdminRoute exact path="/category-list" component={CategoryList} />
        <AdminRoute exact path="/update-category/:id" component={UpdateCategory} />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />

      </Switch>
    </BrowserRouter>
  );
}

export default App;
