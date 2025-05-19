import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Carrousel() {
  const testimonials = [
    {
      name: "Lucía Fernández",
      text: "Este curso cambió mi vida. En 2 meses lancé mi primer producto digital y ya estoy generando ingresos.",
    },
    {
      name: "María Gómez",
      text: "La forma en que explican todo es súper clara. Además, el acompañamiento es constante.",
    },
    {
      name: "Ana Torres",
      text: "Nunca pensé que podría emprender. Gracias a este curso tengo mi propia marca de cosmética.",
    },
    {
      name: "Carla Ríos",
      text: "La comunidad es lo mejor. Sentís que no estás sola y eso vale oro.",
    },
  ];

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section
      className="py-20  pb-16 bg-cover bg-center bg-no-repeat "
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-4xl font-bold mb-12 text-center text-gray-800">
          Lo que dicen nuestros alumnos
        </h3>

        <Slider {...settings}>
          {testimonials.map((t, i) => (
            <div key={i} className="px-4">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-6 h-full flex flex-col justify-between hover:shadow-lg transition-all duration-300 ease-in-out">
                <div>
                  <p className="text-lg text-gray-700 italic mb-4">
                    “{t.text}”
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">- {t.name}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
