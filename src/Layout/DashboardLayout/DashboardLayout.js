import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Authcontext } from '../../Context/Authprovider';
import Useadmin from '../../hooks/Useadmin/Useadmin';
import Footer from '../../Shared/Footer/Footer';
import Navber from '../../Shared/Navber/Navber';

const DashboardLayout = () => {
    const { user } = useContext(Authcontext)
    const [isAdmin] = Useadmin(user?.email)
    return (
        <div>
            <Navber></Navber>


            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>

                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">

                        <li><Link to='/dashboard'>My appointments</Link></li>
                        <li><Link to='/profile'>Profile</Link></li>

                        {
                            !isAdmin && <li><Link to='/review'>Add a review</Link></li>
                        }

                        {
                            isAdmin &&
                            <>
                                <li><Link to='/dashboard/users'>Users</Link></li>
                                <li><Link to='/dashboard/addDoctor'>Add doctor</Link></li>
                                <li><Link to='/dashboard/manageDoctor'>Manage doctor</Link></li>
                                <li><Link to='/dashboard/Allbookings'>Manage Appointments</Link></li>
                            </>
                        }
                    </ul>

                </div>
            </div>


        </div>
    );
};

export default DashboardLayout;