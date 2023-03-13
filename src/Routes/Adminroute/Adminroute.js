import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Authcontext } from '../../Context/Authprovider';
import Useadmin from '../../hooks/Useadmin/Useadmin';
import Loading from '../../Shared/Loading/Loading';

const Adminroute = ({ children }) => {
    const { user, loading } = useContext(Authcontext)
    const [isAdmin, isAdminLoading] = Useadmin(user?.email)
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <Loading ></Loading>
    }

    if (user || isAdmin) {
        return children;
    }
    return <Navigate to='/' state={{ from: location }} replace></Navigate>
};

export default Adminroute;