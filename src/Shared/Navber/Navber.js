import React, { useContext } from 'react';
import { Link, useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import Theme from '../Theme/Theme';
import logo from '../../../src/assets/tools_logo.png';
import { Authcontext } from '../../Context/Authprovider';
import { useQuery } from '@tanstack/react-query';
import Axiospublic from '../../Pages/Axiospublic/Axiospublic';


const Navber = () => {
    const { user, Logout } = useContext(Authcontext)

    const nevigate = useNavigate();
    const axiospublic = Axiospublic();

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const res = await axiospublic.get(`/user?email=${user?.email}`);
            return res.data;
        }
    });

    const handleLogout = () => {
        Logout()
            .then(() => {
                nevigate('/login')

            })
            .catch(err => console.log(err))
    }

    function CustomLink({ children, to, ...props }) {
        let resolved = useResolvedPath(to);
        let match = useMatch({ path: resolved.pathname, end: true });

        return (
            <div>
                <Link
                    // style={{ textDecoration: match ? "underline" : "none" }}
                    className={match && 'btn btn-primary'}
                    to={to}
                    {...props}
                >
                    {children}
                </Link>
                {/* {match && " (active)"} */}
            </div>
        );
    }

    const menuItems = <>
        <li><CustomLink to='/' >Home</CustomLink></li>
        <li><CustomLink to='/tools' >Tools</CustomLink></li>
        <li><CustomLink to='/dashboard' >Dashboard</CustomLink></li>

        <li><CustomLink to='/about'>About</CustomLink></li>
        <li><CustomLink to='/contact'>Contact</CustomLink></li>
        {
            user?.uid ? <li><CustomLink to='/login' onClick={handleLogout}>Log Out</CustomLink></li> : <li><CustomLink to='/login'>Login</CustomLink></li>
        }

        {
            user?.uid ? <li><Link to='' className='text-orange-700'>Welcome  {user.displayName}</Link></li> : <><Link to=''></Link></>
        }
        {
            user?.uid ?
                <li>
                    <Link>
                        <div class="avatar">
                            <div class="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={users[0]?.image} />
                            </div>
                        </div>
                    </Link>

                </li>

                : <></>
        }
        <Theme></Theme>
        {
            // user?.uid ? <li><Link to='' className='text-orange-700'>Welcome  {user.displayName}</Link></li> : <li><Link to=''></Link></li>
        }

        {/* <a className="btn">Get started</a> */}
        {
            // user?.uid ? <button onClick={handleLogout} className="btn login">Log out</button> : <Link to={'/login'}><button className="btn login">Login</button></Link>
        }


    </>
    return (

        <div className="navbar bg-base-100 justify-between">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {
                            menuItems
                        }
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl p-0"><img className="sm:w-[100px] lg:w-full" src={logo} alt="" /></a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {
                        menuItems
                    }
                </ul>
            </div>

            <label htmlFor="my-drawer-2" tabIndex={2} className="btn btn-ghost lg:hidden">
                Menu
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>



        </div>

    );
};

export default Navber;