import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Authcontext } from '../../Context/Authprovider';
import Confirmationmodal from '../../Shared/Confirmationmodal/Confirmationmodal';
import Loading from '../../Shared/Loading/Loading';

const Dashboard = () => {
    const { user, loading } = useContext(Authcontext)
    const [deletingAppointment, setdeletingAppointment] = useState(null)

    const closeModal = () => {
        setdeletingAppointment(null)
    }

    const url = `https://tools-server-aok2.onrender.com/booking?email=${user?.email}`

    const { data: bookings = [], isLoading, refetch } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json()
            return data;
        },
        enabled: !!user?.email
    })

    if (loading || isLoading) {
        return <Loading></Loading>
    }

    const deleteBooking = (booking) => {
        fetch(`https://tools-server-aok2.onrender.com/bookings/${booking._id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.deletedCount > 0) {
                    toast(`${booking.product} is deleted`)
                    refetch()
                    setdeletingAppointment(null);
                }

            })
            .catch(error => {
                toast.error("Failed to delete booking!");
            });
    }
    return (
        <div>
            {/* <div className="overflow-x-auto">
                <table className="table w-full">
                 
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Product</th>
                            <th>phone</th>
                            <th>product Price</th>
                            <th>Total Price</th>
                            <th>Payment</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                       
                        {
                            bookings.map((booking, i) =>

                                <tr className="hover" key={booking._id}>
                                    <th>{i + 1}</th>
                                    <td>{booking.name}</td>
                                    <td>{booking.email}</td>
                                    <td>{booking.product}</td>
                                    <td>{booking.phone}</td>
                                    <td>{booking.productPrice}</td>
                                    <td>{booking.totalprice}</td>
                                    <td>
                                        {
                                            booking.productPrice && !booking.paid && <Link to={`/dashboard/payment/${booking._id}`}><button class="btn btn-xs btn-success">Make payment</button></Link>
                                        }

                                        {
                                            booking.productPrice && booking.paid && <span className='text-success'>Paid</span>
                                        }



                                    </td>
                                    <td><label onClick={() => setdeletingAppointment(booking)} htmlFor="confirmation-modal" className='btn btn-xs btn-error'>Delete</label></td>
                                </tr>
                            )
                        }
                     

                    </tbody>
                </table>
            </div>
            {
                deletingAppointment && <Confirmationmodal
                    title={`Are your sure you want to delete?`}
                    message={`If you delete ${deletingAppointment.product}. it can not be undone`}
                    closeModal={closeModal}
                    modaldata={deletingAppointment}
                    deleteDoctor={deleteBooking}

                ></Confirmationmodal>
            } */}
            <div className="p-5">
                <h2 className="text-xl font-semibold  mb-4">Your Bookings</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border-none  rounded-lg shadow-md">
                        <thead className=" ">
                            <tr className="text-left">
                                <th className="p-3">#</th>
                                <th className="p-3">Name</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Product</th>
                                <th className="p-3">Phone</th>
                                <th className="p-3">Price</th>
                                <th className="p-3">Total</th>
                                <th className="p-3">Payment</th>
                                <th className="p-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking, i) => (
                                <tr key={booking._id} className="border-none hover:bg-blue-600 hover:text-white transition-all">
                                    <td className="p-3">{i + 1}</td>
                                    <td className="p-3">{booking.name}</td>
                                    <td className="p-3">{booking.email}</td>
                                    <td className="p-3">{booking.product}</td>
                                    <td className="p-3">{booking.phone}</td>
                                    <td className="p-3">${booking.productPrice}</td>
                                    <td className="p-3">${booking.totalprice}</td>
                                    <td className="p-3">
                                        {!booking.paid ? (
                                            <Link to={`/dashboard/payment/${booking._id}`}>
                                                <button className="bg-green-500  px-3 py-1 rounded-lg text-xs hover:bg-green-600 transition">
                                                    Pay Now
                                                </button>
                                            </Link>
                                        ) : (
                                            <span className="text-green-500 font-semibold">Paid</span>
                                        )}
                                    </td>
                                    <td className="p-3">
                                        <button
                                            onClick={() => setdeletingAppointment(booking)}
                                            className="bg-red-500  px-3 py-1 rounded-lg text-xs hover:bg-red-600 transition"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {deletingAppointment && (
                    <Confirmationmodal
                        title="Are you sure?"
                        message={`If you delete ${deletingAppointment.product}, it cannot be undone.`}
                        closeModal={closeModal}
                        modaldata={deletingAppointment}
                        deleteDoctor={deleteBooking}
                    />
                )}
            </div>
        </div>
    );
};

export default Dashboard;