import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Cardpayment from './Cardpayment';

const Payment = () => {
    const stripePromise = loadStripe('pk_test_51L4KKASJGWFrRQt8wPF6JUjMkUIrrrRXjeMh0bk7GMs8HvjfPS5VwCFNg53uzPnR1B4QpWHCQJIp6X9i8PSD8HD100Y3GFFVFn');

    const booking = useLoaderData();
    console.log(booking)

    return (
        <div className='p-10'>
            <h3 className='text-center text-3xl font-thin font-extrabold'>Hello <span className='text-primary'>{booking.name}</span> </h3>
            <h3 className="text-3xl">Please pay for  {booking.product}</h3>
            <p className="text-xl">You should pay <strong className='text-accent'>${booking.totalprice}</strong> for the amount of {booking.amount} products</p>
            <div className="alert alert-warning shadow-lg">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <span>Warning: Please pay as soon as possible.otherwise your product will be removed</span>
                </div>
            </div>
            <div className='w-96 my-12'>
                <Elements stripe={stripePromise}>
                    <Cardpayment booking={booking}></Cardpayment>
                </Elements>

            </div>

        </div>
    );
};

export default Payment;