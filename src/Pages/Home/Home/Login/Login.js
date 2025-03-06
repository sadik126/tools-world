import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import google from '../../../../assets/google.png';
import { Authcontext } from '../../../../Context/Authprovider';
import app from '../../../../Firebase/Firebase.config';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();

    const { signInUser, googlesignIN } = useContext(Authcontext)

    const [loading, setLoading] = useState(false);

    // const [disabled , setDisabled] = useState(true)

    const [Loginerror, setLoginerror] = useState('')



    const location = useLocation()

    const nevigate = useNavigate();

    const from = location.state?.from?.pathname || '/';


    // const googlesign = () => {
    //     const provider = new GoogleAuthProvider();
    //     signInWithPopup(auth, provider)
    //         .then((result) => {
    //             // This gives you a Google Access Token. You can use it to access the Google API.
    //             const credential = GoogleAuthProvider.credentialFromResult(result);
    //             const token = credential.accessToken;
    //             // The signed-in user info.
    //             const user = result.user;
    //             if (user) {
    //                 toast.success('welcome to tools world')
    //                 nevigate(from, { replace: true })
    //             }

    //             console.log(user)

    //         })
    //         .catch((error) => {
    //             console.log(error)
    //             toast.error('There is an error.please wait for it')

    //         })
    // }

    const googlesign = () => {
        googlesignIN()
            .then((result) => {
                toast.success('Welcome to Tools World');
                nevigate(from, { replace: true });
            })
            .catch((error) => {
                console.error(error);
                toast.error('There was an error. Please try again.');
            });
    };

    const onSubmit = async data => {
        console.log(data)
        setLoginerror('')
        signInUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user)
                toast.success('welcome to tools world')
                nevigate(from, { replace: true })
            })
            .catch(err => {
                switch (err.code) {
                    case 'auth/user-not-found':
                        setLoginerror('This email address is not registered');
                        break;
                    case 'auth/wrong-password':
                        setLoginerror('Incorrect password. Try again.');
                        break;
                    case 'auth/too-many-requests':
                        setLoginerror('Too many failed attempts. Try again later.');
                        break;
                    default:
                        setLoginerror('An unknown error occurred. Please try again later.');
                }
            });
    }
    return (
        <>
            <section class="h-screen">
                <div class="container h-full px-6 py-24">
                    <div
                        class="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
                        <div class="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
                            <img
                                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                                class="w-full"
                                alt="Phone image" />
                        </div>
                        <div class="md:w-8/12 lg:ml-6 lg:w-5/12">
                            <form onSubmit={handleSubmit(onSubmit)}>

                                <div class="relative mb-6" data-te-input-wrapper-init>
                                    <input
                                        {...register("email", {
                                            required: { value: true, message: 'Email is required' },
                                            pattern: { value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/, message: 'Insert a valid email' }
                                        })}
                                        type="text"
                                        class="input input-bordered w-full "
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
                                        class="input input-bordered w-full "
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

                                <div class="mb-6 flex items-center justify-between">

                                    <p>New to TOOLS WORLD?<Link to="/signup" className='text-green-600' > Create new account</Link></p>


                                </div>




                                <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                                    {loading ? 'Signing in...' : 'Sign in'}
                                </button>

                                {
                                    Loginerror && <p className='text-red-700'>{Loginerror}</p>
                                }
                                {/* {errormessage} */}

                                <div
                                    class="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                                    <p
                                        class="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                                        OR
                                    </p>
                                </div>

                            </form>

                            <button onClick={googlesign} className="btn btn-success w-full">
                                <img style={{ width: '30px' }} src={google} alt="Google" />
                                Continue with Google
                            </button>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default Login;