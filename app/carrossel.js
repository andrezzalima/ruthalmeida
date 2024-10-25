import React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/swiper-bundle.css';
import Image from 'next/image';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

const Carousel = () => {
  const projects = [
    {
      image: "/images/carrossel1.png",
      link: "/mentoria"
    },
    {
      image: "/images/carrossel2.png",
      link: "/consultoria"
    },
    {
      image: "/images/carrossel3.png",
      link: "/montagem"
    },
    {
      image: "/images/c4.png",
      link: "/pegueemonte"
    },
    {
      image: "/images/carrossel5.png",
      link: "/aluguel"
    }
  ];

  return (
    <div className="carousel-container relative max-w-full">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        breakpoints={{
            640: {
              slidesPerView: 1, 
            },
            768: {
              slidesPerView: 2, 
            },
          }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        loop={true}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        className="carousel overflow-hidden max-w-full"
      >
        {projects.map((project, index) => (
          <SwiperSlide key={index}>
            <div className="p-5 text-center">
              {project.link ? (
                <Link href={project.link} passHref>
                  <Image
                    src={project.image}
                    alt={`Project ${index + 1}`}
                    width={500}
                    height={300}
                    className="mx-auto rounded-lg"
                  />
                </Link>
              ) : (
                <Image
                  src={project.image}
                  alt={`Project ${index + 1}`}
                  width={500}
                  height={300}
                  className="mx-auto rounded-lg"
                />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
