import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Swal from 'sweetalert2';
import Loading from '../../Shared/Loading/Loading';
import Tool from './Tool';

const Tools = () => {
    const { data: tools = [], isError, isLoading, refetch } = useQuery({
        queryKey: ['tools'],
        queryFn: async () => {
            const res = await fetch('http://localhost:4040/tools')
            const data = await res.json()
            return data
        }
    })



    if (isLoading) {
        return <Loading></Loading>
    }

    if (isError) {
        Swal({
            title: "Fetch Error",
            text: "Can Not Fatch Our tools",
            icon: "error",
        })
    }
    return (
        <div>
            <div className="container mx-auto">
                <h2 className='text-3xl text-center uppercase font-mono mt-9 font-bold'>Our <span className='text-primary'>products</span> </h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {
                        tools.map(tool => <Tool key={tool._id} tool={tool}></Tool>)
                    }

                </div>
            </div>
        </div>
    );
};

export default Tools;