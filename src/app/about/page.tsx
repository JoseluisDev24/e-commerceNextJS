import TestimonialsSwiper from "@/components/swiper/TestimonialSwiper";
import { Container, Typography } from "@mui/material";

export default function AboutPage() {
  return (
    <Container sx={{ mt: 10, mb: 10 }} className="text-gray-800">
      <Typography variant="h4" gutterBottom align="center">
        Sobre nosotros
      </Typography>

      <Typography variant="body1">
        En nuestra tienda, creemos que comprar online debería ser fácil, rápido
        y seguro. Nos dedicamos a ofrecer productos de alta calidad a precios
        competitivos, y brindamos una experiencia de usuario amigable desde el
        inicio hasta la entrega.
      </Typography>

      <Typography variant="body1">
        Nuestro equipo está compuesto por profesionales apasionados por el
        ecommerce, comprometidos con la innovación y la atención al cliente. Nos
        esforzamos por mejorar constantemente, escuchando las necesidades de
        nuestros usuarios.
      </Typography>

      <TestimonialsSwiper />
    </Container>
  );
}
