import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLoaderData, useNavigate } from 'react-router-dom';

const Toolsdetails = () => {
    const products = useLoaderData();
    const nevigate = useNavigate();
    const nevigateperchase = (id) => {
        nevigate(`/purchase/${id}`)
    }


    const changeImage = (image) => {
        document.getElementById('fullImage').setAttribute('src', image);
    };

    // const changeImage = (image) => {
    //     console.log(image)
    //     const fullimage = document.getElementById('fullimage')
    //     // fullimage.src = image.src;

    //     fullimage.setAttribute('src', image)


    // }
    return (
        <>
        <Helmet>
                <title>Details</title>
              </Helmet>
         <div className="min-h-screen flex items-center justify-center  p-6">
            <div className="w-full max-w-6xl flex flex-col md:flex-row bg-gray-950 bg-opacity-80 rounded-2xl shadow-2xl p-6 backdrop-blur-md">
                {/* Product Images */}
                <div className="flex flex-col items-center md:w-1/2">
                    <img 
                        id="fullImage" 
                        className="w-80 h-80 object-cover rounded-xl shadow-lg border border-gray-700" 
                        src={products.images ? products.images[0] : products.img} 
                        alt={products.name} 
                    />
                    <div className="flex gap-2 mt-4">
                        {products.images?.map((img, index) => (
                            <img 
                                key={index} 
                                src={img} 
                                alt={`Thumbnail ${index + 1}`} 
                                className="w-16 h-16 object-cover rounded-lg cursor-pointer hover:opacity-80 border border-gray-700"
                                onClick={() => changeImage(img)}
                            />
                        ))}
                    </div>
                </div>
                
                {/* Product Info */}
                <div className="md:w-1/2 flex flex-col justify-center p-6">
                    <h1 className="text-4xl font-bold ">{products.name}</h1>
                    <p className=" mt-3">{products.description}</p>
                    <p className="text-red-400 text-2xl font-semibold mt-3">Price: ${products.price}</p>
                    <p className=" mt-2">Available: {products.available} units</p>
                    <p className=" mt-1">Minimum Order: {products.minimum} units</p>
                    <button 
                        onClick={() => nevigateperchase(products._id)}
                        className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-400 text-white font-semibold rounded-lg shadow-md transition"
                    >
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    </>
    );
};

export default Toolsdetails;
