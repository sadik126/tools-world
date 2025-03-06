import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Confirmationmodal from '../../Shared/Confirmationmodal/Confirmationmodal';
import Loading from '../../Shared/Loading/Loading';
import Selectadmin from './Selectadmin';
import Useaxiossecure from '../Useaxiossecure/Useaxiossecure';
import Swal from 'sweetalert2';



const Users = () => {
   
    // const [deletingUser, setdeletingUser] = useState(null)
    

    // const closeModal = () => {
    //     setdeletingUser(null)
    // }
    const [searchTerm, setSearchTerm] = useState("");

    const axiossecure = Useaxiossecure()
    const { data: users = [], isError, isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async()=>{
            const res = await axiossecure.get('/users' );
            return res.data;
        }
    })

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (isLoading) {
        return <Loading></Loading>
    }


    const makeAdmin = async(id) => {

      
        await axiossecure.patch(`/user/admin/${id}`,{

        })
            .then(res => {
                console.log(res.data)
                refetch()
                if(res.data.modifiedCount > 0){
                    refetch()
                    Swal.fire({
                      title: "Thanks for updating!",
                      text: `the user  has been promoted to Admin`,
                      icon: "success"
                    });
                }
            })
    }


    const deleteUser = async (id) => {
        // fetch(`http://localhost:4040/user/${user._id}`, {
        //     method: 'DELETE'
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data)
        //         if (data.deletedCount > 0) {
        //             toast.error(`${user.email} is deleted`)
        //             refetch()
        //         }

        //     })
     await   Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this in tools world!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async(result) => {
            if (result.isConfirmed) {
             await axiossecure.delete(`/user/${id}`)
                .then (async(res) => {
                  if (res.data.deletedCount > 0) {
                  await  refetch()
                   await Swal.fire({
                      title: "Deleted!",
                      text: "Your file has been deleted.",
                      icon: "success"
                    });
                  }
                })
      
            }
          });
    }
    return (
        <div className="overflow-x-auto">

            <div className='flex justify-center my-20'><input 
    type="text" 
    placeholder="Search Users..." 
    className="border border-gray-300 rounded p-2 w-1/3"
    onChange={(e) => setSearchTerm(e.target.value)}
/></div>
            
            
            <table className="table table-zebra w-full">


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
                       filteredUsers.map((user, i) => <tr key={user._id} className='hover'>
                            <th>{i + 1}</th>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user?.role !== 'admin' ? <button onClick={() => makeAdmin(user._id)} className='btn btn-xs btn-primary'>Make Admin</button> : <p className='btn btn-xs btn-secondary'>Admin</p>}</td>
                            <td>{user?.role !== 'admin' && <label onClick={() => deleteUser(user._id)} htmlFor="confirmation-modal" className='btn btn-xs btn-error'>Delete</label>}</td>



                        </tr>)
                    }

               




                </tbody>
            </table>
            {/* {
                deletingUser && <Confirmationmodal
                    title={`Are your sure you want to delete?`}
                    message={`If you delete ${deletingUser.email}. it can not be undone`}
                    closeModal={closeModal}
                    modaldata={deletingUser}
                    deleteDoctor={deleteUser}

                ></Confirmationmodal>
            } */}
        </div>
    );
};

export default Users;