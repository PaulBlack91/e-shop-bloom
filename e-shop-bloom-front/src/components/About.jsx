import img from "../assets/paula.png";
import { useIntersectionAnimation } from "../hooks/useIntersectionAnimation";


export default function About() {

  const sectionRef = useIntersectionAnimation("animate-fade-slide", 0.1);

  return (
    <section
      ref={sectionRef}
      className=" py-10 sm:py-16 md:py-20 px-4 md:px-8 lg:px-16 bg-cover bg-center bg-no-repeat"
      id="about"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="w-full md:w-1/2 text-center md:text-left order-1 md:order-2">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            ¿Quién está detrás de <br />
            <span className="text-accent italic">"Éxito en un pote"</span>?
          </h2>

          <div className="my-6 md:hidden">
            <img
              src={img}
              alt="Paula fundadora"
              className="rounded-3xl shadow-lg mx-auto"
            />
          </div>

          <p className="text-xl font-poppins text-gray-700 leading-relaxed mb-4">
            ¡Hola! Soy Paula, la fundadora de{" "}
            <strong>The Bloom Business</strong>.
          </p>
          <p className="text-gray-700 text-xl md:text-1xl font-georgia italic mb-5 leading-tight">
            Siempre me han apasionado los negocios. Ver cómo una idea se
            transforma en una realidad tangible y exitosa es algo que me motiva
            muchísimo.
          </p>
          <p className="text-gray-700 text-xl md:text-1xl font-georgia italic mb-5 leading-tight">
            Hace más de 10 años que me sumergí en el mundo de la belleza y la
            cosmética, y desde entonces he aprendido que este sector ofrece un
            sinfín de oportunidades para los emprendedores. La belleza no es
            sólo cuestión de productos, sino también de construir marcas que
            conecten con las personas y generen un impacto positivo.
          </p>
          <p className="text-gray-700 text-xl md:text-1xl font-georgia italic mb-5 leading-tight">
            A lo largo de mi carrera, he tenido la suerte de crear y hacer
            crecer varios negocios desde cero. He enfrentado desafíos, tomado
            riesgos y celebrado éxitos, y todo eso me ha enseñado valiosas
            lecciones que ahora quiero compartir contigo. Estoy encantada de
            acompañarte en este viaje. Juntos podemos construir una marca que no
            solo sea exitosa, sino también auténtica y significativa.
          </p>
        </div>

        <div className="w-full md:w-1/2 relative group hidden md:block order-2 md:order-1">
          <img
            src={img}
            alt="Paula fundadora"
            className="rounded-3xl shadow-lg transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute -inset-1 bg-gradient-to-tr from-rose-200 to-blue-200 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition duration-500 z-[-1]" />
        </div>
      </div>
    </section>
  );
}
