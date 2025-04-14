import Header from "./components/Header";
import Hero from "./components/Hero";
import CourseContent from "./components/CourseContent";
import Testimonials from "./components/Testimonials";
import Guarantee from "./components/Guarantee";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import CourseTip from "./components/CourseTip";
import CourseContent2 from "./components/CourseContent2";

function App() {
  return (
    <div className="font-sans">
      {" "}
      <Header />{" "}
      <main>
        {" "}
        <Hero /> <CourseContent2/> <CourseTip />  <CourseContent /> <Testimonials /> <Guarantee /> <FAQ />{" "}
      </main>{" "}
      <Footer />{" "}
    </div>
  );
}

export default App;
