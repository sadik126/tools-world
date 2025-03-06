import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Axiospublic from '../Axiospublic/Axiospublic';
import Useaxiossecure from '../Useaxiossecure/Useaxiossecure';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';


const image_api = 'e0e49e32b3b219f54116af3c0da0de50';
const imageurl = `https://api.imgbb.com/1/upload?&key=${image_api}`;

const Edititems = () => {

    const { name, description, price, available, minimum, img, category, _id } = useLoaderData()

    const { register, formState: { errors }, handleSubmit, reset, setValue } = useForm()
    const [loading, setLoading] = useState(false);
    const axiospublic = Axiospublic()
    const axiossecuredata = Useaxiossecure()

    const categories = [
        { value: "tools", label: "Tools" },
        { value: "hardware", label: "Hardware" },
        { value: "electronics", label: "Electronics" },

    ];

    console.log(name, description, price, available, minimum, img, category)


    const onSubmit = async (data) => {
        setLoading(true);

        let updatedImage = img;
        if (data.image.length > 0) {
            const imagefile = { image: data.image[0] }
            console.log(data.image)
            const res = await axiospublic.post(imageurl, imagefile, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (res.data.success) {
                updatedImage = res.data.data.display_url;

            }
        }


        const item = {
            name: data.name,
            category: data.category,
            price: parseFloat(data.price),
            recipe: data.recipe,
            image: updatedImage
        }
        console.log(item)
        const menures = await axiossecuredata.patch(`/tool/${_id}`, item)
        console.log(menures.data)
        if (menures.data.modifiedCount > 0) {

            Swal.fire({
                position: "center",
                icon: "success",
                title: `${data.name} updated on menu successfully`,
                showConfirmButton: false,
                timer: 1500,
            }).then(() => {
                window.location.reload(); // Page will refresh after success message
            });
        }
        reset();

        console.log(data)

        setLoading(false);
    }



    return (
        <div className="max-w-4xl mx-auto px-4">
            <h1 className='text-center text-accent text-4xl mt-12'>Edit {name}</h1>

            <div className=' shadow-lg p-6 rounded-lg mt-6'>
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Product Name */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Name</span></label>
                        <input defaultValue={name} {...register("name", { required: "Product name is required" })}
                            type="text" placeholder="Enter product name" className="input input-bordered w-full" />
                        <span className="label-text-alt text-red-600">{errors.name?.message}</span>
                    </div>

                    {/* Price */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Price</span></label>
                        <input defaultValue={price} {...register("price", { required: "Price is required" })}
                            type="number" placeholder="Enter price" className="input input-bordered w-full" />
                        <span className="label-text-alt text-red-600">{errors.price?.message}</span>
                    </div>

                    {/* Available Quantity */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Available</span></label>
                        <input defaultValue={available} {...register("available", { required: "Available product count is required" })}
                            type="number" placeholder="Available stock" className="input input-bordered w-full" />
                        <span className="label-text-alt text-red-600">{errors.available?.message}</span>
                    </div>

                    {/* Minimum Order Quantity */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Minimum Order</span></label>
                        <input defaultValue={minimum} {...register("amount", { required: "Minimum order amount is required" })}
                            type="number" placeholder="Enter minimum order amount" className="input input-bordered w-full" />
                        <span className="label-text-alt text-red-600">{errors.amount?.message}</span>
                    </div>

                    {/* Category */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Category</span></label>
                        <select defaultValue={category} {...register("category", { required: "Category is required" })}
                            className="select select-bordered w-full">
                            <option value="">Select a category</option>
                            {categories.map((cat) => (
                                <option key={cat.value} value={cat.value}>{cat.label}</option>
                            ))}
                        </select>
                        <span className="label-text-alt text-red-600">{errors.category?.message}</span>
                    </div>

                    {/* Current Image Preview */}
                    {img && (
                        <div className="flex flex-col items-center">
                            <p className="label-text">Current Image:</p>
                            <img src={img} alt="Current" className="w-32 h-32 object-cover rounded-lg shadow-md" />
                        </div>
                    )}

                    {/* Image Upload */}
                    <div className="form-control md:col-span-2">
                        <label className="label"><span className="label-text">Upload New Image</span></label>
                        <input {...register("image")} type="file" className="file-input file-input-ghost w-full" />
                    </div>

                    {/* Description - Full Width */}
                    <div className="form-control md:col-span-2">
                        <label className="label"><span className="label-text">Description</span></label>
                        <textarea defaultValue={description} {...register("description", { required: "Description is required" })}
                            placeholder="Type here" className="textarea textarea-bordered w-full h-24" />
                        <span className="label-text-alt text-red-600">{errors.description?.message}</span>
                    </div>

                    {/* Submit Button - Full Width */}
                    <div className="md:col-span-2 flex justify-center">
                        <button className="btn btn-warning w-full md:w-1/2" type="submit" disabled={loading}>
                            {loading ? "Updating..." : "Edit Product"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Edititems;