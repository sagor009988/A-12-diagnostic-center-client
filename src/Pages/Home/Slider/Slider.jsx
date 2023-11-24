import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import slider1 from "../../../assets/slider1.jpeg";
import slider2 from "../../../assets/slider2.jpg";
import slider3 from "../../../assets/slider3.jpg";
import slider4 from "../../../assets/slider4.jpeg";
import slider5 from "../../../assets/slider5.jpg";
import slider6 from "../../../assets/slider6.jpg";
import SectionTitel from "../../../Shared/Serction Titel/SectionTitel";

const Slider = () => {
  return (
    <div className="my-5">
        <SectionTitel subHeading='--lab--' Heading='Explore new lab'></SectionTitel>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={slider1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider2} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider3} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider4} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider5} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider6} alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
