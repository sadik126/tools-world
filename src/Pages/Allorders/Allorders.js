import React, { useEffect, useState } from 'react';

const Allorders = () => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetch('https://tools-server-five.vercel.app/bookings')
            .then(res => res.json())
            .then(data => setOrders(data))
    }, [])


    const handledelete = (id) => {
        const proceed = window.confirm('are you sure?')
        if (proceed) {
            const url = `https://tools-server-five.vercel.app/bookings/${id}`
            fetch(url, {
                method: 'DELETE'
            })

                .then(res => res.json())
                .then(data => {
                    const remaining = orders.filter(order => order._id !== id)
                    setOrders(remaining)
                    console.log(data)
                })

        }

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
                        orders.map((order, index) => <tr>
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