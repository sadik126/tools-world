import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Authcontext } from '../../Context/Authprovider';
import Loading from '../../Shared/Loading/Loading';

const PrivateRoute = ({ children }) => {

    const { user, loading } = useContext(Authcontext)
    const location = useLocation();

    if (loading) {
        return <Loading ></Loading>
    }

    if (user) {
        return children;
    }

    // if (!user) {
    //     <Navigate to='/login' state={{ from: location }} replace></Navigate>

    // }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>

};

export default PrivateRoute;