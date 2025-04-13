const testimonials = [
  {
    name: "Lucía Fernández",
    text: "Este curso cambió mi vida. En 2 meses lancé mi primer producto digital y ya estoy generando ingresos.",
  },
  {
    name: "María Gómez",
    text: "La forma en que explican todo es súper clara. Además, el acompañamiento es constante.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-white text-dark">
      {" "}
      <div className="max-w-4xl mx-auto px-4">
        {" "}
        <h3 className="text-3xl font-bold mb-8 text-center">
          Testimonios
        </h3>{" "}
        <div className="space-y-8">
          {" "}
          {testimonials.map((t, i) => (
            <div key={i} className="bg-secondary p-6 rounded-lg shadow">
              {" "}
              <p className="text-lg mb-2">“{t.text}”</p>{" "}
              <p className="font-semibold text-primary">- {t.name}</p>{" "}
            </div>
          ))}{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}
