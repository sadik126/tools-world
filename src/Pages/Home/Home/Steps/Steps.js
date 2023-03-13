import React from 'react';

const Steps = () => {
    return (
        <div>
            <div className="text-center my-10 text-2xl font-bold">Follow Those Steps For Products</div>
            <div className="grid justify-center my-12">
                <ul class="steps steps-vertical lg:steps-horizontal ">
                    <li class="step step-secondary text-lg">Register</li>
                    <li class="step step-primary text-lg">Choose plan</li>
                    <li class="step step-accent text-lg">Place Order</li>
                    <li class="step step-info text-lg">Add Payment</li>
                    <li class="step step-success text-lg">Receive Product</li>
                </ul>
            </div>

        </div>
    );
};

export default Steps;