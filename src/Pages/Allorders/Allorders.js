import React, { useEffect, useState } from 'react';
import Useaxiossecure from '../Useaxiossecure/Useaxiossecure';
import Swal from 'sweetalert2';

const Allorders = () => {
    const [orders, setOrders] = useState([])

    const axiossecure = Useaxiossecure()
    useEffect(() => {
        axiossecure.get("/bookings")  // "/bookings" এর আগে baseURL অটোমেটিক যোগ হবে
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => {
                console.error("ডাটা আনতে সমস্যা হয়েছে:", error);
            });
    }, [axiossecure]);


    const handledelete = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiossecure.delete(`/bookings/${id}`)
                    .then(() => {
                        setOrders(prevOrders => prevOrders.filter(order => order._id !== id));
                    })
                    .catch(error => console.error("ডিলিট করতে সমস্যা হয়েছে:", error));
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });

    }
    return (
        <div class="overflow-x-auto">
            <table class="table w-full">

                <thead>
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>orders</th>
                        <th>email</th>
                        <th>amount</th>
                        <th>Price</th>
                        <th>Action</th>
                        <th>payment</th>
                        <th>Transaction id</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        orders.map((order, index) => <tr key={order._id}>
                            <th>{index + 1}</th>
                            <td>{order.name}</td>
                            <td>{order.product}</td>
                            <td>{order.email}</td>
                            <td>{order.amount}</td>
                            <td>{order.totalprice}$</td>
                            <td><button onClick={() => handledelete(order._id)} class="btn btn-xs btn-error">Delete</button></td>
                            <td>{order.paid ? <p className='text-green-600'>payment done</p> : <p className='text-error'>payment is not clear</p>} </td>
                            <td>{order.
                                transactionId}</td>

                        </tr>)
                    }




                </tbody>
            </table>
        </div>
    );
};

export default Allorders;