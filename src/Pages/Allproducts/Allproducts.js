import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Allproducts = () => {
    const [tools, setTools] = useState([])

    useEffect(() => {
        fetch('http://localhost:4040/tools')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setTools(data)
            })
    }, [])

    const handleEdit = (id) => {
        console.log(id)
    }

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
                const url = `http://localhost:4040/tools/${id}`
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
        <div class="overflow-x-auto">
            <table class="table w-full">

                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Available</th>
                        <th>minimum</th>
                        <th>Edit product</th>
                        <th>Delete product</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        tools.map((tool, index) => <tr key={tool._id}>
                            <th>{index + 1}</th>
                            <td>{tool.name}</td>
                            <td>{tool.price}</td>
                            <td>{tool.available}</td>
                            <td>{tool.minimum}</td>
                            <td><button onClick={() => handleEdit(tool._id)} class="btn btn-xs btn-primary">Edit</button></td>
                            <td><button onClick={() => handledelete(tool._id)} class="btn btn-xs btn-error">Delete</button></td>
                        </tr>)
                    }




                </tbody>
            </table>
        </div>
    );
};

export default Allproducts;