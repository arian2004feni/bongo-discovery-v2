// components/PackageImageCarousel.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import 'swiper/css/navigation';
import "swiper/css/autoplay";
import { Navigation } from 'swiper/modules';

export default function PackageImageCarousel({ images }) {
  return (
    <div className="w-full max-w-6xl mx-auto mb-8">
      <Swiper
        modules={[Autoplay, Navigation]}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
        }}
        spaceBetween={10}
        navigation={true}
        className="rounded-xl h-[500px]"
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <img
              src={img}
              alt={`Slide ${i + 1}`}
              className="w-full h-full object-cover rounded-xl shadow"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
