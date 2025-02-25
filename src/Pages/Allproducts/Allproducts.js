import React, { useEffect, useState } from 'react';

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

    const handledelete = (id) => {
        const proceed = window.confirm('are you sure?')
        if (proceed) {
            const url = `http://localhost:4040/tools/${id}`
            fetch(url, {
                method: 'DELETE'
            })

                .then(res => res.json())
                .then(data => {
                    const remaining = tools.filter(tool => tool._id !== id)
                    setTools(remaining)
                    console.log(data)
                })

        }

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
                        <th>Delete product</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        tools.map((tool, index) => <tr>
                            <th>{index + 1}</th>
                            <td>{tool.name}</td>
                            <td>{tool.price}</td>
                            <td>{tool.available}</td>
                            <td>{tool.minimum}</td>
                            <td><button onClick={() => handledelete(tool._id)} class="btn btn-xs btn-error">Delete</button></td>
                        </tr>)
                    }




                </tbody>
            </table>
        </div>
    );
};

export default Allproducts;