import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
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

    const url = `http://localhost:4040/booking?email=${user?.email}`

    const { data: bookings = [], isLoading, refetch } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    auth: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json()
            return data;
        }
    })

    if (loading || isLoading) {
        return <Loading></Loading>
    }

    const deleteBooking = () => {

    }
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
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
                        {/* row 1 */}
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
                                            booking.price && booking.paid && <span className='text-success'>Paid</span>
                                        }



                                    </td>
                                    <td><label onClick={() => setdeletingAppointment(booking)} htmlFor="confirmation-modal" className='btn btn-xs btn-error'>Delete</label></td>
                                </tr>
                            )
                        }
                        {/* row 2 */}

                    </tbody>
                </table>
            </div>
            {
                deletingAppointment && <Confirmationmodal
                    title={`Are your sure you want to delete?`}
                    message={`If you delete ${deletingAppointment.patient}. it can not be undone`}
                    closeModal={closeModal}
                    modaldata={deletingAppointment}
                    deleteDoctor={deleteBooking}

                ></Confirmationmodal>
            }
        </div>
    );
};

export default Dashboard;