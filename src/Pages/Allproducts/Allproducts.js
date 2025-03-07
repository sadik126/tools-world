import React, { useEffect, useState } from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Allproducts = () => {
    const [tools, setTools] = useState([])

    useEffect(() => {
        fetch('https://tools-server-aok2.onrender.com/tools')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setTools(data)
            })
    }, [])



    const handledelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                const url = `https://tools-server-aok2.onrender.com/tools/${id}`
                fetch(url, { method: 'DELETE' })
                    .then(res => res.json())
                    .then(() => {
                        setTools(prevTools => prevTools.filter(tool => tool._id !== id));
                    })

                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });


    }
    return (
        <div className="overflow-x-auto">
            <table className="table w-full border-none  rounded-lg shadow-md">
                <thead>
                    <tr className=" text-lg">
                        <th className="p-3">#</th>
                        <th className="p-3">Name</th>
                        <th className="p-3">Price</th>
                        <th className="p-3">Available</th>
                        <th className="p-3">Minimum</th>
                        <th className="p-3">Edit</th>
                        <th className="p-3">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {tools.map((tool, index) => (
                        <tr key={tool._id} className="hover:bg-gray-50 border-none">
                            <th className="p-3">{index + 1}</th>
                            <td className="p-3 font-medium">{tool.name}</td>
                            <td className="p-3">${tool.price}</td>
                            <td className="p-3">{tool.available}</td>
                            <td className="p-3">{tool.minimum}</td>
                            <td className="p-3">
                                <Link to={`/dashboard/editproducts/${tool._id}`}>
                                    <button className="btn btn-sm btn-primary flex items-center gap-1">
                                        <FaPencilAlt size={16} /> Edit
                                    </button>
                                </Link>
                            </td>
                            <td className="p-3">
                                <button
                                    onClick={() => handledelete(tool._id)}
                                    className="btn btn-sm btn-error flex items-center gap-1"
                                >
                                    <FaTrash size={16} /> Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Allproducts;