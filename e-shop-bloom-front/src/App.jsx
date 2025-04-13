import Header from "./components/Header";
import Hero from "./components/Hero";
import CourseContent from "./components/CourseContent";
import Testimonials from "./components/Testimonials";
import Guarantee from "./components/Guarantee";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="font-sans">
      {" "}
      <Header />{" "}
      <main>
        {" "}
        <Hero /> <CourseContent /> <Testimonials /> <Guarantee /> <FAQ />{" "}
      </main>{" "}
      <Footer />{" "}
    </div>
  );
}

export default App;
