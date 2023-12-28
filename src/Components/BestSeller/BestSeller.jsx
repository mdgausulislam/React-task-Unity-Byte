import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import React, { useEffect, useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import discount from '../../../public/discount.jpg';

const Index = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('product.json')
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    console.log(data);
    const chunkArray = (array, size) => {
        return array.reduce((chunks, el, i) => {
            if (i % size === 0) {
                chunks.push([el]);
            } else {
                chunks[chunks.length - 1].push(el);
            }
            return chunks;
        }, []);
    };

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-10'>
            <div className=''>
                <img src={discount} alt="Discount" />
            </div>

            <div className=''>
            <h1 className='text-2xl font-bold text-orange-500'>Best Sellers</h1>
                <Swiper
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    {chunkArray(data, 3).map((chunk, index) => (
                        <SwiperSlide key={index}>
                            {chunk.map((product, idx) => (
                                <div key={idx} className='flex gap-16 mt-8 shadow-md p-2'>
                                    
                                    <div>
                                        <img className='w-32 rounded-full scale-110' src={product.image} alt={`Product ${index * 3 + idx}`} />
                                    </div>
                                    <div>
                                        <div className='flex'>
                                            {Array.from({ length: 5 }, (_, i) => (
                                                <span key={i}>
                                                    {i < product.reviewStar ? (
                                                        <FaStar className="text-yellow-500" />
                                                    ) : (
                                                        <FaRegStar className="text-yellow-500" />
                                                    )}
                                                </span>
                                            ))}
                                        </div>
                                        <h1 className='font-bold text-2xl'>{product.name}</h1>
                                        <div className='flex gap-10'>
                                            <p className='text-2xl font-bold text-red-700'>${product.price}</p>
                                            <p className="text-2xl font-bold line-through text-zinc-300">${product.priceOffer}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Index;