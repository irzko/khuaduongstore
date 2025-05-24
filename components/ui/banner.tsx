"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import NextImage from "next/image";
import { Box, Image } from "@chakra-ui/react";

export default function Banner({ imageUrlList }: { imageUrlList: string[] }) {
  return (
    <>
      <Box rounded="2xl" overflow="hidden" w="full" maxWidth="md" mx="auto">
        <Swiper
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
        >
          {imageUrlList.map((imageUrl, index) => (
            <SwiperSlide key={index}>
              <Box position="relative" w="full" aspectRatio="4/3">
                <Image
                  fit={{
                    base: "cover",
                    md: "contain",
                  }}
                  alt=""
                  asChild
                >
                  <NextImage
                    src={imageUrl || "/image-break.jpg"}
                    fill
                    unoptimized
                    alt=""
                  />
                </Image>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </>
  );
}
