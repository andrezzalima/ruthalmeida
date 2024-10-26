import React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

const CarouselEua = () => {
  const projects = [
    {
      image: "/images/carousel1.png",
      link: "/mentoring"
    },
    {
      image: "/images/carousel2.png",
      link: "/consulting"
    },
    {
      image: "/images/carousel3.png",
      link: "/setup"
    },
    {
      image: "/images/carousel4.png",
      link: "/pikup"
    },
    {
      image: "/images/carousel5.png",
      link: "/rent"
    }
  ];

  return (
    <div className="carousel-container relative max-w-full">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        navigation
        className="carousel overflow-hidden max-w-full"
      >
        {projects.map((project, index) => (
          <SwiperSlide key={index}>
            <div className="p-5 text-center">
              <Link href={project.link} passHref>
                <Image
                  src={project.image}
                  alt={`Project ${index + 1}`}
                  width={500}
                  height={300}
                  className="mx-auto rounded-lg"
                />
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarouselEua;
