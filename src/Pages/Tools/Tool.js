import React from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import { motion } from 'framer-motion';

const Tool = (props) => {
    const { _id, name, price, minimum, available, description, images,img, loading } = props.tool
    const nevigate = useNavigate();

    const nevigatedetail = (id) => {
        nevigate(`/tools/${id}`)
    }

    const nevigateperchase = (id) => {
        nevigate(`/purchase/${id}`)
    }

    console.log(images)

    // if (loading) {
    //     return <Loading></Loading>
    // }
    return (
        // <>
        //     <div class="card  shadow-xl p-5">
        //         <div class="px-10 pt-10">
        //             <img  src={img}  style={{ height: "170px", width: "100%", objectFit: "cover" }}  alt="" />

        //         </div>

        //         <div class="card-body items-center text-center">
        //             <h2 class="card-title">{name}</h2>
        //             {/* class="rounded-xl" */}
        //             <p>{description?.substring(0, 50)}...</p>
        //             <p>Available : {available}</p>
        //             <p>Price : {price}</p>
        //             <p>Minimum : {minimum}</p>
        //             <div class="card-actions">
        //                 <button onClick={() => nevigateperchase(_id)} class="btn btn-primary">Buy Now</button>
        //                 <button onClick={() => nevigatedetail(_id)} class="btn btn-secondary">Detail</button>
        //             </div>
        //         </div>
        //     </div>

        // </>

        <motion.div 
        className="relative p-5 bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
    >
        <div className="overflow-hidden rounded-xl">
            <img 
                src={img ? img :images[0]} 
                alt={name} 
                className="w-full h-40 object-cover rounded-xl hover:scale-110 transition-all duration-500" 
            />
        </div>
        
        <div className="p-4 text-center">
            <h2 className="text-xl font-bold ">{name}</h2>
            <p className=" text-sm mt-2">{description?.substring(0, 50)}...</p>
            <p className=" text-sm mt-1">Available: <span className="text-green-400 font-semibold">{available}</span></p>
            <p className=" text-sm mt-1">Minimum: <span className="text-red-700 font-semibold">{minimum}</span></p>
            <p className="text-lg font-semibold text-cyan-400 mt-2">Price: ${price}</p>
        </div>
        
        <div className="flex gap-3 mt-4 justify-center">
            <motion.button 
                onClick={()=>nevigateperchase(_id)}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-gray-600 font-bold rounded-xl shadow-md hover:scale-105 transition-all duration-300"
            >
                Buy Now
            </motion.button>
            <motion.button 
                onClick={()=>nevigatedetail(_id)}
                className="px-4 py-2 bg-gray-800 text-white font-bold rounded-xl shadow-md hover:bg-gray-700 transition-all duration-300"
            >
                Detail
            </motion.button>
        </div>
    </motion.div>
    );
};

export default Tool;