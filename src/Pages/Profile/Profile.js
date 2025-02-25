import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Authcontext } from '../../Context/Authprovider';
import Loading from '../../Shared/Loading/Loading';

const Profile = () => {
    const { user, loading } = useContext(Authcontext)
    // const url = `http://localhost:4040/user?email=abdullah@gmail.com`

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:4040/user?email=${user?.email}`, {
                headers: {
                    auth: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json()
            return data;
        }
    })

    console.log(users)

    if (loading || isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='grid gap-2 grid-cols-3 w-[80%]'>

            <div>
                <div className="avatar">
                    <div className="w-24 rounded " style={{ border: '2px solid orange' }}>
                        <img src={user?.photoURL} />
                    </div>
                </div>
            </div>
            <div>
                <h1 className='text-2xl font-bold text-primary'>Profile of {user?.displayName}</h1>
                <div className='mt-16'>
                    <p className='text-accent'>About</p>
                    <div className="divider"></div>
                    <small>Name:  <span className='text-orange-700 font-bold'>  {users[0]?.name}</span></small>
                    <br />
                    <small>Email:  <span className='text-orange-700 font-bold'>  {users[0]?.email}</span></small>
                    <br />
                    <small>Role:  <span className='text-orange-700 font-bold'>  {users[0]?.role === 'admin' ? 'Admin' : 'Customer'}</span></small>

                </div>
            </div>
            <div>
                {/* this is picture */}
            </div>
        </div>
    );
};

export default Profile;