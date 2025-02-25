import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const Addproduct = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const imgstoragekey = 'e0e49e32b3b219f54116af3c0da0de50';

    const onSubmit = async data => {

        const image = data.image[0];
        const formdata = new FormData();
        formdata.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=${imgstoragekey}`

      await  fetch(url, {
            method: 'POST',
            body: formdata
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    const img = result.data.url;
                    const product = {
                        name: data.name,
                        description: data.description,
                        price: data.price,
                        available: data.available,
                        minimum: data.amount,
                        img: img
                    }

                     fetch('http://localhost:4040/tools', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(product)

                    })
                        .then(res => res.json())
                        .then(data =>  {
                            if (data.success) {
                                toast.success(`product is added`)
                                reset();
                            }

                        })


                }
                console.log('imgbb', result)
            })

        console.log(data)
        // setAmount(data)
        // console.log(data.amount)
        // const totalamount = data.amount;
        // await fetch('http://localhost:4040/booking', {
        //     method: 'POST',
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // })

        //     .then(res => res.json())
        //     .then(data => {
        //         if (data.success) {
        //             toast.success(`your booking is done`)
        //             reset();
        //         }
        //         else {
        //             toast.error(`product added already`)
        //         }


        //     })




    };
    return (
        <>
            <h1 className='text-center text-accent text-4xl mt-12'>Add product</h1>
            <div className='flex justify-center items-center'>

                <form onSubmit={handleSubmit(onSubmit)} className="form-control w-full sm:max-w-xs mx-auto">

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>

                        </label>
                        <input {...register("name", { required: { value: true, message: 'product name is required' } })} type="text" placeholder="Type your name" className="input input-bordered w-full max-w-xs" />
                        <label className="label">
                            {errors.name?.type === 'required' && <span className="label-text-alt text-red-600">{errors.name.message}</span>}



                        </label>




                    </div>


                    <div className="form-control ">
                        <label className="label">
                            <span className="label-text">Description</span>

                        </label>
                        <textarea {...register("description", { required: { value: true, message: 'description is required' } })} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs textarea textarea-bordered" />
                        <label className="label">
                            {errors.description?.type === 'required' && <span className="label-text-alt text-red-600">{errors.description.message}</span>}



                        </label>




                    </div>







                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">price</span>
                        </label>
                        <label class="input-group">
                            <span>price</span>
                            <input {...register("price", {
                                required: { value: true, message: 'price is required' }


                            })} type="text" placeholder="enter your number" class="input input-bordered" />
                        </label>

                        <label className="label">
                            {errors.price?.type === 'required' && <span className="label-text-alt text-red-600">{errors.price.message}</span>}



                        </label>
                    </div>


                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Available</span>
                        </label>
                        <label class="input-group">
                            <span>available</span>
                            <input {...register("available", { required: { value: true, message: 'available product is required' } })} type="text" placeholder="10" class="input input-bordered" />

                        </label>
                    </div>

                    <label className="label">
                        {errors.available?.type === 'required' && <span className="label-text-alt text-red-600">{errors.available.message}</span>}




                    </label>


                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Minimum</span>
                        </label>
                        <label class="input-group">
                            <span>Amount</span>
                            <input {...register("amount", {
                                required: { value: true, message: 'Minimum number is required' }

                            })} type="number" placeholder="enter your amount" class="input input-bordered" />





                        </label>

                        <label className="label">
                            {errors.amount?.type === 'required' && <span className="label-text-alt text-red-600">{errors.amount.message}</span>}




                        </label>

                    </div>


                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Photo</span>
                        </label>
                        <label class="input-group">
                            <span>photo</span>
                            <input {...register("image", {
                                required: { value: true, message: 'photo is required' }

                            })} type="file" class="input input-bordered" />





                        </label>

                        <label className="label">
                            {errors.image?.type === 'required' && <span className="label-text-alt text-red-600">{errors.image.message}</span>}




                        </label>

                    </div>











                    <input className="btn btn-outline btn-primary w-full max-w-xs mt-6" type="submit" value="add product" />
                </form>
            </div>
        </>

    );
};

export default Addproduct;