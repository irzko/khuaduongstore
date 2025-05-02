"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import NextImage from "next/image";
import { Box, Image } from "@chakra-ui/react";
import { useState } from "react";

export default function Carousel({ imageUrlList }: { imageUrlList: string[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>();
  return (
    <>
      <Box rounded="2xl" overflow="hidden" w="full" maxWidth="md" mx="auto">
        <Swiper
          pagination={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
        >
          {imageUrlList.map((imageUrl, index) => (
            <SwiperSlide key={index}>
              <Box
                position="relative"
                w="full"
                aspectRatio={{
                  base: 1 / 1,
                  md: 4 / 3,
                }}
              >
                <Image
                  fit={{
                    base: "cover",
                    md: "contain",
                  }}
                  alt=""
                  asChild
                >
                  <NextImage src={imageUrl} fill unoptimized alt="" />
                </Image>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      <Box overflow="hidden" w="full" maxWidth="md" mx="auto">
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          className="mySwiper"
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
        >
          {imageUrlList.map((imageUrl, index) => (
            <SwiperSlide key={index}>
              <Box
                position="relative"
                w="full"
                aspectRatio={{
                  base: 1 / 1,
                  md: 4 / 3,
                }}
              >
                <Image
                  fit={{
                    base: "cover",
                    md: "contain",
                  }}
                  alt=""
                  sizes="25vw"
                  asChild
                >
                  <NextImage src={imageUrl} fill unoptimized alt="" />
                </Image>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </>
  );
}
