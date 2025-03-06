import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Loading from '../../Shared/Loading/Loading';
import Tool from './Tool';
import Axiospublic from '../Axiospublic/Axiospublic';
import { Helmet } from 'react-helmet-async';

const Tools = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [currentpage, setCurrentpage] = useState(0);
  const itemperPage = 6;

  const axiospublic = Axiospublic();

  // সার্ভার থেকে সব ডেটা লোড করবো
  const { data: tools = [], isError, isLoading } = useQuery({
    queryKey: ['tools'],
    queryFn: async () => {
      const res = await axiospublic.get('/tools');
      return res.data;
    }
  });

  // 🔹 ফিল্টার করা ডেটা বের করো
  const filteredTools = tools.filter((tool) => {
    const matchesSearch = tool.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || tool.category === category;
    const matchesPrice =
      priceRange === "all" ||
      (priceRange === "low" && tool.price < 500) ||
      (priceRange === "medium" && tool.price >= 500 && tool.price <= 1000) ||
      (priceRange === "high" && tool.price > 1000);
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // 🔹 পেজিনেশন সেট আপ
  const totalFilteredItems = filteredTools.length;
  const numberofpage = Math.ceil(totalFilteredItems / itemperPage);

  // 🔹 ফিল্টার করা ডেটা থেকে নির্দিষ্ট পেজের জন্য `slice()` ব্যবহার করো
  const paginatedTools = filteredTools.slice(
    currentpage * itemperPage,
    (currentpage + 1) * itemperPage
  );

  // 🔹 লোডিং কন্ডিশন
  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    Swal.fire({
      title: "Fetch Error",
      text: "Can Not Fetch Our Tools",
      icon: "error",
    });
    return <p className="text-center text-red-500">Something went wrong. Please try again later.</p>;
  }

  return (
    <div>
      <Helmet>
        <title>Tools</title>
      </Helmet>
      <div className="container mx-auto md:min-h-screen">
        <h2 className="text-3xl text-center uppercase font-mono mt-9 font-bold">
          Our <span className="text-primary">products</span>
        </h2>

        {/* 🔹 ফিল্টার সেকশন */}
        <div className="flex flex-wrap gap-4 justify-center my-6 p-4 rounded-lg shadow-md">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentpage(0); // নতুন ফিল্টার করলে পেজ 0 এ নাও
            }}
            className="input input-bordered w-64"
          />

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setCurrentpage(0);
            }}
            className="select select-bordered w-48"
          >
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="hardware">Hardware</option>
            <option value="tools">Tools</option>
          </select>

          <select
            value={priceRange}
            onChange={(e) => {
              setPriceRange(e.target.value);
              setCurrentpage(0);
            }}
            className="select select-bordered w-48"
          >
            <option value="all">All Prices</option>
            <option value="low">Below $500</option>
            <option value="medium">$500 - $1000</option>
            <option value="high">Above $1000</option>
          </select>
        </div>

        {paginatedTools.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No tools available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 my-10 lg:grid-cols-3 gap-5">
            {paginatedTools.map((tool) => (
              <Tool key={tool._id} tool={tool} />
            ))}
          </div>
        )}
      </div>

      {/* 🔹 Pagination */}
      <div className="flex justify-center p-5 flex-wrap gap-2">
        {Array.from({ length: numberofpage }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentpage(i)}
            className={`btn btn-square ${currentpage === i ? "btn-primary" : "btn-outline"}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tools;
