import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Confirmationmodal from '../../Shared/Confirmationmodal/Confirmationmodal';
import Loading from '../../Shared/Loading/Loading';
import Selectadmin from './Selectadmin';

const Users = () => {
    const [deletingUser, setdeletingUser] = useState(null)

    const closeModal = () => {
        setdeletingUser(null)
    }
    const { data: users = [], isError, isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch(`https://tools-server-five.vercel.app/users`, {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accesstoken')}`
                }
            })
            const data = await res.json()
            return data
        }
    })
    if (isLoading) {
        return <Loading></Loading>
    }


    const makeAdmin = (id) => {
        // fetch(`https://tools-server-five.vercel.app/user/admin/${user.email}`, {
        //     method: 'PUT',
        //     headers: {
        //         authorization: `Bearer ${localStorage.getItem('accesstoken')}`
        //     }

        // })
        //     .then(res => {
        //         if (res.status === 403) {
        //             toast.error('failed to make an admin')
        //         }
        //         return res.json()
        //     })
        //     .then(data => {
        //         console.log(data)
        //         if (data.modifiedCount > 0) {
        //             toast.success('successfully made an admin');
        //             refetch()
        //         }

        //     })


        fetch(`https://tools-server-five.vercel.app/user/admin/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Make admin successfully')
                    refetch();
                }
                console.log(data)
            })


    }


    const deleteUser = user => {
        fetch(`https://tools-server-five.vercel.app/user/${user._id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.deletedCount > 0) {
                    toast.error(`${user.email} is deleted`)
                    refetch()
                }

            })
    }
    return (
        <div class="overflow-x-auto">
            <table class="table table-zebra w-full">

                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        users.map((user, i) => <tr key={user._id} className='hover'>
                            <th>{i + 1}</th>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user?.role !== 'admin' ? <button onClick={() => makeAdmin(user._id)} className='btn btn-xs btn-primary'>Make Admin</button> : <p className='btn btn-xs btn-secondary'>Admin</p>}</td>
                            <td>{user?.role !== 'admin' && <label onClick={() => setdeletingUser(user)} htmlFor="confirmation-modal" className='btn btn-xs btn-error'>Delete</label>}</td>



                        </tr>)
                    }

                    {/* {
                        users.map((user, i) => <Selectadmin key={user._id} makeAdmin={makeAdmin} deleteUser={deleteUser} index={i} refetch={refetch} user={user}></Selectadmin>)

                    } */}




                </tbody>
            </table>
            {
                deletingUser && <Confirmationmodal
                    title={`Are your sure you want to delete?`}
                    message={`If you delete ${deletingUser.email}. it can not be undone`}
                    closeModal={closeModal}
                    modaldata={deletingUser}
                    deleteDoctor={deleteUser}

                ></Confirmationmodal>
            }
        </div>
    );
};

export default Users;