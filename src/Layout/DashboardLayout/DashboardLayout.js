import React, { useContext } from 'react';
import { Link, Outlet, useMatch, useResolvedPath } from 'react-router-dom';
import { Authcontext } from '../../Context/Authprovider';
import Useadmin from '../../hooks/Useadmin/Useadmin';
import Footer from '../../Shared/Footer/Footer';
import Navber from '../../Shared/Navber/Navber';

const DashboardLayout = () => {
    // const { user } = useContext(Authcontext)
    const [isAdmin] = Useadmin()

    console.log(isAdmin)
    // const isAdmin = true;

    function CustomLink({ children, to, ...props }) {
        let resolved = useResolvedPath(to);
        let match = useMatch({ path: resolved.pathname, end: true });

        return (
            <div>
                <Link
                    // style={{ textDecoration: match ? "underline" : "none" }}
                    className={match && 'btn btn-secondary'}
                    to={to}
                    {...props}
                >
                    {children}
                </Link>
                {/* {match && " (active)"} */}
            </div>
        );
    }
    return (
        <div>
            <Navber></Navber>


            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>

                    {/* <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label> */}

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">

                        <li><CustomLink to='/dashboard'>My Tools booking</CustomLink></li>
                        <li><CustomLink to='/dashboard/profile'>Profile</CustomLink></li>

                        {
                            !isAdmin && <li><CustomLink to='/dashboard/reviews'>Add a review</CustomLink></li>
                        }

                        {
                            isAdmin &&
                            <>
                                <li><CustomLink to='/dashboard/users'>Handle Users</CustomLink></li>
                                <li><CustomLink to="/dashboard/manageorders">All orders</CustomLink></li>
                                <li><CustomLink to='/dashboard/manageproducts'>Manage Products</CustomLink></li>
                                <li><CustomLink to='/dashboard/addproducts'>Add product</CustomLink></li>
                            </>
                        }
                    </ul>

                </div>
            </div>


        </div>
    );
};

export default DashboardLayout;