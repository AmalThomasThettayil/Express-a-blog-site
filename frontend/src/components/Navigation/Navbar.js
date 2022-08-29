import React from 'react'
import { useSelector } from 'react-redux'
import AdminNavbar from './Admin/AdminNavbar'
import PrivateNavbar from './Private/PrivateNavbar'
import PublicNavbar from './Public/PublicNavbar'

function Navbar() {
    const state = useSelector(state => state.users)
    const { userAuth } = state;
    const isAdmin = userAuth?.isAdmin
    return (
        <>
            {!userAuth ? (
                <PublicNavbar />
            ) : userAuth ? (
                <PrivateNavbar />
            ) : (
                isAdmin && <AdminNavbar />
            )}
        </>
    )
}

export default Navbar
//@headlessui/react
//@heroicons/react
//@heroicons/react@v1