import { getAuth } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Authcontext } from '../../../../Context/Authprovider';
import { useUpdateProfile } from 'react-firebase-hooks/auth';
import app from '../../../../Firebase/Firebase.config';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import Axiospublic from '../../../Axiospublic/Axiospublic';

const Signup = () => {
    // const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const allaxios = Axiospublic()
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        trigger,
        reset,
    } = useForm({ mode: "onChange" });


    const { createUser, updateUser, user } = useContext(Authcontext)



    const nevigate = useNavigate();

    console.log(user)

    // const from = location.state?.from?.pathname || '/';



    const imagehostkey = 'e0e49e32b3b219f54116af3c0da0de50';
    const imageurl = `https://api.imgbb.com/1/upload?&key=${imagehostkey}`;

    const onSubmit = async data => {
        const imagefile = { image: data.image[0] }
        const res = await allaxios.post(imageurl, imagefile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        if (res.data.success) {
            const image = res.data.data.display_url
            await createUser(data.email, data.password)
                .then(async (res) => {
                    const useritem = {
                        name: data.name,
                        email: data.email,
                        image: image
                    }

                    await updateUser(data.name, image)
                        .then(async (res) => {
                            await allaxios.post('/users', useritem)
                                .then(async (res) => {
                                    if (res.data.insertedId) {
                                        reset()
                                        await Swal.fire({
                                            position: "center",
                                            icon: "success",
                                            title: "User created successfully",
                                            showConfirmButton: false,
                                            timer: 1500,
                                        });
                                        await nevigate("/");
                                    }
                                })
                        })
                        .catch((error) => console.log(error))


                })

                .catch((error) => {
                    if (error.code === "auth/email-already-in-use") {
                        Swal.fire({
                            icon: "error",
                            title: "User Already Exists",
                            text: "This email is already registered. Please log in.",
                            confirmButtonText: "OK",
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: `Something went wrong: ${error.message}`,
                        });
                    }
                    // Swal.fire({
                    //     position: "center",
                    //     icon: "error",
                    //     title: `Error: ${error.message}`,
                    //     showConfirmButton: false,
                    //     timer: 1500,
                    //   });
                })

                .catch((error) => {
                    if (error.code === "auth/email-already-in-use") {
                        Swal.fire({
                            icon: "error",
                            title: "User Already Exists",
                            text: "This email is already registered. Please log in.",
                            confirmButtonText: "OK",
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: `Something went wrong: ${error.message}`,
                        });
                    }
                });






        }

    }



    // const saveuser = (name, email, image) => {
    //     const user = { name: name, email: email, image: image }

    //     fetch('https://tools-server-aok2.onrender.com/users', {
    //         method: 'POST',
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify(user)
    //     })
    //         .then(res => res.json())
    //         .then(result => {
    //             console.log(result)
    //             toast.success(`${name} Added successfully`)
    //             nevigate(from, { replace: true })
    //             // navigate('/dashboard/manageDoctor')
    //         })

    // }
    return (
        <>
            <section class="h-screen my-24">
                <div class="container h-full px-6 py-24">
                    <div
                        class="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
                        <div class="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
                            <img
                                src="https://imgs.search.brave.com/SnekduFDg46klXHwqOpVxBJ8pdHaO7eK9YKq9shtsyM/rs:fit:450:450:1/g:ce/aHR0cHM6Ly9jZG5p/Lmljb25zY291dC5j/b20vaWxsdXN0cmF0/aW9uL3ByZW1pdW0v/dGh1bWIvc2lnbi11/cC1wYWdlLTE4ODY1/ODItMTU5ODI1My5w/bmc"
                                class="w-full"
                                alt="Phone image" />
                        </div>
                        <div class="md:w-8/12 lg:ml-6 lg:w-5/12">
                            <h1 className='text-3xl uppercase my-8 font-bold'>Register here</h1>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div class="relative mb-6" data-te-input-wrapper-init>
                                    <input
                                        {...register("name", {
                                            required: { value: true, message: 'Name is required' },
                                            pattern: { value: /^[a-zA-Z-/.\' ']{3,20}$/, message: 'Please enter valid name according to your NID' }
                                        })}
                                        type="text"

                                        className={`input input-bordered w-full ${errors.name ? "input-error" : ""}`}
                                        onKeyUp={() => trigger("name")}
                                        id="exampleFormControlInput3"
                                        placeholder="Name" />
                                    <label
                                        for="exampleFormControlInput3"
                                        class="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
                                    >
                                    </label>
                                    <label className="label">
                                        {errors.name?.type === 'required' && <span className=" text-red-600 font-bold">{errors?.name?.message}</span>}
                                        {errors.name?.type === 'pattern' && <span className=" text-red-600 font-bold">{errors?.name?.message}</span>}
                                        {/* {errors.name?.type === 'required' && <span className=" text-red-600 font-bold">{errors?.email?.message}</span>} */}


                                    </label>
                                </div>

                                <div class="relative mb-6" data-te-input-wrapper-init>
                                    <input
                                        {...register("email", {
                                            required: { value: true, message: 'Email is required' },
                                            pattern: { value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/, message: 'Insert a valid email' }
                                        })}
                                        type="text"
                                        className={`input input-bordered w-full ${errors.email ? "input-error" : ""}`}
                                        onKeyUp={() => trigger("email")}
                                        id="exampleFormControlInput3"
                                        placeholder="Email address" />
                                    <label
                                        for="exampleFormControlInput3"
                                        class="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
                                    >
                                    </label>
                                    <label className="label">
                                        {errors.email?.type === 'required' && <span className=" text-red-600 font-bold">{errors?.email?.message}</span>}
                                        {errors.email?.type === 'pattern' && <span className=" text-red-600 font-bold">{errors?.email?.message}</span>}


                                    </label>
                                </div>


                                <div class="relative mb-6" data-te-input-wrapper-init>
                                    <input {...register("password", {
                                        required: { value: true, message: 'password is required' },
                                        minLength: { value: 6, message: 'must be 6 charecter of password' }
                                    })}
                                        type="password"
                                        className={`input input-bordered w-full ${errors.password ? "input-error" : ""}`}
                                        onKeyUp={() => trigger("password")}
                                        id="exampleFormControlInput33"
                                        placeholder="Password" />
                                    <label
                                        for="exampleFormControlInput33"
                                        class="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
                                    >
                                    </label>
                                    <label className="label">
                                        {errors.password?.type === 'required' && <span className=" text-red-600 font-bold">{errors?.password?.message}</span>}
                                        {errors.password?.type === 'minLength' && <span className=" text-red-600 font-bold">{errors?.password?.message}</span>}


                                    </label>
                                </div>


                                <div class="relative mb-6" data-te-input-wrapper-init>
                                    <input {...register("image", {
                                        required: { value: true, message: 'Image is required' }
                                    })}
                                        type="file"
                                        class="input input-bordered w-full "
                                        id="exampleFormControlInput33"
                                        placeholder="Image"
                                        accept="image/*" />

                                    <label className="label">
                                        {errors.image?.type === 'required' && <span className=" text-red-600 font-bold">{errors?.image?.message}</span>}



                                    </label>
                                </div>

                                <div class="mb-6 flex items-center justify-between">

                                    <p>Already have an account in TOOLS WORLD?<Link to="/login" className='text-secondary' > Login here</Link></p>



                                </div>




                                <input
                                    className="btn bg-orange-500"
                                    type="submit"
                                    value="Sign up"
                                    disabled={!isValid}
                                />


                            </form>
                            {
                                // signupError && <p className='text-red-600'>{signupError}</p>
                            }
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default Signup;