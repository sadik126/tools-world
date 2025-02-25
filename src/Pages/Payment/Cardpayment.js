import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Loading from '../../Shared/Loading/Loading';

const Cardpayment = ({ booking }) => {
    const [clientSecret, setClientSecret] = useState("");
    const [success, setSuccess] = useState("");
    const [processing, setProcessing] = useState(false);
    const [transationId, setTransationid] = useState("");
    const [isLoading, setIsLoading] = useState(true)
    const [cardError, setcardError] = useState('')
    const stripe = useStripe()
    const elements = useElements();
    const { totalprice, name, email, _id
    } = booking

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:4040/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ totalprice }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data?.clientSecret) {
                    setClientSecret(data.clientSecret);
                    setIsLoading(false)
                    console.log(clientSecret)
                }
                // setClientSecret(data.clientSecret)

            });

    }, [totalprice]);

    if (isLoading) {
        return <Loading></Loading>
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setcardError(error.message)
        } else {
            setcardError('')
        }



        setSuccess('')
        setProcessing(true)
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: name,
                        email: email,
                        address: {
                            line1: "123 Test Street",
                            city: "New Delhi",
                            state: "Delhi",
                            postal_code: "110001",
                            country: "IN" // **India হওয়া লাগবে**
                        }
                    },
                },
            },
        );

        if (confirmError) {
            setcardError(confirmError.message)
            return
        }

        console.log(paymentIntent)

        if (paymentIntent.status === 'succeeded') {


            const payment = {
                totalprice,
                transationId: paymentIntent.id,
                email,
                bookingId: _id,
                description: "Payment for tools from Tools World"

            }

            fetch('http://localhost:4040/payments', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(payment)
            })

                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.acknowledged) {

                        setSuccess('Congrates.Your payment is complete')
                        setTransationid(paymentIntent.id)
                        toast.success('your payment is complete')
                    }
                })
        }

        setProcessing(false)

    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#50d57f',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-success mt-10' type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            <p className="text-red-600">{cardError}</p>
            {
                success && <div>
                    <p className="text-green-600">{success}</p>
                    <p>Your transationId: <span className='font-extrabold'>{transationId}</span> </p>
                </div>
            }

        </div>
    );
};

export default Cardpayment;