import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Useaxiossecure from '../Useaxiossecure/Useaxiossecure';

const AddProduct = () => {
    const { register, formState: { errors }, handleSubmit, reset, setValue } = useForm();
    const imgStorageKey = 'e0e49e32b3b219f54116af3c0da0de50';
    const axiossecure = Useaxiossecure()

    const onSubmit = async (data) => {
        const images = Array.from(data.images);
        console.log("Selected Images:", images);

        const imgUrls = [];

        for (let i = 0; i < images.length; i++) {
            const formData = new FormData();
            formData.append("image", images[i]);

            const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgStorageKey}`, {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            if (result.success) {
                imgUrls.push(result.data.url);
            }
        }

        if (imgUrls.length === images.length) {
            const product = {
                name: data.name,
                description: data.description,
                price: parseFloat(data.price),
                available: parseInt(data.available),
                minimum: parseInt(data.amount),
                images: imgUrls,
            };

            console.log(product)

            const productres = await axiossecure.post('/tools', product)
            console.log(productres)
            if (productres.data.insertedId) {
                toast.success("Product added successfully!");
                reset();
                setValue("images", null);
            }

            //     fetch("http://localhost:4040/tools", {
            //         method: "POST",
            //         headers: { "Content-Type": "application/json" },
            //         body: JSON.stringify(product),
            //     })
            //         .then((res) => res.json())
            //         .then((response) => {
            //             if (response.success) {
            //                 toast.success("Product added successfully!");
            //                 reset();
            //                 setValue("images", null); // Clear images field
            //             }
            //         });
        }
    };

    return (
        <>
            <h1 className='text-center text-accent text-4xl mt-12'>Add Product</h1>
            <div className='flex justify-center items-center'>

                <form onSubmit={handleSubmit(onSubmit)} className="form-control w-full sm:max-w-xs mx-auto">

                    {/* Product Name */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Name</span></label>
                        <input {...register("name", { required: "Product name is required" })}
                            type="text" placeholder="Enter product name" className="input input-bordered w-full max-w-xs" />
                        <span className="label-text-alt text-red-600">{errors.name?.message}</span>
                    </div>

                    {/* Description */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Description</span></label>
                        <textarea {...register("description", { required: "Description is required" })}
                            placeholder="Type here" className="input input-bordered w-full max-w-xs textarea textarea-bordered" />
                        <span className="label-text-alt text-red-600">{errors.description?.message}</span>
                    </div>

                    {/* Price */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Price</span></label>
                        <input {...register("price", { required: "Price is required" })}
                            type="number" placeholder="Enter price" className="input input-bordered" />
                        <span className="label-text-alt text-red-600">{errors.price?.message}</span>
                    </div>

                    {/* Available Quantity */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Available</span></label>
                        <input {...register("available", { required: "Available product count is required" })}
                            type="number" placeholder="Available stock" className="input input-bordered" />
                        <span className="label-text-alt text-red-600">{errors.available?.message}</span>
                    </div>

                    {/* Minimum Order Quantity */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Minimum Order</span></label>
                        <input {...register("amount", { required: "Minimum order amount is required" })}
                            type="number" placeholder="Enter minimum order amount" className="input input-bordered" />
                        <span className="label-text-alt text-red-600">{errors.amount?.message}</span>
                    </div>

                    {/* Image Upload */}
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Photo</span>
                        </label>
                        <input
                            type="file"
                            className="input input-bordered"
                            multiple
                            accept="image/*"
                            onChange={(e) => setValue("images", e.target.files)}
                        />
                        {/* <label class="input-group">
                            <span>photo</span>
                            







                        </label> */}

                        <label className="label">
                            {errors.image?.type === 'required' && <span className="label-text-alt text-red-600">{errors.image.message}</span>}




                        </label>

                    </div>




                    {/* Submit Button */}
                    <input className="btn btn-outline btn-primary w-full max-w-xs mt-6" type="submit" value="Add Product" />
                </form>
            </div>
        </>
    );
};

export default AddProduct;
