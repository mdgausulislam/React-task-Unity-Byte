import React, { useState, useEffect } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { GiRoyalLove } from 'react-icons/gi';
import { FaArrowsRotate } from 'react-icons/fa6';
import { FaStar, FaRegStar } from 'react-icons/fa';
import './product.css';

const Product = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4); // Change this value to adjust items per page
    const [hoveredId, setHoveredId] = useState(null);


    useEffect(() => {
        fetch('product.json')
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    // Logic to get current items based on pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const handleMouseEnter = (productId) => {
        setHoveredId(productId);
    };

    const handleMouseLeave = () => {
        setHoveredId(null);
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <h1 className='text-3xl text-center text-orange-500 my-8 font-bold'>Product List</h1>
            <div className="mx-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentItems.map((product) => (
                    <div
                        key={product.id}
                        className="card bg-base-100 shadow-xl"
                        onMouseEnter={() => handleMouseEnter(product.id)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="lg:flex">
                            <div className="lg:w-1/2 text-center flex justify-center items-center relative indicator">
                                <span className="indicator-item indicator-center indicator-middle badge badge-secondary rounded-full py-5">{product.discountPercentage}%</span>
                                <img
                                    className={`md:w-full w-[320px] flex text-center justify-center items-center rounded-s-lg rounded-e-lg ${hoveredId === product.id ? 'opacity-50' : 'opacity-100'
                                        }`}
                                    src={product.image}
                                    alt="Album"
                                />
                                <div
                                    className={`absolute top-0 left-0 w-full h-full flex justify-center items-center icon-container ${hoveredId === product.id ? 'show' : 'hide'
                                        }`}
                                >
                                    <div className="flex gap-4">
                                        <IoIosSearch className="cursor-pointer rounded-full" />
                                        <GiRoyalLove className="cursor-pointer rounded-full" />
                                        <FaArrowsRotate className="cursor-pointer rounded-full" />
                                    </div>
                                </div>
                            </div>
                            <div className="lg:w-1/2 p-4 card-body">
                                <div className="flex gap-2">
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <span key={index}>
                                            {index < product.reviewStar ? (
                                                <FaStar className="text-yellow-500" />
                                            ) : (
                                                <FaRegStar className="text-yellow-500" />
                                            )}
                                        </span>
                                    ))}
                                </div>
                                <h2 className="card-title">{product.name}</h2>
                                <div className="flex gap-10">
                                    <p className="text-2xl font-bold text-red-700">${product.price}</p>
                                    <p className="text-2xl font-bold line-through text-zinc-300">${product.priceOffer}</p>
                                </div>
                                <p>{product.description}</p>

                                <div className={`mt-4 ${hoveredId === product.id ? 'block' : 'hidden'}`}>
                                    <button
                                        className=" bg-gray-900 text-white px-10 rounded-full py-3"
                                        onClick={() => document.getElementById(`my_modal_${product.id}`).showModal()}
                                    >
                                        Add To Cart
                                    </button>
                                    <dialog id={`my_modal_${product.id}`} className="modal modal-bottom sm:modal-middle">
                                        <div className="modal-box">
                                            <h3 className="font-bold text-lg">Hello! Customers Sir</h3>
                                            <p className="font-semibold py-4 text-fuchsia-700">Cooming Product Soon</p>
                                            <div className="modal-action">
                                                <form method="dialog">
                                                    <button className="btn bg-orange-700 text-white" onClick={() => document.getElementById(`my_modal_${product.id}`).close()}>Close</button>
                                                </form>
                                            </div>
                                        </div>
                                    </dialog>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
            {/* Pagination */}
            <div className="pagination flex justify-center my-5">
                {data.length > itemsPerPage &&
                    Math.ceil(data.length / itemsPerPage) > 1 &&
                    Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, index) => (
                        <button
                            key={index}
                            className={`pagination-button ${currentPage === index + 1 ? 'active' : ''} ml-5 px-6 py-3 rounded-full`}
                            style={{ backgroundColor: currentPage === index + 1 ? 'orange' : '' }}
                            onClick={() => paginate(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
            </div>
        </div>
    );
};

export default Product;



