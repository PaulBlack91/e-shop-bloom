import { useEffect, useRef } from "react";

export default function CourseContent2() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionRef.current.classList.add("animate-fade-slide");
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="opacity-0 transition-all duration-1000 py-16 bg-bgrosa text-dark text-center px-6 font-poppins"
    >
      <div className="max-w-3xl mx-auto">
        <h4 className="text-4xl md:text-5xl font-bold mb-6">
          Quiero que sepas algo:
        </h4>
        <p className="text-2xl md:text-3xl">
          Con 4 o 5 productos bien seleccionados, podés crear una marca rentable e incluso lujosa.
        </p>
      </div>
    </section>
  );
}
