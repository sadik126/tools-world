import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Authcontext } from '../../../Context/Authprovider';
import Loading from '../../../Shared/Loading/Loading';

const Purchase = () => {
    // const { id } = useParams();
    // const nevigate = useNavigate();
    const { user } = useContext(Authcontext);


    const { register, formState: { errors }, handleSubmit, reset } = useForm({
        defaultValues: {
            name: user?.displayName,
            email: user?.email

        }

    });


    const booking = useLoaderData();






    const { data: bookings = [], isError, isLoading, refetch } = useQuery({
        queryKey: ['bookings'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:4040/tools/${booking._id}`)
            const data = await res.json()
            return data
        }
    })

    if (isLoading) {
        return <Loading></Loading>
    }





    const onSubmit = data => {
        console.log(data)
        updateData(data.amount)
        const purchaseProduct = {
            name: data.name,
            email: data.email,
            product: booking?.name,
            productPrice: booking?.price,
            totalprice: parseInt(data.amount) * booking?.price,
            phone: data.phone,
            amount: data.amount
        }
        fetch('http://localhost:4040/booking', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(purchaseProduct)

        })

            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {

                    toast.success('Purchase confirmed')
                    reset()

                }

                else {
                    toast.error(data.message)

                }

            })

    }


    const updateData = (amount) => {
        const updatedamount = parseInt(booking.available) - parseInt(amount);
        console.log(updatedamount)
        const url = ` http://localhost:4040/updatedtools/${booking._id}`
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ updatedamount })
        })

            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast.success(`${booking?.name} is  updated`)
                refetch();



            })

    }


    return (
        <>
            <div className="alert alert-error shadow-lg  lg:w-6/12 sm:w-full mt-16 mx-auto">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span className='text-center'>You must have to book minimum {booking.minimum} items</span>
                </div>
            </div>

            <div className="hero min-h-screen">

                <div className="hero-content flex-col lg:flex-row-reverse">

                    <div className="text-center lg:text-left sm:w-full lg:w-1/2">

                        <img src={booking.img} alt="" />
                        <h1 className='text-3xl font-mono font-bold'>{bookings.name}</h1>
                        <p className='text-accent font-bold'>Details</p>
                        <p className='text-gray-500'>{bookings.description}</p>
                        <p className='text-accent text-2xl font-bold'>Price :  <span className=''>{bookings.price}$</span></p>
                        <p className='text-accent text-2xl font-bold uppercase'>Available :  <span className='text-gray-500'>{bookings.available} products</span></p>



                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                        {errors.name && <span className="label-text-alt text-red-600 font-serif">{errors.name.message}</span>}
                                    </label>

                                    <input {...register("name", {
                                        required: { value: true, message: 'Name is required' }
                                    })} type="text" value={user?.displayName} disabled={user} placeholder="name" className="input input-bordered" />

                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                        {errors.email && <span className="label-text-alt text-red-600 font-serif">{errors.email.message}</span>}
                                    </label>
                                    <input {...register("email", {
                                        required: { value: true, message: 'Email is required' }
                                    })} type="text" value={user?.email} disabled={user} placeholder="email" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Phone</span>
                                        {errors.phone?.type === 'required' && <span className="label-text-alt text-red-600 font-serif">{errors.phone.message}</span>}
                                        {errors.phone?.type === 'minLength' && <span className="label-text-alt text-red-600 font-serif">{errors.phone.message}</span>}
                                        {errors.phone?.type === 'pattern' && <span className="label-text-alt text-red-600 font-serif">{errors.phone.message}</span>}
                                        {errors.phone?.type === 'maxLength' && <span className="label-text-alt text-red-600 font-serif">{errors.phone.message}</span>}
                                    </label>
                                    <input {...register("phone", {
                                        required: { value: true, message: 'Number is required' },
                                        pattern: { value: /^[0-9+-]+$/, message: 'Enter valid phone number' },
                                        minLength: { value: 11, message: 'Your digit is lower than 11' },
                                        maxLength: { value: 11, message: "Your digit is higher than 11" }

                                    })} type="text" placeholder="phone" className="input input-bordered" />

                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Amount</span>
                                        {errors.amount?.type === 'required' && <span className="label-text-alt text-red-600">{errors.amount.message}</span>}
                                        {errors.amount?.type === 'min' && <span className="label-text-alt text-red-600">{errors.amount.message}</span>}
                                        {errors.amount?.type === 'max' && <span className="label-text-alt text-red-600">{errors.amount.message}</span>}
                                    </label>
                                    <input {...register("amount", {
                                        required: { value: true, message: 'Amount is required' },
                                        min: { value: booking?.minimum, message: 'icrease your number' },
                                        max: { value: booking?.available, message: 'reduce your number' }
                                    })} type="number" placeholder="Amount" className="input input-bordered" />
                                </div>
                                <div className="form-control mt-6">
                                    <button disabled={errors.amount?.type === 'min' || errors.amount?.type === 'max' || !user} className="btn btn-primary">Purchase your product</button>
                                </div>


                            </form>

                        </div>
                    </div>
                </div>
            </div>


        </>
    );
};

export default Purchase;