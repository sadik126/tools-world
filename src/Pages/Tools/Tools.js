import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Loading from '../../Shared/Loading/Loading';
import Tool from './Tool';
import Axiospublic from '../Axiospublic/Axiospublic';
import { Helmet } from 'react-helmet-async';
import Useaxiossecure from '../Useaxiossecure/Useaxiossecure';

const Tools = () => {

    const [search, setSearch] = useState(""); // সার্চ ফিল্টার
    const [category, setCategory] = useState("all"); // ক্যাটাগরি ফিল্টার
    const [priceRange, setPriceRange] = useState("all"); // প্রাইস রেঞ্জ ফিল্টার
   
    const { data: tools = [], isError, isLoading } = useQuery({
        queryKey: ['tools'],
        queryFn: async () => {
            const axiospublic = Axiospublic();
           
            // const res = await fetch('http://localhost:4040/tools')
            // const data = await res.json()
            // return data

            const res = await axiospublic.get('/tools')
            console.log(res)
            return res.data;
        }
    })



    if (isLoading) {
        return <Loading></Loading>
    }

    if (isError) {
        Swal.fire({
            title: "Fetch Error",
            text: "Can Not Fatch Our tools",
            icon: "error",
        })
        return <p className="text-center text-red-500">Something went wrong. Please try again later.</p>;
    }

    const filteredTools = tools.filter((tool) => {
        const matchesSearch = tool.name.toLowerCase().includes(search.toLowerCase());
        // এখানে Tool name  মিলাবে ডাটাবেজ থেকে আগে ছোট হাতের অক্ষর এ নিয়ে চেক করবে includes দিয়ে , এখানে includes return করে true নাকি false , এটা চেক করবে  (এর মধ্যে search অপশন এ যা লিখবে সেটা কে lower case এ আইনা)
        const matchesCategory = category === "all" || tool.category === category;
        const matchesPrice =
          priceRange === "all" ||
          (priceRange === "low" && tool.price < 500) ||
          (priceRange === "medium" && tool.price >= 500 && tool.price <= 1000) ||
          (priceRange === "high" && tool.price > 1000);

          console.log(matchesSearch && matchesCategory && matchesPrice)
    
        return matchesSearch && matchesCategory && matchesPrice;
      });
    return (
        <div>
          <Helmet>
                  <title>Tools</title>
                </Helmet>
      <div className="container mx-auto md:min-h-screen">
        <h2 className="text-3xl text-center uppercase font-mono mt-9 font-bold">
          Our <span className="text-primary">products</span>
        </h2>

         {/* 🔹 Filter Section 🔹 */}
         <div className="flex flex-wrap gap-4 justify-center my-6 p-4  rounded-lg shadow-md">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            // এখানে state এ value update হবে
            className="input input-bordered w-64"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            // এখানে state এ value update হবে
            className="select select-bordered w-48"
          >
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="hardware">Hardware</option>
            <option value="tools">Tools</option>
          </select>

          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            // এখানে state এ value update হবে
            className="select select-bordered w-48"
          >
            <option value="all">All Prices</option>
            <option value="low">Below $500</option>
            <option value="medium">$500 - $1000</option>
            <option value="high">Above $1000</option>
          </select>
        </div>

        {filteredTools.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No tools available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {filteredTools.map((tool) => (
              <Tool key={tool._id} tool={tool} />
            ))}
          </div>
        )}
      </div>
    </div>
    );
};

export default Tools;