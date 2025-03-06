import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { Authcontext } from '../../Context/Authprovider';
import { useNavigate } from 'react-router-dom';


export const axiossecure = axios.create({
  baseURL: 'http://localhost:4040'
})
const Useaxiossecure = () => {
  const { Logout } = useContext(Authcontext)
  const navigate = useNavigate();

  //   axiossecure.interceptors.request.use(
  //     // axios.interceptors.request.use হল Axios Request Interceptor, যা প্রতিটি HTTP request পাঠানোর আগে কাস্টম লজিক (Custom Logic) চালাতে সাহায্য করে।
  //     function(config){
  //       // config হলো axios-এর request configuration object।

  //         const token = localStorage.getItem('access-token')
  //         console.log('hit korse' , token)
  //         if(token){
  //  config.headers.authorization = `bearer ${token}`
  //         }

  // //         HTTP Header হলো অতিরিক্ত তথ্য, যা একটি HTTP Request-এর সাথে পাঠানো হয়। এটি সার্ভারকে বলে দেয় ক্লায়েন্ট কী চাচ্ছে এবং কীভাবে ডাটা পাঠানো বা গ্রহণ করা উচিত।্
  // //         ✔ এখানে Header-এ ৩টি জিনিস সেট করা হয়েছে:
  // // 1️⃣ Authorization → API টোকেন ব্যবহার করে ইউজার অথেনটিকেশন চেক করা।
  // // 2️⃣ Content-Type → আমরা JSON ফরম্যাটে ডাটা পাঠাচ্ছি।
  // // 3️⃣ Accept → সার্ভার থেকে JSON ফরম্যাটে ডাটা চাইছি।য
  //         return(config)
  //     },
  //     function(error){
  //         return Promise.reject(error)

  //     }

  //   )

  //   axiossecure.interceptors.response.use(
  //     function(response){
  //         return response
  //     }, async (error) => {
  //         const status = error.response.status;
  //         if (status === 401 || status === 403) {
  //             await Logout();
  //             navigate("/login", { replace: true });
  //           }
  //           return Promise.reject(error)
  //     }
  //   )

  useEffect(() => {
    const requestInterceptor = axiossecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access-token");
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiossecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          await Logout();
          navigate("/login", { replace: true });
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptor when component unmounts
    return () => {
      axiossecure.interceptors.request.eject(requestInterceptor);
      axiossecure.interceptors.response.eject(responseInterceptor);
    };
  }, [Logout, navigate]);

  return axiossecure
};

export default Useaxiossecure;