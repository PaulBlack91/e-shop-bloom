import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useTestimonials from "./useTestimonials";
import { useIntersectionAnimation } from "../hooks/useIntersectionAnimation";

export default function Testimonials() {
  const { settings } = useTestimonials();
  const testimonialImages = Array.from(
    { length: 11 },
    (_, i) => `/imagesTestimonials/test-${i + 1}.jpeg`
  );
  const borderColors = [
    "border-pink-200",
    "border-cyan-200",
    "border-purple-200",
  ];
  const sectionRef = useIntersectionAnimation("animate-fade-slide", 0.1);

  return (
    <section
      ref={sectionRef}
      className="  bg-bgrosa py- sm:py-16 font-poppins md:py-20 pb-16 bg-cover bg-center bg-no-repeat "
    >
      <div className="max-w-7xl mx-auto px-4">
        <h4 className="pb-5 text-4xl font-bold mb-6  md:text-5xl text-center text-gray-800">
          Lo que dicen nuestros alumnos
        </h4>

        <Slider {...settings}>
          {testimonialImages.map((img, i) => (
            <div key={i} className="px-4">
              <div
                className={`bg-gradient-to-br from-rose-100 via-cyan-100 to-pink-100 rounded-xl border-4 ${
                  borderColors[i % borderColors.length]
                } shadow-md hover:shadow-xl transition-shadow duration-300 p-3 pb-6`}
              >
                <div className="overflow-hidden rounded-md">
                  <img
                    src={img}
                    alt={`Testimonio ${i + 1}`}
                    className="w-full h-auto object-cover rounded-md hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
