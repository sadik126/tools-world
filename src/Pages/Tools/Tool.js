import React from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';

const Tool = (props) => {
    const { _id, name, price, minimum, available, description, img, loading } = props.tool
    const nevigate = useNavigate();

    const nevigatedetail = (id) => {
        nevigate(`/tools/${id}`)
    }

    const nevigateperchase = (id) => {
        nevigate(`/purchase/${id}`)
    }

    // if (loading) {
    //     return <Loading></Loading>
    // }
    return (
        <>
            <div class="card  shadow-xl p-5">
                <div class="px-10 pt-10">
                    <img style={{ height: "170px" }} src={img} height="170" width="384" alt="" />

                </div>

                <div class="card-body items-center text-center">
                    <h2 class="card-title">{name}</h2>
                    {/* class="rounded-xl" */}
                    <p>{description?.substring(0, 50)}...</p>
                    <p>Available : {available}</p>
                    <p>Price : {price}</p>
                    <p>Minimum : {minimum}</p>
                    <div class="card-actions">
                        <button onClick={() => nevigateperchase(_id)} class="btn btn-primary">Buy Now</button>
                        <button onClick={() => nevigatedetail(_id)} class="btn btn-secondary">Detail</button>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Tool;