import { useContext, useEffect, useState } from 'react';
import { Authcontext } from '../../Context/Authprovider';
import Useaxiossecure from '../../Pages/Useaxiossecure/Useaxiossecure';
import Axiospublic from '../../Pages/Axiospublic/Axiospublic';
import { useQuery } from '@tanstack/react-query';

const Useadmin = () => {
    const { user } = useContext(Authcontext)
    console.log("User from AuthContext:", user);
    const axiosSecure = Useaxiossecure();
    // const allaxios = Axiospublic()
    const { data: isAdmin, isPending: isAdminloading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !!user?.email,
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/user/admin/${user.email}`);
                console.log(res)
                return res.data?.admin; // যদি data না আসে, তাহলে false রিটার্ন করবে
            } catch (error) {
                console.error("Error fetching admin status:", error);
                return false;
            }
        }
    })
    return [isAdmin, isAdminloading]
}

export default Useadmin;