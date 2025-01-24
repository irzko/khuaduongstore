"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import NextImage from "next/image";
import { Box } from "@chakra-ui/react";

export default function Carousel({ imageUrlList }: { imageUrlList: string[] }) {
  return (
    <Box rounded="lg" overflow="hidden" w="full" maxWidth="md" mx="auto">
      <Swiper pagination={true} modules={[Pagination]}>
        {imageUrlList.map((imageUrl, index) => (
          <SwiperSlide key={index}>
            <Box position="relative" w="full" aspectRatio={16 / 9}>
              <NextImage
                src={imageUrl}
                fill
                objectFit="contain"
                unoptimized
                alt=""
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
