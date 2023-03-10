import React, { useContext } from 'react';
import { Link, useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import Theme from '../Theme/Theme';
import logo from '../../../src/assets/tools_logo.png';
import { Authcontext } from '../../Context/Authprovider';


const Navber = () => {
    const { user, Logout } = useContext(Authcontext)

    const nevigate = useNavigate();

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
        <li><Link to='/dashboard' >Dashboard</Link></li>

        <li><Link to='/about'>About</Link></li>
        <li><Link to='/contact'>Contact</Link></li>
        {
            user?.uid ? <button onClick={handleLogout} className="btn login">Log out</button> : <Link to={'/login'}><button className="btn login">Login</button></Link>
        }
        {
            // user?.uid ? <li><Link to='' className='text-orange-700'>Welcome  {user.displayName}</Link></li> : <li><Link to=''></Link></li>
        }

        {/* <a className="btn">Get started</a> */}
        {
            // user?.uid ? <button onClick={handleLogout} className="btn login">Log out</button> : <Link to={'/login'}><button className="btn login">Login</button></Link>
        }


    </>
    return (

        <div className="navbar bg-base-100">
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
            <div className="navbar-end">
                <Theme></Theme>
                {/* <a className="btn">Get started</a> */}
            </div>
        </div>

    );
};

export default Navber;