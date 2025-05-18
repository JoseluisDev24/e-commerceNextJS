"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import {testimonials} from "@/data/testimonials";
import "swiper/css";
import "swiper/css/pagination";

import { Avatar, Box, Paper, Rating, Typography } from "@mui/material";

const TestimonialsSwiper = () => {
  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 6, mb: 10 }}>
      <Typography variant="h5" textAlign="center" gutterBottom>
        Testimonios de nuestros clientes
      </Typography>

      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        style={{ paddingBottom: "2rem" }}
      >
        {testimonials.map((testimonial, index) => {
          const formattedDate = new Intl.DateTimeFormat("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(new Date(testimonial.date));

          return (
            <SwiperSlide key={index}>
              <Paper elevation={3} sx={{ p: 4, mx: 2, textAlign: "center" }}>
                <Avatar
                  src={testimonial.image}
                  alt={testimonial.name}
                  sx={{ width: 100, height: 100, mx: "auto", mb: 1 }}
                />

                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                  {testimonial.name}
                </Typography>

                <Rating value={testimonial.rating} readOnly sx={{ mb: 1 }} />

                <Typography variant="body2" fontStyle="italic" gutterBottom>
                  “{testimonial.comment}”
                </Typography>

                <Typography variant="caption" color="text.secondary">
                  {formattedDate}
                </Typography>
              </Paper>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
};

export default TestimonialsSwiper;
