import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Useaxiossecure from '../Useaxiossecure/Useaxiossecure';

const AddProduct = () => {
    const { register, formState: { errors }, handleSubmit, reset, setValue } = useForm();
    const imgStorageKey = 'e0e49e32b3b219f54116af3c0da0de50';
    const axiossecure = Useaxiossecure()
    const [loading, setLoading] = useState(false);

    const categories = [
        { value: "tools", label: "Tools" },
        { value: "hardware", label: "Hardware" },
        { value: "electronics", label: "Electronics" },

    ];

    const onSubmit = async (data) => {
        setLoading(true);
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
                category: data.category,
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
            setLoading(false);


        }
    };

    return (
        <>
            <div className="max-w-4xl mx-auto px-4">
                <h1 className='text-center text-accent text-4xl mt-12'>Add Product</h1>

                <div className=' shadow-lg p-6 rounded-lg mt-6'>
                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Product Name */}
                        <div className="form-control">
                            <label className="label"><span className="label-text">Name</span></label>
                            <input {...register("name", { required: "Product name is required" })}
                                type="text" placeholder="Enter product name" className="input input-bordered w-full" />
                            <span className="label-text-alt text-red-600">{errors.name?.message}</span>
                        </div>

                        {/* Price */}
                        <div className="form-control">
                            <label className="label"><span className="label-text">Price</span></label>
                            <input {...register("price", { required: "Price is required" })}
                                type="number" placeholder="Enter price" className="input input-bordered w-full" />
                            <span className="label-text-alt text-red-600">{errors.price?.message}</span>
                        </div>

                        {/* Available Quantity */}
                        <div className="form-control">
                            <label className="label"><span className="label-text">Available</span></label>
                            <input {...register("available", { required: "Available product count is required" })}
                                type="number" placeholder="Available stock" className="input input-bordered w-full" />
                            <span className="label-text-alt text-red-600">{errors.available?.message}</span>
                        </div>

                        {/* Minimum Order Quantity */}
                        <div className="form-control">
                            <label className="label"><span className="label-text">Minimum Order</span></label>
                            <input {...register("amount", { required: "Minimum order amount is required" })}
                                type="number" placeholder="Enter minimum order amount" className="input input-bordered w-full" />
                            <span className="label-text-alt text-red-600">{errors.amount?.message}</span>
                        </div>

                        {/* Category */}
                        <div className="form-control">
                            <label className="label"><span className="label-text">Category</span></label>
                            <select {...register("category", { required: "Category is required" })}
                                className="select select-bordered w-full">
                                <option value="">Select a category</option>
                                {categories.map((cat) => (
                                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                                ))}
                            </select>
                            <span className="label-text-alt text-red-600">{errors.category?.message}</span>
                        </div>

                        {/* Image Upload */}
                        <div className="form-control">
                            <label className="label"><span className="label-text">Photo</span></label>
                            <input
                                type="file"
                                className="input input-bordered w-full"
                                multiple
                                accept="image/*"
                                onChange={(e) => setValue("images", e.target.files)}
                            />
                        </div>

                        {/* Description - Full Width */}
                        <div className="form-control md:col-span-2">
                            <label className="label"><span className="label-text">Description</span></label>
                            <textarea {...register("description", { required: "Description is required" })}
                                placeholder="Type here" className="textarea textarea-bordered w-full h-24" />
                            <span className="label-text-alt text-red-600">{errors.description?.message}</span>
                        </div>

                        {/* Submit Button - Full Width */}
                        <div className="md:col-span-2 flex justify-center">
                            <button className="btn btn-primary w-full md:w-1/2" type="submit" disabled={loading}>
                                {loading ? "Uploading..." : "Add Product"}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
};

export default AddProduct;
