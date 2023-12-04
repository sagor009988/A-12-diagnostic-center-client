import SectionTitel from "../../../Shared/Serction Titel/SectionTitel";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";


const Review = () => {
    const [reviews,setReview]=useState([]);
    useEffect(()=>{
        fetch('https://diagonistic-center-server.vercel.app/reviews')
        .then(res=>res.json())
        .then(data=>{
            setReview(data)
        })
    },[])
    return (
        
        <div className="my-8">
            <SectionTitel subHeading='---what our Patient say---' Heading='patients review'></SectionTitel>
          {/* review:  {reviews.length} */}
            <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
       
        {
                reviews?.map(review=> <SwiperSlide key={review._id}>
                    <div className="m-12 flex flex-col items-center">
                      <Rating style={{ maxWidth: 180 }} value={review.rating} readOnly />
                      <p>{review.details}</p>
                      <p className=" text-xl text-orange-500">{review.name}</p>
                    </div>
                  </SwiperSlide>)
            }
        
      </Swiper>
        </div>
    );
};

export default Review;