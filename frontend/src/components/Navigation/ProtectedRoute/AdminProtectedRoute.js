import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Route } from 'react-router-dom';

const AdminRoute = ({ component: Component, ...rest }) => {
    //check if user is login
    const user = useSelector(state => state.users)
    const { userAuth } = user;
    return (
        <Route
            {...rest} render={() => userAuth.isAdmin ? <Component{...rest} /> : Navigate('/login')}
        />
    )
}
export default AdminRoute;