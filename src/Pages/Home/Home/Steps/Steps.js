import React from 'react';
import { FaUser, FaClipboardList, FaShoppingCart, FaCreditCard, FaBoxOpen } from "react-icons/fa";
import { motion } from "framer-motion";

const Steps = () => {

    const steps = [
        { icon: <FaUser />, title: "Register", bg: "from-green-400 to-blue-500" },
        { icon: <FaClipboardList />, title: "Choose Plan", bg: "from-purple-500 to-pink-500" },
        { icon: <FaShoppingCart />, title: "Place Order", bg: "from-orange-500 to-yellow-500" },
        { icon: <FaCreditCard />, title: "Add Payment", bg: "from-teal-400 to-cyan-500" },
        { icon: <FaBoxOpen />, title: "Receive Product", bg: "from-red-500 to-purple-500" },
      ];
    return (
        // <div>
        //     <div className="text-center my-10 text-2xl font-bold">Follow Those Steps For Products</div>
        //     <div className="grid justify-center my-12">
        //         <ul class="steps steps-vertical lg:steps-horizontal ">
        //             <li class="step step-secondary text-lg">Register</li>
        //             <li class="step step-primary text-lg">Choose plan</li>
        //             <li class="step step-accent text-lg">Place Order</li>
        //             <li class="step step-info text-lg">Add Payment</li>
        //             <li class="step step-success text-lg">Receive Product</li>
        //         </ul>
        //     </div>

        // </div>

        <div className="py-16 mt-[20rem]">
        {/* Section Title */}

        <h2 className='text-3xl my-20 text-center uppercase font-mono mt-16 font-bold'>Follow These Steps for Your <span className='text-primary'>Product</span> </h2>
  
        {/* Steps Container */}
        <div className="flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-0">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              
              {/* Step Box with Unique Gradient */}
              <motion.div 
                className={`flex flex-col items-center p-5 rounded-xl bg-gradient-to-r ${step.bg} text-white shadow-xl w-48 border border-gray-500 transition-transform transform hover:scale-105`}
                whileHover={{ scale: 1.1 }}
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white text-gray-800 text-3xl mb-3 shadow-lg">
                  {step.icon}
                </div>
                <p className="text-lg font-semibold">{step.title}</p>
              </motion.div>
  
              {/* Horizontal Line */}
              {index !== steps.length - 1 && (
                <div className="hidden lg:block w-20 h-1 bg-gray-300"></div>
              )}
  
            </div>
          ))}
        </div>
      </div>
    );
};

export default Steps;