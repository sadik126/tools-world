import React from 'react';
import { Link, Route } from 'react-router-dom';

const Loginroute = ({ component: Component, isAuthenticated, ...rest }) => {

    <Route {...rest} render={(props) => (
        isAuthenticated
            ? <Component {...props} />
            : <Link to='/login' />
    )} />
    // return (
    //     <div>

    //     </div>
    // );
};

export default Loginroute;