import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

const Toolsdetails = () => {
    const products = useLoaderData();
    const nevigate = useNavigate();
    const nevigateperchase = (id) => {
        nevigate(`/purchase/${id}`)
    }


    const changeImage = (image) => {
        console.log(image)
        const fullimage = document.getElementById('fullimage')
        // fullimage.src = image.src;

        fullimage.setAttribute('src', image)


    }
    return (
        <>
            <div class="hero min-h-screen bg-base-200">
                <div class="hero-content flex-col lg:flex-row">
                    <img id='fullimage' style={{ height: '270px', width: '270px' }} src={products.img} class="max-w-sm rounded-lg shadow-2xl" />
                    <div className='w-3/4 flex lg:flex-col sm:flex-row' >
                        <img src={products.img} class="w-1/4 my-4 opacity-50 hover:opacity-100 cursor-pointer" onClick={() => changeImage(products.img)} />
                        <img src={products.img1} class="w-1/4 my-4 opacity-50 hover:opacity-100 cursor-pointer" onClick={() => changeImage(products.img1)} />
                        <img src={products.img2} class="w-1/4 my-4 opacity-50 hover:opacity-100 cursor-pointer" onClick={() => changeImage(products.img2)} />
                    </div>
                    <div>
                        <h1 class="text-5xl font-bold">{products.name}</h1>
                        <p class="py-6">{products.description}</p>
                        <p class="py-6 text-red-600 text-2xl">Price:{products.price} USD</p>
                        <p class="py-6 text-xl">Available products: {products.available}</p>
                        <p class="py-6 text-xl">Minimum products: {products.minimum}</p>
                        <button onClick={() => nevigateperchase(products._id)} class="btn btn-primary">Buy now</button>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Toolsdetails;
