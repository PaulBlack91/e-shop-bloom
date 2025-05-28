import { useIntersectionAnimation } from "../hooks/useIntersectionAnimation";

export default function CourseContent2() {
  const sectionRef = useIntersectionAnimation("animate-fade-slide", 0.1);
  return (
    <section
      ref={sectionRef}
      className="opacity-0 transition-all duration-1000 py-10 sm:py-16 md:py-20  bg-bgrosa text-dark text-center px-6 font-poppins"
    >
      <div className="max-w-3xl mx-auto ">
        <h4 className="text-4xl md:text-5xl font-bold mb-6">
          Quiero que sepas algo:
        </h4>
        <p className="text-2xl md:text-3xl">
          Con 4 o 5 productos bien seleccionados, podés crear una marca rentable
          e incluso lujosa.
        </p>
      </div>
    </section>
  );
}
